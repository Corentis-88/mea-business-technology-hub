import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowDown, ArrowUp, Check, ChevronDown, Copy, Eye, FilePlus2, GripVertical, ImagePlus, LayoutTemplate, List, Plus, Trash2, Type, X } from "lucide-react";
import { useState } from "react";
import type { ContentBundle, CustomPage, EditableTopicSection } from "../../types";
import { createCustomPage, createSection, listToLines, linesToList, prepareImage, uniqueId, type PendingAsset } from "../studioHelpers";
import "./page-editor.css";

interface Props { bundle: ContentBundle; onChange: (next: ContentBundle | ((current: ContentBundle) => ContentBundle)) => void; assets: PendingAsset[]; onAssetsChange: (assets: PendingAsset[]) => void; }
type SectionKind = "text" | "list" | "image";
type EditableCustomPage = Omit<CustomPage, "sections"> & { sections: EditableTopicSection[] };

const pageTemplates = [
  { name: "Blank page", description: "Start with one simple text section.", icon: FilePlus2, sections: ["text"] as SectionKind[] },
  { name: "Study guide", description: "Introduction, key points and a visual section.", icon: LayoutTemplate, sections: ["text", "list", "image"] as SectionKind[] },
  { name: "News or update", description: "A short announcement with an image.", icon: ImagePlus, sections: ["text", "image"] as SectionKind[] },
];

function makeSection(kind: SectionKind): EditableTopicSection {
  const section = createSection();
  if (kind === "list") return { ...section, heading: "Key points", paragraphs: ["Add a short introduction to the list."], bullets: ["Add the first key point."] };
  if (kind === "image") return { ...section, heading: "Visual explanation", paragraphs: ["Explain what students should notice in the image."] };
  return section;
}

