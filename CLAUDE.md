# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server (port 3000)
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Architecture

Next.js 15 portfolio site using App Router, React 19, TypeScript 5, and Tailwind CSS v4.

### Route structure

- `app/layout.tsx` — Root layout: Geist fonts, `ThemeProvider`, `CustomCursor`, `FirebaseAnalytics`
- `app/(main)/` — Route group sharing Navbar + DotGrid background layout
- `app/(main)/projects/[slug]/page.tsx` — Dynamic project detail page
- `app/opengraph-image.tsx` — OG image generated with Satori/Next.js

### Content system

All static text (navigation, metadata, contact form labels, etc.) lives in `content.json` at the project root. Pages and components import directly from it:

```ts
import content from "@/content.json";
```

Navigation links and social links are re-exported from `lib/constants/navigation.ts`.

### Data layer

Firebase Firestore is the data store. Services are in `lib/services/`:
- `lib/services/projects.ts` — `getFeaturedProjects`, `getAllProjects`, `getProjectBySlug`
- `lib/services/skills.ts` — `getAllSkills`

`lib/utils/mock-data.ts` contains placeholder data (marked with TODO comments) for use until Firestore collections are populated. Contact form submissions are written directly to a `contacts` Firestore collection via the form component.

Firebase is initialized once in `lib/firebase.ts` and exports `db` (Firestore) and `analytics`.

Required env vars (all `NEXT_PUBLIC_`):
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

### Theme system

`lib/contexts/theme-context.tsx` provides `ThemeProvider` and `useTheme`. Theme is persisted to `localStorage` and applied by toggling the `.dark` class on `<html>`. CSS custom properties for both modes are defined in `app/globals.css` under `:root` and `.dark`.

### Styling conventions

- Tailwind CSS v4 via PostCSS — no `tailwind.config`; theme tokens defined in `globals.css` via `@theme inline`
- Color tokens: `background`, `foreground`, `accent` (`#0066ff`), `muted`, `muted-foreground`, `border`, `card`, `destructive`, `success`
- Font tokens: `--font-sans` (Geist Sans), `--font-mono` (Geist Mono)
- Custom cursor is active for pointer-capable devices (`@media (pointer: fine)`); native cursor is hidden via CSS
- Path alias: `@/*` maps to the project root

## Key Conventions

- ESLint v9 flat config extending `next/core-web-vitals` and `next/typescript`
- TypeScript strict mode enabled
- Contact form validation uses react-hook-form + zod
- Use comments sparingly, keep comments natural

## Git Rules

- Do NOT include `Co-Authored-By` lines in commit messages
- All commits must have a title and description
- Include a list of newly created or modified files in the commit description
