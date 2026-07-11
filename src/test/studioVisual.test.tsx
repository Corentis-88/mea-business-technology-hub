import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { VisualSiteEditor } from "../admin/editors/VisualSiteEditor";
import { PageEditor } from "../admin/editors/PageEditor";
import { StudioWorkspace } from "../admin/StudioWorkspace";
import { createEditableSnapshotFromBaselines } from "../content";

describe("visual studio editor", () => {
  it("opens on a recognisable homepage canvas with real drag controls", () => {
    const bundle = createEditableSnapshotFromBaselines();
    render(<VisualSiteEditor bundle={bundle} onChange={vi.fn()} assets={[]} onAssetsChange={vi.fn()} />);

    expect(screen.getByRole("heading", { name: "Move sections, then edit what you see" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Homepage" })).toHaveClass("active");
    expect(screen.getByRole("button", { name: "Drag Hero and search" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Drag Qualifications" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Drag Revision tools" })).toBeInTheDocument();
    expect(screen.getByText("MEA Business and Technology Hub")).toBeInTheDocument();
    expect(screen.getAllByText("Add a homepage section here")).toHaveLength(bundle.homepageBlocks.length);

    fireEvent.click(screen.getByRole("button", { name: "Mobile" }));
    expect(screen.getByLabelText("Homepage preview")).toHaveClass("preview-mobile");
  });

  it("switches to a draggable Revision Topic page", () => {
    const bundle = createEditableSnapshotFromBaselines();
    render(<VisualSiteEditor bundle={bundle} onChange={vi.fn()} assets={[]} onAssetsChange={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Revision topic" }));
    expect(screen.getByRole("combobox", { name: "Revision topic" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Enterprise and entrepreneurship" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Drag Change creates business opportunities" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Make a copy of Change creates business opportunities" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete Change creates business opportunities" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Add a section here" })).toHaveLength(bundle.courses[0].units[0].topics[0].sections.length);
    expect(screen.getByText("Add an image")).toBeInTheDocument();
  });
});

describe("beginner Studio navigation", () => {
  it("opens with clear tasks and routes new items through a simple chooser", () => {
    const bundle = createEditableSnapshotFromBaselines();
    render(<StudioWorkspace session={{ username: "editor", encryptionKey: {} as CryptoKey }} bundle={bundle} validationIssues={[]} onChange={vi.fn()} assets={[]} onAssetsChange={vi.fn()} canUndo={false} canRedo={false} onUndo={vi.fn()} onRedo={vi.fn()} draftStatus="Saved locally" onImport={vi.fn()} onReset={vi.fn().mockResolvedValue(undefined)} onPublish={vi.fn().mockResolvedValue({ previousCommitSha: "old", commitSha: "new", treeSha: "tree", branch: "main", repository: "Corentis-88/mea-business-technology-hub" })} onSaveToken={vi.fn().mockResolvedValue(undefined)} loadSavedToken={vi.fn().mockResolvedValue(null)} onLogout={vi.fn()} />);

    expect(screen.getByRole("heading", { name: "What would you like to do?" })).toBeInTheDocument();
    expect(screen.getByText(/not live until you publish/i)).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: /Add something new/ })[0]);
    expect(screen.getByRole("heading", { name: "What would you like to add?" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /A new page/ })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Revision content/ }).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /A material or link/ })).toBeInTheDocument();
  });
});

function PageEditorHarness() {
  const [bundle, setBundle] = useState(createEditableSnapshotFromBaselines());
  return <PageEditor bundle={bundle} assets={[]} onAssetsChange={vi.fn()} onChange={(next) => setBundle((current) => typeof next === "function" ? next(structuredClone(current)) : next)} />;
}

describe("visual extra-page builder", () => {
  it("creates a templated page with sortable sections and plain add controls", () => {
    render(<PageEditorHarness />);
    fireEvent.click(screen.getByRole("button", { name: /Study guide/ }));

    expect(screen.getByRole("textbox", { name: "Page title" })).toHaveValue("New page");
    expect(screen.getByRole("button", { name: /Drag New explanation/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Drag Key points/ })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Move section down/ }).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /Image and text/ })).toBeInTheDocument();
    expect(screen.getByText("Page link and menu settings")).toBeInTheDocument();
  });
});
