# Zatsit Website

Official website of **zatsit** — Tech at the service of companies' impact.

## Description

Corporate website of Zatsit, showcasing our services, expertise, team, and commitments to responsible digital transformation.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v5
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Language**: TypeScript
- **Font**: Poppins (self-hosted via `@fontsource/poppins`)
- **Deployment**: Firebase Hosting

## Prerequisites

- Node.js v20+
- npm v10+

## Installation

```bash
# From the monorepo root
cd corporate

# Install dependencies
npm install
```

## Commands

| Command           | Action                                          |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Starts dev server on `localhost:4321`            |
| `npm run build`   | Builds the site for production in `./dist/`      |
| `npm run preview` | Previews the build locally before deployment     |

## Project Structure

```
corporate/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── partners/        # Partner/client logos
│       ├── team/            # Team photos
│       └── technologies/    # Technology logos
├── src/
│   ├── assets/
│   │   └── icons/           # SVG icons imported as components
│   ├── components/
│   │   ├── sections/        # Page sections
│   │   │   ├── Hero.astro
│   │   │   ├── Services.astro
│   │   │   ├── Consultants.astro
│   │   │   ├── Clients.astro
│   │   │   ├── ImpactEnvironmental.astro
│   │   │   └── ImpactSocietal.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Logo.astro
│   │   ├── ThemeToggle.astro
│   │   ├── TechTag.astro
│   │   └── LegalPageLayout.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro          # Home
│   │   ├── join-us.astro        # Join us
│   │   ├── team.astro           # Team
│   │   ├── careers.astro        # Careers
│   │   ├── tech.astro           # Technologies
│   │   ├── find-us.astro        # Find us
│   │   ├── legal-notice.astro   # Legal notice
│   │   └── privacy-policy.astro # Privacy policy
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Features

- Responsive design (mobile-first)
- Light/dark theme with localStorage persistence
- Eco-design (minimal JavaScript, optimized CSS, self-hosted fonts)
- Accessibility (ARIA labels, keyboard navigation, WCAG AA contrast)
- Typed environment variables

## Environment Variables

Defined in `astro.config.mjs` with default values:

- `SITE_URL`: Main site URL
- `BLOG_URL`: Blog URL
- `LINKEDIN_URL`: LinkedIn page URL
- `GITHUB_URL`: GitHub organization URL

## Contributing

1. Create a branch (`git checkout -b feat/corporate/my-feature`)
2. Commit your changes (`git commit -m "feat(corporate): add my feature"`)
3. Push to the branch (`git push origin feat/corporate/my-feature`)
4. Open a Pull Request

## License

Copyright (c) 2025 Zatsit. All rights reserved.
