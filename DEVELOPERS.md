# Developer Guide

Welcome! This guide will help you set up your development environment to work on **zatsit Sustainability Websites**.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Available Commands](#available-commands)
- [Code Conventions](#code-conventions)
- [Testing](#testing)
- [Debugging](#debugging)
- [Deployment](#deployment)

## 🔧 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18.x or higher) - [Download](https://nodejs.org/)
- **npm** (version 9.x or higher) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- A code editor (VS Code, WebStorm, etc.)

### Verify Versions

```bash
node --version   # v18.x.x or higher
npm --version    # 9.x.x or higher
git --version    # git version 2.x.x or higher
```

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/zatsit/zats-sustainability-websites.git
cd zats-sustainability-websites
```

### 2. Install Dependencies

**Per Project:**
Each project in the monorepo has its own dependencies. Check each project's README for more information.

```bash
cd greenscore-landing
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in each project if needed:

```bash
cd greenscore-landing
cp .env.example .env.local  # If it exists
```

## 🏗️ Project Structure

This project is a **monorepo** with the following structure:

```
zats-sustainability-websites/
├── .github/                    # GitHub Actions workflows
├── greenscore-landing/         # GreenScore project (Astro)
│   ├── src/
│   │   ├── components/        # Astro components
│   │   ├── layouts/           # Layouts
│   │   ├── pages/             # Pages (automatic routing)
│   │   ├── assets/            # Static resources
│   │   └── styles/            # CSS stylesheets
│   ├── public/                # Public files
│   ├── package.json
│   ├── astro.config.mjs       # Astro configuration
│   └── README.md
├── CONTRIBUTING.md            # Contributing guide
├── DEVELOPERS.md              # This file
├── CODE_OF_CONDUCT.md         # Code of conduct
└── README.md                  # Main documentation
```

## 📝 Code Conventions

### General

- **Language**: Code comments and documentation should be in **English**
- **Formatting**: The project uses **Prettier** for automatic formatting
- **Linting**: Follow the project's ESLint rules

### Naming

- **Files**: kebab-case for files (e.g., `my-component.astro`)
- **Variables/Functions**: camelCase (e.g., `myFunction`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_SIZE`)
- **Classes/Components**: PascalCase (e.g., `MyComponent`)

### Commits

Use the **Conventional Commits** format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Allowed scopes:** 
- `greenscore` : any changes related to the GreenScore landing project
- `README/CONTRIBUTING/DEVELOPERS`: common changes that concern the *documentation* files


**Allowed types:**
- `feat:` - A new feature
- `fix:` - A bugfix
- `docs:` - Documentation changes
- `style:` - Formatting changes (no functional impact)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or modifying tests
- `chore:` - Build, dependency changes, etc.

**Examples:**
```bash
git commit -m "feat(greenscore): add chart component"
git commit -m "fix(greenscore): fix footer responsive layout"
git commit -m "docs: update deployment guide"
```

## 🚀 Deployment

Automatic deployments are handled via **GitHub Actions** (see `.github/workflows/`).

## 💡 Tips and Best Practices

1. **Create a branch per feature** - Avoid long-running feature branches
2. **Commit regularly** - With clear messages
3. **Test before pushing** - Verify everything works locally
4. **Update documentation** - Keep READMEs current
5. **Respect the Code of Conduct** - Be respectful with other contributors

## 📚 Useful Resources

- **[Astro Documentation](https://docs.astro.build/)** - Main framework
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework
- **[MDN Web Docs](https://developer.mozilla.org/)** - Web references
- **[Contributing Guide](./CONTRIBUTING.md)** - Contribution guidelines

## Need Help?

- Check the **[CONTRIBUTING.md](./CONTRIBUTING.md)** for contribution guidelines
- Read the **[Code of Conduct](./CODE_OF_CONDUCT.md)**
- Open a **discussion issue**

---

**Happy Coding! 🎉**

