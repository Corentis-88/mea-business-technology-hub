import type { ResourceLink } from "../types";

export const officialDocumentHref = (file: string, base = import.meta.env.BASE_URL) => `${base}official-documents/${file}`;

const local = officialDocumentHref;

export const resources: ResourceLink[] = [
  { id: "business-spec", courseId: "business", title: "Pearson Business specification", description: "The complete 1BS0 content and assessment requirements.", type: "Specification", href: local("pearson-edexcel-gcse-business-1bs0-specification.pdf"), official: true, local: true },
  { id: "business-sam", courseId: "business", title: "Pearson sample assessment materials", description: "Sample Paper 1 and Paper 2 questions with marking guidance.", type: "Past paper", href: local("pearson-business-sample-assessment-materials.pdf"), official: true, local: true },
  { id: "business-p1-report", courseId: "business", title: "2024 Paper 1 examiner report", description: "What students did well and where marks were lost.", type: "Examiner report", href: local("pearson-business-2024-paper1-examiners-report.pdf"), official: true, local: true },
  { id: "business-p2-report", courseId: "business", title: "2024 Paper 2 examiner report", description: "Examiner guidance for Theme 2 and extended answers.", type: "Examiner report", href: local("pearson-business-2024-paper2-examiners-report.pdf"), official: true, local: true },
  { id: "business-9", courseId: "business", title: "Official 9-mark model answers", description: "Pearson examples for Justify questions.", type: "Assessment guide", href: local("pearson-business-9-mark-model-answers.pdf"), official: true, local: true },
  { id: "business-12", courseId: "business", title: "Official 12-mark model answers", description: "Pearson examples for Evaluate questions.", type: "Assessment guide", href: local("pearson-business-12-mark-model-answers.pdf"), official: true, local: true },
  { id: "business-video", courseId: "business", title: "Pearson: the skill of application", description: "Awarding-body video explaining contextual application.", type: "Video", href: "https://www.youtube.com/watch?v=Bu275Ni_j5g", official: true },

  { id: "enterprise-spec", courseId: "enterprise", title: "Enterprise and Marketing specification", description: "The complete current J837 specification, Version 6.", type: "Specification", href: local("ocr-cambridge-national-enterprise-marketing-j837-specification.pdf"), official: true, local: true },
  { id: "enterprise-r067-paper", courseId: "enterprise", title: "R067 2025 question paper", description: "Public Enterprise and marketing concepts paper.", type: "Past paper", href: local("ocr-j837-r067-2025-question-paper.pdf"), official: true, local: true },
  { id: "enterprise-r067-ms", courseId: "enterprise", title: "R067 2025 mark scheme", description: "Official marking points and level criteria.", type: "Mark scheme", href: local("ocr-j837-r067-2025-mark-scheme.pdf"), official: true, local: true },
  { id: "enterprise-r067-report", courseId: "enterprise", title: "R067 2025 examiner report", description: "Common strengths, mistakes and context advice.", type: "Examiner report", href: local("ocr-j837-r067-2025-examiners-report.pdf"), official: true, local: true },
  { id: "enterprise-guide", courseId: "enterprise", title: "Understanding the assessment", description: "OCR guide to examined and moderated work.", type: "Assessment guide", href: local("ocr-j837-assessment-guide.pdf"), official: true, local: true },
  { id: "enterprise-r068", courseId: "enterprise", title: "R068 public sample assignment", description: "Safe practice assignment—not a live assessment.", type: "Sample assignment", href: local("ocr-j837-r068-sample-assignment.pdf"), official: true, local: true },
  { id: "enterprise-r069", courseId: "enterprise", title: "R069 public sample assignment", description: "Safe practice assignment—not a live assessment.", type: "Sample assignment", href: local("ocr-j837-r069-sample-assignment.pdf"), official: true, local: true },

  { id: "cs-spec", courseId: "computer-science", title: "Computer Science specification", description: "The complete J277 specification, Version 3.1.", type: "Specification", href: local("ocr-gcse-computer-science-j277-specification.pdf"), official: true, local: true },
  { id: "cs-p1", courseId: "computer-science", title: "2024 Paper 1 question paper", description: "Computer systems examination practice.", type: "Past paper", href: local("ocr-j277-2024-paper1-question-paper.pdf"), official: true, local: true },
  { id: "cs-p1-ms", courseId: "computer-science", title: "2024 Paper 1 mark scheme", description: "Official Paper 1 marking guidance.", type: "Mark scheme", href: local("ocr-j277-2024-paper1-mark-scheme.pdf"), official: true, local: true },
  { id: "cs-p2", courseId: "computer-science", title: "2024 Paper 2 question paper", description: "Algorithms and programming examination practice.", type: "Past paper", href: local("ocr-j277-2024-paper2-question-paper.pdf"), official: true, local: true },
  { id: "cs-p2-ms", courseId: "computer-science", title: "2024 Paper 2 mark scheme", description: "Official Paper 2 marking guidance.", type: "Mark scheme", href: local("ocr-j277-2024-paper2-mark-scheme.pdf"), official: true, local: true },
  { id: "cs-guide", courseId: "computer-science", title: "J277 assessment guide", description: "OCR explanations of the sample assessment.", type: "Assessment guide", href: local("ocr-j277-assessment-guide.pdf"), official: true, local: true },
  { id: "cs-craig", courseId: "computer-science", title: "Craig 'n' Dave J277 videos", description: "Eighty-eight videos mapped to individual specification objectives.", type: "External revision", href: "https://craigndave.org/ocr-gcse-j277-resources/", official: false },
  { id: "cs-newbs", courseId: "computer-science", title: "CSNewbs OCR GCSE", description: "Accessible written and visual J277 explanations.", type: "External revision", href: "https://www.csnewbs.com/ocr-gcse", official: false },

  { id: "imedia-spec", courseId: "creative-imedia", title: "Creative iMedia specification", description: "The complete current J834 specification, Version 6.", type: "Specification", href: local("ocr-cambridge-national-creative-imedia-j834-specification.pdf"), official: true, local: true },
  { id: "imedia-r093-paper", courseId: "creative-imedia", title: "R093 2025 question paper", description: "Public Creative iMedia in the media industry paper.", type: "Past paper", href: local("ocr-j834-r093-2025-question-paper.pdf"), official: true, local: true },
  { id: "imedia-r093-ms", courseId: "creative-imedia", title: "R093 2025 mark scheme", description: "Official R093 marking guidance.", type: "Mark scheme", href: local("ocr-j834-r093-2025-mark-scheme.pdf"), official: true, local: true },
  { id: "imedia-r093-report", courseId: "creative-imedia", title: "R093 2025 examiner report", description: "Common errors and extended-response guidance.", type: "Examiner report", href: local("ocr-j834-r093-2025-examiners-report.pdf"), official: true, local: true },
  { id: "imedia-r094", courseId: "creative-imedia", title: "R094 public sample assignment", description: "Safe Visual identity and digital graphics practice.", type: "Sample assignment", href: local("ocr-j834-r094-sample-assignment.pdf"), official: true, local: true },
  { id: "imedia-r095", courseId: "creative-imedia", title: "R095 public sample assignment", description: "Safe Characters and comics practice—not a live task.", type: "Sample assignment", href: local("ocr-j834-r095-sample-assignment.pdf"), official: true, local: true },
  { id: "imedia-guide", courseId: "creative-imedia", title: "J834 assessment guide", description: "OCR guide to examined and moderated assessment.", type: "Assessment guide", href: local("ocr-j834-assessment-guide.pdf"), official: true, local: true },
  { id: "imedia-genius", courseId: "creative-imedia", title: "iMediaGenius R093", description: "Independent games, guides, flashcards and exam practice.", type: "External revision", href: "https://imediagenius.co.uk/", official: false },
];
