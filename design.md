---
version: alpha
name: Daniel Spagnolo — Product Design Portfolio
description: A faithful specification of the 2026 design language used across danielspagnolo.com. Documents the current state of tokens.css and styles-2026.css for contributors and AI tooling.
colors:
  primary:                "#0066FF"   # primitive-blue-600 — light theme primary (4.65:1 on white)
  primary-dark:           "#24A6FF"   # primitive-blue-400 — dark theme primary
  accent:                 "#EB3886"   # primitive-pink-600 — light theme accent
  accent-dark:            "#F082C6"   # primitive-pink-400 — dark theme accent
  text-strong:            "#21262A"   # primitive-grey-900 — body strong text (light)
  text-body:              "#525C6B"   # primitive-grey-600 — body text (light)
  surface:                "#FFFFFF"   # primitive-white — background (light)
  surface-muted:          "#F5F5F5"   # primitive-grey-100 — muted surface (light)
  text-strong-dark:       "rgba(255,255,255,0.91)"  # body strong text (dark)
  text-body-dark:         "rgba(255,255,255,0.70)"  # body text (dark)
  surface-dark:           "#1F2122"   # primitive-dark-base — background (dark)
  ink:                    "#001A20"   # primitive-ink — near-black
  shadow:                 "rgba(50, 50, 93, 0.11)"
typography:
  display-hero:
    fontFamily: reddit-sans
    fontSize: 20vw           # responsive: scales with viewport width, ~64px–266px
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: -0.6rem
  title-main:
    fontFamily: reddit-sans
    fontSize: 5.75rem        # 92px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.1rem
    textTransform: uppercase
  title-secondary:
    fontFamily: reddit-sans
    fontSize: 4rem           # 64px
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: -0.025rem
  section-title:
    fontFamily: reddit-sans
    fontSize: 2.3125rem      # 37px
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: 0.01rem
  section-subtitle:
    fontFamily: reddit-sans
    fontSize: 1.5rem         # 24px
    fontWeight: 700
    lineHeight: 1.28
    letterSpacing: 0.025rem
  section-small:
    fontFamily: reddit-sans
    fontSize: 1.25rem        # 20px
    fontWeight: 700
    lineHeight: 1.6
  body-regular:
    fontFamily: Georgia, cardoregular, serif
    fontSize: 1.25rem        # 20px
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: Georgia, cardoregular, serif
    fontSize: 1rem           # 16px
    fontWeight: 400
    lineHeight: 1.6
  title-caption:
    fontFamily: Georgia, cardoregular, serif
    fontSize: 1.5rem         # 24px
    fontWeight: 400
    fontStyle: italic
    lineHeight: 1.6
  blockquote:
    fontFamily: Georgia, cardoregular, serif
    fontSize: 2rem           # 32px
    fontWeight: 400
    fontStyle: italic
    lineHeight: 1.6
  caption:
    fontFamily: Georgia, cardoregular, serif
    fontSize: 0.875rem       # 14px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  pill: 28px                 # primary buttons
  pill-tag: 999px            # project pills (rendered via padding + border)
  image: 2.5rem              # 40px — work-module image containers
  toggle: 2.75rem            # 44px — theme toggle background, matches its height
  none: 0
spacing:
  1:    1rem      # 16px
  1-5:  1.5rem    # 24px
  2:    2rem      # 32px
  3:    3rem      # 48px
  4:    4rem      # 64px
  5:    5rem      # 80px — mobile section padding
  8:    8rem      # 128px — desktop section padding
components:
  button-primary:
    background: "{colors.primary}"
    color: "{colors.surface}"
    fontFamily: reddit-sans
    fontSize: 1.25rem
    width: 15rem              # 240px fixed
    height: 3.5rem            # 56px
    borderRadius: "{rounded.pill}"
    letterSpacing: 0.035rem
    hoverTransform: translateY(-1px)
    hoverShadow: "4px 4px 12px 0 {colors.shadow}, 8px 8px 24px 0 {colors.shadow}"
  pill-tag:
    background: transparent
    color: "{colors.text-body}"
    border: "2px solid {colors.text-body}"
    padding: "0.2rem 1rem"
    fontFamily: reddit-sans
    fontSize: 1rem
    display: inline-block
  link-inline:
    color: "{colors.text-body}"
    textDecoration: none
    boxShadow: "inset 0 -4px 0 0 {colors.primary}"   # underline as inset shadow
    hoverBoxShadow: "inset 0 -8px 0 0 {colors.primary}"
  theme-toggle:
    width: 3.875rem           # 62px
    height: 2rem              # 32px
    borderRadius: "{rounded.toggle}"
