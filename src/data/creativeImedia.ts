import type { Course, Topic } from "../types";

const topic = (value: Topic): Topic => value;

const integrityReminder =
  "Practise this skill only with fictional briefs or public sample materials. Your live OCR-set assignment must remain your own independent work and must follow your teacher's instructions.";

export const creativeImediaCourse: Course = {
  id: "creative-imedia",
  slug: "creative-imedia",
  title: "OCR Cambridge National Creative iMedia",
  shortTitle: "Creative iMedia",
  qualification: "Level 1/Level 2 Cambridge National",
  examBoard: "OCR",
  code: "J834",
  description:
    "Explore the media industry, design visual identities and graphics, and develop original characters and comics.",
  accent: "#A855F7",
  icon: "palette",
  assessmentSummary:
    "R093 is a 1 hour 30 minute external exam worth 40%. R094 Visual identity and digital graphics is worth 25%. MEA's optional unit R095 Characters and comics is worth 35%.",
  aliases: [
    "iMedia",
    "creative media",
    "OCR iMedia",
    "J834",
    "R093",
    "R094",
    "R095",
    "characters and comics",
    "Photoshop",
  ],
  units: [
    {
      id: "imedia-r093",
      code: "R093",
      title: "Creative iMedia in the media industry",
      description:
        "Knowledge of industry sectors, design influences, pre-production planning and distribution.",
      assessment:
        "External written examination. Part A is 10 marks across the specification; Part B is 60 marks based on one scenario and includes extended responses.",
      weight: "40% · 70 marks · 1 hour 30 minutes",
      topics: [
        topic({
          id: "imedia-r093-1",
          code: "R093 TA1",
          title: "The media industry",
          summary:
            "Recognise traditional and new-media sectors, their products, convergence and the responsibilities of different job roles.",
          keywords: [
            "traditional media",
            "new media",
            "sector",
            "product",
            "convergence",
            "publishing",
            "film",
            "television",
            "radio",
            "games",
            "interactive media",
            "advertising",
            "creative role",
            "technical role",
            "senior role",
            "pre-production",
            "production",
            "post-production",
          ],
          sections: [
            {
              heading: "Sectors, products and convergence",
              paragraphs: [
                "Traditional media includes long-established channels such as print, radio, film and broadcast television. New media uses connected, interactive or on-demand platforms, but many products now cross both categories.",
                "Convergence happens when media forms or functions combine. A news app may use text, photographs, audio, video, notifications and interactive data on one platform.",
              ],
            },
            {
              heading: "Job roles and production phases",
              paragraphs: [
                "Creative roles generate and shape content; technical roles capture, construct or operate the product; senior roles coordinate people, budgets, schedules and quality. A job title earns marks only when its responsibility is accurate.",
              ],
              bullets: [
                "Pre-production: research, planning, scripting, storyboarding and scheduling.",
                "Production: recording, photographing, drawing, animating or programming assets.",
                "Post-production: editing, compositing, testing, exporting and distribution preparation.",
              ],
              visual: {
                kind: "pitch-journey",
                title: "A media product moves through production phases",
                caption: "Different roles contribute at each phase, with approved plans and assets passed forward to the next team.",
                labels: ["Brief", "Pre-production", "Production", "Post-production", "Distribution"],
              },
              example:
                "A video editor selects and combines recorded shots in post-production to create the intended pace and continuity.",
            },
          ],
          keyTerms: [
            { term: "Media sector", definition: "A broad area of the media industry that produces related products." },
            { term: "Convergence", definition: "The combining of media forms, technologies or functions in one product or platform." },
            { term: "Post-production", definition: "Work after content creation, such as editing, testing and final export." },
          ],
          commonMistakes: [
            "Listing a job title without its real responsibility.",
            "Treating every online version of a traditional product as a completely separate sector.",
            "Placing editing automatically in production rather than identifying the specific workflow phase.",
          ],
          examTips: [
            "For a job-role question, use: role → action → contribution to the named product.",
            "Give a product example only after stating the correct sector or responsibility.",
          ],
          quiz: [
            {
              id: "imedia-r093-1-q1",
              prompt: "Which is the best example of media convergence?",
              options: [
                "A printed poster using one photograph",
                "A news app combining articles, video, audio and interactive polls",
                "A camera stored in a cupboard",
                "A radio station changing its logo",
              ],
              answer: 1,
              explanation:
                "The app combines several media forms and interactive functions on one platform.",
            },
            {
              id: "imedia-r093-1-q2",
              prompt: "Which task is most clearly a post-production responsibility?",
              options: ["Writing the first script", "Filming a scene", "Editing recorded dialogue", "Approving the initial budget"],
              answer: 2,
              explanation: "Editing recorded content takes place after production capture.",
            },
          ],
          examQuestions: [
            {
              id: "imedia-r093-1-e1",
              command: "Explain",
              marks: 4,
              prompt:
                "A small museum is creating an interactive exhibition. Explain two responsibilities of a project manager during its development.",
              guidance: [
                "Give two different responsibilities.",
                "Explain how each supports this interactive product.",
                "Avoid vague claims such as 'makes it better'.",
              ],
              model:
                "The project manager monitors milestones so filming, interface design and testing are completed before the exhibition opens. They also coordinate specialists and resources so developers receive approved images and audio when needed.",
            },
          ],
          durationMinutes: 45,
        }),
        topic({
          id: "imedia-r093-2",
          code: "R093 TA2",
          title: "Factors influencing product design",
          summary:
            "Interpret client and audience needs, use research and explain how technical, symbolic and written codes create meaning.",
          keywords: [
            "purpose",
            "style",
            "content",
            "layout",
            "client requirements",
            "brief",
            "explicit",
            "implicit",
            "audience",
            "demographic",
            "primary research",
            "secondary research",
            "qualitative",
            "quantitative",
            "technical code",
            "symbolic code",
            "written code",
            "mise-en-scène",
            "typography",
          ],
          sections: [
            {
              heading: "Purpose, brief and audience",
              paragraphs: [
                "Media products may inform, educate, entertain, promote or influence. A brief contains explicit requirements stated directly and implicit requirements inferred from purpose, audience, genre and context.",
                "Audience characteristics matter only when they change a justified design choice. Avoid stereotypes: use evidence about interests, access needs, habits or platform use.",
              ],
              visual: {
                kind: "research-cycle",
                title: "Brief → audience → evidence → design choice",
                caption: "A strong decision traces directly back to a requirement or research finding.",
                labels: ["Interpret", "Research", "Design", "Check"],
              },
            },
            {
              heading: "Research",
              paragraphs: [
                "Primary research is collected first-hand for the project; secondary research already exists. Quantitative data gives counts or measurements, while qualitative data explains opinions and reasons. Check reliability, relevance, currency, bias and permission before using a source.",
              ],
            },
            {
              heading: "Media codes",
              paragraphs: [
                "Technical codes include camera, lighting, audio, editing and interaction. Symbolic codes include colour, props, costume, setting, pose and composition. Written codes include typography, headlines, captions, slogans, dialogue and narrative.",
                "Do more than name a code: identify the deliberate choice, the meaning it communicates and its effect on the specified audience.",
              ],
              visual: {
                kind: "media-codes",
                title: "How meaning is constructed",
                caption: "Combine technical, symbolic and written codes to guide attention and interpretation.",
                labels: ["Camera/audio", "Colour/mise-en-scène", "Words/type", "Audience effect"],
              },
              example:
                "A low camera angle makes the fictional hero appear powerful, encouraging a young action audience to see her as confident.",
            },
          ],
          keyTerms: [
            { term: "Explicit requirement", definition: "A requirement stated directly in the client brief." },
            { term: "Implicit requirement", definition: "A requirement inferred from the brief, purpose, audience or context." },
            { term: "Mise-en-scène", definition: "The meaning created by everything arranged within a scene, such as setting, costume, props and performance." },
          ],
          commonMistakes: [
            "Repeating the brief instead of explaining what it means for the design.",
            "Naming a media code without explaining meaning or audience effect.",
            "Using stereotypes as if they were audience research.",
            "Calling all internet research primary research.",
          ],
          examTips: [
            "Use choice → meaning → audience effect for media-code answers.",
            "Make context specific: 'easier' or 'more appealing' needs an explanation of what changes and why.",
          ],
          quiz: [
            {
              id: "imedia-r093-2-q1",
              prompt: "Which is qualitative primary research?",
              options: ["A published census table", "An interview conducted with six target users", "Website visitor totals", "A competitor's price list"],
              answer: 1,
              explanation: "The project team collects first-hand explanations and opinions through the interview.",
            },
            {
              id: "imedia-r093-2-q2",
              prompt: "Using dark shadows to make a scene threatening is mainly which type of media code?",
              options: ["Technical", "Written", "Financial", "Regulatory"],
              answer: 0,
              explanation: "Lighting is a technical code used to create mood and meaning.",
            },
          ],
          examQuestions: [
            {
              id: "imedia-r093-2-e1",
              command: "Explain",
              marks: 6,
              prompt:
                "A charity is producing a one-minute social video encouraging teenagers to recycle electronic devices. Explain how three media-code choices could communicate the message effectively.",
              guidance: [
                "Choose three specific technical, symbolic or written codes.",
                "Explain the message each communicates.",
                "Apply every point to teenagers and electronic recycling.",
              ],
              model:
                "A close-up of damaged phones can make the waste feel immediate. Muted colour on landfill shots can suggest harm, contrasting with brighter colours when devices are reused. A short on-screen call to action with a local collection link tells mobile viewers exactly what to do next.",
            },
          ],
          durationMinutes: 60,
        }),
        topic({
          id: "imedia-r093-3",
          code: "R093 TA3",
          title: "Pre-production planning",
          summary:
            "Use work plans and production documents, improve their fitness for users, and apply legal, regulatory and safety requirements.",
          keywords: [
            "work plan",
            "milestone",
            "deadline",
            "contingency",
            "dependency",
            "mind map",
            "mood board",
            "asset log",
            "flowchart",
            "script",
            "storyboard",
            "visualisation diagram",
            "wireframe",
            "copyright",
            "Creative Commons",
            "fair dealing",
            "privacy",
            "defamation",
            "ASA",
            "Ofcom",
            "BBFC",
            "PEGI",
            "risk assessment",
            "location recce",
          ],
          sections: [
            {
              heading: "Work plans and idea generation",
              paragraphs: [
                "A useful work plan identifies activities, durations, milestones, deadlines, resources, responsibilities, dependencies and contingencies across production phases. A mind map develops linked ideas; a mood board communicates visual and stylistic inspiration.",
              ],
              visual: {
                kind: "pre-production",
                title: "Planning documents have different jobs",
                caption: "Choose the document whose conventions help the intended production user.",
                labels: ["Ideas", "Schedule", "Content", "Layout/navigation", "Assets"],
              },
            },
            {
              heading: "Product-design documents",
              paragraphs: [
                "Asset logs record source, ownership, permission and intended use. Flowcharts show pathways or processes. Scripts organise dialogue, action and production directions. Storyboards visualise moving-image shots. Visualisation diagrams plan one page or graphic; wireframes plan screen layout and navigation.",
                "To improve a document, make a visible, practical change and explain how it helps a named production user.",
              ],
              example:
                "Adding shot duration and camera movement to a storyboard helps the camera operator and editor plan recording and pacing.",
            },
            {
              heading: "Legal, regulatory and safety",
              paragraphs: [
                "Creators must consider copyright, intellectual property, Creative Commons licence conditions, privacy, permission, data protection and defamation. ASA regulates advertising, Ofcom broadcast and communications, BBFC film classification and PEGI game classification.",
                "A risk assessment identifies hazards, risk and controls. A location recce records whether a place is suitable, accessible, safe and practical before production.",
              ],
              visual: {
                kind: "pitch-journey",
                title: "Compliance must be planned before production",
                caption: "Check rights, people, data, regulation and physical safety early enough to change the plan.",
                labels: ["Rights", "Consent", "Audience data", "Regulator", "Safety controls", "Approval"],
              },
            },
          ],
          keyTerms: [
            { term: "Milestone", definition: "A significant checkpoint showing that a stage or deliverable has been completed." },
            { term: "Contingency", definition: "A planned response if an identified problem disrupts production." },
            { term: "Location recce", definition: "A visit or investigation that records a location's practical, creative and safety suitability." },
            { term: "Wireframe", definition: "A plan of screen layout, content placement and navigation." },
          ],
          commonMistakes: [
            "Confusing a visualisation diagram with a storyboard or wireframe.",
            "Stating that copyright means an online asset is free to use.",
            "Suggesting an improvement without showing how it helps the document's user.",
            "Describing a location recce only as taking photographs.",
          ],
          examTips: [
            "Learn the conventions, purpose and likely user of every pre-production document.",
            "For document improvements, identify location → make change → explain user benefit.",
          ],
          quiz: [
            {
              id: "imedia-r093-3-q1",
              prompt: "Which document best plans the placement of buttons and content on an app screen?",
              options: ["Storyboard", "Wireframe", "Script", "Asset log"],
              answer: 1,
              explanation: "A wireframe plans screen layout and navigation.",
            },
            {
              id: "imedia-r093-3-q2",
              prompt: "Which regulator classifies video games by age suitability?",
              options: ["ASA", "Ofcom", "BBFC", "PEGI"],
              answer: 3,
              explanation: "PEGI provides age classifications and content descriptors for games.",
            },
          ],
          examQuestions: [
            {
              id: "imedia-r093-3-e1",
              command: "Discuss",
              marks: 9,
              prompt:
                "Discuss the suitability of a storyboard for planning a 30-second online advert for a new sports club.",
              guidance: [
                "Apply the storyboard's conventions to the advert.",
                "Use relevant prompt bullets in the question paper if provided.",
                "Discuss suitability rather than giving a generic definition.",
                "An explicit strengths-and-weaknesses list is not required, but the judgement must be reasoned.",
              ],
              model:
                "A strong answer would assess how shot sketches, dialogue/audio notes, timings, transitions and camera directions help the director, camera operator and editor create a short advert. It would identify missing detail that could prevent consistent production and reach a contextual judgement about whether the storyboard is ready to use.",
            },
          ],
          durationMinutes: 75,
        }),
        topic({
          id: "imedia-r093-4",
          code: "R093 TA4",
          title: "Distribution considerations",
          summary:
            "Select suitable online or physical platforms, media properties, file formats and compression for a defined purpose and audience.",
          keywords: [
            "distribution",
            "platform",
            "physical media",
            "online distribution",
            "resolution",
            "dimensions",
            "colour depth",
            "sample rate",
            "bit rate",
            "frame rate",
            "raster",
            "vector",
            "native file",
            "export",
            "lossy",
            "lossless",
            "compression",
          ],
          sections: [
            {
              heading: "Platforms and audience",
              paragraphs: [
                "Distribution choices depend on the product, audience access, reach, cost, interaction and technical limits. Online delivery can update and reach widely but depends on devices and connectivity; physical media may provide ownership or offline access but costs more to manufacture and distribute.",
              ],
              visual: {
                kind: "pitch-journey",
                title: "Choose distribution from audience evidence",
                caption: "Move from product and audience access to a platform, technical properties and a tested delivery copy.",
                labels: ["Product", "Audience access", "Platform", "Properties", "Export", "Test"],
              },
            },
            {
              heading: "Properties and formats",
              paragraphs: [
                "Image dimensions, resolution and colour properties affect quality and size. Audio uses properties such as sample rate and bit rate; video adds dimensions, frame rate and codecs. Native project formats preserve editable structure, while distribution formats prioritise access, playback and manageable size.",
              ],
            },
            {
              heading: "Raster, vector and compression",
              paragraphs: [
                "Raster images are pixel-based and suit photographs; vector graphics use shapes and paths and scale without pixelation. Lossless compression preserves all information, while lossy compression removes selected information for a smaller file.",
              ],
              visual: {
                kind: "compression",
                title: "Lossless and lossy compression make different trade-offs",
                caption: "Lossless compression can reconstruct the original data; lossy compression removes detail to make a smaller delivery file.",
                labels: ["Original file", "Lossless copy", "Lossy copy"],
              },
              example:
                "Keep a layered native project for editing, export a suitable compressed copy for the chosen platform, and retain an accessible high-quality master when required.",
            },
          ],
          keyTerms: [
            { term: "Native format", definition: "A software's editable project format, often preserving layers or timelines." },
            { term: "Raster graphic", definition: "An image built from pixels." },
            { term: "Vector graphic", definition: "A graphic built from mathematical paths and shapes that can scale cleanly." },
            { term: "Compression", definition: "Reducing the amount of data needed to store or transmit a media file." },
          ],
          commonMistakes: [
            "Recommending a format without connecting it to the platform or audience.",
            "Assuming vector graphics are made from pixels.",
            "Using the exported distribution copy as the only editable master.",
            "Saying higher quality is always the best choice regardless of loading or storage limits.",
          ],
          examTips: [
            "Use property → technical effect → suitability for this platform.",
            "Distinguish the file used to edit from the file supplied to the audience.",
          ],
          quiz: [
            {
              id: "imedia-r093-4-q1",
              prompt: "Why are vector graphics often suitable for a logo?",
              options: ["They always contain photographs", "They scale without pixelation", "They cannot use colour", "They require no software"],
              answer: 1,
              explanation: "Vector paths can be recalculated cleanly at different sizes.",
            },
            {
              id: "imedia-r093-4-q2",
              prompt: "What is the main advantage of keeping a native project file?",
              options: ["It is always the smallest file", "It preserves editable features such as layers", "It plays on every device", "It removes copyright"],
              answer: 1,
              explanation: "Native formats retain software-specific structure needed for later editing.",
            },
          ],
          examQuestions: [
            {
              id: "imedia-r093-4-e1",
              command: "Explain",
              marks: 6,
              prompt:
                "Explain why a designer might keep a lossless master but distribute a compressed copy of an online animated advert.",
              guidance: ["Explain the purpose of the master.", "Explain the online delivery constraint.", "Connect compression to both size and quality."],
              model:
                "The lossless master preserves image information for future editing and alternative exports. A compressed copy transfers more quickly and uses less mobile data, so viewers are less likely to leave before it loads. The designer must select settings that keep text and movement clear enough for the advert's purpose.",
            },
          ],
          durationMinutes: 50,
        }),
      ],
    },
    {
      id: "imedia-r094",
      code: "R094",
      title: "Visual identity and digital graphics",
      description:
        "Develop a coherent visual identity, plan a digital graphic and use image-editing techniques to create and export it.",
      assessment:
        "Mandatory OCR-set NEA, centre assessed and OCR moderated. Current public sample structure: two tasks, normally completed in 10–12 GLH.",
      weight: "25% · 50 marks",
      topics: [
        topic({
          id: "imedia-r094-1",
          code: "R094 TA1",
          title: "Develop a visual identity",
          summary: "Create a recognisable combination of name, logo, colour, typography, imagery and style for a client and audience.",
          keywords: ["visual identity", "brand", "logo", "colour palette", "typography", "imagery", "recognition", "differentiation", "consistency", "values", "client", "audience"],
          sections: [
            {
              heading: "Identity with a purpose",
              paragraphs: ["A visual identity helps an organisation become recognisable, distinct and consistent while expressing its values to an audience. Components should work as a system rather than as unrelated attractive choices."],
              visual: { kind: "brand-board", title: "Visual identity system", caption: "Logo, colour, typography, imagery and tone should communicate one recognisable personality.", labels: ["Logo", "Colour palette", "Typography", "Imagery", "Tone of voice"] },
            },
            {
              heading: "Research and justification",
              paragraphs: ["Interpret the fictional client's aims and audience, research relevant conventions and competitors, then justify choices using their intended effect. Record sources and permission for any research images."],
              visual: { kind: "research-cycle", title: "Evidence should drive identity choices", caption: "Move from the client and audience to research, a design decision and a check against the original purpose.", labels: ["Client aim", "Audience", "Research", "Design choice", "Justification", "Check"] },
              example: "Practice brief: create a visual identity for 'Northlight', a fictional youth astronomy club. This is skills practice, not a live assignment.",
            },
            {
              heading: "Assessment integrity",
              paragraphs: [integrityReminder],
            },
          ],
          keyTerms: [
            { term: "Visual identity", definition: "A consistent visual system that makes an organisation or product recognisable and communicates its character." },
            { term: "Colour palette", definition: "A planned set of colours used consistently across an identity." },
            { term: "Typography", definition: "The selection and arrangement of type to communicate clearly and create a style." },
          ],
          commonMistakes: ["Choosing colours only because they are personal favourites.", "Designing components independently so they do not feel coherent.", "Restating a fictional brief instead of interpreting its needs."],
          examTips: ["Practise explaining every design choice as choice → meaning → client/audience fit.", "Keep source and permission records from the beginning."],
          quiz: [
            { id: "imedia-r094-1-q1", prompt: "Which is the strongest justification for a visual-identity colour?", options: ["Blue looks nice", "Blue was first in the menu", "A dark blue palette suggests trust and gives readable contrast for the fictional science club", "Everyone likes blue"], answer: 2, explanation: "It links a specific choice to meaning, readability, client and context." },
            { id: "imedia-r094-1-q2", prompt: "What most helps recognition across several products?", options: ["Changing the logo every time", "Consistent use of the identity system", "Using every font available", "Removing the organisation name"], answer: 1, explanation: "Repeated coherent identity elements help an audience recognise the organisation." },
          ],
          examQuestions: [
            { id: "imedia-r094-1-e1", command: "Practise", marks: 4, prompt: "For the fictional Northlight youth astronomy club, justify one typography choice and one colour choice.", guidance: ["Use a fictional practice brief only.", "Explain the intended meaning and practical readability.", "Connect each choice to the audience or purpose."], model: "A clean geometric sans-serif could suggest modern science while staying clear at small social-media sizes. Deep navy could suggest the night sky, with bright cyan accents providing contrast and an energetic feel for younger members." },
          ],
          durationMinutes: 55,
        }),
        topic({
          id: "imedia-r094-2",
          code: "R094 TA2",
          title: "Plan digital graphics",
          summary: "Apply composition and technical properties, plan asset use and choose suitable raster or vector resources.",
          keywords: ["composition", "hierarchy", "alignment", "balance", "contrast", "proximity", "white space", "consistency", "raster", "vector", "asset", "permission", "dimensions", "resolution", "colour mode", "file format", "visualisation diagram"],
          sections: [
            {
              heading: "Layout and hierarchy",
              paragraphs: ["Composition controls how elements work together. Hierarchy directs attention; alignment creates order; balance controls visual weight; contrast separates priorities; proximity groups related items; white space prevents crowding; consistency supports recognition."],
              visual: { kind: "pre-production", title: "Planning toolkit for a digital graphic", caption: "Use a visualisation, asset record and work plan to turn the purpose into a buildable layout.", labels: ["Purpose", "Visualisation", "Asset log", "Layout grid", "Work plan"] },
            },
            {
              heading: "Assets and technical planning",
              paragraphs: ["Choose raster or vector assets for their intended role. Record ownership, source, licence and planned contribution. Set dimensions, resolution, colour mode and format for the final use, and create a clear visualisation diagram."],
              example: "Practice by planning a square social graphic for the fictional Northlight club, including an original logo, supplied telescope photograph and event details.",
            },
            {
              heading: "Assessment integrity",
              paragraphs: [integrityReminder],
            },
          ],
          keyTerms: [
            { term: "Visual hierarchy", definition: "The order in which design elements attract attention and are understood." },
            { term: "White space", definition: "Intentional empty space that separates content and improves clarity." },
            { term: "Asset log", definition: "A record of assets, source or ownership, permission and intended use." },
          ],
          commonMistakes: ["Listing an asset source without explaining its contribution.", "Using a low-resolution raster image for a large output.", "Planning attractive content but omitting dimensions or export requirements."],
          examTips: ["Annotate what an element does, not only where it appears.", "Match every technical property to the intended distribution."],
          quiz: [
            { id: "imedia-r094-2-q1", prompt: "Which principle groups a caption with the image it describes?", options: ["Proximity", "Randomness", "Compression", "Frame rate"], answer: 0, explanation: "Placing related elements close together communicates that they belong together." },
            { id: "imedia-r094-2-q2", prompt: "Why record the licence of an asset?", options: ["To increase its resolution", "To show whether and how it may legally be used", "To make it vector", "To select a font automatically"], answer: 1, explanation: "Licence terms establish permitted use and any attribution requirements." },
          ],
          durationMinutes: 55,
        }),
        topic({
          id: "imedia-r094-3",
          code: "R094 TA3",
          title: "Create and export digital graphics",
          summary: "Use purposeful image-editing techniques, preserve quality and provide evidence of processes that the final graphic cannot show.",
          keywords: ["selection", "transform", "crop", "mask", "layer", "opacity", "blend", "colour adjustment", "filter", "retouch", "typography", "native file", "export", "Photoshop", "technical evidence"],
          sections: [
            {
              heading: "Purposeful production",
              paragraphs: ["Create or prepare assets, organise layers, use selections and masks, transform and crop carefully, adjust colour, retouch where needed and apply typography consistently. Effects earn their place by supporting the design, not by showing every available tool."],
              visual: { kind: "plan-create-review", title: "Plan → build → check → export", caption: "Keep editable structure while building, then verify output properties after export.", labels: ["Assets", "Layers", "Adjustments", "Proof", "Native", "Export"] },
            },
            {
              heading: "Evidence and export",
              paragraphs: ["A final image may not prove masking, layer organisation or asset preparation. Capture concise evidence of significant technical processes. Keep the editable native file and export a distribution copy with the required format, dimensions, resolution and colour properties."],
              bullets: ["MEA currently teaches Photoshop; learn the concept as well as the menu route.", "Check the exported file independently rather than assuming the export worked."],
              visual: { kind: "compression", title: "Keep a master, then make the right delivery copy", caption: "The editable master preserves production evidence; exported copies trade file size against quality for their chosen platform.", labels: ["Editable master", "Lossless export", "Lossy delivery"] },
            },
            {
              heading: "Assessment integrity",
              paragraphs: [integrityReminder],
            },
          ],
          keyTerms: [
            { term: "Mask", definition: "A non-destructive way to reveal or hide parts of a layer." },
            { term: "Layer", definition: "An independently editable level in a graphics project." },
            { term: "Export", definition: "Producing a copy in a format and with properties suitable for distribution." },
          ],
          commonMistakes: ["Flattening or overwriting the only editable file.", "Using effects without a design purpose.", "Showing only the final image when process evidence is required.", "Exporting with incorrect dimensions or inaccessible format."],
          examTips: ["Practise non-destructive editing on fictional assets.", "Use a final checklist for dimensions, format, quality, content and readability."],
          quiz: [
            { id: "imedia-r094-3-q1", prompt: "Why is a mask usually preferable to permanently erasing part of a layer?", options: ["It makes every file smaller", "Hidden areas can be restored and refined", "It converts raster to vector", "It removes the need for permission"], answer: 1, explanation: "Masking is non-destructive, so the original pixels remain available." },
            { id: "imedia-r094-3-q2", prompt: "What should be kept alongside a final exported graphic?", options: ["Only a screenshot", "An editable native project", "No source information", "A flattened file renamed as native"], answer: 1, explanation: "The native project preserves layers and editable structure." },
          ],
          examQuestions: [
            { id: "imedia-r094-3-e1", command: "Practise", marks: 4, prompt: "Using fictional assets, describe two pieces of technical-process evidence that would demonstrate advanced editing more clearly than the finished graphic alone.", guidance: ["Use fictional/public practice work only.", "Name the technique and the evidence view.", "Explain what the evidence proves."], model: "A layers-panel capture could show named groups, masks and separate text, proving non-destructive construction. A before-and-after view with selection edges could show how a photographed object was isolated and colour-corrected before compositing." },
          ],
          durationMinutes: 65,
        }),
      ],
    },
    {
      id: "imedia-r095",
      code: "R095",
      title: "Characters and comics",
      description:
        "MEA's chosen optional unit: plan an original character and comic, create and export them, then test and review the outcomes.",
      assessment:
        "OCR-set NEA, centre assessed and OCR moderated. Current public sample structure: three tasks, normally completed in 12–15 GLH.",
      weight: "35% · 70 marks",
      topics: [
        topic({
          id: "imedia-r095-1",
          code: "R095 Plan",
          title: "Plan characters and comics",
          summary: "Develop an original character, comic conventions, narrative flow and production-ready plans for a fictional brief.",
          keywords: ["original character", "hero", "villain", "supporting character", "trope", "personality", "backstory", "expression", "pose", "body language", "panel", "gutter", "splash page", "spread", "caption", "speech bubble", "thought bubble", "onomatopoeia", "story arc", "script", "storyboard", "character profile"],
          sections: [
            {
              heading: "Original characters",
              paragraphs: ["Plan physical and non-physical traits, role, personality, motivation, backstory, expressions, pose and body language. Genre tropes can guide audience expectations, but an original combination and visual treatment should avoid copying an existing character."],
              visual: { kind: "comic-layout", title: "Character design communicates", caption: "Silhouette, expression, pose, costume and colour should reveal role and personality before dialogue is read.", labels: ["Silhouette", "Face", "Pose", "Costume", "Palette"] },
            },
            {
              heading: "Comic language and flow",
              paragraphs: ["Panels, borders and gutters control sequence and time. Panel size and splash pages change emphasis. Speech and thought bubbles, captions, typography and onomatopoeia communicate voice, narration and sound. Foreground, background, focal point and shot type guide attention."],
              visual: { kind: "comic-layout", title: "Panel rhythm", caption: "Vary panel size and composition deliberately while keeping the reading order unmistakable.", labels: ["Establish", "Build", "Impact", "Reaction", "Transition"] },
            },
            {
              heading: "Production-ready planning",
              paragraphs: ["Interpret the fictional brief and audience, create a detailed character profile and design development, outline a story arc, write a usable script and storyboard panels with shot, text and action detail. Plan software and assets, including ownership and each asset's contribution."],
              visual: { kind: "pre-production", title: "A comic needs production-ready documents", caption: "The character profile, script, storyboard, asset log and work plan answer different questions for the person building the comic.", labels: ["Comic purpose", "Character profile", "Script", "Storyboard", "Asset / work plan"] },
              example: "Fictional practice brief: plan a four-page comic in which an original young inventor solves a neighbourhood energy problem. Do not reuse this as live NEA work.",
            },
            {
              heading: "Assessment integrity",
              paragraphs: [integrityReminder],
            },
          ],
          keyTerms: [
            { term: "Gutter", definition: "The space between comic panels, where the reader infers a transition in time or action." },
            { term: "Splash page", definition: "A full-page or very large image used for strong emphasis." },
            { term: "Onomatopoeia", definition: "A word whose sound suggests the action, such as 'crash' or 'buzz'." },
            { term: "Story arc", definition: "The progression through setup, development, climax and resolution." },
          ],
          commonMistakes: ["Using a premade character and making only small edits.", "Producing shallow character planning with appearance but no personality or motivation.", "Listing asset sources without explaining contribution.", "Creating a sequence that reads like a narrated storyboard rather than a comic."],
          examTips: ["Practise character turnarounds, expression sheets and annotated design iterations using fictional briefs.", "Test reading order with someone who has not seen the plan before."],
          quiz: [
            { id: "imedia-r095-1-q1", prompt: "What is the main purpose of a comic gutter?", options: ["Store source URLs", "Separate panels and imply a transition", "Replace every caption", "Show the client logo"], answer: 1, explanation: "The gutter separates moments and asks the reader to infer what happens between them." },
            { id: "imedia-r095-1-q2", prompt: "Which is strongest evidence of original character development?", options: ["A downloaded character recoloured once", "One unlabelled sketch", "Annotated iterations showing silhouette, expressions, pose and justified changes", "A list of existing superheroes"], answer: 2, explanation: "Development shows independent decisions, refinement and communication of character traits." },
          ],
          examQuestions: [
            { id: "imedia-r095-1-e1", command: "Practise", marks: 6, prompt: "For the fictional inventor comic, explain how three planned comic conventions could control pace and audience attention.", guidance: ["Use fictional practice only.", "Name a precise convention each time.", "Explain the visual or narrative effect and audience response."], model: "Small repeated panels could slow the invention sequence into clear steps. A large borderless panel could emphasise the moment the device starts. A close-up reaction panel after the climax could pause the action and show the character's relief without extra narration." },
          ],
          durationMinutes: 70,
        }),
        topic({
          id: "imedia-r095-2",
          code: "R095 Create",
          title: "Create characters and comics",
          summary: "Use purposeful digital techniques to produce an original character, effective comic pages and correct editable and distribution files.",
          keywords: ["character creation", "digital drawing", "asset", "background", "panel", "lettering", "speech bubble", "story flow", "editable component", "native file", "print export", "digital export", "resolution", "dimensions", "technical evidence"],
          sections: [
            {
              heading: "Build original components",
              paragraphs: ["Create the original character and supporting components with suitable tools. Prepare backgrounds, panel content, bubbles, captions and lettering as editable assets. Use a purposeful range of techniques rather than effects for their own sake."],
              visual: { kind: "plan-create-review", title: "Character → components → panels → pages", caption: "Build reusable editable elements, then combine them into a controlled reading sequence.", labels: ["Original character", "Assets", "Panel art", "Lettering", "Page flow"] },
            },
            {
              heading: "Translate plans into a comic",
              paragraphs: ["Follow the script and storyboard while improving choices when production reveals a better solution. Maintain clear reading order, varied purposeful panels, consistent character appearance, readable text and enough visual storytelling that narration does not carry everything."],
              visual: { kind: "comic-layout", title: "A comic is more than a storyboard", caption: "Use panel rhythm, expressive art, bubbles, captions and sound words to create a finished reader experience.", labels: ["Sequence", "Pace", "Expression", "Dialogue", "Impact"] },
            },
            {
              heading: "Save, prove and export",
              paragraphs: ["Keep editable native files and components. Record concise technical-process evidence. Export the character and comic in the required print or digital form and check page order, dimensions, resolution, colour, format and accessibility."],
            },
            {
              heading: "Assessment integrity",
              paragraphs: [integrityReminder],
            },
          ],
          keyTerms: [
            { term: "Story flow", definition: "How clearly and effectively the reader moves through actions, panels and pages." },
            { term: "Technical evidence", definition: "Evidence showing processes or skills that cannot be verified from the final output alone." },
            { term: "Editable component", definition: "A separately modifiable character, background, text or panel element retained in the project." },
          ],
          commonMistakes: ["Showing only final pages with no evidence of technical process.", "Relying on narration instead of visual comic conventions.", "Using many effects that weaken consistency or readability.", "Failing to export an accessible product with the requested properties."],
          examTips: ["Practise consistent character proportions and expressions before assembling pages.", "Zoom out to check page flow and zoom in to check lettering and image quality."],
          quiz: [
            { id: "imedia-r095-2-q1", prompt: "Why keep a character as an editable component?", options: ["To avoid creating a final export", "To support consistent reuse and controlled changes", "To remove the need for originality", "To make every panel identical"], answer: 1, explanation: "Editable components can be reused and adjusted while maintaining visual consistency." },
            { id: "imedia-r095-2-q2", prompt: "Which best distinguishes a finished comic from a storyboard?", options: ["A finished comic uses reader-ready art, lettering and deliberate panel flow", "A comic never uses panels", "A storyboard requires more final colour", "A comic contains no planning"], answer: 0, explanation: "The finished comic is designed as the audience's complete reading experience." },
          ],
          examQuestions: [
            { id: "imedia-r095-2-e1", command: "Practise", marks: 4, prompt: "Using a fictional two-panel scene, describe two technical choices that would keep an original character consistent while changing their expression and pose.", guidance: ["Practise outside a live assignment.", "Name the production method.", "Explain consistency and intended change separately."], model: "Reusable construction guides can preserve head and body proportions while separate facial-feature layers change the expression. A fixed colour palette and line-weight guide can keep the design recognisable when the pose changes between panels." },
          ],
          durationMinutes: 75,
        }),
        topic({
          id: "imedia-r095-3",
          code: "R095 Review",
          title: "Test, review and develop characters and comics",
          summary: "Check technical properties and conventions, judge fitness for purpose and distinguish improvements from future developments.",
          keywords: ["test", "checklist", "technical properties", "conventions", "client", "purpose", "audience", "aesthetics", "readability", "engagement", "story flow", "constraint", "improvement", "further development", "sequel", "serialisation", "spin-off"],
          sections: [
            {
              heading: "Test systematically",
              paragraphs: ["A useful checklist covers file properties, page order, readability, visual quality and required character/comic conventions. Record an expected result, actual finding and action rather than simply ticking 'done'."],
              visual: { kind: "plan-create-review", title: "Test → judge → improve → develop", caption: "Technical checks provide evidence; evaluation connects that evidence to the audience and brief.", labels: ["Property", "Convention", "Audience", "Fix", "Future idea"] },
            },
            {
              heading: "Evaluate fitness",
              paragraphs: ["Review how well the product meets the fictional client's purpose and audience. Consider aesthetics, readability, engagement, character communication, panel flow and constraints. Use evidence from the output and testing rather than unsupported praise."],
            },
            {
              heading: "Improvement versus development",
              paragraphs: ["An improvement changes the existing product, such as enlarging unreadable lettering or clarifying panel order. A further development adds a future direction, such as a sequel, themed edition, new character, serialisation or spin-off. Explain the benefit of either proposal."],
              example: "Improvement: increase caption contrast on page 2. Development: create a short spin-off following the mechanic introduced in the final panel.",
            },
            {
              heading: "Assessment integrity",
              paragraphs: [integrityReminder],
            },
          ],
          keyTerms: [
            { term: "Fitness for purpose", definition: "How well a product achieves its intended function for the specified client and audience." },
            { term: "Improvement", definition: "A proposed change that corrects or strengthens the existing product." },
            { term: "Further development", definition: "A proposed future extension beyond the current product." },
            { term: "Constraint", definition: "A limitation affecting what can be produced, such as time, assets, software or format." },
          ],
          commonMistakes: ["Checking only whether every brief item exists, not technical properties.", "Saying the comic is effective because it looks good without evidence.", "Calling a sequel an improvement to the existing pages.", "Proposing a change without explaining how it benefits audience or purpose."],
          examTips: ["Practise reviews with annotated fictional outputs and measurable evidence.", "Use evidence → effect → specific action for each proposal."],
          quiz: [
            { id: "imedia-r095-3-q1", prompt: "Which is an improvement rather than a further development?", options: ["Create a sequel", "Add a new spin-off character", "Increase contrast of unreadable speech bubbles", "Release a monthly series"], answer: 2, explanation: "Changing unreadable bubbles strengthens the existing product; the other options extend it." },
            { id: "imedia-r095-3-q2", prompt: "Which is the strongest test record?", options: ["Looks fine", "Tested it", "Expected 300 ppi; actual export was 72 ppi; re-export at 300 ppi for print", "The audience will like it"], answer: 2, explanation: "It records a measurable expectation, actual result and corrective action." },
          ],
          examQuestions: [
            { id: "imedia-r095-3-e1", command: "Practise", marks: 6, prompt: "Review a fictional comic page where the reading order is unclear and text becomes pixelated when printed. Propose one improvement and one further development.", guidance: ["Use a fictional practice output.", "Address both observed problems in the review.", "Keep improvement and future development distinct.", "Explain audience benefit."], model: "The existing page should use clearer panel spacing and directional composition so readers follow the intended order, then re-export from higher-quality text and artwork so print remains sharp. A future development could be an accessible digital edition with guided panel transitions, extending the story for mobile readers rather than merely repairing the print page." },
          ],
          durationMinutes: 55,
        }),
      ],
    },
  ],
};

export default creativeImediaCourse;
