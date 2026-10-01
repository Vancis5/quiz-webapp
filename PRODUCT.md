# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Students, learners, and educators looking for focused, high-engagement subject quizzes with zero friction and immediate pedagogical feedback.

## Product Purpose
Deliver an interactive quiz experience that turns assessment into an engaging, tactile learning loop. Success means high completion rates, immediate comprehension from explanations, and an interface that feels sharp, focused, and enjoyable to use.

## Positioning
Unlike bloated, gamified quiz apps cluttered with ads, countdown anxiety, and noisy gimmicks, this webapp provides a calm, high-precision, tactile assessment session with keyboard-first controls and instant feedback.

## Operating Context
Quick classroom warmups, self-paced study sessions, and mobile micro-learning on desktop and mobile browsers.

## Capabilities and Constraints
- Single-page responsive web app running on Vite + React + Tailwind CSS.
- Audio and confetti sensory feedback with global mute toggle.
- Keyboard-first navigation (1-4, A-D, Enter, Space).
- Clear state transitions across Start, Question, Explanation, and Performance Results.
- No backend dependency required; data driven by JSON schema.

## Brand Commitments
- Crisp vector iconography and precise typographic hierarchy over generic emojis and decorative fluff.
- Tactile, keycap-style interactive controls with clear feedback states.
- High contrast, WCAG AA compliant color systems across all themes.

## Evidence on Hand
- `src/data/quizData.json`: Structured question bank with explanations and correct indices.
- `CONTEXT.md`: Defined domain terminology (Session, Question, Option, Feedback, Performance).

## Product Principles
- Clarity over spectacle: the question and options are the heroes.
- Zero latency: instant feedback on selection without jarring layout shifts.
- Accessible by default: full keyboard navigability and WCAG AA contrast.
- Tactile delight: micro-interactions feel mechanical, satisfying, and intentional.

## Accessibility & Inclusion
- Full keyboard support for all operations (Start, Select 1-4/A-D, Next, Restart, Mute).
- Minimum 4.5:1 text contrast on all viewports.
- Clear visual differentiation beyond color alone (icons, checkmarks, distinct borders).
- Safe viewport sizing using dynamic viewport units (`dvh`).
