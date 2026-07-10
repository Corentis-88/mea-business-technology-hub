import { describe, expect, it, vi } from "vitest";
import { GitHubPublishError, publishToMeaRepository } from "../admin/lib";

function json(value: unknown, status = 200) {
  return new Response(JSON.stringify(value), { status, headers: { "Content-Type": "application/json" } });
}

describe("atomic GitHub publishing", () => {
  it("creates blobs, a tree and a commit before moving main as the final request", async () => {
    let blobNumber = 0;
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/git/ref/heads/main")) return json({ object: { sha: "head-1" } });
      if (url.endsWith("/git/commits/head-1") && !init?.method) return json({ tree: { sha: "tree-1" } });
      if (url.endsWith("/git/blobs")) return json({ sha: `blob-${++blobNumber}` }, 201);
      if (url.endsWith("/git/trees")) return json({ sha: "tree-2" }, 201);
      if (url.endsWith("/git/commits") && init?.method === "POST") return json({ sha: "commit-2" }, 201);
      if (url.endsWith("/git/refs/heads/main") && init?.method === "PATCH") return json({ object: { sha: "commit-2" } });
      return json({ message: "unexpected" }, 500);
    });

    const result = await publishToMeaRepository({
      token: "github-token",
      message: "Publish admin content",
      expectedHeadSha: "head-1",
      files: [
        { path: "src/content/courses.json", content: "{\"version\":1}" },
        { path: "src/content/resources.json", content: "[]" },
      ],
      fetch: fetchMock as typeof fetch,
    });

    expect(result).toEqual({ previousCommitSha: "head-1", commitSha: "commit-2", treeSha: "tree-2", branch: "main", repository: "Corentis-88/mea-business-technology-hub" });
    expect(fetchMock).toHaveBeenCalledTimes(7);
    const calls = fetchMock.mock.calls;
    expect(String(calls.at(-1)?.[0])).toBe("https://api.github.com/repos/Corentis-88/mea-business-technology-hub/git/refs/heads/main");
    expect(calls.at(-1)?.[1]?.method).toBe("PATCH");
    expect(JSON.parse(String(calls.at(-1)?.[1]?.body))).toEqual({ sha: "commit-2", force: false });
    expect((calls[0][1]?.headers as Record<string, string>).Authorization).toBe("Bearer github-token");
    expect(String(calls[2][1]?.body)).not.toContain("github-token");

    const treeBody = JSON.parse(String(calls[4][1]?.body));
    expect(treeBody).toEqual({
      base_tree: "tree-1",
      tree: [
        { path: "src/content/courses.json", mode: "100644", type: "blob", sha: "blob-1" },
        { path: "src/content/resources.json", mode: "100644", type: "blob", sha: "blob-2" },
      ],
    });
  });

  it("stops before writing when the expected main commit is stale", async () => {
    const fetchMock = vi.fn(async () => json({ object: { sha: "new-head" } }));
    await expect(publishToMeaRepository({
      token: "github-token",
      message: "Publish stale draft",
      expectedHeadSha: "old-head",
      files: [{ path: "src/content/content.json", content: "{}" }],
      fetch: fetchMock as typeof fetch,
    })).rejects.toMatchObject({ name: "GitHubPublishError", status: 409 } satisfies Partial<GitHubPublishError>);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("rejects unsafe repository paths before contacting GitHub", async () => {
    const fetchMock = vi.fn();
    await expect(publishToMeaRepository({
      token: "github-token",
      message: "Unsafe publish",
      files: [{ path: "../secret.txt", content: "no" }],
      fetch: fetchMock as typeof fetch,
    })).rejects.toThrow(/Unsafe repository path/);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
