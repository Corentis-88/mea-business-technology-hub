import { describe, expect, it } from "vitest";
import { enterprisePictureScenes } from "../data/enterprisePictureScenes";

const expectedTopicIds = [
  "enterprise-r067-1",
  "enterprise-r067-2",
  "enterprise-r067-3",
  "enterprise-r067-4",
  "enterprise-r067-5",
  "enterprise-r068-1",
  "enterprise-r068-2",
  "enterprise-r068-3",
  "enterprise-r068-4",
  "enterprise-r068-5",
  "enterprise-r068-6",
  "enterprise-r069-1",
  "enterprise-r069-2",
  "enterprise-r069-3",
  "enterprise-r069-4",
  "enterprise-r069-5",
];

describe("Enterprise teaching pictures", () => {
  it("maps one unique teaching scene to every Enterprise revision topic", () => {
    expect(Object.keys(enterprisePictureScenes).sort()).toEqual(expectedTopicIds);

    const filenames = Object.values(enterprisePictureScenes).map(({ filename }) => filename);
    expect(new Set(filenames).size).toBe(expectedTopicIds.length);
  });

  it("gives every mapped picture accessible teaching copy", () => {
    for (const picture of Object.values(enterprisePictureScenes)) {
      expect(picture.alt.length).toBeGreaterThan(40);
      expect(picture.caption.length).toBeGreaterThan(40);
    }
  });

  it("covers all 35 Enterprise teaching sections without empty scene briefs", () => {
    const coveredSections = Object.values(enterprisePictureScenes).flatMap(
      ({ sectionCoverage }) => sectionCoverage,
    );

    expect(coveredSections).toHaveLength(35);
    expect(coveredSections.every((section) => section.trim().length > 0)).toBe(true);
    expect(
      Object.values(enterprisePictureScenes).every(({ prompt }) => prompt.length > 300),
    ).toBe(true);
  });
});
