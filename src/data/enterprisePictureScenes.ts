/**
 * Picture-led teaching brief for OCR Cambridge National Enterprise & Marketing.
 *
 * These are deliberately illustrations of people doing enterprise work, not
 * flowcharts, wire diagrams or text posters. Keep important teaching text in
 * HTML beside the image: generated lettering must never carry key knowledge.
 */
export interface EnterprisePictureScene {
  topicId: string;
  filename: string;
  sectionCoverage: string[];
  alt: string;
  caption: string;
  prompt: string;
}

const style =
  "Landscape 3:2 educational editorial illustration for UK pupils aged 13 to 16, warm modern picture-book realism, colourful but not childish, diverse Manchester teenagers and adults, clear facial expressions, strong visual storytelling, clean shapes, gentle depth and texture, school-safe, accessible at phone size. Use the same fictional healthy-snack enterprise BrightBite where suitable. No logos, no real brands, no copyrighted characters, no photorealism, no infographic boxes, no wire diagram, no floating UI, and no readable text except tiny incidental marks. Leave calm negative space around important objects.";

const scene = (
  topicId: string,
  filename: string,
  sectionCoverage: string[],
  alt: string,
  caption: string,
  action: string,
): EnterprisePictureScene => ({
  topicId,
  filename,
  sectionCoverage,
  alt,
  caption,
  prompt: `${style} Create one coherent teaching scene, using natural foreground, middle-ground and background moments rather than boxed panels. ${action}`,
});

