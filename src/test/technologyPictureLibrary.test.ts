import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import computerScienceCourse from "../data/computerScience";
import creativeIMediaCourse from "../data/creativeImedia";
import { getTechnologyPicture, technologyPictureLibrary } from "../data/technologyPictureLibrary";

describe("Computer Science and Creative iMedia teaching pictures", () => {
  it("gives every technology topic at least one purposeful teaching scene", () => {
    const topics = [computerScienceCourse, creativeIMediaCourse]
      .flatMap((course) => course.units)
      .flatMap((unit) => unit.topics);

    for (const topic of topics) {
      expect(
        technologyPictureLibrary.some((picture) => picture.topicId === topic.id),
        `${topic.id} has no teaching picture`,
      ).toBe(true);
    }
  });

  it("keeps lookup keys and filenames unique", () => {
    const keys = technologyPictureLibrary.map((picture) => `${picture.topicId}:${picture.sectionHeading}`);
    const filenames = technologyPictureLibrary.map((picture) => picture.filename);

    expect(new Set(keys).size).toBe(keys.length);
    expect(new Set(filenames).size).toBe(filenames.length);
    for (const picture of technologyPictureLibrary) {
      expect(getTechnologyPicture(picture.topicId, picture.sectionHeading)).toBe(picture);
    }
  });

  it("ships every listed scene as a substantial WebP asset", () => {
    expect(technologyPictureLibrary).toHaveLength(22);

    for (const picture of technologyPictureLibrary) {
      const path = resolve("research/images", picture.filename);
      expect(existsSync(path), `${picture.filename} is missing`).toBe(true);
      expect(statSync(path).size, `${picture.filename} is unexpectedly small`).toBeGreaterThan(70_000);
      expect(readFileSync(path).subarray(8, 12).toString("ascii")).toBe("WEBP");
      expect(picture.alt.length).toBeGreaterThan(40);
      expect(picture.caption.length).toBeGreaterThan(40);
      expect(picture.focalPoints).toHaveLength(4);
    }
  });
});
