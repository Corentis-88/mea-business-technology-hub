import Fuse from "fuse.js";
import { courses } from "../data/courses";
import { enterpriseSimpleGuideByTopic } from "../data/enterpriseSimple";
import { r068CourseworkGuides } from "../data/r068Coursework";
import { curatedTopicVideos } from "../data/videos";
import type { CourseId, SearchDocument, TopicSection } from "../types";

export type SearchMatchType = "exact" | "related" | "suggestion";

export interface TopicSearchResult {
  item: SearchDocument;
  score: number;
  matchType: SearchMatchType;
  matchReason: string;
  matchedTerms: string[];
}

const compact = (parts: Array<string | undefined>) => parts.filter((part): part is string => Boolean(part?.trim()));

const visualTerms = (section: TopicSection) => compact([
  section.visual?.title,
  section.visual?.caption,
  ...(section.visual?.labels ?? []),
  ...(section.visuals?.flatMap((visual) => [visual.title, visual.caption, ...(visual.labels ?? [])]) ?? []),
  section.image?.alt,
  section.image?.caption,
]);

const simpleTermsForTopic = (topicId: string) => {
  const guide = enterpriseSimpleGuideByTopic.get(topicId);
  if (!guide) return [];
  return compact([
    guide.bigIdea,
    ...guide.sections.flatMap((section) => [
      section.heading,
      section.simpleHeading,
      ...section.explanation,
      ...(section.steps ?? []),
      section.example,
    ]),
  ]);
};

const courseworkTermsForTopic = (topicId: string) => {
  const guide = r068CourseworkGuides[topicId];
  if (!guide) return [];
  return compact([
    "coursework assist writing help word count full marks top band",
    guide.title,
    guide.topBand,
    guide.wordCountGuide,
    guide.warning,
    ...guide.evidenceChain,
    ...guide.finalChecks,
    ...guide.sections.flatMap((section) => [
      section.heading,
      section.purpose,
      section.wordGuide,
      ...section.include,
      ...section.prompts,
      ...section.starters,
    ]),
  ]);
};

const videoTermsForTopic = (courseId: CourseId, topicId: string) => curatedTopicVideos
  .filter((video) => video.courseId === courseId && video.topicId === topicId)
  .flatMap((video) => [video.title, video.provider, video.description, video.qualityNote]);

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
      keywords: compact([
        ...topic.keywords,
        ...topic.sections.flatMap((section) => [section.heading, ...visualTerms(section)]),
        ...course.aliases,
        course.qualification,
        course.examBoard,
        unit.code,
      ]),
      terms: compact([
        course.description,
        course.assessmentSummary,
        unit.description,
        unit.assessment,
        unit.weight,
        ...topic.keyTerms.flatMap((term) => [term.term, term.definition]),
        ...topic.sections.flatMap((section) => [
          ...section.paragraphs,
          ...(section.bullets ?? []),
          section.formula,
          section.example,
          ...visualTerms(section),
        ]),
        ...topic.commonMistakes,
        ...topic.examTips,
        ...topic.quiz.flatMap((question) => [question.prompt, ...question.options, question.explanation]),
        ...(topic.examQuestions?.flatMap((question) => [question.command, question.prompt, ...question.guidance, question.model]) ?? []),
        ...simpleTermsForTopic(topic.id),
        ...courseworkTermsForTopic(topic.id),
        ...videoTermsForTopic(course.id, topic.id),
      ]),
    })),
  ),
);

