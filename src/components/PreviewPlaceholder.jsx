import { Timer, ShoppingCart, Store } from "lucide-react";
import { useLang } from "../i18n/useLang";

// Placeholder preview frames. Real screenshots replace these later
// (R-23: honest placeholder, never disguised as final).
const ACCENTS = {
  pos: { icon: Store, label: "PADIPOS / POS SYSTEM" },
  timer: { icon: Timer, label: "TEMPO / TIMER WORKSPACE" },
  warmindo: { icon: ShoppingCart, label: "WARMINDO / POS SYSTEM" },
};

export default function PreviewPlaceholder({ accent }) {
  const { t } = useLang();
  const config = ACCENTS[accent] ?? ACCENTS.pos;
  const Icon = config.icon;

  return (
    <div
      role="img"
      aria-label={`${config.label} ${t("projects.previewAria")}`}
      className="flex h-full w-full flex-col items-center justify-center gap-3 bg-panel-soft"
    >
      <div className="flex h-12 w-12 items-center justify-center border border-edge-strong text-dim">
        <Icon size={22} aria-hidden="true" />
      </div>
      <p className="font-mono text-[10px] tracking-wider text-dim">
        {config.label}
      </p>
      <p className="font-mono text-[9px] uppercase tracking-widest text-dim/70">
        {t("projects.placeholder")}
      </p>
    </div>
  );
}
