import { publishedContentOverride } from "../content/published";
import type { SimpleTopicGuide, SimpleVisualSpec } from "../types";
export type { SimpleSection, SimpleTopicGuide, SimpleVisualSpec } from "../types";

export const baselineEnterpriseSimpleGuides: SimpleTopicGuide[] = [
  {
    topicId: "enterprise-r067-1",
    bigIdea: "People use different skills to start and run an enterprise. They may gain rewards, but they also face risks.",
    sections: [
      { heading: "Enterprise characteristics", simpleHeading: "Skills an entrepreneur needs", explanation: ["An entrepreneur is a person who starts or runs an enterprise.", "Creativity means thinking of ideas. Innovation means turning an idea into something new or better.", "Confidence helps a person share an idea. Determination helps them keep trying when something goes wrong.", "Communication means sharing information clearly. Negotiation means trying to reach an agreement."], steps: ["Name the skill.", "Say what the entrepreneur does with it.", "Explain how this may help the enterprise."], example: "Aisha uses negotiation to ask for a lower supplier price. This may lower her costs." },
      { heading: "Risk and reward", simpleHeading: "What could be gained or lost", explanation: ["A risk is something that might go wrong. A reward is something good the entrepreneur may gain.", "Money can be lost if the enterprise fails. The owner may also feel stress or have less free time.", "Possible rewards include profit, independence and feeling proud."], steps: ["Think about how likely the risk is.", "Think about how serious it would be.", "Compare the risk with the possible reward."], example: "Sam uses £2,000 of savings. The risk is losing the money. The reward could be earning profit and being their own boss." },
    ],
  },
  {
    topicId: "enterprise-r067-2",
    bigIdea: "Market research helps an enterprise learn what customers want before making a decision.",
    sections: [
      { heading: "Research for a decision", simpleHeading: "Finding useful information", explanation: ["Primary research is new information you collect yourself.", "A questionnaire, interview or focus group can be primary research.", "Secondary research is information that already exists. This could be a website, report or government table.", "Research can help choose a product, price, place to sell or way to promote."], steps: ["Decide what you need to find out.", "Choose a suitable research method.", "Collect the information.", "Use the findings to make a decision."], example: "A snack enterprise asks students which flavour they prefer. It uses the most popular answer when choosing its first product." },
      { heading: "Data, reliability and segmentation", simpleHeading: "Understanding the answers", explanation: ["Quantitative data uses numbers. For example, 60% chose option A.", "Qualitative data uses words and reasons. For example, customers said why they liked option A.", "Reliable information can be trusted. Check who answered, how many people answered and whether the questions were fair.", "Segmentation means putting customers into useful groups, such as age, income, location or lifestyle."], steps: ["Look for a clear pattern.", "Check if the information can be trusted.", "Choose a customer group only when the evidence supports it.", "Say how the finding changes the enterprise idea."], example: "Do not guess that all teenagers want a low price. Use the survey answers as evidence." },
    ],
  },
  {
    topicId: "enterprise-r067-3",
    bigIdea: "The numbers show whether an enterprise may make enough money to keep going.",
    sections: [
      { heading: "Costs, revenue and profit", simpleHeading: "Money in and money out", explanation: ["A cost is money the enterprise spends.", "A fixed cost stays the same when the number made changes. Rent is often a fixed cost.", "A variable cost changes when more items are made. Materials are often a variable cost.", "Revenue is all the money from sales. Profit is the money left after all costs are taken away."], steps: ["Work out total costs.", "Work out revenue from sales.", "Take total costs away from revenue.", "A positive answer is profit. A negative answer is a loss."], example: "Revenue is £500 and total costs are £350. Profit is £150." },
      { heading: "Break-even for decisions", simpleHeading: "The point where there is no profit or loss", explanation: ["Break-even is the number of sales needed to cover every cost.", "First take the variable cost of one item from its selling price.", "Then divide the fixed costs by that answer.", "Sales below break-even cause a loss. Sales above break-even can make a profit."], steps: ["Selling price minus variable cost.", "Keep that answer.", "Fixed costs divided by the answer from step 1.", "Compare break-even with the expected number of sales."], example: "An item sells for £5 and has a £2 variable cost. £5 − £2 = £3. Fixed costs are £300. £300 ÷ £3 = 100 items to break even." },
      { heading: "Cash is not profit", simpleHeading: "Having profit does not always mean having cash", explanation: ["Cash is the money available to spend now.", "A sale may count towards profit before the customer pays.", "Bills may need paying before money from customers arrives.", "An enterprise can make a profit but still run out of cash."], example: "A customer will pay next month, but the supplier must be paid today. The enterprise may not have enough cash today." },
    ],
  },
  {
    topicId: "enterprise-r067-4",
    bigIdea: "The four Ps must work together and suit the chosen customer.",
    sections: [
      { heading: "The interdependent four Ps", simpleHeading: "Product, price, place and promotion", explanation: ["Product is what the enterprise sells.", "Price is how much the customer pays.", "Place is where and how the product is sold.", "Promotion is how customers hear about it.", "The four choices are linked. A change to one P may mean another P must change too."], steps: ["Start with the target customer.", "Choose a product that meets their needs.", "Set a price they may pay.", "Sell and promote it in places they use."], example: "A high-price handmade gift needs good quality, suitable packaging and promotion that explains its value." },
      { heading: "Promotion and selling", simpleHeading: "Telling customers and making sales", explanation: ["Digital promotion uses online places, such as social media or email.", "Non-digital promotion includes posters, leaflets and events.", "Advertising pays to show a message. Public relations tries to build a good public image.", "A sales promotion is a short offer, such as 20% off for one week.", "Products can be sold in a physical place or online. The best method reaches the right customer at a cost the enterprise can afford."], steps: ["Check who will see it.", "Check how much it costs.", "Check whether the response can be measured.", "Explain why it suits this customer and product."], example: "A local dog-walking service may use leaflets near a park because local dog owners will see them." },
      { heading: "Life cycle and pricing", simpleHeading: "How products and prices change over time", explanation: ["A product may move through development, introduction, growth, maturity and decline.", "Development is when the product is being created. Sales often rise during growth and may stop rising during maturity.", "An extension strategy is a change made to keep the product selling for longer.", "Competitive pricing uses rival prices. Penetration pricing starts low to gain customers.", "Skimming starts high when a product is new. Psychological pricing uses prices such as £4.99."], example: "A business may add a new flavour when sales start to fall. This may give customers a reason to buy again." },
    ],
  },
  {
    topicId: "enterprise-r067-5",
    bigIdea: "The owner must choose a business type, source of money and source of help that fit the enterprise.",
    sections: [
      { heading: "Ownership choices", simpleHeading: "Who owns and controls the enterprise", explanation: ["A sole trader is one person who owns the enterprise. Unlimited liability means they may have to use personal money to pay business debts.", "A partnership has two or more owners who share decisions and profit. An ordinary partnership may also have unlimited liability.", "An LLP is a limited liability partnership. Its members normally protect their personal belongings from business debts.", "A private limited company is legally separate from its owners and gives limited liability.", "A franchise is an arrangement for using another business's brand and system. It is not a legal ownership type by itself."], steps: ["Think about who makes decisions.", "Think about who keeps the profit.", "Think about who is responsible for debts.", "Think about how much support and freedom the owner wants."], example: "A franchise may feel safer because the brand is already known. The owner has less freedom and must pay fees." },
      { heading: "Sources of capital", simpleHeading: "Ways to get money to start", explanation: ["Capital means money used to start or grow an enterprise.", "Savings belong to the owner. A loan comes from a lender and must be paid back with interest.", "A grant may not need paying back, but the enterprise must meet its rules.", "Crowdfunding asks many people to give or invest small amounts. A business angel invests money and may also give advice."], example: "A loan gives the full amount quickly, but regular repayments may be difficult when sales are low." },
      { heading: "Sources of support", simpleHeading: "People and organisations that can help", explanation: ["A bank may help with finance. An accountant can help with money records and tax.", "A solicitor can explain the law. A council may give local advice or help with premises.", "Family, charities and business groups may give advice, contacts or mentoring."], steps: ["Name the enterprise's problem.", "Choose a source with the right knowledge.", "Explain the exact help it can give."], example: "An accountant can help a new owner understand tax. This may prevent costly mistakes." },
    ],
  },
  {
    topicId: "enterprise-r068-1",
    bigIdea: "Good research starts with a clear question and ends with a decision supported by evidence.",
    sections: [
      { heading: "A defensible research process", simpleHeading: "Research you can give good reasons for", explanation: ["Start with one clear aim. The aim says what you need to find out.", "Create and use one primary research tool, such as a questionnaire.", "Create and use one secondary research tool to record useful information from existing sources.", "Collect number data and word data. Record where secondary information came from and check it against another trusted source.", "A sample is the group of people who take part. It may be random, quota, convenience or cluster sampling.", "Put the findings into a clear order, show them and review how useful they are."], steps: ["Write the aim.", "Create and use both research tools.", "Choose and explain the sample.", "Collect, organise and show the results.", "Check the sources and limits.", "Use the results to make a decision."], example: "Aim: find the price students will pay for a healthy snack. Survey answers give primary data. A trusted local income report gives secondary data." },
      { heading: "Fictional skills lab", simpleHeading: "Try the skill safely", explanation: ["BrightBite is a made-up enterprise used for practice.", "Plan questions about healthy snacks. Then choose one trusted source about local students.", "Do not use a live OCR assignment or copy someone else's assessed work."], steps: ["Ask one question at a time.", "Avoid questions that push people towards an answer.", "Say how each answer may help a decision."], example: "A useful question is: ‘What is the most you would pay for this snack?’" },
    ],
  },
  {
    topicId: "enterprise-r068-2",
    bigIdea: "A customer profile describes the people most likely to buy. Every detail needs evidence.",
    sections: [
      { heading: "Evidence, not stereotypes", simpleHeading: "Describe the customer using facts", explanation: ["A customer profile may include age, job, income, location or lifestyle.", "Only include a detail when it changes the proposal.", "A stereotype is a guess about a whole group. Do not use guesses as evidence.", "Explain what the customer needs, values and can afford."], steps: ["Choose a research finding.", "Say what it tells you about the customer.", "Explain how it changes the product or marketing."], example: "Research shows students have £3 to spend at lunch. This supports a price below £3. It is stronger than simply saying students like cheap food." },
      { heading: "Fictional skills lab", simpleHeading: "Build a practice profile", explanation: ["Use the BrightBite data to make a customer profile.", "Place the research finding next to each customer detail.", "Remove details that do not affect the proposal."], example: "Finding: most buyers want food they can carry. Decision: use small packaging that fits in a bag." },
    ],
  },
  {
    topicId: "enterprise-r068-3",
    bigIdea: "A product proposal turns customer research into a clear design that could be made and sold.",
    sections: [
      { heading: "From insight to design", simpleHeading: "Turn a finding into a product choice", explanation: ["The design mix has three parts.", "Function means what the product must do. Aesthetics means how it looks and feels.", "Economic manufacture means making it at a cost the enterprise can afford.", "Use a creative method to think of ideas. Then show sizes, materials and features clearly."], steps: ["Choose a customer finding.", "Turn it into a product feature.", "Check function, looks and cost.", "Label the design so another person understands it.", "Explain why each important choice was made."], example: "Customers want a snack that stays fresh. A resealable pack meets this need, but its extra cost must be checked." },
      { heading: "Fictional skills lab", simpleHeading: "Create a safe practice design", explanation: ["Sketch one BrightBite package for the made-up customer.", "Add labels for colour, size, material and useful features.", "Keep the design below the given maximum cost."], example: "Label the window on the pack and explain that it lets customers see the snack." },
    ],
  },
  {
    topicId: "enterprise-r068-4",
    bigIdea: "Review means checking the design, using helpful feedback and showing what changed.",
    sections: [
      { heading: "A visible improvement cycle", simpleHeading: "Show how the design gets better", explanation: ["First, check the design against the customer needs, research, function, looks and cost.", "Ask suitable people for clear feedback. Feedback should say what works and what needs changing.", "You do not have to accept every comment. Explain why you accept, change or reject it.", "Keep the old version and the new version. This makes the improvement easy to see."], steps: ["Check your own work.", "Collect feedback.", "Judge each comment.", "Make useful changes.", "Show the before and after versions."], example: "A customer says the price is hard to read. You make it larger because clear price information may help sales." },
      { heading: "Fictional skills lab", simpleHeading: "Practise judging feedback", explanation: ["Review the made-up BrightBite design.", "Put the most useful comments first.", "Create a change log. Write the comment, decision, change and reason."], example: "Comment: add six more colours. Decision: reject. Reason: it would make the design crowded and raise printing costs." },
    ],
  },
  {
    topicId: "enterprise-r068-5",
    bigIdea: "Financial viability means checking whether the proposal may make enough money to work.",
    sections: [
      { heading: "Numbers with an evidence trail", simpleHeading: "Use realistic numbers and show where they came from", explanation: ["An assumption is a number you think may be true. A forecast is a careful estimate of what may happen.", "Use research to support the selling price, first-month sales forecast and every cost.", "Choose a pricing strategy. This may be competitive, penetration, skimming or psychological pricing.", "Work out variable cost per item, total costs, revenue, profit per item, total profit and break-even.", "Change the price and work out the new break-even. Explain whether the change makes the proposal safer or riskier."], steps: ["Write each number and its source.", "Choose and explain the pricing strategy.", "Show every calculation.", "Compare first-month sales with break-even.", "Change the price and calculate again.", "Make a careful final choice."], example: "Sales are forecast at 500 and break-even is 460. If a lower price raises break-even to 520, the forecast would no longer cover every cost." },
      { heading: "Fictional skills lab", simpleHeading: "Test the BrightBite numbers", explanation: ["Use the made-up cost table and three possible sales levels.", "Find out which sales levels make a profit.", "Recommend the highest safe cost or the lowest sales target needed."], example: "Do not only choose the best sales forecast. Check what happens when sales are low." },
    ],
  },
  {
    topicId: "enterprise-r068-6",
    bigIdea: "A risk review finds the biggest outside threats and plans affordable ways to reduce them.",
    sections: [
      { heading: "Risk, impact and response", simpleHeading: "What might go wrong and what can be done", explanation: ["A risk is something that may stop the proposal working well.", "Risks include competitors, little experience, making a loss, guessing demand wrongly and spending too much.", "Outside changes in the economy, society, technology, law, politics or environment may also cause problems.", "Chance means how likely the risk is. Harm means how serious its result would be.", "The enterprise may use an experienced adviser, training, detailed research or a backup plan to reduce a problem."], steps: ["Name the exact risk.", "Judge its chance and possible harm.", "Put the biggest risks first.", "Choose an affordable response.", "Explain what problem may still remain."], example: "The owner may guess demand too high and buy too much stock. Better research and a smaller first order can lower this risk." },
      { heading: "Fictional skills lab", simpleHeading: "Choose the risks that matter most", explanation: ["Rank the six BrightBite changes from most serious to least serious.", "Explain the top two using likelihood and impact.", "Choose a response that a small enterprise can afford."], example: "A costly response is not sensible when the risk is very unlikely and would cause little harm." },
    ],
  },
  {
    topicId: "enterprise-r069-1",
    bigIdea: "A brand should give customers a clear and consistent idea about the enterprise.",
    sections: [
      { heading: "Personality, identity and image", simpleHeading: "What the brand is meant to say", explanation: ["Brand personality is the human character of the brand, such as friendly or bold.", "Brand identity is what the enterprise creates. It includes the name, logo, colours, type and tone of voice.", "Brand image is what customers actually think about the brand.", "A unique selling point, or USP, is a useful reason to choose this enterprise instead of a competitor."], steps: ["Use the customer research.", "Choose a clear personality.", "Create identity choices that show it.", "Check competitors so the brand is different.", "Ask whether customers may form the intended image."], example: "A calm brand may use simple shapes and clear words. Loud colours and jokes may send a different message." },
      { heading: "Fictional skills lab", simpleHeading: "Make a small practice brand board", explanation: ["Create a made-up BrightBite name, logo, colours and tone of voice.", "Explain how each choice fits the customer and USP.", "Do not choose a colour only because it is your favourite."], example: "Green may suggest natural ingredients, but explain why that matters to this customer." },
    ],
  },
  {
    topicId: "enterprise-r069-2",
    bigIdea: "A campaign uses two different materials that share one aim, brand and message.",
    sections: [
      { heading: "Campaign logic", simpleHeading: "Plan what the campaign must achieve", explanation: ["A campaign objective is the result you want.", "A KPI is a number used to check progress. A timeframe says when the result should be reached.", "Create one digital item and one non-digital item.", "Both items should use the same brand, message, offer and call to action.", "A call to action tells the customer what to do next."], steps: ["Write a clear objective.", "Choose a KPI and timeframe.", "Choose two suitable materials.", "Keep the message and brand consistent.", "Explain how the two materials work together."], example: "Objective: gain 100 website visits in two weeks. The KPI is the number of website visits." },
      { heading: "Fictional skills lab", simpleHeading: "Plan two BrightBite materials", explanation: ["Plan a social post and a poster for the made-up enterprise.", "Use the same main message on both.", "Explain what each channel does best."], example: "The poster reaches people near school. The social post can include a link and its clicks can be counted." },
    ],
  },
  {
    topicId: "enterprise-r069-3",
    bigIdea: "A strong pitch is planned, practised and improved before it is delivered.",
    sections: [
      { heading: "Prepare for the audience", simpleHeading: "Plan what to say and how to say it", explanation: ["A pitch is a short talk that tries to gain support for the proposal.", "Think about the audience, room, time, resources and likely questions.", "Choose evidence that supports the main request.", "Practise clear speech, pace, eye contact, posture and movement.", "Use feedback to make one clear change, then practise again."], steps: ["Decide what you want the audience to do.", "Choose the strongest evidence.", "Plan a clear beginning, middle and end.", "Practise and time it.", "Record feedback and the change you made."], example: "A partner says the price is unclear. Add a simple cost chart and explain the price again during the next practice." },
      { heading: "Fictional skills lab", simpleHeading: "Practise a short BrightBite pitch", explanation: ["Prepare a 90-second pitch for the made-up proposal.", "Ask a partner to check three named things, such as clarity, evidence and eye contact.", "Record one change and the reason for it."], example: "Feedback must be specific. ‘Speak more slowly during the cost section’ is more useful than ‘be better’." },
    ],
  },
  {
    topicId: "enterprise-r069-4",
    bigIdea: "The professional pitch must be clear, persuasive and supported by suitable resources.",
    sections: [
      { heading: "A professional performance", simpleHeading: "Deliver the full pitch", explanation: ["The assessed pitch lasts 5 to 10 minutes.", "It explains the proposal, brand and campaign.", "Use at least two supporting visual aids. A printout of the slides does not count as a different second aid.", "Speak clearly and keep to time. Use eye contact and confident body language.", "Answer questions using detailed knowledge of the enterprise.", "An independent witness is another person who watches the pitch. The teacher writes an Observation Record to show what happened."], steps: ["Check every visual aid works.", "Give the pitch in a clear order.", "Watch the time.", "Use the aids instead of reading them word for word.", "Listen carefully and answer questions."], example: "Use a product model to show the design and a small chart to explain the costs. These are two different visual aids with different jobs." },
      { heading: "Fictional skills lab", simpleHeading: "Record a short practice section", explanation: ["Record two minutes of a made-up BrightBite pitch.", "Use one product visual and one cost summary.", "Watch it back and check clarity, evidence and delivery."], example: "If you look at the screen for the whole recording, practise using short prompt notes instead." },
    ],
  },
  {
    topicId: "enterprise-r069-5",
    bigIdea: "A useful review uses evidence to decide what worked and what should happen next.",
    sections: [
      { heading: "Evidence-based reflection", simpleHeading: "Use facts when reviewing the work", explanation: ["Reflection means thinking carefully about the performance and result.", "Use feedback, the teacher record, timing and audience response as evidence.", "An improvement fixes or strengthens work that already exists.", "Further development is a new step for the enterprise, such as a new product or market.", "Choose the most useful action first and explain why."], steps: ["State the evidence.", "Say what it shows.", "Explain why it happened.", "Describe a specific action.", "Explain the likely benefit."], example: "Three people misunderstood the price. Improve the cost slide now. Testing a new product next term would be further development." },
      { heading: "Fictional skills lab", simpleHeading: "Write a clear practice review", explanation: ["Use the made-up witness notes and campaign results.", "Choose one strength and one issue supported by evidence.", "Write one immediate improvement and one future development."], example: "Avoid ‘be more confident’. Say exactly what to change, such as practising answers to three likely questions." },
    ],
  },
];

