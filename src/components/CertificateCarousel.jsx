import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { CERTIFICATES } from "../data/portfolioData";
import { useLang } from "../i18n/useLang";
import { formatIssueDate } from "../utils/date";
import CertificateFrame from "./CertificateFrame";

const SWIPE_THRESHOLD = 40;
const FLICK_VELOCITY = 0.5;
const AUTOPLAY_INTERVAL = 5000;
const TRANSITION_MS = 350;

const pad = (n) => String(n).padStart(2, "0");

export default function CertificateCarousel() {
  const { t, lang } = useLang();
  // Extended loop track of 9 slides: every position in the real window
  // (3..5) and one step beyond it in either direction always has full
  // neighbors, so fast repeated swipes can never expose a blank slot.
  const [pos, setPos] = useState(3);
  const [wide, setWide] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(min-width: 1024px)").matches,
  );
  const [hoverPaused, setHoverPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [jumping, setJumping] = useState(false);
  const startX = useRef(null);
  const moves = useRef([]);
  const jumpTimer = useRef(null);

  const total = CERTIFICATES.length;
  // Desktop (lg): 3 full cards side by side. Mobile: one card + peeks.
  const basis = wide ? 100 / 3 : 70;
  // Track position 3 maps to real certificate 0.
  const activeIndex = (((pos - 3) % total) + total) % total;
  const active = CERTIFICATES[activeIndex];

  const autoplayPaused = hoverPaused || userPaused || isDragging;

  useEffect(() => {
    const query = window.matchMedia?.("(min-width: 1024px)");
    if (!query) return;
    const onChange = (e) => setWide(e.matches);
    query.addEventListener?.("change", onChange);
    return () => query.removeEventListener?.("change", onChange);
  }, []);

  // Seamless loop: positions outside 2..4 show an arrangement identical to a
  // real position, so snapping back is invisible. The effect cleanup clears
  // the pending jump if the user swipes again mid-window.
  useEffect(() => {
    if (pos < 3 || pos > 5) {
      jumpTimer.current = setTimeout(() => {
        setJumping(true);
        setPos((cur) => (cur < 3 ? cur + total : cur > 5 ? cur - total : cur));
      }, TRANSITION_MS + 30);
      return () => clearTimeout(jumpTimer.current);
    }
    if (jumping) {
      const id = setTimeout(() => setJumping(false), 30);
      return () => clearTimeout(id);
    }
  }, [pos, total, jumping]);

  useEffect(() => {
    if (total < 2 || autoplayPaused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const id = setInterval(() => {
      setPos((current) => current + 1);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [total, autoplayPaused]);

  // A navigation that lands mid-jump flushes the pending snap first, so no
  // input is ever swallowed inside the normalization window.
  const flushJump = () => {
    clearTimeout(jumpTimer.current);
    setJumping(false);
  };

  const go = (delta) => {
    if (total < 2) return;
    if (jumping) flushJump();
    setPos((cur) => {
      const base = cur < 3 ? cur + total : cur > 5 ? cur - total : cur;
      return base + delta;
    });
  };
  const goTo = (i) => {
    if (total < 2) return;
    if (jumping) flushJump();
    setPos(i + 3);
  };

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
    if (e.target.closest?.("button, a")) return;
    setIsDragging(true);
    startX.current = e.clientX;
    moves.current = [{ x: e.clientX, t: performance.now() }];
    setDragX(0);
    setHoverPaused(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (startX.current === null) return;
    moves.current.push({ x: e.clientX, t: performance.now() });
    if (moves.current.length > 6) moves.current.shift();
    setDragX(e.clientX - startX.current);
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
    setHoverPaused(false);
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
    setHoverPaused(false);
  };

  const handleMouseEnter = () => {
    if (isDragging) return;
    setHoverPaused(true);
  };

  const handleMouseLeave = () => {
    if (isDragging) return;
    setHoverPaused(false);
  };

  if (total === 0 || !active) return null;

  const order = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
    (trackPos) => (((trackPos - 3) % total) + total) % total,
  );
  const animating = isDragging || jumping;

  return (
    <div
      className="w-full"
      onKeyDown={onKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setHoverPaused(true)}
      onBlur={() => setHoverPaused(false)}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={t("certificates.carouselLabel")}
        tabIndex={total > 1 ? 0 : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        className="relative w-full cursor-grab touch-pan-y overflow-hidden select-none active:cursor-grabbing"
      >
        <div
          className="flex items-center"
          style={{
            transform: `translateX(calc(${(100 - basis) / 2 - pos * basis}% + ${dragX}px))`,
            transition: animating ? "none" : `transform ${TRANSITION_MS}ms cubic-bezier(0.2, 0, 0, 1)`,
          }}
        >
          {order.map((realIndex, trackPos) => {
            const certificate = CERTIFICATES[realIndex];
            const isClone = trackPos < 3 || trackPos > 5;
            const focused = trackPos === pos;
            return (
              <div
                key={`${certificate.id}-${trackPos}`}
                className="w-full shrink-0 grow-0"
                style={{ flexBasis: `${basis}%` }}
                role="group"
                aria-roledescription="slide"
                aria-label={t("certificates.slideStatus", {
                  n: realIndex + 1,
                  total,
                })}
                aria-hidden={isClone || !focused}
              >
                <div
                  className="w-full px-2"
                  style={{
                    transform: focused ? "scale(1)" : "scale(0.92)",
                    opacity: focused ? 1 : 0.75,
                    boxShadow: focused
                      ? "0 0 30px rgba(0, 0, 0, 0.18)"
                      : "none",
                    transition: animating
                      ? "none"
                      : `transform ${TRANSITION_MS}ms cubic-bezier(0.2, 0, 0, 1), opacity ${TRANSITION_MS}ms cubic-bezier(0.2, 0, 0, 1), box-shadow ${TRANSITION_MS}ms cubic-bezier(0.2, 0, 0, 1)`,
                  }}
                >
                  <CertificateFrame
                    certificate={certificate}
                    className="aspect-[3/2] w-full"
                    loading="eager"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {total > 1 && !autoplayPaused && (
          <div
            aria-hidden="true"
            className="mx-auto mt-2 h-0.5 w-full bg-transparent"
          >
            <div
              key={`${pos}-${AUTOPLAY_INTERVAL}`}
              className="animate-carousel-progress h-full w-full bg-brand-bright motion-reduce:hidden"
              style={{ animationDuration: `${AUTOPLAY_INTERVAL}ms` }}
            />
          </div>
        )}
      </div>

      <div className="w-full px-2 text-left">
        <p className="mt-3 font-mono text-xs text-brand-bright">
          CERT-{active.id}
        </p>
        <h3 className="mt-1 min-h-[3rem] font-heading text-base font-bold text-ink dark:text-white">
          {active.title}
        </h3>
        {(active.issuer || active.issued) && (
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-dim dark:text-white/60">
            {[
              active.issuer,
              active.issued && formatIssueDate(active.issued, lang),
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <a
            href={active.image}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[24px] items-center py-1 font-mono text-[10px] uppercase tracking-widest text-dim transition-colors hover:text-brand-bright dark:text-white/60 dark:hover:text-brand-bright"
          >
            {t("certificates.expand")} ↗
          </a>
          {active.verifyUrl && (
            <a
              href={active.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[24px] items-center py-1 font-mono text-[10px] uppercase tracking-widest text-brand-bright hover:underline"
            >
              {t("certificates.verify")} ↗
            </a>
          )}
        </div>
      </div>

      {total > 1 && (
        <div className="mt-1 flex w-full items-center justify-between gap-2 px-2">
          <p
            aria-hidden="true"
            className="font-mono text-[10px] tracking-widest text-dim"
          >
            {t("certificates.slideCount", {
              n: pad(activeIndex + 1),
              total: pad(total),
            })}
          </p>
          <div className="flex items-center gap-1">
            {CERTIFICATES.map((certificate, i) => (
              <button
                key={certificate.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={t("certificates.gotoSlide", { n: i + 1 })}
                aria-current={i === activeIndex ? "true" : undefined}
                className="flex h-11 w-11 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`block h-2.5 border transition-all duration-300 ${
                    i === activeIndex
                      ? "w-6 border-brand-bright bg-brand-bright"
                      : "w-2.5 border-edge-strong bg-transparent hover:border-brand"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setUserPaused((v) => !v)}
            aria-label={
              userPaused
                ? t("certificates.playAutoplay")
                : t("certificates.pauseAutoplay")
            }
            aria-pressed={userPaused}
            className="flex h-11 w-11 items-center justify-center border border-edge text-dim transition-colors hover:border-brand hover:text-ink"
          >
            {userPaused ? (
              <Play size={14} aria-hidden="true" />
            ) : (
              <Pause size={14} aria-hidden="true" />
            )}
          </button>
        </div>
      )}

      <div aria-live="polite" className="sr-only">
        {t("certificates.slideStatus", { n: activeIndex + 1, total })}
      </div>
    </div>
  );
}
