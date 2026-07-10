import { ArrowRight, BarChart3, Bike, BookOpenCheck, CheckCircle2, ChevronRight, Link2, PackageCheck, PenLine, ShieldCheck, Smartphone } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { practiceCases, type PracticeEvidence } from "../data/extendedWriting";
import { officialDocumentHref } from "../data/resources";

const commands = [
  { name: "Explain", marks: 3, context: "One developed business point", method: "State the point, explain why it happens, then develop the consequence. One complete BLT gives the required linked chain." },
  { name: "Discuss", marks: 6, context: "No set case context", method: "Develop two accurate, connected chains. Examples may illustrate a point, but application is not assessed." },
  { name: "Analyse", marks: 6, context: "Supplied business context", method: "Build one or two chains with case evidence worked through the reasoning. Do not add a judgement paragraph." },
  { name: "Justify", marks: 9, context: "Usually two options", method: "Choose one option, develop its benefits and drawbacks, then make a contextual decision that adds a new reason." },
  { name: "Evaluate", marks: 12, context: "A business situation", method: "Develop an argument and counterargument, then reach a supported conclusion explaining what the outcome depends on." },
];

const explainExamples = [
  {
    topic: "Enterprise and entrepreneurship",
    question: "Explain one reward of becoming an entrepreneur. (3)",
    point: "An entrepreneur may gain independence because they can make their own business decisions.",
    leads: "This leads to the business reflecting the entrepreneur's own objectives and ideas.",
    therefore: "Therefore, the entrepreneur may gain greater personal satisfaction from its success.",
  },
  {
    topic: "Competition",
    question: "Explain one disadvantage to a small business of operating in a highly competitive market. (3)",
    point: "A small business may need to reduce its prices because customers can easily switch to a competitor.",
    leads: "This leads to the business receiving less revenue from each sale.",
    therefore: "Therefore, its profit may fall if costs remain unchanged.",
  },
  {
    topic: "Market segmentation",
    question: "Explain one benefit to a business of segmenting its market. (3)",
    point: "A business can make promotion more relevant because it understands the needs of a particular customer group.",
    leads: "This leads to more customers in that segment noticing and responding to the promotion.",
    therefore: "Therefore, sales revenue may increase if more of the targeted customers make a purchase.",
  },
  {
    topic: "Human resources",
    question: "Explain one impact on a business of improving employee training. (3)",
    point: "Customer service may improve because trained employees know how to answer questions and resolve complaints.",
    leads: "This leads to customers receiving a faster and more helpful service.",
    therefore: "Therefore, customer satisfaction and repeat purchases may increase.",
  },
];

