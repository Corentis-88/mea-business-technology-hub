import type { Course, QuizQuestion, Topic } from "../types";

const q = (
  id: string,
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
): QuizQuestion => ({ id, prompt, options, answer, explanation });

const topic = (value: Topic): Topic => ({ durationMinutes: 25, ...value });

const integrityRules = [
  "Practise only with the fictional scenario supplied on this site, not a live OCR assignment.",
  "Use these activities to learn a process; assessed decisions and evidence must be the student's own.",
  "Do not paste a live brief, teacher-only exemplar or assessed response into the site.",
];

export const enterpriseCourse: Course = {
  id: "enterprise",
  slug: "enterprise",
  title: "OCR Cambridge National Enterprise and Marketing",
  shortTitle: "Enterprise & Marketing",
  qualification: "Level 1/Level 2 Cambridge National",
  examBoard: "OCR",
  code: "J837",
  description:
    "Learn how to plan an enterprise idea. Use customer research and money facts. Then create a brand, campaign and pitch.",
  accent: "#7b3fc6",
  icon: "rocket",
  assessmentSummary:
    "R067 is a 1 hour 15 minute calculator exam worth 40%. Centre-assessed R068 and R069 are each worth 30% and are OCR-moderated. R067 must be taken in the final assessment series.",
  aliases: ["enterprise", "enterprise and marketing", "cambridge national enterprise", "j837", "r067", "r068", "r069"],
  units: [
    {
      id: "enterprise-r067",
      code: "R067",
      title: "Enterprise and marketing concepts",
      description: "Learn the key ideas and use them to make good enterprise decisions.",
      assessment: "External exam: 1 hour 15 minutes, 70 raw marks, calculator allowed",
      weight: "40%",
      topics: [
        topic({
          id: "enterprise-r067-1",
          code: "R067 TA1",
          title: "Characteristics, risk and reward",
          summary: "Learn the skills an entrepreneur needs. Compare what they may gain with what could go wrong.",
          keywords: ["entrepreneur", "creativity", "innovation", "risk taking", "communication", "negotiation", "confidence", "determination"],
          sections: [
            {
              heading: "Enterprise characteristics",
              paragraphs: [
                "Creativity generates possibilities; innovation turns an idea into a new or improved solution. Risk taking accepts uncertainty after weighing evidence. Communication and negotiation help gain support, customers, suppliers or finance.",
                "Confidence helps an entrepreneur present and decide, while determination supports continued effort when a first attempt fails. A characteristic earns explanation only when connected to what it enables in the scenario.",
              ],
              visual: { kind: "pitch-journey", title: "Characteristic to outcome", caption: "Move from a personal characteristic to an action and then an enterprise result.", labels: ["Characteristic", "Action", "Stakeholder response", "Enterprise result"] },
            },
            {
              heading: "Risk and reward",
              paragraphs: [
                "Potential rewards include financial return, independence, self-satisfaction and making a desired change. Drawbacks include financial loss, insecurity, stress, reduced wellbeing and work-life imbalance.",
                "Risk does not guarantee reward. The size, probability and personal impact of an outcome depend on the decision and the entrepreneur's circumstances.",
              ],
              visual: { kind: "pitch-journey", title: "Risk is a decision chain", caption: "Evidence informs a decision, but the action can still lead to a gain, a loss or useful learning.", labels: ["Evidence", "Decision", "Action", "Uncertain outcome", "Reward or learning"] },
            },
          ],
          keyTerms: [
            { term: "Creativity", definition: "Producing original ideas or possibilities." },
            { term: "Innovation", definition: "Turning ideas into new or improved products, services or processes." },
            { term: "Negotiation", definition: "Working towards an agreement between parties with different interests." },
            { term: "Risk taking", definition: "Accepting uncertainty and the possibility of an unfavourable outcome." },
          ],
          commonMistakes: ["Listing a characteristic without connecting it to an action.", "Treating revenue as the same as financial reward or profit.", "Assuming confidence means ignoring evidence."],
          examTips: ["Make every explanation fit the named entrepreneur and decision.", "For a drawback, explain the real personal or enterprise consequence."],
          quiz: [
            q("e6711", "Which characteristic is most directly used when agreeing a lower supplier price?", ["Negotiation", "Independence", "Self-satisfaction", "Revenue"], 0, "Negotiation helps parties reach an agreement about price or terms."),
            q("e6712", "Which option is a possible non-financial reward?", ["Loan interest", "Self-satisfaction", "A variable cost", "A financial loss"], 1, "The satisfaction gained from developing an idea is a personal, non-financial reward."),
          ],
          examQuestions: [
            { id: "e671-e1", command: "Explain", marks: 3, prompt: "Aisha is starting a mobile bicycle-repair enterprise. Explain why determination may be important to Aisha.", guidance: ["Name what determination enables her to do.", "Use the mobile repair context.", "Develop a clear consequence for the enterprise."] },
          ],
        }),
        topic({
          id: "enterprise-r067-2",
          code: "R067 TA2",
          title: "Market research and targeting",
          summary: "Collect useful research, understand the answers and choose a clear customer group.",
          keywords: ["primary research", "secondary research", "qualitative", "quantitative", "reliability", "segmentation", "target customer"],
          sections: [
            {
              heading: "Research for a decision",
              paragraphs: [
                "Research helps understand customers and competitors, identify demand and gaps, reduce uncertainty and inform product, price, promotion and selling decisions.",
                "Primary methods include questionnaires, interviews, focus groups, observation and trials. Secondary sources include internal data, government statistics, market reports, competitor material and credible publications.",
              ],
              visual: { kind: "research-cycle", title: "Evidence into action", caption: "An aim shapes collection; analysis should produce a justified enterprise decision.", labels: ["Aim", "Method/source", "Data", "Finding", "Decision", "Review"] },
            },
            {
              heading: "Data, reliability and segmentation",
              paragraphs: [
                "Quantitative data measures how many, how much or how often. Qualitative data explains views, preferences and reasons. Reliability depends on relevance, currency, sample, bias, question design and source credibility.",
                "Segments may use age, gender, occupation, income, location or lifestyle. A useful profile changes a decision; it must not be an unsupported stereotype.",
              ],
              visual: { kind: "stakeholder-map", title: "A market contains different customer groups", caption: "Segmentation organises customers into useful groups, but research must show which characteristics actually affect demand.", labels: ["Age group", "Income band", "Location", "Occupation", "Lifestyle", "Customer need"] },
              example: "'Online' is a delivery channel, not a research method. An online questionnaire is still a questionnaire.",
            },
          ],
          keyTerms: [
            { term: "Primary research", definition: "New, first-hand research gathered for the current purpose." },
            { term: "Secondary research", definition: "Relevant information that already exists." },
            { term: "Qualitative data", definition: "Descriptive evidence about views and reasons." },
            { term: "Quantitative data", definition: "Numerical evidence that can be measured or compared." },
            { term: "Market segmentation", definition: "Dividing a market into groups sharing characteristics." },
          ],
          commonMistakes: ["Naming 'online' as the research method.", "Treating all large samples as unbiased.", "Inventing customer preferences from age or gender alone."],
          examTips: ["State the method before its channel.", "Connect a segment to a product, price, promotion or place decision."],
          quiz: [
            q("e6721", "Which example is secondary research?", ["A new focus group", "Observing shoppers today", "An existing government income table", "Interviewing five customers"], 2, "The government table is secondary research because it already exists and another organisation collected the information."),
            q("e6722", "Which research finding is quantitative?", ["Customers like the friendly design", "62% would pay up to £15", "The colour feels calming", "A customer explains why delivery matters"], 1, "The percentage and price are numbers, so this is quantitative data."),
          ],
        }),
        topic({
          id: "enterprise-r067-3",
          code: "R067 TA3",
          title: "Financial viability",
          summary: "Work out costs, revenue, profit and break-even. Use the answers to judge whether the idea may work.",
          keywords: ["fixed cost", "variable cost", "total cost", "revenue", "profit", "contribution", "break-even", "cash"],
          sections: [
            {
              heading: "Costs, revenue and profit",
              paragraphs: [
                "Fixed costs do not change directly with output. Variable costs change with units made or sold. Revenue is earned from sales; profit remains after total costs.",
              ],
              formula: "Total cost = fixed cost + variable cost; revenue = selling price × number sold; profit/loss = revenue − total cost",
            },
            {
              heading: "Break-even for decisions",
              paragraphs: [
                "Contribution per unit pays towards fixed costs and then profit. Break-even is where total revenue equals total cost. A graph makes the effect of changes in price, cost or sales visible.",
                "Entrepreneurs use break-even to set targets, compare proposals and judge risk. This is different from merely defining the term.",
              ],
              formula: "Contribution = price − variable cost per unit; break-even output = fixed costs ÷ contribution",
              visual: { kind: "break-even", title: "Break-even and viability", caption: "Sales below the intersection produce a loss; sales above it produce profit.", labels: ["Total cost", "Sales revenue", "Break-even"] },
            },
            {
              heading: "Cash is not profit",
              paragraphs: [
                "Profit is calculated from revenue and costs; cash is money available at a moment in time. A profitable enterprise can fail if customers pay after wages, rent or suppliers must be paid.",
              ],
              visual: { kind: "cash-flow", title: "Timing matters", caption: "A future receipt cannot pay a bill that is due today.", labels: ["Money received", "Money paid out", "Net cash flow", "Closing cash balance"] },
            },
          ],
          keyTerms: [
            { term: "Fixed cost", definition: "A cost that does not vary directly with output." },
            { term: "Variable cost", definition: "A cost that changes as output changes." },
            { term: "Contribution", definition: "Selling price minus variable cost per unit." },
            { term: "Break-even", definition: "The output at which total revenue equals total cost." },
            { term: "Financial viability", definition: "The ability of a proposal to generate sufficient money to continue and meet objectives." },
          ],
          commonMistakes: ["Using total variable costs in the contribution-per-unit formula.", "Confusing profit with revenue.", "Defining break-even when asked how it supports a decision."],
          examTips: ["Show each calculation and include £, %, units or products.", "Interpret whether likely sales are safely above break-even."],
          quiz: [
            q("e6731", "Price is £18 and variable cost is £6. What is contribution per unit?", ["£3", "£12", "£18", "£24"], 1, "£18 − £6 = £12 contribution."),
            q("e6732", "Fixed costs are £3,600 and contribution is £12. What is break-even output?", ["300 units", "432 units", "3,588 units", "43,200 units"], 0, "£3,600 ÷ £12 = 300 units."),
          ],
          examQuestions: [
            { id: "e673-e1", command: "Calculate", marks: 3, prompt: "A candle enterprise has fixed costs of £2,800. Each candle sells for £14 and has a variable cost of £6. Calculate break-even output.", guidance: ["Calculate contribution per candle.", "Substitute into the break-even formula.", "Give the answer in candles."], model: "Contribution = £14 − £6 = £8. Break-even output = £2,800 ÷ £8 = 350 candles." },
          ],
        }),
        topic({
          id: "enterprise-r067-4",
          code: "R067 TA4",
          title: "Creating a marketing mix",
          summary: "Choose a product, price, place and promotion that work together and suit the customer.",
          keywords: ["marketing mix", "product", "price", "place", "promotion", "advertising", "public relations", "product life cycle"],
          sections: [
            {
              heading: "The interdependent four Ps",
              paragraphs: [
                "Product, price, place and promotion create one customer offer. Changing one can make another inconsistent: a premium price needs suitable value, channels and communication.",
                "Judge suitability against the product, target customer, objective, budget and competition rather than describing four isolated choices.",
              ],
              visual: { kind: "marketing-mix", title: "A connected marketing mix", caption: "The centre is the target customer; every P must fit both the customer and the other Ps.", labels: ["Product", "Price", "Place", "Promotion", "Target customer"] },
            },
            {
              heading: "Promotion and selling",
              paragraphs: [
                "Promotion includes non-digital and digital advertising, sales promotions and public relations. Compare reach, targeting, cost, credibility and ability to measure response.",
                "Physical and online selling differ in reach, convenience, customer experience, cost and control. The most suitable channel depends on how the target customer buys and what the product requires.",
              ],
            },
            {
              heading: "Life cycle and pricing",
              paragraphs: [
                "Products may move through development, introduction, growth, maturity and decline. Extension strategies attempt to delay decline through changes such as new features, promotion or markets.",
                "Pricing choices respond to cost, competitors, customers, objectives and product stage. A low price can support entry but may reduce contribution or signal low quality.",
              ],
              visual: { kind: "product-life-cycle", title: "Life-cycle decisions", caption: "Price and promotion commonly change as awareness, competition and demand evolve.", labels: ["Development", "Introduction", "Growth", "Maturity", "Decline"] },
            },
          ],
          keyTerms: [
            { term: "Marketing mix", definition: "The coordinated product, price, place and promotion decisions for an offer." },
            { term: "Public relations", definition: "Managing communication and relationships to build a favourable public image." },
            { term: "Sales promotion", definition: "A short-term incentive intended to encourage purchase." },
            { term: "Product life cycle", definition: "Stages a product may pass through from development to decline." },
          ],
          commonMistakes: ["Listing the four Ps without showing interdependence.", "Saying a promotion 'attracts customers' without explaining which customers or why.", "Assuming the cheapest option is automatically most suitable."],
          examTips: ["The eight-mark item is linked to Topic Area 4: address every printed bullet.", "Apply the enterprise context and explain trade-offs before reaching a decision."],
          quiz: [
            q("e6741", "Why might a premium product use specialist retailers?", ["Place can reinforce product quality and target the intended customer", "All customers avoid specialists", "It makes price irrelevant", "Promotion becomes unnecessary"], 0, "The channel contributes to positioning and reaches customers seeking specialist value."),
            q("e6742", "Which example is a sales promotion?", ["A two-week buy-one-get-one-free offer", "A permanent factory", "A job description", "A bank loan"], 0, "A sales promotion is a short-term offer that encourages customers to buy."),
          ],
          examQuestions: [
            { id: "e674-e1", command: "Discuss", marks: 8, prompt: "Kai sells reusable lunch boxes to environmentally aware sixth-form students. Discuss whether social-media advertising is the most suitable promotional method for Kai.", guidance: ["Address reach/targeting, cost and suitability for this product and customer.", "Explain relevant benefits and limitations.", "Use the context throughout and reach a supported conclusion."] },
          ],
        }),
        topic({
          id: "enterprise-r067-5",
          code: "R067 TA5",
          title: "Starting and running an enterprise",
          summary: "Choose who will own the enterprise, where start-up money may come from and who can help.",
          keywords: ["sole trader", "partnership", "LLP", "private limited company", "franchise", "capital", "business angel", "support"],
          sections: [
            {
              heading: "Ownership choices",
              paragraphs: [
                "A sole trader retains control and profit but usually has unlimited liability. Partnerships share skills, decisions and profit. An LLP gives members limited liability; a private limited company has shareholders and separate legal identity.",
                "A franchise offers an established brand and support in return for fees, restrictions and less independence. Choose by considering liability, control, finance, continuity and decision-making.",
              ],
            },
            {
              heading: "Sources of capital",
              paragraphs: [
                "Personal savings and family funding may be flexible but expose personal relationships or money. Loans need repayment and interest. Crowdfunding tests public interest but may not reach its target.",
                "Grants usually do not need repayment but have eligibility conditions. Business angels invest money and expertise in return for a stake or influence.",
              ],
              visual: { kind: "stakeholder-map", title: "Funding routes around an enterprise", caption: "Each source offers a different mix of cost, control, eligibility, repayment and expertise.", labels: ["Owner/family", "Bank", "Grant provider", "Crowd", "Business angel", "Franchisor"] },
            },
            {
              heading: "Sources of support",
              paragraphs: [
                "Banks, councils, accountants, solicitors, family, chambers of commerce, government and charities offer different help. Name the actual help—finance, legal advice, accounts, networking, premises or mentoring—and connect it to the enterprise's need.",
              ],
              visual: { kind: "stakeholder-map", title: "Support network", caption: "Different providers solve different start-up problems.", labels: ["Finance", "Legal", "Tax/accounts", "Networks", "Local support", "Mentoring"] },
            },
          ],
          keyTerms: [
            { term: "Sole trader", definition: "A business owned by one person, usually with unlimited liability." },
            { term: "Limited liability partnership", definition: "A partnership structure in which members have limited liability." },
            { term: "Private limited company", definition: "A separately incorporated business whose shares are privately held." },
            { term: "Business angel", definition: "An individual who invests money and often expertise in a growing enterprise." },
            { term: "Grant", definition: "Funding awarded for a purpose that normally does not need repayment if conditions are met." },
          ],
          commonMistakes: ["Calling a franchise a legal ownership structure.", "Assuming grants are available to every enterprise.", "Naming a support provider without explaining the support offered."],
          examTips: ["Compare capital choices on repayment, interest, eligibility and control.", "Make the support provider solve the precise problem in the question."],
          quiz: [
            q("e6751", "Which source of finance may provide expertise but reduce the founder's share of ownership?", ["Trade credit", "A business angel", "A grant", "Personal savings"], 1, "A business angel often invests in return for a share of ownership and may influence decisions."),
            q("e6752", "Who is best placed to advise on a complex contract?", ["Solicitor", "Customer", "Competitor", "Courier"], 0, "A solicitor provides specialist legal advice."),
          ],
        }),
      ],
    },
    {
      id: "enterprise-r068",
      code: "R068",
      title: "Design a business proposal",
      description: "Complete six steps to research, design and check an enterprise proposal. Practice uses made-up examples.",
      assessment: "Centre-assessed OCR-set assignment, 60 marks, OCR moderated; normally 10–14 GLH under assessment conditions",
      weight: "30%",
      topics: [
        topic({
          id: "enterprise-r068-1",
          code: "R068 Task 1",
          title: "Complete market research",
          summary: "Set a clear research aim. Collect information, show the results and decide how useful they are.",
          keywords: ["research aim", "research tool", "sampling", "cluster", "convenience", "random", "quota", "collate"],
          sections: [
            { heading: "A defensible research process", paragraphs: ["Start with a decision-focused aim. Select one primary tool and one secondary tool for current assessment practice, gathering both qualitative and quantitative evidence where useful.", "Sampling may be cluster, convenience, random or quota. Present findings accurately, identify patterns, compare them with the aim and acknowledge limitations."], image: { src: "images/enterprise/market-research-proposal.webp", alt: "Students observe customers, collect survey evidence, compare products and use charts and prototypes to plan a business proposal.", caption: "Research is active: observe, ask, compare, organise the findings, then let the evidence change the proposal." }, visual: { kind: "research-cycle", title: "Research evidence trail", caption: "Every conclusion should trace back to an aim, method, finding and decision.", labels: ["Aim", "Sample", "Tools", "Evidence", "Finding", "Decision", "Review"] } },
            { heading: "Fictional skills lab", paragraphs: ["For the fictional enterprise BrightBite, plan a questionnaire about healthy snack preferences and select one credible existing source about the local student market."], bullets: integrityRules },
          ],
          keyTerms: [{ term: "Research aim", definition: "A precise statement of what the research needs to discover." }, { term: "Random sample", definition: "A sample in which each eligible person has an equal selection chance." }, { term: "Quota sample", definition: "A sample built to contain set numbers from chosen categories." }, { term: "Collate", definition: "Organise collected evidence so it can be analysed." }],
          commonMistakes: ["Collecting data before defining the decision.", "Reporting a chart without identifying a finding.", "Using an unreferenced or outdated secondary source."],
          examTips: ["Current practice is one primary and one secondary tool; do not rely on older assignment counts.", "In assessed work, follow the live OCR-set instructions exactly and work independently."],
          quiz: [q("e6811", "Which sampling method gives every eligible student an equal chance of being selected?", ["Convenience sampling", "Random sampling", "Quota sampling", "A cluster chosen because it is easy to reach"], 1, "Random sampling gives every eligible student an equal chance of being selected."), q("e6812", "What should you do when reviewing your research?", ["Repeat every question", "Judge how useful the research is by considering the aim and its limitations", "Invent missing data", "Remove all negative findings"], 1, "Decide whether the evidence answered the research aim and explain how any limitations affect your confidence in the findings.")],
        }),
        topic({
          id: "enterprise-r068-2",
          code: "R068 Task 2",
          title: "Identify a customer profile",
          summary: "Use research facts to describe the customer most likely to buy the product.",
          keywords: ["customer profile", "segment", "demographic", "geographic", "lifestyle", "evidence"],
          sections: [
            { heading: "Evidence, not stereotypes", paragraphs: ["Select only characteristics that influence the proposal, such as age, occupation, income, location or lifestyle. Support each important choice with a specific research finding.", "A useful profile explains what the customer needs, values and can afford, then shows how this will influence design and marketing."], visual: { kind: "stakeholder-map", title: "Profile to decision", caption: "Research supports a profile; the profile changes the proposal.", labels: ["Finding", "Characteristic", "Need", "Design decision", "Marketing decision"] } },
            { heading: "Fictional skills lab", paragraphs: ["Use a supplied BrightBite dataset to create a customer profile, then annotate which finding supports each characteristic."], bullets: integrityRules },
          ],
          keyTerms: [{ term: "Customer profile", definition: "An evidence-based description of the characteristics and needs of an intended customer." }, { term: "Demographic", definition: "A population characteristic such as age, income or occupation." }, { term: "Lifestyle", definition: "Patterns of interests, values and behaviour that may influence buying." }],
          commonMistakes: ["Creating a broad list unrelated to decisions.", "Using stereotypes instead of findings.", "Claiming one small sample represents everyone."],
          examTips: ["Use the wording 'the finding suggests...' to make the evidence trail visible.", "Prioritise characteristics that change the product or campaign."],
          quiz: [q("e6821", "What is the strongest evidence to use when creating a customer profile?", ["A personal guess", "Relevant findings from the research", "A social stereotype", "A competitor's slogan"], 1, "A customer profile should be supported by evidence from the research."), q("e6822", "Why might you include income in a customer profile?", ["It may affect what price the customer can afford", "It proves that everybody will buy", "It replaces product design", "It removes competition"], 0, "Income can affect how much a customer is able and willing to pay.")],
        }),
        topic({
          id: "enterprise-r068-3",
          code: "R068 Task 3",
          title: "Develop a product proposal",
          summary: "Use research to create one clear product design that could be made and sold.",
          keywords: ["design mix", "function", "aesthetics", "economic manufacture", "creative technique", "proposal"],
          sections: [
            { heading: "From insight to design", paragraphs: ["The design mix balances function, aesthetics and economic manufacture. Use a creative technique to generate the current required proposal, then make features and dimensions clear enough for another person to understand.", "Explain how research and each design-mix element influenced the choices rather than adding theory that does not change the proposal."], visual: { kind: "design-mix", title: "Design mix balance", caption: "A successful design must work, appeal and be realistically affordable to make.", labels: ["Function", "Aesthetics", "Economic manufacture"] } },
            { heading: "Fictional skills lab", paragraphs: ["Sketch and annotate one BrightBite snack package that meets a fictional customer profile and a maximum manufacturing cost."], bullets: integrityRules },
          ],
          keyTerms: [{ term: "Function", definition: "What the product must do and how well it performs." }, { term: "Aesthetics", definition: "The product's sensory and visual appeal." }, { term: "Economic manufacture", definition: "Producing the design at a cost compatible with viability." }, { term: "Creative technique", definition: "A structured way to generate or develop ideas." }],
          commonMistakes: ["Presenting decoration with no functional detail.", "Ignoring manufacture cost.", "Describing research without showing its effect on a feature."],
          examTips: ["Current guidance uses one developed proposal; older two-idea advice is historic.", "Annotations should explain decisions, not merely label colours."],
          quiz: [q("e6831", "Which design choice is about the product's function?", ["A resealable closure keeps food fresh", "The logo uses green", "The packaging looks energetic", "The font looks modern"], 0, "The resealable closure has a practical purpose because it helps to keep the food fresh."), q("e6832", "Why should you consider whether a product can be made economically?", ["The cost affects the price and financial viability", "It makes research unnecessary", "It guarantees demand", "It replaces the product's appearance"], 0, "A design may not be financially viable if it costs too much to make.")],
        }),
        topic({
          id: "enterprise-r068-4",
          code: "R068 Task 4",
          title: "Review and finalise the design",
          summary: "Check the design, collect helpful feedback and clearly show what you improved.",
          keywords: ["self-assessment", "feedback", "review", "modify", "finalise", "evidence"],
          sections: [
            { heading: "A visible improvement cycle", paragraphs: ["Check the design against the customer profile, research, function, aesthetics and cost. Gather specific verbal and written feedback from suitable people.", "Decide which suggestions to accept, modify or reject and explain why. Show before-and-after evidence so the development is visible."], visual: { kind: "plan-create-review", title: "Review to refinement", caption: "Feedback has value only when it is judged and produces an evidenced decision.", labels: ["Self-check", "Feedback", "Decision", "Modification", "Final check"] } },
            { heading: "Fictional skills lab", paragraphs: ["Review a deliberately flawed BrightBite design, rank five feedback comments by usefulness and create a change log."], bullets: integrityRules },
          ],
          keyTerms: [{ term: "Self-assessment", definition: "A critical check of one's own proposal against relevant criteria." }, { term: "Feedback", definition: "Information from another person about strengths, weaknesses or possible changes." }, { term: "Refinement", definition: "A purposeful modification that improves fitness for the intended use." }],
          commonMistakes: ["Accepting every comment without judgement.", "Saying 'made it better' without showing how.", "Showing only the final version."],
          examTips: ["Record what changed, the evidence behind it and the intended effect.", "Useful feedback is specific and linked to the customer or proposal."],
          quiz: [q("e6841", "What is the best way to respond to conflicting feedback?", ["Ignore all of it", "Judge each comment against the evidence and objectives", "Make every suggested change", "Choose the longest comment"], 1, "Judge each comment by using the proposal's objectives and the evidence you have collected."), q("e6842", "Which option provides the best evidence that a proposal has been improved?", ["Only a final image", "A before-and-after comparison with reasons for the changes", "A definition of feedback", "An unrelated mood board"], 1, "A before-and-after comparison shows what changed, while the reasons explain why the proposal was improved.")],
        }),
        topic({
          id: "enterprise-r068-5",
          code: "R068 Task 5",
          title: "Assess financial viability",
          summary: "Use realistic numbers to work out possible results. Decide whether sales may cover the costs.",
          keywords: ["cost", "selling price", "sales forecast", "revenue", "profit", "break-even", "viability", "assumption"],
          sections: [
            { heading: "Numbers with an evidence trail", paragraphs: ["Use research and the proposal to justify costs, price and sales assumptions. Calculate total cost, revenue, profit or loss and break-even accurately.", "Interpret the results: compare expected sales with break-even, test sensitivity to lower demand or higher cost and explain what would need to change."], formula: "Profit = (price × sales) − total costs; break-even = fixed costs ÷ contribution per unit", visual: { kind: "break-even", title: "Viability is a judgement", caption: "The intersection is the minimum sales target; forecast demand and sensitivity testing decide how safe that target is.", labels: ["Total cost", "Sales revenue", "Break-even"] } },
            { heading: "Fictional skills lab", paragraphs: ["Use a supplied BrightBite cost table and three demand scenarios to test viability and recommend a maximum cost or minimum sales target."], bullets: integrityRules },
          ],
          keyTerms: [{ term: "Sales forecast", definition: "An evidence-based estimate of future sales." }, { term: "Viability", definition: "Whether the proposal can generate enough money to operate and meet objectives." }, { term: "Sensitivity", definition: "How much the result changes when an assumption changes." }],
          commonMistakes: ["Using invented values without evidence.", "Stopping after a correct calculation.", "Calling a proposal viable when forecast sales are below break-even."],
          examTips: ["State units and show working.", "Use cautious language because forecasts are uncertain."],
          quiz: [q("e6851", "Expected sales are 500 units and the break-even output is 460 units. What is the margin above break-even?", ["40 units", "460 units", "500 units", "960 units"], 0, "500 − 460 = 40 units."), q("e6852", "Which action makes a financial viability judgement stronger?", ["Using one optimistic forecast", "Testing the effect of lower sales and higher costs", "Ignoring when cash enters and leaves the enterprise", "Removing the sources of information"], 1, "Testing less favourable figures shows whether the proposal could remain viable if sales fall or costs rise.")],
        }),
        topic({
          id: "enterprise-r068-6",
          code: "R068 Task 6",
          title: "Review risks and likely success",
          summary: "Find the biggest outside risks, plan affordable responses and judge whether the proposal may succeed.",
          keywords: ["risk", "political", "economic", "social", "technological", "legal", "environmental", "mitigation"],
          sections: [
            { heading: "Risk, impact and response", paragraphs: ["Scan political, economic, social, technological, legal and environmental changes, then select only those that genuinely affect the proposal.", "For each major risk, explain likelihood, impact and a proportionate mitigation. Judge likely success by combining research, customer fit, design, finance and remaining risk."], visual: { kind: "pitch-journey", title: "From risk to residual risk", caption: "Estimate likelihood and impact before choosing a proportionate response, then judge what exposure remains.", labels: ["Risk", "Likelihood", "Impact", "Mitigation", "Residual risk"] } },
            { heading: "Fictional skills lab", paragraphs: ["Rank six external changes for BrightBite, justify the top two and propose a response that is affordable for a small enterprise."], bullets: integrityRules },
          ],
          keyTerms: [{ term: "External risk", definition: "A possible harmful event or change arising outside the enterprise." }, { term: "Mitigation", definition: "Action taken to reduce the likelihood or impact of a risk." }, { term: "Residual risk", definition: "The risk remaining after mitigation." }],
          commonMistakes: ["Listing every external category without relevance.", "Suggesting a response that costs more than the risk justifies.", "Ignoring evidence from earlier proposal work."],
          examTips: ["Prioritise rather than list.", "Make the final success judgement conditional on the most important uncertainty."],
          quiz: [q("e6861", "A new law bans the packaging material used in the proposal. Which type of external factor is this?", ["Legal", "Personal", "Internal motivation", "Customer service"], 0, "A new or changed law is a legal external factor."), q("e6862", "What makes an action to reduce risk proportionate?", ["It can cost any amount", "Its cost and effort match the likelihood and impact of the risk", "It removes all uncertainty", "It ignores the proposal"], 1, "The cost and effort of the action should match the size of the risk.")],
        }),
      ],
    },
    {
      id: "enterprise-r069",
      code: "R069",
      title: "Market and pitch a business proposal",
      description: "Create a brand and campaign. Then plan, deliver and review a professional pitch.",
      assessment: "Centre-assessed OCR-set assignment, 60 marks, OCR moderated; normally 10–14 GLH under assessment conditions",
      weight: "30%",
      topics: [
        topic({
          id: "enterprise-r069-1",
          code: "R069 Task 1",
          title: "Develop a brand",
          summary: "Create a clear brand that suits the proposal, customer and market.",
          keywords: ["brand personality", "brand identity", "brand image", "USP", "competitor", "positioning"],
          sections: [
            { heading: "Personality, identity and image", paragraphs: ["Brand personality is the human character a brand communicates. Brand identity is what the enterprise deliberately creates—such as name, logo, colour, type and tone. Brand image is how audiences actually perceive it.", "Use competitor strengths and weaknesses to define a credible unique selling point and position. Check that every visual and verbal choice fits the customer and external environment."], visual: { kind: "brand-board", title: "A coherent brand identity", caption: "Logo, colour, type, imagery and tone should express one personality so the audience forms the intended image.", labels: ["Logo", "Colour palette", "Typography", "Imagery", "Tone of voice"] } },
            { heading: "Fictional skills lab", paragraphs: ["Create a small brand board for BrightBite with an explained personality, USP, name, colour palette and tone of voice."], bullets: integrityRules },
          ],
          keyTerms: [{ term: "Brand personality", definition: "Human characteristics associated with a brand." }, { term: "Brand identity", definition: "The deliberate visual and verbal elements used to present a brand." }, { term: "Brand image", definition: "The audience's actual perception of the brand." }, { term: "Unique selling point", definition: "A meaningful feature or benefit that distinguishes the offer." }],
          commonMistakes: ["Using personality, identity and image as synonyms.", "Choosing colours only from personal preference.", "Claiming a generic feature is unique without competitor evidence."],
          examTips: ["Explain what each identity choice communicates to the chosen customer.", "Use R068 evidence rather than starting the brand from guesswork."],
          quiz: [q("e6911", "Which option is part of a brand's identity?", ["The audience's private opinion", "The designed logo and colour system", "A supplier invoice", "The break-even output"], 1, "The enterprise creates its logo and colour system as parts of its brand identity."), q("e6912", "What does brand image mean?", ["Only the logo file", "How the audience sees the brand", "The legal ownership of the enterprise", "The selling price"], 1, "Brand image is how the audience sees the brand. This may be different from the identity that the enterprise intended to create.")],
        }),
        topic({
          id: "enterprise-r069-2",
          code: "R069 Task 2",
          title: "Create a promotional campaign",
          summary: "Set a campaign aim and a number to measure it. Create one digital and one non-digital item.",
          keywords: ["campaign objective", "KPI", "timeframe", "digital promotion", "non-digital promotion", "coherence", "call to action"],
          sections: [
            { heading: "Campaign logic", paragraphs: ["A campaign needs a precise objective, measurable key performance indicator and appropriate timeframe. Current practice uses two coherent materials: one digital and one non-digital.", "Materials should share brand identity, message, offer and call to action while using each channel's strengths. Explain how the combination reaches and persuades the customer."], image: { src: "images/enterprise/campaign-creation.webp", alt: "A student enterprise team develops a consistent bottle identity, photographs the product, creates matching packaging, social graphics and a poster, then presents the campaign.", caption: "A coherent campaign feels like one idea across every touchpoint, while each material uses the strengths of its own channel." }, visual: { kind: "marketing-mix", title: "One customer, one coherent campaign", caption: "Digital and non-digital materials should reinforce the same message and action; the objective and KPI judge the combined result.", labels: ["Digital material", "Non-digital material", "Shared message", "Call to action"] } },
            { heading: "Fictional skills lab", paragraphs: ["Design rough concepts for a BrightBite social post and poster, then annotate their shared message and different channel roles."], bullets: integrityRules },
          ],
          keyTerms: [{ term: "Campaign objective", definition: "The specific result promotional activity aims to achieve." }, { term: "KPI", definition: "A measurable indicator used to judge progress towards an objective." }, { term: "Call to action", definition: "A clear instruction telling the audience what to do next." }, { term: "Coherence", definition: "Consistent elements that make materials work as one campaign." }],
          commonMistakes: ["Making two versions of the same material instead of different types.", "Using a vague objective with no measure or time.", "Showing materials without explaining how they work together."],
          examTips: ["Current practice is one digital and one non-digital material; older three-material advice is historic.", "A KPI measures the chosen objective, not an unrelated result."],
          quiz: [q("e6921", "Which option is a measurable key performance indicator (KPI)?", ["Become popular", "Gain 120 landing-page visits in two weeks", "Use bright colours", "Make a nice poster"], 1, "It includes a number that can be measured and a clear timeframe."), q("e6922", "What is the best way to make campaign materials feel connected?", ["Use unrelated messages", "Use a consistent brand identity, message and call to action", "Use identical file formats", "Ignore the target customer"], 1, "A consistent identity, message and call to action help the materials support one another.")],
        }),
        topic({
          id: "enterprise-r069-3",
          code: "R069 Task 3",
          title: "Develop and practise the pitch",
          summary: "Plan the pitch, practise it, collect feedback and make useful changes.",
          keywords: ["pitch", "audience", "venue", "visual aid", "verbal communication", "non-verbal communication", "practice feedback"],
          sections: [
            { heading: "Prepare for the audience", paragraphs: ["Plan the audience, venue, resources, structure, visual aids and likely questions. Select evidence from the proposal, brand and campaign that supports a clear request or decision.", "Rehearse verbal clarity, pace, timing, eye contact, posture, gesture, notes and transitions. Record specific practice feedback and evidence what changed."], visual: { kind: "pitch-journey", title: "Practice into performance", caption: "A rehearsal has value when evidence leads to a specific change and another check.", labels: ["Plan", "Resources", "Rehearse", "Feedback", "Change", "Recheck"] } },
            { heading: "Fictional skills lab", paragraphs: ["Prepare a 90-second BrightBite mini-pitch, ask a partner to assess three named criteria and record one evidenced revision."], bullets: integrityRules },
          ],
          keyTerms: [{ term: "Pitch", definition: "A planned persuasive presentation intended to gain support for a proposal." }, { term: "Visual aid", definition: "A resource that helps an audience understand or remember information." }, { term: "Non-verbal communication", definition: "Meaning conveyed through eye contact, posture, expression, movement and gesture." }],
          commonMistakes: ["Writing slides before deciding the pitch purpose.", "Reading dense text aloud.", "Collecting feedback but showing no change."],
          examTips: ["Anticipate likely questions and prepare evidence-based answers.", "Use notes as prompts rather than a script that prevents audience contact."],
          quiz: [q("e6931", "Why should you think about possible questions before giving a pitch?", ["To avoid learning about the proposal", "To prepare clear evidence and answer confidently", "To make the pitch longer", "To replace the pitch resources"], 1, "Preparing for likely questions helps you give accurate and confident answers."), q("e6932", "Which option is an example of non-verbal communication?", ["A profit figure", "Eye contact", "A spoken explanation", "A written handout"], 1, "Eye contact communicates a message without spoken or written words.")],
        }),
        topic({
          id: "enterprise-r069-4",
          code: "R069 Task 4",
          title: "Deliver the professional pitch",
          summary: "Give a clear 5–10 minute pitch. Use good enterprise facts and more than one helpful resource.",
          keywords: ["professional pitch", "persuasion", "resources", "timing", "questions", "witness", "observation record"],
          sections: [
            { heading: "A professional performance", paragraphs: ["The assessed professional pitch lasts 5–10 minutes and communicates the proposal, brand and campaign. Use multiple suitable resource types rather than expecting slides alone to evidence everything.", "Deliver with clear structure, controlled timing and professional verbal and non-verbal communication. Demonstrate detailed knowledge when responding to questions. At least one independent person witnesses the pitch and the teacher observation record is essential evidence."], image: { src: "images/enterprise/finance-and-pitch.webp", alt: "An entrepreneur reviews costs, finance and forecast charts before presenting a product proposal and answering an audience question.", caption: "A convincing pitch connects the creative idea to evidence and financial viability, then responds confidently to questions." }, visual: { kind: "pitch-journey", title: "Pitch arc", caption: "Lead the audience from need and evidence to solution, viability and a clear next step.", labels: ["Opening", "Need", "Proposal", "Evidence", "Viability", "Request", "Questions"] } },
            { heading: "Fictional skills lab", paragraphs: ["Record a two-minute BrightBite practice excerpt using a product visual and cost summary, then self-review clarity, evidence and delivery."], bullets: integrityRules },
          ],
          keyTerms: [{ term: "Professional delivery", definition: "Clear, controlled and audience-appropriate presentation behaviour." }, { term: "Observation record", definition: "Teacher evidence documenting aspects of performance that a submitted file cannot show." }, { term: "Pitch resource", definition: "A material or object used to communicate and support the proposal." }],
          commonMistakes: ["Using slides as the only proof of delivery.", "Reading every word from the screen.", "Failing to show knowledge when questioned."],
          examTips: ["Plan several resource types that each serve a purpose.", "Practise within 5–10 minutes; do not treat timing as an afterthought."],
          quiz: [q("e6941", "How long should the professional pitch last?", ["1–2 minutes", "5–10 minutes", "15–20 minutes", "Exactly 30 minutes"], 1, "OCR states that the professional pitch should last between 5 and 10 minutes."), q("e6942", "Why are slides alone not enough as evidence of a professional pitch?", ["Slides are not allowed", "They do not show all of the delivery, interaction or use of resources", "They cannot contain text", "They replace the pitch"], 1, "An assessor must also observe how the pitch is delivered, how the presenter interacts with the audience and how other resources are used.")],
        }),
        topic({
          id: "enterprise-r069-5",
          code: "R069 Task 5",
          title: "Review and develop",
          summary: "Use evidence and feedback to review the pitch. Choose an improvement and a sensible next step.",
          keywords: ["reflection", "evidence", "feedback", "improvement", "further development", "recommendation"],
          sections: [
            { heading: "Evidence-based reflection", paragraphs: ["Review what worked, what did not and why, using feedback, observation, timing, audience response and outcomes. Connect conclusions to the pitch purpose and proposal rather than describing feelings.", "An improvement corrects or strengthens the existing work. Further development takes the enterprise forward, such as testing a new market, product variation or channel. Recommendations should be realistic and prioritised."], visual: { kind: "plan-create-review", title: "Review to next action", caption: "Evidence produces a judgement, then a specific improvement or future development.", labels: ["Evidence", "Strength/issue", "Cause", "Impact", "Action", "Priority"] } },
            { heading: "Fictional skills lab", paragraphs: ["Use fictional witness notes and campaign results to write a BrightBite review that separates one immediate improvement from one further development."], bullets: integrityRules },
          ],
          keyTerms: [{ term: "Reflection", definition: "Critical consideration of performance and outcomes using evidence." }, { term: "Improvement", definition: "A change that strengthens or corrects existing work." }, { term: "Further development", definition: "A realistic next step that extends the proposal or enterprise." }],
          commonMistakes: ["Writing only a list of strengths.", "Using vague claims such as 'be more confident'.", "Confusing an immediate correction with future enterprise development."],
          examTips: ["State the evidence before the conclusion.", "Prioritise the action with the largest likely benefit and explain why."],
          quiz: [q("e6951", "Which option would improve an existing pitch?", ["Reduce the amount of text on the slides and add a labelled cost chart", "Launch in another country next year", "Develop a new product range", "Open a second site"], 0, "This change makes the information in the current pitch clearer for the audience."), q("e6952", "Which option is the strongest evidence to use in a reflection?", ["I think it was fine", "Three viewers misunderstood the price, and the question-and-answer session showed that the slide was unclear", "I worked hard", "The colours were my favourite"], 1, "Specific evidence about the audience's response supports the conclusion." )],
        }),
      ],
    },
  ],
};

export default enterpriseCourse;
