import { useId, type CSSProperties, type ReactNode } from "react";
import type { VisualSpec } from "../types";
import "./visuals.css";

export interface LearningVisualProps {
  visual?: VisualSpec;
  spec?: VisualSpec;
}

const fallback: VisualSpec = {
  kind: "plan-create-review",
  title: "Plan, create and review",
  caption: "A production cycle improves a product through testing and reflection.",
};

function pick(items: string[] | undefined, defaults: string[]) {
  return items?.length ? items : defaults;
}

function Svg({ title, description, children, viewBox = "0 0 640 300" }: {
  title: string;
  description: string;
  children: ReactNode;
  viewBox?: string;
}) {
  const id = `visual-${useId().replace(/:/g, "")}`;
  return (
    <svg className="learning-visual__svg" viewBox={viewBox} role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{description}</desc>
      {children}
    </svg>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const points = [
    [x2, y2],
    [x2 - size * Math.cos(angle - Math.PI / 6), y2 - size * Math.sin(angle - Math.PI / 6)],
    [x2 - size * Math.cos(angle + Math.PI / 6), y2 - size * Math.sin(angle + Math.PI / 6)],
  ].map(([x, y]) => `${x},${y}`).join(" ");
  return <g><line className="v-line v-arrow" x1={x1} y1={y1} x2={x2} y2={y2} /><polygon className="v-arrowhead" points={points} /></g>;
}

function Pill({ x, y, width, label, className = "" }: { x: number; y: number; width: number; label: string; className?: string }) {
  return (
    <g className={className}>
      <rect className="v-panel" x={x} y={y} width={width} height="52" rx="14" />
      <text className="v-label" x={x + width / 2} y={y + 31} textAnchor="middle">{label}</text>
    </g>
  );
}

function BreakEven({ spec }: { spec: VisualSpec }) {
  const [costs, revenue, point] = pick(spec.labels, ["Total costs", "Sales revenue", "Break-even"]);
  return <Svg title={spec.title} description="A break-even chart showing total costs and sales revenue crossing at the break-even point.">
    <line className="v-axis" x1="72" y1="248" x2="590" y2="248" />
    <line className="v-axis" x1="72" y1="248" x2="72" y2="28" />
    <text className="v-caption" x="330" y="286" textAnchor="middle">Output / sales</text>
    <text className="v-caption" x="20" y="145" textAnchor="middle" transform="rotate(-90 20 145)">Costs and revenue</text>
    <path className="v-series v-series--soft" d="M72 205 L570 55" />
    <path className="v-series" d="M72 248 L570 35" />
    <circle className="v-focus" cx="360" cy="126" r="8" />
    <line className="v-guide" x1="360" y1="126" x2="360" y2="248" />
    <text className="v-label" x="378" y="117">{point}</text>
    <text className="v-note" x="488" y="80">{costs}</text><text className="v-note" x="480" y="42">{revenue}</text>
    <text className="v-badge" x="160" y="90">LOSS</text><text className="v-badge" x="445" y="188">PROFIT</text>
  </Svg>;
}

function CashFlow({ spec }: { spec: VisualSpec }) {
  const [inflow, outflow, net, closing] = pick(spec.labels, ["Cash inflows", "Cash outflows", "Net cash flow", "Closing balance"]);
  return <div className="v-cash" role="img" aria-label="Cash flow diagram: inflows minus outflows equals net cash flow, which updates the closing balance.">
    <div className="v-money v-money--in"><b>＋</b><span>{inflow}</span><small>Money entering</small></div>
    <div className="v-operator">−</div>
    <div className="v-money"><b>−</b><span>{outflow}</span><small>Money leaving</small></div>
    <div className="v-operator">=</div>
    <div className="v-money v-money--net"><b>↕</b><span>{net}</span><small>Inflows − outflows</small></div>
    <div className="v-formula"><strong>Opening balance + {net}</strong><span aria-hidden="true">→</span><strong>{closing}</strong></div>
  </div>;
}

function MarketingMix({ spec }: { spec: VisualSpec }) {
  const labels = pick(spec.labels, ["Product", "Price", "Place", "Promotion"]);
  return <Svg title={spec.title} description="The four elements of the marketing mix surround the target customer and must work together.">
    <circle className="v-center" cx="320" cy="150" r="68" /><text className="v-center-label" x="320" y="144" textAnchor="middle">Target</text><text className="v-center-label" x="320" y="170" textAnchor="middle">customer</text>
    <Pill x={45} y={40} width={170} label={labels[0]} /><Pill x={425} y={40} width={170} label={labels[1]} />
    <Pill x={45} y={208} width={170} label={labels[2]} /><Pill x={425} y={208} width={170} label={labels[3]} />
    <Arrow x1={215} y1={87} x2={266} y2={119} /><Arrow x1={425} y1={87} x2={374} y2={119} /><Arrow x1={215} y1={226} x2={266} y2={188} /><Arrow x1={425} y1={226} x2={374} y2={188} />
  </Svg>;
}

function ProductLifeCycle({ spec }: { spec: VisualSpec }) {
  const labels = pick(spec.labels, ["Introduction", "Growth", "Maturity", "Decline"]);
  const markers = labels.map((_, index) => 95 + index * (470 / Math.max(1, labels.length - 1)));
  return <Svg title={spec.title} description="A product life cycle curve moving through introduction, growth, maturity and decline.">
    <line className="v-axis" x1="55" y1="250" x2="600" y2="250"/><line className="v-axis" x1="55" y1="250" x2="55" y2="28"/>
    <path className="v-area" d="M55 245 C140 240 145 200 220 128 S370 45 440 72 S530 155 595 213 L595 250 L55 250 Z" />
    <path className="v-series" d="M55 245 C140 240 145 200 220 128 S370 45 440 72 S530 155 595 213" />
    {markers.map((x,i)=><g key={labels[i]}><line className="v-guide" x1={x} y1="40" x2={x} y2="250"/><text className="v-note" x={x} y="276" textAnchor="middle">{labels[i]}</text></g>)}
    <text className="v-caption" x="18" y="145" transform="rotate(-90 18 145)" textAnchor="middle">Sales</text>
  </Svg>;
}

function StakeholderMap({ spec }: { spec: VisualSpec }) {
  const labels = pick(spec.labels, ["Customers", "Employees", "Owners", "Suppliers", "Government", "Community"]);
  const points = labels.map((_, index) => { const angle = -Math.PI / 2 + index * (Math.PI * 2 / labels.length); return [320 + Math.cos(angle) * 185, 150 + Math.sin(angle) * 108]; });
  return <Svg title={spec.title} description="A stakeholder map showing groups connected to a business, each with different interests.">
    {points.map(([x,y])=><line className="v-line" key={`${x}-${y}`} x1="320" y1="150" x2={x} y2={y}/>) }
    <circle className="v-center" cx="320" cy="150" r="62"/><text className="v-center-label" x="320" y="157" textAnchor="middle">Business</text>
    {points.map(([x,y],i)=><g key={labels[i]}><circle className="v-node" cx={x} cy={y} r="36"/><text className="v-small" x={x} y={y+4} textAnchor="middle">{labels[i]}</text></g>)}
  </Svg>;
}

function Cycle({ spec, defaults }: { spec: VisualSpec; defaults: string[] }) {
  const labels = pick(spec.labels, defaults);
  const positions = labels.map((_, index) => { const angle = -Math.PI / 2 + index * (Math.PI * 2 / labels.length); return [320 + Math.cos(angle) * 185, 150 + Math.sin(angle) * 100]; });
  return <Svg title={spec.title} description={`${labels.join(", ")} form a repeating cycle.`}>
    <ellipse className="v-cycle" cx="320" cy="150" rx="185" ry="100" />
    {positions.map(([x,y],i)=><g key={labels[i]}><circle className="v-node" cx={x} cy={y} r="48"/><text className="v-small" x={x} y={y-3} textAnchor="middle"><tspan x={x}>{String(i+1).padStart(2,"0")}</tspan><tspan className="v-label" x={x} dy="20">{labels[i]}</tspan></text></g>)}
  </Svg>;
}

function DesignMix({ spec }: { spec: VisualSpec }) {
  const labels = pick(spec.labels, ["Function", "Aesthetics", "Cost-effective manufacture"]);
  return <Svg title={spec.title} description="The design mix balances function, aesthetics and cost-effective manufacture.">
    <circle className="v-venn" cx="260" cy="120" r="92"/><circle className="v-venn" cx="380" cy="120" r="92"/><circle className="v-venn" cx="320" cy="210" r="92"/>
    <text className="v-label" x="205" y="78" textAnchor="middle">{labels[0]}</text><text className="v-label" x="435" y="78" textAnchor="middle">{labels[1]}</text>
    <text className="v-label" x="320" y="260" textAnchor="middle">{labels[2]}</text><text className="v-center-label" x="320" y="155" textAnchor="middle">Successful</text><text className="v-center-label" x="320" y="177" textAnchor="middle">design</text>
  </Svg>;
}

function Journey({ spec, defaults }: { spec: VisualSpec; defaults: string[] }) {
  const labels = pick(spec.labels, defaults);
  const xs = labels.map((_,i)=>72+i*(496/(labels.length-1)));
  return <Svg title={spec.title} description={`${labels.join(", ")} shown as a connected journey.`}>
    <line className="v-line" x1={xs[0]} y1="145" x2={xs[xs.length-1]} y2="145"/>
    {labels.map((label,i)=><g key={label}><circle className="v-node" cx={xs[i]} cy="145" r="32"/><text className="v-number" x={xs[i]} y="151" textAnchor="middle">{i+1}</text><text className="v-note" x={xs[i]} y={i%2===0?93:205} textAnchor="middle">{label}</text><line className="v-guide" x1={xs[i]} y1={i%2===0?105:177} x2={xs[i]} y2={i%2===0?113:185}/></g>)}
  </Svg>;
}

function CpuCycle({ spec }: { spec: VisualSpec }) {
  const labels = pick(spec.labels,["Fetch","Decode","Execute"]);
  return <Svg title={spec.title} description="The CPU repeatedly fetches an instruction, decodes it and executes it.">
    <path className="v-cycle" d="M250 72 C370 20 520 80 500 165 C484 236 400 265 320 250 M275 250 C175 252 104 210 120 130 C134 65 194 43 250 54"/>
    <Pill x={72} y={118} width={144} label={labels[0]}/><Pill x={248} y={36} width={144} label={labels[1]}/><Pill x={424} y={118} width={144} label={labels[2]}/>
    <rect className="v-chip" x="253" y="184" width="134" height="70" rx="8"/><text className="v-center-label" x="320" y="226" textAnchor="middle">CPU</text>
  </Svg>;
}

function BinaryPlaceValue({ spec }: { spec: VisualSpec }) {
  const values = (spec.values?.length ? spec.values : [128,64,32,16,8,4,2,1]).slice(0,8);
  const bits = pick(spec.labels,["1","0","1","1","0","1","0","1"]);
  const total = values.reduce((sum,v,i)=>sum+(bits[i]==="1"?v:0),0);
  return <div className="v-binary" role="img" aria-label={`Binary place value table equals ${total} in denary.`}>
    <div className="v-binary__row">{values.map(value=><span key={value}>{value}</span>)}</div>
    <div className="v-binary__row v-binary__bits">{values.map((value,i)=><span className={bits[i]==="1"?"is-on":""} key={value}>{bits[i]}</span>)}</div>
    <p>Add the active columns: <strong>{values.filter((_,i)=>bits[i]==="1").join(" + ")} = {total}</strong></p>
  </div>;
}

function NetworkTopology({ spec }: { spec: VisualSpec }) {
  const labels=pick(spec.labels,["Switch","Device A","Device B","Device C","Device D"]); const pos=[[320,150],[120,60],[520,60],[120,240],[520,240]];
  return <Svg title={spec.title} description="A star network topology where every device has its own connection to a central switch.">
    {pos.slice(1).map(([x,y])=><line className="v-wire" key={`${x}`} x1="320" y1="150" x2={x} y2={y}/>)}
    {pos.map(([x,y],i)=><g key={labels[i]}><rect className={i===0?"v-chip":"v-panel"} x={x-58} y={y-27} width="116" height="54" rx="10"/><text className="v-label" x={x} y={y+5} textAnchor="middle">{labels[i]}</text></g>)}
  </Svg>;
}

function SecurityLayers({ spec }: { spec: VisualSpec }) {
  const labels=pick(spec.labels,["Physical security","Firewall","Access control","Encryption","Data"]);
  return <Svg title={spec.title} description="Defence in depth places several security controls around valuable data.">
    {[0,1,2,3].map(i=><rect key={i} className="v-security" x={80+i*40} y={32+i*30} width={480-i*80} height={236-i*60} rx={26-i*3}/>) }
    <rect className="v-chip" x="260" y="132" width="120" height="52" rx="10"/><text className="v-center-label" x="320" y="164" textAnchor="middle">{labels[4]}</text>
    {labels.slice(0,4).map((label,i)=><text className="v-note" key={label} x={96+i*39} y={54+i*29}>{label}</text>)}
  </Svg>;
}

function AlgorithmFlow({ spec }: { spec: VisualSpec }) {
  const labels=pick(spec.labels,["Start","Input mark","mark ≥ 40?","Display pass","Display retry","End"]);
  return <Svg title={spec.title} description="A flowchart using start and end, input, decision and output symbols.">
    <rect className="v-flow" x="50" y="120" width="90" height="48" rx="24"/><text className="v-small" x="95" y="149" textAnchor="middle">{labels[0]}</text><Arrow x1={140} y1={144} x2={184} y2={144}/>
    <path className="v-flow" d="M184 120 H290 L274 168 H168 Z"/><text className="v-small" x="229" y="149" textAnchor="middle">{labels[1]}</text><Arrow x1={290} y1={144} x2={320} y2={144}/>
    <path className="v-flow" d="M380 92 L440 144 L380 196 L320 144 Z"/><text className="v-small" x="380" y="149" textAnchor="middle">{labels[2]}</text>
    <Arrow x1={440} y1={144} x2={480} y2={88}/><text className="v-note" x="452" y="112">Yes</text><rect className="v-flow" x="480" y="62" width="120" height="50" rx="8"/><text className="v-small" x="540" y="92" textAnchor="middle">{labels[3]}</text>
    <Arrow x1={440} y1={144} x2={480} y2={214}/><text className="v-note" x="450" y="190">No</text><rect className="v-flow" x="480" y="190" width="120" height="50" rx="8"/><text className="v-small" x="540" y="220" textAnchor="middle">{labels[4]}</text>
    <text className="v-caption" x="540" y="280" textAnchor="middle">Both paths continue to {labels[5]}</text>
  </Svg>;
}

function BooleanLogic({ spec }: { spec: VisualSpec }) {
  const labels=pick(spec.labels,["A","B","AND","OR","NOT"]);
  return <div className="v-truth" role="img" aria-label="Truth table comparing AND, OR and NOT Boolean logic gates.">
    <table><caption>{spec.title}</caption><thead><tr><th>{labels[0]}</th><th>{labels[1]}</th><th>{labels[2]}</th><th>{labels[3]}</th><th>{labels[4]} A</th></tr></thead>
      <tbody>{[[0,0],[0,1],[1,0],[1,1]].map(([a,b])=><tr key={`${a}${b}`}><td>{a}</td><td>{b}</td><td>{a&&b?1:0}</td><td>{a||b?1:0}</td><td>{a?0:1}</td></tr>)}</tbody></table>
    <p><strong>AND</strong> needs both · <strong>OR</strong> needs either · <strong>NOT</strong> reverses</p>
  </div>;
}

function DataSize({ spec }: { spec: VisualSpec }) {
  const labels=pick(spec.labels,["bit","byte","kilobyte","megabyte","gigabyte","terabyte"]);
  return <div className="v-scale" role="img" aria-label="Data storage units increase from bit to terabyte.">{labels.map((label,i)=><div style={{"--scale":String(1+i*.12)} as CSSProperties} key={label}><span>{i===0?"0/1":i===1?"8 bits":"× 1,000"}</span><strong>{label}</strong></div>)}</div>;
}

function MediaCodes({ spec }: { spec: VisualSpec }) {
  const labels=pick(spec.labels,["Technical codes","Symbolic codes","Written codes"]);
  return <div className="v-cards" role="img" aria-label="Media products communicate meaning through technical, symbolic and written codes.">
    <article><span className="v-icon" aria-hidden="true">◉</span><h4>{labels[0]}</h4><p>Camera, sound, lighting and editing</p></article>
    <article><span className="v-icon" aria-hidden="true">◆</span><h4>{labels[1]}</h4><p>Colour, costume, setting and gesture</p></article>
    <article><span className="v-icon" aria-hidden="true">Aa</span><h4>{labels[2]}</h4><p>Headlines, captions and typography</p></article>
  </div>;
}

function PreProduction({ spec }: { spec: VisualSpec }) {
  const labels=pick(spec.labels,["Purpose","Storyboard","Script","Wireframe","Work plan"]);
  return <Svg title={spec.title} description="A pre-production toolkit showing documents selected for different planning needs.">
    <rect className="v-document" x="205" y="25" width="230" height="250" rx="12"/><path className="v-fold" d="M380 25 L435 80 H380 Z"/>
    <text className="v-center-label" x="320" y="71" textAnchor="middle">{labels[0]}</text>
    <rect className="v-thumb" x="235" y="98" width="74" height="55" rx="4"/><rect className="v-thumb" x="330" y="98" width="74" height="55" rx="4"/>
    <line className="v-line" x1="235" y1="180" x2="405" y2="180"/><line className="v-line" x1="235" y1="205" x2="370" y2="205"/><line className="v-line" x1="235" y1="230" x2="390" y2="230"/>
    <text className="v-note" x="110" y="80">{labels[1]}</text><text className="v-note" x="510" y="118">{labels[2]}</text><text className="v-note" x="105" y="210">{labels[3]}</text><text className="v-note" x="512" y="244">{labels[4]}</text>
  </Svg>;
}

function BrandBoard({ spec }: { spec: VisualSpec }) {
  const labels=pick(spec.labels,["Logo","Colour palette","Typography","Imagery","Tone of voice"]);
  return <div className="v-brand" role="img" aria-label="A brand board combines a logo, colour palette, typography, imagery and tone of voice.">
    <div className="v-brand__logo"><span aria-hidden="true">M</span><strong>{labels[0]}</strong></div>
    <div className="v-brand__palette"><b></b><b></b><b></b><span>{labels[1]}</span></div>
    <div className="v-brand__type"><strong>Aa</strong><span>{labels[2]}</span></div>
    <div className="v-brand__image"><i aria-hidden="true">◇</i><span>{labels[3]}</span></div>
    <div className="v-brand__tone"><q>Clear. Bold. Human.</q><span>{labels[4]}</span></div>
  </div>;
}

function ComicLayout({ spec }: { spec: VisualSpec }) {
  const labels=pick(spec.labels,["Establish","Action","Reaction","Impact"]);
  return <Svg title={spec.title} description="A comic page uses varied panel size, reading order, speech and impact lettering to control pace.">
    <rect className="v-page" x="150" y="16" width="340" height="270" rx="4"/>
    <rect className="v-comic" x="170" y="35" width="190" height="78"/><rect className="v-comic" x="370" y="35" width="100" height="78"/>
    <rect className="v-comic" x="170" y="123" width="100" height="142"/><rect className="v-comic" x="280" y="123" width="190" height="142"/>
    <text className="v-small" x="265" y="76" textAnchor="middle">{labels[0]}</text><text className="v-small" x="420" y="76" textAnchor="middle">{labels[1]}</text><text className="v-small" x="220" y="197" textAnchor="middle">{labels[2]}</text>
    <path className="v-burst" d="M375 137 l12 31 31-16 -11 31 35 9 -34 11 13 34 -32-17 -15 30 -6-35 -37 10 26-26 -26-22 35 5 z"/><text className="v-impact" x="385" y="201" textAnchor="middle">{labels[3]}!</text>
  </Svg>;
}

function Compression({ spec }: { spec: VisualSpec }) {
  const labels=pick(spec.labels,["Original file","Lossless","Lossy"]);
  return <Svg title={spec.title} description="Lossless compression preserves all information while lossy compression removes some detail for a smaller file.">
    <rect className="v-file" x="40" y="75" width="160" height="150" rx="10"/><text className="v-label" x="120" y="110" textAnchor="middle">{labels[0]}</text>
    {[0,1,2,3,4].map(i=><line key={i} className="v-line" x1="65" y1={135+i*15} x2="175" y2={135+i*15}/>) }
    <Arrow x1={200} y1={112} x2={282} y2={82}/><Arrow x1={200} y1={190} x2={282} y2={218}/>
    <rect className="v-file" x="285" y="35" width="300" height="100" rx="10"/><text className="v-label" x="315" y="69">{labels[1]}</text><text className="v-note" x="315" y="96">Smaller · all data restored</text><text className="v-badge" x="520" y="91">100%</text>
    <rect className="v-file" x="285" y="165" width="230" height="100" rx="10"/><text className="v-label" x="315" y="199">{labels[2]}</text><text className="v-note" x="315" y="226">Smallest · detail removed</text><text className="v-badge" x="452" y="221">≈</text>
  </Svg>;
}

function PlanCreateReview({ spec }: { spec: VisualSpec }) {
  return <Cycle spec={spec} defaults={["Plan","Create","Test","Review"]}/>;
}

function ConceptWeb({ spec }: { spec: VisualSpec }) {
  const labels = pick(spec.labels, ["Big idea", "Point one", "Point two", "Point three", "Point four"]);
  const [centre, ...nodes] = labels;
  const positions = nodes.map((_, index) => {
    const angle = -Math.PI / 2 + index * (Math.PI * 2 / nodes.length);
    return [320 + Math.cos(angle) * 205, 150 + Math.sin(angle) * 105];
  });
  return <Svg title={spec.title} description={`${centre} connects to ${nodes.join(", ")}.`}>
    {positions.map(([x, y], index) => <Arrow key={nodes[index]} x1={320} y1={150} x2={x} y2={y} />)}
    <circle className="v-center" cx="320" cy="150" r="68" />
    <text className="v-center-label" x="320" y="156" textAnchor="middle">{centre}</text>
    {positions.map(([x, y], index) => <g key={nodes[index]}>
      <rect className="v-panel" x={x - 70} y={y - 26} width="140" height="52" rx="14" />
      <text className="v-small" x={x} y={y + 5} textAnchor="middle">{nodes[index]}</text>
    </g>)}
  </Svg>;
}

function ProcessFlow({ spec }: { spec: VisualSpec }) {
  return <Journey spec={spec} defaults={["Input", "Action", "Output", "Effect"]}/>;
}

function renderVisual(spec: VisualSpec) {
  switch (spec.kind) {
    case "break-even": return <BreakEven spec={spec}/>;
    case "cash-flow": return <CashFlow spec={spec}/>;
    case "marketing-mix": return <MarketingMix spec={spec}/>;
    case "product-life-cycle": return <ProductLifeCycle spec={spec}/>;
    case "stakeholder-map": return <StakeholderMap spec={spec}/>;
    case "research-cycle": return <Cycle spec={spec} defaults={["Set aim","Collect","Analyse","Decide"]}/>;
    case "design-mix": return <DesignMix spec={spec}/>;
    case "pitch-journey": return <Journey spec={spec} defaults={["Plan","Practise","Improve","Deliver","Review"]}/>;
    case "cpu-cycle": return <CpuCycle spec={spec}/>;
    case "binary-place-value": return <BinaryPlaceValue spec={spec}/>;
    case "network-topology": return <NetworkTopology spec={spec}/>;
    case "security-layers": return <SecurityLayers spec={spec}/>;
    case "algorithm-flow": return <AlgorithmFlow spec={spec}/>;
    case "boolean-logic": return <BooleanLogic spec={spec}/>;
    case "data-size": return <DataSize spec={spec}/>;
    case "media-codes": return <MediaCodes spec={spec}/>;
    case "pre-production": return <PreProduction spec={spec}/>;
    case "brand-board": return <BrandBoard spec={spec}/>;
    case "comic-layout": return <ComicLayout spec={spec}/>;
    case "compression": return <Compression spec={spec}/>;
    case "plan-create-review": return <PlanCreateReview spec={spec}/>;
    case "concept-web": return <ConceptWeb spec={spec}/>;
    case "process-flow": return <ProcessFlow spec={spec}/>;
  }
}

export function LearningVisual({ visual, spec }: LearningVisualProps) {
  const active = visual ?? spec ?? fallback;
  return (
    <figure className={`learning-visual learning-visual--${active.kind}`}>
      <div className="learning-visual__heading">
        <span aria-hidden="true">Visual guide</span>
        <h3>{active.title}</h3>
      </div>
      <div className="learning-visual__canvas">{renderVisual(active)}</div>
      <figcaption>{active.caption}</figcaption>
    </figure>
  );
}

export default LearningVisual;