export const baselineEnterpriseSimpleVisuals: Record<string, SimpleVisualSpec> = {
  "enterprise-r067-1:Enterprise characteristics": { type: "flow", title: "A skill creates a result", labels: ["Skill", "Action", "Customer response", "Enterprise result"], caption: "Do not stop after naming the skill. Show what it helps the person do." },
  "enterprise-r067-1:Risk and reward": { type: "balance", title: "Compare both sides", labels: ["What may go wrong", "How serious?", "What may be gained", "Is it worth it?"], caption: "A sensible decision compares the possible loss with the possible reward." },
  "enterprise-r067-2:Research for a decision": { type: "flow", title: "Research leads to a choice", labels: ["Question", "Research method", "Finding", "Decision"], caption: "Useful research changes an enterprise decision." },
  "enterprise-r067-2:Data, reliability and segmentation": { type: "compare", title: "Two kinds of data", labels: ["Numbers", "How many or how much", "Words", "Views and reasons"], caption: "Numbers show the pattern. Words help explain the pattern." },
  "enterprise-r067-3:Costs, revenue and profit": { type: "flow", title: "Find the money left", labels: ["Sales revenue", "Take away costs", "Profit or loss"], caption: "Profit is what remains after all costs are taken from revenue." },
  "enterprise-r067-3:Break-even for decisions": { type: "balance", title: "The break-even point", labels: ["Total costs", "Same amount", "Total revenue", "No profit or loss"], caption: "At break-even, total revenue and total cost are equal." },
  "enterprise-r067-3:Cash is not profit": { type: "compare", title: "Profit and cash are different", labels: ["Profit", "Worked out over time", "Cash", "Money available now"], caption: "A future customer payment cannot pay a bill that is due today." },
  "enterprise-r067-4:The interdependent four Ps": { type: "cycle", title: "The four Ps work together", labels: ["Product", "Price", "Place", "Promotion"], caption: "Each P must suit the customer and the other three Ps." },
  "enterprise-r067-4:Promotion and selling": { type: "compare", title: "Two ways to reach people", labels: ["Digital", "Online and measurable", "Non-digital", "Physical and often local"], caption: "Choose the method that reaches the right customer at an affordable cost." },
  "enterprise-r067-4:Life cycle and pricing": { type: "flow", title: "A product can move through stages", labels: ["Development", "Introduction", "Growth", "Maturity", "Decline"], caption: "Price and promotion may need to change as the product moves through its life." },
  "enterprise-r067-5:Ownership choices": { type: "compare", title: "Ownership changes responsibility", labels: ["More control", "More personal risk", "Shared control", "Shared skills and reward"], caption: "Think about control, profit, debt and support when choosing ownership." },
  "enterprise-r067-5:Sources of capital": { type: "balance", title: "Getting money changes something else", labels: ["Money gained", "Repayment or ownership", "Support gained", "Freedom given up"], caption: "The cheapest-looking source is not always the most suitable one." },
  "enterprise-r067-5:Sources of support": { type: "flow", title: "Match the problem to the helper", labels: ["Enterprise problem", "Right expert", "Useful advice", "Better decision"], caption: "Name the exact help the enterprise needs." },
  "enterprise-r068-1:A defensible research process": { type: "cycle", title: "The research cycle", labels: ["Aim", "Method", "Sample", "Results", "Decision"], caption: "Every decision should link back to a finding." },
  "enterprise-r068-1:Fictional skills lab": { type: "flow", title: "Plan the practice research", labels: ["Healthy snack question", "Fair questionnaire", "Trusted source", "Useful finding"], caption: "Practice with BrightBite, not a live assessed assignment." },
  "enterprise-r068-2:Evidence, not stereotypes": { type: "flow", title: "Build a supported customer profile", labels: ["Research fact", "Customer need", "Profile detail", "Proposal choice"], caption: "A customer detail is useful only when evidence supports it and it changes a decision." },
  "enterprise-r068-2:Fictional skills lab": { type: "flow", title: "Turn data into a profile", labels: ["Read the data", "Choose a finding", "Describe the customer", "Show the design effect"], caption: "Place the evidence beside the profile detail it supports." },
  "enterprise-r068-3:From insight to design": { type: "cycle", title: "The design mix", labels: ["Function", "Looks", "Cost to make", "Customer fit"], caption: "A strong design works, looks suitable and can be made at an affordable cost." },
  "enterprise-r068-3:Fictional skills lab": { type: "flow", title: "Build the practice design", labels: ["Customer need", "Sketch", "Clear labels", "Cost check"], caption: "Another person should be able to understand the design." },
  "enterprise-r068-4:A visible improvement cycle": { type: "cycle", title: "Show the improvement", labels: ["Check", "Feedback", "Decision", "Change", "Before and after"], caption: "Keep evidence of the old and new versions." },
  "enterprise-r068-4:Fictional skills lab": { type: "flow", title: "Judge each comment", labels: ["Feedback", "Useful or not?", "Accept or reject", "Record the reason"], caption: "You do not need to make every suggested change." },
  "enterprise-r068-5:Numbers with an evidence trail": { type: "flow", title: "From evidence to a money decision", labels: ["Research numbers", "Calculations", "Break-even check", "Try lower sales", "Final choice"], caption: "A calculation becomes useful when you explain what it means." },
  "enterprise-r068-5:Fictional skills lab": { type: "compare", title: "Test more than one result", labels: ["Higher sales", "Possible profit", "Lower sales", "Possible loss"], caption: "A cautious test shows whether the idea still works when sales are lower." },
  "enterprise-r068-6:Risk, impact and response": { type: "flow", title: "Assess one risk", labels: ["Risk", "Chance", "Possible harm", "Response", "Problem left"], caption: "The response should fit how likely and harmful the risk is." },
  "enterprise-r068-6:Fictional skills lab": { type: "balance", title: "Choose the biggest risks", labels: ["Very likely", "Very harmful", "Affordable response", "Top priority"], caption: "Focus on the risks that matter most instead of listing everything." },
  "enterprise-r069-1:Personality, identity and image": { type: "flow", title: "How a brand message travels", labels: ["Chosen personality", "Created identity", "Customer sees it", "Brand image"], caption: "What customers think may differ from what the enterprise planned." },
  "enterprise-r069-1:Fictional skills lab": { type: "cycle", title: "Make a clear brand board", labels: ["Customer", "USP", "Personality", "Name and logo", "Colour and voice"], caption: "Every choice should fit the customer and the brand message." },
  "enterprise-r069-2:Campaign logic": { type: "flow", title: "One campaign plan", labels: ["Aim", "Two materials", "Same message", "Next action", "Result number (KPI)"], caption: "Both materials should help achieve the same measurable objective." },
  "enterprise-r069-2:Fictional skills lab": { type: "compare", title: "Two materials, different jobs", labels: ["Social post", "Clickable and measurable", "Poster", "Visible in a local place"], caption: "The materials stay consistent while using each channel's strength." },
  "enterprise-r069-3:Prepare for the audience": { type: "cycle", title: "Practice improves the pitch", labels: ["Plan", "Practise", "Feedback", "Change", "Practise again"], caption: "Feedback has value when it causes a clear change." },
  "enterprise-r069-3:Fictional skills lab": { type: "flow", title: "A 90-second practice", labels: ["Main request", "Strong evidence", "Clear delivery", "Partner check", "One change"], caption: "Ask the partner to check named parts of the pitch." },
  "enterprise-r069-4:A professional performance": { type: "flow", title: "The pitch journey", labels: ["Opening", "Proposal", "Evidence", "Clear request", "Questions"], caption: "Guide the audience towards the action or support you want." },
  "enterprise-r069-4:Fictional skills lab": { type: "compare", title: "Use two helpful resources", labels: ["Product visual", "Shows the idea", "Cost chart", "Explains the numbers"], caption: "Each resource should make one part easier to understand." },
  "enterprise-r069-5:Evidence-based reflection": { type: "flow", title: "Turn evidence into action", labels: ["Evidence", "What it shows", "Why it happened", "Specific action", "Likely benefit"], caption: "Do not jump from a feeling straight to a vague improvement." },
  "enterprise-r069-5:Fictional skills lab": { type: "compare", title: "Two kinds of next action", labels: ["Improvement", "Fix current work", "New step for later", "Take the enterprise forward"], caption: "Keep an immediate fix separate from a future enterprise step." },
};

