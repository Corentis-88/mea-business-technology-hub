export type BusinessInfographicPanel = {
  icon: string;
  label: string;
  title: string;
  text: string;
  example?: string;
  tone: "blue" | "green" | "gold" | "coral" | "purple";
};

export type BusinessInfographicSpec = {
  eyebrow: string;
  title: string;
  panels: BusinessInfographicPanel[];
  takeaway: string;
};

const panel = (icon: string, label: string, title: string, text: string, tone: BusinessInfographicPanel["tone"], example?: string): BusinessInfographicPanel => ({ icon, label, title, text, tone, example });
const visual = (eyebrow: string, title: string, takeaway: string, panels: BusinessInfographicPanel[]): BusinessInfographicSpec => ({ eyebrow, title, takeaway, panels });

export const businessInfographics: Record<string, BusinessInfographicSpec> = {
  "Change creates business opportunities": visual("Opportunity spotter", "Turn change into a business idea", "Do not stop at the change: explain the unmet need and the idea that could meet it.", [
    panel("⚡", "1 · Notice", "Something changes", "Technology, fashion, incomes or lifestyles change what people want.", "blue", "More people begin working from home."),
    panel("🔎", "2 · Find", "A need is not met", "Customers have a problem that current products do not solve well.", "gold", "They want a quick, healthy lunch nearby."),
    panel("💡", "3 · Create", "An idea meets the need", "An entrepreneur designs a product or service for that customer group.", "purple", "A local healthy lunch delivery service."),
    panel("📈", "4 · Check", "Demand makes it viable", "Research must show that enough customers will pay a suitable price.", "green", "A survey tests demand before money is spent."),
  ]),
  "Customer needs and enterprise resources": visual("Value workshop", "Build an offer customers value", "A strong idea joins a real customer need to the right mix of resources.", [
    panel("👥", "Listen", "Customer needs", "Customers may value price, quality, choice, convenience or service.", "blue", "Busy commuters may value speed most."),
    panel("🧰", "Gather", "Business resources", "People, skills, finance, materials, equipment and time make the idea possible.", "purple", "A café needs trained staff and reliable equipment."),
    panel("⚙️", "Combine", "Enterprise action", "The entrepreneur organises the resources to create a useful offer.", "gold"),
    panel("❤️", "Deliver", "Customer value", "The finished offer solves the need well enough for the customer to buy.", "coral"),
  ]),
  "Risk and reward": visual("Entrepreneur's balance", "What could be lost — and gained?", "Risk is uncertain. A larger risk never guarantees a larger reward.", [
    panel("💸", "Risk", "Financial loss", "The entrepreneur may lose savings or still owe borrowed money.", "coral"),
    panel("🌧️", "Risk", "Failure and insecurity", "Sales may be too low, leaving an uncertain income or business closure.", "purple"),
    panel("💷", "Reward", "Profit", "Revenue above total costs can provide an income and funds for growth.", "green"),
    panel("🗝️", "Reward", "Independence", "The entrepreneur can make decisions and gain satisfaction from their own idea.", "gold"),
  ]),
  "Creating added value": visual("Value makeover", "Make basic inputs worth more", "Added value is selling price minus the cost of bought-in materials — not the same as profit.", [
    panel("🧱", "Input", "Bought-in materials", "The business starts with items bought from suppliers.", "blue", "£9 of cake ingredients."),
    panel("✨", "Transform", "Skill, design and brand", "Convenience, quality, service or a USP make the offer more desirable.", "purple", "Skilled decoration and same-day delivery."),
    panel("🎁", "Output", "A valued product", "Customers are willing to pay more because the offer gives them extra benefits.", "gold", "The cake sells for £28."),
    panel("➕", "Result", "£19 added value", "£28 selling price − £9 bought-in materials = £19 added value.", "green"),
  ]),
  "Understand customers with research": visual("Evidence detective", "Choose the right research", "Reliable evidence reduces uncertainty, but it cannot remove all risk.", [
    panel("🗣️", "First-hand", "Primary research", "New information collected for this exact purpose: surveys, observation or focus groups.", "blue"),
    panel("📚", "Already exists", "Secondary research", "Existing information such as reports, websites and government data.", "purple"),
    panel("🔢", "Numbers", "Quantitative data", "Measures amounts and patterns that can be counted or compared.", "green"),
    panel("💬", "Reasons", "Qualitative data", "Explains opinions, motives and experiences in words.", "gold"),
  ]),
  "Target and compete": visual("Market matchmaker", "Match the offer to the customer", "A market gap matters only when enough customers want it and the business can serve it profitably.", [
    panel("🧩", "Divide", "Segment the market", "Group customers by age, income, location, lifestyle or behaviour.", "blue"),
    panel("🎯", "Choose", "Select a target", "Focus on the group whose needs the business can meet best.", "coral"),
    panel("🛍️", "Adapt", "Shape the four Ps", "Adjust product, price, promotion and place for that target customer.", "purple"),
    panel("🗺️", "Compare", "Check the market map", "Plot competitors to find crowded areas and possible gaps.", "green"),
  ]),
  "Objectives and core calculations": visual("Money machine", "Follow each pound from sale to profit", "Revenue is not profit: costs must be deducted before the result is known.", [
    panel("🎯", "Direction", "Set an objective", "A start-up may put survival first; an established firm may seek growth or profit.", "purple"),
    panel("🧾", "Sales", "Calculate revenue", "Selling price × quantity sold gives the money earned from sales.", "blue", "£15 × 600 = £9,000 revenue."),
    panel("🏭", "Spending", "Add total costs", "Fixed costs + total variable costs gives the full cost of operating.", "coral"),
    panel("💰", "Result", "Find profit or loss", "Revenue − total costs shows whether the business made a profit or loss.", "green", "£9,000 − £7,200 = £1,800 profit."),
  ]),
  "Break-even and margin of safety": visual("Safety line", "Know how many units must be sold", "Beyond break-even, each extra unit's contribution moves the business towards profit.", [
    panel("🧱", "Must pay", "Fixed costs", "Costs such as rent remain even when no units are produced.", "coral"),
    panel("➖", "Per sale", "Contribution", "Selling price − variable cost per unit contributes towards fixed costs, then profit.", "blue"),
    panel("⚖️", "No profit, no loss", "Break-even output", "Fixed costs ÷ contribution per unit gives the sales needed to cover total costs.", "gold"),
    panel("🛟", "Room to fall", "Margin of safety", "Actual or forecast sales − break-even sales shows the sales cushion.", "green"),
  ]),
  "Cash flow and finance": visual("Cash calendar", "Timing can make or break a business", "A profitable business can still run out of cash when money arrives after bills are due.", [
    panel("📥", "Money in", "Cash inflows", "Cash from sales, owner investment or borrowing enters the business.", "green"),
    panel("📤", "Money out", "Cash outflows", "Wages, rent, supplies and loan repayments leave the business.", "coral"),
    panel("📅", "Timing", "Closing balance", "Opening balance + net cash flow gives the cash available at the period end.", "blue"),
    panel("🏦", "Solution", "Suitable finance", "Match the amount, purpose and duration to cost, risk and loss of control.", "purple"),
  ]),
  "Ownership and liability": visual("Ownership wardrobe", "Choose the legal structure that fits", "The best structure depends on control, finance, risk, continuity and the owner's objectives.", [
    panel("🧍", "One owner", "Sole trader", "Simple control and private decisions, but unlimited liability can put personal assets at risk.", "blue"),
    panel("🤝", "Shared", "Partnership", "Owners share skills, work and finance, but decisions and profit are also shared.", "green"),
    panel("🏢", "Separate identity", "Limited company", "Limited liability protects personal assets, but set-up and reporting are more complex.", "purple"),
    panel("🛡️", "Key test", "Liability", "Ask who must pay the business's debts if it cannot pay them itself.", "gold"),
  ]),
  "Location and the four Ps": visual("Customer journey", "Put the right offer in the right place", "The four Ps work together; changing one can affect the other three.", [
    panel("📦", "Product", "What is offered?", "Features, quality, design and range must meet the target customer's needs.", "blue"),
    panel("🏷️", "Price", "What will they pay?", "Price must reflect value, competition, costs and objectives.", "green"),
    panel("📣", "Promotion", "How will they know?", "Communication should reach the target audience with a clear message.", "coral"),
    panel("📍", "Place", "Where will they buy?", "Location and distribution must be convenient and affordable for the business.", "purple"),
  ]),
  "Business plans": visual("Plan before you leap", "Turn an idea into a tested proposal", "A plan supports decisions and finance applications, but forecasts are estimates, not promises.", [
    panel("🧭", "Purpose", "Idea and objectives", "Explain what the business will do, for whom and what success should look like.", "blue"),
    panel("🔍", "Evidence", "Market and competition", "Show the target customer, research findings and how rivals compare.", "purple"),
    panel("🧮", "Numbers", "Finance forecasts", "Estimate sales, costs, cash flow, break-even and finance needed.", "green"),
    panel("⚠️", "Reality check", "Risks and review", "Test assumptions and update the plan when circumstances change.", "coral"),
  ]),
  "Stakeholders": visual("Decision ripple", "One decision, many different effects", "Stakeholders judge decisions through their own interests, so conflict is common.", [
    panel("👩‍💼", "Inside", "Employees", "May want secure jobs, fair pay, training and safe conditions.", "blue"),
    panel("🛒", "Outside", "Customers", "Usually want reliable quality, fair prices and good service.", "green"),
    panel("💼", "Owners", "Owners and shareholders", "Often seek profit, growth, dividends and lower risk.", "purple"),
    panel("🏘️", "Community", "Local people", "May value jobs but worry about congestion, noise or pollution.", "gold"),
  ]),
  "Technology and legislation": visual("Rules and tools", "External change reshapes decisions", "Explain the direct effect first, then follow it through to cost, demand, reputation or profit.", [
    panel("🤖", "Technology", "Faster and smarter", "Automation and digital systems can improve productivity, quality and customer reach.", "blue"),
    panel("💳", "Technology", "New costs and risks", "Equipment, training, cyber security and job changes may raise costs.", "purple"),
    panel("⚖️", "Law", "Minimum standards", "Employment, consumer and data rules protect people and require compliance.", "green"),
    panel("🚨", "If ignored", "Penalties and trust", "Breaking rules can cause fines, legal action and reputational damage.", "coral"),
  ]),
  "The economy": visual("Economic weather", "Read the conditions around a business", "Economic changes affect businesses differently: always apply the effect to the named firm and customers.", [
    panel("📈", "Prices", "Inflation", "Rising prices can increase input costs and reduce customers' purchasing power.", "coral"),
    panel("🏦", "Borrowing", "Interest rates", "Higher rates make loans dearer and may reduce spending on credit.", "purple"),
    panel("💼", "Jobs", "Employment", "High employment can lift demand but make recruitment harder and wages higher.", "green"),
    panel("💷", "Currency", "Exchange rates", "A weaker pound makes imports dearer but can make UK exports cheaper abroad.", "blue"),
  ]),
  "Routes and consequences of growth": visual("Growth routes", "Grow from within or join with others", "Growth may raise revenue and market power, but it also brings cost, control and communication risks.", [
    panel("🌱", "Organic", "Grow internally", "Open outlets, launch products or sell to new markets using the firm's own resources.", "green"),
    panel("🤝", "Inorganic", "Merge or take over", "Join with or buy another business to grow more quickly.", "purple"),
    panel("📦", "Benefit", "Economies of scale", "Larger purchasing, technical or marketing operations may reduce average costs.", "blue"),
    panel("🧩", "Risk", "Diseconomies of scale", "Communication, coordination and motivation can worsen as the firm becomes larger.", "coral"),
  ]),
  "Changing objectives and finance": visual("Growth compass", "Objectives and finance change together", "A source of finance is suitable only when it fits the purpose, timescale, cost and desired control.", [
    panel("🧭", "New direction", "Objectives evolve", "Survival may give way to growth, market share, profit or ethical goals.", "blue"),
    panel("🔁", "Inside", "Internal finance", "Retained profit and asset sales avoid borrowing but may be limited.", "green"),
    panel("🏦", "Outside", "External finance", "Loans, share capital or venture capital can provide larger sums.", "purple"),
    panel("⚖️", "Choose", "Balance trade-offs", "Compare interest, repayment, ownership dilution, risk and availability.", "gold"),
  ]),
  "Globalisation, ethics and environment": visual("Global decision lens", "See the benefit and the wider cost", "A strong judgement balances commercial effects with stakeholder and long-term consequences.", [
    panel("🌍", "Opportunity", "Global markets", "Businesses can reach more customers, source globally and spread risk.", "blue"),
    panel("🚢", "Pressure", "Global competition", "More rivals and exchange-rate changes can affect price, demand and costs.", "purple"),
    panel("🤲", "Responsibility", "Ethical choices", "Fair pay, honest sourcing and safe conditions can support trust but raise costs.", "green"),
    panel("🌱", "Long term", "Environmental action", "Lower waste and emissions can protect resources and reputation.", "gold"),
  ]),
  "Product decisions": visual("Product passport", "Manage a product through its life", "Product decisions should match the life-cycle stage, target market and business objective.", [
    panel("🧪", "Design", "Function, cost and look", "The design mix balances usefulness, production cost and appearance.", "blue"),
    panel("🌱", "Early life", "Introduction and growth", "Promotion builds awareness; sales rise as customers adopt the product.", "green"),
    panel("🏆", "Peak", "Maturity", "Sales level off and competition is strong, so differentiation matters.", "gold"),
    panel("🔄", "Next move", "Extension strategy", "New uses, markets, packaging or features can delay decline.", "purple"),
  ]),
  "Price and promotion": visual("Attention to action", "Use price and promotion as a team", "The method should suit the target audience, objective, budget, product and competition.", [
    panel("🏷️", "Price", "Signal value", "Cost-plus, competitive, penetration or skimming pricing sends different messages.", "blue"),
    panel("👀", "Awareness", "Get noticed", "Advertising and sponsorship can introduce the offer to the target audience.", "purple"),
    panel("🎁", "Trial", "Encourage action", "Sales promotions can create urgency, trial or repeat purchase.", "coral"),
    panel("📊", "Measure", "Check response", "Compare added sales and profit with the promotion's cost.", "green"),
  ]),
  "Place and integration": visual("Route to customer", "Make buying easy and consistent", "A marketing mix is integrated when every element supports the same position and target customer.", [
    panel("🏭", "Start", "Producer", "The business makes or sources the product and controls supply decisions.", "blue"),
    panel("🚚", "Route", "Distribution channel", "Direct sales, retailers and wholesalers offer different reach, cost and control.", "purple"),
    panel("📱", "Access", "Online and physical place", "Customers need a convenient way to find, order and receive the product.", "green"),
    panel("🧩", "Fit", "Integrated mix", "Product, price, promotion and place should send one clear message.", "gold"),
  ]),
  "Production and technology": visual("Production studio", "Choose a method that fits demand", "The right method balances volume, variety, cost, quality and flexibility.", [
    panel("🧑‍🎨", "One-off", "Job production", "A skilled team makes a customised product, usually at a high unit cost.", "purple"),
    panel("📚", "Groups", "Batch production", "A set of identical items is completed before switching to another batch.", "gold"),
    panel("🏭", "Continuous", "Flow production", "Standardised products move through repeated stages at high volume.", "blue"),
    panel("🤖", "Improvement", "Technology", "Automation may improve speed and consistency but needs investment and training.", "green"),
  ]),
  "Suppliers, stock and logistics": visual("Supply chain control room", "Keep products moving without waste", "Low stock can cut cost, but weak supply reliability raises the risk of lost sales.", [
    panel("🤝", "Source", "Choose suppliers", "Compare price, quality, reliability, flexibility, location and payment terms.", "blue"),
    panel("📦", "Hold", "Manage stock", "Buffer stock protects against delays but ties up cash and needs storage.", "gold"),
    panel("⏱️", "Lean", "Just in time", "Supplies arrive close to use, reducing stock costs but increasing disruption risk.", "purple"),
    panel("🚚", "Deliver", "Logistics", "Transport and warehousing should place the right item in the right place on time.", "green"),
  ]),
  "Quality and sales": visual("Promise keeper", "Quality shapes cost, trust and repeat sales", "Quality control finds faults; quality assurance designs processes to prevent them.", [
    panel("🔍", "Inspect", "Quality control", "Products are checked during or after production and faulty items are removed.", "coral"),
    panel("✅", "Prevent", "Quality assurance", "Everyone follows reliable processes so faults are less likely to occur.", "green"),
    panel("⭐", "Experience", "Customer service", "Helpful support and complaint handling can recover trust.", "blue"),
    panel("🔁", "Outcome", "Repeat purchase", "Consistent quality can improve reviews, loyalty, sales and reputation.", "purple"),
  ]),
  "Profit and margins": visual("Profit microscope", "Look beyond the total", "Margins turn profit into a percentage, making businesses or years easier to compare.", [
    panel("🧾", "Sales", "Revenue", "Price × quantity gives sales income before costs are deducted.", "blue"),
    panel("📦", "Direct costs", "Gross profit", "Revenue − cost of sales shows profit from buying or making the goods.", "green"),
    panel("🏢", "All expenses", "Operating profit", "Gross profit − operating expenses shows profit from normal operations.", "purple"),
    panel("%", "Compare", "Profit margin", "Profit ÷ revenue × 100 shows how much profit is kept from each pound of sales.", "gold"),
  ]),
  "Percentages and investment": visual("Investment scoreboard", "Turn figures into decisions", "Always state what a calculated percentage means for this business.", [
    panel("📏", "Change", "Percentage change", "New value − original value, divided by original value, × 100.", "blue"),
    panel("💷", "Return", "ARR", "Average annual profit ÷ cost of investment × 100 compares yearly return.", "green"),
    panel("⏳", "Time", "Payback", "The time needed for net cash inflows to recover the investment cost.", "gold"),
    panel("⚖️", "Decide", "Use more than one measure", "Compare return and speed with risk, strategy and non-financial effects.", "purple"),
  ]),
  "Interpreting performance": visual("Performance dashboard", "Tell the story behind the numbers", "A calculation earns meaning when it is compared, explained and linked to a decision.", [
    panel("📊", "Spot", "Identify the pattern", "Compare years, competitors, targets or industry averages.", "blue"),
    panel("🔍", "Explain", "Find a likely cause", "Use the case evidence to explain why the figure changed.", "purple"),
    panel("🧠", "Connect", "Consider other evidence", "One figure alone may hide cash, quality, market or stakeholder issues.", "gold"),
    panel("🧭", "Act", "Recommend a response", "Choose an action and explain the likely effect and limitation.", "green"),
  ]),
  "Structures and communication": visual("Message map", "Structure changes how information travels", "A suitable structure makes responsibility clear without slowing decisions or losing useful feedback.", [
    panel("🏛️", "Levels", "Tall structure", "More layers create close supervision but can slow messages and decisions.", "purple"),
    panel("↔️", "Fewer layers", "Flat structure", "A wider span of control may speed communication and increase responsibility.", "green"),
    panel("🎯", "Authority", "Centralised decisions", "Senior leaders keep consistency and control across the business.", "blue"),
    panel("📍", "Local voice", "Decentralised decisions", "Managers nearer customers can respond quickly to local needs.", "gold"),
  ]),
  "Recruitment and training": visual("People pipeline", "Put the right person in the right role", "Good recruitment and training may cost more now but can improve productivity, quality and retention.", [
    panel("📝", "Define", "Job description", "Set out duties, responsibility, pay and working conditions.", "blue"),
    panel("🧩", "Match", "Person specification", "List the skills, qualifications and qualities needed.", "purple"),
    panel("🔎", "Select", "Recruitment", "Choose internal or external methods and assess candidates fairly.", "gold"),
    panel("🎓", "Develop", "Training", "Induction, on-the-job and off-the-job learning build capability.", "green"),
  ]),
  "Motivation": visual("Motivation mixer", "Different people value different rewards", "The best approach depends on the employee, job, business culture and available budget.", [
    panel("💷", "Financial", "Pay and bonuses", "Wages, salaries, commission and performance pay offer a money reward.", "green"),
    panel("👏", "Recognition", "Praise and responsibility", "Feeling trusted and valued can increase effort and satisfaction.", "gold"),
    panel("📈", "Growth", "Training and promotion", "Progression can build skills, loyalty and long-term commitment.", "purple"),
    panel("🤝", "Voice", "Teamwork and consultation", "Involvement can improve belonging, ideas and acceptance of change.", "blue"),
  ]),
};

export function getBusinessInfographic(sectionHeading: string) {
  return businessInfographics[sectionHeading];
}
