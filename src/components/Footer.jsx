import { Github, Instagram, Linkedin } from "lucide-react";
import { PROFILE } from "../data/portfolioData";
import { useLang } from "../i18n/useLang";

const FOOTER_SOCIALS = [
  { label: "GitHub", url: PROFILE.socials[0].url, Icon: Github },
  { label: "LinkedIn", url: PROFILE.socials[1].url, Icon: Linkedin },
  { label: "Instagram", url: PROFILE.socials[2].url, Icon: Instagram },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative z-10 border-t border-edge bg-panel py-8 font-mono text-xs text-dim">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>

        <ul className="flex items-center gap-6" aria-label={t("footer.socials")}>
          {FOOTER_SOCIALS.map(({ label, url, Icon }) => (
            <li key={label}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[44px] items-center gap-1.5 transition-colors hover:text-ink"
              >
                <Icon size={14} aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
