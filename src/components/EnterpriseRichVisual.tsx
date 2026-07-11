import type { CSSProperties } from "react";
import type { EnterpriseRichVisualSpec } from "../data/enterpriseRichVisuals";

export function EnterpriseRichVisual({ spec }: { spec: EnterpriseRichVisualSpec }) {
  return <figure className="enterprise-poster">
    <figcaption><span>{spec.kicker}</span><h3>{spec.title}</h3></figcaption>
    <div className="enterprise-poster__scene">{spec.scene}</div>
    <div className="enterprise-poster__tiles">{spec.tiles.map((tile, index) => <article key={tile.heading} style={{ "--tile-number": `"${index + 1}"` } as CSSProperties}><span className="enterprise-poster__icon" aria-hidden="true">{tile.icon}</span><div><h4>{tile.heading}</h4><p>{tile.text}</p></div></article>)}</div>
    <p className="enterprise-poster__remember"><span aria-hidden="true">🧠</span><strong>Remember:</strong> {spec.remember}</p>
  </figure>;
}
