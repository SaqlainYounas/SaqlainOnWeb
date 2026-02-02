# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server (port 3000)
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Architecture

Next.js 16 portfolio site using App Router, React 19, TypeScript 5, and Tailwind CSS v4.

- `app/` — App Router pages and layouts
- `app/layout.tsx` — Root layout with Geist font family
- `app/page.tsx` — Home page
- `app/globals.css` — Global styles with CSS custom properties for light/dark mode
- `public/` — Static assets

## Key Conventions

- Path alias: `@/*` maps to the project root
- Styling: Tailwind CSS v4 via PostCSS (no tailwind.config — v4 uses CSS-based config in globals.css)
- ESLint v9 flat config extending `next/core-web-vitals` and `next/typescript`
- TypeScript strict mode enabled

## Git Rules

- Do NOT include `Co-Authored-By` lines in commit messages
