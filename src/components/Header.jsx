import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "../data/portfolioData";
import { useLang } from "../i18n/useLang";
import ThemeToggle from "./ThemeToggle";

export default function Header({ activeSection, onNavigate }) {
  const { t, toggleLang, lang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const handleNavigate = (id) => {
    setMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("home");
          }}
          className="group flex h-11 w-11 items-center justify-center border border-brand/50 bg-panel font-mono text-sm font-bold tracking-widest text-ink shadow-[0_0_12px_rgba(59,130,246,0.25)] transition-colors group-hover:border-brand-bright"
          aria-label="ZR, back to top"
        >
          ZR
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 font-mono text-xs tracking-wider md:flex"
        >
          {NAV_ITEMS.map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => handleNavigate(nav.id)}
              aria-current={activeSection === nav.id ? "true" : undefined}
              className={`border-b-2 py-1 transition-colors ${
                activeSection === nav.id
                  ? "border-brand-bright font-semibold text-ink"
                  : "border-transparent text-dim hover:text-ink"
              }`}
            >
              {t(`nav.${nav.id}`)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            aria-label="EN | ID, switch language to Indonesian"
            className="flex h-11 items-center justify-center gap-1 border border-edge px-3 font-mono text-xs transition-colors hover:border-edge-strong"
          >
            <span
              className={lang === "en" ? "font-bold text-ink" : "text-dim"}
              aria-current={lang === "en" ? "true" : undefined}
            >
              EN
            </span>
            <span className="text-dim" aria-hidden="true">
              |
            </span>
            <span
              className={lang === "id" ? "font-bold text-ink" : "text-dim"}
              aria-current={lang === "id" ? "true" : undefined}
            >
              ID
            </span>
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t("header.closeMenu") : t("header.openMenu")}
            className="flex h-11 w-11 items-center justify-center border border-edge text-dim transition-colors hover:text-ink md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`${menuOpen ? "" : "hidden"} border-b border-edge bg-panel px-6 py-4 font-mono text-xs md:hidden`}
      >
        {NAV_ITEMS.map((nav) => (
          <button
            key={nav.id}
            type="button"
            onClick={() => handleNavigate(nav.id)}
            aria-current={activeSection === nav.id ? "true" : undefined}
            className={`block min-h-[44px] w-full border-l-2 py-3 pl-3 text-left transition-colors ${
              activeSection === nav.id
                ? "border-brand-bright bg-brand-soft text-ink"
                : "border-transparent text-dim hover:text-ink"
            }`}
          >
            {t(`nav.${nav.id}`)}
          </button>
        ))}
      </div>
    </header>
  );
}
