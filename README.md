# Ashutosh Kumar Goswami — Portfolio

A dark, motion-driven personal portfolio for a backend & cloud engineer. Built
with the Next.js App Router, TypeScript, Tailwind CSS v4 and Framer Motion.

## Highlights

- **Deep dark theme** with a subtle animated aurora backdrop and cyan/violet accents.
- **Traceable mouse cursor** — a precise dot plus a spring-trailing ring and a
  faint comet trail that traces the pointer; grows and inverts over interactive
  elements. Mouse-only, and disabled under `prefers-reduced-motion`.
- **Scrollable career progression** — an animated vertical timeline whose
  gradient line fills as you scroll, with each role revealing in sequence.
- **Fully responsive** and accessible, with reduced-motion support throughout.
- **Deploy anywhere** — one-command Docker image *and* zero-config Vercel deploy.

## Tech stack

| Area       | Choice                                   |
| ---------- | ---------------------------------------- |
| Framework  | Next.js 16 (App Router, standalone output) |
| Language   | TypeScript                               |
| Styling    | Tailwind CSS v4                          |
| Animation  | Framer Motion                            |
| Fonts      | Geist (self-hosted)                      |

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Available scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server                 |
| `npm run build` | Production build (standalone output) |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Editing content

All resume content lives in one typed file: [`src/lib/data.ts`](src/lib/data.ts).
Update your experience, skills, projects, education and contact details there —
the UI is driven entirely from that data.

## Run with Docker

The app builds to a self-contained standalone server, so the image stays small.

```bash
# Build and run with Docker directly
docker build -t ashutosh-portfolio .
docker run -p 3000:3000 ashutosh-portfolio

# …or with Docker Compose
docker compose up --build
```

Then open http://localhost:3000.

## Deploy for free

### Vercel (recommended, zero-config)

1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — just click **Deploy**. No env vars required.

Every push to `main` then ships a production deployment, and pull requests get
preview URLs automatically.

### Other free platforms

Because the app produces a Docker image, it also runs on any container-friendly
free tier — for example **Render**, **Railway** or **Fly.io** — by pointing them
at the included `Dockerfile`.

## Project structure

```
src/
  app/
    layout.tsx        # Root layout, fonts, metadata, cursor mount
    page.tsx          # Section composition
    globals.css       # Dark design tokens + base styles
    icon.svg          # Favicon monogram
  components/
    CustomCursor.tsx  # Traceable mouse animation
    Navbar.tsx        # Sticky nav + scroll progress bar
    Hero.tsx          # Animated hero + stats
    About.tsx
    Experience.tsx    # Scrollable career timeline
    Skills.tsx
    Projects.tsx
    Education.tsx
    Contact.tsx
    Footer.tsx
    Reveal.tsx        # Scroll-reveal wrapper
    SectionHeading.tsx
  lib/
    data.ts           # All portfolio content
```
