import type { TeachingPictureSpec } from "../components/TeachingPicture";
import type { CourseId, TopicSection } from "../types";
import { getBusinessPicture } from "./businessPictures";
import { enterprisePictureScenes } from "./enterprisePictureScenes";
import { getTechnologyPicture } from "./technologyPictureLibrary";

export function getTeachingPicture(
  courseId: CourseId,
  topicId: string,
  section: TopicSection,
  sectionIndex: number,
): TeachingPictureSpec | undefined {
  if (courseId === "business") {
    const picture = getBusinessPicture(topicId, section.heading);
    return picture ? {
      src: `images/${picture.filename}`,
      alt: picture.alt,
      caption: picture.caption,
      title: section.heading,
    } : undefined;
  }

  if (courseId === "enterprise") {
    if (sectionIndex !== 0) return undefined;
    const picture = enterprisePictureScenes[topicId];
    return picture ? {
      src: picture.filename,
      alt: picture.alt,
      caption: picture.caption,
      title: section.heading,
      focalPoints: picture.sectionCoverage,
    } : undefined;
  }

  const picture = getTechnologyPicture(topicId, section.heading);
  return picture ? {
    src: `images/${picture.filename}`,
    alt: picture.alt,
    caption: picture.caption,
    title: section.heading,
    focalPoints: picture.focalPoints,
  } : undefined;
}

