import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowDown, ArrowUp, Check, Copy, GripVertical, Plus, RotateCcw, Shuffle, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

type QuestionType = "3" | "6-discuss" | "6-analyse" | "9" | "12";
interface Chain { pointBecause: string; leadsTo: string; therefore: string; }

type PracticeType = "explain" | "justify" | "discuss" | "evaluate";
interface PracticeCard { id: string; stage: string; text: string; }
interface PracticeExample { question: string; hint: string; cards: PracticeCard[]; }

const practiceExamples: Record<PracticeType, PracticeExample[]> = {
  explain: [{
    question: "Explain one benefit to a small business of using social media promotion.",
    hint: "Build one clear chain from the benefit to its final business effect.",
    cards: [
      { id: "explain-point", stage: "Point + because", text: "Social media promotion may reduce advertising costs because a business can post content without paying to print it." },
      { id: "explain-leads", stage: "Leads To", text: "This leads to more of the marketing budget being available for other business needs." },
      { id: "explain-therefore", stage: "Therefore", text: "Therefore, the business may lower its total costs and improve its profit." },
    ],
  }],
  justify: [{
    question: "Northside Bakes has a £2,000 promotion budget. Social media costs £600 and a newspaper advert costs £1,800. Justify choosing social media.",
    hint: "Develop the chosen option, then finish with a decision linked to this business.",
    cards: [
      { id: "justify-point", stage: "Point + because", text: "Northside Bakes should choose social media because it costs £600, compared with £1,800 for the newspaper advert." },
      { id: "justify-leads", stage: "Leads To", text: "This leads to £1,400 of its £2,000 budget remaining for other promotion or business costs." },
      { id: "justify-therefore", stage: "Therefore", text: "Therefore, social media is the better choice if its target customers use it, because Northside Bakes can promote itself without using nearly all of its budget." },
    ],
  }],
  discuss: [{
    question: "Discuss the impact on a business of selling through e-commerce.",
    hint: "This Discuss question needs developed reasoning. It does not need case-study context or a conclusion.",
    cards: [
      { id: "discuss-point", stage: "Point + because", text: "E-commerce may increase a business's market size because customers can buy from locations beyond its local area." },
      { id: "discuss-leads", stage: "Leads To", text: "This leads to the business reaching more potential customers at any time of day." },
      { id: "discuss-therefore", stage: "Therefore", text: "Therefore, sales revenue may rise, although the business will also face website, delivery and online competition costs." },
    ],
  }],
  evaluate: [{
    question: "Peak Bottles sells a durable bottle for £24. Research says 68% of its customers value durability, but a rival charges £16 and Peak's costs have risen by 20%. Evaluate whether Peak should keep its £24 price.",
    hint: "Link both sides, then place the supported and conditional judgement last.",
    cards: [
      { id: "evaluate-support", stage: "Supporting BLT", text: "Peak may keep the £24 price because 68% of its customers value durability, which leads to these customers accepting a premium price for a bottle that lasts." },
      { id: "evaluate-challenge", stage: "Challenging BLT", text: "However, the rival's £16 price may attract price-sensitive customers, which could lead to Peak losing sales despite its costs rising by 20%." },
      { id: "evaluate-judgement", stage: "Judgement BLT", text: "Therefore, Peak should keep the £24 price only if the durability benefit is clear enough to retain its target customers, because the higher price can then help cover its 20% cost increase." },
    ],
  }],
};

function shuffled(cards: PracticeCard[]) {
  const mixed = [...cards];
  for (let index = mixed.length - 1; index > 0; index -= 1) {
    const swapWith = Math.floor(Math.random() * (index + 1));
    [mixed[index], mixed[swapWith]] = [mixed[swapWith], mixed[index]];
  }
  if (mixed.every((card, index) => card.id === cards[index].id) && mixed.length > 1) {
    [mixed[0], mixed[1]] = [mixed[1], mixed[0]];
  }
  return mixed;
}