---

# Daniel Spagnolo — Product Design Portfolio

## Overview

This portfolio is the personal site of Daniel Spagnolo, a senior product designer. Its audience is hiring managers and design peers, and its job is to argue — through tone, craft, and restraint — that the designer behind it pays attention to detail.

The visual personality is **considered, warm, and quietly confident**. It pairs a strong sans-serif (Reddit Sans, used only at heavy weights for titles and UI) with a traditional book serif (Georgia, with Cardo as fallback) for long-form reading. Colour is used sparingly: a single sky-blue primary carries every interactive moment, a pink accent appears as punctuation, and everything else is greyscale. Hand-drawn motifs — wavy lines, an angled hero polygon, a soft circle — keep the system from feeling corporate.

The site supports light and dark themes via a header toggle, with `prefers-color-scheme` as the default. Layout is generous and centred, with long-form reading widths that respect typographic measure rather than filling the viewport.

The voice (see [tone-of-voice.md](tone-of-voice.md)) is honest before impressive, human before process, specific before general. The design should feel the same way.

## Colors

Colour is a hierarchy, not a palette. There is **one** primary, **one** accent, and a controlled neutral ramp.

### Primary — Sky Blue
`--colour-primary` carries every link, button, focus ring, and the wavy-line illustrations. It is the only colour the eye is asked to follow.

- Light theme: `hsla(215, 100%, 50%, 1)` — chosen for a 4.65:1 contrast ratio on white.
- Dark theme: `hsla(205, 100%, 57%, 1)` — slightly lighter and warmer to hold contrast on the dark base.

### Accent — Pink
`--colour-accent` is reserved for moments of personality: the period after the word "Simple" in the hero, decorative dots, and small flourishes. It never carries function — never used for buttons, links, or focus.

- Light theme: `hsla(334, 82%, 57%, 1)`
- Dark theme: `hsla(322, 83%, 69%, 1)`

### Neutrals
A four-stop greyscale plus white/dark-base.

| Token | Light theme | Dark theme | Use |
|---|---|---|---|
| `--colour-dark-grey` | `hsla(195, 6%, 14%, 1)` | white 91% | Body strong / headings |
| `--colour-mid-grey` | `hsla(221, 10%, 36%, 1)` | white 70% | Body copy, captions |
| `--colour-light-grey` | `hsla(0, 0%, 96%, 1)` | `hsla(204, 10%, 20%, 1)` | Muted surfaces. Never text. |
| `--colour-background` | white | `hsla(195, 6%, 13%, 1)` | Page background |

### Constant colours
A small set (`--colour-constant-light-text`, `--colour-constant-dark-grey`, `--colour-constant-light-grey`) stays fixed across themes — used inside the footer and the theme toggle, where the surrounding colour is already inverted.

### Rationale
The blue-and-pink pairing is inherited from the personal logo (visible in the header). Keeping the rest of the system neutral lets case-study imagery — which is itself colourful and varied — sit comfortably without competing with the chrome.

## Typography

A two-typeface system: a contemporary sans for everything **structural** and a serif for everything **read**.

### Reddit Sans (700)
Used for the hero, all titles, navigation, buttons, pills, and any UI label. Only the bold weight is loaded, deliberately — the design never asks for a regular sans. This produces a strong, deliberate rhythm at every heading level.

Preloaded via `<link rel="preload">` to avoid layout shift on the hero.

### Georgia (with Cardo as fallback)
Used for body copy, captions, blockquotes, and lists. The serif slows the reading pace and signals that the case studies are meant to be read, not skimmed.

A `texgyreadventorbold` font is also loaded as a legacy display option but is not used in current screens.

### Type scale
Sizes live as CSS custom properties in [css/tokens.css](css/tokens.css). The scale is non-modular — each step is hand-picked for its semantic role rather than mathematically derived.

