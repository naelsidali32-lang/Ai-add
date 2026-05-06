---
name: anna-kaleb-design
description: "Design system for the Anna Kaleb (AI ADD) artist portfolio website. Saturated color-block backgrounds, massive white typography, free-form editorial layout, soft pill buttons, and 3D integration. Apply this skill to any frontend work on the AI ADD / Anna Kaleb project."
---

# Anna Kaleb — Design System v2.0

## Brand Identity

**Anna Kaleb** is a creative automation studio portfolio. The design should feel like an **artist's website** — bold, colorful, free-flowing. NOT a SaaS landing page, NOT a corporate site, NOT generic AI slop.

**Mood references**: Saturated color-block hero (like a Dribbble editorial illustration page), soft glassmorphic buttons (like premium fintech cards), massive white display type on color, photos displayed large and free-form (not in neat grids).

## Design Principles

### Core Principles

1. **Color blocks, not white pages** — Each section has its own bold, saturated background color. White is used sparingly, never as the main background.
2. **Nothing is perfectly aligned** — Elements can overlap, bleed off-screen, sit at unexpected positions. The layout should feel hand-placed, not templated.
3. **Photos are HUGE** — Images break the grid, overlap with text, bleed to edges. They are the content, not decoration.
4. **Type is a visual element** — Display titles are so large they become part of the composition, not just readable text. White on color. Always.
5. **Soft, not sharp** — Buttons are pills with rounded corners and subtle glass effects. Transitions are smooth and gentle. No hard edges on interactive elements.

### Advanced Design Techniques (mandatory — apply on every page)

**1. The Anchor Font Method (3-level typography)**
League Spartan 900 is the ANCHOR font — it defines the personality of the entire site. Choose it first, design everything around it. The body font (Helvetica Bold) must CONTRAST with the anchor: League Spartan is condensed and geometric, Helvetica is wider and neutral. This contrast is intentional. Never pair two fonts that are too similar. Use fontsinuse.com to validate pairings.

**2. The "Star of the Show" (Seed Theory)**
The 3D puffer fish / octopus is the STAR — it's the single element that captures attention and makes the visitor stay long enough to explore the rest. This star is not random decoration: it's the "seed" that grows from the brand's identity (creative automation = something alive, playful, unexpected). Every visual decision supports this star — the saturated yellow background makes the 3D model pop, the camera animations keep it interesting, the layout gives it space to breathe.

**3. Visual Rhyme**
Repeat subtle design motifs across the entire site to create cohesion:
- The PILL shape (from buttons) should echo in image masks, tags, badges, and nav elements
- The SATURATED COLOR approach from section backgrounds should appear in hover states, active indicators, and micro-accents
- The BOLD WEIGHT of League Spartan 900 titles should rhyme with Helvetica Bold body text — everything feels hefty and confident
- If the 3D model has round/organic shapes, echo those curves in UI elements (pill buttons, rounded photos, circular indicators)

**4. Tangible Depth**
The site must feel like it exists in the physical world, not flat on a screen:
- Subtle glass/blur effects on buttons (backdrop-filter: blur(12px))
- Photos with slight box-shadow to lift them off the background
- 3D model with real lighting and contact shadows
- CRITICAL: depth elements must NEVER compete with the Star. They are subconscious details — like grain on a film photograph. The eye notices them without focusing on them.
- Subtle background texture or noise overlay at very low opacity (2-5%) on color blocks

