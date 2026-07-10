import type { Course, CourseId, Topic, Unit } from "../types";
import { publishedContentOverride } from "../content/published";
import { businessCourse } from "./business";
import { enterpriseCourse } from "./enterprise";
import { computerScienceCourse } from "./computerScience";
import { creativeImediaCourse } from "./creativeImedia";

export const baselineCourses: Course[] = [businessCourse, enterpriseCourse, computerScienceCourse, creativeImediaCourse];
export const courses: Course[] = publishedContentOverride?.courses ?? baselineCourses;

export const courseBySlug = (slug?: string) => courses.find((course) => course.slug === slug);
export const courseById = (id: CourseId) => courses.find((course) => course.id === id);

export function findTopic(course: Course, unitId?: string, topicId?: string): { unit: Unit; topic: Topic } | undefined {
  const unit = course.units.find((item) => item.id === unitId);
  const topic = unit?.topics.find((item) => item.id === topicId);
  return unit && topic ? { unit, topic } : undefined;
}

export const allTopics = courses.flatMap((course) =>
  course.units.flatMap((unit) => unit.topics.map((topic) => ({ course, unit, topic }))),
);
