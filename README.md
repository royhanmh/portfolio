# Muhammad Zaynurroyhan - Portfolio

Personal portfolio site, live at [royhanmh.netlify.app](https://royhanmh.netlify.app/).

Full-stack web developer based in Sukabumi, Indonesia. This site replaces my previous portfolio with a terminal-HUD inspired redesign.

## Stack

- React 18 + Vite 6
- Tailwind CSS 4 (`@tailwindcss/vite`)
- lucide-react icons
- @fontsource (self-hosted Inter + Poppins)

## Features

- English / Bahasa Indonesia language toggle, persisted per visitor
- Dark / light theme toggle, persisted per visitor
- Project detail modals with screenshot carousels (keyboard, swipe, and dot navigation)
- Static HUD mesh-grid canvas in the hero, drawn without animation loops
- Security headers via `netlify.toml`
- WCAG AA contrast, full keyboard support, visible focus states

## Projects showcased

| Project | Live | Source |
| --- | --- | --- |
| PadiPOS | [padipos.vercel.app](https://padipos.vercel.app/) | [github.com/royhanmh/padipos](https://github.com/royhanmh/padipos) |
| Tempo | [tempototime.netlify.app](https://tempototime.netlify.app/) | [github.com/royhanmh/tempo](https://github.com/royhanmh/tempo) |
| Warmindo POS | [warmindo-six.vercel.app](https://warmindo-six.vercel.app) | [github.com/royhanmh/warmindo](https://github.com/royhanmh/warmindo) |

## Local setup

```sh
npm install
npm run dev
```

Build and lint:

```sh
npm run build
npm run lint
```

## Structure

```
src/
  components/   Page sections, modal, carousel, icons
  data/         Project and profile data
  hooks/        Static canvas mesh hook
  i18n/         Language provider, hook, translations
  assets/       Profile photo, project screenshots, app logos
```

## License

Personal project. All project screenshots and logos belong to their respective projects.
