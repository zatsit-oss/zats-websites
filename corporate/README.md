# Zatsit Website

Official website of **zatsit** - Tech at the service of companies' impact.

## 📝 Description

This project is the official Zatsit website, showcasing our services, expertise, and values in responsible digital transformation.

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) v5
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Language**: TypeScript
- **Deployment**: Firebase Hosting

## 📋 Prerequisites

- Node.js v20+
- npm v10+

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/zatsit-oss/zatsit-website.git
cd zatsit-website

# Install dependencies
npm install
```

## ⚡ Commands

| Command           | Action                                          |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Starts dev server on `localhost:4321`           |
| `npm run build`   | Builds the site for production in `./dist/`     |
| `npm run preview` | Previews the build locally before deployment    |

## 📁 Project Structure

```
/
├── public/              # Static assets (favicon, images...)
├── src/
│   ├── assets/          # SVG icons and images
│   │   └── icons/
│   ├── components/      # Reusable Astro components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── ThemeToggle.astro
│   ├── layouts/         # Page layouts
│   │   └── Layout.astro
│   ├── pages/           # Site pages (automatic routing)
│   │   └── index.astro
│   └── styles/          # Global styles
│       └── global.css
├── astro.config.mjs     # Astro configuration
├── tsconfig.json        # TypeScript configuration
└── package.json
```

## ✨ Features

- Responsive design (mobile-first)
- Light/dark theme with localStorage persistence
- Eco-design (minimal JavaScript, optimized CSS)
- Accessibility (ARIA labels, keyboard navigation)
- Typed environment variables

## 🔐 Environment Variables

Environment variables are defined in `astro.config.mjs` with default values:

- `SITE_URL`: Main site URL
- `BLOG_URL`: Blog URL
- `LINKEDIN_URL`: LinkedIn page URL
- `GITHUB_URL`: GitHub organization URL

## 🤝 Contributing

1. Fork the project
2. Create a branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## 📄 License

Copyright (c) 2025 Zatsit. All rights reserved.
