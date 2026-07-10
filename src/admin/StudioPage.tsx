import { useCallback, useEffect, useMemo, useState } from "react";
import { createEditableSnapshotFromBaselines, publishedContentOverride, validateContentBundle } from "../content";
import type { ContentBundle } from "../types";
import type { AdminSession } from "./lib";
import { deleteDraft, loadDraft, loadGitHubToken, publishToMeaRepository, saveDraft, saveGitHubToken } from "./lib";
import { StudioLogin } from "./StudioLogin";
import { StudioWorkspace } from "./StudioWorkspace";
import type { PendingAsset } from "./studioHelpers";
import { CONTENT_FILE_PATH } from "./studioConfig";
import "./studio.css";

const DRAFT_ID = "mea-site-content";

interface StoredStudioDraft {
  bundle: ContentBundle;
  assets: Array<Omit<PendingAsset, "previewUrl" | "bytes"> & { bytesBase64: string }>;
}

const initialBundle = () => structuredClone(publishedContentOverride ?? createEditableSnapshotFromBaselines());
const normaliseBundle = (value: ContentBundle): ContentBundle => {
  const fallback = initialBundle();
  return {
    ...fallback,
    ...value,
    enterpriseSimpleGuides: value.enterpriseSimpleGuides ?? fallback.enterpriseSimpleGuides,
    enterpriseSimpleVisuals: value.enterpriseSimpleVisuals ?? fallback.enterpriseSimpleVisuals,
  };
};

const toBase64 = (bytes: Uint8Array) => {
  let binary = "";
  const chunk = 0x8000;
  for (let index = 0; index < bytes.length; index += chunk) {
    binary += String.fromCharCode(...bytes.subarray(index, Math.min(index + chunk, bytes.length)));
  }
  return btoa(binary);
};
const fromBase64 = (value: string) => Uint8Array.from(atob(value), (character) => character.charCodeAt(0));

export function StudioPage() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [history, setHistory] = useState<ContentBundle[]>([initialBundle()]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [assets, setAssets] = useState<PendingAsset[]>([]);
  const [loadingDraft, setLoadingDraft] = useState(false);
  const [draftStatus, setDraftStatus] = useState("Saved locally");

  const bundle = history[historyIndex];
  const validationIssues = useMemo(() => validateContentBundle(bundle), [bundle]);

  const changeBundle = useCallback((next: ContentBundle | ((current: ContentBundle) => ContentBundle)) => {
    setHistory((currentHistory) => {
      const current = currentHistory[historyIndex];
      const value = typeof next === "function" ? next(structuredClone(current)) : next;
      return [...currentHistory.slice(0, historyIndex + 1), value].slice(-50);
    });
    setHistoryIndex((current) => Math.min(current + 1, 49));
    setDraftStatus("Saving…");
  }, [historyIndex]);

  const unlock = async (nextSession: AdminSession) => {
    setSession(nextSession);
    setLoadingDraft(true);
    try {
      const record = await loadDraft<StoredStudioDraft>(DRAFT_ID);
      if (record?.content?.bundle) {
        setHistory([normaliseBundle(record.content.bundle)]);
        setHistoryIndex(0);
        setAssets((record.content.assets ?? []).map(({ bytesBase64, ...asset }) => {
          const bytes = fromBase64(bytesBase64);
          return { ...asset, bytes, previewUrl: URL.createObjectURL(new Blob([bytes], { type: asset.mimeType })) };
        }));
        setDraftStatus(`Draft restored from ${new Date(record.updatedAt).toLocaleString()}`);
      }
    } finally {
      setLoadingDraft(false);
    }
  };

  useEffect(() => {
    if (!session || loadingDraft) return;
    const timer = window.setTimeout(async () => {
      await saveDraft<StoredStudioDraft>(DRAFT_ID, {
        bundle,
        assets: assets.map(({ previewUrl: _previewUrl, bytes, ...asset }) => ({ ...asset, bytesBase64: toBase64(bytes) })),
      });
      setDraftStatus(`Saved locally at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [assets, bundle, loadingDraft, session]);

  const undo = () => setHistoryIndex((current) => Math.max(0, current - 1));
  const redo = () => setHistoryIndex((current) => Math.min(history.length - 1, current + 1));

  const importBundle = (next: ContentBundle) => {
    if (!next || next.schemaVersion !== 1 || !Array.isArray(next.courses) || !Array.isArray(next.resources) || !Array.isArray(next.practiceCases)) {
      throw new Error("This is not an MEA Content Studio backup. Choose a JSON backup exported from this studio.");
    }
    next = normaliseBundle(next);
    const issues = validateContentBundle(next);
    if (issues.length) throw new Error(`This backup has ${issues.length} problem${issues.length === 1 ? "" : "s"}. Fix the first one before importing: ${issues[0].message}`);
    changeBundle(structuredClone(next));
  };

  const resetDraft = async () => {
    await deleteDraft(DRAFT_ID);
    assets.forEach((asset) => URL.revokeObjectURL(asset.previewUrl));
    setAssets([]);
    setHistory([initialBundle()]);
    setHistoryIndex(0);
    setDraftStatus("Started again from the published site");
  };

  const publish = async (token: string, message: string) => {
    if (validationIssues.length) throw new Error(`Publishing is paused because ${validationIssues.length} item${validationIssues.length === 1 ? " needs" : "s need"} attention.`);
    const publishBundle: ContentBundle = {
      ...structuredClone(bundle),
      contentVersion: bundle.contentVersion + 1,
      updatedAt: new Date().toISOString(),
    };
    const files = [
      { path: CONTENT_FILE_PATH, content: `${JSON.stringify({ published: publishBundle }, null, 2)}\n`, encoding: "utf-8" as const },
      ...assets.map((asset) => ({ path: asset.repositoryPath, content: toBase64(asset.bytes), encoding: "base64" as const })),
    ];
    const result = await publishToMeaRepository({ token, files, message });
    changeBundle(publishBundle);
    assets.forEach((asset) => URL.revokeObjectURL(asset.previewUrl));
    setAssets([]);
    return result;
  };

  if (!session) return <StudioLogin onUnlock={unlock} />;
  if (loadingDraft) return <main className="studio-loading"><div className="studio-spinner" /><h1>Opening your saved draft…</h1></main>;

  return (
    <StudioWorkspace
      session={session}
      bundle={bundle}
      validationIssues={validationIssues}
      onChange={changeBundle}
      assets={assets}
      onAssetsChange={setAssets}
      canUndo={historyIndex > 0}
      canRedo={historyIndex < history.length - 1}
      onUndo={undo}
      onRedo={redo}
      draftStatus={draftStatus}
      onImport={importBundle}
      onReset={resetDraft}
      onPublish={publish}
      onSaveToken={(token) => saveGitHubToken(token, session)}
      loadSavedToken={() => loadGitHubToken(session)}
      onLogout={() => setSession(null)}
    />
  );
}