**5. Opacity Hierarchy (Material Design principle)**
NEVER use 100% opacity for all text. Create automatic visual hierarchy:
- Titles: 100% opacity (#FFFFFF on color backgrounds)
- Subtitles / body: 70-85% opacity (rgba(255,255,255,0.85))
- Captions / labels: 50% opacity (rgba(255,255,255,0.5))
- Disabled / tertiary: 30% opacity (rgba(255,255,255,0.3))
This makes the page feel intentional — the eye knows instantly what to read first, what to scan, and what to skip. Apply this systematically on EVERY section.

**6. Extreme Iteration (Producer Approach)**
When implementing: do NOT settle on the first layout attempt. Try the opposite — if a photo is left-aligned, try it right. If a section is dark, try it light. If text is small, try it massive. The best version emerges from exploring radically different options, not from tweaking the first idea.

---

## Color Palette

### Section Background Colors (rotate between sections)

| Name | HEX | Usage |
|------|-----|-------|
| **Sunflower** | `#F5C518` | Hero section primary background (like image reference) |
| **Electric Blue** | `#2D5BFF` | Alternate section background |
| **Rose Fluo** | `#FF00BB` | Accent section background, CTAs, highlights |
| **Coral Hot** | `#FF4D4D` | Alternate section background |
| **Deep Night** | `#0A0A0A` | Dark section background, footer |
| **Cream** | `#FFF8E7` | Light accent section (warm white, not pure white) |

### Text & UI Colors

| Role | HEX | Usage |
|------|-----|-------|
| **Title text** | `#FFFFFF` | All display titles — always white on colored backgrounds |
| **Body on color** | `rgba(255,255,255,0.85)` | Body text on colored backgrounds |
| **Body on light** | `#1A1A1A` | Body text on cream/light backgrounds |
| **Muted** | `rgba(255,255,255,0.5)` | Captions, secondary text on color |
| **Accent** | `#FF00BB` | Links, hover states, active indicators |

### CSS Variables

```css
:root {
  --color-sunflower: #F5C518;
  --color-blue: #2D5BFF;
  --color-rose: #FF00BB;
  --color-coral: #FF4D4D;
  --color-night: #0A0A0A;
  --color-cream: #FFF8E7;
  --color-text-white: #FFFFFF;
  --color-text-body: rgba(255, 255, 255, 0.85);
  --color-text-muted: rgba(255, 255, 255, 0.5);
  --color-text-dark: #1A1A1A;
  --color-accent: #FF00BB;
}
```

---

## Typography

### Font Stack

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Display / H1** | League Spartan | 900 (Black) | Hero titles, section statements — MASSIVE |
| **H2 / H3** | League Spartan | 800 (ExtraBold) | Sub-headings |
| **Body** | Helvetica Neue Bold / Helvetica Bold | 700 | Body text — always bold for artist feel |
| **Captions** | League Spartan | 600 | Labels, overlines, small text |

### Font import

```html
<link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@600;700;800;900&display=swap" rel="stylesheet">
```

### Type Scale

| Level | Size | Weight | Line Height | Letter Spacing | Color |
|-------|------|--------|-------------|----------------|-------|
| **Display** | clamp(5rem, 10vw, 12rem) | 900 | 0.85 | -0.04em | White |
| **H1** | clamp(3.5rem, 7vw, 7rem) | 900 | 0.88 | -0.03em | White |
| **H2** | clamp(2rem, 4vw, 4rem) | 800 | 0.95 | -0.02em | White |
| **H3** | clamp(1.5rem, 2.5vw, 2rem) | 800 | 1.1 | -0.01em | White |
| **Body** | 1.1rem (17-18px) | 700 | 1.6 | 0 | rgba(255,255,255,0.85) |
| **Caption** | 0.75rem | 600 | 1.3 | 0.12em | rgba(255,255,255,0.5) |

### Typography Rules

- Titles are WHITE. Always. On every background color. No exceptions.
- Display text is so large it becomes part of the visual composition
- Body text is bold (weight 700) for an artist/editorial feel
- Letter spacing on titles is tight (negative)
- Text can overlap images — use `mix-blend-mode: difference` or `multiply` if needed
- No text shadows — rely on contrast from background color

---

## Layout System

### Free-Form Editorial (NOT grid-based)

The site does NOT use symmetric grids. Each section is a unique composition.

```
Hero — "Color block statement"
┌──────────────────────────────────────────┐
│ BG: Sunflower yellow (#F5C518)           │
│                                          │
│        [3D Object floating               │
│         right side, overlapping edge]     │
│                                          │
│  The art                                 │
│  of thinking        ← huge white type    │
│                                          │
│  [timeline / labels at bottom]           │
│  ○ pill button                           │
└──────────────────────────────────────────┘

Section — "Photo bleed"
┌──────────────────────────────────────────┐
│ BG: Electric Blue                        │
│                                          │
│   [MASSIVE photo, bleeding               │
│    off left edge, 80% width]             │
│                                          │
│                     Small body text       │
│                     right-aligned         │
│                                          │
│   TITLE OVERLAPPING                      │
│   THE PHOTO BOTTOM                       │
└──────────────────────────────────────────┘

Section — "Scattered gallery"  
┌──────────────────────────────────────────┐
│ BG: Coral Hot                            │
│                                          │
│   [photo 1]              [photo 2]       │
│        rotated -3deg      rotated 2deg   │
│              [photo 3]                   │
│               rotated -1deg              │
│                                          │
│    overlapping, like photos              │
│    thrown on a table                     │
└──────────────────────────────────────────┘
```

### Layout Rules

1. **No max-width container** — content spans full viewport, photos bleed to edges
2. **Elements can rotate** — use `transform: rotate(-2deg)` to `rotate(3deg)` for organic feel
3. **Overlap is mandatory** — at least one element per section overlaps another via negative margins or absolute positioning
4. **Section transitions** — no hard color cuts. Use `clip-path`, diagonal cuts, or overlapping elements to transition between section colors
5. **Photos are never in equal-size grids** — use varied sizes, some huge (80vw), some small (200px), scattered

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `section-padding` | 6rem 4vw | Inside each color-block section |
| `element-gap` | 2rem - 4rem | Between elements (variable, not uniform) |
| `photo-overlap` | -3rem to -8rem | Negative margins for overlap |

---

## Component Patterns

### Buttons — Soft Pill Style (from reference image 2)

```css
.btn-pill {
  font-family: 'League Spartan', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  padding: 14px 32px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Primary — dark pill with glass */
.btn-pill-dark {
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(12px);
  color: #FFFFFF;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
.btn-pill-dark:hover {
  background: rgba(10, 10, 10, 1);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
}

/* Secondary — white pill with glass */
.btn-pill-light {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  color: #1A1A1A;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.15);
}
.btn-pill-light:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
}

/* Accent — rose fluo pill */
.btn-pill-accent {
  background: #FF00BB;
  color: #FFFFFF;
  box-shadow: 0 4px 20px rgba(255, 0, 187, 0.3);
}
.btn-pill-accent:hover {
  background: #CC0099;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(255, 0, 187, 0.4);
}
```

### Navigation — Minimal

```
[Logo/Name left]                    [☰ hamburger right]
```

- Logo is just the text "ANNA KALEB" in League Spartan 800, white
- Hamburger is 3 lines, white, top-right
- Nav overlays the hero content, transparent background
- Fixed position, `z-index: 50`

### Section Label / Overline

```css
.section-label {
  font-family: 'League Spartan', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}
```

### Photo Treatment

- Photos are displayed with subtle `border-radius: 8px` (NOT rounded-3xl)
- Some photos have `box-shadow: 0 20px 60px rgba(0,0,0,0.3)`
- Photos can be rotated slightly: `transform: rotate(-2deg)`
- On hover: `transform: rotate(0deg) scale(1.02)` — straightens out

---

## 3D Integration Rules

1. **The 3D canvas background is transparent** (`gl={{ alpha: true }}`)
2. **The 3D model lives ON the color block** — it's part of the composition, like the skateboard/baguette in the reference image
3. **The model can overlap the edge** of the viewport or other elements
4. **Lighting uses the section's background color** as ambient tint — on the yellow hero, the model gets warm yellow-tinted light
5. **Camera is scroll-driven** via GSAP ScrollTrigger — cinematic keyframes, no user controls
6. **Idle animation** — subtle float + micro-rotation

---

## Animation Guidelines

### Scroll Behavior

- Sections transition with **clip-path reveals** or **parallax overlap** — the next section peeks under the current one
- Photos **parallax** at different speeds — creates depth
- Text enters with **simple fade + translateY(30px)** — no bounce, no scale

### Hover States

- Buttons: `translateY(-2px)` + stronger shadow
- Photos: `rotate(0deg) + scale(1.02)` (straighten + slight zoom)
- Links: color shift to accent `#FF00BB`

### Easing

- Enter: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth overshoot)
- Exit: `cubic-bezier(0.4, 0, 0.2, 1)` (gentle fade)
- NEVER: `linear`, default `ease`, or `bounce`

