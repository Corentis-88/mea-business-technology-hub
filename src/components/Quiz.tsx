import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useState } from "react";
import type { CourseId, QuizQuestion } from "../types";
import { useAppState } from "../state/AppState";

export function Quiz({ questions, courseId, topicId, title = "Knowledge check", showSourceTopic = false }: { questions: QuizQuestion[]; courseId: CourseId; topicId: string; title?: string; showSourceTopic?: boolean }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const { updateProgress } = useAppState();
  const question = questions[index];

  if (!questions.length) return null;

  const normalise = (value: string) => value.trim().toLocaleLowerCase("en-GB").replace(/[.!?]+$/, "");
  const responseIsCorrect = () => {
    if (question.format === "fill-gap") return (question.acceptedAnswers ?? []).some((answer) => normalise(answer) === normalise(writtenAnswer));
    if (question.format === "matching") return (question.matchingPairs ?? []).every((pair, pairIndex) => matches[pairIndex] === pair.answer);
    return selected === question.answer;
  };

  const next = () => {
    const correct = responseIsCorrect();
    const nextScore = score + (correct ? 1 : 0);
    if (index === questions.length - 1) {
      setScore(nextScore);
      setFinished(true);
      updateProgress(courseId, topicId, Math.round((nextScore / questions.length) * 100));
    } else {
      setScore(nextScore);
      setIndex((value) => value + 1);
      setSelected(null);
      setWrittenAnswer("");
      setMatches([]);
      setChecked(false);
    }
  };

  const reset = () => { setIndex(0); setSelected(null); setWrittenAnswer(""); setMatches([]); setChecked(false); setScore(0); setFinished(false); };

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <section className="quiz-panel quiz-result" aria-live="polite">
        <span className="eyebrow">{title} complete</span>
        <div className="score-orbit" aria-label={`${percent}%`}><strong>{percent}%</strong><span>{score}/{questions.length}</span></div>
        <h3>{percent >= 80 ? "Secure work" : percent >= 50 ? "Good start—one more pass" : "This topic needs another look"}</h3>
        <p>{percent >= 80 ? "You retrieved this accurately. Schedule a later review to keep it secure." : "Review the explanations above, then try again without looking."}</p>
        <button type="button" className="button button--secondary" onClick={reset}><RotateCcw size={17} /> Try again</button>
      </section>
    );
  }

  const needsCheckButton = question.format === "fill-gap" || question.format === "matching";
  const matchingCount = question.matchingPairs?.length ?? 0;
  const hasResponse = question.format === "fill-gap" ? writtenAnswer.trim().length > 0 : question.format === "matching" ? matchingCount > 0 && Array.from({ length: matchingCount }, (_, pairIndex) => Boolean(matches[pairIndex])).every(Boolean) : selected !== null;
  const answered = needsCheckButton ? checked : selected !== null;
  const isCorrect = answered && responseIsCorrect();
  return (
    <section className="quiz-panel">
      <div className="quiz-header"><div><span className="eyebrow">{title}</span><h3>Question {index + 1} of {questions.length}</h3></div><span className="quiz-score">{score} correct</span></div>
      <div className="quiz-progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      {showSourceTopic && question.sourceTopicTitle && <span className="quiz-topic-label">{question.sourceTopicTitle}</span>}
      {question.format && question.format !== "multiple-choice" && <span className="quiz-format-label">{question.format === "true-false" ? "True or false" : question.format === "fill-gap" ? "Fill the gap" : "Matching"}</span>}
      <p className="quiz-prompt">{question.prompt}</p>
      {question.format === "fill-gap" ? <div className="quiz-written-answer"><label htmlFor={`quiz-answer-${question.id}`}>Your answer</label><input id={`quiz-answer-${question.id}`} value={writtenAnswer} disabled={answered} autoComplete="off" onChange={(event) => setWrittenAnswer(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && hasResponse) setChecked(true); }} /></div> : question.format === "matching" ? <div className="quiz-matching" aria-label="Matching question">
        {(question.matchingPairs ?? []).map((pair, pairIndex) => <label key={pair.prompt}><strong>{pair.prompt}</strong><select aria-label={`Meaning for ${pair.prompt}`} value={matches[pairIndex] ?? ""} disabled={answered} onChange={(event) => setMatches((current) => { const nextMatches = [...current]; nextMatches[pairIndex] = event.target.value; return nextMatches; })}><option value="">Choose a meaning</option>{question.options.map((option) => <option key={option} value={option}>{option}</option>)}</select>{answered && <span className={matches[pairIndex] === pair.answer ? "is-correct" : "is-incorrect"}>{matches[pairIndex] === pair.answer ? "Correct" : `Correct answer: ${pair.answer}`}</span>}</label>)}
      </div> : <div className="quiz-options">
        {question.options.map((option, optionIndex) => {
          const state = answered ? optionIndex === question.answer ? "correct" : optionIndex === selected ? "incorrect" : "muted" : "";
          return <button type="button" key={option} className={state} disabled={answered} onClick={() => setSelected(optionIndex)}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}{state === "correct" && <CheckCircle2 size={18} />}{state === "incorrect" && <XCircle size={18} />}</button>;
        })}
      </div>}
      {needsCheckButton && !answered && <button type="button" className="button button--secondary quiz-check" disabled={!hasResponse} onClick={() => setChecked(true)}>Check answer</button>}
      {answered && <div className={`answer-feedback ${isCorrect ? "is-correct" : "is-incorrect"}`} role="status"><strong>{isCorrect ? "Correct" : "Not quite"}</strong><p>{question.explanation}</p></div>}
      <button type="button" className="button button--primary" disabled={!answered} onClick={next}>{index === questions.length - 1 ? "Finish quiz" : "Next question"}</button>
    </section>
  );
}
