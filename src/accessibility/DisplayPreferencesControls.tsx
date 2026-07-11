import { Contrast, LetterText, RotateCcw, Sparkles, Text } from "lucide-react";
import { useAccessibilityPreferences, type TextSize } from "./AccessibilityPreferences";
import "./display-preferences-controls.css";

const textSizes: Array<{ value: TextSize; label: string; sample: string }> = [
  { value: "standard", label: "Standard", sample: "A" },
  { value: "large", label: "Large", sample: "A" },
  { value: "extra-large", label: "Extra large", sample: "A" },
];

export function DisplayPreferencesControls() {
  const preferences = useAccessibilityPreferences();

  return (
    <div className="display-preferences">
      <fieldset className="display-preferences__group">
        <legend><Text size={19} aria-hidden="true" /> Text size</legend>
        <div className="display-preferences__sizes">
          {textSizes.map((size, index) => (
            <button
              className="display-preferences__size"
              data-size={size.value}
              key={size.value}
              type="button"
              aria-pressed={preferences.textSize === size.value}
              onClick={() => preferences.setTextSize(size.value)}
            >
              <span className="display-preferences__sample" aria-hidden="true">{size.sample}</span>
              <span>{size.label}</span>
              <span className="sr-only">, option {index + 1} of {textSizes.length}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="display-preferences__toggles">
        <PreferenceToggle
          icon={<Contrast aria-hidden="true" />}
          label="High contrast"
          hint="Stronger colours and borders"
          pressed={preferences.highContrast}
          onChange={preferences.setHighContrast}
        />
        <PreferenceToggle
          icon={<Sparkles aria-hidden="true" />}
          label="Reduce movement"
          hint="Stops animations and smooth scrolling"
          pressed={preferences.reducedMotion}
          onChange={preferences.setReducedMotion}
        />
        <PreferenceToggle
          icon={<LetterText aria-hidden="true" />}
          label="Dyslexia-friendly text"
          hint="Clearer letter and word spacing"
          pressed={preferences.dyslexiaFriendly}
          onChange={preferences.setDyslexiaFriendly}
        />
      </div>

      <button className="display-preferences__reset" type="button" onClick={preferences.resetPreferences}>
        <RotateCcw size={17} aria-hidden="true" /> Reset display settings
      </button>
      <p className="display-preferences__privacy">These settings stay in this browser. No account or personal information is used.</p>
    </div>
  );
}

function PreferenceToggle({
  icon,
  label,
  hint,
  pressed,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  hint: string;
  pressed: boolean;
  onChange: (pressed: boolean) => void;
}) {
  return (
    <button
      className="display-preferences__toggle"
      type="button"
      role="switch"
      aria-checked={pressed}
      onClick={() => onChange(!pressed)}
    >
      <span className="display-preferences__icon">{icon}</span>
      <span className="display-preferences__copy"><strong>{label}</strong><small>{hint}</small></span>
      <span className="display-preferences__switch" aria-hidden="true"><span /></span>
    </button>
  );
}
