import Fuse from "fuse.js";
import { courses } from "../data/courses";
import type { SearchDocument } from "../types";

export const searchDocuments: SearchDocument[] = courses.flatMap((course) =>
  course.units.flatMap((unit) =>
    unit.topics.map((topic) => ({
      id: `${course.id}:${unit.id}:${topic.id}`,
      courseId: course.id,
      courseTitle: course.shortTitle,
      courseCode: course.code,
      unitId: unit.id,
      unitTitle: unit.title,
      topicId: topic.id,
      topicCode: topic.code,
      title: topic.title,
      summary: topic.summary,
      keywords: [...topic.keywords, ...topic.sections.flatMap((section) => [section.heading, section.visual?.title ?? "", ...(section.visuals?.map((visual) => visual.title) ?? []), section.image?.caption ?? ""]), ...course.aliases],
      terms: [...topic.keyTerms.flatMap((term) => [term.term, term.definition]), ...topic.sections.flatMap((section) => section.bullets ?? [])],
    })),
  ),
);

const fuse = new Fuse(searchDocuments, {
  includeScore: true,
  threshold: 0.36,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: [
    { name: "title", weight: 0.32 },
    { name: "topicCode", weight: 0.2 },
    { name: "keywords", weight: 0.18 },
    { name: "terms", weight: 0.14 },
    { name: "summary", weight: 0.1 },
    { name: "unitTitle", weight: 0.04 },
    { name: "courseCode", weight: 0.02 },
  ],
});

const aliases: Record<string, string> = {
  breakeven: "break-even",
  "break even": "break-even",
  turnover: "sales revenue",
  psuedocode: "pseudocode",
  entreprenuer: "entrepreneur",
  enterpreneur: "entrepreneur",
  moodboard: "mood board",
  mindmap: "mind map",
  imedia: "creative imedia",
  "computer systems": "systems architecture memory networks security software",
};

export function searchTopics(query: string, courseId?: string) {
  const cleaned = query.trim().toLowerCase();
  if (!cleaned) return [];
  const normalized = aliases[cleaned] ?? cleaned;

  // BLT is an MEA Pearson Business method and must never leak into other courses.
  if (["blt", "because leads to therefore", "business blt"].includes(normalized)) {
    return searchDocuments
      .filter((doc) => doc.courseId === "business" && (!courseId || courseId === "business"))
      .filter((doc) => /exam|answer|enterprise|entrepreneur/i.test(`${doc.title} ${doc.summary} ${doc.keywords.join(" ")}`))
      .slice(0, 8)
      .map((item) => ({ item, score: 0 }));
  }

  const normaliseText = (value: string) => value.toLowerCase().replace(/[–—-]/g, " ");
  const tokens = normaliseText(normalized).split(/\s+/).filter(Boolean);
  const directMatches = searchDocuments.filter((item) => {
    if (courseId && item.courseId !== courseId) return false;
    const haystack = normaliseText([
      item.title,
      item.topicCode,
      item.unitTitle,
      item.courseCode,
      item.summary,
      ...item.keywords,
      ...item.terms,
    ].join(" "));
    return tokens.every((token) => haystack.includes(token));
  });

  // Prefer clear phrase/token matches. Fuzzy matching remains as a concise
  // fallback for spelling mistakes, without flooding students with weak hits.
  if (directMatches.length) return directMatches.slice(0, 30).map((item) => ({ item, score: 0 }));

  return fuse.search(normalized).filter((result) => !courseId || result.item.courseId === courseId).slice(0, 12);
}
