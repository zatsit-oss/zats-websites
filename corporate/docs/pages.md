# Pages & Components

Documentation of all pages and components on the **zatsit** website.

---

## Global Components

These components appear on every page.

### Header (`src/components/Header.astro`)

**Purpose**: Main navigation and brand identity.

**Elements**:
- Logo (links to homepage)
- Navigation, in order. An entry whose page is disabled through `DISABLED_PAGES` disappears, and a menu left with no card disappears with it:
  - Accueil → `/`
  - Offres (mega menu): Nos offres → `/offres/`, Manifesto → `/manifeste/`, Nos formations → `/formations/`, Travaillons ensemble → `/work-with-us/`
  - Le collectif (mega menu): Qui nous sommes → `/team/`, Ce que nous partageons → `/contributions/`
  - Rejoins-nous (mega menu): Ton package → `/join-us/`, Carrière → `/careers/`, Postuler → `/apply/`
- A menu with four cards lays them out as a 2 x 2 block, up to three sit on one row
- Ecosystem icons, always visible: blog, sustainability portal, LinkedIn, GitHub, mail
- Theme toggle (light/dark)
- Mobile menu (hamburger)

**Behavior**:
- Sticky on scroll
- Glass effect background
- Mobile menu toggles on button click

---

### Footer (`src/components/Footer.astro`)

**Purpose**: Secondary navigation, contact info, and legal links.

**Sections**:

1. **Mission** (left, 2 columns)
   - Zatsit logo
   - Mission statement
   - EcoVadis Silver badge

2. **Contact**
   - Email: contact@zatsit.fr
   - Address: Euratechnopole, Lille

3. **Social Links**
   - Blog
   - GitHub
   - LinkedIn
   - Twitter/X
   - Welcome to the Jungle

4. **Copyright Bar**
   - Copyright with current year
   - Legal notice link → `/legal-notice`
   - Privacy policy link → `/privacy-policy`

---

## Homepage (`src/pages/index.astro`)

**URL**: `/`

**Purpose**: Present Zatsit's mission, values, services, and calls-to-action for clients and consultants.

### Sections (in order):

#### 1. Hero (`src/components/sections/Hero.astro`)

**Purpose**: Immediate impact statement.

**Content**:
- Main headline: "La tech au service de l'**impact** des entreprises."
- Decorative gradient blobs in background

**No CTA** - lets the message breathe.

---

#### 2. Impact Sociétal (`src/components/sections/ImpactSocietal.astro`)

**Purpose**: Highlight social responsibility and open source initiatives.

**Key messages**:
- Investment in associations and charities
- Transparent and shared governance
- Open source initiatives on GitHub

**CTA**: Link to GitHub

---

#### 3. Impact Environnemental (`src/components/sections/ImpactEnvironmental.astro`)

**Purpose**: Highlight eco-responsibility commitments.

**Key messages**:
- Eco-designed websites
- Optimized development for minimal environmental impact
- Partners: Framework, Ekip, BCorp orientation

**Elements**:
- Partner badges (Framework, Ekip, BCorp)
- Link to blog for green computing articles

---

#### 4. Consultants (`src/components/sections/Consultants.astro`)

**Purpose**: Attract potential consultants by explaining the Zatsit model.

**Key messages**:
- Choose your status (employee, freelance, portage)
- Valued contributions
- Shared governance
- Drive initiatives
- Collective expertise

**CTA**: "Découvre ton futur package" → `/careers`

---

#### 5. Clients (`src/components/sections/Clients.astro`)

**Purpose**: Attract potential clients by positioning Zatsit as a strategic partner.

**Key messages**:
- Experience and technology expertise
- Strategic partner for tech challenges
- Passionate and experienced consultants

**CTA**: "Rejoins-nous" → `/join-us/`

---

#### 6. Services (`src/components/sections/Services.astro`)

**Purpose**: Showcase Zatsit's service offerings.

**Services** (6 cards):

| Service | Icon | Technologies |
|---------|------|--------------|
| Artisans du code | code-bracket | Java, .NET, Rust, JS, TS, Spring |
| Excellence mobile | device-mobile | Flutter, Android, iOS |
| Déploiements automatisés | rocket | GitHub Actions, Helm, Terraform, Ansible |
| (Cloud) Architectures | cloud | OpenAPI, C4Model, Diagram-as-code |
| Conseil et expertise | briefcase | Audit, Workshops, CTO as a Service |
| Formations | academic-cap | BBL, Formations, Open Source |

Each card includes:
- Icon
- Title
- Description
- Technology tags
- Hashtags

---

## Secondary Pages

### Team (`src/pages/team.astro`)

**URL**: `/team/`, labelled "Qui nous sommes" in the header

**Content**: pillars, photo carousel, contract types and shared governance, video interviews ("Paroles de Zat's"), then "Nos événements": one entry per event (`src/content/events/events.json`) with a scroll-snap photo strip, no script, keyboard-scrollable once focused.

---

### Contributions (`src/pages/contributions.astro`)

**URL**: `/contributions/`, labelled "Ce que nous partageons" in the header

**Data**: `src/content/contributions/contributions.json`

**Content**:
- Two anchor buttons, "Sur scène" and "Open source"
- Both sections show their cards on one row that slides horizontally (scroll-snap, keyboard-scrollable once focused). Prev/next buttons above the row, revealed by a small script only when the row overflows, disabled at each end; a thin visible scrollbar as a second cue
- Above the talks, an invite to have a talk given at the visitor's company, linking to `/work-with-us/` (hidden when that page is disabled)
- **Sur scène**: talks, most recent first. A talk given several times is one card, its other editions listed in `alsoGivenAt`. A talk dated `YYYY-MM-DD` after the build day carries an "À venir" badge.
- **Open source**: projects, the card linking to the live tool when there is one, with a separate "Code source" link

---

### Formations (`src/pages/formations.astro`)

**URL**: `/formations/`, labelled "Nos formations" in the "Offres" menu

**Data**: `src/content/trainings/trainings.json`

**Content**: a "Demander une formation" button in the hero, then one wide card per training (programme, formats, "À venir" badge when `upcoming`), then a single CTA to `/work-with-us/`. A training whose visual exists in two palettes sets `thumbnailDark`, and the page shows the one matching the theme.

---

### Join Us (`src/pages/join-us.astro`)

**URL**: `/join-us`

**Purpose**: Contact page for potential clients.

**Content**:
- Headline: "Rejoins-nous"
- Brief invitation to discuss projects
- CTA: Email link to contact@zatsit.fr

---

### Careers (`src/pages/careers.astro`)

**URL**: `/careers`

**Purpose**: Redirect to job offers.

**Content**:
- Headline: "Nos offres d'emploi"
- Invitation to join the collective
- CTA: Link to Welcome to the Jungle

---

### Find Us (`src/pages/find-us.astro`)

**URL**: `/find-us`

**Purpose**: Location and contact information.

**Content**:
- Address card (Euratechnopole, Lille)
- Contact card (email)

---

### Legal Notice (`src/pages/legal-notice.astro`)

**URL**: `/legal-notice`

**Purpose**: Legal requirements (mentions légales).

**Sections**:
- Site editor info
- Contact
- Hosting (Firebase)
- Intellectual property

---

### Privacy Policy (`src/pages/privacy-policy.astro`)

**URL**: `/privacy-policy`

**Purpose**: GDPR compliance.

**Sections**:
- Data collection (none, except theme preference)
- Email contact handling
- User rights (GDPR)
- Hosting information
