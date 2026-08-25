import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PreviewPlaceholder from "./PreviewPlaceholder";
import { useLang } from "../i18n/useLang";

const SWIPE_THRESHOLD = 40;

export default function ScreenshotCarousel({ screenshots, accent, title }) {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);

  const total = screenshots.length;
  const go = (delta) =>
    setIndex((current) => Math.min(total - 1, Math.max(0, current + delta)));

  const onKeyDown = (e) => {
    if (total < 2) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null || total < 2) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD) go(-1);
    if (delta < -SWIPE_THRESHOLD) go(1);
    touchStartX.current = null;
  };

  if (total === 0) {
    return (
      <div className="h-52 w-full border border-edge">
        <PreviewPlaceholder accent={accent} />
      </div>
    );
  }

  return (
    <div
      className="h-52 w-full border border-edge"
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={t("projects.carouselLabel", { title })}
        className="relative h-full w-full overflow-hidden"
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {screenshots.map((shot, i) => (
            <div
              key={shot.src}
              className="h-full w-full shrink-0 grow-0 basis-full"
              role="group"
              aria-roledescription="slide"
              aria-label={t("projects.slideStatus", { n: i + 1, total })}
              aria-hidden={i !== index}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                className="h-full w-full object-cover object-top"
                loading="lazy"
                tabIndex={i !== index ? -1 : undefined}
              />
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0}
              aria-label={t("projects.prevSlide")}
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-edge-strong bg-canvas/85 text-ink transition-colors hover:border-brand disabled:opacity-40"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={index === total - 1}
              aria-label={t("projects.nextSlide")}
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-edge-strong bg-canvas/85 text-ink transition-colors hover:border-brand disabled:opacity-40"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-2 flex items-center justify-center gap-2">
          {screenshots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => go(i)}
              aria-label={t("projects.gotoSlide", { n: i + 1 })}
              aria-current={i === index ? "true" : undefined}
              className={`h-2.5 w-2.5 min-h-[11px] min-w-[11px] border transition-colors ${
                i === index
                  ? "border-brand-bright bg-brand-bright"
                  : "border-edge-strong bg-transparent hover:border-brand"
              }`}
            ></button>
          ))}
        </div>
      )}

      <div aria-live="polite" className="sr-only">
        {t("projects.slideStatus", { n: index + 1, total })}
      </div>
    </div>
  );
}
