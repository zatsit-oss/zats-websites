# ADR 0001: the Website Carbon badge loads when the footer comes into view

Date: 2026-10-08. Status: accepted.

## Context

The footer carries a Website Carbon badge. Its script (self-hosted, 1.9 kB) calls `https://api.websitecarbon.com/b?url=<page>` and prints the page's CO2 per view. It is the **only third-party request** the corporate site makes, on a site whose pages argue for eco-design and whose rules forbid external scripts and tracking.

The badge does cache, but in the visitor's browser: `localStorage`, one entry per URL, refreshed after 24 hours. So every first visit of every page on every device makes one call. The API has nothing to cache on its side; the script decides to call.

The eco review of 2026-10-08 (page weights brought from 500 to 1 600 kB down to 160 to 740 kB) left this call as the last external dependency, and asked what to do with it.

## Options considered

### 1. Measure after deployment, from the publish workflow

Once production is live, the publish workflow calls the API for every page, writes the figures to a small JSON file, and the next build prints them with their date ("0,04 g CO2 per view, measured on 8 October"). No call from the visitor's browser, no runtime script, a strict `connect-src` becomes possible.

Cost: the figure is always one deployment behind, which the date would say. A new page has no figure until the next deployment. Previews would show production's figures, which is wrong, or nothing. It also adds a step and a secret-free API dependency to CI.

Measuring **at build time** instead was ruled out outright: the new version is not online yet, so the API would measure the previous one, and a preview would measure production.

### 2. Compute our own estimate at build time

Website Carbon's model is public (Sustainable Web Design: bytes transferred times a carbon intensity). The build knows each page's weight, compression aside, so it could print its own estimate, exact for the version being deployed, with the formula linked. No third party at all, and it fits "nous mesurons ce que nous livrons".

Cost: the figure is ours, not Website Carbon's; the badge and its recognition disappear; the model's constants have to be kept in step with the published method; the number would be an estimate labelled as such.

### 3. Keep the badge, load it only when the footer is visible

The live measurement stays, with its label and its 24-hour browser cache. The script is imported dynamically from an `IntersectionObserver` on the badge, so a visitor who never scrolls to the footer triggers no third-party request at all; one who does gets the real figure for the page as served.

Cost: the external call remains for visitors who reach the footer, and `connect-src` keeps `api.websitecarbon.com`. On client-side navigations (`ClientRouter`) the badge script, as before, runs only on the first full page load.

## Decision

**Option 3.** The badge tells the truth about the page as served, which neither build-time nor post-deployment measurement does, and the call is small, cached a day per browser and now avoided by everyone who does not reach the footer. Options 1 and 2 are kept here as the paths to take if the third-party call ever has to go entirely, for instance for a strict CSP.

## Consequences

- `Footer.astro` loads `website-carbon-badges/b.min.js` through a dynamic import inside an `IntersectionObserver` (200 px margin), on first load and on every `astro:page-load`.
- The CSP keeps `connect-src https://api.websitecarbon.com` (see `production-serving.md`).
- The eco review counts one external request per page at most, and none above the fold.
