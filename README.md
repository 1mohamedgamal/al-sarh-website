# شركة الصرح للمقاولات | Al Sarh General Contracting

A premium Angular 17 landing page for Al Sarh General Contracting & Supplies Co. (شركة الصرح للمقاولات العمومية والتوريدات).

---

## Tech Stack

- **Angular 17+** — Standalone components, signals, new control flow (`@if/@for`)
- **TypeScript** — Strict mode
- **SCSS** — Custom design system with CSS custom properties
- **Angular Animations** — Entrance animations
- **Angular Reactive Forms** — Contact form with full validation
- **Custom IntersectionObserver directive** — Reveal-on-scroll effects

---

## Setup & Development

### Prerequisites
- Node.js 18+
- npm 9+

### Install dependencies
```bash
npm install
```

### Start dev server
```bash
npx ng serve
# Navigate to http://localhost:4200/
```

### Build for production
```bash
npx ng build --configuration production
# Output → dist/al-sarh-website/
```

---

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # project.model.ts, service.model.ts
│   │   └── services/        # language.service.ts, scroll.service.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── section-heading/
│   │   │   └── animated-counter/
│   │   └── directives/
│   │       └── reveal-on-scroll.directive.ts
│   └── features/
│       ├── header/           # Sticky nav, mobile drawer, language toggle
│       ├── hero/             # Full-viewport hero with geometric SVG
│       ├── about/            # Two-column with image collage
│       ├── services/         # 6-card service grid
│       ├── stats/            # Animated counters on blue band
│       ├── projects/         # Asymmetric grid + modal
│       ├── why-us/           # Alternating feature rows
│       ├── team/             # 3-column team cards
│       ├── clients/          # Auto-scrolling marquee
│       ├── cta/              # Full-bleed call-to-action
│       ├── contact/          # Reactive form + contact info
│       └── footer/           # 4-column footer
├── styles/
│   ├── _variables.scss       # Brand palette, typography, spacing
│   ├── _mixins.scss          # Reusable SCSS mixins
│   ├── _typography.scss      # Type scale
│   ├── _animations.scss      # Keyframes & animation classes
│   └── _utilities.scss       # Helper classes
└── assets/
    └── icons/
        └── favicon.svg
```

---

## Brand Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `$primary-blue` | `#233e95` | Main brand, hero, CTAs |
| `$accent-gold` | `#f5b800` | Accents, CTA buttons, highlights |
| `$dark-charcoal` | `#1a1a1a` | Text, dark backgrounds |
| `$dark-navy` | `#1a1f3a` | Why-Us section bg |
| `$bg-light` | `#f8f9fb` | Section alternation |

### Fonts
- **Arabic display**: Cairo 800–900
- **Arabic body**: Tajawal 400–500
- **English display**: Space Grotesk 600–700
- **English body**: Inter 400–600

---

## Features

- Full **RTL Arabic** support (default) with LTR English toggle
- `LanguageService` with Angular `signal()` — persisted to `localStorage`
- **Reveal-on-scroll** via custom `IntersectionObserver` directive
- **Animated counters** — count up on viewport entry
- **Project modal** — accessible dialog with keyboard/Escape close
- **Contact form** — Angular Reactive Forms with validation & success state
- **WhatsApp float** — pre-filled message, pulse animation
- **Sticky header** — transparent → solid blue on scroll
- **Mobile drawer** — full-screen slide-in navigation
- `prefers-reduced-motion` support throughout

---

## Design Rationale

**Architecture as design language.** Every layout decision is informed by the brand's identity — geometric Kufic typography, modular construction logic, and the diagonal angular cuts seen in the official brand guidelines PDF. The 60-30-10 color rule (white–blue–gold) is applied rigidly across all sections to maintain brand coherence without monotony.

**RTL-first typography.** Arabic text uses Cairo/Tajawal at 1.8 line-height minimum, heavier weights than equivalent Latin, and zero italic usage. The `direction` and `font-family` toggle via the `LanguageService` effect ripples through CSS `:host-context` selectors.

**Motion with purpose.** All animations are bound by `prefers-reduced-motion`. Reveals use a 30px translateY + opacity pattern for elegance without distraction. Stat counters trigger only once per session. Hero entrance is orchestrated with CSS animation-delay staggering — no JavaScript needed.

**Performance architecture.** OnPush change detection on every component. IntersectionObserver-based lazy reveal avoids layout thrash. All SCSS uses `@use` (not `@import`) for tree-shakeable style output. The build output is 250KB initial JS (dev), significantly less after production optimization.

---

## Contact

- Email: CEO@alsarh.org
- Website: www.alsarh.org
- Phone: 01090067829 / 01028880792
