# Accessibility (WCAG AA) Fixes

## Status key
- ✅ Done
- ❌ Not needed
- 🔲 To do

---

## ✅ Skip navigation link
**WCAG SC:** 2.4.1 Bypass Blocks  
**Files:** All HTML pages, `css/styles-2025.css`

**Why this fix is needed:** Keyboard-only users (people who can't use a mouse, or who use switch access/assistive devices) must press Tab to move through every link and button on the page in order. Without a skip link, they must tab through the entire header and navigation bar on every single page load before they can reach the main content. On this site that's ~6–8 tab stops per page, every time.

**Outcome:** Keyboard users can press Tab once, then Enter, and jump straight to the main content. Navigation becomes practical rather than exhausting.

### What was done
- Added `<a class="skip-link" href="#main-content">Skip to main content</a>` as the first element inside `<body>` on every page
- Added `id="main-content" tabindex="-1"` to the first `<h1>` in each page's main content (skip link target must be on a naturally focusable element — `tabindex="-1"` on `<main>` is not reliably focused by browsers via anchor navigation)
- Added `.skip-link` CSS styles to `styles-2025.css` — visually hidden until focused, uses `--colour-primary` / `--colour-background` tokens so it respects dark/light mode
- Added `color: var(--colour-background)` to `.skip-link:focus` to override the global `a:focus { color: var(--colour-primary) }` rule (without this, the text was blue on a blue background)
- Added `#main-content:focus { outline: none; }` to suppress the default focus ring on the heading target

### How to test
1. Load any page in the browser
2. Press **Tab** once — skip link should appear at the top of the page
3. Press **Enter** (not Space — Space scrolls, Enter activates links)
4. Press **Tab** again — focus should land on the first interactive element in the main content, bypassing the header and nav

---

## ✅ `prefers-reduced-motion` media query
**WCAG SC:** 2.3.3 Animation from Interactions  
**Files:** `css/styles-2025.css`

**Why this fix is needed:** Users with vestibular disorders (e.g. Ménière's disease), epilepsy, or motion sensitivity can experience nausea, dizziness, or seizures from on-screen animation and transitions. macOS, Windows, iOS, and Android all expose a "Reduce Motion" system preference. Currently 15+ transition and animation rules in the stylesheet fire regardless of this setting, meaning the site actively harms these users when they've explicitly asked for less motion.

**Outcome:** When a user has enabled "Reduce Motion" in their OS settings, all CSS transitions and animations are suppressed to near-instant. The site remains fully functional — things still change state — but without the movement that causes harm.

15+ transition/animation rules fire regardless of OS motion preferences. Add to end of CSS:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## ✅ Videos without captions or transcripts
**WCAG SC:** 1.2.1, 1.2.2 Captions (Prerecorded)  
**Files:** `casestudy-automation.html`, `casestudy-liveness.html`, `casestudy-moh.html`, `casestudy-registration.html`

**Why this fix is needed:** Deaf and hard-of-hearing users cannot access audio content in videos. Users in noisy environments, or those who prefer to read, also rely on captions. Without captions or a transcript, any spoken content — narration, UI sounds, context — is completely inaccessible to a significant portion of users.

**Outcome:** All video content becomes accessible to deaf/hard-of-hearing users and is usable without audio. Also benefits users watching in public, those with audio processing difficulties, and non-native speakers.

Add `<track kind="captions" src="captions.vtt" srclang="en" label="English">` inside each `<video>` element, or add a visible transcript below each video. Also remove invalid `alt` attributes from all `<video>` elements — `alt` is not a valid video attribute and is ignored by assistive technology.

---

## ✅ Theme toggle radio inputs have no labels
**WCAG SC:** 1.3.1, 4.1.2 Name, Role, Value  
**Files:** All HTML pages (~lines 97–98)

**Why this fix is needed:** Screen readers announce form controls by their label. Without a label, VoiceOver/NVDA will read out "radio button, 1 of 2" with no indication of what the option does. A blind user cannot tell which radio button switches to light mode and which switches to dark mode — the controls are functionally unusable.

**Outcome:** Screen reader users hear "Light theme, radio button, 1 of 2" and "Dark theme, radio button, 2 of 2", giving them full control over the theme preference.

`<input type="radio" id="light">` and `<input type="radio" id="dark">` have no associated `<label>`. Screen readers cannot name the controls.

```html
<input type="radio" name="theme" id="light" checked>
<label for="light" class="sr-only">Light theme</label>
<input type="radio" name="theme" id="dark">
<label for="dark" class="sr-only">Dark theme</label>
```

Add `.sr-only` utility class to CSS:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## ❌ Company logos on CV page have empty alt text (not needed)
**WCAG SC:** 1.1.1 Non-text Content  
**File:** `cv-daniel-spagnolo.html` (~lines 208, 231, 253, 274, 297, 318, 363, 385)

**Why this fix is needed:** Screen readers skip images with `alt=""`, treating them as purely decorative. On the CV page, employer logos are the primary visual identifier for each role — without descriptive alt text, a screen reader user gets no indication of which company is being described until they read further into the content. The information is conveyed less efficiently than for sighted users.

**Outcome:** Screen reader users hear "Culture Amp logo" (or similar) as they navigate through CV entries, giving them the same immediate company identification that sighted users get visually.

All employer logos use `alt=""`. Since company names aren't always in adjacent text, add descriptive alt text:

```html
<img src="..." alt="Culture Amp logo">
<img src="..." alt="Unmind logo">
<!-- etc. -->
```

> **Note:** On `index.html` the same logos appear next to an `<h5>` with the company name — `alt=""` is acceptable there as the name is conveyed in adjacent text.

---

## 🔲 Heading hierarchy jumps
**WCAG SC:** 1.3.1 Info and Relationships  
**Files:** `index.html`, `casestudy-ai-coach.html`, `casestudy-adoption.html`

**Why this fix is needed:** Screen reader users navigate pages by jumping between headings (a single keypress in VoiceOver/NVDA). They rely on heading levels to understand the structure and hierarchy of a page — h1 is the page title, h2 is a major section, h3 is a subsection, and so on. Skipping levels (e.g. h2 → h4) or having two h1s breaks this mental map and makes it harder to understand where content sits in the page structure.

**Outcome:** Heading navigation becomes logical and predictable. Screen reader users can build an accurate mental model of page structure, and tools like document outlines, browser extensions, and search engines parse the content correctly.

- `index.html` has two `<h1>` elements (hero headline + "SELECTED WORK"). The second should be `<h2>`.
- Work module cards use `<h3>` with no `<h2>` section heading — skips a level.
- TL;DR sections in case studies use `<h4>` directly after `<h2>` — should be `<h3>`.

---

## ✅ Focus indicators under-specified
**WCAG SC:** 2.4.7 Focus Visible  
**File:** `css/styles-2025.css` (~lines 239–240, 273–275, 335–340)

**Why this fix is needed:** Keyboard users navigate by moving focus between interactive elements. If there's no visible indicator showing which element is currently focused, they have no way of knowing where they are on the page — it's the equivalent of removing the mouse cursor for mouse users. The current CSS either relies on unpredictable browser defaults, or uses `box-shadow` which some high-contrast modes and browser configurations don't render as a focus indicator.

**Outcome:** Every interactive element — links, buttons, inputs — shows a clear, high-contrast focus ring when focused via keyboard. Keyboard users always know exactly where they are on the page.

- `a:focus { outline: 2px solid; }` — no explicit colour set, relies on browser default
- `.link:focus` uses only `box-shadow`, not an outline
- `.btn:focus` sets `outline-color` but not `outline-width` or `outline-style`

Fix: define `outline: 2px solid var(--colour-primary); outline-offset: 3px` explicitly on all interactive elements. Add `:focus-visible` alongside `:focus` so mouse users are unaffected.

---

## ✅ Heart icon in footer has no accessible name
**WCAG SC:** 1.1.1 Non-text Content  
**Files:** All pages (footer)

**Why this fix is needed:** The ♥ symbol is injected via CSS `content: '\2665'`, which most screen readers either skip entirely or announce as a raw Unicode character name ("BLACK HEART SUIT"). Neither gives the user the intended meaning. The footer likely reads as "Made with [pause] by Daniel" — missing the "love" that completes the sentence.

**Outcome:** Screen reader users hear "Made with love by Daniel" — the full, intended meaning of the footer text.

`.heart::before { content: '\2665'; }` renders ♥ via CSS with no ARIA label.

```html
<!-- Before -->
<span class="heart"></span>

<!-- After -->
<span class="heart" role="img" aria-label="love"></span>
```

---

## ✅ Touch targets below 44×44px
**WCAG SC:** 2.5.5 Target Size  
**File:** `css/styles-2025.css`

**Why this fix is needed:** Users with motor impairments, tremors, or low dexterity (including many older users) struggle to tap small targets accurately on touchscreens. Apple's Human Interface Guidelines and WCAG both recommend a minimum 44×44px tap target. Elements below this size generate a disproportionate number of mis-taps, forcing users to retry interactions and creating friction that can make the site unusable for some.

**Outcome:** All interactive elements are reliably tappable on mobile devices, reducing mis-taps for users with motor difficulties and improving the general mobile experience for everyone.

| Element | Current size | Fix |
|---|---|---|
| Theme toggle inputs | 36×36px (~line 1193) | Increase to 44×44px |

---

## ✅ Decorative SVGs not hidden from screen readers
**WCAG SC:** 1.1.1, 4.1.2  
**Files:** All HTML pages

**Why this fix is needed:** Screen readers announce every image and SVG they encounter unless explicitly told not to. Decorative SVGs — angle lines, wavy dividers, background shapes — have no meaningful content, but without `aria-hidden="true"` a screen reader user hears something like "image" or "graphic" as they navigate, adding noise that obscures the actual content.

**Outcome:** Screen reader users hear only meaningful content. Decorative visual elements are invisible to assistive technology, making navigation cleaner and less confusing.

Angle and wavy line SVGs will be announced by screen readers as unlabelled graphics.

```html
<svg aria-hidden="true" ...>
```

---

## ❌ `figcaption` font size below minimum on mobile
**WCAG SC:** 1.4.4 Resize Text  
**File:** `css/styles-2025.css` (~line 686)

**Why this fix is needed:** Users with low vision rely on readable body text. At 14px (0.875rem), caption text is already near the lower limit of comfortable readability for many people, and browser zoom may not help if the text is absolutely sized. WCAG requires that text can be resized up to 200% without loss of content — but starting at 14px means users begin from a more difficult baseline.

**Outcome:** Caption text remains readable on small viewports without requiring users to zoom. Improves readability for low-vision users and generally improves the mobile reading experience.

`font-size: 0.875rem` (14px) below 500px viewport. Keep at `1rem` minimum.

---

## ✅ Verify mid-grey text contrast on light-grey backgrounds (checked. Passes at 6.49:1)
**WCAG SC:** 1.4.3 Contrast Minimum  
**File:** `css/styles-2025.css`

**Why this fix is needed:** WCAG requires a minimum 4.5:1 contrast ratio between normal text and its background. Mid-grey text on a light-grey background is a common design pattern that often fails this threshold — it can look fine to people with full colour vision, but becomes illegible for users with low vision, colour blindness, or when viewing on a low-quality screen or in bright ambient light.

**Outcome:** All body text meets the 4.5:1 contrast minimum, ensuring it's readable for users with low vision and in challenging viewing conditions.

`.muted` text (`--colour-mid-grey`) on `--colour-background-alt` (light grey) may fall below the 4.5:1 ratio required for normal text. Verify with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).
