---
name: Alex Chen Portfolio
description: Dark OLED and Slate developer portfolio with lush emerald accents and ambient cinemagraph hero
colors:
  background: "#0a0f1e"
  surface: "#0f172a"
  card: "#131d31"
  card-hover: "#18253d"
  card-border: "rgba(255, 255, 255, 0.08)"
  foreground: "#f8fafc"
  slate-100: "#f1f5f9"
  slate-200: "#e2e8f0"
  slate-300: "#cbd5e1"
  slate-400: "#94a3b8"
  slate-500: "#64748b"
  slate-600: "#475569"
  slate-700: "#334155"
  slate-800: "#1e293b"
  slate-900: "#0f172a"
  slate-950: "#070c18"
  muted-foreground: "#94a3b8"
  subtle: "#64748b"
  accent: "#22c55e"
  accent-hover: "#16a34a"
  accent-light: "#4ade80"
  accent-subtle: "rgba(34, 197, 94, 0.12)"
  sky: "#38bdf8"
  sky-deep: "#0284c7"
  amber: "#f59e0b"
  amber-deep: "#d97706"
  yellow: "#facc15"
  destructive: "#ef4444"
  destructive-light: "#f87171"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  serif:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontStyle: "italic"
    fontWeight: 400
  body:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  xs: "3px"
  sm: "4px"
  md: "6px"
  lg: "10px"
  xl: "16px"
  "2xl": "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
---

# Design System

## Overview
A calm, high-craft developer portfolio system anchored by a cinematic, ambient anime video hero (meadow, laptop, cat, sunset light) and executed with an OLED/Slate dark theme and vibrant emerald code accents. Designed to evoke focus, technical competence, and aesthetic serenity without relying on overused AI tropes.

## Colors
- **Base Background**: `#0a0f1e` — Deep midnight slate. Grounds the entire viewport and seamlessly continues the hero video's dark ambient tones.
- **Surfaces & Cards**: `#131d31` / `rgba(19, 29, 49, 0.75)` — Glassmorphic cards with subtle `rgba(255, 255, 255, 0.08)` borders and soft backdrop blur.
- **Primary Accent**: `#22c55e` (Emerald Green) — Used for terminal greetings, active indicators, live demo CTAs, and skill progress bars.
- **Secondary Accents**:
  - Sky Blue (`#38bdf8`) for systems and full-stack tags.
  - Warm Amber (`#f59e0b`) echoing the orange cat and devops tags.
- **Typography Colors**: High contrast `#f8fafc` for primary headers and labels, `#94a3b8` for readable descriptive text.

## Typography
- **Primary Interface**: `IBM Plex Sans` — Technical, authoritative, human.
- **Monospace Elements**: `JetBrains Mono` — Code snippets, numbers, metric counters, category chips, and section eyebrows.
- **Hierarchy**:
  - Hero Title: `clamp(3.2rem, 6.5vw, 5.5rem)`, weight 600
  - Section Title: `clamp(2rem, 3.5vw, 2.75rem)`, weight 600
  - Card Titles: `1.15rem – 1.25rem`, weight 600
  - Body Text: `0.9375rem – 1.0625rem`, line-height 1.6

## Layout
- **Container**: Max width `1240px`, centered with fluid responsive padding (`1.5rem` mobile, `2rem` desktop).
- **Hero Section**: Full bleed `100vw` / `100vh` edge-to-edge.
- **Grid Systems**:
  - Highlights: 2 columns mobile, 4 columns desktop.
  - Projects: 1 column mobile, 2 columns tablet, 3 columns desktop.
  - Skills: 1 column mobile, 3 columns desktop.
  - Contact: 1 column mobile, 2 balanced columns desktop.

## Elevation & Depth
- **Borders**: Hairline translucent borders (`rgba(255, 255, 255, 0.08)`) instead of heavy dropshadows.
- **Hover Glow**: `0 0 24px rgba(34, 197, 94, 0.2)` on card and button interaction.
- **Backdrop Filters**: `blur(20px)` on fixed navigation bar.

## Shapes
- Buttons and chips: `4px` to `10px`.
- Content Cards: `16px` to `24px`.
- Badges and Pills: Pill radius (`9999px`).

## Components
- **Header**: Fixed glassmorphic navbar with active indicator, smooth anchor scrolling, and mobile drawer.
- **Hero**: Ambient background video, 0.7x cinemagraph loop, understated typography, discreet playback toggle.
- **Stats Card**: Crisp white metrics with mono labels and vertical divider borders.
- **Project Card**: Category chip, metrics badge, title, description, tech stack tags, and live demo / source actions.
- **Skill Card**: Category icon header, individual skills with years-of-experience chips, and GPU-accelerated progress tracks.
- **Timeline Card**: Glowing emerald node, period pill, location pin, concrete impact bullets.
- **Contact Card**: Pulsing emerald availability beacon, one-click copy email box, and interactive contact form.

## Do's and Don'ts
- **DO** use solid text colors with high contrast (>4.5:1 WCAG AA).
- **DO** animate with GPU-accelerated `transform` and `opacity` (never animate `width` or `height`).
- **DO** honor user `prefers-reduced-motion`.
- **DON'T** use gradient text (`background-clip: text`) on headings or numbers.
- **DON'T** use overused generic fonts (Inter, Arial, Roboto).
- **DON'T** use purple-to-blue gradient cards or nested cards.
