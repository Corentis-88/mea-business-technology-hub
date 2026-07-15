import { Search, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchTopics } from "../lib/search";

interface SearchBoxProps {
  large?: boolean;
  initialValue?: string;
  courseId?: string;
  autoFocus?: boolean;
}

export function SearchBox({ large, initialValue = "", courseId, autoFocus }: SearchBoxProps) {
  const [query, setQuery] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputId = useId();
  const suggestions = query.trim().length >= 2 ? searchTopics(query, courseId).slice(0, 5) : [];

  useEffect(() => setOpen(false), [location.pathname, location.search]);

  const submit = (value = query) => {
    const cleaned = value.trim();
    if (!cleaned) return;
    const params = new URLSearchParams({ q: cleaned });
    if (courseId) params.set("course", courseId);
    navigate(`/search?${params}`);
  };

  return (
    <div className={`search-box ${large ? "search-box--large" : ""}`}>
      <form
        role="search"
        onSubmit={(event) => { event.preventDefault(); submit(); }}
        className="search-box__form"
      >
        <label className="sr-only" htmlFor={inputId}>Search revision topics</label>
        <Search aria-hidden="true" size={large ? 24 : 19} />
        <input
          id={inputId}
          value={query}
          autoFocus={autoFocus}
          onChange={(event) => { setQuery(event.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              submit();
            }
          }}
          placeholder={courseId ? "Search this qualification…" : "Search a topic, unit or question…"}
          autoComplete="off"
        />
        {query && (
          <button type="button" className="icon-button" aria-label="Clear search" onClick={() => setQuery("")}>
            <X size={18} />
          </button>
        )}
        <button type="submit" className="button button--primary search-box__button">Search</button>
      </form>
      {open && suggestions.length > 0 && (
        <div className="search-suggestions" role="listbox" aria-label="Search suggestions">
          {suggestions.map(({ item, matchType }) => (
            <button
              type="button"
              key={item.id}
              role="option"
              aria-selected="false"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => navigate(`/course/${item.courseId === "computer-science" ? "computer-science" : item.courseId === "creative-imedia" ? "creative-imedia" : item.courseId}/unit/${item.unitId}/topic/${item.topicId}`)}
            >
              <span><strong>{item.title}</strong><small>{item.courseTitle} · {item.topicCode}</small></span>
              <span className="suggestion-type">{matchType === "suggestion" ? "Suggested" : "Topic"}</span>
            </button>
          ))}
          <button type="button" className="search-suggestions__all" onClick={() => submit()}>
            See all results for “{query}”
          </button>
        </div>
      )}
    </div>
  );
}
