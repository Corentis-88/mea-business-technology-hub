import type { AdminSession } from "./auth";
import { base64ToBytes, bytesToBase64, decodeUtf8, requireWebCrypto, toArrayBuffer, utf8 } from "./encoding";

export const GITHUB_TOKEN_STORAGE_KEY = "mea-admin-github-token-v1";

interface EncryptedTokenRecord {
  version: 1;
  username: string;
  iv: string;
  ciphertext: string;
  savedAt: string;
}

export interface TokenVaultOptions {
  storage?: Storage;
  crypto?: Crypto;
  now?: () => Date;
}

function storageFrom(options?: TokenVaultOptions): Storage {
  const storage = options?.storage ?? globalThis.localStorage;
  if (!storage) throw new Error("Local storage is unavailable.");
  return storage;
}

function additionalData(username: string) {
  return utf8(`mea-admin-github-token:${username}:v1`);
}

export async function saveGitHubToken(token: string, session: AdminSession, options: TokenVaultOptions = {}): Promise<void> {
  const clean = token.trim();
  if (!clean) throw new Error("GitHub token cannot be empty.");
  const cryptoApi = requireWebCrypto(options.crypto);
  const iv = cryptoApi.getRandomValues(new Uint8Array(12));
  const encrypted = await cryptoApi.subtle.encrypt(
    { name: "AES-GCM", iv: toArrayBuffer(iv), additionalData: toArrayBuffer(additionalData(session.username)), tagLength: 128 },
    session.encryptionKey,
    toArrayBuffer(utf8(clean)),
  );
  const record: EncryptedTokenRecord = {
    version: 1,
    username: session.username,
    iv: bytesToBase64(iv),
    ciphertext: bytesToBase64(new Uint8Array(encrypted)),
    savedAt: (options.now?.() ?? new Date()).toISOString(),
  };
  storageFrom(options).setItem(GITHUB_TOKEN_STORAGE_KEY, JSON.stringify(record));
}

export async function loadGitHubToken(session: AdminSession, options: TokenVaultOptions = {}): Promise<string | null> {
  const raw = storageFrom(options).getItem(GITHUB_TOKEN_STORAGE_KEY);
  if (!raw) return null;
  let record: EncryptedTokenRecord;
  try {
    record = JSON.parse(raw) as EncryptedTokenRecord;
  } catch {
    throw new Error("The stored GitHub token record is invalid.");
  }
  if (record.version !== 1 || record.username !== session.username || !record.iv || !record.ciphertext) {
    throw new Error("The stored GitHub token does not belong to this admin session.");
  }
  try {
    const cryptoApi = requireWebCrypto(options.crypto);
    const decrypted = await cryptoApi.subtle.decrypt(
      { name: "AES-GCM", iv: toArrayBuffer(base64ToBytes(record.iv)), additionalData: toArrayBuffer(additionalData(session.username)), tagLength: 128 },
      session.encryptionKey,
      toArrayBuffer(base64ToBytes(record.ciphertext)),
    );
    return decodeUtf8(decrypted);
  } catch {
    throw new Error("The stored GitHub token could not be decrypted.");
  }
}

export function clearGitHubToken(options?: TokenVaultOptions): void {
  storageFrom(options).removeItem(GITHUB_TOKEN_STORAGE_KEY);
}
