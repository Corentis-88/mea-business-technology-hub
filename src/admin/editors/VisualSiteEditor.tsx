import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowDown, ArrowUp, BookOpen, BrainCircuit, Copy, GripVertical, ImagePlus, LayoutDashboard, Lightbulb, ListPlus, Monitor, Network, Pencil, Plus, Search, Smartphone, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import LearningVisual from "../../components/LearningVisual";
import type { ContentBundle, EditableTopicSection, HomeLayoutBlock, SiteSettings } from "../../types";
import { createSection, listToLines, linesToList, moveItem, prepareImage, uniqueId, type PendingAsset } from "../studioHelpers";
import "../visual-editor.css";

interface VisualSiteEditorProps {
  bundle: ContentBundle;
  onChange: (next: ContentBundle | ((current: ContentBundle) => ContentBundle)) => void;
  assets: PendingAsset[];
  onAssetsChange: (assets: PendingAsset[]) => void;
}

type PageMode = "homepage" | "topic";
type DeletedItem = { kind: "homepage"; item: HomeLayoutBlock; index: number } | { kind: "topic"; item: EditableTopicSection; index: number };

const blockNames: Record<HomeLayoutBlock["type"], string> = {
  hero: "Hero and search",
  courses: "Qualifications",
  tools: "Revision tools",
  text: "Text section",
  callout: "Callout",
  image: "Image section",
};

function SortableFrame({ id, selected, label, index, total, onSelect, onMove, onDuplicate, onDelete, children }: {
  id: string;
  selected: boolean;
  label: string;
  index: number;
  total: number;
  onSelect: () => void;
  onMove: (from: number, to: number) => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  children: ReactNode;
}) {
  const sortable = useSortable({ id });
  const style = { transform: CSS.Transform.toString(sortable.transform), transition: sortable.transition };
  return <article ref={sortable.setNodeRef} style={style} className={`visual-editor-block${selected ? " selected" : ""}`} onClick={onSelect}>
    <div className="visual-editor-block__controls">
      <button type="button" className="visual-drag-handle" ref={sortable.setActivatorNodeRef} {...sortable.attributes} {...sortable.listeners} onClick={(event) => event.stopPropagation()} aria-label={`Drag ${label}`}><GripVertical /></button>
      <span>{label}</span>
      <button type="button" disabled={index === 0} onClick={(event) => { event.stopPropagation(); onMove(index, index - 1); }} aria-label={`Move ${label} up`}><ArrowUp /></button>
      <button type="button" disabled={index === total - 1} onClick={(event) => { event.stopPropagation(); onMove(index, index + 1); }} aria-label={`Move ${label} down`}><ArrowDown /></button>
      <button type="button" onClick={(event) => { event.stopPropagation(); onSelect(); }} aria-label={`Edit ${label}`}><Pencil /></button>
      {onDuplicate && <button type="button" onClick={(event) => { event.stopPropagation(); onDuplicate(); }} aria-label={`Make a copy of ${label}`} title="Make a copy"><Copy /></button>}
      {onDelete && <button type="button" className="visual-delete-action" onClick={(event) => { event.stopPropagation(); onDelete(); }} aria-label={`Delete ${label}`} title="Delete"><Trash2 /></button>}
    </div>
    <div className="visual-editor-block__content">{children}</div>
  </article>;
}