export function PageEditor({ bundle, onChange, assets, onAssetsChange }: Props) {
  const [pageIndex, setPageIndex] = useState(0);
  const [preview, setPreview] = useState(false);
  const [creating, setCreating] = useState(!bundle.customPages.length);
  const page = bundle.customPages[pageIndex] as EditableCustomPage | undefined;
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 7 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const updatePage = (fn: (page: EditableCustomPage) => void) => onChange((draft) => { const target = draft.customPages[pageIndex] as EditableCustomPage | undefined; if (target) fn(target); return draft; });
  const addPage = (templateIndex: number) => {
    const template = pageTemplates[templateIndex];
    const next = createCustomPage();
    next.sections = template.sections.map(makeSection);
    onChange((draft) => { draft.customPages.push(next); return draft; });
    setPageIndex(bundle.customPages.length); setCreating(false); setPreview(false);
  };
  const addSection = (kind: SectionKind) => updatePage((draft) => { draft.sections.push(makeSection(kind)); });
  const dragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    updatePage((draft) => { const sections = draft.sections as EditableTopicSection[]; const from = sections.findIndex((item) => item.id === active.id); const to = sections.findIndex((item) => item.id === over.id); if (from >= 0 && to >= 0) draft.sections = arrayMove(sections, from, to); });
  };

  return <section className="page-builder"><header className="page-builder__heading"><div><span className="studio-kicker">Extra pages</span><h1>Build a page by moving simple blocks</h1><p>Choose a starting layout, add your content and drag each section into place. Every page automatically matches the website.</p></div>{page && <button className="studio-primary-button page-builder__new" type="button" onClick={() => setCreating(true)}><FilePlus2 /> New page</button>}</header>
    {creating ? <div className="page-template-panel"><div className="page-template-panel__title"><div><h2>What would you like to make?</h2><p>Pick the closest option. You can change everything afterwards.</p></div>{page && <button type="button" onClick={() => setCreating(false)}><X /> Cancel</button>}</div><div className="page-template-grid">{pageTemplates.map((template, index) => { const Icon = template.icon; return <button key={template.name} type="button" onClick={() => addPage(index)}><Icon /><strong>{template.name}</strong><span>{template.description}</span><b><Plus /> Use this layout</b></button>; })}</div></div> : !page ? null : <>
      <div className="page-builder__bar"><label><span>Page you are editing</span><select value={pageIndex} onChange={(event) => { setPageIndex(Number(event.target.value)); setPreview(false); }}>{bundle.customPages.map((item, index) => <option key={item.id} value={index}>{item.title}</option>)}</select></label><div><button type="button" onClick={() => { const copy = structuredClone(page); copy.id = uniqueId("page", copy.title); copy.slug = uniqueId("page", copy.slug).replace("page-", ""); copy.title += " (copy)"; (copy.sections as EditableTopicSection[]).forEach((section) => { section.id = uniqueId("page-section", section.heading); }); onChange((draft) => { draft.customPages.splice(pageIndex + 1, 0, copy); return draft; }); setPageIndex(pageIndex + 1); }}><Copy /> Duplicate page</button><button type="button" className={preview ? "active" : ""} onClick={() => setPreview((value) => !value)}><Eye /> {preview ? "Keep editing" : "Preview"}</button></div></div>
      {!preview ? <><div className="page-builder__details"><label><span>Page title</span><input value={page.title} onChange={(event) => updatePage((draft) => { draft.title = event.target.value; })} placeholder="Give the page a clear name" /></label><label><span>Short introduction</span><textarea rows={2} value={page.summary ?? ""} onChange={(event) => updatePage((draft) => { draft.summary = event.target.value; })} placeholder="Tell students what this page will help them do" /></label><details><summary>Page link and menu settings <ChevronDown /></summary><div><label><span>Page address</span><span className="studio-prefix-input"><b>/page/</b><input value={page.slug} onChange={(event) => updatePage((draft) => { draft.slug = event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"); })} /></span><small>Changing this will change the web link.</small></label><label className="studio-checkbox"><input type="checkbox" checked={page.showInNavigation} onChange={(event) => updatePage((draft) => { draft.showInNavigation = event.target.checked; })} /><span>Show this page in the main menu</span></label></div></details></div>
        <div className="page-builder__section-heading"><div><h2>Page sections</h2><p>Drag the dotted handle to move a section. On a phone, use the arrow buttons.</p></div></div>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={dragEnd}><SortableContext items={page.sections.map((section) => section.id)} strategy={verticalListSortingStrategy}><div className="page-builder__sections">{page.sections.map((section, index) => <PageSectionEditor key={section.id} section={section as EditableTopicSection} index={index} total={page.sections.length} assets={assets} onAssetsChange={onAssetsChange} onMove={(to) => updatePage((draft) => { draft.sections = arrayMove(draft.sections, index, to); })} onChange={(next) => updatePage((draft) => { draft.sections[index] = next; })} onDuplicate={() => updatePage((draft) => { const copy = structuredClone(section) as EditableTopicSection; copy.id = uniqueId("page-section", copy.heading); copy.heading += " (copy)"; draft.sections.splice(index + 1, 0, copy); })} onDelete={() => { if (window.confirm(`Delete the section “${section.heading}”? You can use Undo afterwards.`)) updatePage((draft) => { draft.sections.splice(index, 1); }); }} />)}</div></SortableContext></DndContext>
        <AddSection onAdd={addSection} />
      </> : <PagePreview page={page} assets={assets} />}
      <div className="page-builder__danger"><button type="button" onClick={() => { if (window.confirm(`Delete the page “${page.title}”? You can use Undo afterwards.`)) { onChange((draft) => { draft.customPages.splice(pageIndex, 1); return draft; }); setPageIndex(Math.max(0, pageIndex - 1)); } }}><Trash2 /> Delete this page</button></div>
    </>}
  </section>;
}

function AddSection({ onAdd }: { onAdd: (kind: SectionKind) => void }) {
  return <div className="page-add-section"><h3><Plus /> Add another section</h3><div><button type="button" onClick={() => onAdd("text")}><Type /><span><strong>Text</strong><small>Heading and paragraphs</small></span></button><button type="button" onClick={() => onAdd("list")}><List /><span><strong>Key points</strong><small>Introduction and bullet list</small></span></button><button type="button" onClick={() => onAdd("image")}><ImagePlus /><span><strong>Image and text</strong><small>Visual with an explanation</small></span></button></div></div>;
}

function PageSectionEditor({ section, index, total, assets, onAssetsChange, onChange, onDuplicate, onDelete, onMove }: { section: EditableTopicSection; index: number; total: number; assets: PendingAsset[]; onAssetsChange: (assets: PendingAsset[]) => void; onChange: (next: EditableTopicSection) => void; onDuplicate: () => void; onDelete: () => void; onMove: (to: number) => void }) {
  const [open, setOpen] = useState(index === 0);
  const sortable = useSortable({ id: section.id });
  const style = { transform: CSS.Transform.toString(sortable.transform), transition: sortable.transition };
  const update = (fn: (draft: EditableTopicSection) => void) => { const draft = structuredClone(section); fn(draft); onChange(draft); };
  const asset = assets.find((item) => item.publicPath === section.image?.src);
  const addImage = async (file?: File) => { if (!file) return; try { const prepared = await prepareImage(file); onAssetsChange([...assets, prepared]); update((draft) => { draft.image = { src: prepared.publicPath, alt: "", caption: "" }; }); } catch (error) { window.alert(error instanceof Error ? error.message : "The image could not be added."); } };
  return <article ref={sortable.setNodeRef} style={style} className={`page-section${open ? " open" : ""}`}><header><button className="page-section__drag" type="button" ref={sortable.setActivatorNodeRef} {...sortable.attributes} {...sortable.listeners} aria-label={`Drag ${section.heading}`}><GripVertical /></button><button className="page-section__title" type="button" onClick={() => setOpen((value) => !value)}><span><small>Section {index + 1}</small><strong>{section.heading || "Untitled section"}</strong></span><ChevronDown /></button><div className="page-section__actions"><button type="button" disabled={index === 0} onClick={() => onMove(index - 1)} aria-label="Move section up"><ArrowUp /></button><button type="button" disabled={index === total - 1} onClick={() => onMove(index + 1)} aria-label="Move section down"><ArrowDown /></button><button type="button" onClick={onDuplicate} aria-label="Duplicate section"><Copy /></button><button type="button" onClick={onDelete} aria-label="Delete section"><Trash2 /></button></div></header>{open && <div className="page-section__body"><label><span>Section heading</span><input value={section.heading} onChange={(event) => update((draft) => { draft.heading = event.target.value; })} /></label><div className="page-paragraphs"><div><span>Text</span><button type="button" onClick={() => update((draft) => { draft.paragraphs.push(""); })}><Plus /> Add paragraph</button></div>{section.paragraphs.map((paragraph, paragraphIndex) => <label key={paragraphIndex}><span>Paragraph {paragraphIndex + 1}</span><textarea rows={3} value={paragraph} onChange={(event) => update((draft) => { draft.paragraphs[paragraphIndex] = event.target.value; })} /><button type="button" disabled={section.paragraphs.length === 1} onClick={() => update((draft) => { draft.paragraphs.splice(paragraphIndex, 1); })} aria-label={`Remove paragraph ${paragraphIndex + 1}`}><X /></button></label>)}</div><label><span>Key points <small>Put each point on a new line.</small></span><textarea rows={4} value={listToLines(section.bullets)} onChange={(event) => update((draft) => { draft.bullets = linesToList(event.target.value); })} placeholder={"First key point\nSecond key point"} /></label>{section.image ? <div className="page-image-editor"><img src={asset?.previewUrl ?? `${import.meta.env.BASE_URL}${section.image.src}`} alt="Selected preview" /><div><label><span>Describe the image <b>Required for accessibility</b></span><textarea rows={2} value={section.image.alt} onChange={(event) => update((draft) => { if (draft.image) draft.image.alt = event.target.value; })} /></label><label><span>Caption</span><input value={section.image.caption} onChange={(event) => update((draft) => { if (draft.image) draft.image.caption = event.target.value; })} /></label><button type="button" onClick={() => update((draft) => { delete draft.image; })}><Trash2 /> Remove image</button></div></div> : <label className="page-image-drop"><ImagePlus /><strong>Drop an image here or choose a file</strong><span>PNG, JPEG or WebP</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => void addImage(event.target.files?.[0])} /></label>}<div className="page-section__done"><button type="button" onClick={() => setOpen(false)}><Check /> Done editing this section</button></div></div>}</article>;
}

function PagePreview({ page, assets }: { page: EditableCustomPage; assets: PendingAsset[] }) {
  return <div className="studio-preview page-builder__preview"><div className="studio-preview-toolbar"><span><Eye /> Student preview</span></div><article className="studio-student-page"><span className="eyebrow">MEA Business and Technology Hub</span><h1>{page.title}</h1><p className="studio-preview-summary">{page.summary}</p>{page.sections.map((section, index) => { const asset = assets.find((item) => item.publicPath === section.image?.src); return <section key={section.id ?? index}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}{!!section.bullets?.length && <ul>{section.bullets.map((bullet, bulletIndex) => <li key={bulletIndex}>{bullet}</li>)}</ul>}{section.image && <figure className="topic-illustration"><img src={asset?.previewUrl ?? `${import.meta.env.BASE_URL}${section.image.src}`} alt={section.image.alt} /><figcaption>{section.image.caption}</figcaption></figure>}</section>; })}</article></div>;
}
