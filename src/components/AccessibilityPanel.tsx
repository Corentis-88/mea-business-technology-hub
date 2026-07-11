import { Accessibility, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { DisplayPreferencesControls } from "../accessibility/DisplayPreferencesControls";
import { ReadAloudControls } from "./ReadAloudControls";
import { ReadingDisplayControls } from "./ReadingDisplayControls";
import "./accessibility-panel.css";

export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
      if (event.key !== "Tab") return;
      const panel = document.getElementById("accessibility-panel");
      const focusable = panel ? Array.from(panel.querySelectorAll<HTMLElement>("button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled)")) : [];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleDialogKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleDialogKeys);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return <>
    <button
      ref={triggerRef}
      type="button"
      className="icon-button header-accessibility"
      aria-label="Open accessibility controls"
      aria-expanded={open}
      aria-controls="accessibility-panel"
      onClick={() => setOpen(true)}
    >
      <Accessibility size={20} aria-hidden="true" />
    </button>
    {open && <div className="accessibility-panel-layer">
      <button className="accessibility-panel-backdrop" type="button" aria-label="Close accessibility controls" onClick={close} />
      <aside id="accessibility-panel" className="accessibility-panel" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header>
          <div><span>Anonymous device controls</span><h2 id={titleId}>Make the site easier to use</h2></div>
          <button ref={closeRef} type="button" className="accessibility-panel__close" aria-label="Close accessibility controls" onClick={close}><X aria-hidden="true" /></button>
        </header>
        <div className="accessibility-panel__body">
          <DisplayPreferencesControls />
          <section className="accessibility-panel__section" aria-label="Reading support">
            <h3>Reading support</h3>
            <ReadAloudControls />
            <div className="accessibility-panel__reading-choices"><ReadingDisplayControls /></div>
          </section>
        </div>
        <footer><strong>No login. No student profile.</strong><span>Display settings stay only in this browser.</span></footer>
      </aside>
    </div>}
  </>;
}