function Field({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
  return <label className={wide ? "wide" : ""}><span>{label}</span>{children}</label>;
}

function imageSource(src: string, assets: PendingAsset[]) {
  const pending = assets.find((asset) => asset.publicPath === src);
  if (pending) return pending.previewUrl;
  if (/^(data:|blob:|https?:|\/)/.test(src)) return src;
  return `${import.meta.env.BASE_URL}${src}`;
}

export function VisualSiteEditor({ bundle, onChange, assets, onAssetsChange }: VisualSiteEditorProps) {
  const [mode, setMode] = useState<PageMode>("homepage");
  const [selectedBlockId, setSelectedBlockId] = useState(bundle.homepageBlocks[0]?.id ?? "");
  const [courseIndex, setCourseIndex] = useState(0);
  const [unitIndex, setUnitIndex] = useState(0);
  const [topicIndex, setTopicIndex] = useState(0);
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [previewSize, setPreviewSize] = useState<"desktop" | "mobile">("desktop");
  const [deletedItem, setDeletedItem] = useState<DeletedItem>();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 7 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const course = bundle.courses[courseIndex] ?? bundle.courses[0];
  const unit = course?.units[unitIndex] ?? course?.units[0];
  const topic = unit?.topics[topicIndex] ?? unit?.topics[0];
  const selectedBlock = bundle.homepageBlocks.find((block) => block.id === selectedBlockId);
  const selectedSection = topic?.sections.find((section) => section.id === selectedSectionId) ?? topic?.sections[0];

  useEffect(() => {
    if (courseIndex >= bundle.courses.length) setCourseIndex(0);
  }, [bundle.courses.length, courseIndex]);
  useEffect(() => {
    if (unitIndex >= (course?.units.length ?? 0)) setUnitIndex(0);
  }, [course?.units.length, unitIndex]);
  useEffect(() => {
    if (topicIndex >= (unit?.topics.length ?? 0)) setTopicIndex(0);
  }, [topicIndex, unit?.topics.length]);
  useEffect(() => {
    if (topic && !topic.sections.some((section) => section.id === selectedSectionId)) setSelectedSectionId(topic.sections[0]?.id ?? "");
  }, [selectedSectionId, topic]);
  useEffect(() => {
    if (!bundle.homepageBlocks.some((block) => block.id === selectedBlockId)) setSelectedBlockId(bundle.homepageBlocks[0]?.id ?? "");
  }, [bundle.homepageBlocks, selectedBlockId]);

  const updateHomepage = (updater: (blocks: HomeLayoutBlock[]) => HomeLayoutBlock[] | void) => onChange((draft) => {
    const result = updater(draft.homepageBlocks);
    if (result) draft.homepageBlocks = result;
    return draft;
  });
  const updateBlock = (updater: (block: HomeLayoutBlock) => void) => updateHomepage((blocks) => {
    const block = blocks.find((item) => item.id === selectedBlockId);
    if (block) updater(block);
  });
  const updateTopic = (updater: (sections: EditableTopicSection[]) => EditableTopicSection[] | void) => onChange((draft) => {
    const sections = draft.courses[courseIndex]?.units[unitIndex]?.topics[topicIndex]?.sections;
    if (!sections) return draft;
    const result = updater(sections);
    if (result) draft.courses[courseIndex].units[unitIndex].topics[topicIndex].sections = result;
    return draft;
  });

  const homeDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    updateHomepage((blocks) => {
      const from = blocks.findIndex((block) => block.id === active.id);
      const to = blocks.findIndex((block) => block.id === over.id);
      return from < 0 || to < 0 ? blocks : arrayMove(blocks, from, to);
    });
  };
  const sectionDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    updateTopic((sections) => {
      const from = sections.findIndex((section) => section.id === active.id);
      const to = sections.findIndex((section) => section.id === over.id);
      return from < 0 || to < 0 ? sections : arrayMove(sections, from, to);
    });
  };

  const addHomeBlock = (type: "text" | "callout" | "image", afterIndex = bundle.homepageBlocks.length - 1) => {
    const id = uniqueId(`home-${type}`);
    const block: HomeLayoutBlock = type === "text"
      ? { id, type, visible: true, eyebrow: "New section", title: "Add a clear heading", body: ["Write a short, friendly explanation here."] }
      : type === "callout"
        ? { id, type, visible: true, eyebrow: "Need a next step?", title: "Add a helpful callout", body: "Explain what the student should do next.", buttonLabel: "Open resource", buttonHref: "/" }
        : { id, type, visible: true, title: "Add a useful image", body: "Explain what the image helps students understand.", image: { src: "", alt: "", caption: "" } };
    updateHomepage((blocks) => [...blocks.slice(0, afterIndex + 1), block, ...blocks.slice(afterIndex + 1)]);
    setSelectedBlockId(id);
  };

  const uploadBlockImage = async (file?: File) => {
    if (!file || selectedBlock?.type !== "image") return;
    const asset = await prepareImage(file);
    onAssetsChange([...assets, asset]);
    updateBlock((block) => {
      if (block.type === "image") block.image.src = asset.publicPath;
    });
  };

  const addTopicSection = (afterIndex = (topic?.sections.length ?? 0) - 1) => {
    const section = createSection();
    updateTopic((sections) => [...sections.slice(0, afterIndex + 1), section, ...sections.slice(afterIndex + 1)]);
    setSelectedSectionId(section.id);
  };

  const duplicateHomeBlock = (index: number) => {
    const source = bundle.homepageBlocks[index];
    if (!source || source.type === "hero" || source.type === "courses" || source.type === "tools") return;
    const copy = structuredClone(source);
    copy.id = uniqueId(`home-${source.type}`);
    updateHomepage((blocks) => [...blocks.slice(0, index + 1), copy, ...blocks.slice(index + 1)]);
    setSelectedBlockId(copy.id);
  };
  const deleteHomeBlock = (index: number) => {
    const block = bundle.homepageBlocks[index];
    if (!block || !window.confirm(`Delete “${blockNames[block.type]}”? You can undo this straight away.`)) return;
    setDeletedItem({ kind: "homepage", item: structuredClone(block), index });
    updateHomepage((blocks) => blocks.filter((_, itemIndex) => itemIndex !== index));
  };
  const duplicateTopicSection = (index: number) => {
    const source = topic?.sections[index];
    if (!source) return;
    const copy = structuredClone(source);
    copy.id = uniqueId("section");
    copy.heading = `${copy.heading} (copy)`;
    updateTopic((sections) => [...sections.slice(0, index + 1), copy, ...sections.slice(index + 1)]);
    setSelectedSectionId(copy.id);
  };
  const deleteTopicSection = (index: number) => {
    const section = topic?.sections[index];
    if (!section || !window.confirm(`Delete “${section.heading || "Untitled section"}”? You can undo this straight away.`)) return;
    setDeletedItem({ kind: "topic", item: structuredClone(section), index });
    updateTopic((sections) => sections.filter((_, itemIndex) => itemIndex !== index));
  };

  const uploadTopicImage = async (file?: File) => {
    if (!file || !selectedSection) return;
    const asset = await prepareImage(file);
    onAssetsChange([...assets, asset]);
    updateTopic((sections) => {
      const section = sections.find((item) => item.id === selectedSection.id);
      if (section) section.image = { src: asset.publicPath, alt: section.image?.alt ?? "", caption: section.image?.caption ?? "" };
    });
  };

  const homeItems = useMemo(() => bundle.homepageBlocks.map((block) => block.id), [bundle.homepageBlocks]);
  const sectionItems = useMemo(() => topic?.sections.map((section) => section.id) ?? [], [topic]);

  return <section className="visual-site-editor">
    {deletedItem && <div className="visual-undo-message" role="status"><span>Item deleted.</span><button type="button" onClick={() => { if (deletedItem.kind === "homepage") updateHomepage((blocks) => [...blocks.slice(0, deletedItem.index), deletedItem.item, ...blocks.slice(deletedItem.index)]); else updateTopic((sections) => [...sections.slice(0, deletedItem.index), deletedItem.item, ...sections.slice(deletedItem.index)]); setDeletedItem(undefined); }}>Undo delete</button><button type="button" aria-label="Dismiss undo message" onClick={() => setDeletedItem(undefined)}>×</button></div>}
    <header className="visual-editor-heading">
      <div><span>Visual site editor</span><h1>Move sections, then edit what you see</h1><p>Choose a page, select any block in the preview and use the panel on the right. Drag the large handles or use the arrow buttons to change the order.</p></div>
      <div className="visual-editor-modes" role="group" aria-label="Page to edit">
        <button type="button" className={mode === "homepage" ? "active" : ""} onClick={() => setMode("homepage")}><LayoutDashboard />Homepage</button>
        <button type="button" className={mode === "topic" ? "active" : ""} onClick={() => setMode("topic")}><BookOpen />Revision topic</button>
      </div>
    </header>

    {mode === "topic" && <div className="visual-editor-pickers">
      <Field label="Qualification"><select value={courseIndex} onChange={(event) => { setCourseIndex(Number(event.target.value)); setUnitIndex(0); setTopicIndex(0); }}>{bundle.courses.map((item, index) => <option key={item.id} value={index}>{item.shortTitle}</option>)}</select></Field>
      <Field label="Unit"><select value={unitIndex} onChange={(event) => { setUnitIndex(Number(event.target.value)); setTopicIndex(0); }}>{course?.units.map((item, index) => <option key={item.id} value={index}>{item.code} · {item.title}</option>)}</select></Field>
      <Field label="Revision topic"><select value={topicIndex} onChange={(event) => setTopicIndex(Number(event.target.value))}>{unit?.topics.map((item, index) => <option key={item.id} value={index}>{item.code} · {item.title}</option>)}</select></Field>
      <button type="button" onClick={() => addTopicSection()} disabled={!topic}><ListPlus />Add section</button>
    </div>}

    <div className="visual-editor-workspace">
      <div className={`visual-editor-stage preview-${previewSize}`} aria-label={mode === "homepage" ? "Homepage preview" : "Revision topic preview"}>
        <div className="visual-browser-bar"><i></i><i></i><i></i><span>Student preview</span><div className="visual-preview-size" role="group" aria-label="Preview size"><button type="button" className={previewSize === "desktop" ? "active" : ""} onClick={() => setPreviewSize("desktop")}><Monitor />Desktop</button><button type="button" className={previewSize === "mobile" ? "active" : ""} onClick={() => setPreviewSize("mobile")}><Smartphone />Mobile</button></div></div>
        {mode === "homepage" ? <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={homeDragEnd}>
          <SortableContext items={homeItems} strategy={verticalListSortingStrategy}>
            <div className="visual-home-canvas">
              {bundle.homepageBlocks.map((block, index) => <div className="visual-block-with-insert" key={block.id}><SortableFrame id={block.id} selected={selectedBlockId === block.id} label={blockNames[block.type]} index={index} total={bundle.homepageBlocks.length} onSelect={() => setSelectedBlockId(block.id)} onMove={(from, to) => updateHomepage((blocks) => moveItem(blocks, from, to))} onDuplicate={block.type === "text" || block.type === "callout" || block.type === "image" ? () => duplicateHomeBlock(index) : undefined} onDelete={block.type === "text" || block.type === "callout" || block.type === "image" ? () => deleteHomeBlock(index) : undefined}>
                <HomeBlockPreview block={block} bundle={bundle} assets={assets} />
              </SortableFrame><InsertMenu label="Add a homepage section here" onAdd={(type) => addHomeBlock(type, index)} /></div>)}
            </div>
          </SortableContext>
        </DndContext> : !topic ? <div className="visual-editor-empty"><BookOpen /><h2>No revision topic found</h2><p>Add a unit and topic in the course editor first.</p></div> : <div className="visual-topic-canvas" style={{ "--preview-accent": course.accent } as React.CSSProperties}>
          <header className="visual-topic-hero"><span>{unit?.code} · {unit?.title}</span><h1>{topic.title}</h1><p>{topic.summary}</p></header>
          <nav><b>Learn</b><span>Concept map</span><span>Remember</span><span>Practise</span><span>Exam</span></nav>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={sectionDragEnd}>
            <SortableContext items={sectionItems} strategy={verticalListSortingStrategy}>
              <main>{topic.sections.map((section, index) => <div className="visual-block-with-insert" key={section.id}><SortableFrame id={section.id} selected={selectedSection?.id === section.id} label={section.heading || `Section ${index + 1}`} index={index} total={topic.sections.length} onSelect={() => setSelectedSectionId(section.id)} onMove={(from, to) => updateTopic((sections) => moveItem(sections, from, to))} onDuplicate={() => duplicateTopicSection(index)} onDelete={() => deleteTopicSection(index)}>
                <section className="visual-topic-section"><h2>{section.heading || "Untitled section"}</h2>{section.paragraphs.map((paragraph, paragraphIndex) => <p key={`${section.id}-p-${paragraphIndex}`}>{paragraph}</p>)}{section.bullets?.length ? <ul>{section.bullets.map((bullet, bulletIndex) => <li key={`${section.id}-b-${bulletIndex}`}>{bullet}</li>)}</ul> : null}{section.formula && <div className="visual-formula"><span>Formula</span><strong>{section.formula}</strong></div>}{section.example && <div className="visual-example"><Lightbulb /><p>{section.example}</p></div>}{section.image?.src && <figure><img src={imageSource(section.image.src, assets)} alt={section.image.alt} /><figcaption>{section.image.caption}</figcaption></figure>}{section.visual && <LearningVisual spec={section.visual} />}{section.visuals?.map((visual, visualIndex) => <LearningVisual key={`${section.id}-visual-${visualIndex}`} spec={visual} />)}</section>
              </SortableFrame><button type="button" className="visual-section-insert" onClick={() => addTopicSection(index)}><Plus />Add a section here</button></div>)}</main>
            </SortableContext>
          </DndContext>
        </div>}
      </div>

      <aside className="visual-editor-inspector" aria-label="Selected item settings">
        {mode === "homepage" ? <HomepageInspector block={selectedBlock} updateBlock={updateBlock} addBlock={addHomeBlock} assets={assets} uploadImage={uploadBlockImage} settings={bundle.siteSettings} updateSettings={(field, value) => onChange((draft) => { draft.siteSettings[field] = value; return draft; })} removeBlock={() => { const index = bundle.homepageBlocks.findIndex((item) => item.id === selectedBlock?.id); if (index >= 0) deleteHomeBlock(index); }} /> : <TopicInspector section={selectedSection} update={(updater) => updateTopic((sections) => { const section = sections.find((item) => item.id === selectedSection?.id); if (section) updater(section); })} addSection={() => addTopicSection()} assets={assets} uploadImage={uploadTopicImage} />}
      </aside>
    </div>
  </section>;
}

