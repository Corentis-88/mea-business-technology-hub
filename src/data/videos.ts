import type { CourseId } from "../types";

export interface CuratedTopicVideo {
  topicId: string;
  courseId: CourseId;
  title: string;
  provider: string;
  description: string;
  href: string;
  embedUrl?: string;
  qualityNote: string;
}

const craigAndDave = (topicId: string, title: string, href: string): CuratedTopicVideo => ({
  topicId,
  courseId: "computer-science",
  title,
  provider: "Craig 'n' Dave",
  description: "Open the videos written specifically for this OCR J277 specification section.",
  href,
  qualityNote: "Specification-mapped videos created by experienced UK Computer Science teachers.",
});

export const curatedTopicVideos: CuratedTopicVideo[] = [
  craigAndDave("computer-science-1-1", "J277 1.1 Systems architecture", "https://craigndave.org/video-categories/slr1-1-systems-architecture/"),
  craigAndDave("computer-science-1-2", "J277 1.2 Memory and storage", "https://craigndave.org/video-categories/slr1-2-memory-and-storage/"),
  craigAndDave("computer-science-1-3", "J277 1.3 Networks and protocols", "https://craigndave.org/video-categories/slr1-3-computer-networks-connections-and-protocols/"),
  craigAndDave("computer-science-1-4", "J277 1.4 Network security", "https://craigndave.org/video-categories/slr1-4-network-security/"),
  craigAndDave("computer-science-1-5", "J277 1.5 Systems software", "https://craigndave.org/video-categories/slr1-5-systems-software/"),
  craigAndDave("computer-science-1-6", "J277 1.6 Ethical, legal and environmental concerns", "https://craigndave.org/video-categories/slr1-6-ethical-legal-cultural-and-environmental-concerns/"),
  craigAndDave("computer-science-2-1", "J277 2.1 Algorithms", "https://craigndave.org/video-categories/slr2-1-algorithms/"),
  craigAndDave("computer-science-2-2", "J277 2.2 Programming fundamentals", "https://craigndave.org/video-categories/slr2-2-programming-fundementals/"),
  craigAndDave("computer-science-2-3", "J277 2.3 Producing robust programs", "https://craigndave.org/video-categories/slr2-3-producing-robust-programs/"),
  craigAndDave("computer-science-2-4", "J277 2.4 Boolean logic", "https://craigndave.org/video-categories/slr2-4-boolean-logic/"),
  craigAndDave("computer-science-2-5", "J277 2.5 Languages and IDEs", "https://craigndave.org/video-categories/slr2-5-programming-languages-and-ides/"),
  {
    topicId: "imedia-r093-1", courseId: "creative-imedia", title: "Traditional media", provider: "iMedia Genius",
    description: "A short R093 video explaining traditional media, followed by topic notes and retrieval activities.",
    href: "https://imediagenius.co.uk/topic-01-traditional-media.html", embedUrl: "https://www.youtube-nocookie.com/embed/A_Kwy1bGtV4",
    qualityNote: "Teacher-created and mapped directly to OCR Creative iMedia R093.",
  },
  {
    topicId: "imedia-r093-2", courseId: "creative-imedia", title: "Client requirements", provider: "iMedia Genius",
    description: "A focused R093 explanation of client requirements, constraints and success criteria.",
    href: "https://imediagenius.co.uk/topic-11-client-requirements.html", embedUrl: "https://www.youtube-nocookie.com/embed/4v07X-y-TqU",
    qualityNote: "Teacher-created and mapped directly to OCR Creative iMedia R093.",
  },
  {
    topicId: "imedia-r093-3", courseId: "creative-imedia", title: "Components of work plans", provider: "iMedia Genius",
    description: "A focused R093 video about tasks, timescales, milestones, resources and contingencies.",
    href: "https://imediagenius.co.uk/topic-22-components-of-work-plans.html", embedUrl: "https://www.youtube-nocookie.com/embed/NAyF4Xv4Z0A",
    qualityNote: "Teacher-created and mapped directly to OCR Creative iMedia R093.",
  },
  {
    topicId: "imedia-r093-4", courseId: "creative-imedia", title: "Distribution platforms and media", provider: "iMedia Genius",
    description: "A focused R093 video about choosing platforms, formats and distribution methods.",
    href: "https://imediagenius.co.uk/topic-30-distribution-platforms-media.html", embedUrl: "https://www.youtube-nocookie.com/embed/BS0N7jJUXrc",
    qualityNote: "Teacher-created and mapped directly to OCR Creative iMedia R093.",
  },
];

export const videoForTopic = (courseId: CourseId, topicId: string) =>
  curatedTopicVideos.find((video) => video.courseId === courseId && video.topicId === topicId);