| Token | Size | Role |
|---|---|---|
| `--text-xs` | 14px | Caption |
| `--text-sm` | 16px | Body small, muted |
| `--text-md` | 17px | Mobile body |
| `--text-base` | 20px | Body regular, section-small |
| `--text-lg` | 24px | Subtitle, title-caption |
| `--text-xl` | 32px | Blockquote |
| `--text-2xl` | 37px | Section title |
| `--text-3xl` | 64px | Title-secondary |
| `--text-4xl` | 92px | Title-main |

The hero (`display-hero`) is the exception: `font-size: 20vw` so the word "Simple." always fills the same proportion of the viewport, from 320px to 4K.

### Line-height and letter-spacing
- Display sizes use tight line-heights (0.9–1.15) and negative letter-spacing (-0.05 to -0.6rem) to feel monumental.
- Body sizes use a consistent `line-height: 1.6` for readability.
- Body baseline: 20px. Mobile reduces to 17px.

## Layout

### Grid
A 12-column Bootstrap grid ([css/bootstrap-grid.css](css/bootstrap-grid.css)) underpins the page, but the design rarely uses more than three columns at a time. Most case-study content sits in a centred narrow column for reading; hero and full-bleed imagery break out to `col-content-wide`.

### Section rhythm
The `.container` class sets vertical breathing room at three breakpoints:

| Viewport | Top/bottom padding |
|---|---|
| Desktop | 8rem (128px) |
| ≤820px | 5rem (80px) |
| ≤500px | 3rem (48px), zero horizontal |

Sections are separated by space alone — no dividers, no background switches between most sections. The wavy-line SVG is used as a soft separator when needed.

### Spacing scale
A 16px base with seven steps: 1, 1.5, 2, 3, 4, 5, 8 rem. Steps are skipped intentionally (no `--space-6`, `--space-7`) — the system favours large jumps over fine gradations.

### Reading widths
- `col-content-wide` — hero titles, large headings.
- `col-content-narrow` — long-form body copy and blockquotes, kept around 60–70 characters per line.

### Responsive philosophy
Mobile-down breakpoints at 1200, 992, 820, 690, 560, 500, 320. Type sizes step down at 690px and 500px; padding contracts at 820px and 500px. There is no separate mobile layout — the desktop composition simply tightens.

## Elevation & Depth

The design is **near-flat**. Depth is implied through space, scale, and colour weight rather than shadows. Two shadow uses exist:

1. **Button hover** — a soft, two-layer shadow on `.btn:hover` to suggest the element has lifted:
   `4px 4px 12px 0 var(--shadow), 8px 8px 24px 0 var(--shadow)`
   The button also translates up 1px and scales to 0.99 on `:active` for tactile feedback.
2. **Focus rings** — `:focus-visible` uses a 2px outline in the primary colour with 3px offset, never a glow or fuzzy halo.

`--shadow: rgba(50, 50, 93, 0.11)` is the only shadow primitive and is shared across light and dark themes.

Hierarchy is otherwise carried by:
- **Scale** — title sizes do most of the work.
- **Weight contrast** — Reddit Sans 700 against Georgia 400.
- **Colour weight** — strong text (`--colour-dark-grey`) vs body text (`--colour-mid-grey`).

## Shapes

Radius is intentional, not decorative. Each value has one job.

| Value | Where it's used |
|---|---|
| `--radius-pill` / 28px | Primary buttons. |
| `2.5rem` / 40px | Work-module image containers. The only place rounded media appears. Softens the case-study previews and ties them to the pill family without being literally pill-shaped. |
| `2.75rem` / 44px | Theme toggle background, matched to its height so it reads as a true pill switch. |
| `999px`-equivalent (padding + border) | Project pill tags. |
| `0` | Text containers, layout blocks, and in-content imagery within case studies. |

### Decorative motifs
Three hand-drawn SVG primitives appear repeatedly and act as the system's visual signature:

- **Wavy line** — small (84×10) horizontal separators and a large (10×147) vertical version used near the work module heading. Filled with `var(--colour-primary)`. The vertical wavy line has a `wavy-line-animation` class for entry motion.
- **Angled polygon** — a sky-blue triangle at the bottom of the hero, sized 190% width × 985px, creating a non-rectangular hero edge.
- **Circle accent** — a small filled circle that pairs with the hero title.
- **Pink full-stop** — the `<span class="pink-accent">.</span>` in the hero title. The accent colour appears here and almost nowhere else.

