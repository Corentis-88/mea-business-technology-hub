import { describe, expect, it } from "vitest";
import { curatedTopicVideos, videoForTopic } from "../data/videos";

describe("curated topic videos", () => {
  it("uses only verified course-specific providers and secure links", () => {
    expect(curatedTopicVideos.length).toBeGreaterThanOrEqual(15);
    for (const video of curatedTopicVideos) {
      expect(["computer-science", "creative-imedia"]).toContain(video.courseId);
      expect(["Craig 'n' Dave", "iMedia Genius"]).toContain(video.provider);
      expect(new URL(video.href).protocol).toBe("https:");
      if (video.embedUrl) expect(video.embedUrl).toMatch(/^https:\/\/www\.youtube-nocookie\.com\/embed\/[A-Za-z0-9_-]+$/);
    }
  });

  it("does not recommend an unverified video for Business or Enterprise", () => {
    expect(videoForTopic("business", "business-1-1")).toBeUndefined();
    expect(videoForTopic("enterprise", "enterprise-r067-1")).toBeUndefined();
  });
});
