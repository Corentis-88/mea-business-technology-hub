import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import "./accessibility-preferences.css";

export type TextSize = "standard" | "large" | "extra-large";

export interface AccessibilityPreferences {
  textSize: TextSize;
  highContrast: boolean;
  reducedMotion: boolean;
  dyslexiaFriendly: boolean;
}

interface AccessibilityContextValue extends AccessibilityPreferences {
  setTextSize: (size: TextSize) => void;
  setHighContrast: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setDyslexiaFriendly: (enabled: boolean) => void;
  resetPreferences: () => void;
}

const STORAGE_KEY = "mea-accessibility-preferences-v1";
const TEXT_SIZES: TextSize[] = ["standard", "large", "extra-large"];

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

function systemPrefersReducedMotion() {
  return typeof window !== "undefined"
    && typeof window.matchMedia === "function"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function defaults(): AccessibilityPreferences {
  return {
    textSize: "standard",
    highContrast: false,
    reducedMotion: systemPrefersReducedMotion(),
    dyslexiaFriendly: false,
  };
}

function readPreferences(): AccessibilityPreferences {
  const fallback = defaults();
  if (typeof window === "undefined") return fallback;

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Partial<AccessibilityPreferences>;
    return {
      textSize: TEXT_SIZES.includes(saved.textSize as TextSize) ? saved.textSize as TextSize : fallback.textSize,
      highContrast: typeof saved.highContrast === "boolean" ? saved.highContrast : fallback.highContrast,
      reducedMotion: typeof saved.reducedMotion === "boolean" ? saved.reducedMotion : fallback.reducedMotion,
      dyslexiaFriendly: typeof saved.dyslexiaFriendly === "boolean" ? saved.dyslexiaFriendly : fallback.dyslexiaFriendly,
    };
  } catch {
    return fallback;
  }
}

function applyPreferences(preferences: AccessibilityPreferences) {
  const root = document.documentElement;
  root.dataset.a11yText = preferences.textSize;
  root.dataset.a11yContrast = preferences.highContrast ? "high" : "standard";
  root.dataset.a11yMotion = preferences.reducedMotion ? "reduced" : "standard";
  root.dataset.a11yDyslexia = preferences.dyslexiaFriendly ? "friendly" : "standard";
}

export function AccessibilityPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(readPreferences);

  useEffect(() => {
    applyPreferences(preferences);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const update = useCallback(<Key extends keyof AccessibilityPreferences>(
    key: Key,
    value: AccessibilityPreferences[Key],
  ) => setPreferences((current) => ({ ...current, [key]: value })), []);

  const value = useMemo<AccessibilityContextValue>(() => ({
    ...preferences,
    setTextSize: (size) => update("textSize", size),
    setHighContrast: (enabled) => update("highContrast", enabled),
    setReducedMotion: (enabled) => update("reducedMotion", enabled),
    setDyslexiaFriendly: (enabled) => update("dyslexiaFriendly", enabled),
    resetPreferences: () => setPreferences(defaults()),
  }), [preferences, update]);

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibilityPreferences() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibilityPreferences must be used inside AccessibilityPreferencesProvider");
  }
  return context;
}

export { STORAGE_KEY as ACCESSIBILITY_STORAGE_KEY };
