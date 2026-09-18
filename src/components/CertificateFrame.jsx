import { useLang } from "../i18n/useLang";

// Ties the section to the hero's HUD frame: a certificate is a framed document,
// so the bracket motif reads as intentional here rather than decorative.
const CORNERS = [
  "-left-1 -top-1 border-l-2 border-t-2",
  "-right-1 -top-1 border-r-2 border-t-2",
  "-bottom-1 -left-1 border-b-2 border-l-2",
  "-bottom-1 -right-1 border-b-2 border-r-2",
];

export default function CertificateFrame({
  certificate,
  className = "",
  fit = "cover",
  loading = "lazy",
}) {
  const { t } = useLang();
  if (!certificate) return null;

  return (
    <div className={`relative ${className}`}>
      {CORNERS.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`absolute z-20 h-2 w-2 border-brand-bright ${position}`}
        />
      ))}

      <div className="h-full w-full overflow-hidden bg-panel-soft">
        <img
          src={certificate.image}
          alt={t("certificates.imageAlt", { title: certificate.title })}
          className={`h-full w-full ${
            fit === "contain" ? "object-contain" : "object-cover object-top"
          }`}
          loading={loading}
        />
      </div>
    </div>
  );
}
