import { BookOpen, Boxes, BriefcaseBusiness, CheckCircle2, ChevronLeft, CloudUpload, Download, FilePlus2, FolderKanban, History, Home, ImagePlus, LayoutDashboard, LogOut, Redo2, RotateCcw, Save, Settings, Undo2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import type { AdminSession, PublishResult } from "./lib";
import type { ContentBundle } from "../types";
import type { ContentValidationIssue } from "../content";
import { ContentEditor } from "./editors/ContentEditor";
import { ResourceEditor } from "./editors/ResourceEditor";
import { PageEditor } from "./editors/PageEditor";
import { SettingsEditor } from "./editors/SettingsEditor";
import { PublishPanel } from "./editors/PublishPanel";
import { CaseStudyEditor } from "./editors/CaseStudyEditor";
import { downloadJson, type PendingAsset } from "./studioHelpers";

type StudioView = "dashboard" | "content" | "materials" | "cases" | "pages" | "settings" | "publish";

interface StudioWorkspaceProps {
  session: AdminSession;
  bundle: ContentBundle;
  validationIssues: ContentValidationIssue[];
  onChange: (next: ContentBundle | ((current: ContentBundle) => ContentBundle)) => void;
  assets: PendingAsset[];
  onAssetsChange: (assets: PendingAsset[]) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  draftStatus: string;
  onImport: (bundle: ContentBundle) => void;
  onReset: () => Promise<void>;
  onPublish: (token: string, message: string) => Promise<PublishResult>;
  onSaveToken: (token: string) => Promise<void>;
  loadSavedToken: () => Promise<string | null>;
  onLogout: () => void;
}

const nav: Array<{ id: StudioView; label: string; description: string; icon: typeof Home }> = [
  { id: "dashboard", label: "Home", description: "Your editing checklist", icon: LayoutDashboard },
  { id: "content", label: "Courses", description: "Lessons, quizzes and visuals", icon: BookOpen },
  { id: "materials", label: "Materials", description: "Official links and resources", icon: FolderKanban },
  { id: "cases", label: "Business cases", description: "Extended-writing practice", icon: BriefcaseBusiness },
  { id: "pages", label: "Extra pages", description: "Create standalone pages", icon: FilePlus2 },
  { id: "settings", label: "Site details", description: "Name, logo and welcome text", icon: Settings },
  { id: "publish", label: "Publish", description: "Check and send changes live", icon: CloudUpload },
];

export function StudioWorkspace(props: StudioWorkspaceProps) {
  const [view, setView] = useState<StudioView>("dashboard");
  const [notice, setNotice] = useState("");
  const importInput = useRef<HTMLInputElement>(null);
  const topicCount = props.bundle.courses.reduce((total, course) => total + course.units.reduce((sum, unit) => sum + unit.topics.length, 0), 0);
  const sectionCount = props.bundle.courses.reduce((total, course) => total + course.units.reduce((unitTotal, unit) => unitTotal + unit.topics.reduce((topicTotal, topic) => topicTotal + topic.sections.length, 0), 0), 0);

  const importBackup = async (file?: File) => {
    if (!file) return;
    setNotice("");
    try {
      const parsed = JSON.parse(await file.text()) as ContentBundle | { published: ContentBundle };
      props.onImport("published" in parsed ? parsed.published : parsed);
      setNotice("Backup imported. Check the preview before publishing.");
    } catch (caught) {
      setNotice(caught instanceof Error ? caught.message : "That backup could not be opened.");
    } finally {
      if (importInput.current) importInput.current.value = "";
    }
  };

  return (
    <div className="studio-shell">
      <header className="studio-topbar">
        <div className="studio-topbar__brand"><img src={`${import.meta.env.BASE_URL}branding/mea-official-logo.svg`} alt="" /><div><strong>MEA Content Studio</strong><span>Simple, safe website editing</span></div></div>
        <div className="studio-save-state"><Save />{props.draftStatus}</div>
        <div className="studio-topbar__actions">
          <button type="button" onClick={props.onUndo} disabled={!props.canUndo} title="Undo last change"><Undo2 /><span>Undo</span></button>
          <button type="button" onClick={props.onRedo} disabled={!props.canRedo} title="Redo change"><Redo2 /><span>Redo</span></button>
          <a href={import.meta.env.BASE_URL} target="_blank" rel="noreferrer"><ChevronLeft /><span>View site</span></a>
          <button type="button" onClick={props.onLogout}><LogOut /><span>Lock</span></button>
        </div>
      </header>
      <div className="studio-layout">
        <aside className="studio-sidebar">
          <nav aria-label="Editing studio navigation">{nav.map(({ id, label, description, icon: Icon }) => <button type="button" key={id} className={view === id ? "active" : ""} onClick={() => setView(id)}><Icon /><span><strong>{label}</strong><small>{description}</small></span>{id === "publish" && props.validationIssues.length > 0 && <b className="studio-badge">{props.validationIssues.length}</b>}</button>)}</nav>
          <div className="studio-sidebar__backup"><span>Safety tools</span><button type="button" onClick={() => downloadJson(props.bundle, `mea-content-backup-${new Date().toISOString().slice(0, 10)}.json`)}><Download /> Export backup</button><button type="button" onClick={() => importInput.current?.click()}><Upload /> Import backup</button><input ref={importInput} type="file" accept="application/json,.json" hidden onChange={(event) => void importBackup(event.target.files?.[0])} /><button className="studio-danger-link" type="button" onClick={() => { if (window.confirm("Start again from the published website? Your local draft will be removed. Export a backup first if you might need it.")) void props.onReset(); }}><RotateCcw /> Reset draft</button></div>
        </aside>
        <main className="studio-main">
          {notice && <div className="studio-message studio-message--notice"><CheckCircle2 />{notice}</div>}
          {view === "dashboard" && <section className="studio-dashboard">
            <div className="studio-page-heading"><span className="studio-kicker">Hello, {props.session.username}</span><h1>What would you like to improve?</h1><p>Choose one clear job. Every change saves on this computer automatically, and nothing reaches students until you press Publish.</p></div>
            <div className="studio-stat-grid"><div><BookOpen /><strong>{topicCount}</strong><span>topic pages</span></div><div><Boxes /><strong>{sectionCount}</strong><span>lesson sections</span></div><div><ImagePlus /><strong>{props.assets.length}</strong><span>new images waiting</span></div><div className={props.validationIssues.length ? "needs-attention" : "ready"}><CheckCircle2 /><strong>{props.validationIssues.length || "Ready"}</strong><span>{props.validationIssues.length ? "items need attention" : "content checks passed"}</span></div></div>
            <div className="studio-quick-grid"><button type="button" onClick={() => setView("content")}><BookOpen /><span><strong>Edit a lesson</strong><small>Choose a qualification, unit and topic. Add text, images, questions or new sections.</small></span></button><button type="button" onClick={() => setView("materials")}><FolderKanban /><span><strong>Change materials</strong><small>Add or correct a specification, paper, video or revision link.</small></span></button><button type="button" onClick={() => setView("pages")}><FilePlus2 /><span><strong>Create a new page</strong><small>Build an extra page from simple sections and decide whether it appears in the menu.</small></span></button><button type="button" onClick={() => setView("publish")}><CloudUpload /><span><strong>Check and publish</strong><small>See every warning, connect GitHub once, and send the finished version live.</small></span></button></div>
            <div className="studio-how-it-works"><History /><div><h2>You cannot accidentally change the live site</h2><ol><li>Edit and preview here.</li><li>Fix any clearly explained warnings.</li><li>Publish once you are happy.</li><li>GitHub keeps every older version in case it is ever needed.</li></ol></div></div>
          </section>}
          {view === "content" && <ContentEditor bundle={props.bundle} onChange={props.onChange} assets={props.assets} onAssetsChange={props.onAssetsChange} />}
          {view === "materials" && <ResourceEditor bundle={props.bundle} onChange={props.onChange} />}
          {view === "cases" && <CaseStudyEditor bundle={props.bundle} onChange={props.onChange} />}
          {view === "pages" && <PageEditor bundle={props.bundle} onChange={props.onChange} assets={props.assets} onAssetsChange={props.onAssetsChange} />}
          {view === "settings" && <SettingsEditor bundle={props.bundle} onChange={props.onChange} />}
          {view === "publish" && <PublishPanel bundle={props.bundle} issues={props.validationIssues} pendingAssets={props.assets.length} onPublish={props.onPublish} onSaveToken={props.onSaveToken} loadSavedToken={props.loadSavedToken} />}
        </main>
      </div>
    </div>
  );
}
