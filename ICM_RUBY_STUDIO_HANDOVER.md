# ICM Ruby Studio — Project Handover Document

> **Version:** 2.5.0  
> **Last Updated:** 2026-02-12  
> **Live URL:** https://ruby-canvas.lovable.app  
> **Status:** Production-ready landing page + authenticated editor

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Directory Structure](#directory-structure)
4. [Pages & Routing](#pages--routing)
5. [Component Inventory](#component-inventory)
6. [Design System](#design-system)
7. [Backend / Supabase Integration](#backend--supabase-integration)
8. [Edge Functions](#edge-functions)
9. [Database Schema](#database-schema)
10. [Authentication Flow](#authentication-flow)
11. [Ruby Execution Pipeline](#ruby-execution-pipeline)
12. [Editor Themes](#editor-themes)
13. [Code Examples Library](#code-examples-library)
14. [Environment Variables](#environment-variables)
15. [Dependencies](#dependencies)
16. [Known Limitations & Gotchas](#known-limitations--gotchas)
17. [Roadmap / Planned Features](#roadmap--planned-features)
18. [How to Run Locally](#how-to-run-locally)
19. [Deployment](#deployment)

---

## Project Overview

**ICM Ruby Studio** is a browser-based Ruby IDE designed for ICM Infoworks using ICM Exchange. It provides:

- **Live Ruby execution** (Ruby 3.0.1 via the [Piston API](https://github.com/engineer-man/piston)) — no local Ruby installation needed
- **Monaco Editor** (the VS Code engine) with Ruby syntax highlighting and multiple themes
- **Stateless landing page demo** — anyone can write and execute Ruby without signing up
- **Authenticated multi-file editor** — signed-in users get persistent projects with `app.rb`, `routes.rb`, `models.rb`, and `ui_logic.rb` tabs
- **Code examples library** — Greeter, Calculator, FizzBuzz, Fibonacci pre-loaded snippets
- **Download & copy** — save `.rb` files to desktop or copy to clipboard

The project philosophy: **functional substance over marketing placeholders**. Every feature on the landing page is live and interactive.

---

## Architecture & Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + TypeScript | Component-based SPA |
| **Build** | Vite | HMR, fast bundling |
| **Styling** | Tailwind CSS + shadcn/ui | Design system with HSL tokens |
| **Editor** | `@monaco-editor/react` | VS Code engine in-browser |
| **Backend** | Supabase (Lovable Cloud) | Auth, PostgreSQL, Edge Functions |
| **Execution** | Piston API via Edge Function | Sandboxed Ruby 3.0.1 runtime |
| **Routing** | react-router-dom v6 | Client-side SPA routing |
| **State** | React hooks (useState, useCallback, useRef) | No external state manager |
| **Data Fetching** | @tanstack/react-query (available) + direct Supabase SDK | Query layer |
| **Notifications** | sonner + shadcn toast | Dual toast systems |

---

## Directory Structure

```
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── App.tsx                          # Root router
│   ├── App.css
│   ├── main.tsx                         # Entry point
│   ├── index.css                        # Design system tokens (HSL)
│   ├── vite-env.d.ts
│   ├── lib/
│   │   └── utils.ts                     # cn() helper (clsx + tailwind-merge)
│   ├── hooks/
│   │   ├── use-mobile.tsx               # Mobile breakpoint hook
│   │   └── use-toast.ts                 # Toast hook
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts                # Auto-generated Supabase client (DO NOT EDIT)
│   │       └── types.ts                 # Auto-generated DB types (DO NOT EDIT)
│   ├── pages/
│   │   ├── Index.tsx                    # Landing page (hero + demo + features)
│   │   ├── Auth.tsx                     # Login / Signup
│   │   ├── Dashboard.tsx                # Project list (authenticated)
│   │   ├── Editor.tsx                   # Multi-tab code editor (authenticated)
│   │   └── NotFound.tsx                 # 404 page
│   └── components/
│       ├── editor/
│       │   └── EditorThemes.ts          # Monokai, Dracula, GitHub Dark theme defs
│       ├── landing/
│       │   ├── InteractiveDemo.tsx       # Live Ruby editor on landing page (~454 lines)
│       │   ├── FeatureShowcase.tsx       # Feature cards grid
│       │   ├── HowItWorks.tsx           # 4-step getting started
│       │   ├── TechStack.tsx            # Architecture details + system reqs
│       │   ├── AboutProject.tsx         # Built-with, roadmap, use cases
│       │   └── CallToAction.tsx         # CTA to sign up
│       └── ui/                          # shadcn/ui components (60+ files)
├── supabase/
│   ├── config.toml                      # Edge function config (DO NOT EDIT)
│   ├── functions/
│   │   └── execute-ruby/
│   │       └── index.ts                 # Ruby execution edge function
│   └── migrations/                      # DB migrations (read-only)
├── .env                                 # Supabase env vars (auto-generated, DO NOT EDIT)
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── components.json                      # shadcn/ui configuration
└── package.json                         # (read-only in Lovable)
```

---

## Pages & Routing

Defined in `src/App.tsx`:

| Route | Page Component | Auth Required | Description |
|-------|---------------|---------------|-------------|
| `/` | `Index` | No (redirects to `/dashboard` if logged in) | Landing page with live demo |
| `/auth` | `Auth` | No (redirects to `/dashboard` if logged in) | Login / Signup form |
| `/dashboard` | `Dashboard` | Yes (redirects to `/auth` if not) | Project list, create new projects |
| `/editor/:id` | `Editor` | Yes (redirects to `/auth` if not) | Multi-tab Monaco editor for a project |
| `*` | `NotFound` | No | 404 catch-all |

---

## Component Inventory

### Landing Page Components (`src/components/landing/`)

| Component | Lines | Description |
|-----------|-------|-------------|
| `InteractiveDemo.tsx` | ~454 | **Core demo.** Monaco editor + console output panel. Includes: code examples dropdown (Greeter/Calculator/FizzBuzz/Fibonacci), theme switcher, copy-to-clipboard, download-as-.rb, run button, reset button. Calls `execute-ruby` edge function. |
| `FeatureShowcase.tsx` | ~89 | 6 feature cards: Multi-Pane Editor, Ruby Console, Gem Management, Debugging, Version History, Sandboxed Execution |
| `HowItWorks.tsx` | ~60 | 4-step horizontal flow: Create Account → Start Project → Write Code → Run & Iterate |
| `TechStack.tsx` | ~109 | Architecture details (Monaco, Piston, PostgreSQL, Zero-Trust) + system requirements table |
| `AboutProject.tsx` | ~207 | Built-with links (React, Vite, Tailwind, Supabase, Monaco), public roadmap (Live/In Progress/Planned), use case cards |
| `CallToAction.tsx` | ~40 | Sign-up CTA with gradient button |

### Editor Component (`src/components/editor/`)

| Component | Description |
|-----------|-------------|
| `EditorThemes.ts` | 3 Monaco themes: Monokai, Dracula, GitHub Dark. Each defines token rules + editor colors. |

### UI Components (`src/components/ui/`)

Full shadcn/ui library (~60 components). Key ones in use:
- `button`, `card`, `input`, `dialog`, `dropdown-menu`, `tabs`, `toast`, `toaster`, `badge`, `separator`, `scroll-area`

---

## Design System

### Color Tokens (defined in `src/index.css`)

All colors use **HSL format** without the `hsl()` wrapper (Tailwind convention):

```
--background: 220 20% 97% (light) / 220 20% 11% (dark)
--foreground: 220 15% 15% (light) / 220 15% 95% (dark)
--primary: 348 83% 47% (Ruby red — used across both modes)
--ruby / --ruby-light / --ruby-glow: Ruby brand gradient stops
--accent: 280 65% 60% (Purple accent)
--code-bg: 220 20% 14% (Console/code background)
```

### Custom Utility Classes

```css
.gradient-ruby    → linear-gradient(135deg, primary → ruby-glow)
.gradient-hero    → linear-gradient(135deg, primary → accent)
.glow-ruby        → box-shadow with ruby-glow at 30% opacity
.transition-smooth → all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

### Tailwind Config Extensions

- Custom `sidebar` color namespace (for sidebar component)
- Custom `border-radius` using `--radius` CSS variable
- Accordion keyframe animations

### Dark Mode

Uses Tailwind's `class` strategy (`darkMode: ["class"]`). Dark tokens defined in `.dark {}` block.

---

## Backend / Supabase Integration

**Supabase Project ID:** `ghftgcywmktksqwsuamv`

### Client Setup

```typescript
import { supabase } from "@/integrations/supabase/client";
```

Auto-configured with `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from `.env`.

### Auth Methods Used

- `supabase.auth.signInWithPassword({ email, password })`
- `supabase.auth.signUp({ email, password, options: { emailRedirectTo } })`
- `supabase.auth.signOut()`
- `supabase.auth.getSession()`
- `supabase.auth.getUser()`
- `supabase.auth.onAuthStateChange()`

---

## Edge Functions

### `execute-ruby` (`supabase/functions/execute-ruby/index.ts`)

| Property | Value |
|----------|-------|
| **Path** | `POST /functions/v1/execute-ruby` |
| **JWT Required** | No (`verify_jwt = false` in config.toml) |
| **Purpose** | Proxies Ruby code to the Piston API for execution |
| **Input** | `{ code: string }` |
| **Output** | `{ stdout, stderr, exitCode, signal, output, success }` |
| **External API** | `https://emkc.org/api/v2/piston/execute` |
| **Ruby Version** | 3.0.1 |
| **No API Key Required** | Piston API is free and open |

**Invocation from frontend:**
```typescript
const { data, error } = await supabase.functions.invoke("execute-ruby", {
  body: { code: rubyCode },
});
```

---

## Database Schema

### `public.projects`

| Column | Type | Default | Nullable | Description |
|--------|------|---------|----------|-------------|
| `id` | UUID | `gen_random_uuid()` | NOT NULL | Primary key |
| `name` | TEXT | — | NOT NULL | Project name |
| `user_id` | UUID | — | NOT NULL | Owner (references auth.users implicitly) |
| `modules` | JSONB | NULL | YES | `{ "app.rb": "...", "routes.rb": "...", "models.rb": "...", "ui_logic.rb": "..." }` |
| `created_at` | TIMESTAMPTZ | `now()` | NOT NULL | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | `now()` | NOT NULL | Last update timestamp |

### `public.profiles`

| Column | Type | Default | Nullable | Description |
|--------|------|---------|----------|-------------|
| `id` | UUID | `gen_random_uuid()` | NOT NULL | Primary key |
| `user_id` | UUID | — | NOT NULL | Auth user reference (UNIQUE) |
| `name` | TEXT | NULL | YES | Display name |
| `avatar_url` | TEXT | NULL | YES | Avatar image URL |
| `theme` | TEXT | NULL | YES | Preferred editor theme |
| `created_at` | TIMESTAMPTZ | `now()` | NOT NULL | — |
| `updated_at` | TIMESTAMPTZ | `now()` | NOT NULL | — |

### `public.history_events`

| Column | Type | Default | Nullable | Description |
|--------|------|---------|----------|-------------|
| `id` | UUID | `gen_random_uuid()` | NOT NULL | Primary key |
| `project_id` | UUID | — | NOT NULL | FK → projects.id |
| `change` | TEXT | — | NOT NULL | Description of change |
| `user_name` | TEXT | NULL | YES | Who made the change |
| `timestamp` | TIMESTAMPTZ | `now()` | NOT NULL | When it happened |

---

## Authentication Flow

1. **Landing page (`/`):** Checks `getSession()`. If logged in → redirect to `/dashboard`.
2. **Auth page (`/auth`):** Email/password form toggles between login and signup. Uses `onAuthStateChange` listener to redirect on success.
3. **Dashboard (`/dashboard`):** Guards with `getSession()` → redirect to `/auth` if not authenticated.
4. **Editor (`/editor/:id`):** Same auth guard. Fetches project by ID from Supabase.
5. **Signup redirect:** `emailRedirectTo` is set to `${window.location.origin}/dashboard`.

---

## Ruby Execution Pipeline

```
User clicks "Run"
    ↓
InteractiveDemo.handleRun() / Editor.runCode()
    ↓
supabase.functions.invoke("execute-ruby", { body: { code } })
    ↓
Edge Function receives code
    ↓
POST to https://emkc.org/api/v2/piston/execute
    with { language: "ruby", version: "3.0.1", files: [{ content: code }] }
    ↓
Piston API executes in sandboxed container
    (30s timeout, 128MB memory)
    ↓
Returns { run: { stdout, stderr, code, signal, output } }
    ↓
Edge function transforms to { stdout, stderr, exitCode, success }
    ↓
Frontend displays in console output panel
```

---

## Editor Themes

Defined in `src/components/editor/EditorThemes.ts`:

| Theme Key | Display Name | Base | Background |
|-----------|-------------|------|------------|
| `monokai` | Monokai | `vs-dark` | `#272822` |
| `dracula` | Dracula | `vs-dark` | `#282A36` |
| `github-dark` | GitHub Dark | `vs-dark` | `#0D1117` |

Each theme defines token rules for: `comment`, `keyword`, `string`, `number`, `type`, `class`, `function`, `variable`, `constant`, `operator`.

**To add a new theme:** Add an entry to the `EDITOR_THEMES` object following the same structure. The type `EditorThemeKey` is auto-derived.

---

## Code Examples Library

Defined in `InteractiveDemo.tsx` as `CODE_EXAMPLES`:

| Key | Display Name | Description |
|-----|-------------|-------------|
| `greeter` | Greeter Class | OOP basics, string interpolation, `reduce`, `times` |
| `calculator` | Calculator | OOP with history tracking, private methods, `raise` |
| `fizzbuzz` | FizzBuzz | Classic challenge with range iteration |
| `fibonacci` | Fibonacci | Recursive with memoization, sequence generation, visual bars |

---

## Environment Variables

### `.env` (auto-generated — DO NOT EDIT)

```
VITE_SUPABASE_PROJECT_ID="ghftgcywmktksqwsuamv"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbG..."
VITE_SUPABASE_URL="https://ghftgcywmktksqwsuamv.supabase.co"
```

These are accessible in frontend code via `import.meta.env.VITE_*`.

---

## Dependencies

### Runtime Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` / `react-dom` | ^18.3.1 | Core framework |
| `react-router-dom` | ^6.30.1 | Client-side routing |
| `@supabase/supabase-js` | ^2.78.0 | Supabase client SDK |
| `@monaco-editor/react` | ^4.7.0 | Monaco editor React wrapper |
| `@tanstack/react-query` | ^5.83.0 | Data fetching (available but lightly used) |
| `sonner` | ^1.7.4 | Toast notifications |
| `lucide-react` | ^0.462.0 | Icon library |
| `tailwind-merge` | ^2.6.0 | Tailwind class merging |
| `class-variance-authority` | ^0.7.1 | Component variant system |
| `clsx` | ^2.1.1 | Conditional class names |
| `zod` | ^3.25.76 | Schema validation |
| `react-hook-form` | ^7.61.1 | Form management |
| `@hookform/resolvers` | ^3.10.0 | Zod resolver for react-hook-form |
| `date-fns` | ^3.6.0 | Date utilities |
| `recharts` | ^2.15.4 | Charting (available, not currently used) |
| `vaul` | ^0.9.9 | Drawer component |
| `cmdk` | ^1.1.1 | Command palette |
| `embla-carousel-react` | ^8.6.0 | Carousel |
| `input-otp` | ^1.4.2 | OTP input |
| `react-day-picker` | ^8.10.1 | Calendar/date picker |
| `react-resizable-panels` | ^2.1.9 | Resizable panel layout |
| `next-themes` | ^0.3.0 | Theme management |
| `tailwindcss-animate` | ^1.0.7 | Tailwind animation plugin |

### Radix UI Primitives (via shadcn/ui)

Full set of `@radix-ui/react-*` packages for: accordion, alert-dialog, aspect-ratio, avatar, checkbox, collapsible, context-menu, dialog, dropdown-menu, hover-card, label, menubar, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, switch, tabs, toast, toggle, toggle-group, tooltip.

---

## Known Limitations & Gotchas

1. **InteractiveDemo.tsx is ~454 lines** — candidate for refactoring into smaller components (toolbar, console panel, code examples).
2. **Piston API is external & free** — no SLA, may have rate limits or downtime. No API key is needed.
3. **Edge function `verify_jwt = false`** — the `execute-ruby` endpoint is publicly accessible (intentional for the landing page demo).
4. **No email confirmation** — Supabase auth is configured without explicit auto-confirm; check Cloud auth settings.
5. **`modules` column is JSONB** — the Editor page casts it via `as unknown as Project`. If the schema changes, this cast will silently break.
6. **Two toast systems** — `sonner` (used in Auth, Dashboard, Editor) and shadcn's `useToast` (used in InteractiveDemo). Consider consolidating.
7. **No RLS policies visible in code** — RLS is configured at the database level via migrations. Check Supabase dashboard / migrations folder.
8. **`NotFound` page uses hardcoded colors** — `bg-gray-100`, `text-gray-600`, `text-blue-500` instead of design tokens.
9. **TechStack says "Ruby 3.2.0"** but actual execution is **Ruby 3.0.1** (Piston API version). Inconsistency in `TechStack.tsx` line 89.
10. **Dark mode class strategy** is configured but no toggle UI exists — the app defaults to the OS/browser preference.

---

## Roadmap / Planned Features

(From `AboutProject.tsx`)

### ✅ Currently Live
- Monaco editor with Ruby syntax highlighting
- Live Ruby 3.0.1 execution via Piston API
- 3 editor themes (Monokai, Dracula, GitHub Dark)
- Code examples (Greeter, Calculator, FizzBuzz, Fibonacci)
- Copy to clipboard & download as `.rb`
- Authenticated project persistence (multi-file)
- Version history events table

### ◐ In Progress
- Multi-file project editing UX improvements
- Keyboard shortcuts (Ctrl+Enter to run, Ctrl+S to save)
- Version history UI

### ○ Planned
- Debugger integration
- Git sync
- Gem dependency management UI
- Test runner
- Shareable project links

---

## How to Run Locally

```bash
# Prerequisites: Node.js 18+ and npm/bun

# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd <PROJECT_DIR>

# 2. Install dependencies
npm install
# or
bun install

# 3. Set up environment variables
# The .env file should already contain:
#   VITE_SUPABASE_PROJECT_ID
#   VITE_SUPABASE_PUBLISHABLE_KEY
#   VITE_SUPABASE_URL

# 4. Start development server
npm run dev
# Opens at http://localhost:8080

# 5. Edge functions (if running locally with Supabase CLI)
supabase functions serve execute-ruby --no-verify-jwt
```

---

## Deployment

- **Frontend:** Deployed via Lovable. Click **Publish** → **Update** in the Lovable editor.
- **Edge Functions:** Deploy automatically when code is saved in Lovable. No manual step needed.
- **Database Migrations:** Applied via Lovable Cloud migration tool.
- **Published URL:** https://ruby-canvas.lovable.app

---

## Migration Checklist (Moving to Another App)

When porting this project:

1. **Copy all `src/` files** — the entire frontend is self-contained
2. **Copy `supabase/functions/execute-ruby/`** — the edge function for Ruby execution
3. **Set up Supabase project** with the 3 tables (`projects`, `profiles`, `history_events`)
4. **Configure `.env`** with your Supabase URL and anon key
5. **Install all npm dependencies** from `package.json`
6. **Configure `supabase/config.toml`** with `verify_jwt = false` for `execute-ruby`
7. **Set up RLS policies** matching your auth requirements
8. **Note:** `src/integrations/supabase/client.ts` and `types.ts` are auto-generated by Lovable/Supabase — regenerate them for your new project
9. **Note:** The Piston API (`https://emkc.org/api/v2/piston/execute`) requires no API key — it works out of the box

---

*This document was generated for project handover purposes. For questions, refer to the codebase or the [Lovable documentation](https://docs.lovable.dev/).*
