import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PreviewPlaceholder from "./PreviewPlaceholder";
import { useLang } from "../i18n/useLang";

const SWIPE_THRESHOLD = 40;
const FLICK_VELOCITY = 0.5;

const pad = (n) => String(n).padStart(2, "0");

export default function ScreenshotCarousel({
  screenshots,
  accent,
  title,
  showArrows = true,
  showDots = true,
}) {
  const { t, lang } = useLang();
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(null);
  const moves = useRef([]);

  const total = screenshots.length;
  const go = (delta) => {
    setIndex((current) => Math.min(total - 1, Math.max(0, current + delta)));
  };
  const goTo = (i) => setIndex(Math.min(total - 1, Math.max(0, i)));

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

  const onPointerDown = (e) => {
    if (total < 2) return;
    if (e.target.closest?.("button")) return;
    setIsDragging(true);
    startX.current = e.clientX;
    moves.current = [{ x: e.clientX, t: performance.now() }];
    setDragX(0);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (startX.current === null) return;
    const raw = e.clientX - startX.current;
    moves.current.push({ x: e.clientX, t: performance.now() });
    if (moves.current.length > 6) moves.current.shift();
    if (index === 0 && raw > 0) {
      setDragX(raw * 0.35);
      return;
    }
    if (index === total - 1 && raw < 0) {
      setDragX(raw * 0.35);
      return;
    }
    setDragX(raw);
  };

  const endDrag = (e) => {
    if (startX.current === null) return;
    const delta = e.clientX - startX.current;
    const history = moves.current;
    let velocity = 0;
    if (history.length > 1) {
      const first = history[0];
      const last = history[history.length - 1];
      const dt = last.t - first.t;
      if (dt > 0) velocity = (last.x - first.x) / dt;
    }
    startX.current = null;
    moves.current = [];
    setIsDragging(false);
    setDragX(0);
    if (total < 2) return;
    if (velocity <= -FLICK_VELOCITY) go(1);
    else if (velocity >= FLICK_VELOCITY) go(-1);
    else if (delta > SWIPE_THRESHOLD) go(-1);
    else if (delta < -SWIPE_THRESHOLD) go(1);
  };

  const onPointerUp = (e) => endDrag(e);
  const onPointerCancel = () => {
    startX.current = null;
    moves.current = [];
    setIsDragging(false);
    setDragX(0);
  };

  if (total === 0) {
    return (
      <div className="aspect-[16/10] w-full border border-edge">
        <PreviewPlaceholder accent={accent} />
      </div>
    );
  }

  return (
    <div className="w-full" onKeyDown={onKeyDown}>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={t("projects.carouselLabel", { title })}
        tabIndex={total > 1 ? 0 : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        className="relative aspect-[16/10] w-full cursor-grab touch-pan-y overflow-hidden border border-edge ring-1 ring-inset ring-black/10 select-none active:cursor-grabbing dark:ring-white/10"
      >
        <div
          className="flex h-full"
          style={{
            transform: `translateX(calc(-${index * 100}% + ${dragX}px))`,
            transition: isDragging
              ? "none"
              : "transform 300ms var(--ease-out)",
          }}
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
                alt={
                  typeof shot.alt === "string"
                    ? shot.alt
                    : (shot.alt?.[lang] ?? shot.alt?.en ?? "")
                }
                className="pointer-events-none h-full w-full object-cover object-top"
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
                tabIndex={i !== index ? -1 : undefined}
              />
            </div>
          ))}
        </div>

        {total > 1 && showArrows && (
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

      {total > 1 && showDots && (
        <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
          <p
            aria-hidden="true"
            className="font-mono text-[10px] tracking-widest text-dim"
          >
            {t("projects.slideCount", { n: pad(index + 1), total: pad(total) })}
          </p>
          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-1">
            {screenshots.map((shot, i) => (
              <button
                key={shot.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={t("projects.gotoSlide", { n: i + 1, title })}
                aria-current={i === index ? "true" : undefined}
                className="flex h-11 w-11 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`block h-2.5 w-2.5 border transition-[background-color,border-color,scale] duration-300 ${
                    i === index
                      ? "scale-x-[2.4] border-brand-bright bg-brand-bright"
                      : "scale-x-100 border-edge-strong bg-transparent hover:border-brand"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="w-11" aria-hidden="true" />
        </div>
      )}

      <div aria-live="polite" className="sr-only">
        {t("projects.slideStatus", { n: index + 1, total })}
      </div>
    </div>
  );
}
