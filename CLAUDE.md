# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WillowVibe | Data Synapse company website. A Next.js 16 App Router marketing site deployed to Vercel at `www.willowvibe.com`.

## Common Commands

- `npm run dev` — Start the development server on http://localhost:3000
- `npm run build` — Production build
- `npm run start` — Start production server (requires build first)
- `npm run lint` — Run ESLint (Next.js core-web-vitals + typescript configs)

No test framework is configured.

## Environment Variables

Create `.env.local` in the project root for local development. Required for contact form functionality:

```
HOSTINGER_USER=your-email@willowvibe.com
HOSTINGER_PASSWORD=your-hostinger-password
```

These must also be configured in the Vercel dashboard under Project Settings → Environment Variables.

> **Note:** The contact API (`src/app/api/contact/route.ts`) uses Hostinger SMTP (`smtp.hostinger.com:465`), not Gmail. Older documentation may reference Gmail env vars — those are obsolete.

## Architecture

### Next.js App Router
- `src/app/page.tsx` — Home page
- `src/app/about/page.tsx` — About / team page
- `src/app/services/page.tsx` — Services listing
- `src/app/products/page.tsx` — Products page
- `src/app/contact/page.tsx` — Contact page with form
- `src/app/privacy/page.tsx` — Privacy policy
- `src/app/terms/page.tsx` — Terms of service
- `src/app/api/contact/route.ts` — API route handling contact form submissions via Nodemailer
- `src/app/layout.tsx` — Root layout wrapping all pages with Navbar, Footer, and ChatBot

### Component Patterns
- Most page-level data (team members, services, projects, testimonials) is defined as constants at the top of the respective page file.
- Interactive components use `"use client"` directive; pages are server components by default.
- `src/components/ChatBot.tsx` is a rule-based (not AI) FAQ widget that matches keywords against predefined question/answer pairs.
- `src/components/BeforeAfterSlider.tsx`, `DataStreamVisual.tsx`, and `AnomalyDetectionVisual.tsx` are project-specific interactive visuals rendered in the home page carousel.

### Styling
- **Tailwind CSS v4** with `@theme inline` syntax in `src/app/globals.css`.
- Custom theme tokens: `--color-background: #070b18`, `--color-primary: #00f0ff`, `--color-secondary: #7000ff`.
- Custom utility classes defined in globals.css:
  - `.glass` — frosted glass effect with backdrop blur
  - `.glass-panel` — gradient glass panel with cyan border
  - `.glow-text` — cyan text shadow
  - `.glow-border` — animated hover border with cyan glow
- Fonts: Geist Sans and Geist Mono via `next/font/google`.

### Important Implementation Details
- The contact form POSTs to `/api/contact`, validates required fields, and sends HTML email via Nodemailer using Hostinger SMTP credentials.
- The navbar is fixed and uses the `.glass` utility class. All pages account for its height via `pt-16 md:pt-20` on `<main>` in `layout.tsx`.
- Several components use Framer Motion for scroll and hover animations.
