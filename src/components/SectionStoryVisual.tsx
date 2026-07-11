import {
  BadgePoundSterling, Binary, BookOpenCheck, Boxes, Brain, BriefcaseBusiness,
  ChartNoAxesCombined, CheckCircle2, CircleHelp, Clock3, Code2, Cpu, Eye,
  FileImage, Film, HeartHandshake, Lightbulb, Megaphone, MonitorSmartphone,
  Palette, Search, ShieldCheck, ShoppingBasket, Sparkles, Target, Users,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { CourseId, TopicSection } from "../types";
import "./section-story-visual.css";

type StoryStyle = "scene" | "poster" | "compare" | "steps" | "toolkit";

const icons: Array<[RegExp, LucideIcon]> = [
  [/customer|audience|user|consumer|stakeholder|people|team|employee/i, Users],
  [/money|price|cost|profit|revenue|cash|finance|budget/i, BadgePoundSterling],
  [/market|promot|advert|brand|campaign/i, Megaphone],
  [/research|survey|data|search|investigat/i, Search],
  [/risk|secure|threat|law|legal|protect|safe/i, ShieldCheck],
  [/computer|cpu|processor|hardware|device/i, Cpu],
  [/code|program|algorithm|logic|software/i, Code2],
  [/binary|number|bit|byte|storage/i, Binary],
  [/image|graphic|photo|visual/i, FileImage],
  [/video|audio|film|animation/i, Film],
  [/colour|design|creative|style|layout/i, Palette],
  [/website|screen|digital|interactive|media/i, MonitorSmartphone],
  [/time|schedule|deadline|plan/i, Clock3],
  [/sales|product|stock|resource|supply/i, ShoppingBasket],
  [/measure|chart|growth|performance|result/i, ChartNoAxesCombined],
  [/purpose|aim|goal|objective|target/i, Target],
  [/test|check|review|quality|success/i, CheckCircle2],
  [/idea|enterprise|business|entrepreneur/i, BriefcaseBusiness],
];

function iconFor(text: string) {
  return icons.find(([pattern]) => pattern.test(text))?.[1] ?? Lightbulb;
}

function sentences(section: TopicSection) {
  const fromBullets = section.bullets?.filter(Boolean) ?? [];
  if (fromBullets.length >= 2) return fromBullets;
  const fromParagraphs = section.paragraphs.flatMap((paragraph) => paragraph.split(/(?<=[.!?])\s+/)).filter((sentence) => sentence.trim().length > 18);
  return [...fromBullets, ...fromParagraphs];
}

function shortHeading(text: string, fallback: string) {
  const clean = text.replace(/[.:;].*$/, "").replace(/^(A|An|The)\s+/i, "").trim();
  const words = clean.split(/\s+/);
  return (words.length > 7 ? `${words.slice(0, 7).join(" ")}…` : clean) || fallback;
}

function styleFor(section: TopicSection, index: number): StoryStyle {
  const text = `${section.heading} ${section.paragraphs.join(" ")}`;
  if (/difference|compare|versus|advantage|disadvantage|benefit|drawback/i.test(text)) return "compare";
  if (/process|stage|step|cycle|journey|how to|method|plan/i.test(text)) return "steps";
  if (/factor|type|resource|element|feature|tool|method/i.test(text)) return "toolkit";
  return (["scene", "poster", "toolkit"] as StoryStyle[])[index % 3];
}

const courseLabels: Record<CourseId, string> = {
  business: "Business in action",
  enterprise: "Make it easy to see",
  "computer-science": "See how it works",
  "creative-imedia": "Creative idea board",
};

export function SectionStoryVisual({ courseId, topicTitle, section, sectionIndex }: {
  courseId: CourseId;
  topicTitle: string;
  section: TopicSection;
  sectionIndex: number;
}) {
  const [open, setOpen] = useState(0);
  const points = useMemo(() => {
    const source = sentences(section).slice(0, 5);
    if (section.formula) source.unshift(`Use this formula: ${section.formula}`);
    if (section.example && source.length < 4) source.push(section.example);
    return source.slice(0, 5).map((text, index) => ({
      title: shortHeading(text, `Key point ${index + 1}`),
      text,
      Icon: iconFor(text),
    }));
  }, [section]);

  if (points.length < 2) return null;
  const style = styleFor(section, sectionIndex);
  const LeadIcon = iconFor(`${section.heading} ${topicTitle}`);

  return (
    <figure className={`story-visual story-visual--${style} story-visual--${courseId}`} aria-labelledby={`story-${courseId}-${sectionIndex}`}>
      <header className="story-visual__header">
        <div className="story-visual__title-icon"><LeadIcon aria-hidden="true" /></div>
        <div><span>{courseLabels[courseId]} · visual summary</span><h3 id={`story-${courseId}-${sectionIndex}`}>{section.heading}</h3></div>
        <Sparkles className="story-visual__sparkle" aria-hidden="true" />
      </header>
      <div className="story-visual__stage">
        {style === "scene" && <div className="story-scene__centre" aria-hidden="true"><LeadIcon /><span>{shortHeading(section.heading, topicTitle)}</span></div>}
        <div className="story-visual__points">
          {points.map(({ title, text, Icon }, index) => (
            <button className={open === index ? "is-open" : ""} type="button" onClick={() => setOpen(index)} aria-expanded={open === index} key={`${title}-${index}`}>
              <span className="story-point__number">{String(index + 1).padStart(2, "0")}</span>
              <span className="story-point__icon"><Icon aria-hidden="true" /></span>
              <strong>{title}</strong>
              <span className="story-point__detail">{text}</span>
            </button>
          ))}
        </div>
      </div>
      <figcaption><Eye aria-hidden="true" /><span>Choose a colourful card to focus on one idea. The words on every card are part of your revision.</span></figcaption>
    </figure>
  );
}