---

## Anti-Patterns (NEVER DO)

| ❌ Never | ✅ Instead |
|----------|-----------|
| White background for main sections | Bold saturated color blocks |
| Centered symmetric layouts | Free-form, asymmetric, overlapping |
| Small photos in equal-size card grids | HUGE photos, varied sizes, scattered |
| Generic gradient backgrounds | Solid saturated colors |
| Rounded-3xl cards with shadows | Flat color blocks, minimal radius |
| Particle backgrounds | Clean solid colors — let the content speak |
| Purple/blue AI gradient aesthetic | Sunflower yellow, coral, electric blue |
| Thin/light body text (weight 300-400) | Bold body text (weight 700) |
| Multiple font families | League Spartan + Helvetica Bold only |
| Safe, predictable compositions | Bold, artist-driven, surprising layouts |

---

## Section Color Rotation

Apply section backgrounds in this order for visual rhythm:

1. **Hero**: Sunflower `#F5C518` (with 3D object)
2. **Process**: Deep Night `#0A0A0A`
3. **Photo Gallery**: Electric Blue `#2D5BFF`
4. **Video Static**: Coral Hot `#FF4D4D`
5. **Animated Video**: Cream `#FFF8E7` (light break — text becomes dark)
6. **Cinematic Video**: Rose Fluo `#FF00BB`
7. **KPI**: Deep Night `#0A0A0A`
8. **Agentic AI**: Sunflower `#F5C518`

