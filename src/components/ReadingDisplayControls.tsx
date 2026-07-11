import { Focus, Printer, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./reading-display-controls.css";

const focusClass = "is-distraction-free";

export function ReadingDisplayControls() {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    document.body.classList.toggle(focusClass, focused);
    return () => document.body.classList.remove(focusClass);
  }, [focused]);

  useEffect(() => {
    if (!focused) return;
    const leaveOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFocused(false);
    };
    document.addEventListener("keydown", leaveOnEscape);
    return () => document.removeEventListener("keydown", leaveOnEscape);
  }, [focused]);

  return (
    <>
      <button
        type="button"
        className="accessibility-choice"
        aria-pressed={focused}
        onClick={() => setFocused((current) => !current)}
      >
        <Focus aria-hidden="true" size={20} />
        <span><strong>Distraction-free reading</strong><small>Hide menus and keep the learning content</small></span>
      </button>
      <button type="button" className="accessibility-choice" onClick={() => window.print()}>
        <Printer aria-hidden="true" size={20} />
        <span><strong>Print in black and white</strong><small>Create a clear, ink-friendly copy</small></span>
      </button>
      {focused && createPortal(
        <button type="button" className="focus-mode-exit" onClick={() => setFocused(false)}>
          <X aria-hidden="true" size={19} /> Exit distraction-free reading
        </button>, document.body,
      )}
    </>
  );
}
