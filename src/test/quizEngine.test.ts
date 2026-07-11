import { fireEvent, render, screen } from "@testing-library/react";
import { createElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { RevisionPage } from "../pages/RevisionPage";
import { courses } from "../data/courses";
import { createQuizSession, difficultyFromSlider } from "../lib/quizEngine";
import { AppStateProvider } from "../state/AppState";
import type { QuizDifficulty } from "../types";

const difficulties: QuizDifficulty[] = ["low", "medium", "high"];

describe("configurable quiz engine", () => {
  it("creates 50 qualification-wide questions at every difficulty", () => {
    for (const course of courses) {
      for (const difficulty of difficulties) {
        const session = createQuizSession({ course, difficulty, count: 50, seed: 17 });
        expect(session.questions).toHaveLength(50);
        expect(session.questions.every((question) => question.difficulty === difficulty)).toBe(true);
        expect(session.questions.every((question) => question.sourceTopicId)).toBe(true);
      }
    }
  });

  it("creates 20 focused questions for every topic without reinforcement", () => {
    for (const course of courses) {
      for (const topic of course.units.flatMap((unit) => unit.topics)) {
        for (const difficulty of difficulties) {
          const session = createQuizSession({ course, topicId: topic.id, difficulty, count: 20, seed: 4 });
          expect(session.questions).toHaveLength(20);
          expect(session.questions.every((question) => question.sourceTopicId === topic.id)).toBe(true);
          expect(session.usesReinforcement).toBe(false);
        }
      }
    }
  });

  it("is deterministic for the same settings and seed", () => {
    const options = { course: courses[0], difficulty: "medium" as const, count: 30, seed: 99 };
    const first = createQuizSession(options);
    const second = createQuizSession(options);
    expect(first.questions.map((question) => question.id)).toEqual(second.questions.map((question) => question.id));
    expect(first.questions.map((question) => question.options)).toEqual(second.questions.map((question) => question.options));
  });

  it("enforces qualification and topic limits", () => {
    const topic = courses[0].units[0].topics[0];
    expect(createQuizSession({ course: courses[0], difficulty: "low", count: 999 }).questions).toHaveLength(50);
    expect(createQuizSession({ course: courses[0], topicId: topic.id, difficulty: "low", count: 999 }).questions).toHaveLength(20);
    expect(createQuizSession({ course: courses[0], difficulty: "low", count: 0 }).questions).toHaveLength(1);
  });

  it("maps the three slider positions to named levels", () => {
    expect([1, 2, 3].map(difficultyFromSlider)).toEqual(["low", "medium", "high"]);
  });

  it("uses clear, consistently formatted English throughout generated quizzes", () => {
    const awkwardPhrases = [
      "correct response to:",
      "complete the knowledge link",
      "most directly demonstrated",
      "should be used to analyse",
      "reinforcement check",
      "which is a common mistake",
    ];

    for (const course of courses) {
      for (const difficulty of difficulties) {
        const questions = createQuizSession({ course, difficulty, count: 50, seed: 23 }).questions;
        for (const question of questions) {
          expect(question.prompt).not.toMatch(/^[a-z]/);
          expect(question.prompt).not.toMatch(/\s{2,}/);
          expect(question.prompt).not.toContain("…");
          expect((question.prompt.match(/“/g) ?? []).length).toBe((question.prompt.match(/”/g) ?? []).length);
          expect(question.explanation).not.toMatch(/^[a-z]/);
          expect(question.options.every((option) => option.trim() === option && option.length > 0)).toBe(true);
          for (const phrase of awkwardPhrases) {
            expect(question.prompt.toLowerCase()).not.toContain(phrase);
          }
        }
      }
    }
  });

  it("keeps section questions complete instead of cutting information mid-sentence", () => {
    for (const course of courses) {
      for (const difficulty of difficulties) {
        const questions = course.units.flatMap((unit) => unit.topics).flatMap((topic) =>
          createQuizSession({ course, topicId: topic.id, difficulty, count: 20, seed: 31 }).questions,
        );
        const sectionQuestions = questions.filter((question) => question.id.includes(":section:"));

        for (const question of sectionQuestions) {
          expect(question.prompt).toMatch(/^Which (section of .+|section heading) best matches this information\?/);
          expect(question.prompt.endsWith("”")).toBe(true);
          const quotedInformation = question.prompt.match(/“(.+)”$/)?.[1] ?? "";
          expect(quotedInformation).toMatch(/[.!?]$/);
        }
      }
    }
  });
});

describe("quiz builder interface", () => {
  it("changes the question maximum when one topic is selected", () => {
    render(createElement(MemoryRouter, null, createElement(AppStateProvider, null, createElement(RevisionPage))));
    const topicSelect = screen.getByLabelText("Question focus");
    const amount = screen.getByLabelText("Number of questions");
    expect(amount).toHaveAttribute("max", "50");
    fireEvent.change(topicSelect, { target: { value: courses[0].units[0].topics[0].id } });
    expect(amount).toHaveAttribute("max", "20");
    expect(screen.getByText(/stays within the selected Business GCSE topic and can contain up to 20 questions/i)).toBeInTheDocument();
  });

  it("starts a high-difficulty focused quiz with the selected amount", () => {
    render(createElement(MemoryRouter, null, createElement(AppStateProvider, null, createElement(RevisionPage))));
    fireEvent.change(screen.getByLabelText("Question focus"), { target: { value: courses[0].units[0].topics[0].id } });
    fireEvent.change(screen.getByLabelText("Number of questions"), { target: { value: "12" } });
    fireEvent.change(screen.getByLabelText("Difficulty"), { target: { value: "3" } });
    fireEvent.click(screen.getByRole("button", { name: /start this quiz/i }));
    expect(screen.getByText("High difficulty · 12 questions · 1BS0 only")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Question 1 of 12" })).toBeInTheDocument();
  });
});