function InsertMenu({ label, onAdd }: { label: string; onAdd: (type: "text" | "callout" | "image") => void }) {
  return <div className="visual-insert-menu"><span>{label}</span><button type="button" onClick={() => onAdd("text")}><Plus />Text</button><button type="button" onClick={() => onAdd("callout")}><Plus />Callout</button><button type="button" onClick={() => onAdd("image")}><Plus />Image</button></div>;
}

function HomeBlockPreview({ block, bundle, assets }: { block: HomeLayoutBlock; bundle: ContentBundle; assets: PendingAsset[] }) {
  if (!block.visible) return <div className="visual-hidden-block"><span>Hidden from students</span><strong>{blockNames[block.type]}</strong></div>;
  if (block.type === "hero") return <section className="visual-home-hero"><span><Sparkles />{bundle.siteSettings.schoolName}</span><h1>{bundle.siteSettings.siteName}</h1><p>{bundle.siteSettings.tagline}</p><div><Search /><span>Search any topic or key word</span><b>Search</b></div></section>;
  if (block.type === "courses") return <section className="visual-home-section"><header><span>Your qualifications</span><h2>Start with the course you're working towards</h2></header><div className="visual-course-grid">{bundle.courses.map((course) => <article key={course.id} style={{ "--card-accent": course.accent } as React.CSSProperties}><BriefCourseIcon id={course.id} /><span>{course.examBoard} · {course.code}</span><h3>{course.shortTitle}</h3><p>{course.description}</p></article>)}</div></section>;
  if (block.type === "tools") return <section className="visual-home-section visual-tools"><header><span>Study tools</span><h2>What would help you most today?</h2></header><div><article><BrainCircuit /><h3>Qualification quizzes</h3><p>Choose a course, topic and difficulty.</p></article><article><Network /><h3>Completed concept maps</h3><p>See how ideas connect.</p></article><article><BookOpen /><h3>Study planner</h3><p>Turn revision into small steps.</p></article></div></section>;
  if (block.type === "text") return <section className="visual-home-section visual-custom-text"><header>{block.eyebrow && <span>{block.eyebrow}</span>}<h2>{block.title}</h2></header>{block.body.map((paragraph, index) => <p key={`${block.id}-${index}`}>{paragraph}</p>)}</section>;
  if (block.type === "callout") return <section className="visual-home-callout">{block.eyebrow && <span>{block.eyebrow}</span>}<h2>{block.title}</h2><p>{block.body}</p>{block.buttonLabel && <b>{block.buttonLabel}</b>}</section>;
  if (!("image" in block)) return null;
  return <figure className="visual-home-image">{block.image.src ? <img src={imageSource(block.image.src, assets)} alt={block.image.alt} /> : <div><ImagePlus /><span>Choose an image in the panel</span></div>}<figcaption><h2>{block.title}</h2>{block.body && <p>{block.body}</p>}<small>{block.image.caption}</small></figcaption></figure>;
}

