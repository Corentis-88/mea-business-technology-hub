import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { businessCourse } from "../data/business";
import { businessPictures, getBusinessPicture } from "../data/businessPictures";

describe("Business teaching-picture library", () => {
  const sections = businessCourse.units.flatMap((unit) =>
    unit.topics.flatMap((topic) => topic.sections.map((section) => ({ topicId: topic.id, heading: section.heading }))),
  );

  it("has one unique teaching picture for every learning section", () => {
    expect(businessPictures).toHaveLength(sections.length);
    expect(new Set(businessPictures.map(({ topicId, sectionHeading }) => `${topicId}:${sectionHeading}`)).size).toBe(sections.length);
    for (const section of sections) expect(getBusinessPicture(section.topicId, section.heading)).toBeDefined();
  });

  it("references real, accessible WebP files", () => {
    for (const picture of businessPictures) {
      expect(picture.filename).toMatch(/^business\/[a-z0-9-]+\.webp$/);
      expect(existsSync(resolve("research/images", picture.filename))).toBe(true);
      expect(picture.alt.length).toBeGreaterThan(45);
      expect(picture.caption.length).toBeGreaterThan(45);
    }
  });
});
