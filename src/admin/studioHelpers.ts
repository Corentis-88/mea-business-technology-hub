import type { CourseId, CustomPage, EditableTopic, EditableTopicSection, EditableUnit } from "../types";

export interface PendingAsset {
  id: string;
  repositoryPath: string;
  publicPath: string;
  fileName: string;
  mimeType: string;
  bytes: Uint8Array;
  previewUrl: string;
}

const slug = (value: string) => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "")
  .slice(0, 48);

export const uniqueId = (prefix: string, label = "new") =>
  `${prefix}-${slug(label) || "new"}-${crypto.randomUUID().slice(0, 8)}`;

export const deepCopy = <T,>(value: T): T => structuredClone(value);

export const createSection = (): EditableTopicSection => ({
  id: uniqueId("section"),
  heading: "New explanation",
  paragraphs: ["Write a clear explanation here."],
});

export const createTopic = (unit: EditableUnit): EditableTopic => {
  const id = uniqueId(`${unit.id}-topic`);
  return {
    id,
    code: `${unit.code}.new`,
    title: "New topic",
    summary: "Add a short, student-friendly summary.",
    keywords: [],
    sections: [createSection()],
    keyTerms: [],
    commonMistakes: [],
    examTips: [],
    quiz: [],
    examQuestions: [],
    durationMinutes: 20,
  };
};

export const createUnit = (courseId: CourseId): EditableUnit => {
  const id = uniqueId(`${courseId}-unit`);
  const unit: EditableUnit = {
    id,
    code: "NEW",
    title: "New unit",
    description: "Explain what students will learn in this unit.",
    assessment: "Add assessment details",
    weight: "Add weighting",
    topics: [],
  };
  unit.topics.push(createTopic(unit));
  return unit;
};

export const createCustomPage = (): CustomPage => ({
  id: uniqueId("page"),
  slug: uniqueId("page").replace("page-", ""),
  title: "New page",
  summary: "Add a friendly introduction to this page.",
  showInNavigation: false,
  sections: [createSection()],
});

export const moveItem = <T,>(items: T[], from: number, to: number) => {
  const result = [...items];
  const [item] = result.splice(from, 1);
  result.splice(to, 0, item);
  return result;
};

export const linesToList = (value: string) => value.split("\n").map((item) => item.trim()).filter(Boolean);
export const listToLines = (value?: string[]) => (value ?? []).join("\n");

export const downloadJson = (value: unknown, fileName: string) => {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
};

const readAsDataUrl = (file: Blob) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result));
  reader.onerror = () => reject(reader.error);
  reader.readAsDataURL(file);
});

const loadImage = (url: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error("The image could not be opened."));
  image.src = url;
});

export async function prepareImage(file: File): Promise<PendingAsset> {
  if (!file.type.startsWith("image/")) throw new Error("Choose a PNG, JPEG or WebP image.");
  if (file.size > 20 * 1024 * 1024) throw new Error("That image is over 20 MB. Choose a smaller file.");

  const sourceUrl = await readAsDataUrl(file);
  const image = await loadImage(sourceUrl);
  const maxDimension = 1800;
  const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.naturalWidth * scale);
  canvas.height = Math.round(image.naturalHeight * scale);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser cannot prepare images.");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("The image could not be compressed.")), "image/webp", 0.84));
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const id = crypto.randomUUID();
  const safeName = slug(file.name.replace(/\.[^.]+$/, "")) || "lesson-image";
  const fileName = `${Date.now()}-${safeName}-${id.slice(0, 6)}.webp`;
  return {
    id,
    repositoryPath: `research/uploads/${fileName}`,
    publicPath: `uploads/${fileName}`,
    fileName,
    mimeType: "image/webp",
    bytes,
    previewUrl: URL.createObjectURL(blob),
  };
}
