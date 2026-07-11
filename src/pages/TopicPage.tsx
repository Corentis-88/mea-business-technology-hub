import { AlertTriangle, ArrowDownRight, CheckCircle2, ChevronRight, Clock3, FileQuestion, HeartHandshake, Lightbulb, ListChecks, MessageCircleMore, Network, NotebookTabs, Target } from "lucide-react";
import { useEffect, useState, type KeyboardEvent } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ConceptMap } from "../components/ConceptMap";
import { BusinessInfographic } from "../components/BusinessInfographic";
import { EnterpriseSimpleMode } from "../components/EnterpriseSimpleMode";
import { ExamPractice } from "../components/ExamPractice";
import { GuidedTopicJourney, type JourneyStage } from "../components/GuidedTopicJourney";
import LearningVisual from "../components/LearningVisual";
import { SectionStoryVisual } from "../components/SectionStoryVisual";
import { Quiz } from "../components/Quiz";
import { InteractiveVisualActivity, VocabularyFlashcards } from "../components/RevisionPractice";
import { TopicVideo } from "../components/TopicVideo";
import { TeachingPicture } from "../components/TeachingPicture";
import { TechnologyKnowledgePoster } from "../components/TechnologyKnowledgePoster";
import { courseBySlug, findTopic } from "../data/courses";
import { getBusinessInfographic } from "../data/businessInfographics";
import { getTeachingPicture } from "../data/teachingPictures";
import { anchorForTerm, topicSectionAnchor } from "../lib/topicNavigation";
import { createQuizSession } from "../lib/quizEngine";
import { NotFoundPage } from "./NotFoundPage";

type Tab = "learn" | "simple" | "map" | "remember" | "practice" | "exam";

