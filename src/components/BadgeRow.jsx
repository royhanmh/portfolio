import { ArrowUpRight } from "lucide-react";
import { BADGES, CREDLY_PROFILE } from "../data/portfolioData";
import { useLang } from "../i18n/useLang";
import { formatIssueDate } from "../utils/date";

export default function BadgeRow() {
  const { t, lang } = useLang();

  if (BADGES.length === 0) return null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="font-mono text-xs uppercase tracking-widest text-ink">
          {t("certificates.badges")}
        </h3>
        <a
          href={CREDLY_PROFILE}
          target="_blank"
          rel="noreferrer"
          className="group/link flex min-h-[44px] items-center gap-1.5 font-mono text-xs text-dim transition-colors hover:text-ink"
        >
          {t("certificates.credlyProfile")}
          <ArrowUpRight
            size={14}
            aria-hidden="true"
            className="text-brand-bright transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          />
        </a>
      </div>

      <ul className="grid grid-cols-1 gap-px border border-edge bg-edge sm:grid-cols-3">
        {BADGES.map((badge) => (
          <li key={badge.id} className="bg-panel">
            <a
              href={badge.url}
              target="_blank"
              rel="noreferrer"
              className="flex h-full flex-col gap-4 p-5 transition-colors hover:bg-panel-soft"
            >
              <img
                src={badge.image}
                alt={t("certificates.badgeAlt", { title: badge.title })}
                width="300"
                height="300"
                className="h-16 w-16 shrink-0"
                loading="lazy"
              />
              <div>
                <p className="font-heading text-sm font-bold leading-snug text-ink">
                  {badge.title}
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-dim">
                  {badge.issuer} · {formatIssueDate(badge.issued, lang)}
                </p>
              </div>
              <span className="mt-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-brand-bright">
                {t("certificates.verify")}
                <ArrowUpRight size={12} aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
