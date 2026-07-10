export const MEA_GITHUB_TARGET = Object.freeze({
  owner: "Corentis-88",
  repo: "mea-business-technology-hub",
  branch: "main",
});

export interface PublishFile {
  path: string;
  content: string;
  encoding?: "utf-8" | "base64";
}

export interface PublishRequest {
  token: string;
  files: PublishFile[];
  message: string;
  expectedHeadSha?: string;
  fetch?: typeof fetch;
}

export interface PublishResult {
  previousCommitSha: string;
  commitSha: string;
  treeSha: string;
  branch: "main";
  repository: "Corentis-88/mea-business-technology-hub";
}

export class GitHubPublishError extends Error {
  constructor(message: string, public readonly status?: number, public readonly details?: unknown) {
    super(message);
    this.name = "GitHubPublishError";
  }
}

function validateFiles(files: PublishFile[]) {
  if (!files.length) throw new Error("At least one file is required for publishing.");
  const paths = new Set<string>();
  for (const file of files) {
    const path = file.path.trim();
    if (!path || path.startsWith("/") || path.includes("\\") || path.split("/").includes("..")) {
      throw new Error(`Unsafe repository path: ${file.path}`);
    }
    if (paths.has(path)) throw new Error(`Duplicate repository path: ${path}`);
    paths.add(path);
    if (file.encoding === "base64" && !/^[A-Za-z0-9+/]*={0,2}$/.test(file.content.replace(/\s/g, ""))) {
      throw new Error(`Invalid base64 content for ${path}`);
    }
  }
}

async function responseDetails(response: Response): Promise<unknown> {
  try { return await response.json(); } catch { return await response.text(); }
}

export async function publishToMeaRepository(request: PublishRequest): Promise<PublishResult> {
  const token = request.token.trim();
  const message = request.message.trim();
  if (!token) throw new Error("A GitHub token is required.");
  if (!message) throw new Error("A commit message is required.");
  validateFiles(request.files);
  const fetchApi = request.fetch ?? globalThis.fetch;
  if (!fetchApi) throw new Error("Fetch is unavailable.");
  const base = `https://api.github.com/repos/${MEA_GITHUB_TARGET.owner}/${MEA_GITHUB_TARGET.repo}`;
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
  const call = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
    const response = await fetchApi(`${base}${path}`, { ...init, headers: { ...headers, ...init.headers } });
    if (!response.ok) {
      const details = await responseDetails(response);
      throw new GitHubPublishError(`GitHub request failed (${response.status}) for ${path}.`, response.status, details);
    }
    return response.json() as Promise<T>;
  };

  const reference = await call<{ object: { sha: string } }>(`/git/ref/heads/${MEA_GITHUB_TARGET.branch}`);
  const previousCommitSha = reference.object.sha;
  if (request.expectedHeadSha && request.expectedHeadSha !== previousCommitSha) {
    throw new GitHubPublishError("The main branch changed since this draft was opened. Refresh before publishing.", 409, { expected: request.expectedHeadSha, actual: previousCommitSha });
  }
  const currentCommit = await call<{ tree: { sha: string } }>(`/git/commits/${previousCommitSha}`);
  const treeEntries: Array<{ path: string; mode: "100644"; type: "blob"; sha: string }> = [];
  for (const file of request.files) {
    const blob = await call<{ sha: string }>("/git/blobs", {
      method: "POST",
      body: JSON.stringify({ content: file.content, encoding: file.encoding ?? "utf-8" }),
    });
    treeEntries.push({ path: file.path.trim(), mode: "100644", type: "blob", sha: blob.sha });
  }
  const tree = await call<{ sha: string }>("/git/trees", {
    method: "POST",
    body: JSON.stringify({ base_tree: currentCommit.tree.sha, tree: treeEntries }),
  });
  const commit = await call<{ sha: string }>("/git/commits", {
    method: "POST",
    body: JSON.stringify({ message, tree: tree.sha, parents: [previousCommitSha] }),
  });
  await call(`/git/refs/heads/${MEA_GITHUB_TARGET.branch}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha, force: false }),
  });
  return {
    previousCommitSha,
    commitSha: commit.sha,
    treeSha: tree.sha,
    branch: "main",
    repository: "Corentis-88/mea-business-technology-hub",
  };
}
