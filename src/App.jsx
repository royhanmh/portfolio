import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import About from "./components/About";
import TechStack from "./components/TechStack";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { PROJECTS } from "./data/portfolioData";
import { useLang } from "./i18n/useLang";

const SECTION_IDS = ["home", "work", "about", "contact"];

export default function App() {
  const { t } = useLang();
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const bodyOverflowRef = useRef("");

  useEffect(() => {
    const observers = SECTION_IDS.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, [t]);

  useEffect(() => {
    if (selectedProject) {
      bodyOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = bodyOverflowRef.current;
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-ink antialiased">
      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      <main className="relative z-10 mx-auto max-w-6xl space-y-28 px-6 pb-24 pt-12 sm:space-y-36">
        <Hero onNavigate={scrollToSection} />

        <section id="work" className="scroll-mt-24 space-y-8">
          <div className="border-b border-edge pb-4">
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

        <ContactSection />
      </main>

      <Footer />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
