import { Terminal, Package, GraduationCap, MapPin } from "lucide-react";
import { STATS } from "../data/portfolioData";
import { useLang } from "../i18n/useLang";

const STAT_ICONS = {
  terminal: Terminal,
  package: Package,
  graduation: GraduationCap,
  mapPin: MapPin,
};

export default function About({ onNavigate }) {
  const { t } = useLang();

  return (
    <section id="about" className="scroll-mt-24 space-y-12">
      <div className="border-b border-edge pb-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-brand-bright">
          {t("sections.about")}
        </h2>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-6 lg:col-span-6">
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold leading-tight text-ink sm:text-3xl">
              {t("about.headlineA")}{" "}
              <span className="text-brand-bright">{t("about.headlineB")}</span>
            </h3>
            <p className="text-sm leading-relaxed text-dim">{t("about.p1")}</p>
            <p className="text-sm leading-relaxed text-dim">{t("about.p2")}</p>
          </div>

          <div>
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="group inline-flex items-center border border-edge-strong bg-panel transition-colors hover:border-brand"
            >
              <span className="px-5 py-3 font-mono text-xs font-semibold tracking-wider text-ink">
                {t("about.cta")}
              </span>
              <span
                aria-hidden="true"
                className="flex items-center justify-center bg-brand p-3 text-white transition-colors group-hover:bg-brand-bright"
              >
                <Terminal size={16} />
              </span>
            </button>
          </div>
        </div>

        <ul className="flex flex-col divide-y divide-edge overflow-hidden border border-edge bg-panel lg:col-span-6">
          {STATS.map((stat) => {
            const Icon = STAT_ICONS[stat.icon] ?? Terminal;
            return (
              <li key={stat.key} className="flex items-center gap-5 p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-edge-strong bg-panel-soft text-brand-bright">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-extrabold leading-none text-brand-bright">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-dim">
                    {t(`about.stats.${stat.key}`)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
