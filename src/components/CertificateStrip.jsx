import { useEffect, useRef } from "react";
import { CERTIFICATES } from "../data/portfolioData";
import { useLang } from "../i18n/useLang";
import { formatIssueDate } from "../utils/date";
import CertificateFrame from "./CertificateFrame";

export default function CertificateStrip() {
  const { t, lang } = useLang();
  const itemRefs = useRef([]);

  useEffect(() => {
    const middleIndex = Math.floor(CERTIFICATES.length / 2);
    const middleItem = itemRefs.current[middleIndex];
    if (middleItem) {
      // Use setTimeout to ensure layout is finished
      const timer = setTimeout(() => {
        middleItem.scrollIntoView({
          behavior: "auto",
          block: "nearest",
          inline: "center",
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  if (CERTIFICATES.length === 0) return null;

  return (
    <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto no-scrollbar p-1">
      {CERTIFICATES.map((certificate, i) => (
        <div
          key={certificate.id}
          ref={(el) => (itemRefs.current[i] = el)}
          className="group w-[280px] shrink-0 snap-center text-left sm:w-[360px] lg:w-[400px]"
        >
          <a
            href={certificate.image}
            target="_blank"
            rel="noreferrer"
            className="block cursor-zoom-in"
          >
            <CertificateFrame
              certificate={certificate}
              className="aspect-[3/2] w-full"
            />
          </a>

          <p className="mt-3 font-mono text-xs text-brand-bright">
            CERT-{certificate.id}
          </p>
          <h3 className="mt-1 font-heading text-base font-bold text-ink dark:text-white">
            {certificate.title}
          </h3>
          {(certificate.issuer || certificate.issued) && (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-dim dark:text-white/60">
              {[
                certificate.issuer,
                certificate.issued && formatIssueDate(certificate.issued, lang),
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}

          <div className="mt-3 flex items-center gap-4">
            <a
              href={certificate.image}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] uppercase tracking-widest text-dim transition-colors hover:text-brand-bright dark:text-white/60 dark:hover:text-brand-bright"
            >
              {t("certificates.expand")} ↗
            </a>
            {certificate.verifyUrl && (
              <a
                href={certificate.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[10px] uppercase tracking-widest text-brand-bright hover:underline"
              >
                {t("certificates.verify")} ↗
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
