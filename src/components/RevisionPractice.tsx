import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, ChevronUp, Eye, EyeOff, RotateCcw, Shuffle } from "lucide-react";
import type { KeyTerm, Topic, VisualSpec } from "../types";

function mixed<T>(items: T[]) { return [...items].sort(() => Math.random() - 0.5); }

export function VocabularyFlashcards({ topic }: { topic: Topic }) {
  const [cards, setCards] = useState<KeyTerm[]>(topic.keyTerms);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const [testMode, setTestMode] = useState(false);
  const card = cards[index];
  useEffect(() => { setCards(topic.keyTerms); setIndex(0); setFlipped(false); setKnown([]); }, [topic.id, topic.keyTerms]);
  if (!card) return null;
  const moveOn = (knowsIt: boolean) => { setKnown((current) => knowsIt ? [...new Set([...current, card.term])] : current.filter((term) => term !== card.term)); setIndex((current) => (current + 1) % cards.length); setFlipped(false); };
  return <section className="practice-panel flashcards" aria-labelledby="flashcards-title">
    <header><div><span className="eyebrow">Active recall</span><h2 id="flashcards-title">Topic flashcards</h2><p>Say the meaning before you reveal it. Cards marked “Not yet” stay ready for another try.</p></div><label className="mode-switch"><input type="checkbox" checked={testMode} onChange={(event) => { setTestMode(event.target.checked); setFlipped(false); }} /><span>Test mode</span></label></header>
    <div className="practice-progress" aria-live="polite"><span>Card {index + 1} of {cards.length}</span><span>{known.length} marked as known</span></div>
    <button className={`flashcard ${flipped ? "is-flipped" : ""}`} type="button" onClick={() => setFlipped(!flipped)} aria-pressed={flipped}><small>{testMode ? (flipped ? "Answer" : "What is the term?") : (flipped ? "Meaning" : "Key term")}</small><strong>{testMode ? (flipped ? card.term : card.definition) : (flipped ? card.definition : card.term)}</strong><span>{flipped ? <><EyeOff /> Hide answer</> : <><Eye /> Reveal answer</>}</span></button>
    <div className="flashcard-actions"><button type="button" className="button button--secondary" onClick={() => moveOn(false)}>Not yet</button><button type="button" className="button" onClick={() => moveOn(true)}><Check /> Know it</button><button type="button" className="button button--ghost" onClick={() => { setCards(mixed(cards)); setIndex(0); setFlipped(false); }}><Shuffle /> Shuffle</button></div>
  </section>;
}

function topicVisual(topic: Topic): VisualSpec | undefined { return topic.sections.flatMap((section) => [...(section.visual ? [section.visual] : []), ...(section.visuals ?? [])]).find((visual) => (visual.labels?.length ?? 0) >= 3); }
function move<T>(items: T[], from: number, to: number) { const next = [...items]; const [item] = next.splice(from, 1); next.splice(to, 0, item); return next; }

export function InteractiveVisualActivity({ topic }: { topic: Topic }) {
  const visual = useMemo(() => topicVisual(topic), [topic]);
  const answer = useMemo(() => visual?.labels ?? [], [visual]);
  const [items, setItems] = useState<string[]>(() => mixed(answer));
  const [checked, setChecked] = useState(false);
  const [dragged, setDragged] = useState<number | null>(null);
  useEffect(() => { setItems(mixed(answer)); setChecked(false); }, [topic.id, answer]);
  if (!visual) return null;
  const correct = items.every((item, index) => item === answer[index]);
  const reposition = (from: number, to: number) => { setItems(move(items, from, to)); setChecked(false); };
  return <section className="practice-panel visual-activity" aria-labelledby="visual-activity-title">
    <header><div><span className="eyebrow">Interactive visual</span><h2 id="visual-activity-title">Rebuild: {visual.title}</h2><p>Put the labels back into the order used by the topic visual. Drag them, or use the arrow buttons.</p></div></header>
    <div className="visual-activity__canvas" aria-label={`Labels for ${visual.title}`}>{items.map((label, index) => <div key={label} className={`visual-activity__item ${checked ? (label === answer[index] ? "is-correct" : "is-wrong") : ""}`} draggable onDragStart={() => setDragged(index)} onDragOver={(event) => event.preventDefault()} onDrop={() => { if (dragged !== null && dragged !== index) reposition(dragged, index); setDragged(null); }}><span aria-hidden="true">{index + 1}</span><strong>{label}</strong><div><button type="button" aria-label={`Move ${label} up`} disabled={index === 0} onClick={() => reposition(index, index - 1)}><ChevronUp /></button><button type="button" aria-label={`Move ${label} down`} disabled={index === items.length - 1} onClick={() => reposition(index, index + 1)}><ChevronDown /></button></div></div>)}</div>
    <p className="visual-activity__caption">Clue: {visual.caption}</p><div className="flashcard-actions"><button type="button" className="button" onClick={() => setChecked(true)}><Check /> Check my order</button><button type="button" className="button button--ghost" onClick={() => { setItems(mixed(answer)); setChecked(false); }}><RotateCcw /> Mix again</button></div>
    {checked && <div className={`practice-feedback ${correct ? "is-correct" : "is-wrong"}`} role="status">{correct ? "Well done — every label is in the correct place." : "Not quite. The coloured labels show which positions to check. Move them and try again."}</div>}
  </section>;
}

export function TopicPracticeTools({ topic }: { topic: Topic }) { return <div className="topic-practice-tools"><VocabularyFlashcards topic={topic} /><InteractiveVisualActivity topic={topic} /></div>; }
