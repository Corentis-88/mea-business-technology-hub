import { publishedContentOverride } from "../content/published";
import type { CaseQuestion, PracticeCase, PracticeEvidence, SupportingFigure } from "../types";

export type { CaseQuestion, PracticeCase, PracticeEvidence, SupportingFigure } from "../types";

export const baselinePracticeCases: PracticeCase[] = [
  {
    id: "looplab",
    title: "LoopLab Repairs",
    theme: "Theme 1 · Small business operations and finance",
    sourceSection: "Section B",
    sourceInstruction: "Read Extract A and look at Figures 1, 2 and 3, then use the source to answer the practice questions.",
    context: [
      "LoopLab Repairs is a phone and games-controller repair kiosk in a busy indoor market in Manchester. It was started three years ago by sole trader Safiya Rahman after she completed an electronics apprenticeship. Customers can bring a damaged device to the kiosk without an appointment. Most repairs are completed on the same day and include a six-month guarantee.",
      "The average repair price is £42 and replacement parts cost an average of £16 per job. LoopLab completes about 28 repairs each week. Demand is highest after school and on Saturdays, when the waiting time can reach 35 minutes. Safiya estimates that six potential customers leave the queue during a typical week, although some may return later or buy a replacement device elsewhere.",
      "Safiya wants to reduce waiting times. An online booking and diagnostic system would cost £1,800, including staff training. It would ask customers about the fault before they arrive and could spread bookings across quieter periods. The supplier requires the full payment immediately. LoopLab's latest cash-flow forecast shows a closing balance of £2,250.",
      "The other option is to employ a part-time assistant on Saturdays for £110 per week. The assistant has repair experience but would need Safiya to check completed work at first. A nearby repair shop has recently started advertising one-hour screen replacements. Online reviews for LoopLab praise its helpful explanations, but several mention queues at the kiosk.",
    ],
    evidence: [
      { id: "wait", label: "Waiting time", quote: "35 minutes", meaning: "Shows the operational problem is significant and may lose customers." },
      { id: "lost", label: "Lost demand", quote: "six potential customers", meaning: "Can be converted into potential revenue or contribution, but the estimate is uncertain." },
      { id: "margin", label: "Contribution", quote: "£26 contribution", meaning: "£42 selling price minus £16 parts cost gives a useful financial case hook." },
      { id: "cash", label: "Cash position", quote: "£2,250", meaning: "Lets the conclusion judge affordability rather than making a generic claim." },
    ],
    chartTitle: "Weekly demand and queue evidence",
    chart: [
      { label: "Repairs completed", value: 28, max: 35, display: "28 per week" },
      { label: "Potential customers leaving", value: 6, max: 35, display: "6 per week" },
      { label: "Maximum waiting time", value: 35, max: 35, display: "35 minutes" },
    ],
    supportingFigure: {
      label: "Figure 3",
      type: "review",
      title: "Recent customer comment",
      body: "“The repair was explained clearly and my controller works perfectly. I nearly left because the Saturday queue was so long.”",
    },
    question: { command: "Justify", marks: 9, prompt: "Justify which of these two options LoopLab Repairs should choose to reduce customer waiting time." },
    questionLadder: [
      { command: "Outline", marks: 2, prompt: "Outline one risk to Safiya of operating LoopLab as a sole trader." },
      { command: "Analyse", marks: 6, prompt: "Analyse the importance to LoopLab of providing good customer service." },
      { command: "Analyse", marks: 6, prompt: "Analyse one impact on LoopLab of the nearby repair shop increasing competition." },
      { command: "Justify", marks: 9, prompt: "Justify which option LoopLab should choose: the online system or a part-time assistant." },
    ],
    strands: [
      { label: "Decision", text: "LoopLab should choose the booking system because it tackles the cause of the queue before customers reach the kiosk." },
      { label: "Leads to", text: "This leads to appointments being spread across the week and fewer customers facing a 35-minute wait." },
      { label: "Therefore", text: "Therefore, LoopLab may recover some of the six potential customers and earn more contribution." },
      { label: "Counterweight", text: "However, the £1,800 payment would use most of its £2,250 cash balance, creating short-term cash-flow risk." },
      { label: "Judgement", text: "The system is preferable if customers use it and it reliably recovers enough lost work; otherwise the flexible weekly assistant cost is safer." },
    ],
    model: [
      "LoopLab should choose the online booking system because it directly reduces the cause of the 35-minute wait. This leads to repairs being spread more evenly across the week, so fewer potential customers may leave. Therefore, the business could recover some of the six potential customers. Each repair produces a £26 contribution before other costs, so recovering all six could add £156 contribution per week.",
      "However, the system costs £1,800. Paying for it from the £2,250 cash balance would leave only £450, which could make it difficult to pay unexpected kiosk or equipment costs. This leads to a short-term cash-flow risk even if the system is useful in the longer term.",
      "Overall, the booking system is the stronger option if customers are willing to book online and it recovers a meaningful share of the six potential customers. Its one-off cost could then be recovered over time. If demand is uncertain, the assistant is safer because the £110 weekly cost can be stopped more easily; therefore LoopLab should test customer use before committing most of its cash.",
    ],
  },
  {
    id: "greenstep",
    title: "GreenStep Mobile Cycles",
    theme: "Theme 1 · Enterprise, market research and viability",
    sourceSection: "Section C",
    sourceInstruction: "Read Extract B and look at Figures 1, 2 and 3, then use the source to answer the practice questions.",
    context: [
      "GreenStep Mobile Cycles is a proposed cycle-servicing business owned by trainee mechanic Daniel Okoro. Instead of renting a workshop, Daniel would travel to customers' homes within an eight-mile radius of Wythenshawe. A standard service would cost £32 and use about £11 of oil, cables and other consumables. More complex repairs would be quoted separately.",
      "Daniel used an online questionnaire shared by two local cycling groups. Of the 120 people who replied, 63% identified at-home convenience as an important reason for choosing a repair service. However, most respondents already cycled regularly and only 18 people were aged over 55. Two established repair shops operate nearby. They have workshops where several bicycles can be repaired at the same time.",
      "Daniel plans to group appointments by postcode to reduce travelling time and fuel use. He expects to complete five standard services on a full working day, but this assumes that customers are at home and each bicycle needs only the work booked. Wet winter weather usually reduces local cycling. It may also make travel between appointments slower.",
      "Daniel has £4,800 of savings. He could use £2,600 to buy a second-hand electric van and tools, or pay £1,250 to join a national mobile-repair franchise. The franchise provides booking software, training and a recognised brand, but charges 8% of monthly sales revenue. Daniel wants GreenStep to build repeat maintenance bookings and become his full-time income within one year.",
    ],
    evidence: [
      { id: "survey", label: "Research", quote: "63%", meaning: "Supports demand, but the sample and distribution method still need evaluation." },
      { id: "contribution", label: "Unit finance", quote: "£21 contribution", meaning: "Shows how each service could contribute towards travel and fixed costs." },
      { id: "radius", label: "Convenience", quote: "eight-mile radius", meaning: "Creates differentiation but also creates travel time and fuel costs." },
      { id: "savings", label: "Finance", quote: "£4,800", meaning: "Provides a buffer, but it is finite if winter demand is weak." },
    ],
    chartTitle: "Selected questionnaire results",
    chart: [
      { label: "Values at-home convenience", value: 63, max: 100, display: "63%" },
      { label: "Values lowest price", value: 41, max: 100, display: "41%" },
      { label: "Would book in winter", value: 29, max: 100, display: "29%" },
    ],
    supportingFigure: {
      label: "Figure 3",
      type: "table",
      title: "Start-up options",
      columns: ["Option", "Initial cost", "Other information"],
      rows: [
        ["Independent", "£2,600", "Own brand; keeps all sales revenue"],
        ["Franchise", "£1,250", "Known brand; 8% of monthly sales"],
      ],
    },
    question: { command: "Evaluate", marks: 12, prompt: "Evaluate whether at-home convenience is likely to be the most important factor in the success of GreenStep Mobile Cycles. You should use the information provided as well as your knowledge of business." },
    questionLadder: [
      { command: "Outline", marks: 2, prompt: "Outline one limitation of Daniel's market research." },
      { command: "Analyse", marks: 6, prompt: "Analyse the benefit to GreenStep of grouping appointments by postcode." },
      { command: "Justify", marks: 9, prompt: "Justify whether Daniel should remain independent or join the franchise." },
      { command: "Evaluate", marks: 12, prompt: "Evaluate whether at-home convenience is likely to be the most important factor in GreenStep's success." },
    ],
    strands: [
      { label: "Argument", text: "GreenStep may succeed because 63% of surveyed cyclists value the convenience it offers." },
      { label: "Leads to", text: "This leads to differentiation from two fixed-location repair shops and could support repeat bookings." },
      { label: "Therefore", text: "Therefore, a £21 contribution per service could build profit if travel time remains efficient." },
      { label: "Counterargument", text: "However, poor winter demand and an eight-mile radius may reduce daily capacity and increase travel costs." },
      { label: "Judgement", text: "Success depends on securing repeat winter work before the £4,800 savings buffer is depleted." },
    ],
    model: [
      "At-home convenience is likely to attract some demand because 63% of 120 cyclists identified it as important. GreenStep's eight-mile radius allows customers to avoid travelling to either of the two established repair shops. This leads to clear differentiation and may encourage busy customers to pay £32. With £11 of consumables, each service creates a £21 contribution towards travel and other costs.",
      "However, convenience does not guarantee enough sales. Only 29% of respondents said they would book in winter, when cycling and servicing demand may fall. Travelling across an eight-mile radius also limits the number of appointments completed each day. This could increase fuel cost per service and reduce total contribution, while the two established competitors can repair several bicycles at once.",
      "Overall, convenience is important, but reliable year-round demand is more important to success. The £4,800 savings provide time to build demand, yet they are finite. GreenStep is most likely to succeed if Daniel turns the 63% interest into repeat maintenance bookings, groups appointments by postcode and confirms enough winter demand before relying on the business as his full-time income.",
    ],
  },
  {
    id: "orbit",
    title: "Orbit Cases Ltd",
    theme: "Theme 2 · Quality, growth and competitive advantage",
    sourceSection: "Section C",
    sourceInstruction: "Read Extract B and look at Figures 1, 2 and 3, then use the source to answer the practice questions.",
    context: [
      "Orbit Cases Ltd manufactures protective tablet and phone cases from recycled polymer at a factory in Stockport. The company began as an online start-up eight years ago and now employs 48 people. Its best-selling case has reinforced corners and a replaceable inner lining. Orbit sells mainly through its own website, although three electronics retailers also stock a limited range.",
      "Orbit's average selling price is £34. The closest rival sells a similar-looking case for £19. In a survey emailed to 600 previous customers, 214 people replied and 71% selected protection as the feature they considered most important. Orbit's product return rate was 2.1% last year. Some five-star reviews describe phones surviving falls onto concrete, but several recent reviews question whether the price is too high.",
      "Online sales revenue grew by 24% last year after Orbit paid a technology reviewer to test its products. The video attracted 1.2 million views. Managers are considering selling in Germany and the Netherlands, where customers would pay delivery charges. Exporting could increase sales, but new packaging and translated website pages would cost £46,000.",
      "The price of recycled polymer has increased by 18% following supply shortages. Orbit could continue using its current material and raise its price by £3, or change to a cheaper polymer that passed the legal safety tests but performed less well in Orbit's drop test. Managers must decide how far very high quality should remain the basis of the company's growth.",
    ],
    evidence: [
      { id: "quality", label: "Customer priority", quote: "71%", meaning: "Supports a quality-based competitive advantage, but comes from previous customers." },
      { id: "returns", label: "Returns", quote: "2.1%", meaning: "Suggests reliable products and lower replacement or complaint costs." },
      { id: "price", label: "Price gap", quote: "£15 price gap", meaning: "Quality supports a premium, but price-sensitive customers may choose the rival." },
      { id: "materials", label: "Input cost", quote: "18%", meaning: "Tests whether quality remains affordable and profitable." },
    ],
    chartTitle: "Customer survey and performance",
    chart: [
      { label: "Customers prioritising protection", value: 71, max: 100, display: "71%" },
      { label: "Online sales revenue growth", value: 24, max: 100, display: "24%" },
      { label: "Product return rate", value: 2.1, max: 100, display: "2.1%" },
    ],
    supportingFigure: {
      label: "Figure 3",
      type: "table",
      title: "Product comparison",
      columns: ["Business", "Average price", "Product position"],
      rows: [
        ["Orbit", "£34", "Recycled polymer; reinforced corners"],
        ["Closest rival", "£19", "Standard protection; wider retail range"],
      ],
    },
    question: { command: "Evaluate", marks: 12, prompt: "Evaluate the importance of quality to the continued growth of Orbit Cases Ltd. You should use the information provided as well as your knowledge of business." },
    questionLadder: [
      { command: "Outline", marks: 2, prompt: "Outline one benefit to Orbit of selling through electronics retailers." },
      { command: "Analyse", marks: 6, prompt: "Analyse one benefit to Orbit of using online promotion." },
      { command: "Justify", marks: 9, prompt: "Justify whether Orbit should raise its price or change to the cheaper polymer." },
      { command: "Evaluate", marks: 12, prompt: "Evaluate the importance of quality to Orbit's continued growth." },
    ],
    strands: [
      { label: "Argument", text: "Quality is important because 71% of customers identify protection as their main priority." },
      { label: "Leads to", text: "This leads to differentiation and helps justify Orbit's premium price." },
      { label: "Therefore", text: "Therefore, the low 2.1% return rate can protect reputation and reduce failure costs." },
      { label: "Counterargument", text: "However, an 18% material-cost rise and £15 price gap could make value and cost control more important." },
      { label: "Judgement", text: "Quality remains central only while the target segment continues to value protection enough to pay the premium." },
    ],
    model: [
      "Quality is important to Orbit's continued growth because 71% prioritise protection when buying a case. This leads to a strong quality-based USP and helps the business justify charging £34. The 2.1% return rate also suggests that few products fail, which may protect reviews and reduce replacement costs. Therefore, quality can support repeat purchases and continued online growth.",
      "However, Orbit has a £15 price gap over its closest rival and recycled-polymer costs have risen by 18%. Maintaining the highest specification could force another price increase or reduce profit margins. This leads to a risk that price-sensitive customers choose the £19 rival even if its protection is weaker. Promotion, cost control and communicating the environmental benefit may therefore be equally important.",
      "Overall, quality remains the most important factor while Orbit targets customers who prioritise protection and the 2.1% return rate remains low. However, the 24% online sales growth will continue only if customers still believe the extra protection is worth the £15 price gap. Orbit should protect the features customers notice while redesigning less important elements to absorb part of the 18% material-cost rise.",
    ],
  },
];

export const practiceCases: PracticeCase[] = publishedContentOverride?.practiceCases ?? baselinePracticeCases;
