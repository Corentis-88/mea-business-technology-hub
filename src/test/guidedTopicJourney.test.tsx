import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../App";
import { AppStateProvider } from "../state/AppState";

function renderTopic() {
  return render(<MemoryRouter initialEntries={["/course/business/unit/business-theme-1/topic/business-1-1"]}><AppStateProvider><App /></AppStateProvider></MemoryRouter>);
}

describe("guided topic journey", () => {
  beforeEach(() => localStorage.clear());

  it("takes a student through the five topic steps without hiding the existing tabs", () => {
    renderTopic();
    expect(screen.getByRole("heading", { name: "Follow these five simple steps" })).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Topic revision steps" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Learn" })).toHaveAttribute("aria-selected", "true");

    fireEvent.click(screen.getByRole("button", { name: /Next: Visual/ }));
    expect(screen.getByRole("tab", { name: "Concept map" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("See it visually")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Exam practice/ }));
    expect(screen.getByRole("tab", { name: "Exam" })).toHaveAttribute("aria-selected", "true");
    fireEvent.click(screen.getByRole("button", { name: /^Review/ }));
    expect(screen.getByRole("heading", { name: "How confident do you feel?" })).toBeInTheDocument();
  });

  it("saves a final review choice on the device and returns to the requested step", async () => {
    renderTopic();
    fireEvent.click(screen.getByRole("button", { name: /^Review/ }));
    fireEvent.click(screen.getByRole("button", { name: "Teach me again" }));
    expect(screen.getByRole("tab", { name: "Learn" })).toHaveAttribute("aria-selected", "true");
    await waitFor(() => expect(localStorage.getItem("mea-revision-hub-state-v1")).toContain('"status":"revisit"'));
  });
});