function BriefCourseIcon({ id }: { id: string }) {
  return id === "computer-science" ? <Monitor /> : id === "creative-imedia" ? <Sparkles /> : id === "enterprise" ? <Lightbulb /> : <BookOpen />;
}

function HomepageInspector({ block, updateBlock, addBlock, assets, uploadImage, settings, updateSettings, removeBlock }: {
  block?: HomeLayoutBlock;
  updateBlock: (updater: (block: HomeLayoutBlock) => void) => void;
  addBlock: (type: "text" | "callout" | "image") => void;
  assets: PendingAsset[];
  uploadImage: (file?: File) => Promise<void>;
  settings: SiteSettings;
  updateSettings: (field: keyof SiteSettings, value: string) => void;
  removeBlock: () => void;
}) {
  return <>
    <header><span>Homepage</span><h2>{block ? blockNames[block.type] : "Choose a block"}</h2><p>Select a block in the preview. Core sections can move or be hidden; custom sections can also be rewritten here.</p></header>
    <div className="visual-inspector-body">
      {block && <label className="visual-toggle"><input type="checkbox" checked={block.visible} onChange={(event) => updateBlock((draft) => { draft.visible = event.target.checked; })} /><span><strong>Show this block</strong><small>Hidden blocks stay in the draft and can be restored.</small></span></label>}
      {block?.type === "hero" && <div className="visual-inspector-fields"><Field label="School name"><input value={settings.schoolName} onChange={(event) => updateSettings("schoolName", event.target.value)} /></Field><Field label="Website heading"><input value={settings.siteName} onChange={(event) => updateSettings("siteName", event.target.value)} /></Field><Field label="Welcome message"><textarea rows={5} value={settings.tagline} onChange={(event) => updateSettings("tagline", event.target.value)} /></Field></div>}
      {(block?.type === "courses" || block?.type === "tools") && <div className="visual-core-note"><strong>This is a protected site section</strong><p>Drag it to a new position or hide it here. Use Revision topics or the other studio tools when you need to change the information inside it.</p></div>}
      {block?.type === "text" && <div className="visual-inspector-fields"><Field label="Small heading"><input value={block.eyebrow ?? ""} onChange={(event) => updateBlock((draft) => { if (draft.type === "text") draft.eyebrow = event.target.value; })} /></Field><Field label="Main heading"><input value={block.title} onChange={(event) => updateBlock((draft) => { if (draft.type === "text") draft.title = event.target.value; })} /></Field><Field label="Paragraphs (one per line)"><textarea rows={8} value={listToLines(block.body)} onChange={(event) => updateBlock((draft) => { if (draft.type === "text") draft.body = linesToList(event.target.value); })} /></Field></div>}
      {block?.type === "callout" && <div className="visual-inspector-fields"><Field label="Small heading"><input value={block.eyebrow ?? ""} onChange={(event) => updateBlock((draft) => { if (draft.type === "callout") draft.eyebrow = event.target.value; })} /></Field><Field label="Main heading"><input value={block.title} onChange={(event) => updateBlock((draft) => { if (draft.type === "callout") draft.title = event.target.value; })} /></Field><Field label="Message"><textarea rows={5} value={block.body} onChange={(event) => updateBlock((draft) => { if (draft.type === "callout") draft.body = event.target.value; })} /></Field><Field label="Button words"><input value={block.buttonLabel ?? ""} onChange={(event) => updateBlock((draft) => { if (draft.type === "callout") draft.buttonLabel = event.target.value; })} /></Field><Field label="Button link"><input value={block.buttonHref ?? ""} onChange={(event) => updateBlock((draft) => { if (draft.type === "callout") draft.buttonHref = event.target.value; })} /></Field></div>}
      {block?.type === "image" && <div className="visual-inspector-fields"><Field label="Section heading"><input value={block.title} onChange={(event) => updateBlock((draft) => { if (draft.type === "image") draft.title = event.target.value; })} /></Field><Field label="Supporting text"><textarea rows={4} value={block.body ?? ""} onChange={(event) => updateBlock((draft) => { if (draft.type === "image") draft.body = event.target.value; })} /></Field><label className="visual-image-upload"><ImagePlus /><strong>{block.image.src ? "Replace image" : "Choose image"}</strong><span>PNG, JPEG or WebP · prepared automatically</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => void uploadImage(event.target.files?.[0])} /></label>{block.image.src && <img className="visual-inspector-image" src={imageSource(block.image.src, assets)} alt="Draft preview" />}<Field label="Alternative text"><textarea rows={3} value={block.image.alt} onChange={(event) => updateBlock((draft) => { if (draft.type === "image") draft.image.alt = event.target.value; })} /></Field><Field label="Caption"><input value={block.image.caption} onChange={(event) => updateBlock((draft) => { if (draft.type === "image") draft.image.caption = event.target.value; })} /></Field></div>}
      {!block && <p className="visual-inspector-empty">Choose a block in the preview to edit it.</p>}
      {block && block.type !== "hero" && block.type !== "courses" && block.type !== "tools" && <button type="button" className="visual-remove-block" onClick={removeBlock}>Remove this block</button>}
      <div className="visual-add-block"><span>Add to homepage</span><button type="button" onClick={() => addBlock("text")}><Plus />Text</button><button type="button" onClick={() => addBlock("callout")}><Plus />Callout</button><button type="button" onClick={() => addBlock("image")}><Plus />Image</button></div>
    </div>
  </>;
}

