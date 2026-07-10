import type { ContentBundle } from "../types";
import editorContent from "./editorContent.json";

// The admin publisher atomically replaces editorContent.json after validation.
// Keeping `published` null preserves the current TypeScript baselines exactly.
export const publishedContentOverride = editorContent.published as ContentBundle | null;
