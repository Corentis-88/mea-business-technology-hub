import { describe, expect, it } from "vitest";
import { publishedContentOverride } from "../content/published";
import { createEditableSnapshotFromBaselines } from "../content/snapshot";
import { validateContentBundle } from "../content/validation";
import { baselineCourses, courses } from "../data/courses";
import { baselinePracticeCases, practiceCases } from "../data/extendedWriting";
import { baselineResources, resources } from "../data/resources";

describe("versioned editable content seam", () => {
  it("preserves the current public baselines while no override is published", () => {
    expect(publishedContentOverride).toBeNull();
    expect(courses).toBe(baselineCourses);
    expect(resources).toBe(baselineResources);
    expect(practiceCases).toBe(baselinePracticeCases);
  });

  it("creates a complete, detached and valid editable snapshot", () => {
    const snapshot = createEditableSnapshotFromBaselines({ contentVersion: 7, updatedAt: "2026-07-10T09:00:00.000Z" });

    expect(snapshot.schemaVersion).toBe(1);
    expect(snapshot.contentVersion).toBe(7);
    expect(snapshot.courses).toHaveLength(baselineCourses.length);
    expect(snapshot.resources).toHaveLength(baselineResources.length);
    expect(snapshot.practiceCases).toHaveLength(baselinePracticeCases.length);
    expect(snapshot.siteSettings.siteName).toBe("MEA Business and Technology Hub");
    expect(snapshot.customPages).toEqual([]);
    expect(snapshot.enterpriseSimpleGuides.length).toBeGreaterThan(0);
    expect(Object.keys(snapshot.enterpriseSimpleVisuals).length).toBeGreaterThan(0);
    expect(snapshot.courses).not.toBe(baselineCourses);
    expect(snapshot.courses.flatMap((course) => course.units.flatMap((unit) => unit.topics.flatMap((topic) => topic.sections))).every((section) => section.id.length > 0)).toBe(true);
    expect(validateContentBundle(snapshot)).toEqual([]);
  });

  it("reports unsafe or structurally broken edits before publication", () => {
    const snapshot = createEditableSnapshotFromBaselines();
    const business = snapshot.courses.find((course) => course.id === "business")!;
    const enterprise = snapshot.courses.find((course) => course.id === "enterprise")!;
    const topic = business.units[0].topics[0];
    const section = topic.sections[0];

    section.id = "";
    section.paragraphs = ["   "];
    section.image = { src: "uploads/example.webp", alt: "", caption: "Example" };
    topic.quiz[0].options = ["Only one option"];
    topic.quiz[0].answer = 4;
    snapshot.resources[1].id = snapshot.resources[0].id;
    snapshot.resources[0].href = "javascript:alert('unsafe')";
    business.answerMethod!.scope = "Use BLT for every qualification";
    enterprise.answerMethod = structuredClone(business.answerMethod);
    snapshot.enterpriseSimpleGuides = snapshot.enterpriseSimpleGuides.filter((guide) => guide.topicId !== enterprise.units[0].topics[0].id);

    const codes = new Set(validateContentBundle(snapshot).map((issue) => issue.code));
    expect([...codes]).toEqual(expect.arrayContaining([
      "empty-id",
      "duplicate-id",
      "missing-section-text",
      "missing-image-alt",
      "bad-quiz-options",
      "bad-quiz-answer",
      "bad-resource-url",
      "business-blt-scope",
      "blt-outside-business",
      "missing-simple-guide",
    ]));
  });
});
