import type { ContentBundle } from "../types";

export type ContentValidationCode =
  | "empty-id"
  | "duplicate-id"
  | "missing-section-heading"
  | "missing-section-text"
  | "missing-image-alt"
  | "bad-quiz-options"
  | "bad-quiz-answer"
  | "bad-resource-url"
  | "unknown-resource-course"
  | "business-blt-scope"
  | "blt-outside-business"
  | "missing-custom-page-text"
  | "missing-simple-guide"
  | "missing-simple-section";

export interface ContentValidationIssue {
  code: ContentValidationCode;
  path: string;
  message: string;
}

const requiredBusinessBltScope = "MEA answer method for Pearson Edexcel GCSE Business 1BS0 only";

function hasText(values: string[]) {
  return values.some((value) => value.trim().length > 0);
}

function validResourceUrl(href: string) {
  const value = href.trim();
  if (!value || value.startsWith("//")) return false;
  try {
    const url = new URL(value, "https://mea.local/");
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateContentBundle(bundle: ContentBundle): ContentValidationIssue[] {
  const issues: ContentValidationIssue[] = [];
  const ids = new Map<string, string>();

  const add = (code: ContentValidationCode, path: string, message: string) => issues.push({ code, path, message });
  const registerId = (kind: string, id: string, path: string) => {
    const trimmed = id.trim();
    if (!trimmed) {
      add("empty-id", path, `${kind} must have an ID.`);
      return;
    }
    const key = `${kind}:${trimmed}`;
    const previous = ids.get(key);
    if (previous) add("duplicate-id", path, `${kind} ID "${trimmed}" is already used at ${previous}.`);
    else ids.set(key, path);
  };

  registerId("site settings", bundle.siteSettings.id, "siteSettings.id");
  const courseIds = new Set(bundle.courses.map((course) => course.id));

  bundle.courses.forEach((course, courseIndex) => {
    const coursePath = `courses[${courseIndex}]`;
    registerId("course", course.id, `${coursePath}.id`);

    if (course.id === "business") {
      const method = course.answerMethod;
      if (!method || method.shortName !== "BLT" || method.scope !== requiredBusinessBltScope) {
        add("business-blt-scope", `${coursePath}.answerMethod`, `Pearson Business BLT must use the exact scope: ${requiredBusinessBltScope}`);
      }
    } else if (course.answerMethod?.shortName === "BLT" || course.answerMethod?.id === "business-blt") {
      add("blt-outside-business", `${coursePath}.answerMethod`, "BLT may only be attached to Pearson Edexcel GCSE Business.");
    }

    course.units.forEach((unit, unitIndex) => {
      const unitPath = `${coursePath}.units[${unitIndex}]`;
      registerId("unit", unit.id, `${unitPath}.id`);
      unit.topics.forEach((topic, topicIndex) => {
        const topicPath = `${unitPath}.topics[${topicIndex}]`;
        registerId("topic", topic.id, `${topicPath}.id`);

        topic.sections.forEach((section, sectionIndex) => {
          const sectionPath = `${topicPath}.sections[${sectionIndex}]`;
          registerId("section", section.id, `${sectionPath}.id`);
          if (!section.heading.trim()) add("missing-section-heading", `${sectionPath}.heading`, "Section heading is required.");
          if (!hasText(section.paragraphs)) add("missing-section-text", `${sectionPath}.paragraphs`, "Section must contain explanatory text.");
          if (section.image && !section.image.alt.trim()) add("missing-image-alt", `${sectionPath}.image.alt`, "Section image requires alternative text.");
        });

        topic.quiz.forEach((question, questionIndex) => {
          const questionPath = `${topicPath}.quiz[${questionIndex}]`;
          registerId("quiz question", question.id, `${questionPath}.id`);
          if (question.options.length < 2 || question.options.some((option) => !option.trim())) {
            add("bad-quiz-options", `${questionPath}.options`, "Quiz question needs at least two non-empty options.");
          }
          if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) {
            add("bad-quiz-answer", `${questionPath}.answer`, "Quiz answer index must point to an existing option.");
          }
        });
      });
    });
  });

  bundle.resources.forEach((resource, index) => {
    const path = `resources[${index}]`;
    registerId("resource", resource.id, `${path}.id`);
    if (!validResourceUrl(resource.href)) add("bad-resource-url", `${path}.href`, "Resource URL must be a safe HTTPS or site-relative URL.");
    if (!courseIds.has(resource.courseId)) add("unknown-resource-course", `${path}.courseId`, "Resource must belong to a course in this bundle.");
  });

  bundle.practiceCases.forEach((practiceCase, caseIndex) => {
    const casePath = `practiceCases[${caseIndex}]`;
    registerId("practice case", practiceCase.id, `${casePath}.id`);
    practiceCase.evidence.forEach((evidence, evidenceIndex) => registerId(`evidence in ${practiceCase.id}`, evidence.id, `${casePath}.evidence[${evidenceIndex}].id`));
  });

  bundle.customPages.forEach((page, pageIndex) => {
    const pagePath = `customPages[${pageIndex}]`;
    registerId("custom page", page.id, `${pagePath}.id`);
    page.sections.forEach((section, sectionIndex) => {
      const sectionPath = `${pagePath}.sections[${sectionIndex}]`;
      if (!section.heading.trim()) add("missing-section-heading", `${sectionPath}.heading`, "Section heading is required.");
      if (!hasText(section.paragraphs)) add("missing-custom-page-text", `${sectionPath}.paragraphs`, "Custom-page section must contain text.");
      if (section.image && !section.image.alt.trim()) add("missing-image-alt", `${sectionPath}.image.alt`, "Custom-page image requires alternative text.");
    });
  });

  const enterprise = bundle.courses.find((course) => course.id === "enterprise");
  const guideByTopic = new Map(bundle.enterpriseSimpleGuides.map((guide) => [guide.topicId, guide]));
  enterprise?.units.forEach((unit, unitIndex) => unit.topics.forEach((topic, topicIndex) => {
    const guide = guideByTopic.get(topic.id);
    const path = `courses[enterprise].units[${unitIndex}].topics[${topicIndex}]`;
    if (!guide) {
      add("missing-simple-guide", path, `Enterprise topic “${topic.title}” needs a Say it simpler version.`);
      return;
    }
    topic.sections.forEach((section) => {
      if (!guide.sections.some((simpleSection) => simpleSection.heading === section.heading)) {
        add("missing-simple-section", path, `Say it simpler needs an easy explanation for “${section.heading}”.`);
      }
    });
  }));

  return issues;
}

export function assertValidContentBundle(bundle: ContentBundle) {
  const issues = validateContentBundle(bundle);
  if (issues.length) throw new Error(issues.map((issue) => `${issue.path}: ${issue.message}`).join("\n"));
}
