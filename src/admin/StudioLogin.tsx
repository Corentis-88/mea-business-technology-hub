import { Eye, EyeOff, KeyRound, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { AdminSession } from "./lib";
import { clearAdminCredentials, clearGitHubToken, hasAdminCredentials, loginAdmin, setupAdminCredentials } from "./lib";

interface StudioLoginProps {
  onUnlock: (session: AdminSession) => void;
}

export function StudioLogin({ onUnlock }: StudioLoginProps) {
  const [setup, setSetup] = useState(() => !hasAdminCredentials());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (setup && password !== confirmPassword) {
      setError("The two passwords do not match yet.");
      return;
    }
    setBusy(true);
    try {
      const session = setup
        ? await setupAdminCredentials(username, password)
        : await loginAdmin(username, password);
      if (!session) {
        setError("That username or password is not right. Nothing has been changed.");
        return;
      }
      onUnlock(session);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The studio could not be unlocked.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="studio-login-shell">
      <section className="studio-login-card" aria-labelledby="studio-login-title">
        <div className="studio-login-brand">
          <img src={`${import.meta.env.BASE_URL}branding/mea-official-logo.svg`} alt="Manchester Enterprise Academy" />
          <div><span>Private editing area</span><strong>MEA Content Studio</strong></div>
        </div>
        <div className="studio-login-intro">
          <span className="studio-icon-disc"><LockKeyhole /></span>
          <p className="studio-kicker">{setup ? "First-time setup" : "Welcome back"}</p>
          <h1 id="studio-login-title">{setup ? "Create the login for this computer" : "Unlock the editing studio"}</h1>
          <p>{setup ? "Choose details you will remember. They stay in this browser and are never added to the public website." : "Enter the details created on this computer. Your password is checked here and is never sent to GitHub."}</p>
        </div>
        <form onSubmit={submit} className="studio-login-form">
          <label><span><UserRound /> Username</span><input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Choose a memorable username" required minLength={3} /></label>
          <label><span><KeyRound /> Password</span><div className="studio-password-field"><input type={showPassword ? "text" : "password"} autoComplete={setup ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={setup ? "At least 12 characters" : "Your password"} required minLength={12} /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff /> : <Eye />}</button></div></label>
          {setup && <label><span><ShieldCheck /> Type the password again</span><input type={showPassword ? "text" : "password"} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Repeat the same password" required minLength={12} /></label>}
          {error && <div className="studio-message studio-message--error" role="alert">{error}</div>}
          <button className="studio-primary-button" type="submit" disabled={busy}>{busy ? "Checking securely…" : setup ? "Create login and open studio" : "Open editing studio"}</button>
        </form>
        <div className="studio-login-note"><ShieldCheck /><p><strong>Your password is not stored.</strong> A one-way check and an encrypted publishing key are saved only in this browser.</p></div>
        {!setup && <button className="studio-reset-login" type="button" onClick={() => { if (window.confirm("Create a new login on this computer? Your saved draft will stay, but you will need to connect GitHub again.")) { clearAdminCredentials(); clearGitHubToken(); setUsername(""); setPassword(""); setConfirmPassword(""); setError(""); setSetup(true); } }}>Forgotten the login? Create a new one on this computer</button>}
        <a className="studio-return-link" href={import.meta.env.BASE_URL}>← Return to the student website</a>
      </section>
    </main>
  );
}
