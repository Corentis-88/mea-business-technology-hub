import {
  Binary, Blocks, Brush, Camera, CheckCircle2, CircuitBoard, Code2, Database,
  FileImage, Film, Gauge, Globe2, HardDrive, KeyRound, Layers3, Lightbulb,
  MonitorPlay, Network, Palette, Radio, ScanEye, ShieldCheck, Smartphone,
  Sparkles, type LucideIcon,
} from "lucide-react";
import type { CourseId, TopicSection } from "../types";
import "./technologyKnowledgePoster.css";

const icons: Array<[RegExp, LucideIcon]> = [
  [/security|threat|malware|password|legal|copyright|permission/i, ShieldCheck],
  [/network|internet|protocol|server|domain|distribution|platform/i, Network],
  [/memory|storage|data|file|database/i, Database],
  [/binary|hex|number|boolean|logic/i, Binary],
  [/algorithm|program|code|language|IDE|test|robust/i, Code2],
  [/CPU|architecture|processor|system|software/i, CircuitBoard],
  [/image|graphic|pixel|resolution|export/i, FileImage],
  [/camera|shot|lighting|mise-en-scène/i, Camera],
  [/audio|radio|sound/i, Radio],
  [/film|video|animation|production/i, Film],
  [/colour|brand|identity|style|typography/i, Palette],
  [/comic|character|panel|story/i, Brush],
  [/audience|client|purpose|brief|research/i, ScanEye],
  [/mobile|phone|device/i, Smartphone],
  [/web|online/i, Globe2],
  [/compression|capacity|performance/i, Gauge],
];

function chooseIcon(text: string, fallback: LucideIcon): LucideIcon {
  return icons.find(([pattern]) => pattern.test(text))?.[1] ?? fallback;
}

function sentences(paragraphs: string[]) {
  return paragraphs.flatMap((paragraph) => paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [])
    .map((sentence) => sentence.trim()).filter(Boolean);
}

function shorten(value: string, maximum = 155) {
  if (value.length <= maximum) return value;
  const clipped = value.slice(0, maximum);
  return `${clipped.slice(0, clipped.lastIndexOf(" "))}…`;
}

function labelFor(text: string, index: number) {
  const rules: Array<[RegExp, string]> = [
    [/means|is |are |includes|contains/i, "What it is"],
    [/because|so that|allows|helps|ensures|reduces|increases/i, "Why it matters"],
    [/example|such as|for instance/i, "Picture it"],
    [/compare|differ|while|whereas|however/i, "Spot the difference"],
    [/choose|use |must|should|check/i, "Make the choice"],
    [/calculate|formula|multiply|divide/i, "How to work it out"],
  ];
  return rules.find(([pattern]) => pattern.test(text))?.[1] ?? ["Key idea", "How it works", "Remember this"][index % 3];
}

export function TechnologyKnowledgePoster({ courseId, topicTitle, section }: {
  courseId: CourseId;
  topicTitle: string;
  section: TopicSection;
}) {
  if (courseId !== "computer-science" && courseId !== "creative-imedia") return null;
  const isComputing = courseId === "computer-science";
  const allSentences = sentences(section.paragraphs);
  const points = [...allSentences.slice(0, 3), ...(section.bullets ?? []).slice(0, 3)]
    .filter((point, index, list) => list.indexOf(point) === index).slice(0, 4);
  const HeroIcon = chooseIcon(`${section.heading} ${section.paragraphs.join(" ")}`, isComputing ? MonitorPlay : Sparkles);
  const supportingIcons = isComputing
    ? [Blocks, HardDrive, KeyRound, CheckCircle2]
    : [Palette, Layers3, Lightbulb, CheckCircle2];

  return <figure className={`knowledge-poster knowledge-poster--${isComputing ? "computing" : "imedia"}`}>
    <div className="knowledge-poster__top">
      <div className="knowledge-poster__hero" aria-hidden="true"><HeroIcon /></div>
      <div>
        <span>{isComputing ? "Computer Science visual summary" : "Creative iMedia visual summary"}</span>
        <h3>{section.heading}</h3>
        <p>{isComputing ? "See the system, then explain how its parts work." : "Turn the idea into a clear creative decision."}</p>
      </div>
    </div>
    <div className="knowledge-poster__tiles">
      {points.map((point, index) => {
        const TileIcon = chooseIcon(point, supportingIcons[index]);
        return <article key={`${point}-${index}`}>
          <div className="knowledge-poster__tile-icon"><TileIcon aria-hidden="true" /></div>
          <div><strong>{labelFor(point, index)}</strong><p>{shorten(point)}</p></div>
        </article>;
      })}
    </div>
    <figcaption><CheckCircle2 aria-hidden="true" /><span><strong>Memory check:</strong> Cover the tiles and explain each one aloud in your own words.</span></figcaption>
    <span className="knowledge-poster__topic">{topicTitle}</span>
  </figure>;
}