function evidenceText(text: string, evidence: PracticeEvidence[], active: string | null): ReactNode[] {
  const lower = text.toLowerCase();
  const matches = evidence.map((item) => ({ item, start: lower.indexOf(item.quote.toLowerCase()) })).filter((match) => match.start >= 0).sort((a, b) => a.start - b.start);
  if (!matches.length) return [text];
  const nodes: ReactNode[] = [];
  let cursor = 0;
  matches.forEach(({ item, start }) => {
    if (start > cursor) nodes.push(text.slice(cursor, start));
    const end = start + item.quote.length;
    nodes.push(<mark key={`${item.id}-${start}`} className={active && active !== item.id ? "is-muted" : ""}>{text.slice(start, end)}</mark>);
    cursor = end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function CaseSourceIllustration({ caseId, title }: { caseId: string; title: string }) {
  const Icon = caseId === "looplab" ? Smartphone : caseId === "greenstep" ? Bike : PackageCheck;
  const caption = caseId === "looplab" ? "Same-day device repairs at the market kiosk" : caseId === "greenstep" ? "A mobile service travels to the customer" : "Protective cases made from recycled polymer";
  return (
    <figure className={`case-source-image case-source-image--${caseId}`} aria-label={`Original illustration for ${title}`}>
      <div aria-hidden="true"><Icon /><span /><i /></div>
      <figcaption><b>Figure 1</b>{caption}</figcaption>
    </figure>
  );
}

export function ExtendedWritingPage() {
  const [caseId, setCaseId] = useState(practiceCases[0].id);
  const [activeEvidence, setActiveEvidence] = useState<string | null>(null);
  const practiceCase = practiceCases.find((item) => item.id === caseId)!;
  return (
    <div className="extended-writing-page" style={{ "--course-accent": "#2f68b2" } as React.CSSProperties}>
      <header className="extended-writing-hero"><div className="page-section"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><ChevronRight size={14} /><Link to="/course/business">Business GCSE</Link><ChevronRight size={14} /><span>Extended writing</span></nav><span className="eyebrow">Pearson Edexcel Business only</span><h1>Build connected case-study answers</h1><p>Move from a precise case hook to a logical chain, counterweight and supported judgement. BLT is MEA's writing method; the assessment guidance below is checked against Pearson materials.</p><div className="extended-writing-hero__actions"><Link className="button button--primary" to="/business/blt">Open BLT builder <ArrowRight size={16} /></Link><a className="button button--secondary" href={officialDocumentHref("pearson-business-sample-assessment-materials.pdf")}>View official sample materials</a></div></div></header>
      <main className="page-section extended-writing-content">
        <section><div className="section-heading"><div><span className="eyebrow">Know the task</span><h2>Command words change what the chain must do</h2></div><p>Application means using a case detail inside valid reasoning. Naming the company or copying an extract sentence is not enough.</p></div><div className="command-grid">{commands.map((command) => <article key={command.name}><span>{command.marks} marks</span><h3>{command.name}</h3><b>{command.context}</b><p>{command.method}</p></article>)}</div></section>
        <section className="explain-workshop" id="explain"><div className="section-heading"><div><span className="eyebrow">3-mark Explain</span><h2>Build one complete BLT</h2></div><p>The connector words do not earn marks by themselves. Each sentence must add a valid, linked piece of business reasoning.</p></div>
          <div className="explain-formula" aria-label="Explain answer method: point because reason, leads to consequence, therefore final business effect"><div><span>1</span><b>Point + because</b><p>Answer the exact question and give the business reason.</p></div><i aria-hidden="true">→</i><div><span>2</span><b>Leads To</b><p>Develop the immediate consequence for the business or stakeholder.</p></div><i aria-hidden="true">→</i><div><span>3</span><b>Therefore</b><p>Finish with a specific effect such as sales, cost, profit, satisfaction or survival.</p></div></div>
          <div className="explain-rule"><CheckCircle2 /><div><b>Formulation rule</b><p>Write the business point first and place “because” inside that sentence. Never begin the sentence with “Because”. Then add “This leads to…” and “Therefore…”.</p></div></div>
          <div className="explain-example-grid">{explainExamples.map((example, index) => <article key={example.question}><header><span>Example {index + 1}</span><small>{example.topic}</small><h3>{example.question}</h3></header><div className="mini-blt"><div><b>Point + because</b><p>{example.point}</p></div><div><b>Leads To</b><p>{example.leads}</p></div><div><b>Therefore</b><p>{example.therefore}</p></div></div><div className="explain-complete"><span>Completed answer</span><p>{example.point} {example.leads} {example.therefore}</p></div></article>)}</div>
          <div className="explain-next"><p><b>Self-check:</b> Is there one clear point, two developed links and a final business effect? If a sentence merely repeats the previous one, the chain has not developed.</p><Link className="button button--secondary" to="/business/blt">Practise in the BLT builder <ArrowRight size={16} /></Link></div>
        </section>
        <section className="case-lab"><div className="section-heading"><div><span className="eyebrow">Original MEA practice</span><h2>Case-study strand lab</h2></div><p>These fictional cases imitate the information structure of Pearson source booklets without copying a past-paper case.</p></div>
          <div className="case-tabs" role="tablist" aria-label="Practice cases">{practiceCases.map((item) => <button key={item.id} role="tab" aria-selected={caseId === item.id} onClick={() => { setCaseId(item.id); setActiveEvidence(null); }}>{item.title}</button>)}</div>
          <article className="source-booklet">
            <header><span>Original MEA practice case · Not a Pearson past paper</span><h2>{practiceCase.title}</h2><p>{practiceCase.theme}</p></header>
            <div className="source-booklet__instruction"><b>{practiceCase.sourceSection}</b><p>{practiceCase.sourceInstruction}</p></div>
            <div className="source-booklet__grid">
              <div className="case-extract"><span className="eyebrow">{practiceCase.sourceSection === "Section B" ? "Extract A" : "Extract B"}</span>{practiceCase.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              <CaseSourceIllustration caseId={practiceCase.id} title={practiceCase.title} />
            </div>
            <div className="source-figures">
              <figure className="case-chart"><div><BarChart3 /><span><b>Figure 2</b>{practiceCase.chartTitle}</span></div>{practiceCase.chart.map((bar) => <div className="case-bar" key={bar.label}><span><b>{bar.label}</b><strong>{bar.display}</strong></span><i><u style={{ width: `${Math.max(4, (bar.value / bar.max) * 100)}%` }} /></i></div>)}<figcaption>Values are fictional and provided only for exam practice.</figcaption></figure>
              <figure className={`case-supporting-figure case-supporting-figure--${practiceCase.supportingFigure.type}`}>
                <figcaption><b>{practiceCase.supportingFigure.label}</b>{practiceCase.supportingFigure.title}</figcaption>
                {practiceCase.supportingFigure.type === "review" ? <blockquote>{practiceCase.supportingFigure.body}</blockquote> : <div className="case-table-wrap"><table><thead><tr>{practiceCase.supportingFigure.columns?.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{practiceCase.supportingFigure.rows?.map((row) => <tr key={row.join("-")}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>}
              </figure>
            </div>
            <section className="case-question-ladder" aria-labelledby="practice-question-set"><div><span className="eyebrow">Practice question set</span><h3 id="practice-question-set">Use the same source at different mark levels</h3></div><ol>{practiceCase.questionLadder.map((item) => <li key={`${item.command}-${item.marks}`}><span className="command-chip">{item.command}</span><p>{item.prompt}</p><b>({item.marks})</b></li>)}</ol></section>
            <div className="case-question"><span className="command-chip">Completed example: {practiceCase.question.command}</span><p>{practiceCase.question.prompt}</p><b>({practiceCase.question.marks})</b></div>
          </article>
          <div className="evidence-lab"><section><span className="eyebrow">Step 1 · Evidence bank</span><h2>Choose a fact that changes the reasoning</h2><p>Select a hook to highlight where it is applied in the example answer.</p><div className="evidence-buttons">{practiceCase.evidence.map((item) => <button key={item.id} type="button" aria-pressed={activeEvidence === item.id} onClick={() => setActiveEvidence(activeEvidence === item.id ? null : item.id)}><b>{item.label}</b><span>{item.quote}</span><small>{item.meaning}</small></button>)}</div></section><section><span className="eyebrow">Step 2 · Connected strand</span><h2>Work the evidence through BLT</h2><div className="strand-map">{practiceCase.strands.map((strand, index) => <div key={strand.label}>{index > 0 && <Link2 aria-hidden="true" />}<span>{strand.label}</span><p>{strand.text}</p></div>)}</div><div className="because-rule"><CheckCircle2 /><p><b>Sentence rule:</b> make the business point first, then use “because”. The word “Because” never starts the sentence.</p></div></section></div>
          <section className="annotated-answer"><div className="section-heading"><div><span className="eyebrow">Step 3 · Completed example</span><h2>See evidence inside the answer</h2></div><p>Highlighted words are case hooks. Each hook is developed rather than merely repeated.</p></div>{practiceCase.model.map((paragraph, index) => <div className="answer-strand" key={paragraph}><span>{index === practiceCase.model.length - 1 ? "Judgement" : index === 0 ? "Main strand" : "Counter-strand"}</span><p>{evidenceText(paragraph, practiceCase.evidence, activeEvidence)}</p></div>)}</section>
        </section>
        <section className="writing-evidence-note"><ShieldCheck /><div><h2>Why this section is evidence-safe</h2><p>Pearson's public materials confirm that high-level answers need detailed application, interconnected reasoning and—where required—a supported judgement. The businesses, figures, questions and answers on this page are original fictional practice. Official past papers remain in the Materials library.</p><div><a href={officialDocumentHref("pearson-business-9-mark-model-answers.pdf")}><BookOpenCheck />Official 9-mark models</a><a href={officialDocumentHref("pearson-business-12-mark-model-answers.pdf")}><BookOpenCheck />Official 12-mark models</a><Link to="/materials?course=business"><PenLine />All Business materials</Link></div></div></section>
      </main>
    </div>
  );
}
