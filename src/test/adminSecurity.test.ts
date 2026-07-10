import { beforeEach, describe, expect, it } from "vitest";
import {
  ADMIN_CREDENTIALS_STORAGE_KEY,
  GITHUB_TOKEN_STORAGE_KEY,
  clearAdminCredentials,
  deleteDraft,
  loadDraft,
  loadGitHubToken,
  loginAdmin,
  saveDraft,
  saveGitHubToken,
  setupAdminCredentials,
} from "../admin/lib";

const password = "A-long-admin-password-2026!";

describe("admin security", () => {
  beforeEach(() => localStorage.clear());

  it("stores a salted verifier instead of the password and authenticates locally", async () => {
    const session = await setupAdminCredentials("  MEA.Admin  ", password, { storage: localStorage });
    expect(session.username).toBe("mea.admin");
    const stored = localStorage.getItem(ADMIN_CREDENTIALS_STORAGE_KEY)!;
    expect(stored).not.toContain(password);
    expect(JSON.parse(stored)).toMatchObject({ version: 1, username: "mea.admin" });

    expect(await loginAdmin("MEA.ADMIN", "wrong-password-that-is-long", { storage: localStorage })).toBeNull();
    expect((await loginAdmin("mea.admin", password, { storage: localStorage }))?.username).toBe("mea.admin");

    clearAdminCredentials({ storage: localStorage });
    expect(await loginAdmin("mea.admin", password, { storage: localStorage })).toBeNull();
  });

  it("encrypts and decrypts a GitHub token with the in-memory session key", async () => {
    const session = await setupAdminCredentials("mea.admin", password, { storage: localStorage });
    const token = "github_pat_example_secret_value";
    await saveGitHubToken(token, session, { storage: localStorage });

    const stored = localStorage.getItem(GITHUB_TOKEN_STORAGE_KEY)!;
    expect(stored).not.toContain(token);
    expect(JSON.parse(stored)).toMatchObject({ version: 1, username: "mea.admin" });
    expect(await loadGitHubToken(session, { storage: localStorage })).toBe(token);
  });
});

describe("admin draft fallback", () => {
  beforeEach(() => localStorage.clear());

  it("persists, loads and deletes a typed draft when IndexedDB is unavailable", async () => {
    const options = { indexedDB: null, storage: localStorage, now: () => new Date("2026-07-10T09:00:00Z") };
    const saved = await saveDraft("course-business", { title: "Draft title", count: 2 }, options);
    expect(saved.updatedAt).toBe("2026-07-10T09:00:00.000Z");
    expect(await loadDraft<{ title: string; count: number }>("course-business", options)).toEqual(saved);

    await deleteDraft("course-business", options);
    expect(await loadDraft("course-business", options)).toBeNull();
  });
});
