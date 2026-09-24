import { TECH_STACK } from "../data/portfolioData";
import { useLang } from "../i18n/useLang";
import { TECH_ICONS } from "./techIcons";

// TECH_STACK names are display labels; dotted names cannot be used as i18n
// path segments because t() splits on ".", so they map to slug keys.
const TECH_DESC_KEYS = {
  "Node.js": "nodejs",
  "Express.js": "expressjs",
};

export default function TechStack() {
  const { t } = useLang();

  return (
    <section className="space-y-6" aria-labelledby="tech-stack-heading">
      <div className="border-b border-edge pb-3">
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
          const descKey = TECH_DESC_KEYS[name] ?? name;
          return (
            <li
              key={name}
              className="flex flex-col items-center justify-center gap-3 border border-edge bg-panel p-4 text-center transition-colors hover:border-brand/60 hover:bg-panel-soft"
            >
              {Icon ? <Icon /> : null}
              <div>
                <p className="font-mono text-xs text-ink">{name}</p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-dim">
                  {t(`techDesc.${descKey}`)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
