import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, X } from "lucide-react";
import { CERTIFICATES } from "../data/portfolioData";
import { useLang } from "../i18n/useLang";
import { formatIssueDate } from "../utils/date";
import CertificateFrame from "./CertificateFrame";

const SWIPE_THRESHOLD = 40;

export default function CertificateLightbox({ index, onClose, onIndexChange }) {
  const { t, lang } = useLang();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const touchStartX = useRef(null);
  const copyTimerRef = useRef(null);
  const [showMeta, setShowMeta] = useState(true);
  const [copied, setCopied] = useState(false);

  const total = CERTIFICATES.length;
  const certificate = CERTIFICATES[index];

  useEffect(() => {
    closeButtonRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        onIndexChange(index - 1);
        return;
      }
      if (e.key === "ArrowRight" && index < total - 1) {
        e.preventDefault();
        onIndexChange(index + 1);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(copyTimerRef.current);
    };
  }, [index, total, onClose, onIndexChange]);

  const go = (delta) => {
    const next = index + delta;
    if (next >= 0 && next < total) onIndexChange(next);
  };

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(certificate.credentialId);
    } catch {
      const input = document.createElement("input");
      input.value = certificate.credentialId;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 3000);
  };

  if (!certificate) return null;

  const title = certificate.title;
  const hasMeta = Boolean(
    certificate.issuer || certificate.issued || certificate.credentialId,
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta > SWIPE_THRESHOLD) go(-1);
        if (delta < -SWIPE_THRESHOLD) go(1);
        touchStartX.current = null;
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-lightbox-title"
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col gap-4"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-xs text-brand-bright">
              CERT-{certificate.id} / {index + 1} {t("certificates.of")} {total}
            </p>
            <h3
              id="certificate-lightbox-title"
              className="mt-1 truncate font-heading text-lg font-bold text-ink sm:text-xl"
            >
              {title}
            </h3>
            {certificate.issuer && (
              <p className="font-mono text-xs text-dim">{certificate.issuer}</p>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t("certificates.close")}
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-edge-strong bg-panel text-dim transition-colors hover:text-ink"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="relative min-h-0 flex-1">
          <CertificateFrame
            certificate={certificate}
            fit="contain"
            className="h-full max-h-[62vh] w-full"
          />

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={index === 0}
                aria-label={t("certificates.prev")}
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-edge-strong bg-canvas/85 text-ink transition-colors hover:border-brand disabled:opacity-40"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={index === total - 1}
                aria-label={t("certificates.next")}
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-edge-strong bg-canvas/85 text-ink transition-colors hover:border-brand disabled:opacity-40"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowMeta((v) => !v)}
            aria-expanded={showMeta}
            className="min-h-[44px] border border-edge-strong px-4 py-2 font-mono text-xs text-dim transition-colors hover:text-ink"
          >
            {showMeta ? t("certificates.hideDetails") : t("certificates.showDetails")}
          </button>

          {certificate.verifyUrl && (
            <a
              href={certificate.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[44px] items-center gap-1.5 bg-brand px-5 py-2.5 font-mono text-xs font-semibold text-white transition-colors hover:bg-brand-bright"
            >
              {t("certificates.verify")}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>

        {showMeta && hasMeta && (
          <dl className="grid grid-cols-1 gap-px border border-edge bg-edge font-mono text-xs sm:grid-cols-3">
            <div className="bg-panel p-4">
              <dt className="uppercase tracking-wider text-dim">
                {t("certificates.issuer")}
              </dt>
              <dd className="mt-1 text-ink">{certificate.issuer || "[ ]"}</dd>
            </div>
            <div className="bg-panel p-4">
              <dt className="uppercase tracking-wider text-dim">
                {t("certificates.issued")}
              </dt>
              <dd className="mt-1 text-ink">
                {certificate.issued
                  ? formatIssueDate(certificate.issued, lang)
                  : t("certificates.dateUnavailable")}
              </dd>
            </div>
            <div className="bg-panel p-4">
              <dt className="uppercase tracking-wider text-dim">
                {t("certificates.credentialId")}
              </dt>
              {certificate.credentialId ? (
                <dd className="mt-1 flex items-center gap-2">
                  <span className="break-all text-ink">
                    {certificate.credentialId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    aria-label={t("certificates.copyId", {
                      id: certificate.credentialId,
                    })}
                    className="flex h-11 w-11 shrink-0 items-center justify-center border border-edge text-dim transition-colors hover:border-edge-strong hover:text-ink"
                  >
                    {copied ? (
                      <Check size={14} aria-hidden="true" />
                    ) : (
                      <Copy size={14} aria-hidden="true" />
                    )}
                  </button>
                </dd>
              ) : (
                <dd className="mt-1 text-ink">
                  {t("certificates.idUnavailable")}
                </dd>
              )}
            </div>
          </dl>
        )}

        <div aria-live="polite">
          {copied && (
            <p className="flex items-center gap-1.5 font-mono text-[11px] text-ok">
              <Check size={12} aria-hidden="true" /> {t("certificates.copied")}
            </p>
          )}
        </div>

        <div aria-live="polite" className="sr-only">
          {title} {index + 1} {t("certificates.of")} {total}
        </div>      </div>
    </div>
  );
}