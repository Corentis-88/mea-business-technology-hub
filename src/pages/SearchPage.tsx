import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SearchBox } from "../components/SearchBox";
import { courses } from "../data/courses";
import { searchTopics } from "../lib/search";

export function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";
  const initialCourse = params.get("course") ?? "";
  const [courseFilter, setCourseFilter] = useState(initialCourse);
  const results = useMemo(() => searchTopics(query, courseFilter || undefined), [query, courseFilter]);
  const cleaned = query.trim().toLowerCase();
  const isBLT = /\bblt\b|because leads to therefore/.test(cleaned);
  const isExtendedWriting = /extended writing|case stud|analyse|analyze|justify|evaluate|discuss|explain question/.test(cleaned);
  const suggestedOnly = results.length > 0 && results.every((result) => result.matchType === "suggestion");
  const resultLabel = suggestedOnly ? "suggested topic" : "topic";

  return (
    <div className="page-section search-page">
      <header className="search-page__header">
        <span className="eyebrow">Search the whole hub</span>
        <h1>{query ? <>Results for “{query}”</> : "What do you need help with?"}</h1>
        <SearchBox large initialValue={query} autoFocus={!query} />
      </header>

      {query && (
        <div className="search-tools">
          <div><SlidersHorizontal size={17} /><strong>Filter by qualification</strong></div>
          <div className="filter-chips">
            <button type="button" aria-pressed={!courseFilter} onClick={() => setCourseFilter("")}>All</button>
            {courses.map((course) => (
              <button type="button" key={course.id} aria-pressed={courseFilter === course.id} onClick={() => setCourseFilter(course.id)}>
                {course.shortTitle}
              </button>
            ))}
          </div>
        </div>
      )}

      {isBLT && (
        <Link to="/business/blt" className="direct-answer">
          <span className="eyebrow">Best answer · Pearson Business only</span>
          <h2>BLT: Because, Leads To, Therefore</h2>
          <p>Build the business point first, then add <strong>because</strong>. One complete BLT answers one three-mark question.</p>
          <span className="button button--primary">Open interactive BLT builder</span>
        </Link>
      )}

      {isExtendedWriting && (!courseFilter || courseFilter === "business") && (
        <Link to="/business/extended-writing" className="direct-answer">
          <span className="eyebrow">Pearson Business only</span>
          <h2>Extended writing and case-study strands</h2>
          <p>Practise Explain, Analyse, Justify, Discuss and Evaluate using original case studies, evidence banks, connected BLT strands and completed answers.</p>
          <span className="button button--primary">Open extended writing lab</span>
        </Link>
      )}

      {query && suggestedOnly && (
        <div className="search-fallback" role="status">
          <Sparkles aria-hidden="true" />
          <div>
            <h2>We could not find an exact match, but you still have useful next steps.</h2>
            <p>These are the closest or most useful starting points. Try a shorter phrase, a course code or a qualification filter for a more precise answer.</p>
          </div>
        </div>
      )}

      {query && (results.length > 0 || (!isBLT && !isExtendedWriting)) && (
        <div className="search-results-heading" aria-live="polite">
          <span>{results.length} {resultLabel}{results.length === 1 ? "" : "s"}</span>
          <p>Every result names its qualification and explains why it appeared.</p>
        </div>
      )}

      <div className="search-results">
        {results.map(({ item, matchReason, matchType }) => {
          const course = courses.find((entry) => entry.id === item.courseId)!;
          return (
            <Link
              key={item.id}
              to={`/course/${course.slug}/unit/${item.unitId}/topic/${item.topicId}`}
              style={{ "--course-accent": course.accent } as React.CSSProperties}
            >
              <div className="result-course"><span>{item.courseTitle}</span><small>{item.courseCode}</small></div>
              <div>
                <span className="eyebrow">{item.topicCode} · {item.unitTitle}</span>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <p className={`result-match result-match--${matchType}`}><strong>Why this appeared:</strong> {matchReason}</p>
                <div className="keyword-row">{item.keywords.slice(0, 4).map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {query && results.length === 0 && !isBLT && !isExtendedWriting && (
        <div className="empty-state"><Search /><h2>Try another search</h2><p>Use a topic, course code or question.</p></div>
      )}
    </div>
  );
}
