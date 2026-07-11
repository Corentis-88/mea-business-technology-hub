import type { BusinessInfographicSpec } from "../data/businessInfographics";
import "./business-infographic.css";

export function BusinessInfographic({ spec }: { spec: BusinessInfographicSpec }) {
  return (
    <figure className="business-infographic" aria-label={spec.title}>
      <header className="business-infographic__header">
        <span>{spec.eyebrow}</span>
        <h3>{spec.title}</h3>
      </header>
      <div className="business-infographic__panels">
        {spec.panels.map((item, index) => (
          <article className={`business-infographic__panel business-infographic__panel--${item.tone}`} key={`${item.title}-${index}`}>
            <div className="business-infographic__topline">
              <span className="business-infographic__icon" aria-hidden="true">{item.icon}</span>
              <strong>{item.label}</strong>
            </div>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
            {item.example && <div className="business-infographic__example"><b>For example</b><span>{item.example}</span></div>}
          </article>
        ))}
      </div>
      <figcaption><span aria-hidden="true">💡</span><strong>Remember:</strong> {spec.takeaway}</figcaption>
    </figure>
  );
}

export default BusinessInfographic;
