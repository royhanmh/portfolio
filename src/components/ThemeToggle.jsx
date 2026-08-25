import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLang } from "../i18n/useLang";

const STORAGE_KEY = "portfolio-theme";

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

export default function ThemeToggle() {
  const { t } = useLang();
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={
        theme === "dark" ? t("header.switchToLight") : t("header.switchToDark")
      }
      aria-pressed={theme === "dark"}
      className="flex h-11 w-11 items-center justify-center border border-edge text-dim transition-colors hover:border-edge-strong hover:text-ink"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
