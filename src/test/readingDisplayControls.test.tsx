import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ReadingDisplayControls } from "../components/ReadingDisplayControls";

describe("ReadingDisplayControls", () => {
  afterEach(() => document.body.classList.remove("is-distraction-free"));

  it("enters and exits distraction-free reading", () => {
    render(<ReadingDisplayControls />);
    fireEvent.click(screen.getByRole("button", { name: /distraction-free reading/i }));
    expect(document.body).toHaveClass("is-distraction-free");
    fireEvent.click(screen.getByRole("button", { name: /exit distraction-free reading/i }));
    expect(document.body).not.toHaveClass("is-distraction-free");
  });

  it("leaves focused reading with Escape", () => {
    render(<ReadingDisplayControls />);
    fireEvent.click(screen.getByRole("button", { name: /distraction-free reading/i }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.body).not.toHaveClass("is-distraction-free");
  });

  it("opens the browser print dialogue", () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => undefined);
    render(<ReadingDisplayControls />);
    fireEvent.click(screen.getByRole("button", { name: /print in black and white/i }));
    expect(print).toHaveBeenCalledOnce();
    print.mockRestore();
  });
});
