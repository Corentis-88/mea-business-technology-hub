import { ArrowLeft, ArrowRight, BookOpen, Check, ClipboardCheck, Eye, HelpCircle, RotateCcw, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import type { CourseId, ProgressStatus } from "../types";
import { useAppState } from "../state/AppState";

export type JourneyStage = "learn" | "map" | "remember" | "exam" | "practice";

const stages: { id: JourneyStage; short: string; title: string; help: string; icon: typeof BookOpen }[] = [
  { id: "learn", short: "Learn", title: "Learn the idea", help: "Read the explanation and examples.", icon: BookOpen },
  { id: "map", short: "Visual", title: "See it visually", help: "Use the concept map to connect the ideas.", icon: Eye },
  { id: "remember", short: "Quick check", title: "Check what you remember", help: "Try the flashcards and retrieval questions.", icon: HelpCircle },
  { id: "exam", short: "Exam practice", title: "Try an exam question", help: "Apply the topic and reveal guidance afterwards.", icon: ClipboardCheck },
  { id: "practice", short: "Review", title: "Review your learning", help: "Check mistakes, tips and decide what to do next.", icon: Trophy },
];

interface GuidedTopicJourneyProps {
  active: JourneyStage;
  courseId: CourseId;
  topicId: string;
  onSelect: (stage: JourneyStage) => void;
}

export function GuidedTopicJourney({ active, courseId, topicId, onSelect }: GuidedTopicJourneyProps) {
  const [visited, setVisited] = useState<JourneyStage[]>([active]);
  const { setTopicStatus } = useAppState();
  const activeIndex = stages.findIndex((stage) => stage.id === active);

  useEffect(() => {
    setVisited((current) => current.includes(active) ? current : [...current, active]);
  }, [active]);

  const goTo = (stage: JourneyStage) => {
    setVisited((current) => current.includes(stage) ? current : [...current, stage]);
    onSelect(stage);
    requestAnimationFrame(() => document.getElementById("guided-topic-content")?.focus());
  };

  const chooseReview = (status: ProgressStatus) => {
    setTopicStatus(courseId, topicId, status);
    if (status === "secure") return;
    goTo(status === "revisit" ? "learn" : "remember");
  };

  return <section className="guided-journey" aria-labelledby="guided-journey-heading">
    <div className="guided-journey__intro">
      <div><span className="eyebrow">Your guided revision session</span><h2 id="guided-journey-heading">Follow these five simple steps</h2></div>
      <p>You can follow the steps in order or choose the one you need.</p>
    </div>
    <ol className="guided-journey__steps" aria-label="Topic revision steps">
      {stages.map((stage, index) => {
        const Icon = stage.icon;
        const isActive = stage.id === active;
        const isVisited = visited.includes(stage.id);
        return <li key={stage.id} className={isActive ? "is-active" : isVisited ? "is-visited" : ""}>
          <button type="button" aria-label={`${stage.short}: ${stage.help}`} aria-current={isActive ? "step" : undefined} onClick={() => goTo(stage.id)}>
            <span className="guided-journey__number">{isVisited && !isActive ? <Check aria-hidden="true" /> : index + 1}</span>
            <span><b>{stage.short}</b><small>{stage.help}</small></span>
          </button>
        </li>;
      })}
    </ol>
    <div className="guided-journey__now" aria-live="polite">
      <span>Step {activeIndex + 1} of {stages.length}</span>
      <strong>{stages[activeIndex].title}</strong>
    </div>
    <div className="guided-journey__actions">
      {activeIndex > 0 && <button type="button" className="button button--secondary" onClick={() => goTo(stages[activeIndex - 1].id)}><ArrowLeft /> Previous step</button>}
      {activeIndex < stages.length - 1 && <button type="button" className="button" onClick={() => goTo(stages[activeIndex + 1].id)}>Next: {stages[activeIndex + 1].short} <ArrowRight /></button>}
    </div>
    {active === "practice" && <div className="guided-journey__review" aria-labelledby="guided-review-heading">
      <div><span className="eyebrow">Choose your next step</span><h3 id="guided-review-heading">How confident do you feel?</h3><p>Your choice is saved on this device. You can change it at any time.</p></div>
      <div>
        <button type="button" onClick={() => chooseReview("secure")}><Trophy />I understand this topic</button>
        <button type="button" onClick={() => chooseReview("learning")}><HelpCircle />Give me a quick check</button>
        <button type="button" onClick={() => chooseReview("revisit")}><RotateCcw />Teach me again</button>
      </div>
    </div>}
  </section>;
}
