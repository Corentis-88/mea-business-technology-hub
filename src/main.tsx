import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppStateProvider } from "./state/AppState";
import { AccessibilityPreferencesProvider } from "./accessibility/AccessibilityPreferences";
import "./styles.css";
import "./components/revision-practice.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AccessibilityPreferencesProvider>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </AccessibilityPreferencesProvider>
    </BrowserRouter>
  </StrictMode>,
);
