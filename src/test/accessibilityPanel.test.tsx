import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AccessibilityPreferencesProvider } from "../accessibility/AccessibilityPreferences";
import { AccessibilityPanel } from "../components/AccessibilityPanel";

describe("AccessibilityPanel", () => {
  it("opens from one clear control and applies an anonymous text-size choice", () => {
    render(<MemoryRouter><AccessibilityPreferencesProvider><AccessibilityPanel /></AccessibilityPreferencesProvider></MemoryRouter>);

    fireEvent.click(screen.getByRole("button", { name: "Open accessibility controls" }));
    expect(screen.getByRole("dialog", { name: "Make the site easier to use" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Extra large/ }));
    expect(document.documentElement.dataset.a11yText).toBe("extra-large");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
