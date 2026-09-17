import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, X } from "lucide-react";
import { CERTIFICATES } from "../data/portfolioData";
import { useLang } from "../i18n/useLang";
import { formatIssueDate } from "../utils/date";
import CertificateFrame from "./CertificateFrame";

export default function CertificateLightbox({ index, onClose, onIndexChange }) {
  const { t, lang } = useLang();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const copyTimerRef = useRef(null);
  const [showMeta, setShowMeta] = useState(true);
  const [copied, setCopied] = useState(false);

  const total = CERTIFICATES.length;
  const certificate = CERTIFICATES[index];

  useEffect(() => {
    closeButtonRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && index > 0) onIndexChange(index - 1);
      if (e.key === "ArrowRight" && index < total - 1) onIndexChange(index + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, total, onClose, onIndexChange]);

  const go = (delta) => {
    const next = index + delta;
    if (next >= 0 && next < total) onIndexChange(next);
  };

  const handleCopyId = async () => {
    await navigator.clipboard.writeText(certificate.credentialId);
    setCopied(true);
    clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 3000);
  };

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 p-4 backdrop-blur-sm dark:bg-black/70"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden border border-edge bg-canvas p-8 shadow-2xl dark:border-edge-strong dark:bg-panel"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute right-6 top-6 z-10 text-dim transition-colors hover:text-ink dark:text-dim dark:hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="mb-8 pr-12">
          <p className="font-mono text-[10px] uppercase tracking-widest text-brand-bright">
            CERT-{certificate.id} / {index + 1} OF {total}
          </p>
          <h3 className="mt-2 font-heading text-3xl font-bold text-ink dark:text-white">
            {certificate.title}
          </h3>
          {certificate.issuer && (
            <p className="mt-1 font-mono text-sm text-dim dark:text-dim">{certificate.issuer}</p>
          )}
        </div>

        <div className="relative mb-8 flex-1 overflow-hidden bg-panel p-1 ring-1 ring-edge dark:bg-black/20 dark:ring-white/10">
          <CertificateFrame
            certificate={certificate}
            fit="contain"
            className="h-full w-full"
          />

          {total > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                disabled={index === 0}
                className="absolute left-4 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-canvas/80 text-ink backdrop-blur-sm transition-all hover:bg-white disabled:opacity-0 shadow-lg dark:bg-black/50 dark:text-white dark:hover:bg-white/10"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={() => go(1)}
                disabled={index === total - 1}
                className="absolute right-4 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-canvas/80 text-ink backdrop-blur-sm transition-all hover:bg-white disabled:opacity-0 shadow-lg dark:bg-black/50 dark:text-white dark:hover:bg-white/10"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowMeta((v) => !v)}
            className="font-mono text-xs uppercase tracking-widest text-dim transition-colors hover:text-ink dark:text-dim dark:hover:text-white"
          >
            {showMeta ? "HIDE DETAILS" : "SHOW DETAILS"}
          </button>
          {certificate.verifyUrl && (
            <a
              href={certificate.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-bright hover:underline"
            >
              Verify Credential <ArrowUpRight size={14} />
            </a>
          )}
        </div>

        {showMeta && (
          <div className="mt-6 grid grid-cols-1 gap-6 border-t border-edge pt-6 font-mono text-xs text-dim sm:grid-cols-3 dark:border-white/10 dark:text-white/60">
            <div>
              <p className="text-[10px] uppercase text-dim dark:text-white/40">Issuer</p>
              <p className="mt-1 text-ink dark:text-white">{certificate.issuer}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-dim dark:text-white/40">Issue Date</p>
              <p className="mt-1 text-ink dark:text-white">{certificate.issued ? formatIssueDate(certificate.issued, lang) : "N/A"}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-dim dark:text-white/40">Credential ID</p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <p className="text-ink truncate dark:text-white">{certificate.credentialId}</p>
                <button onClick={handleCopyId} className="text-dim hover:text-ink dark:text-white/40 dark:hover:text-white">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
