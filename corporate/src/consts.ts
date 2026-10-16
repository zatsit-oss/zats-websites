// Site-level constants for the corporate website.

/**
 * The brand, in the one spelling used across the estate: **lowercase**.
 *
 * It was `Zatsit` in the title suffix and in `og:site_name`, while the blog,
 * the schema, this repository and the brand itself all say `zatsit`. A model
 * reconciling two spellings of one company across three sites is being handed
 * avoidable doubt, so there is one spelling now.
 */
export const SITE_TITLE = 'zatsit';

/**
 * Home page title, which cannot be the brand alone, and could not stay
 * `Accueil`: that named a navigation item and a brand, and no subject.
 *
 * 54 characters, inside the 50 to 60 a result page shows without cutting. It
 * already contains the brand, which is what stops BaseHead appending it twice.
 * The wording is the company tagline, so it says the same thing as the hero.
 */
export const HOME_TITLE = "zatsit, livrer avec l'IA sans perdre la main";

/**
 * 142 characters, inside the 120 to 160 a result page shows without cutting.
 */
export const SITE_DESCRIPTION =
  "zatsit, un collectif d'ingénieurs expérimentés à Lille, installe l'IA dans vos équipes de développement, du besoin jusqu'à la mesure en production.";

export const SITE_LANG = 'fr';
export const SITE_INLANGUAGE = 'fr-FR';
export const SITE_LOCALE = 'fr_FR';

/**
 * Social card.
 *
 * The declared size is the file's real size, measured, not the 1200x630 this
 * used to claim: `og-image.png` is **775x630**. Announcing a width the file
 * does not have makes a platform reserve the wrong box and is the kind of
 * mismatch a share debugger reports.
 *
 * **The asset itself needs replacing, and that is a design task.** It is a logo
 * export, not a card: the wordmark is cropped at the bottom edge, the
 * background is fully transparent (so LinkedIn and Meta composite the blue mark
 * onto whatever they use, near-black in dark mode), and 775px is under the
 * 1200px minimum width `summary_large_image` wants at a 1.91:1 ratio. Target
 * 1200x630, opaque.
 */
export const SITE_OG_IMAGE = '/og-image.png';
export const SITE_OG_IMAGE_ALT =
  "zatsit, la tech augmentée au service de l'impact des entreprises";
export const SITE_OG_IMAGE_WIDTH = 775;
export const SITE_OG_IMAGE_HEIGHT = 630;

/** Organization logo, for the JSON-LD `Organization` node. */
export const SITE_LOGO = '/favicon.svg';

/**
 * How the footer prints it. The machine-readable version lives in
 * `@zatsit/components`, next to the other organisation facts, since both sites
 * declare the same one.
 */
export const ADDRESS_LINES = ['EURATECHNOPOLYS', '2 Allée de la Haye du Temple', '59160 Lille'];

/**
 * One line per page, for `/llms.txt`.
 *
 * These are **not** the meta descriptions and must not be kept in sync with
 * them: a description is written to be read under a search result, these say
 * what question the page answers so an agent can pick the right one. Each page
 * keeps its own `<Layout title description>` as the display source.
 *
 * Keyed by the slugs in `src/lib/pages.ts`, which is what decides whether a
 * page is built at all.
 */
export const PAGE_SUMMARIES: Record<string, { label: string; summary: string }> = {
  index: {
    label: 'Accueil',
    summary: "ce que fait zatsit, pour qui, et les convictions qui guident nos missions",
  },
  team: {
    label: 'Notre collectif',
    summary: 'le collectif zatsit : statuts, gouvernance partagée et interviews vidéo des consultants',
  },
  contributions: {
    label: 'Ce que nous partageons',
    summary: 'les conférences où les consultants de zatsit ont pris la parole, les projets open source que nous maintenons et les portails de veille que nous partageons',
  },
  trainings: {
    label: 'Nos formations',
    summary: 'les formations au coding agentique et au Spec-Driven Development que donnent les consultants de zatsit, gratuites ou dans les locaux du client',
  },
  tech: {
    label: 'Notre expertise tech',
    summary:
      "les technologies et les méthodes que nous pratiquons : Java, Node.js, Vue.js, Kubernetes, DDD, contract-first, architecture hexagonale",
  },
  careers: {
    label: 'Carrière',
    summary: 'les rôles chez zatsit (Forward Deployed Engineer, Product Engineer, Tech Lead Agentic, Augmented Engineer, Platform Engineer) et notre façon de travailler augmentée par l’IA',
  },
  offers: {
    label: 'Nos offres',
    summary: "les offres de zatsit : quatre Enablers AI (audit maturité IA, pilote spec-driven, désendettement du code existant, dev augmenté en équipe) posés sur deux métiers historiques (le conseil par les associés, l'ingénieur·e augmenté·e en renfort), ce qui est mesuré et ce que zatsit refuse de promettre",
  },
  glossary: {
    label: 'Lexique',
    summary: "les termes du métier de zatsit définis en une phrase : Spec-Driven Development, Context Engineering, Harness Engineering, orchestration d'agents, vibe-coding, éco-conception",
  },
  manifesto: {
    label: 'Manifeste',
    summary: 'la conviction derrière nos offres : une ingénierie sobre parce que bien architecturée',
  },
  'join-us': {
    label: 'Ton futur package',
    summary: "ce que zatsit propose à celles et ceux qui nous rejoignent : rémunération, avantages, équipement",
  },
  'work-with-us': {
    label: 'Travaillons ensemble',
    summary: 'le formulaire de contact pour nous parler d’un projet',
  },
  apply: {
    label: 'Postuler',
    summary: 'le formulaire pour nous envoyer une candidature',
  },
  'find-us': {
    label: 'Nous trouver',
    summary: "l'adresse des bureaux, à Euratechnopolys à Lille, et comment y accéder",
  },
  'legal-notice': {
    label: 'Mentions légales',
    summary: "l'éditeur du site, l'hébergeur et les mentions obligatoires",
  },
  'privacy-policy': {
    label: 'Politique de confidentialité',
    summary: 'les données que ce site traite, et celles qu’il ne traite pas',
  },
};
