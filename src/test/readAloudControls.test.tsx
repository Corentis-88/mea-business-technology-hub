import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getReadableMainText, ReadAloudControls, splitSpeechText } from "../components/ReadAloudControls";

class MockUtterance {
  text: string;
  lang = "";
  rate = 1;
  onend: (() => void) | null = null;
  onerror: ((event: { error: string }) => void) | null = null;
  constructor(text: string) { this.text = text; }
}

const speech = { speak: vi.fn(), pause: vi.fn(), resume: vi.fn(), cancel: vi.fn() };

function Page() {
  const navigate = useNavigate();
  return <><main id="main-content"><h1>Customer needs</h1><p>Customers value quality.</p><button>Do not read me</button></main><ReadAloudControls /><button onClick={() => navigate("/next")}>Next route</button></>;
}

describe("ReadAloudControls", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: speech });
    Object.defineProperty(window, "SpeechSynthesisUtterance", { configurable: true, value: MockUtterance });
    Object.defineProperty(globalThis, "SpeechSynthesisUtterance", { configurable: true, value: MockUtterance });
  });

  it("extracts readable main content while excluding controls", () => {
    const root = document.createElement("main");
    root.innerHTML = "<h1>A useful heading</h1><button>Skip this</button><p>Useful detail.</p>";
    expect(getReadableMainText(root)).toContain("A useful heading");
    expect(getReadableMainText(root)).toContain("Useful detail.");
    expect(getReadableMainText(root)).not.toContain("Skip this");
  });

  it("splits long page copy into manageable speech chunks", () => {
    const chunks = splitSpeechText("First short sentence. Second sentence is here. Third one follows.", 30);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks.every((chunk) => chunk.length <= 30)).toBe(true);
  });

  it("starts, pauses, resumes and stops reading", () => {
    render(<MemoryRouter><Page /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: /start/i }));
    expect(speech.speak).toHaveBeenCalledTimes(1);
    expect((speech.speak.mock.calls[0][0] as MockUtterance).text).toContain("Customer needs");
    fireEvent.click(screen.getByRole("button", { name: /pause/i }));
    expect(speech.pause).toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /resume/i }));
    expect(speech.resume).toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /stop/i }));
    expect(speech.cancel).toHaveBeenCalled();
    expect(screen.getByText("Reading stopped.")).toBeInTheDocument();
  });

  it("stops speech when the route changes", () => {
    render(<MemoryRouter initialEntries={["/"]}><Routes><Route path="*" element={<Page />} /></Routes></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: /start/i }));
    speech.cancel.mockClear();
    fireEvent.click(screen.getByRole("button", { name: "Next route" }));
    expect(speech.cancel).toHaveBeenCalled();
  });

  it("explains when the browser does not support speech", () => {
    Reflect.deleteProperty(window, "speechSynthesis");
    Reflect.deleteProperty(window, "SpeechSynthesisUtterance");
    render(<MemoryRouter><ReadAloudControls /></MemoryRouter>);
    expect(screen.getByText("Read aloud is not supported by this browser.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start/i })).toBeDisabled();
  });
});
