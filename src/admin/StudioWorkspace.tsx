import { BookOpen, Boxes, BriefcaseBusiness, CheckCircle2, ChevronLeft, ChevronRight, CloudUpload, Download, FilePlus2, FolderKanban, History, Home, ImagePlus, LayoutDashboard, LogOut, Redo2, RotateCcw, Save, Settings, Undo2, Upload } from "lucide-react";
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
import { VisualSiteEditor } from "./editors/VisualSiteEditor";
import { downloadJson, type PendingAsset } from "./studioHelpers";

type StudioView = "visual" | "dashboard" | "add" | "content" | "materials" | "cases" | "pages" | "settings" | "publish";

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

const primaryNav: Array<{ id: StudioView; label: string; description: string; icon: typeof Home }> = [
  { id: "dashboard", label: "Start here", description: "Choose a simple editing task", icon: Home },
  { id: "visual", label: "Edit the site", description: "Click, drag and edit the page preview", icon: LayoutDashboard },
  { id: "add", label: "Add something new", description: "Page, topic content, material or link", icon: FilePlus2 },
  { id: "publish", label: "Publish changes", description: "Check your draft and put it live", icon: CloudUpload },
];

const advancedNav: Array<{ id: StudioView; label: string; description: string; icon: typeof Home }> = [
  { id: "content", label: "Revision content", description: "Topics, vocabulary and questions", icon: BookOpen },
  { id: "pages", label: "Extra pages", description: "Create standalone pages", icon: FilePlus2 },
  { id: "materials", label: "Materials and links", description: "Official links and resources", icon: FolderKanban },
  { id: "cases", label: "Business case studies", description: "Extended-writing practice", icon: BriefcaseBusiness },
  { id: "settings", label: "Site name and logo", description: "Change site-wide details", icon: Settings },
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
        <div className="studio-save-state"><Save /><span><strong>Draft saved</strong><small>{props.draftStatus} · not live until you publish</small></span></div>
        <div className="studio-topbar__actions">
          <button type="button" onClick={props.onUndo} disabled={!props.canUndo} title="Undo last change"><Undo2 /><span>Undo</span></button>
          <button type="button" onClick={props.onRedo} disabled={!props.canRedo} title="Redo change"><Redo2 /><span>Redo</span></button>
          <a href={import.meta.env.BASE_URL} target="_blank" rel="noreferrer"><ChevronLeft /><span>View live site</span></a>
          <button type="button" onClick={props.onLogout}><LogOut /><span>Lock</span></button>
        </div>
      </header>
      <div className="studio-layout">
        <aside className="studio-sidebar">
          <nav aria-label="Editing studio navigation">{primaryNav.map(({ id, label, description, icon: Icon }) => <button type="button" key={id} className={view === id ? "active" : ""} onClick={() => setView(id)}><Icon /><span><strong>{label}</strong><small>{description}</small></span>{id === "publish" && props.validationIssues.length > 0 && <b className="studio-badge">{props.validationIssues.length}</b>}</button>)}</nav>
          <details className="studio-advanced" open={advancedNav.some((item) => item.id === view)}>
            <summary><Settings /><span><strong>More content and tools</strong><small>Pages, links, case studies and settings</small></span><ChevronRight className="studio-advanced__chevron" /></summary>
            <nav aria-label="More editing tools">{advancedNav.map(({ id, label, description, icon: Icon }) => <button type="button" key={id} className={view === id ? "active" : ""} onClick={() => setView(id)}><Icon /><span><strong>{label}</strong><small>{description}</small></span></button>)}</nav>
          </details>
          <details className="studio-sidebar__backup"><summary>Backups and reset</summary><button type="button" onClick={() => downloadJson(props.bundle, `mea-content-backup-${new Date().toISOString().slice(0, 10)}.json`)}><Download /> Download a backup</button><button type="button" onClick={() => importInput.current?.click()}><Upload /> Restore a backup</button><input ref={importInput} type="file" accept="application/json,.json" hidden onChange={(event) => void importBackup(event.target.files?.[0])} /><button className="studio-danger-link" type="button" onClick={() => { if (window.confirm("Replace this draft with the current live website? Download a backup first if you may need these changes later.")) void props.onReset(); }}><RotateCcw /> Replace draft with live site</button></details>
        </aside>
        <main className="studio-main">
          {notice && <div className="studio-message studio-message--notice"><CheckCircle2 />{notice}</div>}
          {view === "visual" && <VisualSiteEditor bundle={props.bundle} onChange={props.onChange} assets={props.assets} onAssetsChange={props.onAssetsChange} />}
          {view === "dashboard" && <section className="studio-dashboard">
            <div className="studio-page-heading"><span className="studio-kicker">Hello, {props.session.username}</span><h1>What would you like to do?</h1><p>Choose a task below. Your work is saved as a private draft on this computer. Students will not see it until you choose <strong>Publish changes</strong>.</p></div>
            <div className="studio-stat-grid"><div><BookOpen /><strong>{topicCount}</strong><span>revision topics</span></div><div><Boxes /><strong>{sectionCount}</strong><span>revision topic sections</span></div><div><ImagePlus /><strong>{props.assets.length}</strong><span>new images to publish</span></div><div className={props.validationIssues.length ? "needs-attention" : "ready"}><CheckCircle2 /><strong>{props.validationIssues.length || "Ready"}</strong><span>{props.validationIssues.length ? "items need attention" : "content checks passed"}</span></div></div>
            <div className="studio-quick-grid"><button type="button" onClick={() => setView("visual")}><LayoutDashboard /><span><strong>Edit the site</strong><small>Open a page preview, then click or drag the part you want to change.</small></span><ChevronRight /></button><button type="button" onClick={() => setView("add")}><FilePlus2 /><span><strong>Add something new</strong><small>Choose whether to add a page, revision content, material or link.</small></span><ChevronRight /></button><button type="button" onClick={() => setView("materials")}><Boxes /><span><strong>Materials and links</strong><small>Update specifications, papers, videos and revision links.</small></span><ChevronRight /></button><button type="button" onClick={() => setView("publish")}><CloudUpload /><span><strong>Publish changes</strong><small>Check your draft, then make it visible to students.</small></span><ChevronRight /></button></div>
            <div className="studio-how-it-works"><History /><div><h2>You cannot accidentally change the live site</h2><ol><li>Edit and preview here.</li><li>Fix any clearly explained warnings.</li><li>Publish once you are happy.</li><li>GitHub keeps every older version in case it is ever needed.</li></ol></div></div>
          </section>}
          {view === "add" && <section className="studio-dashboard studio-add-hub"><div className="studio-page-heading"><span className="studio-kicker">Add something new</span><h1>What would you like to add?</h1><p>Choose one option. The Studio will take you straight to the right editor.</p></div><div className="studio-quick-grid"><button type="button" onClick={() => setView("pages")}><FilePlus2 /><span><strong>A new page</strong><small>Start with a visual template, then drag sections into place.</small></span><ChevronRight /></button><button type="button" onClick={() => setView("content")}><BookOpen /><span><strong>Revision content</strong><small>Add or update explanations, images, vocabulary and questions.</small></span><ChevronRight /></button><button type="button" onClick={() => setView("materials")}><FolderKanban /><span><strong>A material or link</strong><small>Add a paper, specification, video or revision website.</small></span><ChevronRight /></button><button type="button" onClick={() => setView("cases")}><BriefcaseBusiness /><span><strong>A Business case study</strong><small>Add or update extended-writing practice for Business GCSE.</small></span><ChevronRight /></button></div></section>}
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
