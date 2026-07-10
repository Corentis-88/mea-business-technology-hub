import { Accessibility, BookOpenCheck, FileQuestion, Home, Menu, Network, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useAppState } from "../state/AppState";
import { SearchBox } from "./SearchBox";
import { customPages, siteSettings } from "../content";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/revision", label: "Quiz", icon: FileQuestion },
  { to: "/concept-maps", label: "Concept maps", icon: Network },
  { to: "/materials", label: "Materials", icon: BookOpenCheck },
];

export function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { textScale, toggleTextScale } = useAppState();
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand" aria-label="MEA Business and Technology Hub home">
            <span className="brand-logo-wrap"><img src={`${import.meta.env.BASE_URL}branding/mea-official-logo.svg`} alt="Manchester Enterprise Academy" /></span>
            <span className="brand-name"><strong>Business &amp; Technology Hub</strong><small>Learn and revise at MEA</small></span>
          </NavLink>
          <div className="header-search"><SearchBox /></div>
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.slice(1).map(({ to, label }) => <NavLink key={to} to={to}>{label}</NavLink>)}
            {customPages.filter((page) => page.showInNavigation).map((page) => <NavLink key={page.id} to={`/page/${page.slug}`}>{page.title}</NavLink>)}
          </nav>
          <button type="button" className="icon-button header-accessibility" aria-label={`Use ${textScale === "default" ? "larger" : "standard"} text`} onClick={toggleTextScale}>
            <Accessibility size={20} />
          </button>
          <button type="button" className="icon-button menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            {nav.map(({ to, label }) => <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}>{label}</NavLink>)}
            {customPages.filter((page) => page.showInNavigation).map((page) => <NavLink key={page.id} to={`/page/${page.slug}`} onClick={() => setMenuOpen(false)}>{page.title}</NavLink>)}
          </nav>
        )}
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div><strong>{siteSettings.siteName}</strong><span>Here to help every topic feel more manageable and every student move towards the outcome they are working for.</span></div>
        <div><NavLink to="/materials">Official materials</NavLink><NavLink to="/about">About this prototype</NavLink></div>
      </footer>
      <nav className="mobile-bottom-nav" aria-label="Quick navigation">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === "/"}><Icon size={20} /><span>{label}</span></NavLink>
        ))}
      </nav>
    </div>
  );
}