---

## Tailwind Config Extensions

```js
export default {
  theme: {
    extend: {
      colors: {
        'sunflower': '#F5C518',
        'electric-blue': '#2D5BFF',
        'rose-fluo': '#FF00BB',
        'coral-hot': '#FF4D4D',
        'night': '#0A0A0A',
        'cream': '#FFF8E7',
        'accent': '#FF00BB',
      },
      fontFamily: {
        'league': ['"League Spartan"', '"Helvetica Neue"', 'Arial Black', 'sans-serif'],
        'body': ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'pill': '9999px',
      },
    },
  },
}
```

---

## Media Assets (existing in /public)

Photos: `photo1.jpg` through `photo5.jpg`, `photoA.jpg` through `photoN.jpg`
Videos: `video1.mp4` through `video7.mp4`
3D Model: `toon_puffer_fish.glb`

Keep all existing media — only change how they're displayed (sizes, positions, rotations).

---

## Quick Reference

```
BACKGROUNDS:   Rotate: #F5C518, #0A0A0A, #2D5BFF, #FF4D4D, #FFF8E7, #FF00BB
TITLES:        Always white (#FFFFFF), League Spartan 900, clamp(5rem, 10vw, 12rem)
BODY:          Helvetica Bold 700, rgba(255,255,255,0.85) on color
BUTTONS:       Pills (border-radius: 9999px), dark glass or white glass
PHOTOS:        HUGE, varied sizes, slightly rotated, overlapping
LAYOUT:        Free-form, asymmetric, elements overlapping
CORNERS:       Pills for buttons (9999px), minimal for photos (8px)
SHADOWS:       Only on buttons and floating photos
3D:            Transparent canvas, part of the composition, warm-lit
ANIMATION:     GSAP ScrollTrigger, smooth cubic-bezier, parallax photos
```
