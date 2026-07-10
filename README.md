# Anil Balaji Steel Corporate Website

A statically exported marketing site for Anil Balaji Steel (ABS), a steel manufacturing and processing company. The site presents the company profile, product catalogue, manufacturing capabilities, corporate social responsibility work, and contact channels for prospective B2B buyers, distributors, and partners.

![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-Proprietary-lightgrey?style=flat)

## Table of Contents

1. [Overview](#overview)
2. [Motivation](#motivation)
3. [Build and Deployment Status](#build-and-deployment-status)
4. [Code Style](#code-style)
5. [Screenshots](#screenshots)
6. [Tech Stack](#tech-stack)
7. [Features](#features)
8. [Project Structure](#project-structure)
9. [Getting Started](#getting-started)
10. [Available Scripts](#available-scripts)
11. [Environment Variables](#environment-variables)
12. [Testing](#testing)
13. [Deployment](#deployment)
14. [Contributing](#contributing)
15. [Credits](#credits)
16. [License](#license)

## Overview

This repository contains the source for the public facing website of Anil Balaji Steel. It is built with the Next.js App Router and exported as a fully static site (`output: 'export'`), which is then pushed to a traditional FTP host rather than a Node runtime.

The site covers the company's corporate story, product range (sheets, pipes, chequered plates, shutters, and shutter accessories), manufacturing facility (Fabrica), network and distribution reach, CSR initiatives, careers, and a contact form for inbound enquiries.

## Motivation

Anil Balaji Steel needed a modern, fast loading, and easily maintainable web presence to replace legacy marketing collateral (PDF brochures and catalogues) with an interactive, structured, and SEO friendly site. Content such as product listings, service offerings, leadership directors, timeline milestones, and news is centralized in typed data modules under `data/`, so updates do not require touching page markup directly.

A static export target was chosen deliberately, since the production host only supports FTP based static file hosting rather than a Node.js server, and the build pipeline is tuned to keep FTP deploys incremental by pinning the Next.js build ID.

## Build and Deployment Status

The project is built and deployed automatically on every push to `main` via GitHub Actions, which runs `npm run build` and pushes the resulting `out/` directory to the production FTP host.

[![Build & Deploy to FTP](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?style=flat&logo=githubactions&logoColor=white)](.github/workflows/deploy.yml)
[![Node](https://img.shields.io/badge/node-20.x-339933?style=flat&logo=node.js&logoColor=white)](.github/workflows/deploy.yml)

The workflow definition lives at `.github/workflows/deploy.yml`.

## Code Style

Formatting and linting are enforced through Prettier and ESLint (Next.js flat config), wired into pre commit hooks via Husky and lint staged.

[![code style: prettier](https://img.shields.io/badge/code%20style-prettier-F7B93E?style=flat&logo=prettier&logoColor=black)](https://prettier.io)
[![linting: eslint](https://img.shields.io/badge/linting-eslint-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org)
[![type checked: TypeScript](https://img.shields.io/badge/type%20checked-typescript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

Configuration:

- Prettier: `.prettierrc` (semicolons on, single quotes, trailing commas, two space indentation, one hundred character print width).
- ESLint: `eslint.config.mjs`, extending `eslint-config-next` and `eslint-config-prettier`.
- Pre commit: `.husky/` plus the `lint-staged` block in `package.json`, which runs ESLint and Prettier on staged TypeScript files and Prettier on staged JSON, CSS, and Markdown files.

## Screenshots

Visual assets for the site (hero imagery, product photography, the India distribution map, and brand marks) live under `public/`. Add representative screenshots of the live pages here as the design stabilizes.

## Tech Stack

**Framework and rendering**

[![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

Next.js 16 with the App Router, running in static export mode (`output: 'export'`).

**Styling and UI**

[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com)
[![Lucide](https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev)
[![class variance authority](https://img.shields.io/badge/class%20variance%20authority-8B5CF6?style=for-the-badge)](https://cva.style)
[![tailwind merge](https://img.shields.io/badge/tailwind%20merge-38BDF8?style=for-the-badge)](https://github.com/dcastil/tailwind-merge)

Component conventions follow shadcn (`components.json`, base nova style, neutral base color), with class variance authority and tailwind merge driving variant based styling.

**Animation and interaction**

[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![anime.js](https://img.shields.io/badge/anime.js-FF6B6B?style=for-the-badge)](https://animejs.com)
[![Lenis](https://img.shields.io/badge/Lenis-1A1A1A?style=for-the-badge)](https://lenis.darkroom.engineering)
[![Embla Carousel](https://img.shields.io/badge/Embla%20Carousel-2F2F2F?style=for-the-badge)](https://www.embla-carousel.com)
[![Split Type](https://img.shields.io/badge/Split%20Type-4A4A4A?style=for-the-badge)](https://github.com/lukePeavey/SplitType)

GSAP with `@gsap/react` drives scroll and entrance animation, Lenis provides smooth scrolling, and Split Type powers text splitting effects. Framer Motion, anime.js, and Embla Carousel (with its autoplay plugin) cover interaction and carousel needs.

**Tooling**

[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io)
[![Husky](https://img.shields.io/badge/Husky-42B883?style=for-the-badge&logo=husky&logoColor=white)](https://typicode.github.io/husky)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io)
[![Testing Library](https://img.shields.io/badge/Testing%20Library-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white)](https://testing-library.com)
[![Sharp](https://img.shields.io/badge/Sharp-99CC00?style=for-the-badge)](https://sharp.pixelplumbing.com)
[![ffmpeg](https://img.shields.io/badge/ffmpeg-007808?style=for-the-badge&logo=ffmpeg&logoColor=white)](https://ffmpeg.org)

ESLint and Prettier enforce code quality, Husky and `lint-staged` run them on every commit, Jest with Testing Library covers automated tests, and Sharp with `ffmpeg-static` power the asset optimization scripts.

## Features

- Static export architecture suited to inexpensive FTP hosting, with a pinned build ID so unchanged files are skipped on redeploy.
- Content driven pages: products, services, directors, timeline, and news are sourced from typed modules in `data/`, keeping page components declarative.
- Route groups under `app/(site)` for the marketing shell, with dedicated routes for about, careers, contact, products (chequered plate, pipes, plain sheets, sheet, shutter, shutter accessories), services (applications, Fabrica), and terms.
- Custom scroll and reveal animation system built on GSAP, Lenis, and Split Type, wrapped in reusable providers (`GSAPProvider`, `LenisProvider`) and components (`DrawSVGSection`, `SplitTextReveal`).
- Reusable glass surface and glow UI primitives (`GlassSurface`, `CardGlow`, `BorderGlow`) layered on top of shadcn style base components.
- Structured SEO helpers under `lib/seo`, plus `sitemap.ts` and `robots.ts` route handlers.
- Contact form wired to a configurable external endpoint via environment variable.
- Image and video optimization scripts (`scripts/optimize-images.mjs`, `scripts/compress-hero-video.mjs`) to keep static assets lean before deploy.
- A site wide developer easter egg (`components/layout/EasterEgg.tsx`): pressing `Alt + Shift + L + K` on any page opens the developer's site in a new tab.

## Project Structure

```
app/(site)/          Route groups for the public site: about, careers, contact,
                      products, services, terms
app/news/             News section routes
components/animations Scroll and text reveal animation providers and helpers
components/layout      Header, footer, and shell layout components
components/preloader   Initial load experience
components/sections    Page level sections (hero, timeline, CSR, network, etc.)
components/svg         Inline SVG assets used as components
components/ui          Base UI primitives (buttons, glass surfaces, glow effects)
data/                  Typed content modules: directors, news, products, services,
                      timeline
lib/                   Shared utilities: GSAP setup, Lenis setup, SEO helpers,
                      home return logic
public/                Static assets: images, video, SVGs
scripts/               Node scripts for image and video asset optimization
__tests__/             Jest test suites for components and library code
docs/                  Internal design and content reference notes
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 20.x or later
- npm (the project is committed with `package-lock.json`)

### Installation

Clone the repository and install dependencies.

```bash
git clone <repository-url>
cd website+
npm install
```

### Development

Start the local development server.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser to view the site. Pages under `app/(site)` and `app/news` hot reload as files change.

## Available Scripts

| Script                    | Description                                                               |
| ------------------------- | ------------------------------------------------------------------------- |
| `npm run dev`             | Start the Next.js development server.                                     |
| `npm run build`           | Produce a static export in `out/`.                                        |
| `npm run start`           | Serve the production build (Next.js server mode, for local verification). |
| `npm run lint`            | Run ESLint across the project.                                            |
| `npm run typecheck`       | Run the TypeScript compiler in no emit mode.                              |
| `npm run format`          | Run Prettier across the project and write changes.                        |
| `npm run test`            | Run the Jest test suite.                                                  |
| `npm run images:optimize` | Optimize images in `public/` using Sharp.                                 |
| `npm run video:compress`  | Compress the hero video using ffmpeg.                                     |

## Environment Variables

| Variable                       | Purpose                                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | External endpoint the contact form submits enquiries to. Required at build time; injected as a GitHub Actions secret in CI. |

Create a `.env.local` file at the project root for local development:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://example.com/api/contact
```

## Testing

Tests are written with Jest, `@testing-library/react`, and a jsdom environment, configured in `jest.config.ts` and `jest.setup.ts`. Suites live under `__tests__/components` and `__tests__/lib`, alongside a baseline `smoke.test.ts`.

Run the full suite:

```bash
npm run test
```

## Deployment

The site is deployed as static output rather than a hosted Node.js application.

1. `next.config.ts` sets `output: 'export'` and `trailingSlash: true`, and pins `generateBuildId` to a constant value so unchanged files hash identically between builds, keeping FTP uploads incremental.
2. On every push to `main`, `.github/workflows/deploy.yml` installs dependencies, restores the Next.js build cache, runs `npm run build`, and uploads the resulting `out/` directory to the production FTP host using `SamKirkland/FTP-Deploy-Action`.
3. `hero.webm` is excluded from the FTP sync step to avoid repeatedly re-uploading a large static video asset.

To produce the same static output locally:

```bash
npm run build
```

The exportable site will be written to `out/`.

## Contributing

This is an internal, client owned codebase. If you are contributing:

1. Create a feature branch from `main`.
2. Keep content changes in `data/` where possible rather than hardcoding copy into components.
3. Run `npm run lint`, `npm run typecheck`, and `npm run test` before opening a pull request; the pre commit hook (Husky plus lint staged) will also run ESLint and Prettier automatically on staged files.
4. Keep commits scoped and descriptive, following the existing history's conventional style (for example `feat:`, `fix:`, `chore:`, `perf:`, `style:`).

## Credits

Built and maintained by TSA Media Pvt. Ltd. for Anil Balaji Steel. The project was originally scaffolded with `create-next-app` and has since been substantially customized for the company's brand, content, and static hosting requirements.

## License

This project is proprietary and confidential to Anil Balaji Steel and TSA Media Pvt. Ltd. All rights reserved. No license is granted for reuse, redistribution, or modification without written permission from the copyright holders.
