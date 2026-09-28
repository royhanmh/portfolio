const LOCALES = { en: "en-US", id: "id-ID" };

export function formatIssueDate(iso, lang) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(LOCALES[lang] ?? LOCALES.en, {
    month: "short",
    year: "numeric",
  }).format(date);
}
