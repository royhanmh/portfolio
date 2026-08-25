import padiposDashboard from "../assets/screenshots/padipos-dashboard.jpg";
import padiposCatalog from "../assets/screenshots/padipos-catalog.jpg";
import padiposReport from "../assets/screenshots/padipos-report.jpg";
import tempoTimers from "../assets/screenshots/tempo-timers.jpg";
import tempoTemplates from "../assets/screenshots/tempo-templates.jpg";
import tempoFocus from "../assets/screenshots/tempo-focus.jpg";
import warmindoPos from "../assets/screenshots/warmindo-pos.jpg";
import warmindoStock from "../assets/screenshots/warmindo-stock.jpg";
import warmindoReport from "../assets/screenshots/warmindo-report.jpg";
import logoPadipos from "../assets/logos/padipos.webp";
import logoTempo from "../assets/logos/tempo.webp";
import logoWarmindo from "../assets/logos/warmindo.webp";

export const NAV_ITEMS = [
  { id: "home" },
  { id: "work" },
  { id: "about" },
  { id: "contact" },
];

export const PROFILE = {
  name: "ZAYNURROYHAN",
  fullName: "Muhammad Zaynurroyhan",
  email: "royhanm35@gmail.com",
  location: "Sukabumi, West Java",
  socials: [
    { label: "GitHub", url: "https://github.com/royhanmh" },
    { label: "LinkedIn", url: "https://linkedin.com/in/royhanmh" },
    { label: "Instagram", url: "https://instagram.com/royhan_zay" },
  ],
};

export const PROJECTS = [
  {
    id: "01",
    title: "PadiPOS",
    logo: { src: logoPadipos, alt: "PadiPOS logo" },
    type: { en: "Point of Sale System", id: "Sistem Point of Sale" },
    description: {
      en: "A role-based point of sale for small businesses. Admin manages products and inventory while cashiers handle transactions, with reporting and account settings in one web application.",
      id: "Point of sale berbasis peran untuk usaha kecil. Admin mengelola produk dan inventaris, kasir menangani transaksi, dilengkapi laporan dan pengaturan akun dalam satu aplikasi web.",
    },
    tags: ["React", "Express.js", "PostgreSQL", "JWT"],
    liveUrl: "https://padipos.vercel.app/",
    githubUrl: "https://github.com/royhanmh/padipos",
    accent: "pos",
    screenshots: [
      {
        src: padiposDashboard,
        alt: "PadiPOS admin dashboard with sales summary",
      },
      { src: padiposCatalog, alt: "PadiPOS product catalog management" },
      { src: padiposReport, alt: "PadiPOS sales report with filters" },
    ],
  },
  {
    id: "02",
    title: "Tempo",
    logo: { src: logoTempo, alt: "Tempo logo" },
    type: { en: "PWA / Timer Workspace", id: "PWA / Ruang Kerja Timer" },
    description: {
      en: "A personal timer workspace for deep work, study, workout rest, cooking, and custom activities. Timers stay accurate across refreshes and browser restarts.",
      id: "Ruang kerja timer pribadi untuk deep work, belajar, istirahat olahraga, memasak, dan aktivitas kustom. Timer tetap akurat meski browser di-refresh atau dimulai ulang.",
    },
    tags: ["React", "Tailwind CSS", "Zustand", "PWA"],
    liveUrl: "https://tempototime.netlify.app/",
    githubUrl: "https://github.com/royhanmh/tempo",
    accent: "timer",
    screenshots: [
      { src: tempoTimers, alt: "Tempo active timer for deep work" },
      { src: tempoTemplates, alt: "Tempo preset timer templates" },
      { src: tempoFocus, alt: "Tempo distraction-free focus mode" },
    ],
  },
  {
    id: "03",
    title: "Warmindo POS",
    logo: { src: logoWarmindo, alt: "Warmindo POS logo" },
    type: { en: "Point of Sale System", id: "Sistem Point of Sale" },
    description: {
      en: "A POS system for small food businesses with fast ordering, inventory tracking, and stock visibility built around daily operations.",
      id: "Sistem POS untuk usaha kuliner kecil dengan pemesanan cepat, pelacakan inventaris, dan visibilitas stok yang dibangun untuk operasional harian.",
    },
    tags: ["React", "shadcn/ui", "Tailwind CSS"],
    liveUrl: "https://warmindo-six.vercel.app",
    githubUrl: "https://github.com/royhanmh/warmindo",
    accent: "warmindo",
    screenshots: [
      { src: warmindoPos, alt: "Warmindo POS ordering screen with menu grid" },
      { src: warmindoStock, alt: "Warmindo inventory management table" },
      { src: warmindoReport, alt: "Warmindo sales report page" },
    ],
  },
];

export const STATS = [
  { key: "years", icon: "terminal", value: "2+" },
  { key: "projects", icon: "package", value: "3" },
  { key: "bootcamp", icon: "graduation", value: "2026" },
  { key: "location", icon: "mapPin", value: "ID" },
];

export const TECH_STACK = [
  "React",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MySQL",
  "Git",
  "REST APIs",
];
