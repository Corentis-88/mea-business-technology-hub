import type { CourseId } from "../types";

/**
 * Art direction for genuine teaching pictures used in technology topics.
 * Keep explanatory text in HTML; generated pictures must not contain lettering,
 * logos, watermarks or UI text. This makes the assets reusable and accessible.
 */
export interface TechnologyPictureSpec {
  id: string;
  courseId: Extract<CourseId, "computer-science" | "creative-imedia">;
  topicId: string;
  sectionHeading: string;
  filename: string;
  prompt: string;
  focalPoints: string[];
  alt: string;
  caption: string;
}

const common =
  "Landscape 16:9 educational editorial illustration for UK secondary pupils, polished digital painting with clean shapes, rich colour, realistic proportions, warm inclusive classroom tone, clear visual hierarchy, generous safe space around focal objects, no words, no letters, no numbers, no logos, no watermark.";

export const technologyPictureLibrary: TechnologyPictureSpec[] = [
  {
    id: "cs-cpu-cutaway", courseId: "computer-science", topicId: "cs-1-1", sectionHeading: "The CPU and its components", filename: "technology/cs-cpu-cutaway.webp",
    prompt: `${common} Cutaway view inside a desktop computer: processor enlarged like a transparent miniature factory, a control-room coordinator directs instruction cards, an arithmetic workbench processes values, four small glowing register trays sit beside a fast cache shelf, and a clear route links to RAM. Accurate metaphor, not a circuit diagram.`,
    focalPoints: ["Control unit coordinates", "ALU calculates and compares", "Registers hold immediate values", "Cache is close and fast"],
    alt: "Cutaway computer showing the CPU as a small factory with control, calculation, register and cache areas.",
    caption: "Picture the CPU as a tiny, fast workplace: the control unit directs, the ALU processes and registers hold what is needed now."
  },
  {
    id: "cs-memory-storage-desk", courseId: "computer-science", topicId: "cs-1-2", sectionHeading: "Memory and secondary storage", filename: "technology/cs-memory-storage-desk.webp",
    prompt: `${common} Student working at a computer beside an illustrated memory workspace: a small bright work desk represents RAM with open current tasks, a sealed startup card represents ROM, and a nearby archive contains hard drive, optical disc and solid-state drive; a slow overflow trolley between desk and archive represents virtual memory.`,
    focalPoints: ["RAM is the current workspace", "ROM keeps startup instructions", "Storage keeps files long term", "Virtual memory is slower overflow space"],
    alt: "A student computer workspace comparing an active desk for RAM with a long-term storage archive.",
    caption: "RAM is the computer's working space; secondary storage is its long-term archive."
  },
  {
    id: "cs-media-digitisation", courseId: "computer-science", topicId: "cs-1-2", sectionHeading: "Representing text, images and sound", filename: "technology/cs-media-digitisation.webp",
    prompt: `${common} Split creative studio scene: a photograph becomes a visible grid of coloured pixels; a smooth sound wave passes through evenly spaced sampling markers and becomes digital blocks; typed characters are sorted into small binary-pattern tiles. Show transformation from real-world media to stored data.`,
    focalPoints: ["Images become pixels", "Sound is sampled", "Characters use codes", "More detail needs more data"],
    alt: "A photograph, sound wave and characters being transformed into pixels, samples and data tiles.",
    caption: "Computers store every picture, sound and character as carefully organised binary data."
  },
  {
    id: "cs-network-journey", courseId: "computer-science", topicId: "cs-1-3", sectionHeading: "Hardware, addressing and the internet", filename: "technology/cs-network-journey.webp",
    prompt: `${common} Isometric school network scene with pupils on laptops, a wireless access point, switch, router, local server and internet cloud connected through visible glowing routes; one message appears as several small parcels taking routes and rejoining at a destination. Avoid schematic boxes and straight wire-diagram styling.`,
    focalPoints: ["Switch connects a local network", "Router moves data between networks", "Packets travel independently", "Addresses guide delivery"],
    alt: "A school network scene showing laptops, a switch, router and server while message packets travel to the internet.",
    caption: "Network devices have different jobs, and packets use addresses to reach the correct destination."
  },
  {
    id: "cs-security-incident", courseId: "computer-science", topicId: "cs-1-4", sectionHeading: "Threats", filename: "technology/cs-security-incident.webp",
    prompt: `${common} Cinematic but age-appropriate office security scene viewed as a dollhouse cutaway: a deceptive email hook approaches one laptop, malicious code slips from an unknown USB drive, repeated requests crowd a web server, and a person watches exposed credentials; protective updates, access control and staff awareness are visible on the safe side.`,
    focalPoints: ["Social engineering targets people", "Malware enters through unsafe actions", "Denial of service overwhelms", "Layers of prevention work together"],
    alt: "Cutaway office scene showing phishing, malicious USB software, a denial-of-service attack and security controls.",
    caption: "Threats use different routes, so organisations protect people, devices, networks and data together."
  },
  {
    id: "cs-operating-system-stage", courseId: "computer-science", topicId: "cs-1-5", sectionHeading: "Operating-system functions", filename: "technology/cs-operating-system-stage.webp",
    prompt: `${common} A friendly operating-system stage manager behind a transparent computer screen coordinates several apps, shares memory tokens, directs files into folders, checks user passes and sends jobs to printer and speakers. Show many tasks being managed at once, like backstage at a theatre.`,
    focalPoints: ["Provides a user interface", "Manages memory and processors", "Manages files and peripherals", "Controls users and permissions"],
    alt: "An operating system shown as a stage manager coordinating applications, memory, files, users and peripherals.",
    caption: "The operating system coordinates hardware, applications, files and users behind the scenes."
  },
  {
    id: "cs-technology-stakeholders", courseId: "computer-science", topicId: "cs-1-6", sectionHeading: "Impacts and stakeholders", filename: "technology/cs-technology-stakeholders.webp",
    prompt: `${common} Balanced town scene centred on a new data centre: workers gain jobs, a family uses useful online services, delivery automation changes work, cooling equipment uses energy and water, discarded devices are recycled, and a resident considers privacy. Optimistic but balanced, no visual verdict.`,
    focalPoints: ["Benefits and harms can coexist", "Stakeholders experience different effects", "Environmental costs matter", "A judgement needs evidence"],
    alt: "A town around a data centre showing jobs, digital services, automation, energy use, recycling and privacy concerns.",
    caption: "Technology affects groups differently; strong evaluation weighs benefits, harms and who experiences them."
  },
  {
    id: "cs-algorithm-kitchen", courseId: "computer-science", topicId: "cs-2-1", sectionHeading: "Computational thinking and design", filename: "technology/cs-algorithm-kitchen.webp",
    prompt: `${common} Busy school kitchen as an algorithm metaphor: a complex meal is broken into small stations, repeated preparation patterns are recognised, irrelevant clutter is screened away, and a precise sequence of recipe actions leads to the finished meal. Show decomposition, pattern recognition, abstraction and algorithmic thinking visually.`,
    focalPoints: ["Break down the problem", "Find repeating patterns", "Keep relevant detail", "Write precise steps"],
    alt: "A school kitchen workflow illustrating a complex task being broken into patterns, relevant details and ordered steps.",
    caption: "Computational thinking turns a large problem into manageable parts and a precise solution."
  },
  {
    id: "cs-program-control-game", courseId: "computer-science", topicId: "cs-2-2", sectionHeading: "Data and control", filename: "technology/cs-program-control-game.webp",
    prompt: `${common} Cutaway of a simple platform game being built: backstage, labelled-by-shape containers hold score, player name and lives; a decision gate selects a route; a loop conveyor repeats obstacles; input controls move a character and an output screen shows the result. No source code or written UI.`,
    focalPoints: ["Variables store changing data", "Selection chooses a route", "Iteration repeats instructions", "Inputs are processed into outputs"],
    alt: "A platform game cutaway showing data containers, a decision gate, a repeating loop and input-output controls.",
    caption: "Programs store data, make decisions and repeat instructions to produce useful behaviour."
  },
  {
    id: "cs-testing-workshop", courseId: "computer-science", topicId: "cs-2-3", sectionHeading: "Errors and test data", filename: "technology/cs-testing-workshop.webp",
    prompt: `${common} Software testing workshop: three test lanes feed ordinary, boundary and invalid input tokens into an app; inspectors identify a syntax break, a runtime crash and a subtle wrong-result logic fault; a checklist records expected versus actual behaviour. No readable writing.`,
    focalPoints: ["Normal data checks typical use", "Boundary data checks limits", "Invalid data checks rejection", "Errors have different causes"],
    alt: "A software testing workshop using normal, boundary and invalid inputs to reveal syntax, runtime and logic errors.",
    caption: "Good testing deliberately uses different data to reveal different weaknesses."
  },
  {
    id: "cs-logic-smart-home", courseId: "computer-science", topicId: "cs-2-4", sectionHeading: "Gates and truth tables", filename: "technology/cs-logic-smart-home.webp",
    prompt: `${common} Evening smart-home cutaway: outdoor light and motion sensors feed a porch lamp, two safety sensors control an alarm, and one inverter reverses a condition; small pairs of coloured signal lights visibly show off and on states. Make cause and effect visually traceable without a circuit diagram.`,
    focalPoints: ["AND needs both conditions", "OR needs either condition", "NOT reverses a condition", "Truth tables test every combination"],
    alt: "A smart home where light, motion and safety sensors control lamps and alarms using Boolean decisions.",
    caption: "Boolean logic combines true and false conditions to control real systems."
  },
  {
    id: "cs-translator-studio", courseId: "computer-science", topicId: "cs-2-5", sectionHeading: "Compiler, interpreter and IDE", filename: "technology/cs-translator-studio.webp",
    prompt: `${common} Software studio split into two translation workflows: one machine translates an entire stack before releasing a finished package; another guide translates and performs one instruction at a time; nearby an integrated workbench combines editor, error tools, run controls and debugger magnifier as visual objects.`,
    focalPoints: ["Compiler translates the whole program", "Interpreter works line by line", "An IDE combines development tools", "A debugger helps trace faults"],
    alt: "A software studio comparing whole-program compilation, line-by-line interpretation and an integrated development workbench.",
    caption: "Translators turn source code into executable instructions; an IDE brings the tools together."
  },
  {
    id: "imedia-converged-newsroom", courseId: "creative-imedia", topicId: "imedia-r093-1", sectionHeading: "Sectors, products and convergence", filename: "technology/imedia-converged-newsroom.webp",
    prompt: `${common} Lively modern newsroom producing one story for a printed page, phone article, podcast microphone, short video, television screen and social post; creative, technical and project-management staff collaborate through pre-production, recording and editing areas.`,
    focalPoints: ["One product can combine media forms", "Different sectors overlap", "Roles have distinct responsibilities", "Production moves through phases"],
    alt: "A converged newsroom producing print, mobile, audio and video versions of one story with different job roles.",
    caption: "Modern media products cross platforms and depend on creative, technical and senior roles working together."
  },
  {
    id: "imedia-codes-film-set", courseId: "creative-imedia", topicId: "imedia-r093-2", sectionHeading: "Media codes", filename: "technology/imedia-codes-film-set.webp",
    prompt: `${common} Fictional superhero film set shown from camera side: low camera viewpoint, dramatic coloured lighting, confident pose, costume and props, purposeful city setting, and a blank title area in the composition. Show how technical, symbolic and written-code space combine to communicate power.`,
    focalPoints: ["Camera angle is a technical code", "Colour, costume and pose are symbolic", "Typography space is planned", "Choices shape audience meaning"],
    alt: "A superhero film set using a low camera angle, lighting, costume, pose and composition to communicate confidence.",
    caption: "Media meaning is constructed: camera, colour, costume, setting and words all influence the audience."
  },
  {
    id: "imedia-planning-table", courseId: "creative-imedia", topicId: "imedia-r093-3", sectionHeading: "Product-design documents", filename: "technology/imedia-planning-table.webp",
    prompt: `${common} Overhead creative planning table with a visualisation sketch, storyboard panels, scene script pages with abstract lines, mood board, mind map and work-plan calendar; arrows made from stationery show which document guides a poster, video, animation or website. No readable text.`,
    focalPoints: ["Each document has a purpose", "Annotations remove ambiguity", "Planning supports production", "Choose the document for the product"],
    alt: "A creative planning table containing a storyboard, visualisation, script, mood board, mind map and schedule.",
    caption: "The right pre-production document communicates the right information to the production team."
  },
  {
    id: "imedia-platform-export", courseId: "creative-imedia", topicId: "imedia-r093-4", sectionHeading: "Platforms and audience", filename: "technology/imedia-platform-export.webp",
    prompt: `${common} Media designer at an export station adapting one campaign image for a phone portrait screen, wide cinema display, square social tile, printed poster and accessible website; file packages differ in size and visual quality, with a magnified raster edge and perfectly smooth vector curve nearby.`,
    focalPoints: ["Platform changes dimensions", "Audience and access affect choices", "Format affects quality and size", "Raster and vector suit different assets"],
    alt: "A designer adapting one campaign for phone, cinema, social media, print and web while comparing raster and vector graphics.",
    caption: "A suitable export matches the platform, audience, dimensions, quality and file-size needs."
  },
  {
    id: "imedia-brand-in-the-wild", courseId: "creative-imedia", topicId: "imedia-r094-1", sectionHeading: "Identity with a purpose", filename: "technology/imedia-brand-in-the-wild.webp",
    prompt: `${common} Fictional eco-friendly bicycle café with a coherent original visual identity repeated across storefront sign without lettering, cup symbol, staff apron, loyalty card, delivery bicycle and mobile interface; consistent leaf-and-wheel motif, green-teal palette and friendly rounded shapes.`,
    focalPoints: ["A motif makes the identity recognisable", "Colour and shape communicate values", "Consistency builds recognition", "Identity must suit purpose and audience"],
    alt: "A fictional bicycle café using a consistent leaf-and-wheel identity across its shop, packaging, clothing, bicycle and app.",
    caption: "A strong visual identity feels consistent wherever the audience meets the organisation."
  },
  {
    id: "imedia-graphic-hierarchy", courseId: "creative-imedia", topicId: "imedia-r094-2", sectionHeading: "Layout and hierarchy", filename: "technology/imedia-graphic-hierarchy.webp",
    prompt: `${common} Designer arranging a colourful fictional festival poster on a large screen: dominant hero image, clear blank headline zone, smaller information groups, alignment guides, deliberate spacing, contrast and reading path; beside it a cluttered rejected version shows weak hierarchy. No readable words.`,
    focalPoints: ["Hierarchy sets viewing order", "Contrast creates emphasis", "Alignment and spacing organise", "Clutter weakens communication"],
    alt: "A designer comparing a clear festival poster layout with a cluttered version lacking hierarchy.",
    caption: "Visual hierarchy guides the audience from the most important content to supporting detail."
  },
  {
    id: "imedia-graphics-production", courseId: "creative-imedia", topicId: "imedia-r094-3", sectionHeading: "Purposeful production", filename: "technology/imedia-graphics-production.webp",
    prompt: `${common} Digital graphics workstation as a rich close-up: original photographed fruit, hand-drawn leaf motif and texture assets are transformed through layers, masks, crop, colour adjustment and selection into a polished fictional smoothie advert; a separate export package leaves the editable layered document intact. No brand or words.`,
    focalPoints: ["Assets should be purposeful", "Layers preserve editability", "Tools change assets deliberately", "Export a suitable final format"],
    alt: "A graphics workstation turning original photos and drawings into a polished advert using layers, masks and colour adjustments.",
    caption: "Purposeful editing turns planned assets into a coherent graphic while preserving evidence and editability."
  },
  {
    id: "imedia-character-design", courseId: "creative-imedia", topicId: "imedia-r095-1", sectionHeading: "Original characters", filename: "technology/imedia-character-design.webp",
    prompt: `${common} Character designer's desk developing an original young space mechanic: silhouette thumbnails, facial expressions, front-side-back turnaround, colour palette, clothing and tool props, pose studies and a short sequence of blank comic panels. Cohesive original character, no resemblance to known franchises.`,
    focalPoints: ["Silhouette supports recognition", "Expression and pose show personality", "Turnarounds support consistency", "Props and costume reveal role"],
    alt: "A design desk developing an original space-mechanic character through silhouettes, expressions, turnarounds, colours and props.",
    caption: "Character planning makes appearance, personality and movement consistent before comic production begins."
  },
  {
    id: "imedia-comic-language", courseId: "creative-imedia", topicId: "imedia-r095-2", sectionHeading: "Translate plans into a comic", filename: "technology/imedia-comic-language.webp",
    prompt: `${common} Finished original one-page comic about a young inventor fixing a community robot, using varied panel sizes, clear gutters, close-up reaction, wide establishing view, motion marks, thought and speech balloons with no words, foreground overlap and a strong left-to-right reading flow.`,
    focalPoints: ["Panel size controls pace", "Shot choice controls information", "Gutters separate moments", "Balloon placement protects reading order"],
    alt: "An original comic page using varied panels, camera views, gutters, motion marks and empty speech balloons to guide reading.",
    caption: "Comic language controls time, emphasis and the order in which the reader experiences the story."
  },
  {
    id: "imedia-user-testing", courseId: "creative-imedia", topicId: "imedia-r095-3", sectionHeading: "Test systematically", filename: "technology/imedia-user-testing.webp",
    prompt: `${common} Small user-testing session for an original comic: three target readers point to confusing balloon order, tiny lettering space and an unclear action panel; creator records observations, improves only those areas, then compares before and after pages side by side. No readable text.`,
    focalPoints: ["Tests need clear criteria", "Target users provide relevant evidence", "Feedback identifies a specific issue", "Development makes a measurable improvement"],
    alt: "Target readers test a comic and identify specific problems before the creator compares an improved version.",
    caption: "Useful testing produces specific evidence that leads to a purposeful, measurable improvement."
  }
];

export function getTechnologyPicture(topicId: string, sectionHeading: string) {
  return technologyPictureLibrary.find((picture) =>
    picture.topicId === topicId && picture.sectionHeading === sectionHeading
  );
}

