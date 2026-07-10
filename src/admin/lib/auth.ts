import { base64ToBytes, bytesToBase64, equalBytes, requireWebCrypto, toArrayBuffer, utf8 } from "./encoding";

export const ADMIN_CREDENTIALS_STORAGE_KEY = "mea-admin-credentials-v1";
export const DEFAULT_PBKDF2_ITERATIONS = 310_000;

export interface AdminCredentialRecord {
  version: 1;
  username: string;
  salt: string;
  verifier: string;
  iterations: number;
  createdAt: string;
}

export interface AdminSession {
  readonly username: string;
  readonly encryptionKey: CryptoKey;
}

export interface AuthOptions {
  storage?: Storage;
  crypto?: Crypto;
  iterations?: number;
  now?: () => Date;
}

function storageFrom(options?: AuthOptions): Storage {
  const storage = options?.storage ?? globalThis.localStorage;
  if (!storage) throw new Error("Local storage is unavailable.");
  return storage;
}

function normaliseUsername(username: string): string {
  return username.trim().toLowerCase();
}

function validateCredentials(username: string, password: string) {
  if (username.length < 3) throw new Error("Username must contain at least 3 characters.");
  if (password.length < 12) throw new Error("Password must contain at least 12 characters.");
}

async function deriveMaterial(password: string, salt: Uint8Array, iterations: number, cryptoApi: Crypto) {
  const keyMaterial = await cryptoApi.subtle.importKey("raw", toArrayBuffer(utf8(password)), "PBKDF2", false, ["deriveBits"]);
  const bits = new Uint8Array(await cryptoApi.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: toArrayBuffer(salt), iterations },
    keyMaterial,
    512,
  ));
  const verifier = bits.slice(0, 32);
  const encryptionKey = await cryptoApi.subtle.importKey(
    "raw",
    toArrayBuffer(bits.slice(32)),
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"],
  );
  bits.fill(0);
  return { verifier, encryptionKey };
}

function parseRecord(raw: string | null): AdminCredentialRecord | null {
  if (!raw) return null;
  try {
    const record = JSON.parse(raw) as Partial<AdminCredentialRecord>;
    if (record.version !== 1 || typeof record.username !== "string" || typeof record.salt !== "string" ||
        typeof record.verifier !== "string" || !Number.isSafeInteger(record.iterations) || record.iterations! < 100_000 ||
        record.iterations! > 2_000_000 || typeof record.createdAt !== "string") return null;
    return record as AdminCredentialRecord;
  } catch {
    return null;
  }
}

export function readAdminCredentialRecord(options?: AuthOptions): AdminCredentialRecord | null {
  return parseRecord(storageFrom(options).getItem(ADMIN_CREDENTIALS_STORAGE_KEY));
}

export function hasAdminCredentials(options?: AuthOptions): boolean {
  return readAdminCredentialRecord(options) !== null;
}

export async function setupAdminCredentials(username: string, password: string, options: AuthOptions = {}): Promise<AdminSession> {
  const normalised = normaliseUsername(username);
  validateCredentials(normalised, password);
  const storage = storageFrom(options);
  if (parseRecord(storage.getItem(ADMIN_CREDENTIALS_STORAGE_KEY))) {
    throw new Error("Admin credentials have already been configured.");
  }
  const cryptoApi = requireWebCrypto(options.crypto);
  const iterations = options.iterations ?? DEFAULT_PBKDF2_ITERATIONS;
  if (!Number.isSafeInteger(iterations) || iterations < 100_000 || iterations > 2_000_000) {
    throw new Error("PBKDF2 iterations must be between 100,000 and 2,000,000.");
  }
  const salt = cryptoApi.getRandomValues(new Uint8Array(16));
  const { verifier, encryptionKey } = await deriveMaterial(password, salt, iterations, cryptoApi);
  const record: AdminCredentialRecord = {
    version: 1,
    username: normalised,
    salt: bytesToBase64(salt),
    verifier: bytesToBase64(verifier),
    iterations,
    createdAt: (options.now?.() ?? new Date()).toISOString(),
  };
  storage.setItem(ADMIN_CREDENTIALS_STORAGE_KEY, JSON.stringify(record));
  return Object.freeze({ username: normalised, encryptionKey });
}

export async function loginAdmin(username: string, password: string, options: AuthOptions = {}): Promise<AdminSession | null> {
  const record = readAdminCredentialRecord(options);
  if (!record || normaliseUsername(username) !== record.username) return null;
  const cryptoApi = requireWebCrypto(options.crypto);
  const { verifier, encryptionKey } = await deriveMaterial(password, base64ToBytes(record.salt), record.iterations, cryptoApi);
  if (!equalBytes(verifier, base64ToBytes(record.verifier))) return null;
  return Object.freeze({ username: record.username, encryptionKey });
}

export function clearAdminCredentials(options?: AuthOptions): void {
  storageFrom(options).removeItem(ADMIN_CREDENTIALS_STORAGE_KEY);
}
