import type { KeyTerm, Topic } from "../types";

export function anchorSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function topicSectionAnchor(topic: Topic, sectionIndex: number) {
  const section = topic.sections[sectionIndex] ?? topic.sections[0];
  return `section-${topic.id}-${anchorSlug(section.heading)}`;
}

export function sectionIndexForTerm(topic: Topic, term: KeyTerm) {
  const needle = term.term.toLowerCase();
  let bestIndex = 0;
  let bestScore = -1;

  topic.sections.forEach((section, index) => {
    const heading = section.heading.toLowerCase();
    const body = [
      ...section.paragraphs,
      ...(section.bullets ?? []),
      section.formula ?? "",
      section.example ?? "",
      section.visual?.title ?? "",
      section.visual?.caption ?? "",
      ...(section.visuals?.flatMap((visual) => [visual.title, visual.caption]) ?? []),
      section.image?.caption ?? "",
    ].join(" ").toLowerCase();
    const score = (heading.includes(needle) ? 6 : 0) + (body.includes(needle) ? 3 : 0);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  if (bestScore <= 0) {
    const termIndex = topic.keyTerms.findIndex((item) => item.term === term.term);
    return Math.max(0, termIndex) % topic.sections.length;
  }
  return bestIndex;
}

export function anchorForTerm(topic: Topic, term: KeyTerm) {
  return topicSectionAnchor(topic, sectionIndexForTerm(topic, term));
}