function SortablePracticeCard({ card, index, count, move }: { card: PracticeCard; index: number; count: number; move: (from: number, to: number) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id });
  return <article ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={`blt-order-card${isDragging ? " is-dragging" : ""}`}>
    <button type="button" className="blt-drag-handle" aria-label={`Drag answer part ${index + 1}`} {...attributes} {...listeners}><GripVertical aria-hidden="true" /></button>
    <span className="blt-card-number" aria-hidden="true">{index + 1}</span>
    <p>{card.text}</p>
    <div className="blt-card-moves" aria-label="Move this answer part">
      <button type="button" disabled={index === 0} onClick={() => move(index, index - 1)} aria-label={`Move answer part ${index + 1} up`}><ArrowUp /></button>
      <button type="button" disabled={index === count - 1} onClick={() => move(index, index + 1)} aria-label={`Move answer part ${index + 1} down`}><ArrowDown /></button>
    </div>
  </article>;
}

function BLTOrderingPractice() {
  const [type, setType] = useState<PracticeType>("explain");
  const [exampleIndex, setExampleIndex] = useState(0);
  const example = practiceExamples[type][exampleIndex];
  const [cards, setCards] = useState(() => shuffled(example.cards));
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const load = (nextType: PracticeType, nextIndex = 0) => { const next = practiceExamples[nextType][nextIndex]; setType(nextType); setExampleIndex(nextIndex); setCards(shuffled(next.cards)); setResult(null); };
  const move = (from: number, to: number) => { setCards((current) => arrayMove(current, from, to)); setResult(null); };
  const dragEnd = ({ active, over }: DragEndEvent) => { if (over && active.id !== over.id) setCards((current) => arrayMove(current, current.findIndex(({ id }) => id === active.id), current.findIndex(({ id }) => id === over.id))); setResult(null); };
  const check = () => setResult(cards.every((card, index) => card.id === example.cards[index].id) ? "correct" : "incorrect");
  const next = () => { const types = Object.keys(practiceExamples) as PracticeType[]; load(types[(types.indexOf(type) + 1) % types.length]); };

  return <section className="blt-order-practice" aria-labelledby="blt-order-heading">
    <header><div><span className="eyebrow">Interactive practice · Pearson Business only</span><h2 id="blt-order-heading">Put the answer in the correct order</h2><p>Drag the answer parts into place. On a phone, use the arrow buttons. With a keyboard, focus the grip, press Space, use the arrow keys, then press Space again.</p></div></header>
    <div className="blt-practice-types" aria-label="Choose a question type">{(Object.keys(practiceExamples) as PracticeType[]).map((key) => <button type="button" key={key} aria-pressed={type === key} onClick={() => load(key)}>{key[0].toUpperCase() + key.slice(1)}</button>)}</div>
    <div className="blt-practice-question"><span>{type}</span><h3>{example.question}</h3><p>{example.hint}</p></div>
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={dragEnd}>
      <SortableContext items={cards.map(({ id }) => id)} strategy={verticalListSortingStrategy}>
        <div className="blt-order-list">{cards.map((card, index) => <SortablePracticeCard key={card.id} card={card} index={index} count={cards.length} move={move} />)}</div>
      </SortableContext>
    </DndContext>
    {result && <div className={`blt-order-feedback blt-order-feedback--${result}`} role="status">
      {result === "correct" ? <Check /> : <RotateCcw />}
      <div><p><strong>{result === "correct" ? "Correct — you built a logical answer." : "Not quite yet. Check each position below."}</strong></p>
        <ol>{cards.map((card, index) => <li key={card.id} className={card.id === example.cards[index].id ? "is-correct" : "is-wrong"}><b>Position {index + 1}:</b> {card.id === example.cards[index].id ? "Correct" : `This should be ${example.cards[index].stage}.`}</li>)}</ol>
        <details><summary>Show the correctly ordered answer</summary>{example.cards.map((card) => <p key={card.id}><b>{card.stage}:</b> {card.text}</p>)}</details>
      </div>
    </div>}
    <div className="blt-order-actions"><button className="button button--primary" type="button" onClick={check}><Check /> Check answer</button><button className="button button--ghost" type="button" onClick={() => { setCards(shuffled(example.cards)); setResult(null); }}><Shuffle /> Mix again</button><button className="button button--secondary" type="button" onClick={next}>Next question type</button></div>
  </section>;
}

