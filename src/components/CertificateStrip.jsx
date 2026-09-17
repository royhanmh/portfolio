import { CERTIFICATES } from "../data/portfolioData";
import { useLang } from "../i18n/useLang";
import { formatIssueDate } from "../utils/date";
import CertificateFrame from "./CertificateFrame";

export default function CertificateStrip({ onOpen }) {
  const { t, lang } = useLang();

  if (CERTIFICATES.length === 0) return null;

  return (
    <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto no-scrollbar pb-1">
      {CERTIFICATES.map((certificate, i) => (
        <button
          key={certificate.id}
          type="button"
          onClick={() => onOpen(i)}
          aria-label={t("certificates.openAria", { title: certificate.title })}
          className="group w-[280px] shrink-0 snap-start text-left sm:w-[360px] lg:w-[400px]"
        >
          <CertificateFrame
            certificate={certificate}
            className="aspect-[3/2] w-full"
          />

          <p className="mt-3 font-mono text-xs text-brand-bright">
            CERT-{certificate.id}
          </p>
          <h3 className="mt-1 font-heading text-base font-bold text-ink">
            {certificate.title}
          </h3>
          {(certificate.issuer || certificate.issued) && (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-dim">
              {[
                certificate.issuer,
                certificate.issued && formatIssueDate(certificate.issued, lang),
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}

          <span
            aria-hidden="true"
            className="mt-3 inline-block font-mono text-[10px] uppercase tracking-widest text-dim transition-colors group-hover:text-brand-bright"
          >
            {t("certificates.expand")}
          </span>
        </button>
      ))}
    </div>
  );
}
