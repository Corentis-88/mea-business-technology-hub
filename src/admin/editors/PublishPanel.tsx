import { AlertTriangle, CheckCircle2, CloudUpload, ExternalLink, GitBranch as Github, Image, KeyRound, LoaderCircle, LockKeyhole, RefreshCw, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { ContentValidationIssue } from "../../content";
import type { ContentBundle } from "../../types";
import type { PublishResult } from "../lib";

interface Props {
  bundle: ContentBundle;
  issues: ContentValidationIssue[];
  pendingAssets: number;
  onPublish: (token: string, message: string) => Promise<PublishResult>;
  onSaveToken: (token: string) => Promise<void>;
  loadSavedToken: () => Promise<string | null>;
}

const friendlyPath = (path: string) => path.replace(/courses\[(\d+)\]/, "qualification $1").replace(/units\[(\d+)\]/, "unit $1").replace(/topics\[(\d+)\]/, "topic $1").replace(/sections\[(\d+)\]/, "section $1").replace(/quiz\[(\d+)\]/, "quiz question $1");

export function PublishPanel({ bundle, issues, pendingAssets, onPublish, onSaveToken, loadSavedToken }: Props) {
  const [token, setToken] = useState("");
  const [tokenReady, setTokenReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [connectionMessage, setConnectionMessage] = useState("");
  const [message, setMessage] = useState("Update learning content through MEA Content Studio");
  const [confirmed, setConfirmed] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [result, setResult] = useState<PublishResult | null>(null);
  const [error, setError] = useState("");
  const counts = useMemo(() => ({
    courses: bundle.courses.length,
    topics: bundle.courses.reduce((total, course) => total + course.units.reduce((sum, unit) => sum + unit.topics.length, 0), 0),
    pages: bundle.customPages.length,
    materials: bundle.resources.length,
  }), [bundle]);

  useEffect(() => { let active = true; void loadSavedToken().then((saved) => { if (!active) return; if (saved) { setToken(saved); setTokenReady(true); } setChecking(false); }).catch(() => setChecking(false)); return () => { active = false; }; }, [loadSavedToken]);

  const testAndSave = async (event: FormEvent) => {
    event.preventDefault(); setConnectionMessage(""); setError(""); setChecking(true);
    try {
      const response = await fetch("https://api.github.com/repos/Corentis-88/mea-business-technology-hub", { headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token.trim()}`, "X-GitHub-Api-Version": "2022-11-28" } });
      if (!response.ok) throw new Error(response.status === 401 ? "GitHub did not accept that token. Copy it again and check it has not expired." : "The repository connection could not be checked.");
      await onSaveToken(token.trim()); setTokenReady(true); setConnectionMessage("Connected. The token is encrypted with your studio password on this computer.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "The connection could not be saved."); } finally { setChecking(false); }
  };

  const publish = async () => {
    setError(""); setResult(null); setPublishing(true);
    try { setResult(await onPublish(token, message)); setConfirmed(false); }
    catch (caught) { setError(caught instanceof Error ? caught.message : "Publishing did not finish. The live site has not been changed."); }
    finally { setPublishing(false); }
  };

  return <section className="studio-publish"><div className="studio-page-heading"><span className="studio-kicker">Final check</span><h1>Publish changes safely</h1><p>The live student site changes only after all checks pass and GitHub accepts one complete version.</p></div>
    <div className="studio-publish-summary"><div><strong>{counts.topics}</strong><span>topic pages</span></div><div><strong>{counts.materials}</strong><span>materials</span></div><div><strong>{counts.pages}</strong><span>extra pages</span></div><div><strong>{pendingAssets}</strong><span>new images</span></div></div>
    <section className={`studio-check-panel ${issues.length ? "has-errors" : "passed"}`}><header>{issues.length ? <AlertTriangle /> : <CheckCircle2 />}<div><span>Automatic content check</span><h2>{issues.length ? `${issues.length} item${issues.length === 1 ? " needs" : "s need"} attention` : "Everything required is present"}</h2></div></header>{issues.length > 0 ? <div className="studio-issue-list">{issues.slice(0, 30).map((issue, index) => <div key={`${issue.path}-${index}`}><AlertTriangle /><p><strong>{issue.message}</strong><span>{friendlyPath(issue.path)}</span></p></div>)}{issues.length > 30 && <p>Plus {issues.length - 30} more. Fix the first items and this list will shrink automatically.</p>}</div> : <p className="studio-check-copy"><ShieldCheck /> IDs, revision topic text, image descriptions, quiz answers, resource links and the Pearson Business-only BLT rule have all passed.</p>}</section>
    <section className="studio-card studio-github-panel"><header><Github /><div><span>One-time publishing connection</span><h2>{checking ? "Checking this computer…" : tokenReady ? "GitHub is connected" : "Connect this computer to GitHub"}</h2></div>{tokenReady && <CheckCircle2 className="success-icon" />}</header>{checking ? <div className="studio-loading-inline"><LoaderCircle /> Checking securely…</div> : tokenReady ? <div className="studio-connected"><LockKeyhole /><p>The publishing key is encrypted on this computer. It can be opened only after the correct studio password is entered.</p><button type="button" onClick={() => { setTokenReady(false); setToken(""); setConnectionMessage(""); }}>Replace connection</button></div> : <form className="studio-token-setup" onSubmit={testAndSave}><ol><li><a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noreferrer">Open GitHub’s fine-grained token page <ExternalLink /></a></li><li>Name it <strong>MEA Content Studio</strong> and choose this repository only.</li><li>Under Repository permissions, set <strong>Contents</strong> to <strong>Read and write</strong>.</li><li>Create the token, copy it, and paste it below. GitHub shows it only once.</li></ol><label><span><KeyRound /> GitHub token</span><input type="password" autoComplete="off" value={token} onChange={(event) => setToken(event.target.value)} placeholder="github_pat_…" required /></label><button className="studio-primary-button" type="submit" disabled={checking}>Check and save connection</button></form>}{connectionMessage && <div className="studio-message studio-message--notice"><CheckCircle2 />{connectionMessage}</div>}</section>
    {tokenReady && <section className="studio-card studio-publish-confirm"><div className="studio-form-grid"><label className="wide"><span>Short note describing this version</span><input value={message} onChange={(event) => setMessage(event.target.value)} maxLength={120} /></label><label className="studio-confirm-box wide"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /><span><strong>I have previewed the changes and want to publish this version.</strong><small>GitHub will rebuild the website automatically. It normally takes about one minute.</small></span></label></div><button className="studio-publish-button" type="button" disabled={!confirmed || issues.length > 0 || publishing} onClick={() => void publish()}>{publishing ? <><LoaderCircle className="spin" /> Publishing one complete version…</> : <><CloudUpload /> Publish to the live website</>}</button></section>}
    {error && <div className="studio-message studio-message--error"><AlertTriangle />{error}</div>}
    {result && <div className="studio-publish-success"><CheckCircle2 /><div><span>Published successfully</span><h2>GitHub is building the new student website</h2><p>Commit <code>{result.commitSha.slice(0, 8)}</code> contains the complete content version and {pendingAssets ? "its new images" : "no unfinished image uploads"}.</p><div><a href="https://github.com/Corentis-88/mea-business-technology-hub/actions" target="_blank" rel="noreferrer"><RefreshCw /> Watch deployment</a><a href={`${window.location.origin}${import.meta.env.BASE_URL}`} target="_blank" rel="noreferrer"><ExternalLink /> Open live site</a></div></div></div>}
    <aside className="studio-security-note"><ShieldCheck /><div><strong>Why this is safe for a static website</strong><p>The password is never uploaded. The GitHub key is encrypted at rest and used only to create one normal versioned commit. GitHub Pages does not run a hidden server, so the management URL itself is not a vault; the login protects the editing and publishing tools on this browser.</p></div><Image /></aside>
  </section>;
}
