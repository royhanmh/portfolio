import { CERTIFICATES } from "../data/portfolioData";
import { useLang } from "../i18n/useLang";
import BadgeRow from "./BadgeRow";
import CertificateStrip from "./CertificateStrip";

export default function CertificatesSection() {
  const { t } = useLang();

  if (CERTIFICATES.length === 0) return null;

  return (
    <section
      id="certificates"
      className="scroll-mt-24 space-y-8 px-2 sm:px-0"
      aria-labelledby="certificates-heading"
    >
      <div className="border-b border-edge pb-4">
        <h2
          id="certificates-heading"
          className="font-mono text-xs uppercase tracking-widest text-brand-bright"
        >
          {t("sections.certificates")}
        </h2>
      </div>

      <CertificateStrip />

      <BadgeRow />
    </section>
  );
}