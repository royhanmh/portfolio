import { ArrowRight } from "lucide-react";
import useCanvasMesh from "../hooks/useCanvasMesh";
import { useLang } from "../i18n/useLang";
import profileAvatar from "../assets/profile-avatar.webp";

export default function Hero({ onNavigate }) {
  const { t } = useLang();
  const canvasRef = useCanvasMesh();

  return (
    <section
      id="home"
      className="relative flex min-h-[80vh] flex-col items-center justify-between gap-12 pt-6 md:flex-row"
    >
      <div className="hidden flex-col items-center gap-4 lg:flex">
        <span className="rotate-90 font-mono text-[10px] uppercase tracking-widest text-brand-bright">
          {t("hero.scroll")}
        </span>
        <div className="h-20 w-px bg-gradient-to-b from-brand/60 to-transparent"></div>
      </div>

      <div className="max-w-xl flex-1 space-y-6">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-bright">
          <span
            className="inline-block h-2 w-2 rounded-full bg-ok animate-status-pulse"
            aria-hidden="true"
          ></span>
          {t("hero.greeting")}
        </p>

        <h1
          className="font-heading text-4xl font-extrabold leading-none tracking-tight text-ink sm:text-5xl lg:text-6xl"
          aria-label="Zaynurroyhan, known as Roy"
        >
          ZAYNUR<span className="text-brand-bright">ROY</span>HAN
          <span className="text-brand">.</span>
        </h1>

        <h2 className="font-mono text-xl font-semibold tracking-wide text-brand-bright sm:text-2xl">
          {t("hero.role")}
        </h2>

        <p className="max-w-lg text-base leading-relaxed text-dim">
          {t("hero.intro")}
        </p>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => onNavigate("work")}
            className="group flex items-center border border-edge-strong bg-panel transition-colors hover:border-brand"
          >
            <span className="px-6 py-3 font-mono text-xs font-semibold tracking-wider text-ink">
              {t("hero.cta")}
            </span>
            <span className="flex items-center justify-center bg-brand p-3 text-white transition-colors group-hover:bg-brand-bright">
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>

      <div className="relative flex w-full max-w-md flex-1 items-center justify-center">
        <div className="relative h-auto w-full overflow-hidden border border-edge bg-panel/60 p-6 shadow-[0_0_30px_rgba(0,0,0,0.15)] dark:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0"
          />

          <div className="relative z-10 flex items-center justify-between border-b border-edge pb-2 font-mono text-[10px] text-dim">
            <span>&lt;CODE&gt;</span>
            <span>01</span>
          </div>

          <div className="relative z-10 my-10 self-center sm:my-16">
            <div className="relative mx-auto h-48 w-48 sm:h-56 sm:w-56">
              <span
                className="-left-1 -top-1 absolute z-20 h-2 w-2 border-l-2 border-t-2 border-brand-bright"
                aria-hidden="true"
              ></span>
              <span
                className="-right-1 -top-1 absolute z-20 h-2 w-2 border-r-2 border-t-2 border-brand-bright"
                aria-hidden="true"
              ></span>
              <span
                className="-bottom-1 -left-1 absolute z-20 h-2 w-2 border-b-2 border-l-2 border-brand-bright"
                aria-hidden="true"
              ></span>
              <span
                className="-bottom-1 -right-1 absolute z-20 h-2 w-2 border-b-2 border-r-2 border-brand-bright"
                aria-hidden="true"
              ></span>

              <div className="relative h-full w-full overflow-hidden border border-brand/40 bg-canvas">
                <img
                  src={profileAvatar}
                  alt="Portrait of Muhammad Zaynurroyhan"
                  width="224"
                  height="224"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <p className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[9px] text-dim">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-ok animate-status-pulse"
                  aria-hidden="true"
                ></span>
                {t("hero.status")}
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-edge pt-2 font-mono text-[10px] text-dim">
            <span>03</span>
            <span>&lt;/DESIGN&gt;</span>
          </div>

          <span
            className="absolute left-2 top-2 h-1.5 w-1.5 bg-brand/50"
            aria-hidden="true"
          ></span>
          <span
            className="absolute right-2 top-2 h-1.5 w-1.5 bg-brand/50"
            aria-hidden="true"
          ></span>
          <span
            className="absolute bottom-2 left-2 h-1.5 w-1.5 bg-brand/50"
            aria-hidden="true"
          ></span>
          <span
            className="absolute bottom-2 right-2 h-1.5 w-1.5 bg-brand/50"
            aria-hidden="true"
          ></span>
        </div>
      </div>
    </section>
  );
}
