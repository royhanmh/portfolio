import { useCallback, useEffect, useRef, useState } from "react";
import { X, ArrowUpRight, Github } from "lucide-react";
import { useLang } from "../i18n/useLang";
import ScreenshotCarousel from "./ScreenshotCarousel";

const EXIT_MS = 220;

export default function ProjectModal({ project, onClose }) {
  const { t, lang } = useLang();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const closeTimer = useRef(null);
  const closingRef = useRef(false);
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    closeButtonRef.current?.focus();
    return () => previouslyFocused?.focus();
  }, []);

  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    closeTimer.current = setTimeout(onClose, reduce ? 0 : EXIT_MS);
  }, [onClose]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        requestClose();
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
  }, [requestClose]);

  const visible = entered && !closing;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className={`relative max-h-[90vh] w-full max-w-2xl space-y-6 overflow-y-auto border border-edge-strong bg-panel p-6 transition-[opacity,scale] duration-[220ms] ease-[var(--ease-out)] sm:p-8 ${
          visible ? "scale-100 opacity-100" : "scale-[0.98] opacity-0"
        }`}
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
            onClick={requestClose}
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
            onClick={requestClose}
            className="min-h-[44px] border border-edge-strong px-5 py-2.5 font-mono text-xs text-dim transition-colors hover:text-ink"
          >
            {t("projects.close")}
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              data-press
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("projects.live")}: ${project.title} (opens in new tab)`}
              className="flex min-h-[44px] items-center gap-1.5 bg-brand px-5 py-2.5 font-mono text-xs font-semibold text-white transition-colors hover:bg-brand-bright"
            >
              {t("projects.live")} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
          <a
            href={project.githubUrl}
            data-press
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("projects.github")}: ${project.title} (opens in new tab)`}
            className="flex min-h-[44px] items-center gap-1.5 border border-edge-strong px-5 py-2.5 font-mono text-xs text-ink transition-colors hover:border-brand"
          >
            <Github size={14} aria-hidden="true" /> {t("projects.github")}
          </a>
        </div>
      </div>
    </div>
  );
}