const blank = (): Chain => ({ pointBecause: "", leadsTo: "", therefore: "" });
const config: Record<QuestionType, { label: string; chains: number; context: boolean; judgement: boolean; help: string }> = {
  "3": { label: "3-mark Explain", chains: 1, context: false, judgement: false, help: "One complete BLT answers one three-mark question." },
  "6-discuss": { label: "6-mark Discuss", chains: 2, context: false, judgement: false, help: "Build two relevant chains. A conclusion is not required." },
  "6-analyse": { label: "6-mark Analyse", chains: 2, context: true, judgement: false, help: "Build developed chains and apply the named business throughout." },
  "9": { label: "9-mark Justify", chains: 2, context: true, judgement: true, help: "Analyse the chosen option, then use a judgement BLT to explain why it fits this business." },
  "12": { label: "12-mark Evaluate", chains: 2, context: true, judgement: true, help: "Develop supporting and challenging reasoning, then make a conditional judgement." },
};

function validate(chain: Chain) {
  const errors: string[] = [];
  const first = chain.pointBecause.trim();
  if (/^because\b/i.test(first)) errors.push("‘Because’ cannot start the sentence. Make the business point first.");
  if (!/\bbecause\b/i.test(first)) errors.push("Add ‘because’ after your initial business point.");
  if (chain.leadsTo.trim().length < 8) errors.push("Develop the immediate consequence in Leads To.");
  if (chain.therefore.trim().length < 8) errors.push("Finish with a specific business effect in Therefore.");
  return errors;
}

