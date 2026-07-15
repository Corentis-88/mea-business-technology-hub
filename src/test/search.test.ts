import { describe, expect, it } from "vitest";
import { searchDocuments, searchTopics } from "../lib/search";

describe("student search", () => {
  it("indexes every revision topic", () => {
    expect(searchDocuments.length).toBeGreaterThan(40);
    expect(searchDocuments.every((document) => document.terms.length > 0)).toBe(true);
  });

  it("understands natural-language questions", () => {
    const results = searchTopics("What is added value?");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].item.title.toLowerCase()).toContain("enterprise");
    expect(results.some((result) => /added value/i.test(`${result.item.summary} ${result.item.keywords.join(" ")} ${result.item.terms.join(" ")}`))).toBe(true);
  });

  it("uses student-friendly aliases", () => {
    expect(searchTopics("money left over")[0].item.keywords.join(" ").toLowerCase()).toContain("profit");
    expect(searchTopics("customer wants").some((result) => /customer needs/i.test(`${result.item.summary} ${result.item.keywords.join(" ")}`))).toBe(true);
    expect(searchTopics("comic course")[0].item.courseId).toBe("creative-imedia");
  });

  it("handles common spelling mistakes", () => {
    const results = searchTopics("entreprenur");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((result) => /entrepreneur/i.test(`${result.item.title} ${result.item.summary} ${result.item.keywords.join(" ")}`))).toBe(true);
  });

  it("finds Coursework Assist detail that is not in the topic title", () => {
    const results = searchTopics("two primary tools and one secondary tool");
    expect(results[0].item.topicId).toBe("enterprise-r068-1");
  });

  it("always gives a useful response for a non-empty search", () => {
    const results = searchTopics("purple elephants dancing on mars");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.matchType === "suggestion")).toBe(true);
    expect(results.every((result) => result.matchReason.length > 0)).toBe(true);
  });

  it("keeps qualification searches inside the selected qualification", () => {
    const results = searchTopics("something completely unknown", "computer-science");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.item.courseId === "computer-science")).toBe(true);
  });

  it("keeps BLT inside Pearson Business", () => {
    const businessResults = searchTopics("BLT");
    expect(businessResults.length).toBeGreaterThan(0);
    expect(businessResults.every((result) => result.item.courseId === "business")).toBe(true);

    const enterpriseResults = searchTopics("BLT", "enterprise");
    expect(enterpriseResults).toEqual([]);
  });
});
