// Brand icons for the tech stack. Each icon is the technology's own mark,
// so relevance is inherent (R-04). Monogram tiles follow the official
// badge style for tools without a simple glyph.

function reactIcon() {
  return (
    <svg
      className="h-8 w-8 text-[#61DAFB]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="12" rx="10" ry="4.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function javaScriptIcon() {
  return (
    <div className="flex h-8 w-8 items-end justify-end bg-[#F7DF1E] p-1 text-xs font-bold text-black">
      JS
    </div>
  );
}

function tailwindIcon() {
  return (
    <svg className="h-8 w-8 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
    </svg>
  );
}

function nodeIcon() {
  return (
    <svg className="h-8 w-8 text-[#5FA04E]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm-1 15.5l-6-3.3v-6.4l6 3.3v6.4zm2 0v-6.4l6-3.3v6.4l-6 3.3z" />
    </svg>
  );
}

function expressIcon() {
  return (
    <div className="flex h-8 w-8 items-center justify-center border border-current text-xs font-bold italic tracking-tight text-ink">
      ex
    </div>
  );
}

function mySQLIcon() {
  return (
    <div className="flex h-8 w-8 items-center justify-center bg-[#00758F] text-[9px] font-bold text-white">
      SQL
    </div>
  );
}

function gitIcon() {
  return (
    <svg className="h-8 w-8 text-[#F05032]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2.6 10.59L11.41 1.78c.78-.78 2.05-.78 2.83 0l8.98 8.98c.78.78.78 2.05 0 2.83l-8.98 8.98c-.78.78-2.05.78-2.83 0L2.6 13.42c-.78-.78-.78-2.05 0-2.83zm8.06 5.91a1.6 1.6 0 001.09 1.51v.01a1.6 1.6 0 102.82 0v-3.4a1.6 1.6 0 00.84-1.41 1.6 1.6 0 10-3.2 0c0 .61.34 1.14.84 1.41v3.4a1.6 1.6 0 00-.39.25l-2.06-2.06a1.6 1.6 0 10-.94.29z" />
    </svg>
  );
}

function restApiIcon() {
  return (
    <div className="flex h-8 w-8 items-center justify-center border-2 border-dashed border-current font-mono text-[8px] font-bold text-brand-bright">
      {"{ }"}
    </div>
  );
}

export const TECH_ICONS = {
  React: reactIcon,
  JavaScript: javaScriptIcon,
  "Tailwind CSS": tailwindIcon,
  "Node.js": nodeIcon,
  "Express.js": expressIcon,
  MySQL: mySQLIcon,
  Git: gitIcon,
  "REST APIs": restApiIcon,
};
