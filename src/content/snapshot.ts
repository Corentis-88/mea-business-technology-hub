import { baselineCourses } from "../data/courses";
import { baselinePracticeCases } from "../data/extendedWriting";
import { baselineResources } from "../data/resources";
import { baselineEnterpriseSimpleGuides, baselineEnterpriseSimpleVisuals } from "../data/enterpriseSimple";
import type { ContentBundle, EditableCourse, EditableTopicSection, TopicSection } from "../types";
import { baselineCustomPages, baselineSiteSettings } from "./defaults";

function slug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function editableSection(topicId: string, section: TopicSection, index: number): EditableTopicSection {
  const existingId = (section as Partial<EditableTopicSection>).id?.trim();
  return {
    ...structuredClone(section),
    id: existingId || `${topicId}-section-${index + 1}-${slug(section.heading) || "untitled"}`,
  };
}

function editableCourses(): EditableCourse[] {
  return baselineCourses.map((course) => ({
    ...structuredClone(course),
    units: course.units.map((unit) => ({
      ...structuredClone(unit),
      topics: unit.topics.map((topic) => ({
        ...structuredClone(topic),
        sections: topic.sections.map((section, index) => editableSection(topic.id, section, index)),
      })),
    })),
  }));
}

export interface SnapshotOptions {
  contentVersion?: number;
  updatedAt?: string;
}

export function createEditableSnapshotFromBaselines(options: SnapshotOptions = {}): ContentBundle {
  return {
    schemaVersion: 1,
    contentVersion: options.contentVersion ?? 1,
    updatedAt: options.updatedAt ?? new Date().toISOString(),
    courses: editableCourses(),
    resources: structuredClone(baselineResources),
    practiceCases: structuredClone(baselinePracticeCases),
    siteSettings: structuredClone(baselineSiteSettings),
    customPages: structuredClone(baselineCustomPages),
    enterpriseSimpleGuides: structuredClone(baselineEnterpriseSimpleGuides),
    enterpriseSimpleVisuals: structuredClone(baselineEnterpriseSimpleVisuals),
  };
}
