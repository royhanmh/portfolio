import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import About from "./components/About";
import TechStack from "./components/TechStack";
import CertificatesSection from "./components/CertificatesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { PROJECTS } from "./data/portfolioData";
import { useLang } from "./i18n/useLang";

const SECTION_IDS = ["home", "work", "about", "stack", "certificates", "contact"];

export default function App() {
  const { t } = useLang();
  const [activeSection, setActiveSection] = useState(() => {
    const hash =
      typeof window !== "undefined" ? window.location.hash?.slice(1) : "";
    return SECTION_IDS.includes(hash) ? hash : "home";
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const bodyOverflowRef = useRef("");
  const overlayOpen = Boolean(selectedProject);

  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (hash && SECTION_IDS.includes(hash)) {
      document.getElementById(hash)?.scrollIntoView();
      return;
    }
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observers = SECTION_IDS.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-45% 0px -45% 0px" },
      );
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  useEffect(() => {
    if (overlayOpen) {
      bodyOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = bodyOverflowRef.current ?? "";
    }
    return () => {
      document.body.style.overflow = bodyOverflowRef.current ?? "";
    };
  }, [overlayOpen]);

  const scrollToSection = useCallback((id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    try {
      history.replaceState(null, "", `#${id}`);
    } catch {
      return;
    }
  }, []);

  const handleCloseProject = useCallback(() => setSelectedProject(null), []);

  return (
    <div className="min-h-screen overflow-x-clip bg-canvas text-ink antialiased">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("home");
          document.getElementById("main")?.focus({ preventScroll: true });
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-brand-bright focus:bg-panel focus:px-4 focus:py-2 focus:font-mono focus:text-xs"
      >
        Skip to main content
      </a>
      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      <main
        id="main"
        tabIndex={-1}
        className="relative z-10 mx-auto max-w-6xl space-y-12 px-6 pb-12 pt-12 sm:space-y-16 sm:pb-16"
      >
        <Hero onNavigate={scrollToSection} />

        <section id="work" className="scroll-mt-24 space-y-6">
          <div className="border-b border-edge pb-3">
            <h2 className="font-mono text-xs uppercase tracking-widest text-brand-bright">
              {t("sections.work")}
            </h2>
          </div>

          <div className="space-y-6">
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={setSelectedProject}
              />
            ))}
          </div>
        </section>

        <About onNavigate={scrollToSection} />

        <TechStack />

        <CertificatesSection />

        <ContactSection />
      </main>

      <Footer />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseProject}
        />
      )}
    </div>
  );
}