function TopicInspector({ section, update, addSection, assets, uploadImage }: { section?: EditableTopicSection; update: (updater: (section: EditableTopicSection) => void) => void; addSection: () => void; assets: PendingAsset[]; uploadImage: (file?: File) => Promise<void> }) {
  const paragraphText = section?.paragraphs.join("\n\n") ?? "";
  return <>
    <header><span>Revision topic</span><h2>{section?.heading || "Choose a section"}</h2><p>Select a revision topic section in the preview, then edit the text that students will see.</p></header>
    <div className="visual-inspector-body">
      {section ? <div className="visual-inspector-fields"><Field label="Section heading"><input value={section.heading} onChange={(event) => update((draft) => { draft.heading = event.target.value; })} /></Field><Field label="Explanation paragraphs"><textarea rows={12} value={paragraphText} onChange={(event) => update((draft) => { draft.paragraphs = event.target.value.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean); })} /><small>Leave a blank line between paragraphs.</small></Field><Field label="Bullet points (one per line)"><textarea rows={7} value={listToLines(section.bullets)} onChange={(event) => update((draft) => { const items = linesToList(event.target.value); draft.bullets = items.length ? items : undefined; })} /></Field><label className="visual-image-upload"><ImagePlus /><strong>{section.image?.src ? "Replace this image" : "Add an image"}</strong><span>Choose a PNG, JPEG or WebP file</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => void uploadImage(event.target.files?.[0])} /></label>{section.image?.src && <><img className="visual-inspector-image" src={imageSource(section.image.src, assets)} alt="Draft preview" /><Field label="Describe the image for screen readers"><textarea rows={3} value={section.image.alt} onChange={(event) => update((draft) => { if (draft.image) draft.image.alt = event.target.value; })} /></Field><Field label="Caption shown below the image"><input value={section.image.caption} onChange={(event) => update((draft) => { if (draft.image) draft.image.caption = event.target.value; })} /></Field><button type="button" className="visual-remove-block" onClick={() => update((draft) => { draft.image = undefined; })}>Remove image</button></>}</div> : <p className="visual-inspector-empty">Choose a section in the preview to edit it.</p>}
      <button type="button" className="visual-add-section" onClick={addSection}><ListPlus />Add a new section</button>
    </div>
  </>;
}
