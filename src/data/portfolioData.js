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
import certSinauKoding from "../assets/certs/sinau-koding-best-graduate.webp";
import certDataScience from "../assets/certs/data-science.webp";
import certGenerativeAi from "../assets/certs/generative-ai.webp";
import badgeAzure from "../assets/badges/azure-fundamentals.webp";
import badgePowerPlatform from "../assets/badges/power-platform-fundamentals.webp";
import badgeSecurityIdentity from "../assets/badges/security-compliance-identity-fundamentals.webp";

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

// Certificates. All `image` files are real scanned documents in src/assets/certs.
// `title` is the official credential name as issued, so it is not localized
// (BadgeRow titles work the same way). `issued` is the date printed on the
// credential; an empty value hides the date rather than guessing (R-38).
export const CERTIFICATES = [
  {
    id: "01",
    title: "Best Graduate, Fullstack Web Development Bootcamp",
    issuer: "Sinau Koding",
    issued: "2026-05-05",
    credentialId: "06/BC/OL/20260505/09",
    verifyUrl: "",
    image: certSinauKoding,
  },
  {
    id: "02",
    title: "Belajar Penerapan Data Science dengan Microsoft Fabric",
    issuer: "Dicoding Indonesia",
    issued: "2026-09-12",
    credentialId: "ERZR7G9ONZYV",
    verifyUrl: "https://www.dicoding.com/certificates/ERZR7G9ONZYV",
    image: certDataScience,
  },
  {
    id: "03",
    title: "Membangun Aplikasi Gen AI dengan Microsoft Azure",
    issuer: "Dicoding Indonesia",
    issued: "2026-09-17",
    credentialId: "N9ZO054KYXG5",
    verifyUrl: "https://www.dicoding.com/certificates/N9ZO054KYXG5",
    image: certGenerativeAi,
  },
];

// Real records from the public Credly profile
// (https://www.credly.com/users/muhammad-zaynurroyhan/badges).
// Badge titles are official credential names, so they are not localized.
export const CREDLY_PROFILE =
  "https://www.credly.com/users/muhammad-zaynurroyhan/badges";

export const BADGES = [
  {
    id: "01",
    title:
      "Microsoft Certified: Security, Compliance, and Identity Fundamentals",
    issuer: "Microsoft",
    issued: "2021-12-17",
    url: "https://www.credly.com/badges/ed5e11f8-a168-48b0-ae92-91d2fa644b20/public_url",
    image: badgeSecurityIdentity,
  },
  {
    id: "02",
    title: "Microsoft Certified: Power Platform Fundamentals",
    issuer: "Microsoft",
    issued: "2021-11-16",
    url: "https://www.credly.com/badges/5fb02718-8051-44eb-a307-6584ef962e26/public_url",
    image: badgePowerPlatform,
  },
  {
    id: "03",
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    issued: "2021-10-09",
    url: "https://www.credly.com/badges/20ee157b-67a4-4f7f-87e8-e5728311a803/public_url",
    image: badgeAzure,
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
