import { Github, Instagram, Linkedin } from "lucide-react";
import { PROFILE } from "../data/portfolioData";
import { useLang } from "../i18n/useLang";

const FOOTER_ICONS = { GitHub: Github, LinkedIn: Linkedin, Instagram: Instagram };

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative z-10 border-t border-edge bg-panel py-8 font-mono text-xs text-dim">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>

        <ul className="flex items-center gap-6" aria-label={t("footer.socials")}>
          {PROFILE.socials.map(({ label, url }) => {
            const Icon = FOOTER_ICONS[label];
            if (!Icon) return null;
            return (
              <li key={label}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in new tab)`}
                  className="flex min-h-[44px] items-center gap-1.5 transition-colors hover:text-ink"
                >
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
