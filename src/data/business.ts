import type { Course, QuizQuestion, Topic } from "../types";

const q = (
  id: string,
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
): QuizQuestion => ({ id, prompt, options, answer, explanation });

const topic = (value: Topic): Topic => ({ durationMinutes: 25, ...value });

export const businessCourse: Course = {
  id: "business",
  slug: "business",
  title: "Pearson Edexcel GCSE Business",
  shortTitle: "Business GCSE",
  qualification: "GCSE (9–1)",
  examBoard: "Pearson Edexcel",
  code: "1BS0",
  description:
    "Understand how small businesses start, how larger businesses grow and how evidence supports sound business decisions.",
  accent: "#2864dc",
  icon: "briefcase",
  assessmentSummary:
    "Two calculator papers, each 1 hour 45 minutes and 90 marks. Paper 1 assesses Theme 1; Paper 2 assesses Theme 2 and can draw on Theme 1 knowledge. Each paper is worth 50%.",
  answerMethod: {
    id: "business-blt",
    name: "Because, Leads To, Therefore",
    shortName: "BLT",
    scope: "MEA answer method for Pearson Edexcel GCSE Business 1BS0 only",
    pattern:
      "[Business point] because [reason]. This leads to [consequence]. Therefore, [final business effect].",
    rules: [
      "One complete BLT forms the linked explanation expected in one three-mark Explain answer.",
      "Write the business point before the word because; never start a sentence with it.",
      "This leads to must state a genuine consequence, not repeat the reason.",
      "Therefore must finish with a relevant effect such as revenue, cost, profit, cash flow, market share, productivity, reputation or survival.",
      "Use BLT as the reasoning engine in longer answers, then add the application, balance and judgement required by the command word.",
      "BLT is MEA's teaching scaffold; Pearson awards marks for knowledge, application, analysis and evaluation rather than for writing the initials.",
    ],
  },
  aliases: ["business", "gcse business", "edexcel business", "pearson business", "1bs0"],
  units: [
    {
      id: "business-theme-1",
      code: "1BS0/01",
      title: "Theme 1: Investigating small business",
      description: "How an idea becomes a small business and responds to its market and external environment.",
      assessment: "Paper 1: 1 hour 45 minutes, 90 marks, calculator allowed",
      weight: "50%",
      topics: [
        topic({
          id: "business-1-1",
          code: "1.1",
          title: "Enterprise and entrepreneurship",
          summary: "Explore changing business opportunities, entrepreneurial risk and reward, and how enterprises add value.",
          keywords: ["entrepreneur", "enterprise", "risk", "reward", "added value", "dynamic market", "USP"],
          sections: [
            {
              heading: "Change creates business opportunities",
              paragraphs: [
                "Business ideas change as technology develops, customer wants move on and existing products become obsolete. An entrepreneur watches these changes and spots an unmet need.",
                "Change creates opportunity, but it also creates threats: a successful product today may lose demand when a cheaper, faster or more convenient alternative appears.",
              ],
              visual: {
                kind: "process-flow",
                title: "From change to an opportunity",
                caption: "A change can reveal an unmet customer need and create an opportunity for a new business idea.",
                labels: ["Market change", "Unmet need", "New idea", "Opportunity"],
              },
            },
            {
              heading: "Customer needs and enterprise resources",
              paragraphs: [
                "Customer needs are the problems or wants that a product or service should meet. Common needs include price, quality, choice and convenience, but research must show which need matters most to a particular customer group.",
                "An entrepreneur organises resources to meet that need. These include people and skills, finance, materials, equipment and time. A good idea becomes an enterprise only when the resources can be combined into something customers value.",
              ],
              image: {
                src: "images/business/customer-needs-resources-value.webp",
                alt: "A bakery illustration showing customers with different needs, an entrepreneur combining people, ingredients, equipment, money and time, and a finished cake being handed to a satisfied customer.",
                caption: "Read the scene from left to right: understand what customers value, organise the resources, then create a product they are willing to buy.",
              },
              visual: {
                kind: "concept-web",
                title: "What customers may need",
                caption: "Research identifies which need matters most to this customer group; a business should not assume every customer wants the same thing.",
                labels: ["Customer needs", "Fair price", "Quality", "Choice", "Convenience", "Good service"],
              },
              visuals: [{
                kind: "concept-web",
                title: "Resources an entrepreneur organises",
                caption: "A workable enterprise needs the right mix of people, money, materials, equipment and time.",
                labels: ["Business resources", "People + skills", "Finance", "Materials", "Equipment", "Time"],
              }],
            },
            {
              heading: "Risk and reward",
              paragraphs: [
                "Risks include failure, financial loss and insecurity. Rewards include profit, independence, satisfaction and business success.",
                "Risk is uncertain: taking a larger risk does not guarantee a larger reward. The entrepreneur must compare what may be lost with what may be gained.",
              ],
              visual: {
                kind: "concept-web",
                title: "Possible risks and rewards",
                caption: "Starting a business creates possible losses and possible rewards; neither outcome is guaranteed.",
                labels: ["Risk + reward", "Failure", "Money lost", "Insecurity", "Profit", "Independence", "Satisfaction"],
              },
            },
            {
              heading: "Creating added value",
              paragraphs: [
                "Added value is the difference between the selling price and the cost of bought-in materials. Convenience, branding, quality, design and a unique selling point can persuade customers to pay more.",
              ],
              formula: "Added value = selling price − cost of bought-in materials",
              example:
                "A bakery sells a decorated cake for £28 using £9 of ingredients. It adds £19 of value through design, skill and convenience.",
              visual: {
                kind: "process-flow",
                title: "How a business creates added value",
                caption: "Resources and enterprise activity turn bought-in materials into a product that customers are willing to buy at a higher price.",
                labels: ["Bought-in items", "Skill + design", "Customer benefit", "Selling price", "Added value"],
              },
            },
          ],
          keyTerms: [
            { term: "Entrepreneur", definition: "A person who organises resources, makes decisions and takes the risk of starting or running an enterprise." },
            { term: "Enterprise", definition: "A business or project that supplies goods or services to meet customer needs." },
            { term: "Obsolete", definition: "No longer wanted or useful because a newer alternative has replaced it." },
            { term: "Added value", definition: "Selling price minus the cost of bought-in materials." },
            { term: "Unique selling point", definition: "A feature or benefit that distinguishes a product from competitors." },
          ],
          commonMistakes: [
            "Treating revenue as the entrepreneur's reward instead of profit.",
            "Saying risk always produces reward; the outcome is uncertain.",
            "Confusing added value with simply increasing the selling price.",
          ],
          examTips: [
            "Link the entrepreneurial characteristic to what it enables the person to do.",
            "A strong BLT ends with a measurable business effect rather than 'the business will be better'.",
          ],
          quiz: [
            q("b111", "Which change is most likely to create a new business opportunity?", ["Customer needs never change", "A new technology makes home delivery cheaper", "Every competitor charges the same price", "A product has no customers"], 1, "Cheaper delivery can create a new, convenient service that was not viable before."),
            q("b112", "A product sells for £35 and uses £12 of bought-in materials. What is its added value?", ["£12", "£23", "£35", "£47"], 1, "£35 − £12 = £23."),
          ],
          examQuestions: [
            {
              id: "b11-e1",
              command: "Explain",
              marks: 3,
              prompt: "Explain one reward of becoming an entrepreneur.",
              guidance: ["Write one complete BLT.", "Place the point before because.", "End with the effect on the entrepreneur or business."],
              model: "An entrepreneur may gain independence because they can make their own business decisions. This leads to greater control over how the enterprise operates. Therefore, the entrepreneur may gain more satisfaction from pursuing their own idea.",
            },
          ],
        }),
        topic({
          id: "business-1-2",
          code: "1.2",
          title: "Spotting a business opportunity",
          summary: "Use customer needs, market research, segmentation and competitor evidence to identify an opportunity.",
          keywords: ["customer needs", "primary research", "secondary research", "qualitative", "quantitative", "segmentation", "market map"],
          sections: [
            {
              heading: "Understand customers with research",
              paragraphs: [
                "Customers commonly value price, quality, choice and convenience. Research helps a business understand which needs matter, identify a market gap and reduce uncertainty.",
                "Primary research is collected first-hand for a specific purpose. Secondary research already exists. Quantitative data measures amounts; qualitative data explains views and reasons.",
              ],
              bullets: [
                "Primary: surveys, questionnaires, focus groups and observation.",
                "Secondary: websites, market reports and government publications.",
                "Check sample size, bias, question design, relevance and how current the data is.",
              ],
              visual: {
                kind: "research-cycle",
                title: "Market research cycle",
                caption: "Research should lead to a decision, not stop at data collection.",
                labels: ["Set aim", "Collect data", "Analyse", "Decide + review"],
              },
            },
            {
              heading: "Target and compete",
              paragraphs: [
                "Segmentation divides a market by location, demographics, behaviour, lifestyle or income. A business can then adapt product, price, promotion and place for a chosen segment.",
                "Competitor research compares price, quality, location, range and service. A market map plots two features, often price and quality, to reveal crowded positions and possible gaps.",
              ],
              example: "A market-map gap is only an opportunity if research shows enough customers want it and the business can supply it profitably.",
              visual: {
                kind: "pitch-journey",
                title: "From research to a targeted offer",
                caption: "Evidence identifies a segment, which guides a more suitable marketing mix and customer offer.",
                labels: ["Research", "Segment", "Target customer", "Marketing mix", "Customer response"],
              },
            },
          ],
          keyTerms: [
            { term: "Primary research", definition: "New data collected first-hand for the business's current purpose." },
            { term: "Secondary research", definition: "Existing data originally collected by someone else or for another purpose." },
            { term: "Qualitative data", definition: "Descriptive information about opinions, motives and experiences." },
            { term: "Quantitative data", definition: "Numerical information that can be counted, measured or compared." },
            { term: "Market segmentation", definition: "Dividing a market into groups with shared characteristics." },
            { term: "Market map", definition: "A diagram positioning competing products using two characteristics." },
          ],
          commonMistakes: [
            "Calling all online research secondary; an online questionnaire is primary research.",
            "Assuming a large sample cannot be biased.",
            "Describing a segment without explaining how it changes a decision.",
          ],
          examTips: ["Apply research reliability to the actual method and sample.", "Use source evidence inside the reasoning rather than copying it as a separate sentence."],
          quiz: [
            q("b121", "Which example is qualitative primary research?", ["A government population table", "Written explanations from a focus group", "Competitor prices copied from a website", "The number of weekly sales"], 1, "A focus group collects first-hand information. Written explanations are qualitative because they use words rather than numbers."),
            q("b122", "What is the strongest reason to segment a market?", ["It removes all competition", "It guarantees profit", "It helps tailor the marketing mix to a chosen customer group", "It makes research unnecessary"], 2, "Segmentation supports more focused product, price, promotion and distribution decisions."),
          ],
          examQuestions: [
            { id: "b12-e1", command: "Analyse", marks: 6, prompt: "A small gym targets local students with a low monthly income. Analyse how market segmentation could affect its marketing decisions.", guidance: ["Use the student and income context throughout.", "Build developed BLT chains.", "Link the decisions to demand, revenue or profit."] },
          ],
        }),
        topic({
          id: "business-1-3",
          code: "1.3",
          title: "Putting a business idea into practice",
          summary: "Set objectives, calculate performance, manage cash and select suitable finance.",
          keywords: ["objective", "revenue", "fixed cost", "variable cost", "profit", "break-even", "cash flow", "finance"],
          sections: [
            {
              heading: "Objectives and core calculations",
              paragraphs: [
                "Aims give direction. A start-up may prioritise survival and financial security before profit, sales, market share or social objectives. Objectives change with circumstances.",
                "Revenue is money earned from sales, while profit is what remains after total costs. Fixed costs do not change directly with output; total variable costs do.",
              ],
              formula: "Revenue = price × quantity; total cost = fixed cost + variable cost; profit = revenue − total cost",
              visual: {
                kind: "pitch-journey",
                title: "From sales to profit or loss",
                caption: "Price multiplied by quantity gives revenue; total costs are then deducted to find profit or loss.",
                labels: ["Price × quantity", "Revenue", "Total costs", "Profit or loss"],
              },
            },
            {
              heading: "Break-even and margin of safety",
              paragraphs: [
                "Break-even is the output where total revenue equals total cost, so profit is zero. Contribution per unit is the amount each sale contributes to fixed costs and then profit.",
                "Margin of safety shows how far actual or forecast sales can fall before reaching break-even. Changes in price, variable cost or fixed cost move the break-even position.",
              ],
              formula: "Break-even output = fixed costs ÷ (selling price − variable cost per unit)",
              visual: {
                kind: "break-even",
                title: "Break-even chart",
                caption: "Break-even is where the total-revenue line crosses total costs; the gap beyond it represents profit.",
                labels: ["Total costs", "Sales revenue", "Break-even"],
                values: [0, 100, 200, 300],
              },
              example: "Fixed costs of £2,400 and contribution of £6 give break-even output of 400 units.",
            },
            {
              heading: "Cash flow and finance",
              paragraphs: [
                "Cash flow records when money enters and leaves. A profitable business can run out of cash if customers pay late or bills fall due before sales receipts arrive.",
                "Short-term finance includes overdraft and trade credit. Longer-term choices include savings, loans, venture capital, share capital, retained profit and crowdfunding. Suitability depends on amount, purpose, duration, cost, risk and control.",
              ],
              formula: "Net cash flow = inflows − outflows; closing balance = opening balance + net cash flow",
              visual: { kind: "cash-flow", title: "Cash-flow movement", caption: "Inflows minus outflows give net cash flow; adding this to the opening balance gives the closing balance.", labels: ["Cash inflows", "Cash outflows", "Net cash flow", "Closing balance"] },
            },
          ],
          keyTerms: [
            { term: "Revenue", definition: "Money received from sales before costs are deducted." },
            { term: "Fixed cost", definition: "A cost that does not change directly when output changes." },
            { term: "Variable cost", definition: "A cost that changes as output changes." },
            { term: "Break-even", definition: "The output at which total revenue equals total cost." },
            { term: "Margin of safety", definition: "Actual or forecast sales minus break-even sales." },
            { term: "Cash flow", definition: "The movement of money into and out of a business over time." },
          ],
          commonMistakes: ["Confusing revenue, profit and cash.", "Using total variable cost instead of variable cost per unit in break-even.", "Choosing finance without considering duration, cost and control."],
          examTips: ["Formulae are not supplied: recall, substitute, calculate, label and interpret.", "After calculating, state what the result means for the named business."],
          quiz: [
            q("b131", "A business sells 600 units at £15. Total costs are £7,200. What is profit?", ["£1,800", "£7,200", "£9,000", "£16,200"], 0, "Revenue is £9,000; £9,000 − £7,200 = £1,800 profit."),
            q("b132", "Why might a profitable business still have a negative cash balance?", ["Profit and cash are identical", "Customers pay after supplier bills are due", "Fixed costs disappear", "Sales revenue cannot create cash"], 1, "The business may not receive cash from customers before it must pay its bills. This can cause a negative cash balance even when the business makes a profit."),
          ],
          examQuestions: [
            { id: "b13-e1", command: "Calculate", marks: 2, prompt: "A café has fixed costs of £9,000. Each meal sells for £12 and has a variable cost of £7. Calculate break-even output.", guidance: ["Calculate contribution first.", "Show substitution and give the answer in meals."], model: "Contribution = £12 − £7 = £5. Break-even output = £9,000 ÷ £5 = 1,800 meals." },
          ],
        }),
        topic({
          id: "business-1-4",
          code: "1.4",
          title: "Making the business effective",
          summary: "Choose ownership, location and an integrated marketing mix, supported by a realistic business plan.",
          keywords: ["sole trader", "partnership", "limited liability", "franchise", "location", "marketing mix", "business plan"],
          sections: [
            {
              heading: "Ownership and liability",
              paragraphs: [
                "Sole traders and partnerships are simple and offer control but normally have unlimited liability. A private limited company has a separate legal identity and limited liability, but faces more administration and shared ownership.",
                "A franchisee buys the right to trade under an established brand and system. Support and recognition reduce some risk, while fees and rules limit independence.",
              ],
              visual: {
                kind: "stakeholder-map",
                title: "What shapes an ownership decision",
                caption: "Choose a form of ownership by comparing control, liability, finance and administration, not by name alone.",
                labels: ["Sole trader", "Partnership", "Ltd company", "Control", "Liability", "Finance"],
              },
            },
            {
              heading: "Location and the four Ps",
              paragraphs: [
                "Location depends on customers, labour, materials, competitors, costs, infrastructure, the activity and how far e-commerce reduces the need for a physical site.",
                "Product, price, promotion and place must reinforce one another and fit the target market. A premium product, for example, usually needs quality cues and suitable promotion rather than an inconsistent bargain image.",
              ],
              visual: { kind: "marketing-mix", title: "The integrated marketing mix", caption: "Each P affects the other three and the customer's overall perception.", labels: ["Product", "Price", "Promotion", "Place"] },
            },
            {
              heading: "Business plans",
              paragraphs: [
                "A business plan records the idea, objectives, research, marketing, location, people and finances. It can coordinate action, measure progress and support a finance application.",
                "A plan reduces uncertainty rather than removing it. Forecasts may be biased or outdated, and unexpected competitors, costs or economic change can make assumptions wrong.",
              ],
              visual: {
                kind: "plan-create-review",
                title: "A business plan is used and reviewed",
                caption: "Research informs the plan; action produces results that can be checked against objectives and used to update it.",
                labels: ["Research", "Plan", "Act", "Review"],
              },
            },
          ],
          keyTerms: [
            { term: "Unlimited liability", definition: "The owner is personally responsible for business debts." },
            { term: "Limited liability", definition: "Owners normally risk only the amount invested in the company." },
            { term: "Franchise", definition: "The right to operate using another business's established brand and system." },
            { term: "Marketing mix", definition: "The coordinated product, price, promotion and place decisions of a business." },
            { term: "Business plan", definition: "A written document setting out the idea, objectives, market, operations and financial forecasts." },
          ],
          commonMistakes: ["Calling a franchise a form of legal ownership.", "Assuming limited liability prevents the company itself owing debts.", "Listing the four Ps without explaining their interdependence."],
          examTips: ["Compare ownership choices against the entrepreneur's priorities.", "When evaluating a location, identify which factor is decisive for this type of business."],
          quiz: [
            q("b141", "Which benefit is most associated with forming a private limited company?", ["No paperwork", "Limited liability", "No owners", "Guaranteed profit"], 1, "Shareholders normally limit their personal financial risk to their investment."),
            q("b142", "Why must the four Ps be integrated?", ["Every business must use the same mix", "One decision changes how the other decisions are perceived and work", "Price is always the only important P", "It removes the need for research"], 1, "The elements combine to create one customer offer and therefore need to fit together."),
          ],
        }),
        topic({
          id: "business-1-5",
          code: "1.5",
          title: "Understanding external influences",
          summary: "Assess stakeholder pressures and how technology, law and the economy affect business decisions.",
          keywords: ["stakeholder", "e-commerce", "legislation", "inflation", "interest rate", "exchange rate", "external influence"],
          sections: [
            {
              heading: "Stakeholders",
              paragraphs: [
                "Owners, employees, customers, suppliers, government and the local community have different objectives and influence. Their interests can conflict but they are interdependent.",
                "A wage increase may support employee motivation but raise owner costs; a successful decision weighs power, objectives and the long-term relationship.",
              ],
              visual: { kind: "stakeholder-map", title: "Stakeholder relationships", caption: "Decisions create linked benefits, costs and conflicts around the business.", labels: ["Owners", "Employees", "Customers", "Suppliers", "Community", "Government"] },
            },
            {
              heading: "Technology and legislation",
              paragraphs: [
                "E-commerce, social media, digital communication and electronic payment can expand reach and improve productivity, but bring investment, training, security and competitive pressures.",
                "Consumer, employment and health-and-safety law can raise compliance costs while protecting people and strengthening trust. The effect depends on the required change and the business's resources.",
              ],
              visual: {
                kind: "stakeholder-map",
                title: "Technology and law around a business",
                caption: "Technology creates opportunities, while different laws shape how the business treats data, employees and customers.",
                labels: ["Technology", "Data law", "Employment", "Equality", "Safety", "Consumers"],
              },
            },
            {
              heading: "The economy",
              paragraphs: [
                "Income and unemployment influence demand. Inflation changes prices and costs. Interest rates affect borrowing and saving. Taxation affects costs and disposable income.",
                "Exchange-rate movements change import costs and export prices. Businesses cannot control the economy, but can alter suppliers, prices, finance and product positioning in response.",
              ],
              visual: {
                kind: "pitch-journey",
                title: "How an economic change reaches a business",
                caption: "An economic change affects costs or customer spending before it changes business revenue, profit or decisions.",
                labels: ["Economic change", "Costs or spending", "Demand", "Revenue + profit", "Business response"],
              },
            },
          ],
          keyTerms: [
            { term: "Stakeholder", definition: "A person or group with an interest in, or affected by, a business." },
            { term: "Inflation", definition: "A sustained rise in the general price level." },
            { term: "Interest rate", definition: "The percentage cost of borrowing or reward for saving." },
            { term: "Exchange rate", definition: "The value of one currency measured in another." },
            { term: "Legislation", definition: "Laws that businesses must follow." },
          ],
          commonMistakes: ["Calling all stakeholders shareholders.", "Claiming every law only creates cost.", "Stating an economic change without tracing its effect on a specific cost, demand or decision."],
          examTips: ["Use the business's position as importer, exporter, borrower or seller before explaining an economic effect.", "In evaluation, identify the stakeholder or condition that matters most."],
          quiz: [
            q("b151", "Which group is a stakeholder but not necessarily a shareholder?", ["Local residents", "Only company owners", "Only directors", "No one"], 0, "Local residents can be affected by traffic, jobs or pollution without owning shares."),
            q("b152", "A UK manufacturer imports components priced in euros. What is the likely direct effect if the pound weakens against the euro?", ["Import costs fall", "Import costs rise", "All demand becomes zero", "Interest rates must fall"], 1, "Each euro costs more pounds, increasing the sterling cost of imported components."),
          ],
          examQuestions: [
            { id: "b15-e1", command: "Evaluate", marks: 12, prompt: "A small online clothing business is considering switching to ethically sourced materials that cost more. Evaluate whether it should make the change.", guidance: ["Use applied BLTs for likely benefits and limitations.", "Consider price, customers, reputation, costs and competitors.", "Reach a justified decision with a decisive condition and time horizon."] },
          ],
        }),
      ],
    },
    {
      id: "business-theme-2",
      code: "1BS0/02",
      title: "Theme 2: Building a business",
      description: "How established businesses grow and make marketing, operational, financial and people decisions.",
      assessment: "Paper 2: 1 hour 45 minutes, 90 marks, calculator allowed",
      weight: "50%",
      topics: [
        topic({
          id: "business-2-1",
          code: "2.1",
          title: "Growing the business",
          summary: "Compare growth routes and assess global, ethical and environmental decisions.",
          keywords: ["organic growth", "merger", "takeover", "economies of scale", "diseconomies", "globalisation", "multinational", "ethics"],
          sections: [
            {
              heading: "Routes and consequences of growth",
              paragraphs: [
                "Organic growth comes from the business's own activity, such as new products or markets. Inorganic growth occurs through merger or takeover and may be faster but creates integration risks.",
                "Economies of scale lower average cost as output grows through purchasing, technical, financial or managerial advantages. Diseconomies can arise when communication, coordination and motivation weaken.",
              ],
              image: {
                src: "images/business/growth-and-operations.webp",
                alt: "A visual story moving from a home-based online business to a staffed warehouse, quality checks, delivery and international growth.",
                caption: "Growth changes much more than sales: premises, people, stock, quality, communication and distribution all have to scale together.",
              },
              visual: {
                kind: "stakeholder-map",
                title: "Routes to business growth",
                caption: "A business can grow internally or use external routes; each changes speed, cost, control and risk.",
                labels: ["New outlets", "New products", "Franchise", "Merger", "Takeover", "Integration"],
              },
            },
            {
              heading: "Changing objectives and finance",
              paragraphs: [
                "Growth can shift objectives towards market share, profit, shareholder returns or international reach. A public limited company can sell shares publicly but faces scrutiny and possible loss of control.",
                "Finance choices include retained profit, loans and share capital. The right option depends on scale, cost, risk and owners' willingness to share control.",
              ],
              visual: {
                kind: "pitch-journey",
                title: "Growth changes objectives and finance",
                caption: "A new stage of growth can change objectives, which changes the amount and type of finance required.",
                labels: ["Growth stage", "New objective", "Finance needed", "Funding choice", "Effect on control"],
              },
            },
            {
              heading: "Globalisation, ethics and environment",
              paragraphs: [
                "Globalisation expands markets and supply choices but intensifies competition and exposes firms to exchange rates, trade barriers, regulation and cultural differences.",
                "Ethical sourcing and sustainability can raise costs yet protect reputation, meet stakeholder expectations and support long-term resilience. International marketing may need adapting to income, culture and law.",
              ],
              visual: { kind: "stakeholder-map", title: "Growth trade-offs", caption: "Growth decisions affect costs, control, customers, employees, communities and the environment.", labels: ["Scale", "Cost", "Control", "Culture", "Stakeholders", "Risk"] },
            },
          ],
          keyTerms: [
            { term: "Organic growth", definition: "Expansion through the business's own activities." },
            { term: "Merger", definition: "Two businesses agree to combine into one organisation." },
            { term: "Takeover", definition: "One business gains control of another." },
            { term: "Economy of scale", definition: "A reduction in average unit cost as the scale of operation increases." },
            { term: "Globalisation", definition: "Increasing international connection of markets, businesses and production." },
            { term: "Multinational", definition: "A business operating in more than one country." },
          ],
          commonMistakes: ["Saying all growth lowers unit costs.", "Confusing merger with organic growth.", "Assuming ethical decisions cannot improve profit in the long term."],
          examTips: ["Separate speed of growth from risk and control.", "For international expansion, apply culture, income, law or exchange rates to the named market."],
          quiz: [
            q("b211", "Which example shows organic growth?", ["Buying a competitor", "Merging with a supplier", "Opening stores using retained profit", "Being taken over"], 2, "The business grows by opening its own stores and using internal finance."),
            q("b212", "Which example is a possible diseconomy of scale?", ["A bulk-buying discount", "A specialist manager", "Slower communication through many layers", "Cheaper finance"], 2, "Having more management layers and business sites can make communication slower or less accurate."),
          ],
          examQuestions: [
            { id: "b21-e1", command: "Justify", marks: 9, prompt: "A successful regional food producer can grow by opening its own factory or taking over a smaller competitor. Justify which option it should choose.", guidance: ["Choose one option and apply BLT reasoning.", "You may fully develop one option; equal treatment is not compulsory.", "End with a contextual judgement based on speed, finance, capacity or integration risk."] },
          ],
        }),
        topic({
          id: "business-2-2",
          code: "2.2",
          title: "Making marketing decisions",
          summary: "Combine product, price, promotion and place to fit a target market and competitive situation.",
          keywords: ["design mix", "product life cycle", "extension strategy", "pricing", "promotion", "distribution", "marketing mix"],
          sections: [
            {
              heading: "Product decisions",
              paragraphs: [
                "The design mix balances function, aesthetics and cost. Differentiation and added value help a product stand out.",
                "The product life cycle moves through development, introduction, growth, maturity and decline. Advertising, redesign, new uses or new markets can extend sales, but cannot guarantee renewed demand.",
              ],
              visual: { kind: "product-life-cycle", title: "Product life cycle", caption: "Sales commonly rise from introduction to growth, level during maturity and then decline; an extension strategy aims to delay that decline.", labels: ["Introduction", "Growth", "Maturity", "Decline"] },
            },
            {
              heading: "Price and promotion",
              paragraphs: [
                "Cost-plus adds a mark-up; competitive pricing follows rivals; penetration starts low to build sales; skimming starts high for a distinctive new product; promotional pricing is temporarily reduced.",
                "Advertising, sponsorship, trials, special offers and branding should fit the audience, objective, budget and product. Digital promotion can target and measure response but also competes for attention.",
              ],
              visual: {
                kind: "stakeholder-map",
                title: "Pricing and promotion choices",
                caption: "The business chooses methods that fit its product, audience, objective, competitors and budget.",
                labels: ["Cost-plus", "Competitive", "Penetration", "Skimming", "Advertising", "Sales offers"],
              },
            },
            {
              heading: "Place and integration",
              paragraphs: [
                "Place covers distribution through retailers, wholesalers, e-commerce and multiple channels. Each route changes reach, cost, control and customer convenience.",
                "The four Ps must tell one coherent story. Technology, competitors and target-market behaviour can require the whole mix to change.",
              ],
              visual: { kind: "marketing-mix", title: "One customer offer", caption: "Evaluate the combination, not four isolated lists.", labels: ["Product", "Price", "Promotion", "Place", "Target customer"] },
            },
          ],
          keyTerms: [
            { term: "Design mix", definition: "The balance of function, aesthetics and cost in product design." },
            { term: "Extension strategy", definition: "Action intended to prolong a product's life or sales." },
            { term: "Penetration pricing", definition: "Setting a low launch price to gain customers or market share." },
            { term: "Price skimming", definition: "Setting a high launch price before reducing it over time." },
            { term: "Distribution channel", definition: "The route a product takes from producer to customer." },
          ],
          commonMistakes: ["Calling development the highest-sales stage.", "Choosing a pricing strategy from definition alone without objective or context.", "Describing promotion as automatically increasing profit without considering cost and conversion."],
          examTips: ["Explain how one P changes another.", "Use product stage, audience and objective to justify an extension strategy."],
          quiz: [
            q("b221", "A new, innovative games console launches at a very high price. Which strategy is this?", ["Penetration", "Skimming", "Cost-plus only", "Promotional"], 1, "Skimming takes advantage of early customers willing to pay more."),
            q("b222", "Why can an extension strategy fail?", ["It always removes the product", "Customer needs may have permanently moved to substitutes", "It makes promotion illegal", "Maturity never ends"], 1, "Redesign or promotion cannot restore demand if the underlying need or technology has changed."),
          ],
        }),
        topic({
          id: "business-2-3",
          code: "2.3",
          title: "Making operational decisions",
          summary: "Select production, suppliers, stock and quality methods that deliver efficiently and satisfy customers.",
          keywords: ["job production", "batch production", "flow production", "productivity", "JIT", "procurement", "quality assurance", "sales process"],
          sections: [
            {
              heading: "Production and technology",
              paragraphs: [
                "Job production creates one customised item; batch produces groups; flow uses continuous standardised stages. The choice trades flexibility against speed, consistency and unit cost.",
                "Technology may improve precision and productivity, but needs investment, maintenance and training and may reduce flexibility or employment.",
              ],
              visual: {
                kind: "stakeholder-map",
                title: "Choosing a production method",
                caption: "Job, batch and flow production create different trade-offs between volume, variety and unit cost.",
                labels: ["Job", "Batch", "Flow", "Volume", "Variety", "Unit cost"],
              },
            },
            {
              heading: "Suppliers, stock and logistics",
              paragraphs: [
                "Supplier choice considers price, quality, reliability, capacity, trust and location. Procurement obtains inputs; logistics moves and stores them.",
                "Just in time keeps little inventory and lowers storage cost, but disruption can stop production. Buffer stock protects continuity but ties up cash and risks waste or obsolescence.",
              ],
              visual: {
                kind: "pitch-journey",
                title: "The supply chain into production",
                caption: "Procurement chooses inputs, logistics delivers them and stock policy affects whether production can continue smoothly.",
                labels: ["Procurement", "Supplier", "Delivery", "Stock", "Production"],
              },
            },
            {
              heading: "Quality and sales",
              paragraphs: [
                "Quality control inspects output, often after production. Quality assurance designs quality into every process and makes all employees responsible.",
                "Product knowledge, efficient service, engagement, feedback and after-sales support influence satisfaction, repeat purchase, reputation and revenue.",
              ],
              visual: {
                kind: "pitch-journey",
                title: "From quality to business performance",
                caption: "Preventing faults and serving customers well can improve satisfaction, repeat purchases, reputation and revenue.",
                labels: ["Quality process", "Fewer faults", "Satisfaction", "Repeat purchase", "Revenue"],
              },
            },
          ],
          keyTerms: [
            { term: "Productivity", definition: "Output produced per unit of input, such as per worker or hour." },
            { term: "Just in time", definition: "Receiving stock close to when it is needed, keeping inventory low." },
            { term: "Procurement", definition: "Obtaining the supplies and resources a business needs." },
            { term: "Quality control", definition: "Checking output to identify defects." },
            { term: "Quality assurance", definition: "Preventing defects through quality-focused processes throughout production." },
          ],
          commonMistakes: ["Calling flow production suitable for every customised product.", "Saying JIT means no stock under any circumstances.", "Confusing quality assurance with a final inspection."],
          examTips: ["Link the production method to volume, variety and customer needs.", "For JIT, evaluate reliability of supply and cost of disruption against stockholding cost."],
          quiz: [
            q("b231", "Which production method is best for making thousands of identical drinks each day?", ["Job production", "Flow production", "One-off production", "Handmade custom production"], 1, "Flow production is suitable for making a large number of standardised products."),
            q("b232", "What is the main operational risk of JIT?", ["Too much warehouse space", "A late delivery can stop production", "Stock must become more expensive", "Quality assurance becomes impossible"], 1, "Little buffer stock means disruption can halt operations."),
          ],
          examQuestions: [
            { id: "b23-e1", command: "Discuss", marks: 6, prompt: "Discuss the impact on a business of using quality assurance.", guidance: ["Build two relevant BLT chains.", "This Section A-style Discuss question does not require case application or a final judgement.", "Consider prevention, employees, costs, reputation or repeat purchase."] },
          ],
        }),
        topic({
          id: "business-2-4",
          code: "2.4",
          title: "Making financial decisions",
          summary: "Calculate profit measures and use financial evidence carefully to judge performance and investment.",
          keywords: ["gross profit", "net profit", "gross profit margin", "net profit margin", "ARR", "performance data"],
          sections: [
            {
              heading: "Profit and margins",
              paragraphs: [
                "Gross profit shows what remains after cost of sales. Net profit deducts other operating expenses and interest. Margins express profit as a percentage of revenue, allowing fairer comparison across years or businesses of different sizes.",
              ],
              formula: "Gross profit = revenue − cost of sales; net profit = gross profit − other operating expenses and interest",
              visual: { kind: "pitch-journey", title: "From revenue to net profit", caption: "Cost of sales is deducted to find gross profit; other operating expenses and interest are then deducted to find net profit.", labels: ["Revenue", "− Cost of sales", "Gross profit", "− Other expenses", "Net profit"] },
            },
            {
              heading: "Percentages and investment",
              paragraphs: [
                "Gross and net profit margins show how much profit is generated for every £1 of revenue. Average rate of return estimates annual profit as a percentage of an investment's cost.",
              ],
              formula: "Gross/net profit margin = relevant profit ÷ revenue × 100; ARR = average annual profit ÷ investment cost × 100",
              visual: {
                kind: "pitch-journey",
                title: "Turn a profit figure into a percentage",
                caption: "Choose the relevant profit, divide by revenue or investment cost, multiply by 100 and interpret the percentage.",
                labels: ["Profit figure", "Divide", "× 100", "Percentage", "Interpret"],
              },
            },
            {
              heading: "Interpreting performance",
              paragraphs: [
                "A calculation is evidence, not a decision by itself. Compare over time, against objectives or competitors, then investigate causes such as prices, costs, product mix and one-off events.",
                "Quantitative data may be historic, incomplete or distorted. Qualitative evidence about quality, employees, customer response and future risk may change the judgement.",
              ],
              visual: {
                kind: "pitch-journey",
                title: "From calculation to a supported judgement",
                caption: "A result becomes useful when it is compared, explained and combined with qualitative evidence before a decision is made.",
                labels: ["Calculate", "Compare", "Find causes", "Add context", "Judge"],
              },
            },
          ],
          keyTerms: [
            { term: "Gross profit", definition: "Sales revenue minus cost of sales." },
            { term: "Net profit", definition: "Gross profit minus other operating expenses and interest." },
            { term: "Profit margin", definition: "Profit expressed as a percentage of sales revenue." },
            { term: "Average rate of return", definition: "Average annual profit as a percentage of the original investment cost." },
          ],
          commonMistakes: ["Using cost of sales as the denominator for a profit margin.", "Confusing a larger profit amount with a better margin.", "Presenting ARR without considering risk, time and alternative investments."],
          examTips: ["Memorise every formula; none is supplied.", "Always interpret the percentage for the named decision."],
          quiz: [
            q("b241", "Revenue is £500,000 and gross profit is £150,000. What is the gross profit margin?", ["15%", "30%", "35%", "70%"], 1, "£150,000 ÷ £500,000 × 100 = 30%."),
            q("b242", "Why is margin often more useful than profit when comparing two differently sized businesses?", ["It ignores revenue", "It measures profit relative to revenue", "It guarantees future performance", "It includes all qualitative evidence"], 1, "A percentage controls for differences in sales scale."),
          ],
        }),
        topic({
          id: "business-2-5",
          code: "2.5",
          title: "Making human resource decisions",
          summary: "Design structures, recruit and train effectively, and choose motivation methods that fit employees and objectives.",
          keywords: ["hierarchy", "span of control", "chain of command", "delegation", "recruitment", "training", "motivation"],
          sections: [
            {
              heading: "Structures and communication",
              paragraphs: [
                "Tall hierarchies have more layers and often narrower spans; flat structures have fewer layers and often wider spans. Centralisation keeps decisions near senior leaders, while decentralisation gives lower levels or locations more authority.",
                "Delegation can speed local decisions and motivate employees, but needs capable staff, clear accountability and appropriate control.",
              ],
              visual: {
                kind: "stakeholder-map",
                title: "How organisation structure fits together",
                caption: "Layers, span, chain of command, delegation and decision location shape communication and control.",
                labels: ["Layers", "Span", "Command chain", "Delegation", "Centralised", "Decentralised"],
              },
            },
            {
              heading: "Recruitment and training",
              paragraphs: [
                "Job analysis informs a job description and person specification. Internal recruitment uses existing employees; external recruitment widens the pool and can bring new ideas.",
                "Induction introduces the organisation. On-the-job training is practical and contextual; off-the-job training can provide specialist expertise away from daily pressures.",
              ],
              visual: {
                kind: "pitch-journey",
                title: "Recruitment into training",
                caption: "Job analysis defines the role and ideal applicant before selection, induction and further training.",
                labels: ["Job analysis", "Role documents", "Recruit + select", "Induction", "Training"],
              },
            },
            {
              heading: "Motivation",
              paragraphs: [
                "Financial methods include pay, bonus, commission and promotion. Non-financial methods include rotation, enrichment, autonomy and development.",
                "The most effective method depends on the role and person. Motivation can improve productivity, quality, retention and customer service, but incentives must reward the desired behaviour.",
              ],
              visual: { kind: "pitch-journey", title: "People-performance chain", caption: "A suitable motivation method can change employee behaviour, which affects customers and business performance.", labels: ["Motivation", "Employee effort", "Productivity", "Customer service", "Business result"] },
            },
          ],
          keyTerms: [
            { term: "Span of control", definition: "The number of employees directly managed by one manager." },
            { term: "Chain of command", definition: "The route through which authority and communication pass in an organisation." },
            { term: "Delegation", definition: "Passing authority for a task or decision to a subordinate while retaining accountability." },
            { term: "Job description", definition: "A document describing duties, responsibilities and conditions of a role." },
            { term: "Person specification", definition: "The skills, qualifications and attributes required from an applicant." },
            { term: "Job enrichment", definition: "Giving a role greater responsibility, challenge or meaningful control." },
          ],
          commonMistakes: ["Confusing span of control with chain of command.", "Claiming delegation removes the manager's accountability.", "Assuming money motivates every employee in every role."],
          examTips: ["Trace HR decisions to productivity, retention, service, cost or revenue.", "Evaluate a method against role, skill level, budget and time horizon."],
          quiz: [
            q("b251", "Which document describes the ideal applicant's skills and qualifications?", ["Job description", "Person specification", "Cash-flow forecast", "Organisation chart"], 1, "The person specification states what the applicant should bring to the role."),
            q("b252", "Which option is a form of non-financial motivation?", ["Commission", "A bonus", "Job enrichment", "Higher hourly pay"], 2, "Job enrichment gives an employee more challenge or responsibility without directly increasing their pay."),
          ],
          examQuestions: [
            { id: "b25-e1", command: "Evaluate", marks: 12, prompt: "A rapidly growing restaurant chain plans to decentralise decisions to restaurant managers. Evaluate whether decentralisation is likely to improve its performance.", guidance: ["Build applied BLTs on local speed/knowledge and consistency/control.", "Use the growth and restaurant context throughout.", "Conclude with the decisive condition, such as manager capability or strength of operating standards."] },
          ],
        }),
      ],
    },
  ],
};

export default businessCourse;
