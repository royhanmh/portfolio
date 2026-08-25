import { useEffect, useRef } from "react";
import { X, ArrowUpRight, Github } from "lucide-react";
import { useLang } from "../i18n/useLang";
import ScreenshotCarousel from "./ScreenshotCarousel";

export default function ProjectModal({ project, onClose }) {
  const { t, lang } = useLang();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative max-h-[90vh] w-full max-w-2xl space-y-6 overflow-y-auto border border-edge-strong bg-panel p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4 border-b border-edge pb-4">
          <div>
            <p className="font-mono text-xs text-brand-bright">
              {project.id} / {t("projects.modalTitle")}
            </p>
            <h3
              id="project-modal-title"
              className="mt-1 font-heading text-2xl font-bold text-ink"
            >
              {project.title}
            </h3>
            <p className="font-mono text-xs text-dim">{project.type[lang]}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t("projects.close")}
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-edge text-dim transition-colors hover:text-ink"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <ScreenshotCarousel
          screenshots={project.screenshots}
          accent={project.accent}
          title={project.title}
        />

        <div className="space-y-4 text-sm leading-relaxed text-dim">
          <p>{project.description[lang]}</p>

          <div>
            <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-ink">
              {t("projects.techUsed")}
            </h4>
            <ul className="flex flex-wrap gap-2" aria-label={t("projects.techUsed")}>
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-edge bg-panel-soft px-2.5 py-1 font-mono text-xs text-dim"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3 border-t border-edge pt-4">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] border border-edge-strong px-5 py-2.5 font-mono text-xs text-dim transition-colors hover:text-ink"
          >
            {t("projects.close")}
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[44px] items-center gap-1.5 bg-brand px-5 py-2.5 font-mono text-xs font-semibold text-white transition-colors hover:bg-brand-bright"
            >
              {t("projects.live")} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[44px] items-center gap-1.5 border border-edge-strong px-5 py-2.5 font-mono text-xs text-ink transition-colors hover:border-brand"
          >
            <Github size={14} aria-hidden="true" /> {t("projects.github")}
          </a>
        </div>
      </div>
    </div>
  );
}
