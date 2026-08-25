import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, CheckCircle2, Github, Instagram, Linkedin } from "lucide-react";
import { PROFILE } from "../data/portfolioData";
import { useLang } from "../i18n/useLang";

const SOCIAL_ICONS = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
};

export default function ContactSection() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      const input = document.createElement("input");
      input.value = PROFILE.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="scroll-mt-24 space-y-12">
      <div className="border-b border-edge pb-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-brand-bright">
          {t("sections.contact")}
        </h2>
      </div>

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-6">
          <h3 className="font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            {t("contact.headingA")}{" "}
            <span className="text-brand-bright">{t("contact.headingB")}</span>
          </h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label={t("contact.socials")}>
            {PROFILE.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.label];
              return (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-[44px] items-center gap-2 font-mono text-xs text-dim transition-colors hover:text-ink"
                  >
                    <Icon size={14} aria-hidden="true" />
                    {social.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="space-y-3 lg:col-span-6">
          <p className="font-mono text-xs text-dim">{t("contact.sub")}</p>

          <div className="flex items-center border border-edge-strong bg-panel p-1.5 transition-colors focus-within:border-brand-bright">
            <a
              href={`mailto:${PROFILE.email}`}
              className="flex-1 px-3 py-2 font-mono text-sm text-ink hover:text-brand-bright"
            >
              {PROFILE.email}
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label={t("contact.copyEmail", { email: PROFILE.email })}
              title={t("contact.copyEmail", { email: PROFILE.email })}
              className="flex h-11 w-11 shrink-0 items-center justify-center bg-brand text-white transition-colors hover:bg-brand-bright"
            >
              {copied ? <Check size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
            </button>
          </div>

          <div aria-live="polite">
            {copied && (
              <p className="flex items-center gap-1.5 font-mono text-[11px] text-ok">
                <CheckCircle2 size={12} aria-hidden="true" /> {t("contact.copied")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
