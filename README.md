# ICM Ruby Studio (ruby-canvas)

> _README added by Robert Dickinson via Comet._

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn--ui-000000?logo=shadcnui&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)

## About

This repository (originally scaffolded as `ruby-canvas`) is an **ICM Ruby Studio** — a web-based editor and workspace for writing and exploring Ruby scripts used with InfoWorks ICM's UI/Exchange scripting. It pairs a landing experience with an in-browser code editor and uses Supabase for backend storage/integration.

It is part of the SWMMEnablement collection and is built on a modern Vite + React + TypeScript frontend styled with Tailwind CSS and shadcn/ui.

## What's Inside

| Area | Description |
| --- | --- |
| `src/components/editor/` | In-browser Ruby script editor components |
| `src/components/landing/` | Landing page sections |
| `src/components/ui/` | shadcn/ui reusable UI primitives |
| `src/pages/` | Application page views |
| `src/integrations/` | Supabase client and integration code |
| `src/hooks/`, `src/lib/` | Custom React hooks and utilities |
| `supabase/` | Supabase project config and backend functions |
| `public/` | Static assets |

## Tech Stack

| Layer | Technology |
| --- | --- |
| Language | TypeScript |
| Framework | React |
| Build tool | Vite |
| Styling | Tailwind CSS |
| UI components | shadcn/ui |
| Backend | Supabase |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/SWMMEnablement/ruby-canvas.git
cd ruby-canvas

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open the local URL printed by Vite (typically http://localhost:5173) in your browser.

> Note: This project integrates with Supabase. Configure the required environment variables (see `.env`) with your own Supabase project URL and keys before running against a live backend.

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## License

No license file is currently included. Contact the SWMMEnablement organization regarding reuse.
