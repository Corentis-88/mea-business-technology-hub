import { ChevronRight, Lightbulb } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import LearningVisual from "../components/LearningVisual";
import { customPages } from "../content";
import { NotFoundPage } from "./NotFoundPage";

export function CustomPagePage() {
  const { pageSlug } = useParams();
  const page = customPages.find((item) => item.slug === pageSlug);
  if (!page) return <NotFoundPage />;
  return <div className="custom-page"><header className="topic-header"><div className="page-section topic-header__inner"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><ChevronRight size={14} /><span>{page.title}</span></nav><span className="eyebrow">MEA Business and Technology Hub</span><h1>{page.title}</h1>{page.summary && <p>{page.summary}</p>}</div></header><div className="page-section prose-page">{page.sections.map((section, index) => { const visuals = section.visual ? [section.visual, ...(section.visuals ?? [])] : (section.visuals ?? []); return <section key={`${section.heading}-${index}`}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet, bulletIndex) => <li key={bulletIndex}>{bullet}</li>)}</ul>}{section.formula && <div className="formula-card"><span>Formula</span><strong>{section.formula}</strong></div>}{section.example && <div className="example-callout"><Lightbulb /><div><strong>Worked example</strong><p>{section.example}</p></div></div>}{section.image && <figure className="topic-illustration"><img src={`${import.meta.env.BASE_URL}${section.image.src}`} alt={section.image.alt} loading="lazy" /><figcaption>{section.image.caption}</figcaption></figure>}{visuals.map((visual, visualIndex) => <LearningVisual key={`${visual.title}-${visualIndex}`} spec={visual} />)}</section>; })}</div></div>;
}