These shapes are SVG, not images, so they inherit theme tokens and stay crisp.

## Components

### Primary button (`.btn`)
A fixed-width pill, 240×56px, sky-blue background, white text in Reddit Sans 20px. Always includes an arrow icon. Hover adds a soft shadow and 1px translateY; `:active` scales to 0.99. Focus uses a 2px outline in primary with 3px offset.

The button is intentionally **fixed-width** — buttons are never sized by their content. This keeps every CTA on the site at the exact same visual weight.

### Pill tag (`.pill`)
Used for project metadata (e.g. "AI", "Web", "B2B2C"). Inline-block, 2px mid-grey border, no background, ~3px vertical padding. The tag is structural, not decorative — it reads as a chip, not a label.

### Inline link (`.link`)
Underline rendered as a 4px inset box-shadow in `--colour-primary`, growing to 8px on hover. Text colour is `--colour-mid-grey`, not the primary — the underline does the work of signalling interactivity. A real underline (`text-decoration`) is never used.

### Header link / nav (`<a>`)
Default `<a>` colour is `--colour-primary`. Focus ring is a 2px solid outline.

### Theme toggle
A radio-button pair (`#light`, `#dark`) styled as a pill switch (62×32px). Sun and moon icons sit inside; the switcher slides between them. Labels are `sr-only` for screen readers. The toggle background uses `--colour-toggle-bg` (a constant dark grey) so the control reads consistently in both themes.

### Skip link (`.skip-link`)
Hidden off-screen until focused, then drops into the top-left corner in primary blue with white text — meets WCAG 2.4.1.

### Work module (`.work-module-container`)
The repeated case-study preview block. Each one contains: a hero image with a 2.5rem corner radius (`.work-module-image`), a company logo (`.company-logo`), a 20px section-small heading, a section-title, a row of pill tags, a wavy line separator, a one-sentence body summary, and a "Read more" primary button.

### Logo
The personal SVG logo lives in the header. On hover it shifts hue by 30deg — a small playful detail.

## Do's and Don'ts

### Do
- **Use one primary colour for every interactive moment.** Links, buttons, focus rings, and decorative SVGs all share `--colour-primary`. Consistency is the brand.
- **Pair Reddit Sans (bold only) with Georgia.** Never mix in a third typeface. Never load Reddit Sans at a lighter weight.
- **Reach for the type scale, not custom sizes.** If a size isn't in `tokens.css`, the answer is almost always "use the next size up or down."
- **Let space do the work.** Sections are separated by padding, not dividers or background colour changes.
- **Use the wavy line as the separator when one is needed.** It is the design's signature; reuse it instead of inventing new shapes.
- **Test both themes.** Every screen must work in light and dark. Use semantic tokens (`--colour-text-body`) rather than primitives directly.
- **Use fixed-width primary buttons.** Every CTA should feel the same weight.
- **Use SVGs for shapes and icons** so they inherit theme colours via `currentColor` or token references.
- **Preserve focus rings.** Every focusable element has a visible focus state — never `outline: none` without a replacement.

### Don't
- **Don't use the pink accent for anything functional.** No pink buttons, no pink links. It's punctuation, not navigation.
- **Don't introduce additional colours.** No greens, no warning yellows, no semantic state colours. The system has one primary and one accent for a reason.
- **Don't use `text-decoration: underline` for links.** Inline links use the inset box-shadow underline. The shadow is part of the brand.
- **Don't round in-content imagery.** Only work-module preview images get the 2.5rem radius. Photography and screenshots inside case studies stay square-cornered.
- **Don't use shadows for hierarchy.** Depth comes from scale, weight, and space. Shadows are reserved for the button hover lift.
- **Don't use Reddit Sans for body copy** or Georgia for buttons and labels. The pairing's contrast is the point.
- **Don't invent additional radius values.** Stick to the documented set: 28px, 2.5rem, 2.75rem, pill, or 0.
- **Don't write decorative motion.** Transitions are a single token (`all 0.2s ease`). No bouncing, no parallax, no scroll-jacking.
- **Don't bypass the spacing scale.** If a margin needs a value that isn't 1, 1.5, 2, 3, 4, 5, or 8 rem, reconsider the layout.
- **Don't crowd the hero.** The hero is one word ("Simple.") and one support sentence. Resist the urge to add more.
