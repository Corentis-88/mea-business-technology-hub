import { CirclePause, CirclePlay, RotateCcw, Square } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./read-aloud-controls.css";

type ReadingState = "idle" | "speaking" | "paused";

const MAX_CHUNK_LENGTH = 1_600;

export function getReadableMainText(root: HTMLElement | null = document.getElementById("main-content")): string {
  if (!root) return "";

  const copy = root.cloneNode(true) as HTMLElement;
  copy.querySelectorAll([
    "script", "style", "noscript", "button", "input", "select", "textarea",
    "[hidden]", "[aria-hidden='true']", "[data-read-aloud-ignore]",
  ].join(",")).forEach((element) => element.remove());

  return (copy.innerText || copy.textContent || "")
    .replace(/\s+/g, " ")
    .trim();
}

export function splitSpeechText(text: string, maximumLength = MAX_CHUNK_LENGTH): string[] {
  if (!text) return [];
  const sentences = text.match(/[^.!?]+(?:[.!?]+|$)/g) ?? [text];
  const chunks: string[] = [];
  let current = "";

  const add = (part: string) => {
    const clean = part.trim();
    if (!clean) return;
    if (clean.length > maximumLength) {
      clean.match(new RegExp(`.{1,${maximumLength}}(?:\\s|$)`, "g"))?.forEach((piece) => add(piece));
      return;
    }
    if (current && `${current} ${clean}`.length > maximumLength) {
      chunks.push(current);
      current = clean;
    } else {
      current = current ? `${current} ${clean}` : clean;
    }
  };

  sentences.forEach(add);
  if (current) chunks.push(current);
  return chunks;
}

export function ReadAloudControls() {
  const location = useLocation();
  const supported = typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  const [readingState, setReadingState] = useState<ReadingState>("idle");
  const [message, setMessage] = useState(supported ? "Ready to read this page." : "Read aloud is not supported by this browser.");
  const chunks = useRef<string[]>([]);
  const chunkIndex = useRef(0);
  const session = useRef(0);

  const stop = useCallback((announce = true) => {
    session.current += 1;
    if (supported) window.speechSynthesis.cancel();
    chunks.current = [];
    chunkIndex.current = 0;
    setReadingState("idle");
    if (announce) setMessage("Reading stopped.");
  }, [supported]);

  const speakChunk = useCallback((sessionId: number) => {
    const text = chunks.current[chunkIndex.current];
    if (!supported || !text || sessionId !== session.current) {
      if (sessionId === session.current) {
        setReadingState("idle");
        setMessage("Finished reading this page.");
      }
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 0.95;
    utterance.onend = () => {
      if (sessionId !== session.current) return;
      chunkIndex.current += 1;
      speakChunk(sessionId);
    };
    utterance.onerror = (event) => {
      if (sessionId !== session.current || event.error === "canceled" || event.error === "interrupted") return;
      setReadingState("idle");
      setMessage("Reading could not continue. Please try again.");
    };
    window.speechSynthesis.speak(utterance);
  }, [supported]);

  const start = () => {
    if (!supported) return;
    const text = getReadableMainText();
    if (!text) {
      setMessage("There is no page text to read.");
      return;
    }
    window.speechSynthesis.cancel();
    session.current += 1;
    chunks.current = splitSpeechText(text);
    chunkIndex.current = 0;
    setReadingState("speaking");
    setMessage("Reading this page aloud.");
    speakChunk(session.current);
  };

  const pause = () => {
    if (!supported || readingState !== "speaking") return;
    window.speechSynthesis.pause();
    setReadingState("paused");
    setMessage("Reading paused.");
  };

  const resume = () => {
    if (!supported || readingState !== "paused") return;
    window.speechSynthesis.resume();
    setReadingState("speaking");
    setMessage("Reading resumed.");
  };

  useEffect(() => {
    stop(false);
    setMessage(supported ? "Ready to read this page." : "Read aloud is not supported by this browser.");
  }, [location.pathname, location.search, location.hash, stop, supported]);

  useEffect(() => () => {
    session.current += 1;
    if (supported) window.speechSynthesis.cancel();
  }, [supported]);

  return (
    <section className="read-aloud-controls" aria-labelledby="read-aloud-heading" data-read-aloud-ignore>
      <div className="read-aloud-copy">
        <strong id="read-aloud-heading">Read aloud</strong>
        <span role="status" aria-live="polite">{message}</span>
      </div>
      <div className="read-aloud-actions">
        {readingState === "idle" && message !== "Finished reading this page." && (
          <button type="button" onClick={start} disabled={!supported}>
            <CirclePlay aria-hidden="true" size={19} /> Start
          </button>
        )}
        {readingState === "speaking" && (
          <button type="button" onClick={pause}>
            <CirclePause aria-hidden="true" size={19} /> Pause
          </button>
        )}
        {readingState === "paused" && (
          <button type="button" onClick={resume}>
            <CirclePlay aria-hidden="true" size={19} /> Resume
          </button>
        )}
        {readingState !== "idle" && (
          <button type="button" className="read-aloud-secondary" onClick={() => stop()}>
            <Square aria-hidden="true" size={16} /> Stop
          </button>
        )}
        {readingState === "idle" && supported && message === "Finished reading this page." && (
          <button type="button" className="read-aloud-secondary" onClick={start}>
            <RotateCcw aria-hidden="true" size={17} /> Read again
          </button>
        )}
      </div>
    </section>
  );
}
