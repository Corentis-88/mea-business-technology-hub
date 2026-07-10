import { ArrowRight, BookOpenCheck, FileQuestion, Network, PenLine, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { CourseCard } from "../components/CourseCard";
import { SearchBox } from "../components/SearchBox";
import { courses } from "../data/courses";
import { siteSettings } from "../content";

const tools = [
  { icon: FileQuestion, eyebrow: "Quiz", title: "Build a focused quiz", text: "Choose a qualification, topic, difficulty and up to 50 questions.", to: "/revision", action: "Set up a quiz" },
  { icon: Network, eyebrow: "Visual revision", title: "Completed concept maps", text: "See the definitions, processes and consequences in each topic as one connected map.", to: "/concept-maps", action: "Open concept maps" },
  { icon: PenLine, eyebrow: "Pearson Business", title: "Extended writing", text: "Turn case-study evidence into connected BLT strands, analysis and supported judgements.", to: "/business/extended-writing", action: "Practise extended writing" },
  { icon: BookOpenCheck, eyebrow: "Trusted sources", title: "Official materials", text: "Open specifications, public papers, mark schemes, reports and safe sample assignments.", to: "/materials", action: "Browse materials" },
];

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__copy"><span className="hero-kicker"><Sparkles size={16} /> {siteSettings.schoolName}</span><h1>{siteSettings.siteName === "MEA Business and Technology Hub" ? <>MEA Business and <em>Technology Hub</em></> : siteSettings.siteName}</h1><p>{siteSettings.tagline}</p></div>
          <div className="hero__search"><SearchBox large /><div className="popular-searches"><span>Try:</span><Link to="/search?q=break-even">break-even</Link><Link to="/search?q=CPU">CPU</Link><Link to="/search?q=R095">R095</Link><Link to="/search?q=BLT">BLT</Link></div></div>
          <div className="hero-visual" aria-label="Learning journey: understand, connect, practise and apply">
            <div className="orbit orbit--one"><span>Understand</span></div><div className="orbit orbit--two"><span>Connect</span></div><div className="orbit orbit--three"><span>Practise</span></div><div className="hero-visual__centre"><strong>MEA</strong><span>Business + Tech</span></div>
          </div>
        </div>
      </section>
      <section className="page-section subject-section">
        <div className="section-heading"><div><span className="eyebrow">Choose your qualification</span><h2>Start with the course you're working towards</h2></div><p>You do not need to tackle everything at once. Choose the exact qualification, take one topic at a time, and use the route that helps it make sense.</p></div>
        <div className="course-grid">{courses.map((course) => <CourseCard key={course.id} course={course} />)}</div>
      </section>
      <section className="page-section hub-tools">
        <div className="section-heading"><div><span className="eyebrow">Revision tools</span><h2>What would help you most today?</h2></div><p>Whether you're learning something for the first time or trying to make it stick, there is a clear next step waiting for you.</p></div>
        <div className="hub-tool-grid">{tools.map(({ icon: Icon, eyebrow, title, text, to, action }) => <article key={title}><div className="dashboard-card__icon"><Icon /></div><span className="eyebrow">{eyebrow}</span><h3>{title}</h3><p>{text}</p><Link className="text-link" to={to}>{action} <ArrowRight size={16} /></Link></article>)}</div>
      </section>
    </>
  );
}
