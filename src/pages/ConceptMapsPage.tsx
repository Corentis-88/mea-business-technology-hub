import { ArrowRight, Network } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ConceptMap, UnitConceptMap } from "../components/ConceptMap";
import { CourseIcon } from "../components/CourseIcon";
import { TopicPracticeTools } from "../components/RevisionPractice";
import { courses } from "../data/courses";
import type { CourseId } from "../types";

export function ConceptMapsPage() {
  const [params] = useSearchParams();
  const requestedCourse = params.get("course") as CourseId | null;
  const initialCourseId = courses.some((course) => course.id === requestedCourse) ? requestedCourse! : "business";
  const initialCourse = courses.find((course) => course.id === initialCourseId)!;
  const requestedTopic = params.get("topic");
  const requestedUnit = initialCourse.units.find((unit) => unit.topics.some((topic) => topic.id === requestedTopic));
  const [courseId, setCourseId] = useState<CourseId>(initialCourseId);
  const [unitId, setUnitId] = useState(requestedUnit?.id ?? initialCourse.units[0].id);
  const [topicId, setTopicId] = useState(requestedTopic && requestedUnit ? requestedTopic : (requestedUnit ?? initialCourse.units[0]).topics[0].id);
  const course = courses.find((item) => item.id === courseId)!;
  const unit = course.units.find((item) => item.id === unitId) ?? course.units[0];
  const topic = unit.topics.find((item) => item.id === topicId) ?? unit.topics[0];

  const changeCourse = (next: CourseId) => {
    const nextCourse = courses.find((item) => item.id === next)!;
    setCourseId(next);
    setUnitId(nextCourse.units[0].id);
    setTopicId(nextCourse.units[0].topics[0].id);
  };

  const changeUnit = (nextUnitId: string) => {
    const nextUnit = course.units.find((item) => item.id === nextUnitId)!;
    setUnitId(nextUnitId);
    setTopicId(nextUnit.topics[0].id);
  };

  const showTopicMap = (nextTopicId: string) => {
    setTopicId(nextTopicId);
    requestAnimationFrame(() => document.getElementById("selected-topic-map")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="page-section concept-maps-page" style={{ "--course-accent": course.accent } as React.CSSProperties}>
      <header className="page-hero compact"><span className="eyebrow">Visual revision</span><h1>Completed concept maps</h1><p>Start with the unit overview, open its topic boxes, then explore a detailed map for the topic you choose.</p></header>
      <section className="map-picker" aria-labelledby="map-picker-title">
        <div><Network /><span><b id="map-picker-title">Choose a map</b><small>Move from qualification to unit to topic.</small></span></div>
        <label><span>Qualification</span><select value={courseId} onChange={(event) => changeCourse(event.target.value as CourseId)}>{courses.map((item) => <option key={item.id} value={item.id}>{item.shortTitle} · {item.code}</option>)}</select></label>
        <label><span>Unit</span><select value={unit.id} onChange={(event) => changeUnit(event.target.value)}>{course.units.map((item) => <option key={item.id} value={item.id}>{item.code} · {item.title}</option>)}</select></label>
        <label><span>Detailed topic map</span><select value={topic.id} onChange={(event) => setTopicId(event.target.value)}>{unit.topics.map((item) => <option key={item.id} value={item.id}>{item.code} · {item.title}</option>)}</select></label>
      </section>
      <div className="map-course-label"><CourseIcon icon={course.icon} /><span><b>{course.shortTitle}</b><small>{unit.title}</small></span><Link className="button button--secondary" to={`/course/${course.slug}`}>Open qualification <ArrowRight size={16} /></Link></div>
      <UnitConceptMap course={course} unit={unit} onSelectTopic={showTopicMap} />
      <section id="selected-topic-map" className="selected-topic-map"><div className="section-heading"><div><span className="eyebrow">Detailed topic map</span><h2>{topic.code} · {topic.title}</h2></div><Link className="text-link" to={`/course/${course.slug}/unit/${unit.id}/topic/${topic.id}`}>Open full topic <ArrowRight size={16} /></Link></div><ConceptMap topic={topic} courseSlug={course.slug} unitId={unit.id} /></section>
      <TopicPracticeTools topic={topic} />
    </div>
  );
}