export function TopicPage() {
  const { courseSlug, unitId, topicId } = useParams();
  const location = useLocation();
  const course = courseBySlug(courseSlug);
  const found = course ? findTopic(course, unitId, topicId) : undefined;
  const [tab, setTab] = useState<Tab>("learn");

  useEffect(() => {
    if (!location.hash) return;
    setTab("learn");
    const id = decodeURIComponent(location.hash.slice(1));
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, [location.hash]);

  if (!course || !found) return <NotFoundPage />;
  const { unit, topic } = found;
  const topicQuestionBank = createQuizSession({ course, topicId: topic.id, difficulty: "medium", count: 20, seed: 19 }).questions;
  const featuredFormats = ["multiple-choice", "true-false", "fill-gap", "matching"].flatMap((format) => {
    const question = topicQuestionBank.find((item) => (item.format ?? "multiple-choice") === format);
    return question ? [question] : [];
  });
  const quickQuestions = [...featuredFormats, ...topicQuestionBank.filter((question) => !featuredFormats.includes(question))].slice(0, 10);
  const visualIndex = topic.sections.flatMap((section) => {
    const items = section.visual ? [section.visual, ...(section.visuals ?? [])] : (section.visuals ?? []);
    return items.map((visual) => ({ section: section.heading, visual }));
  });
  const tabOrder: Tab[] = course.id === "enterprise" ? ["learn", "simple", "map", "remember", "practice", "exam"] : ["learn", "map", "remember", "practice", "exam"];
  const tabProps = (value: Tab) => ({ id: `topic-tab-${value}`, "aria-controls": `topic-panel-${value}`, "aria-selected": tab === value, tabIndex: tab === value ? 0 : -1 });
  const moveBetweenTabs = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!(["ArrowLeft", "ArrowRight", "Home", "End"] as string[]).includes(event.key)) return;
    event.preventDefault();
    const currentIndex = tabOrder.indexOf(tab);
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabOrder.length - 1 : event.key === "ArrowRight" ? (currentIndex + 1) % tabOrder.length : (currentIndex - 1 + tabOrder.length) % tabOrder.length;
    const nextTab = tabOrder[nextIndex];
    setTab(nextTab);
    requestAnimationFrame(() => document.getElementById(`topic-tab-${nextTab}`)?.focus());
  };
  const selectJourneyStage = (stage: JourneyStage) => setTab(stage);
  return (
    <div className="topic-page" style={{ "--course-accent": course.accent } as React.CSSProperties}>
      <header className="topic-header"><div className="page-section topic-header__inner">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><ChevronRight size={14} /><Link to={`/course/${course.slug}`}>{course.shortTitle}</Link><ChevronRight size={14} /><span>{topic.code}</span></nav>
        <div className="topic-title-row"><div><span className="eyebrow">{unit.code} · {unit.title}</span><h1>{topic.title}</h1><p>{topic.summary}</p><div className="topic-meta"><span><Clock3 size={16} /> {topic.durationMinutes ?? 20} minute guide</span><span><Target size={16} /> {topic.quiz.length} core retrieval questions</span></div></div></div>
      </div></header>
      <div className="page-section topic-support-copy"><HeartHandshake /><p>{course.id === "enterprise" ? "If the words in the topic feel difficult, choose Say it simpler. You will see the same topic in shorter steps, with simple examples and course terms explained." : "You're in the right place. Work through one connection at a time, and use the vocabulary links whenever you want to return to a term's explanation."}</p></div>
      <div className="page-section"><GuidedTopicJourney active={tab === "simple" ? "learn" : tab} courseId={course.id} topicId={topic.id} onSelect={selectJourneyStage} /></div>
      <div className="topic-tabs-wrap"><div className="topic-tabs" role="tablist" aria-label="Topic learning modes" onKeyDown={moveBetweenTabs}>
        <button role="tab" {...tabProps("learn")} onClick={() => setTab("learn")}><NotebookTabs />Learn</button>
        {course.id === "enterprise" && <button className="topic-tab--simple" role="tab" {...tabProps("simple")} onClick={() => setTab("simple")}><MessageCircleMore />Say it simpler</button>}
        <button role="tab" {...tabProps("map")} onClick={() => setTab("map")}><Network />Concept map</button>
        <button role="tab" {...tabProps("remember")} onClick={() => setTab("remember")}><Lightbulb />Remember</button>
        <button role="tab" {...tabProps("practice")} onClick={() => setTab("practice")}><ListChecks />Practise</button>
        <button role="tab" {...tabProps("exam")} onClick={() => setTab("exam")}><FileQuestion />Exam</button>
      </div></div>
      <div className="page-section topic-content" id={`topic-panel-${tab}`} role="tabpanel" aria-labelledby={`topic-tab-${tab}`}><div id="guided-topic-content" tabIndex={-1} className="guided-topic-content-focus">
        {tab === "learn" && <div className="learn-layout">
          <div className="article-content">{topic.sections.map((section, index) => <section id={topicSectionAnchor(topic, index)} key={`${section.heading}-${index}`}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            {section.formula && <div className="formula-card"><span>Formula</span><strong>{section.formula}</strong></div>}
            {section.example && <div className="example-callout"><Lightbulb /><div><strong>Worked example</strong><p>{section.example}</p></div></div>}
            {getTeachingPicture(course.id, topic.id, section, index) && <TeachingPicture picture={getTeachingPicture(course.id, topic.id, section, index)!} />}
            <SectionStoryVisual courseId={course.id} topicTitle={topic.title} section={section} sectionIndex={index} />
            {course.id === "business" && getBusinessInfographic(section.heading) && <BusinessInfographic spec={getBusinessInfographic(section.heading)!} />}
            {section.image && <figure className="topic-illustration"><img src={`${import.meta.env.BASE_URL}${section.image.src}`} alt={section.image.alt} loading="lazy" /><figcaption>{section.image.caption}</figcaption></figure>}
            {section.visual && <LearningVisual spec={section.visual} />}
            {section.visuals?.map((visual) => <LearningVisual key={`${section.heading}-${visual.title}`} spec={visual} />)}
            <TechnologyKnowledgePoster courseId={course.id} topicTitle={topic.title} section={section} />
          </section>)}</div>
          <aside className="topic-sidebar"><div className="sidebar-panel vocabulary-panel"><span className="eyebrow">Key vocabulary</span><p className="vocabulary-panel__hint">Choose a term to jump straight to the explanation.</p><dl>{topic.keyTerms.map((term) => <div key={term.term}><dt><a href={`#${anchorForTerm(topic, term)}`}>{term.term}<ArrowDownRight size={15} /></a></dt><dd>{term.definition}</dd></div>)}</dl></div>{visualIndex.length > 0 && <div className="sidebar-panel visual-index"><span className="eyebrow">Visuals in this guide</span>{visualIndex.map(({ section, visual }) => <span key={`${section}-${visual.title}`}><CheckCircle2 size={15} />{visual.title}</span>)}</div>}</aside>
        </div>}
        {tab === "simple" && course.id === "enterprise" && <EnterpriseSimpleMode topic={topic} />}
        {tab === "map" && <section><div className="section-heading"><div><span className="eyebrow">Completed overview</span><h2>See the whole topic at once</h2></div><p>Open any high-level box to reveal the detail and follow its link back into the lesson.</p></div><ConceptMap topic={topic} courseSlug={course.slug} unitId={unit.id} /><InteractiveVisualActivity topic={topic} /><TopicVideo courseId={course.id} topicId={topic.id} /></section>}
        {tab === "remember" && <div className="remember-layout"><VocabularyFlashcards topic={topic} /><Quiz questions={quickQuestions} courseId={course.id} topicId={topic.id} /></div>}
        {tab === "practice" && <div className="practice-layout"><section className="mistake-panel"><div><AlertTriangle /><span className="eyebrow">Avoid these traps</span></div><h2>Common mistakes</h2><ul>{topic.commonMistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul></section><section className="tips-panel"><div><CheckCircle2 /><span className="eyebrow">Make it stick</span></div><h2>Practice checklist</h2><ul>{topic.examTips.map((tip) => <li key={tip}>{tip}</li>)}</ul></section><Quiz title="Apply it" questions={quickQuestions.slice().reverse()} courseId={course.id} topicId={topic.id} /></div>}
        {tab === "exam" && <section><div className="section-heading"><div><span className="eyebrow">Exam practice</span><h2>Turn knowledge into marks</h2></div><p>Attempt each question before revealing the guidance. These are original practice questions, not predictions.</p></div>{topic.examQuestions?.length ? <ExamPractice questions={topic.examQuestions} /> : <div className="empty-state"><FileQuestion /><h3>Exam questions are being prepared for this subtopic</h3><p>Use the retrieval quiz now and return to the unit's official materials for more practice.</p><Link className="button button--secondary" to={`/materials?course=${course.id}`}>Open official materials</Link></div>}</section>}
      </div>
      </div>
    </div>
  );
}
