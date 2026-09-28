import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLang } from "../i18n/useLang";

const STORAGE_KEY = "portfolio-theme";

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    return "light";
  }
  if (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
  )
    return "dark";
  return "light";
}

export default function ThemeToggle() {
  const { t } = useLang();
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      return;
    }

    const isDark = theme === "dark";
    document.querySelectorAll('link[data-href-dark]').forEach((link) => {
      link.href = isDark ? link.dataset.hrefDark : link.dataset.hrefLight;
    });

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.content = theme === "dark" ? "#0a0e17" : "#f7f9fc";
    }
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
      {theme === "light" ? (
        <Moon size={18} aria-hidden="true" />
      ) : (
        <Sun size={18} aria-hidden="true" />
      )}
    </button>
  );
}
