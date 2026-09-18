import { CERTIFICATES } from "../data/portfolioData";
import { useLang } from "../i18n/useLang";
import BadgeRow from "./BadgeRow";
import CertificateCarousel from "./CertificateCarousel";

export default function CertificatesSection() {
  const { t } = useLang();

  if (CERTIFICATES.length === 0) return null;

  return (
    <section
      id="certificates"
      className="scroll-mt-24 space-y-6 px-2 sm:px-0"
      aria-labelledby="certificates-heading"
    >
      <div className="border-b border-edge pb-3">
        <h2
          id="certificates-heading"
          className="font-mono text-xs uppercase tracking-widest text-brand-bright"
        >
          {t("sections.certificates")}
        </h2>
      </div>

      <CertificateCarousel />

      <BadgeRow />
    </section>
  );
}