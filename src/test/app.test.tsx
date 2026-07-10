import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "../App";
import { BLTBuilder } from "../components/BLTBuilder";
import businessCourse from "../data/business";
import enterpriseCourse from "../data/enterprise";
import { enterpriseSimpleGuides, enterpriseSimpleVisuals } from "../data/enterpriseSimple";
import { practiceCases } from "../data/extendedWriting";
import { AppStateProvider } from "../state/AppState";

function renderApp(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppStateProvider><App /></AppStateProvider>
    </MemoryRouter>,
  );
}

describe("student journeys", () => {
  it("keeps the private editing studio off the public navigation and opens first-time setup at its direct URL", async () => {
    renderApp("/manage-mea-7f3k9q");
    expect(await screen.findByRole("heading", { name: "Create the login for this computer" }, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create login and open studio" })).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Main navigation" })).not.toBeInTheDocument();
  });

  it("renders four qualification front doors", () => {
    renderApp();
    expect(screen.getByRole("heading", { name: "MEA Business and Technology Hub" })).toBeInTheDocument();
    expect(screen.getByText("Helping you easily learn and revise topics at MEA in Business and Technology")).toBeInTheDocument();
    expect(screen.getByText("Business GCSE")).toBeInTheDocument();
    expect(screen.getByText("Enterprise & Marketing")).toBeInTheDocument();
    expect(screen.getByText("Computer Science")).toBeInTheDocument();
    expect(screen.getByText("Creative iMedia")).toBeInTheDocument();
  });

  it("renders the Business course and BLT entry point", () => {
    renderApp("/course/business");
    expect(screen.getByRole("heading", { name: "Business GCSE", level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Because, Leads To, Therefore/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Find the term, then jump to the explanation" })).toBeInTheDocument();
    expect(screen.getAllByRole("link").some((link) => link.getAttribute("href")?.includes("#section-"))).toBe(true);
  });

  it("shows a direct Business-only answer for BLT search", () => {
    renderApp("/search?q=BLT");
    expect(screen.getByText(/Best answer.*Pearson Business only/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Open interactive BLT builder/ })).toHaveAttribute("href", "/business/blt");
  });

  it("renders completed concept maps and the Business writing lab", () => {
    renderApp("/concept-maps?course=computer-science");
    expect(screen.getByRole("heading", { name: "Completed concept maps" })).toBeInTheDocument();
    expect(screen.getByText(/Each high-level box is a topic in this unit/)).toBeInTheDocument();
    expect(screen.getAllByText("Open topic detail").length).toBeGreaterThan(0);
    cleanup();
    renderApp("/business/extended-writing");
    expect(screen.getByRole("heading", { name: "Build connected case-study answers" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Build one complete BLT" })).toBeInTheDocument();
    expect(screen.getAllByText("Completed answer")).toHaveLength(4);
    expect(screen.getByText(/Never begin the sentence with “Because”/)).toBeInTheDocument();
    expect(screen.getByText(/Original MEA practice case/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Use the same source at different mark levels" })).toBeInTheDocument();
    expect(screen.getByText(/Read Extract A and look at Figures 1, 2 and 3/)).toBeInTheDocument();
  });

  it("shows materials for exactly one selected qualification", () => {
    renderApp("/materials?course=computer-science");
    expect(screen.queryByRole("button", { name: "All" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Computer Science.*OCR.*J277/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "Computer Science specification" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Enterprise and Marketing specification" })).not.toBeInTheDocument();
  });

  it("offers an Enterprise-only easier-reading mode in the requested tab position", () => {
    renderApp("/course/enterprise/unit/enterprise-r068/topic/enterprise-r068-1");
    const tabs = screen.getAllByRole("tab");
    expect(tabs.slice(0, 3).map((tab) => tab.textContent)).toEqual(["Learn", "Say it simpler", "Concept map"]);
    fireEvent.click(screen.getByRole("tab", { name: "Say it simpler" }));
    expect(screen.getByRole("heading", { name: "Let’s take this step by step" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Research you can give good reasons for" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Words you need to know" })).toBeInTheDocument();
    expect(screen.getAllByText("Picture it").length).toBeGreaterThan(0);
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Concept map" })).toHaveAttribute("aria-selected", "true");
    cleanup();
    renderApp("/course/business/unit/business-theme-1/topic/business-1-1");
    expect(screen.queryByRole("tab", { name: "Say it simpler" })).not.toBeInTheDocument();
  });
});

describe("Enterprise easier-reading coverage", () => {
  it("provides a complete plain-language guide for every Enterprise topic and section", () => {
    const topics = enterpriseCourse.units.flatMap((unit) => unit.topics);
    expect(enterpriseSimpleGuides).toHaveLength(topics.length);
    for (const topic of topics) {
      const guide = enterpriseSimpleGuides.find((item) => item.topicId === topic.id);
      expect(guide).toBeDefined();
      expect(guide!.sections.map((section) => section.heading)).toEqual(topic.sections.map((section) => section.heading));
      expect(guide!.sections.every((section) => section.explanation.length > 0)).toBe(true);
      expect(topic.sections.every((section) => enterpriseSimpleVisuals[`${topic.id}:${section.heading}`])).toBe(true);
    }
  });
});

describe("Business visual coverage", () => {
  it("provides a purposeful visual for every Pearson Business topic section", () => {
    const sections = businessCourse.units.flatMap((unit) => unit.topics.flatMap((topic) => topic.sections));
    expect(sections).toHaveLength(30);
    expect(sections.every((section) => section.visual)).toBe(true);
  });
});

describe("Pearson-informed original case sources", () => {
  it("uses full-length extracts and a source-linked question ladder", () => {
    for (const practiceCase of practiceCases) {
      const wordCount = practiceCase.context.join(" ").trim().split(/\s+/).length;
      expect(wordCount).toBeGreaterThanOrEqual(190);
      expect(wordCount).toBeLessThanOrEqual(240);
      expect(practiceCase.context.length).toBeGreaterThanOrEqual(3);
      expect(practiceCase.questionLadder.some((question) => question.marks === 6)).toBe(true);
      expect(practiceCase.questionLadder.some((question) => question.marks >= 9)).toBe(true);
      expect(practiceCase.chart).toHaveLength(3);
    }
  });
});

describe("BLT validation", () => {
  it("rejects a sentence beginning with Because", () => {
    const view = render(<MemoryRouter><BLTBuilder /></MemoryRouter>);
    const scope = within(view.container);
    const inputs = scope.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "Because staff are trained" } });
    fireEvent.change(inputs[1], { target: { value: "customers receive better service" } });
    fireEvent.change(inputs[2], { target: { value: "repeat purchases may increase" } });
    expect(scope.getByText(/cannot start the sentence/)).toBeInTheDocument();
    expect(scope.getByRole("button", { name: /Copy answer/ })).toBeDisabled();
  });

  it("accepts a point followed by because", () => {
    const view = render(<MemoryRouter><BLTBuilder /></MemoryRouter>);
    const scope = within(view.container);
    const inputs = scope.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "Training may improve service because staff understand complaints." } });
    fireEvent.change(inputs[1], { target: { value: "customers receiving quicker support" } });
    fireEvent.change(inputs[2], { target: { value: "repeat purchases may increase" } });
    expect(scope.queryByText(/cannot start the sentence/)).not.toBeInTheDocument();
    expect(scope.getByRole("button", { name: /Copy answer/ })).toBeEnabled();
  });
});
