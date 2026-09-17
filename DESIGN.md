# DESIGN.md

## Identity
Personal portfolio for Muhammad Zaynurroyhan, full-stack web developer.
Visual language: dark terminal-HUD. The HUD frame (corner markers, mono micro-labels,
coordinate dots, one mesh-grid canvas) is the single identity motif. It repeats across
hero and project previews so the page reads as one system.

## Reason log (R-31)
- Dark default: the declared HUD brand is a control-room/terminal aesthetic; dark is
  the native environment of that identity, not a trend pick. A working light theme
  ships alongside it via toggle.
- Palette: navy neutral base + one blue accent + green reserved for live/status only
  (2 core colors + 1 status accent, R-29).
- Type: Poppins headings (geometric, confident), Inter body (readability). Monospace
  appears only on HUD micro-labels and markers as motif accent, never on headings
  or body (R-06).
- Canvas mesh grid in hero: the one texture of the motif. Drawn statically, no loop,
  because MOTION dial is 1 (R-07 pass with written purpose).
- Glow: logo mark only. Everything else matte (R-13 dose cap).
- Radius: sharp corners (rounded-sm max) everywhere. Sharp edges are part of the HUD
  language (R-11 deliberate choice).
- Certificates: a credential is a document, so the section is a horizontal
  scroll-snap strip of framed documents, not a card grid (R-05, C-3). Frames use
  3:2 with `object-contain` so the whole document is readable; letterboxing sits on
  `panel-soft`, never white, so light theme stays matte.
- Certificate overflow is signalled by peeking the next card (about 30 percent of a
  card), so scroll chrome is hidden: no scrollbar competes with the HUD frame lines.
- Credly badges stay a separate block from certificates: square verification seals
  next to landscape documents would produce ragged rows, and the two things verify
  differently (a badge links to its public Credly page, a certificate opens a
  lightbox). Different content, different affordance.
- Badge art is stored locally rather than hotlinked from `images.credly.com`:
  a third-party origin can change paths silently, and a local WebP keeps the
  section loading without a cross-origin request. Each badge still links out to
  its public Credly page for verification.

## Dials
ENERGY 2 / RHYTHM 2 / MOTION 2

- MOTION 2: hover states, transitions, and one ambient loop: the hero canvas
  mesh drifts particles continuously. User-requested ambient motion; the loop
  is disabled entirely under `prefers-reduced-motion` (static frame instead).
  No scroll-reveal, no floating UI elements, no parallax.

## Content rules
- Every number shown is real or absent: 2+ years building, 3 shipped projects,
  bootcamp graduate 2026. No uptime claims, no user counts, no percentages.
- Project screenshots are labeled placeholders until real captures exist.
- Certificates come from real scanned documents in `src/assets/certs`; Credly badges
  come from the public profile at `credly.com/users/muhammad-zaynurroyhan`. Credential
  titles are official credential names, so they are shown in English in both locales.
- A certificate whose title or issuer is still unknown shows only its image and the
  bracketed placeholder; metadata is omitted rather than invented (R-38).
