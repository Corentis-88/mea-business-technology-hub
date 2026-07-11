export type CourseId = "business" | "enterprise" | "computer-science" | "creative-imedia";

export type VisualKind =
  | "break-even"
  | "cash-flow"
  | "marketing-mix"
  | "product-life-cycle"
  | "stakeholder-map"
  | "research-cycle"
  | "design-mix"
  | "pitch-journey"
  | "cpu-cycle"
  | "binary-place-value"
  | "network-topology"
  | "security-layers"
  | "algorithm-flow"
  | "boolean-logic"
  | "data-size"
  | "media-codes"
  | "pre-production"
  | "brand-board"
  | "comic-layout"
  | "compression"
  | "plan-create-review"
  | "concept-web"
  | "process-flow";

export interface VisualSpec {
  kind: VisualKind;
  title: string;
  caption: string;
  labels?: string[];
  values?: number[];
}

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface TopicSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  visual?: VisualSpec;
  visuals?: VisualSpec[];
  image?: {
    src: string;
    alt: string;
    caption: string;
  };
  formula?: string;
  example?: string;
}

export interface EditableTopicSection extends TopicSection {
  id: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  difficulty?: QuizDifficulty;
  sourceTopicId?: string;
  sourceTopicTitle?: string;
  reinforcement?: boolean;
  /** Older questions omit this and continue to work as multiple choice. */
  format?: "multiple-choice" | "true-false" | "fill-gap" | "matching";
  acceptedAnswers?: string[];
  matchingPairs?: { prompt: string; answer: string }[];
}

export type QuizDifficulty = "low" | "medium" | "high";

export interface ExamQuestion {
  id: string;
  command: string;
  marks: number;
  prompt: string;
  guidance: string[];
  model?: string;
}

export interface Topic {
  id: string;
  code: string;
  title: string;
  summary: string;
  keywords: string[];
  sections: TopicSection[];
  keyTerms: KeyTerm[];
  commonMistakes: string[];
  examTips: string[];
  quiz: QuizQuestion[];
  examQuestions?: ExamQuestion[];
  durationMinutes?: number;
}

export interface EditableTopic extends Omit<Topic, "sections"> {
  sections: EditableTopicSection[];
}

export interface Unit {
  id: string;
  code: string;
  title: string;
  description: string;
  assessment: string;
  weight: string;
  topics: Topic[];
}

export interface EditableUnit extends Omit<Unit, "topics"> {
  topics: EditableTopic[];
}

export interface AnswerMethod {
  id: string;
  name: string;
  shortName: string;
  scope: string;
  pattern: string;
  rules: string[];
}

export interface Course {
  id: CourseId;
  slug: string;
  title: string;
  shortTitle: string;
  qualification: string;
  examBoard: string;
  code: string;
  description: string;
  accent: string;
  icon: "briefcase" | "rocket" | "cpu" | "palette";
  assessmentSummary: string;
  units: Unit[];
  answerMethod?: AnswerMethod;
  aliases: string[];
}

export interface EditableCourse extends Omit<Course, "units"> {
  units: EditableUnit[];
}

export interface SearchDocument {
  id: string;
  courseId: CourseId;
  courseTitle: string;
  courseCode: string;
  unitId: string;
  unitTitle: string;
  topicId: string;
  topicCode: string;
  title: string;
  summary: string;
  keywords: string[];
  terms: string[];
}

export type ProgressStatus = "not-started" | "learning" | "secure" | "revisit";

export interface TopicProgress {
  status: ProgressStatus;
  bestScore: number;
  attempts: number;
  lastStudied?: string;
}

export interface RevisionTask {
  id: string;
  courseId: CourseId;
  topicId: string;
  title: string;
  date: string;
  minutes: number;
  complete: boolean;
}

export interface ResourceLink {
  id: string;
  courseId: CourseId;
  title: string;
  description: string;
  type: "Specification" | "Past paper" | "Mark scheme" | "Examiner report" | "Assessment guide" | "Sample assignment" | "Video" | "External revision";
  href: string;
  official: boolean;
  local?: boolean;
}

export interface PracticeEvidence {
  id: string;
  label: string;
  quote: string;
  meaning: string;
}

export interface CaseQuestion {
  command: "Outline" | "Analyse" | "Justify" | "Evaluate";
  marks: number;
  prompt: string;
}

export interface SupportingFigure {
  label: string;
  type: "review" | "table";
  title: string;
  body?: string;
  columns?: string[];
  rows?: string[][];
}

export interface PracticeCase {
  id: string;
  title: string;
  theme: string;
  sourceSection: "Section B" | "Section C";
  sourceInstruction: string;
  context: string[];
  evidence: PracticeEvidence[];
  chart: { label: string; value: number; max: number; display: string }[];
  chartTitle: string;
  supportingFigure: SupportingFigure;
  question: { command: "Analyse" | "Justify" | "Evaluate"; marks: number; prompt: string };
  questionLadder: CaseQuestion[];
  strands: { label: string; text: string }[];
  model: string[];
}

export interface SiteSettings {
  id: string;
  siteName: string;
  tagline: string;
  schoolName: string;
  logoSrc: string;
  logoAlt: string;
}

export type HomeLayoutBlock =
  | { id: string; type: "hero"; visible: boolean }
  | { id: string; type: "courses"; visible: boolean }
  | { id: string; type: "tools"; visible: boolean }
  | { id: string; type: "text"; visible: boolean; eyebrow?: string; title: string; body: string[] }
  | { id: string; type: "callout"; visible: boolean; eyebrow?: string; title: string; body: string; buttonLabel?: string; buttonHref?: string }
  | { id: string; type: "image"; visible: boolean; title: string; body?: string; image: { src: string; alt: string; caption: string } };

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  showInNavigation: boolean;
  sections: TopicSection[];
}

export interface SimpleSection {
  heading: string;
  simpleHeading: string;
  explanation: string[];
  steps?: string[];
  example?: string;
}

export interface SimpleTopicGuide {
  topicId: string;
  bigIdea: string;
  sections: SimpleSection[];
}

export interface SimpleVisualSpec {
  type: "flow" | "cycle" | "compare" | "balance";
  title: string;
  labels: string[];
  caption: string;
}

export interface ContentBundle {
  schemaVersion: 1;
  contentVersion: number;
  updatedAt: string;
  courses: EditableCourse[];
  resources: ResourceLink[];
  practiceCases: PracticeCase[];
  siteSettings: SiteSettings;
  homepageBlocks: HomeLayoutBlock[];
  customPages: CustomPage[];
  enterpriseSimpleGuides: SimpleTopicGuide[];
  enterpriseSimpleVisuals: Record<string, SimpleVisualSpec>;
}