export const enterpriseSimpleGuides: SimpleTopicGuide[] = publishedContentOverride?.enterpriseSimpleGuides ?? baselineEnterpriseSimpleGuides;
export const enterpriseSimpleVisuals: Record<string, SimpleVisualSpec> = publishedContentOverride?.enterpriseSimpleVisuals ?? baselineEnterpriseSimpleVisuals;
export const enterpriseSimpleGuideByTopic = new Map(enterpriseSimpleGuides.map((guide) => [guide.topicId, guide]));

const simpleDefinitions: Record<string, string> = {
  "Creativity": "Thinking of new ideas.",
  "Innovation": "Using an idea to make something new or better.",
  "Negotiation": "Talking with someone to try to reach an agreement.",
  "Risk taking": "Making a choice when something could go wrong.",
  "Primary research": "New information collected by the enterprise.",
  "Secondary research": "Useful information that already exists.",
  "Qualitative data": "Word data that explains views and reasons.",
  "Quantitative data": "Number data that can be measured or compared.",
  "Market segmentation": "Putting customers into groups with things in common.",
  "Fixed cost": "A cost that stays the same no matter how many items are made.",
  "Variable cost": "A cost that changes when more or fewer items are made.",
  "Contribution": "Selling price minus the variable cost of one item.",
  "Break-even": "The number of sales where total revenue and total costs are equal.",
  "Financial viability": "Whether the idea may make enough money to keep going.",
  "Marketing mix": "The linked product, price, place and promotion choices.",
  "Public relations": "Communication used to help people form a good view of the enterprise.",
  "Sales promotion": "A short offer that encourages people to buy.",
  "Product life cycle": "The stages from developing a product until its sales fall.",
  "Sole trader": "One person who owns an enterprise and is responsible for its debts.",
  "Limited liability partnership": "A partnership where members normally protect their personal belongings from business debts.",
  "Private limited company": "A business that is legally separate from its owners. Its shares are not sold to the public.",
  "Business angel": "A person who invests money and may also give advice.",
  "Grant": "Money given for a set purpose. It normally does not need paying back when the rules are followed.",
  "Research aim": "A clear statement of what the research needs to find out.",
  "Random sample": "A group chosen so every suitable person has an equal chance of being picked.",
  "Quota sample": "A group containing set numbers of different types of people.",
  "Collate": "Put collected information into a clear order so it can be studied.",
  "Customer profile": "A fact-based description of the customer most likely to buy.",
  "Demographic": "A fact about a group, such as age, income or job.",
  "Lifestyle": "A person's interests, values and usual way of living.",
  "Function": "What the product must do and how well it works.",
  "Aesthetics": "How the product looks, feels or sounds.",
  "Economic manufacture": "Making the product at a cost the enterprise can afford.",
  "Creative technique": "A planned activity used to think of ideas.",
  "Self-assessment": "Carefully checking your own proposal against the requirements.",
  "Feedback": "Useful comments about what works and what could change.",
  "Refinement": "A useful change that makes the proposal work better.",
  "Sales forecast": "A careful estimate of future sales using evidence.",
  "Viability": "Whether the proposal may make enough money to operate.",
  "Sensitivity": "How much the result changes when one estimate changes.",
  "External risk": "Something harmful that may happen outside the enterprise.",
  "Mitigation": "An action that makes a risk less likely or less harmful.",
  "Residual risk": "The risk that is still left after action has been taken.",
  "Brand personality": "The human qualities a brand tries to show, such as friendly or bold.",
  "Brand identity": "The name, logo, colours, letter style and words created for a brand.",
  "Brand image": "What customers really think and feel about the brand.",
  "Unique selling point": "A useful reason to choose this offer instead of a competitor.",
  "Campaign objective": "The exact result a promotion plan aims to achieve.",
  "KPI": "A number used to check whether the plan is working.",
  "Call to action": "A clear instruction telling the customer what to do next.",
  "Coherence": "When campaign items look and feel linked and work well together.",
  "Pitch": "A planned talk that tries to gain support for a proposal.",
  "Visual aid": "A picture, chart, object or other item that helps the audience understand.",
  "Non-verbal communication": "Meaning shown without words, such as eye contact, posture and movement.",
  "Professional delivery": "Presenting in a clear, controlled way that suits the audience.",
  "Observation record": "A teacher's written record of what happened during the pitch.",
  "Pitch resource": "An item used to help explain the proposal during a pitch.",
  "Reflection": "Carefully thinking about what happened and using evidence.",
  "Improvement": "A change that fixes or strengthens the current work.",
  "Further development": "A new step for later that takes the enterprise forward.",
};

export function simplifyEnterpriseDefinition(term: string, definition: string) {
  return simpleDefinitions[term] ?? definition;
}
