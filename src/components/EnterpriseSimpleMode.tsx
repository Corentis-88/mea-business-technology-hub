import { CheckCircle2, Equal, Lightbulb, MessageCircleMore } from "lucide-react";
import { enterpriseSimpleGuideByTopic, enterpriseSimpleVisuals, simplifyEnterpriseDefinition } from "../data/enterpriseSimple";
import type { Topic } from "../types";
import LearningVisual from "./LearningVisual";
import { SimpleConceptVisual } from "./SimpleConceptVisual";
import { enterpriseRichVisuals } from "../data/enterpriseRichVisuals";
import { EnterpriseRichVisual } from "./EnterpriseRichVisual";
import { TeachingPicture } from "./TeachingPicture";
import { enterprisePictureScenes } from "../data/enterprisePictureScenes";

export function EnterpriseSimpleMode({ topic }: { topic: Topic }) {
  const guide = enterpriseSimpleGuideByTopic.get(topic.id);
  const picture = enterprisePictureScenes[topic.id];
  if (!guide) return null;
  const simpleTerms = topic.id === "enterprise-r067-3" ? topic.keyTerms.filter((term) => term.term !== "Contribution") : topic.keyTerms;

  return (
    <section className="simple-learning" aria-labelledby="simple-learning-title">
      <header className="simple-learning__intro">
        <MessageCircleMore />
        <div>
          <span className="eyebrow">Enterprise · easier reading</span>
          <h2 id="simple-learning-title">Let’s take this step by step</h2>
          <p>{guide.bigIdea}</p>
          <small>Short sentences are used here. Important course words are kept and explained.</small>
        </div>
      </header>

      {enterpriseRichVisuals[topic.id] && <EnterpriseRichVisual spec={enterpriseRichVisuals[topic.id]} />}
      {picture && <TeachingPicture picture={{ src: picture.filename, alt: picture.alt, caption: picture.caption, title: guide.bigIdea, focalPoints: picture.sectionCoverage }} />}

      <div className="simple-learning__layout">
        <div className="simple-learning__sections">
          {guide.sections.map((section, sectionIndex) => {
            const original = topic.sections.find((item) => item.heading === section.heading);
            const simpleVisual = enterpriseSimpleVisuals[`${topic.id}:${section.heading}`];
            const simpleFormula = topic.id === "enterprise-r067-3" && section.heading === "Break-even for decisions"
              ? "Break-even = fixed costs ÷ (selling price − variable cost per item)"
              : topic.id === "enterprise-r068-5" && section.heading === "Numbers with an evidence trail"
                ? "Profit = (price × sales) − total costs; break-even = fixed costs ÷ (selling price − variable cost per item)"
                : original?.formula;
            return (
              <article key={section.heading}>
                <header>
                  <span>{sectionIndex + 1}</span>
                  <div><small>{section.heading}</small><h3>{section.simpleHeading}</h3></div>
                </header>
                {simpleVisual && <SimpleConceptVisual spec={simpleVisual} />}
                <div className="simple-explanation">
                  <b>What this means</b>
                  {section.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                {section.steps && <div className="simple-steps"><b>Do it in this order</b><ol>{section.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></div>}
                {section.example && <div className="simple-example"><Lightbulb /><div><b>Easy example</b><p>{section.example}</p></div></div>}
                {simpleFormula && <div className="simple-formula"><Equal /><div><small>Formula to remember</small><strong>{simpleFormula}</strong><p>Write down each step. Add £, %, units or products when needed.</p></div></div>}
                {original?.visual && <details className="simple-full-visual"><summary>Open the full lesson visual</summary><LearningVisual spec={original.visual} /></details>}
              </article>
            );
          })}
        </div>

        <aside className="simple-word-bank">
          <span className="eyebrow">Course words made clear</span>
          <h2>Words you need to know</h2>
          <p>These words may appear in lessons or assessment work.</p>
          <dl>{simpleTerms.map((term) => <div key={term.term}><dt><CheckCircle2 />{term.term}</dt><dd>{simplifyEnterpriseDefinition(term.term, term.definition)}</dd></div>)}</dl>
        </aside>
      </div>
    </section>
  );
}
