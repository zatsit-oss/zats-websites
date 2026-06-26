# Zatsit Websites

This is a monorepo hosting all websites and landing pages for **Zatsit's web projects**.

## 🚀 Projects

The following projects are hosted in this repository:

- **[Corporate](./corporate/README.md)** — Institutional website of zatsit (zatsit.fr). Astro 5 + Tailwind 4 + TypeScript.
- **[Sustainability Portal](./sustainability-portal/README.md)** — Sustainability portal hosting landings and static pages (e.g. Landscape). Astro 5 + Tailwind 3 + TypeScript.
- **[Components Library](./components/README.md)** — Reusable Astro components shared by the sustainability portal.

## 📁 Documentation Files

Before contributing, please read the following documentation:

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** — Guidelines for contributing to the project
- **[DEVELOPERS.md](./DEVELOPERS.md)** — Developer setup and development guide
- **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** — Community standards and behavior expectations

## 🛠 Project Structure

This repository uses a monorepo structure to manage multiple related websites:

```text
/
├── .github/                # Shared GitHub Actions workflows and custom actions
├── components/             # Reusable Astro components library
├── corporate/              # Corporate website (zatsit.fr)
├── sustainability-portal/  # Sustainability portal project
├── CONTRIBUTING.md         # Contributing guidelines
├── DEVELOPERS.md           # Developer guide
├── CODE_OF_CONDUCT.md      # Code of conduct
└── README.md               # Root documentation (this file)
```

## 🧞 Getting Started

Each project is independent and has its own `README.md` with specific installation and development instructions.

1. **Read the documentation**: Check out [DEVELOPERS.md](./DEVELOPERS.md) to set up your environment
2. Navigate to the project directory:
   ```bash
   cd corporate                  # or sustainability-portal
   ```
3. Follow the instructions in the project's `README.md`.

---

**zatsit** — Promoting a more sustainable web.
