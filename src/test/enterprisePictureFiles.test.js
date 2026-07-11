import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { enterprisePictureScenes } from "../data/enterprisePictureScenes";

describe("Enterprise teaching picture files", () => {
  it("stores every mapped picture in the deployed research asset directory", () => {
    for (const picture of Object.values(enterprisePictureScenes)) {
      expect(
        existsSync(resolve(process.cwd(), "research", picture.filename)),
        `Missing picture for ${picture.topicId}: ${picture.filename}`,
      ).toBe(true);
    }
  });
});
