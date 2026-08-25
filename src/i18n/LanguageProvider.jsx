import { useCallback, useEffect, useState } from "react";
import { translations } from "./translations";
import { LanguageContext } from "./useLang";

const STORAGE_KEY = "portfolio-lang";

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() =>
    localStorage.getItem(STORAGE_KEY) === "id" ? "id" : "en",
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (path, params) => {
      let value = path
        .split(".")
        .reduce((obj, key) => obj?.[key], translations[lang]);
      if (typeof value === "string" && params) {
        for (const [key, param] of Object.entries(params)) {
          value = value.replaceAll(`{${key}}`, param);
        }
      }
      return value ?? path;
    },
    [lang],
  );

  const toggleLang = useCallback(() => {
    setLang((current) => (current === "en" ? "id" : "en"));
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
