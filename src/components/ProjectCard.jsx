import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { useLang } from "../i18n/useLang";
import PreviewPlaceholder from "./PreviewPlaceholder";

export default function ProjectCard({ project, onOpen }) {
  const { t, lang } = useLang();
  const cover = project.screenshots[0];

  return (
    <article className="group grid grid-cols-1 items-center gap-6 border border-edge bg-panel p-6 transition-colors hover:border-edge-strong md:grid-cols-12">
      <div
        className={`relative h-44 w-full overflow-hidden border border-edge logo-bg-${project.accent} md:col-span-5`}
      >
        {project.logo ? (
          <img
            src={project.logo.src}
            alt={project.logo.alt}
            className="h-full w-full object-contain p-12 transition-transform duration-300 group-hover:scale-[1.06]"
            loading="lazy"
          />
        ) : cover ? (
          <img
            src={cover.src}
            alt={cover.alt}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <PreviewPlaceholder accent={project.accent} />
        )}
      </div>

      <div className="flex flex-col justify-between gap-4 md:col-span-7">
        <div>
          <p className="font-mono text-xs text-brand-bright">{project.id}</p>
          <h3 className="mt-1 font-heading text-xl font-bold text-ink">
            {project.title}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-widest text-dim">
            {project.type[lang]}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-dim">
            {project.description[lang]}
          </p>
        </div>

        <ul className="flex flex-wrap gap-2 pt-1" aria-label={t("projects.techUsed")}>
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border border-edge bg-panel-soft px-2 py-0.5 font-mono text-[10px] text-dim"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-end gap-5 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group/link flex items-center gap-1.5 font-mono text-xs text-dim transition-colors hover:text-ink"
            >
              {t("projects.live")}
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="text-brand-bright transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-dim transition-colors hover:text-ink"
          >
            <Github size={14} aria-hidden="true" />
            {t("projects.github")}
          </a>
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="group/btn flex items-center gap-2 font-mono text-xs text-ink"
          >
            {t("projects.details")}
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="text-brand-bright transition-transform group-hover/btn:translate-x-1"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