const normaliseText = (value: string) => value
  .normalize("NFKD")
  .toLowerCase()
  .replace(/[’']/g, "")
  .replace(/&/g, " and ")
  .replace(/[\u2013\u2014-]/g, " ")
  .replace(/[^a-z0-9£%+/.\s]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const aliasRules: Array<[RegExp, string]> = [
  [/\b(break ?even|breakeven)\b/g, "break even"],
  [/\b(turnover|money coming in|sales income)\b/g, "sales revenue"],
  [/\b(money left over|money made after costs)\b/g, "profit"],
  [/\b(customer wants|what customers want)\b/g, "customer needs"],
  [/\b(psuedocode|pseuodocode)\b/g, "pseudocode"],
  [/\b(entreprenuer|enterpreneur|entreprenur)\b/g, "entrepreneur"],
  [/\b(stakehoulders|stakeolders)\b/g, "stakeholders"],
  [/\b(revanue|revenew)\b/g, "revenue"],
  [/\b(moodboard)\b/g, "mood board"],
  [/\b(mindmap)\b/g, "mind map"],
  [/\b(i media|imedia)\b/g, "creative imedia"],
  [/\b(comic course|comic qualification)\b/g, "creative imedia comics"],
  [/\b(burger coursework|burger assignment)\b/g, "r068 coursework assist"],
  [/\b(computer memory)\b/g, "ram rom storage virtual memory"],
  [/\b(blt method|business blt)\b/g, "blt because leads to therefore"],
  [/\b(money out)\b/g, "costs cash outflow"],
  [/\b(the four ps|4 ps)\b/g, "marketing mix product price place promotion"],
];

const stopWords = new Set([
  "a", "about", "an", "and", "are", "can", "could", "define", "do", "does", "explain", "for", "from",
  "help", "how", "i", "in", "is", "it", "me", "of", "on", "please", "show", "tell", "the", "this", "to",
  "understand", "what", "when", "where", "which", "who", "why", "with", "would",
]);

function expandQuery(query: string) {
  let expanded = normaliseText(query);
  aliasRules.forEach(([pattern, replacement]) => { expanded = expanded.replace(pattern, replacement); });
  return normaliseText(expanded);
}

function meaningfulTokens(query: string) {
  const tokens = query.split(/\s+/).filter((token) => token.length > 1 && !stopWords.has(token));
  return [...new Set(tokens.length ? tokens : query.split(/\s+/).filter((token) => token.length > 1))];
}

const searchableText = (item: SearchDocument) => normaliseText([
  item.title,
  item.topicCode,
  item.unitTitle,
  item.courseTitle,
  item.courseCode,
  item.summary,
  ...item.keywords,
  ...item.terms,
].join(" "));

const fuse = new Fuse(searchDocuments, {
  includeScore: true,
  threshold: 0.58,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: [
    { name: "title", weight: 0.3 },
    { name: "topicCode", weight: 0.18 },
    { name: "keywords", weight: 0.2 },
    { name: "terms", weight: 0.16 },
    { name: "summary", weight: 0.08 },
    { name: "unitTitle", weight: 0.04 },
    { name: "courseCode", weight: 0.04 },
  ],
});

function fallbackResults(courseId?: string, query = ""): TopicSearchResult[] {
  const courseHints: Array<[CourseId, RegExp]> = [
    ["business", /\b(1bs0|pearson|edexcel|business gcse|blt)\b/],
    ["enterprise", /\b(j837|r067|r068|camnat|enterprise and marketing)\b/],
    ["computer-science", /\b(j277|computer science|coding|programming)\b/],
    ["creative-imedia", /\b(j834|r093|r094|r095|creative imedia|comic)\b/],
  ];
  const hintedCourse = courseHints.find(([, pattern]) => pattern.test(query))?.[0];
  const effectiveCourse = courseId || hintedCourse;
  const candidates = effectiveCourse
    ? searchDocuments.filter((item) => item.courseId === effectiveCourse).slice(0, 5)
    : courses.flatMap((course) => searchDocuments.filter((item) => item.courseId === course.id).slice(0, 1));

  return candidates.map((item, index) => ({
    item,
    score: 0.9 + index / 100,
    matchType: "suggestion",
    matchReason: effectiveCourse
      ? "No exact match was found, so here is a useful starting point in this qualification."
      : "No exact match was found, so here is a starting point from one of MEA's qualifications.",
    matchedTerms: [],
  }));
}

const bltQueries = ["blt", "because leads to therefore", "blt because leads to therefore"];

export function searchTopics(query: string, courseId?: string): TopicSearchResult[] {
  const expanded = expandQuery(query);
  if (!expanded) return [];
  const tokens = meaningfulTokens(expanded);
  const filteredDocuments = searchDocuments.filter((item) => !courseId || item.courseId === courseId);

  // BLT is an MEA Pearson Business method and must never leak into another qualification.
  if (bltQueries.some((bltQuery) => expanded === bltQuery || expanded.includes(bltQuery))) {
    if (courseId && courseId !== "business") {
      return [];
    }
    return searchDocuments
      .filter((doc) => doc.courseId === "business")
      .filter((doc) => /exam|answer|enterprise|entrepreneur/i.test(`${doc.title} ${doc.summary} ${doc.keywords.join(" ")}`))
      .slice(0, 8)
      .map((item) => ({ item, score: 0, matchType: "exact", matchReason: "Matches MEA's Pearson Business BLT answer method.", matchedTerms: ["BLT"] }));
  }

  const ranked = filteredDocuments.map((item) => {
    const haystack = searchableText(item);
    const title = normaliseText(item.title);
    const code = normaliseText(`${item.topicCode} ${item.courseCode}`);
    const keywords = item.keywords.map(normaliseText);
    const matchedTerms = tokens.filter((token) => haystack.includes(token));
    const coverage = tokens.length ? matchedTerms.length / tokens.length : 0;
    const phraseMatch = expanded.length > 2 && haystack.includes(expanded);
    let score = 1;
    let matchReason = "Related words appear in this topic.";

    if (title === expanded || code.split(" ").includes(expanded)) {
      score = 0;
      matchReason = "Exact topic title or course-code match.";
    } else if (title.includes(expanded)) {
      score = 0.02;
      matchReason = "The search phrase appears in the topic title.";
    } else if (keywords.some((keyword) => keyword === expanded || keyword.includes(expanded))) {
      score = 0.04;
      matchReason = "Matches a key word taught in this topic.";
    } else if (phraseMatch) {
      score = 0.07;
      matchReason = "The search phrase appears in this topic's explanation or revision help.";
    } else if (coverage === 1) {
      score = 0.1;
      matchReason = "All the important words appear in this topic.";
    } else if (coverage >= 0.5 || matchedTerms.length >= 2) {
      score = 0.22 + (1 - coverage) * 0.2;
      matchReason = "Several important words appear in this topic.";
    }
    return { item, score, coverage, matchedTerms, matchReason };
  });

  const directMatches = ranked
    .filter((result) => result.score < 1)
    .sort((a, b) => a.score - b.score || b.coverage - a.coverage || a.item.title.localeCompare(b.item.title));

  if (directMatches.length) {
    const directLimit = tokens.length === 1 ? 5 : 30;
    return directMatches.slice(0, directLimit).map(({ item, score, matchedTerms, matchReason }) => ({
      item,
      score,
      matchedTerms,
      matchReason,
      matchType: score <= 0.1 ? "exact" : "related",
    }));
  }

  const fuzzyMatches = fuse.search(expanded)
    .filter((result) => !courseId || result.item.courseId === courseId)
    .slice(0, 12);
  if (fuzzyMatches.length) {
    return fuzzyMatches.map((result) => ({
      item: result.item,
      score: result.score ?? 0.5,
      matchType: (result.score ?? 0.5) <= 0.38 ? "related" : "suggestion",
      matchReason: (result.score ?? 0.5) <= 0.38
        ? "This is a close spelling or wording match."
        : "This is the closest available spelling or wording match.",
      matchedTerms: [],
    }));
  }

  return fallbackResults(courseId, expanded);
}