export function BLTBuilder() {
  const [type, setType] = useState<QuestionType>("3");
  const [chains, setChains] = useState<Chain[]>([blank()]);
  const [judgement, setJudgement] = useState<Chain>(blank());
  const [copied, setCopied] = useState(false);
  const mode = config[type];

  const changeType = (next: QuestionType) => {
    setType(next);
    setChains(Array.from({ length: config[next].chains }, (_, index) => chains[index] ?? blank()));
  };

  const chainText = (chain: Chain) => `${chain.pointBecause.trim()} This leads to ${chain.leadsTo.trim()}. Therefore, ${chain.therefore.trim()}.`;
  const answer = useMemo(() => [
    ...chains.map(chainText),
    ...(mode.judgement ? [`Overall, ${chainText(judgement)}`] : []),
  ].join("\n\n"), [chains, judgement, mode.judgement]);
  const errors = chains.flatMap((chain, index) => validate(chain).map((error) => `BLT ${index + 1}: ${error}`));
  if (mode.judgement) errors.push(...validate(judgement).map((error) => `Judgement: ${error}`));

  const update = (index: number, key: keyof Chain, value: string) => setChains((current) => current.map((chain, chainIndex) => chainIndex === index ? { ...chain, [key]: value } : chain));
  const copy = async () => { await navigator.clipboard.writeText(answer); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const reset = () => { setChains(Array.from({ length: mode.chains }, blank)); setJudgement(blank()); };

  return (
    <div className="blt-builder">
      <div className="blt-intro">
        <div><span className="eyebrow">MEA method · Pearson Business only</span><h2>Build an answer with BLT</h2><p>Make the business point first. The word <strong>because must never start a sentence</strong>.</p></div>
        <div className="blt-pattern" aria-label="The three parts of a BLT answer">
          <span><small>1. Make your point and explain why</small><b>Training may improve service because staff know how to help customers.</b></span>
          <i>→</i>
          <span><small>2. Explain what happens next</small><b>This leads to customers receiving better service.</b></span>
          <i>→</i>
          <span><small>3. Give the final business effect</small><b>Therefore, repeat purchases may increase.</b></span>
        </div>
      </div>
      <BLTOrderingPractice />
      <div className="blt-freewrite-intro"><span className="eyebrow">Now write your own</span><h2>Build your own BLT answer</h2><p>Choose the question type, then write each link yourself. Your complete answer appears at the bottom.</p></div>
      <div className="segmented-control" aria-label="Question type">
        {(Object.keys(config) as QuestionType[]).map((key) => <button type="button" key={key} aria-pressed={type === key} onClick={() => changeType(key)}>{config[key].label}</button>)}
      </div>
      <div className="blt-mode-help"><strong>{mode.label}</strong><span>{mode.help}</span>{mode.context && <span className="context-chip">Use the business context</span>}</div>
      <div className="blt-chain-list">
        {chains.map((chain, index) => (
          <section className="blt-chain" key={index}>
            <div className="blt-chain__header"><h3>BLT {index + 1}</h3>{chains.length > mode.chains && <button className="icon-button" type="button" aria-label={`Remove BLT ${index + 1}`} onClick={() => setChains((current) => current.filter((_, chainIndex) => chainIndex !== index))}><Trash2 size={17} /></button>}</div>
            <label><span>Business point + because</span><textarea value={chain.pointBecause} onChange={(event) => update(index, "pointBecause", event.target.value)} placeholder="Training may improve customer service because employees will know how to handle complaints." /></label>
            <label><span>This leads to…</span><textarea value={chain.leadsTo} onChange={(event) => update(index, "leadsTo", event.target.value)} placeholder="customers receiving a faster and more helpful response" /></label>
            <label><span>Therefore…</span><textarea value={chain.therefore} onChange={(event) => update(index, "therefore", event.target.value)} placeholder="customer satisfaction and repeat purchases may increase" /></label>
          </section>
        ))}
        {chains.length < 3 && type !== "3" && <button type="button" className="button button--ghost add-chain" onClick={() => setChains((current) => [...current, blank()])}><Plus size={17} /> Add another developed BLT</button>}
        {mode.judgement && (
          <section className="blt-chain blt-chain--judgement">
            <div className="blt-chain__header"><div><span className="eyebrow">Evaluation layer</span><h3>Judgement BLT</h3></div></div>
            <label><span>Decision + because</span><textarea value={judgement.pointBecause} onChange={(event) => setJudgement((value) => ({ ...value, pointBecause: event.target.value }))} placeholder="Option A is the better choice because it matches the business's limited budget." /></label>
            <label><span>This leads to…</span><textarea value={judgement.leadsTo} onChange={(event) => setJudgement((value) => ({ ...value, leadsTo: event.target.value }))} placeholder="the business achieving its objective without increasing borrowing" /></label>
            <label><span>Therefore…</span><textarea value={judgement.therefore} onChange={(event) => setJudgement((value) => ({ ...value, therefore: event.target.value }))} placeholder="Option A is preferable, provided demand remains high enough" /></label>
          </section>
        )}
      </div>
      <section className="blt-preview">
        <div className="blt-preview__header"><div><span className="eyebrow">Live answer preview</span><h3>Your complete response</h3></div><div><button type="button" className="button button--ghost" onClick={reset}><RotateCcw size={16} /> Reset</button><button type="button" className="button button--secondary" disabled={errors.length > 0} onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied" : "Copy answer"}</button></div></div>
        {answer.replace(/[.\s]/g, "") ? <p className="answer-preview">{answer}</p> : <p className="empty-preview">Your answer will appear here as you build each link.</p>}
        {errors.length > 0 && <ul className="validation-list">{errors.map((error) => <li key={error}>{error}</li>)}</ul>}
      </section>
    </div>
  );
}
