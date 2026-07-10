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

export interface Unit {
  id: string;
  code: string;
  title: string;
  description: string;
  assessment: string;
  weight: string;
  topics: Topic[];
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
