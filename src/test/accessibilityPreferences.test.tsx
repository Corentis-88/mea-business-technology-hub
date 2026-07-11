import { act, render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ACCESSIBILITY_STORAGE_KEY,
  AccessibilityPreferencesProvider,
  useAccessibilityPreferences,
} from "../accessibility/AccessibilityPreferences";
import { DisplayPreferencesControls } from "../accessibility/DisplayPreferencesControls";

const wrapper = ({ children }: { children: ReactNode }) => (
  <AccessibilityPreferencesProvider>{children}</AccessibilityPreferencesProvider>
);

describe("AccessibilityPreferencesProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-a11y-text");
    document.documentElement.removeAttribute("data-a11y-contrast");
    document.documentElement.removeAttribute("data-a11y-motion");
    document.documentElement.removeAttribute("data-a11y-dyslexia");
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: false }));
  });

  it("applies and saves preferences on this device", async () => {
    const { result } = renderHook(() => useAccessibilityPreferences(), { wrapper });
    act(() => {
      result.current.setTextSize("extra-large");
      result.current.setHighContrast(true);
      result.current.setDyslexiaFriendly(true);
      result.current.setReducedMotion(true);
    });

    await waitFor(() => expect(document.documentElement.dataset.a11yText).toBe("extra-large"));
    expect(document.documentElement.dataset.a11yContrast).toBe("high");
    expect(document.documentElement.dataset.a11yDyslexia).toBe("friendly");
    expect(document.documentElement.dataset.a11yMotion).toBe("reduced");
    expect(JSON.parse(localStorage.getItem(ACCESSIBILITY_STORAGE_KEY)!)).toMatchObject({
      textSize: "extra-large",
      highContrast: true,
      dyslexiaFriendly: true,
      reducedMotion: true,
    });
  });

  it("restores valid saved preferences", () => {
    localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify({
      textSize: "large", highContrast: true, reducedMotion: false, dyslexiaFriendly: false,
    }));
    const { result } = renderHook(() => useAccessibilityPreferences(), { wrapper });
    expect(result.current.textSize).toBe("large");
    expect(result.current.highContrast).toBe(true);
  });

  it("respects the system reduced-motion setting when there is no saved choice", () => {
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: true }));
    const { result } = renderHook(() => useAccessibilityPreferences(), { wrapper });
    expect(result.current.reducedMotion).toBe(true);
  });

  it("falls back safely when saved data is invalid", () => {
    localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, "not JSON");
    const { result } = renderHook(() => useAccessibilityPreferences(), { wrapper });
    expect(result.current.textSize).toBe("standard");
    expect(result.current.highContrast).toBe(false);
  });

  it("offers understandable controls for every display preference", async () => {
    const user = userEvent.setup();
    render(<AccessibilityPreferencesProvider><DisplayPreferencesControls /></AccessibilityPreferencesProvider>);
    await user.click(screen.getByRole("button", { name: /extra large/i }));
    await user.click(screen.getByRole("switch", { name: /high contrast/i }));
    expect(screen.getByRole("button", { name: /extra large/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("switch", { name: /high contrast/i })).toHaveAttribute("aria-checked", "true");
  });
});
