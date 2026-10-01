---
name: "Quiz Webapp - Specimen Laboratory Deck"
description: "Precision tactile study instrument and assessment interface"
colors:
  primary: "#10b981"
  primary-deep: "#059669"
  chassis: "#090a0f"
  surface-elevated: "#12141a"
  border-hairline: "rgba(255, 255, 255, 0.1)"
  feedback-correct: "#10b981"
  feedback-wrong: "#f43f5e"
  feedback-amber: "#f59e0b"
  text-high: "#f4f4f5"
  text-muted: "#a1a1aa"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "24px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#000000"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  keycap-option:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    textColor: "{colors.text-high}"
    rounded: "{rounded.md}"
    padding: "16px 20px"
---

# Design System: Quiz Webapp - Specimen Laboratory Deck

## Overview

**Creative North Star: "The Tactical Specimen Deck"**

A high-precision, distraction-free study instrument designed to reject AI slop, playful toy gamification, and generic gradient cards. The interface treats assessment as a calibrated laboratory interaction: mechanical keycap option buttons, tactile feedback, segmented progress rails, and razor-sharp typographic hierarchy.

**Key Characteristics:**
- Deep obsidian and charcoal chassis with hairline measurement grid boundaries.
- Physical keycap affordances with keyboard-first shortcut integration.
- Instant, deterministic feedback without disruptive layout shifts.
- High contrast WCAG AA compliant palette across all states.

## Colors

The palette is rooted in deep obsidian chassis tones with sharp luminescent emerald and rose signals for unambiguous verification.

### Primary
- **Signal Emerald** (`#10b981`): The primary affirmation and active milestone indicator, representing correct verification and forward progress.

### Secondary
- **Signal Rose** (`#f43f5e`): Error and incorrect selection state, calibrated for immediate recognition without harsh visual penalty.
- **Amber Glow** (`#f59e0b`): Warning and intermediate performance tier indicator.

### Neutral
- **Deep Obsidian** (`#090a0f`): Core viewport ground.
- **Instrument Surface** (`#12141a`): Elevated panel and card background.
- **Hairline Border** (`rgba(255, 255, 255, 0.1)`): Technical separation boundaries.
- **Text High** (`#f4f4f5`): Primary readable content.
- **Text Muted** (`#a1a1aa`): Secondary taxonomic and structural labels.

### Named Rules
**The Rarity of Glow Rule.** Saturated glowing states appear strictly upon user interaction and definitive outcome states. Neutral surfaces remain subdued and matte at rest.

## Typography

**Display Font:** Inter (with system-ui fallback)
**Body Font:** Inter
**Label / Numeric Font:** UI Monospace (Menlo, Monaco, Consolas)

**Character:** Technical, confident, and highly legible with balanced tracking and tabular numeric alignment.

### Hierarchy
- **Display** (800, clamp(1.75rem, 4vw, 2.5rem), 1.15): Start and Results primary banners.
- **Headline** (700, clamp(1.25rem, 2.5vw, 1.75rem), 1.25): Question challenge statements.
- **Body** (400 / 500, 1rem, 1.5): Option descriptions and educational explanations.
- **Label** (600, 0.75rem, tracking-wider, uppercase): Monospace status indicators, keyboard hints, and taxonomic metadata.

### Named Rules
**The Tabular Milestone Rule.** All question numbers, milestones, timer counts, and score readouts use tabular numbers (`tabular-nums font-mono`) to prevent visual jitter during transitions.

## Layout

A responsive viewport-locked composition (`min-h-dvh`) that gracefully accommodates mobile dynamic navigation bars. An upper precision instrument bar houses session status and controls; the central viewport frames the active challenge card; the lower region provides keyboard navigational guidance.

## Elevation & Depth

Surfaces rely on subtle tonal layering (`bg-zinc-900/90` over `#090a0f`) bounded by 1px hairline translucent borders (`border-white/10`). Shadows are reserved for physical keycap button bevels (`keycap-bevel`) and active glow bursts.

### Named Rules
**The Mechanical Keycap Rule.** Interactive buttons possess a 2px physical lower bevel that depresses on `:active`, communicating instant tactile mechanical actuation.

## Shapes

Curvatures are disciplined: 10px (`rounded-xl`) for option buttons, 16px (`rounded-2xl`) for elevated laboratory cards, and 6px (`rounded-lg`) for physical keycaps. Pill shapes are restricted exclusively to small micro-labels and status badges.

## Components

### Option Buttons
- **Shape:** 10px radius, 1px border.
- **Rest:** `bg-white/[0.03] border-white/10 text-zinc-200`.
- **Keycap:** Monospace letter badge (`A-D` / `1-4`) with top-light inset bevel.
- **Correct:** `border-emerald-500 bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-500/50`.
- **Incorrect:** `border-rose-500 bg-rose-500/15 text-rose-100 ring-1 ring-rose-500/50`.

### Segmented Progress Bar
- **Shape:** Discrete individual question pills.
- **State:** Solid fill for completed, pulsing border for current active question, translucent dark track for upcoming.

### Primary Action Buttons
- **Shape:** 12px radius, bold typography, integrated keyboard keycap badge (`[Enter]` / `[Space]`).

## Do's and Don'ts

### Do:
- **Do** support keyboard shortcuts (`1-4`, `A-D`, `Space`, `Enter`, `M`, `R`) for all primary actions.
- **Do** maintain a minimum 4.5:1 contrast ratio across all explanatory and option typography.
- **Do** use vector SVG icons with uniform 2px stroke weights.

### Don't:
- **Don't** use generic stock emojis (`🎯`, `🔥`, `💪`) as interface ornaments.
- **Don't** lock viewports with `h-screen overflow-hidden` that clips content on mobile keyboards or landscape viewports.
- **Don't** rely on color alone to differentiate correct and incorrect answers; always pair with distinct iconography and status copy.
