import { TECH_STACK } from "../data/portfolioData";
import { useLang } from "../i18n/useLang";
import { TECH_ICONS } from "./techIcons";

export default function TechStack() {
  const { t } = useLang();

  return (
    <section className="space-y-8" aria-labelledby="tech-stack-heading">
      <div className="border-b border-edge pb-4">
        <h2
          id="tech-stack-heading"
          className="font-mono text-xs uppercase tracking-widest text-brand-bright"
        >
          {t("sections.tech")}
        </h2>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {TECH_STACK.map((name) => {
          const Icon = TECH_ICONS[name];
          return (
            <li
              key={name}
              className="flex flex-col items-center justify-center gap-3 border border-edge bg-panel p-4 text-center transition-colors hover:border-brand/60 hover:bg-panel-soft"
            >
              {Icon ? <Icon /> : null}
              <div>
                <p className="font-mono text-xs text-ink">{name}</p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-dim">
                  {t(`techDesc.${name}`)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
