import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InteractiveVisualActivity, VocabularyFlashcards } from "../components/RevisionPractice";
import type { Topic } from "../types";

const topic: Topic = {
  id: "test-topic", code: "1.1", title: "Testing ideas", summary: "A test topic.", keywords: [],
  keyTerms: [{ term: "Market", definition: "A group of possible customers." }, { term: "Revenue", definition: "Money received from sales." }],
  sections: [{ heading: "A process", paragraphs: ["Follow each step."], visual: { kind: "process-flow", title: "Idea process", caption: "An idea moves through these steps.", labels: ["Need", "Idea", "Test"] } }],
  commonMistakes: [], examTips: [], quiz: [],
};

describe("revision practice", () => {
  it("flips vocabulary cards and provides self-assessment controls", () => {
    render(<VocabularyFlashcards topic={topic} />);
    expect(screen.getByText("Market")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Market/i }));
    expect(screen.getByText("A group of possible customers.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Know it/i }));
    expect(screen.getByText("1 marked as known")).toBeInTheDocument();
  });

  it("offers keyboard-friendly ordering and checking for a topic visual", () => {
    render(<InteractiveVisualActivity topic={topic} />);
    expect(screen.getAllByRole("button", { name: /Move .* down/i }).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: "Check my order" }));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
