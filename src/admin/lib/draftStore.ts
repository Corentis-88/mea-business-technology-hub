export const ADMIN_DRAFT_DATABASE = "mea-admin-studio";
export const ADMIN_DRAFT_STORE = "drafts";
export const ADMIN_DRAFT_FALLBACK_PREFIX = "mea-admin-draft-v1:";

export interface DraftRecord<T = unknown> {
  id: string;
  version: 1;
  content: T;
  updatedAt: string;
}

export interface DraftStoreOptions {
  indexedDB?: IDBFactory | null;
  storage?: Storage;
  now?: () => Date;
}

function localStorageFrom(options?: DraftStoreOptions): Storage {
  const storage = options?.storage ?? globalThis.localStorage;
  if (!storage) throw new Error("No draft persistence mechanism is available.");
  return storage;
}

function fallbackKey(id: string) {
  return `${ADMIN_DRAFT_FALLBACK_PREFIX}${encodeURIComponent(id)}`;
}

function validId(id: string) {
  const clean = id.trim();
  if (!clean || clean.length > 160) throw new Error("Draft ID must contain 1 to 160 characters.");
  return clean;
}

function openDatabase(factory: IDBFactory): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = factory.open(ADMIN_DRAFT_DATABASE, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(ADMIN_DRAFT_STORE)) {
        request.result.createObjectStore(ADMIN_DRAFT_STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Could not open the draft database."));
    request.onblocked = () => reject(new Error("The draft database is blocked by another tab."));
  });
}

async function withStore<T>(factory: IDBFactory, mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const database = await openDatabase(factory);
  try {
    return await new Promise<T>((resolve, reject) => {
      const transaction = database.transaction(ADMIN_DRAFT_STORE, mode);
      const request = action(transaction.objectStore(ADMIN_DRAFT_STORE));
      let result!: T;
      request.onsuccess = () => { result = request.result; };
      request.onerror = () => reject(request.error ?? new Error("Draft database request failed."));
      transaction.oncomplete = () => resolve(result);
      transaction.onerror = () => reject(transaction.error ?? new Error("Draft database transaction failed."));
      transaction.onabort = () => reject(transaction.error ?? new Error("Draft database transaction was aborted."));
    });
  } finally {
    database.close();
  }
}

function factoryFrom(options?: DraftStoreOptions): IDBFactory | null {
  if (options && "indexedDB" in options) return options.indexedDB ?? null;
  return globalThis.indexedDB ?? null;
}

export async function saveDraft<T>(id: string, content: T, options: DraftStoreOptions = {}): Promise<DraftRecord<T>> {
  const record: DraftRecord<T> = { id: validId(id), version: 1, content, updatedAt: (options.now?.() ?? new Date()).toISOString() };
  const factory = factoryFrom(options);
  if (factory) {
    try {
      await withStore(factory, "readwrite", (store) => store.put(record));
      return record;
    } catch {
      // IndexedDB can be unavailable in private/locked-down contexts; preserve work in local storage.
    }
  }
  localStorageFrom(options).setItem(fallbackKey(record.id), JSON.stringify(record));
  return record;
}

export async function loadDraft<T>(id: string, options: DraftStoreOptions = {}): Promise<DraftRecord<T> | null> {
  const cleanId = validId(id);
  const factory = factoryFrom(options);
  if (factory) {
    try {
      const record = await withStore<DraftRecord<T> | undefined>(factory, "readonly", (store) => store.get(cleanId));
      if (record) return record;
    } catch {
      // Fall through to the local-storage copy.
    }
  }
  const raw = localStorageFrom(options).getItem(fallbackKey(cleanId));
  if (!raw) return null;
  try {
    const record = JSON.parse(raw) as DraftRecord<T>;
    return record.version === 1 && record.id === cleanId ? record : null;
  } catch {
    return null;
  }
}

export async function deleteDraft(id: string, options: DraftStoreOptions = {}): Promise<void> {
  const cleanId = validId(id);
  const factory = factoryFrom(options);
  if (factory) {
    try {
      await withStore(factory, "readwrite", (store) => store.delete(cleanId));
    } catch {
      // Still remove any fallback copy.
    }
  }
  localStorageFrom(options).removeItem(fallbackKey(cleanId));
}
