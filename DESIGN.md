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

## Dials
ENERGY 2 / RHYTHM 2 / MOTION 1

- MOTION 1: hover states and transitions only. One exception: the "online" status dot
  pulses because a live-status indicator must signal liveness (functional motion).
  No scroll-reveal, no floating, no parallax.

## Content rules
- Every number shown is real or absent: 2+ years building, 3 shipped projects,
  bootcamp graduate 2026. No uptime claims, no user counts, no percentages.
- Project screenshots are labeled placeholders until real captures exist.
