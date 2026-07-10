# MEA Business and Technology Hub

A local, testable website helping students easily learn and revise topics at MEA in Business and Technology:

- Pearson Edexcel GCSE Business (1BS0)
- OCR Cambridge National Enterprise and Marketing (J837)
- OCR GCSE Computer Science (J277)
- OCR Cambridge National Creative iMedia (J834, including the R095 characters and comics unit)

## Run locally

From `C:\CodexWorkspace\MEAWebsite`:

```powershell
pnpm install
pnpm dev
```

Open `http://127.0.0.1:4173`. Students need no account or database.

## MEA Content Studio

The no-code editing suite is deliberately absent from the public navigation. Open:

`http://127.0.0.1:4173/manage-mea-7f3k9q`

The root-URL equivalent `http://127.0.0.1:4173/?studio=mea-7f3k9q` is useful on static hosts because it returns a normal HTTP 200 response.

On GitHub Pages the same route is below the repository base URL. On first use, choose a local username and a password of at least 12 characters. The password is never stored: PBKDF2 creates a verifier and a separate non-extractable encryption key. Drafts save automatically in IndexedDB, with import/export backup controls.

Publishing requires a fine-grained GitHub token restricted to `Corentis-88/mea-business-technology-hub` with repository **Contents: Read and write**. The token is AES-GCM encrypted with the local password-derived key. One publish creates the content JSON and any uploaded WebP images as a single Git commit, then the existing GitHub Pages workflow tests, builds and deploys it.

GitHub Pages is static hosting, so the route itself cannot be made server-private. The cryptographic login protects the editing and publishing capability on the configured browser; no username, password, token or draft is included in the deployed repository.

## Verify

```powershell
pnpm test
pnpm build
```

The production output is written to `dist`.

## What is included

- 47 qualification-mapped topic guides with key terms, worked examples, common mistakes, quizzes and exam practice
- 21 accessible visual types, including break-even charts, cash-flow models, CPU cycles, networks, algorithms, brand boards and comic layouts
- universal fuzzy search plus a visibly labelled search inside every qualification
- Learn, Concept map, Remember, Practise and Exam modes on topic pages
- clickable qualification vocabulary indexes that jump directly to the relevant topic explanation
- an Enterprise-only "Say it simpler" mode covering all 16 J837 topics, with shorter explanations, easy examples, clear word banks and section-by-section picture diagrams
- expandable unit and topic concept maps for all 47 topics, with supporting detail, linked vocabulary and text alternatives
- qualification-only quizzes of up to 50 questions and topic quizzes of up to 20
- Low, Medium and High quiz difficulty controls with deterministic, non-repeating question generation
- an MEA Business-only BLT builder for 3-, 6-, 9- and 12-mark answers
- explicit validation that `Because` cannot begin a BLT sentence
- an evidence-checked Pearson Business extended-writing lab covering Explain, Discuss, Analyse, Justify and Evaluate, including four completed Explain answers and three full-length original source-booklet cases with figures and question ladders
- qualification-separated materials with offline official specifications, sample material, public past papers, mark schemes and examiner reports
- responsive navigation, larger-text mode and print-friendly topic guides
- a private-route, first-run Content Studio with drag-and-drop lesson sections, image compression and uploads, previews, undo/redo, automatic drafts, validation, backups and atomic GitHub publishing
- simple editors for course and unit details, topic lessons, Enterprise easy-reading guides, vocabulary, quizzes, exam questions, materials, Pearson Business case studies, general site wording and new standalone pages

## Content and assessment safeguards

BLT is deliberately presented only within Pearson Business. Creative iMedia and Enterprise coursework practice uses fictional or public sample briefs and does not attempt to complete live non-examined assessment work for students.

The research library used to build the prototype is in `research`, including the source catalogue, written qualification guides, the measured Pearson case-study structure and public official documents. The site serves this folder as read-only local content.
