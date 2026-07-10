import { describe, expect, it } from "vitest";
import { allTopics, courses } from "../data/courses";
import { officialDocumentHref, resources } from "../data/resources";
import { searchTopics } from "../lib/search";

describe("qualification coverage", () => {
  it("contains the four exact MEA qualifications", () => {
    expect(courses.map((course) => course.code)).toEqual(["1BS0", "J837", "J277", "J834"]);
  });

  it("covers every official unit split", () => {
    expect(courses.find((course) => course.id === "business")?.units.map((unit) => unit.code)).toEqual(["1BS0/01", "1BS0/02"]);
    expect(courses.find((course) => course.id === "enterprise")?.units.map((unit) => unit.code)).toEqual(["R067", "R068", "R069"]);
    expect(courses.find((course) => course.id === "computer-science")?.units.map((unit) => unit.code)).toEqual(["J277/01", "J277/02"]);
    expect(courses.find((course) => course.id === "creative-imedia")?.units.map((unit) => unit.code)).toEqual(["R093", "R094", "R095"]);
  });

  it("has meaningful revision content for every topic", () => {
    expect(allTopics.length).toBeGreaterThanOrEqual(47);
    for (const { topic } of allTopics) {
      expect(topic.summary.length).toBeGreaterThan(20);
      expect(topic.sections.length).toBeGreaterThan(0);
      expect(topic.keyTerms.length).toBeGreaterThan(0);
      expect(topic.quiz.length).toBeGreaterThanOrEqual(2);
      expect(topic.commonMistakes.length).toBeGreaterThan(0);
      expect(topic.examTips.length).toBeGreaterThan(0);
    }
  });

  it("gives every topic at least one explanatory visual", () => {
    for (const { topic } of allTopics) {
      expect(topic.sections.some((section) => section.visual || section.visuals?.length || section.image)).toBe(true);
    }
  });

  it("uses unique topic and quiz identifiers inside each qualification", () => {
    for (const course of courses) {
      const topics = course.units.flatMap((unit) => unit.topics);
      expect(new Set(topics.map((topic) => topic.id)).size).toBe(topics.length);
      const quizIds = topics.flatMap((topic) => topic.quiz.map((question) => question.id));
      expect(new Set(quizIds).size).toBe(quizIds.length);
    }
  });
});

describe("qualification-scoped search", () => {
  it("finds break-even in both business qualifications", () => {
    const ids = new Set(searchTopics("break even").map(({ item }) => item.courseId));
    expect(ids.has("business")).toBe(true);
    expect(ids.has("enterprise")).toBe(true);
  });

  it("keeps BLT restricted to Pearson Business", () => {
    const results = searchTopics("BLT");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(({ item }) => item.courseId === "business")).toBe(true);
    expect(searchTopics("BLT", "enterprise")).toEqual([]);
  });

  it("supports course codes and common misspellings", () => {
    expect(searchTopics("R095").some(({ item }) => item.courseId === "creative-imedia")).toBe(true);
    expect(searchTopics("psuedocode").some(({ item }) => item.courseId === "computer-science")).toBe(true);
  });

  it("keeps specific searches concise and relevant", () => {
    const cpuResults = searchTopics("CPU");
    expect(cpuResults.length).toBeGreaterThan(0);
    expect(cpuResults.length).toBeLessThanOrEqual(5);
    expect(cpuResults.every(({ item }) => item.courseId === "computer-science")).toBe(true);
  });
});

describe("materials", () => {
  it("has official local materials for every course", () => {
    for (const course of courses) {
      const local = resources.filter((resource) => resource.courseId === course.id && resource.official && resource.local);
      expect(local.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("keeps official documents inside the deployed GitHub Pages base path", () => {
    expect(officialDocumentHref("sample.pdf", "/mea-business-technology-hub/")).toBe(
      "/mea-business-technology-hub/official-documents/sample.pdf",
    );
  });

  it("uses valid secure URLs for every external material", () => {
    const external = resources.filter((resource) => !resource.local);
    expect(external.length).toBeGreaterThan(0);
    for (const resource of external) {
      expect(new URL(resource.href).protocol).toBe("https:");
    }
  });
});