/** One story plate per revision topic; together these cover all 35 sections. */
export const enterprisePictureScenes: Record<string, EnterprisePictureScene> = Object.fromEntries(
  [
    scene(
      "enterprise-r067-1",
      "images/enterprise/scenes/r067-characteristics-risk-reward.webp",
      ["Enterprise characteristics", "Risk and reward"],
      "A teenage entrepreneur calmly solves a supplier problem, presents a snack idea and weighs the possible rewards against money and time at risk.",
      "Enterprise skills can move an idea forward, but every decision can bring rewards and drawbacks.",
      "Show one student entrepreneur at a market stall: she invents a better recycled snack sleeve, clearly explains it to a customer, negotiates with a supplier and keeps trying after a failed prototype. Nearby, show the same person considering two believable futures: satisfied customers and independence on one side; an unpaid bill, tiredness and unsold stock on the other. Make the contrast visible through actions and expressions, not symbols alone.",
    ),
    scene(
      "enterprise-r067-2",
      "images/enterprise/scenes/r067-market-research-targeting.webp",
      ["Research for a decision", "Data, reliability and segmentation"],
      "Students ask customers questions, observe purchases, check a trusted report and compare different customer groups before changing a snack product.",
      "Research replaces guesses with evidence about real customer groups.",
      "Set the scene at a school community market. One student conducts a short questionnaire, another observes which snacks people choose, and a third checks a credible council statistics page with a visible date and source cues. Include a biased moment to spot: only asking close friends. In the background, different customers choose for different reasons such as price, dietary need, convenience and sport. End with the team changing pack size and price using the evidence.",
    ),
    scene(
      "enterprise-r067-3",
      "images/enterprise/scenes/r067-financial-viability.webp",
      ["Costs, revenue and profit", "Break-even for decisions", "Cash is not profit"],
      "A snack stall owner sorts rent and ingredient costs, counts sales, checks the break-even target and finds that a bill is due before customer money arrives.",
      "An enterprise must cover its costs, sell enough to break even and have cash available when bills are due.",
      "Show a busy BrightBite stall with an owner physically sorting money and receipts: rent remains one fixed pile, ingredients grow as more snack bags are made, and money enters when customers buy. A wall sales tracker approaches a clear finish-line marker for break-even. Then show a supplier holding a bill due today while an online customer payment is visibly still pending until Friday; the cash drawer is nearly empty even though the sales notebook shows a profit. Avoid formulas or graph lines inside the picture.",
    ),
    scene(
      "enterprise-r067-4",
      "images/enterprise/scenes/r067-marketing-mix.webp",
      ["The interdependent four Ps", "Promotion and selling", "Life cycle and pricing"],
      "A student team adjusts a snack product, its price, where it is sold and its promotion as demand changes over time.",
      "Product, price, place and promotion work together and may need to change as a product ages.",
      "Show one premium healthy snack being prepared, priced, displayed in a suitable sports-centre kiosk and promoted to active teenagers, with all choices visibly matching. Contrast a confused alternative in the background: premium price, flimsy pack and bargain-bin setting. Continue the scene across time: a launch sample table, growing customer queue, a mature crowded market with competitors, then a refreshed flavour and pack that renew interest. Include both a social post being made and a physical tasting event.",
    ),
    scene(
      "enterprise-r067-5",
      "images/enterprise/scenes/r067-ownership-capital-support.webp",
      ["Ownership choices", "Sources of capital", "Sources of support"],
      "An entrepreneur compares working alone or with partners, then considers a bank loan, a grant, crowdfunding, an investor and expert advice.",
      "Ownership, finance and support choices affect control, risk, cost and access to skills.",
      "Place a young founder at the centre of a realistic advice meeting. Show believable mini-moments around the room: working alone with full control and workload; two partners sharing tasks and decisions; a franchised kiosk following a set design; a banker offering repayable money; a grant adviser checking eligibility; supporters backing a crowdfunding prototype; an angel investor offering expertise while asking for influence; and a mentor helping with marketing and law. Use body language and objects to reveal trade-offs.",
    ),
    scene(
      "enterprise-r068-1",
      "images/enterprise/scenes/r068-complete-market-research.webp",
      ["A defensible research process", "Fictional skills lab"],
      "A student research team sets an aim, selects a fair mix of customers, conducts a survey, checks an existing source and organises results before changing its proposal.",
      "Plan the research first, keep the evidence and show how a finding changes the proposal.",
      "Follow BrightBite students through one natural classroom-to-market scene: they begin by agreeing the exact decision they need to make, select a mixed and fair sample rather than only friends, collect both numbered answers and spoken reasons, check a dated trustworthy secondary source, organise response cards and tally marks, notice a clear pattern, and alter their snack proposal. Include retained evidence such as completed response sheets and source notes, but no readable sentences.",
    ),
    scene(
      "enterprise-r068-2",
      "images/enterprise/scenes/r068-customer-profile.webp",
      ["Evidence, not stereotypes", "Fictional skills lab"],
      "Students build a customer profile from survey evidence while rejecting an unsupported stereotype and linking real customer needs to product choices.",
      "A useful customer profile is built from evidence and changes the proposal.",
      "Show a team studying real research evidence about one intended customer: a time-poor college sports student choosing an affordable portable snack. Visually connect observed needs to a resealable pack, sensible portion, price and sports-centre selling place through the students physically selecting prototypes. Include a student removing a guess-based stereotype card from the worktable because no evidence supports it. Keep demographic detail respectful and avoid visual stereotyping.",
    ),
    scene(
      "enterprise-r068-3",
      "images/enterprise/scenes/r068-product-proposal.webp",
      ["From insight to design", "Fictional skills lab"],
      "A student develops a healthy-snack package by testing how it works, how it looks and how much it costs to make.",
      "A successful design works well, appeals to the customer and is affordable to make.",
      "Illustrate a hands-on design table. A student tests a resealable closure and portable size for function, compares colours and shapes with the chosen customer for appearance, and simplifies an expensive construction after checking material cost. Show rough ideas becoming one annotated-looking final prototype with dimensions represented by a ruler and clear physical details, but generate no readable labels. The customer evidence should be visible beside every choice as survey cards or observed behaviour.",
    ),
    scene(
      "enterprise-r068-4",
      "images/enterprise/scenes/r068-review-finalise.webp",
      ["A visible improvement cycle", "Fictional skills lab"],
      "A student compares an early snack package with an improved version after testing it and judging useful and unhelpful feedback.",
      "Good feedback is judged, acted on and evidenced with a clear before-and-after change.",
      "Create a workshop scene centred on a real before-and-after product. The early pack spills when carried and its allergen area is hard to notice. A peer demonstrates the problem and gives focused feedback; another gives a vague personal colour preference that the designer does not follow. The student records the decision, improves the closure and clarity, retests the final pack and photographs both versions. Make acceptance, rejection and the reason visually understandable through actions.",
    ),
    scene(
      "enterprise-r068-5",
      "images/enterprise/scenes/r068-financial-viability.webp",
      ["Numbers with an evidence trail", "Fictional skills lab"],
      "Students use supplier prices, customer research and three possible sales days to judge whether their snack proposal can cover costs.",
      "Financial figures need evidence, careful working and a judgement about what could change.",
      "Show a team using authentic evidence objects: supplier quote, material samples, customer price-choice tokens and a stall booking receipt. Beside them, illustrate three realistic market-day outcomes without text: rainy day with few sales, normal day around break-even, busy event with strong sales. The students adjust pack cost and selling price and make a cautious go-or-change decision. Use groups of physical tokens and products rather than equations or graph diagrams.",
    ),
    scene(
      "enterprise-r068-6",
      "images/enterprise/scenes/r068-risks-success.webp",
      ["Risk, impact and response", "Fictional skills lab"],
      "A small snack enterprise responds to its most relevant outside risks, including a packaging rule, higher ingredient prices and bad weather at an outdoor market.",
      "Choose the risks that really matter, reduce them affordably and then judge what risk remains.",
      "Set BrightBite preparing for a weekend event while three outside changes arrive: a lawful packaging requirement from an inspector, a supplier showing a higher ingredient price, and rain threatening an outdoor stall. Show proportionate responses: compliant alternative packaging, a sensible backup supplier and an affordable gazebo or indoor booking. Also include several irrelevant distractions the team ignores. End with the students looking at remaining unsold-stock risk and making a cautious decision, not celebrating guaranteed success.",
    ),
    scene(
      "enterprise-r069-1",
      "images/enterprise/scenes/r069-develop-brand.webp",
      ["Personality, identity and image", "Fictional skills lab"],
      "A student team creates a lively, trustworthy brand identity and watches how customers actually react to it beside competing products.",
      "The enterprise creates its identity, but customers decide the brand image.",
      "Show a brand-making studio where students choose a name shape, warm energetic colours, friendly imagery, packaging style and tone that express one personality for active teenagers. Do not render readable brand names. At a nearby shelf, customers compare the finished pack with competitors and react: one sees healthy and energetic, another finds a misleading element. The students refine a credible unique benefit based on competitor gaps, making the difference between intended identity and actual audience image visually clear.",
    ),
    scene(
      "enterprise-r069-2",
      "images/enterprise/scenes/r069-promotional-campaign.webp",
      ["Campaign logic", "Fictional skills lab"],
      "Students create a matching social video and printed event poster for one snack campaign, each leading customers to the same action.",
      "A coherent campaign uses different channels to deliver the same brand message and call to action.",
      "Illustrate students producing two genuinely different campaign materials: filming a short vertical product video with motion and interaction, and placing a bold physical poster near a sports-centre entrance. Their colours, product imagery, offer and visual call-to-action shape clearly match without readable wording. Show customers moving from both materials towards the same tasting stall. Include a simple physical counter or tally used to measure responses within a set campaign period, not an abstract dashboard.",
    ),
    scene(
      "enterprise-r069-3",
      "images/enterprise/scenes/r069-practise-pitch.webp",
      ["Prepare for the audience", "Fictional skills lab"],
      "A student rehearses a short enterprise pitch, receives focused feedback about pace and evidence, then improves and tries again.",
      "Rehearsal helps only when feedback leads to a specific change and another check.",
      "Show the same presenter in three moments within one rehearsal room: first reading crowded notes too quickly with weak eye contact; then peers use a timer and focused observation sheet while pointing to the missing product evidence; finally the presenter uses brief cue cards, looks at the audience, handles a prototype and shows one simple cost visual. Include venue preparation, likely audience questions and a visible improvement in confidence without making confidence the only lesson.",
    ),
    scene(
      "enterprise-r069-4",
      "images/enterprise/scenes/r069-professional-pitch.webp",
      ["A professional performance", "Fictional skills lab"],
      "A student delivers a clear enterprise pitch using a prototype, product image and cost evidence, then answers an audience question.",
      "A professional pitch connects the idea to evidence and uses each resource for a clear purpose.",
      "Create an authentic small presentation room. The entrepreneur opens confidently, explains a customer need, physically demonstrates the snack prototype, uses a clean projected image and separate cost summary, makes a clear request and answers a challenging audience question using evidence. Show controlled posture, eye contact and purposeful gestures. Include an independent witness observing and a teacher making an observation record unobtrusively. Avoid dense slide text and staged corporate glamour.",
    ),
    scene(
      "enterprise-r069-5",
      "images/enterprise/scenes/r069-review-develop.webp",
      ["Evidence-based reflection", "Fictional skills lab"],
      "After a pitch, students compare audience reactions, timing and campaign results before improving the existing pitch and choosing a separate future enterprise step.",
      "Reflection uses evidence to explain what happened, improve current work and choose a realistic next step.",
      "Show a calm post-pitch review table. Students examine a timer result, witness notes, confused audience price reactions and campaign response tokens. One immediate improvement is concrete: replace a crowded price slide with a simple labelled cost prop or visual. Keep a separate future development visible: test a new flavour with a small customer group before launch. Show the team prioritising the most useful action rather than writing a vague promise to do better.",
    ),
  ].map((item) => [item.topicId, item]),
);

