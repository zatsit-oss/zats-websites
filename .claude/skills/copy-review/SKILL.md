---
name: copy-review
description: Challenge the French user-facing copy of a page (headlines, pitches, CTAs) with three parallel adversarial reviewers, then return per-line verdicts and rewrites. Use when the user asks to review, challenge or proofread website copy, or before shipping a page whose text was written or rewritten.
argument-hint: <page or content file path(s)>
---

Challenge the copy of the target given in the arguments (an `.astro` page, a component, or a JSON file under `src/content/`). If no target is given, use the user-facing text changed in the working tree (`git diff`).

The goal is not proofreading. It is to find the lines a sharp reader would roll their eyes at, and to replace them with lines that only zatsit could have written.

## 1. Collect the copy

Extract every user-facing French string from the target, **including the data it renders** (follow `getEntry(...)` to the JSON in `src/content/`, and the `title` / `description` passed to `Layout`). Keep each string with its location (`file:line`) and its role on the page (h1, subtitle, section title, card, CTA, meta description).

Also gather the ground truth the copy may claim from: `corporate/src/content/*.json`, `corporate/src/consts.ts`, and the text of the other pages. That is the only source of facts.

## 2. Run three reviewers in parallel

Launch three subagents in a single message with the Agent tool. Give each the full extracted copy with locations, the page's purpose, and its own brief below. Each returns a list of findings: `location`, `quote`, `verdict` (keep / rewrite / cut), `why` (one sentence), and for rewrites **two alternatives**.

### The sceptical senior candidate

A developer with 10+ years of experience, solicited every week by recruiters, who reads career pages to spot bullshit. Flags:
- lines that could appear on any company's site (swap test: replace "zatsit" with a competitor's name, does it still work?)
- recruiter or HR clichés: "passionnés", "bienveillance", "challenges", "fais le meilleur travail de ta carrière", "rejoins l'aventure", "à taille humaine", "esprit d'équipe"
- vague promises with no proof next to them
- anything that sounds written by a marketing team or by an AI, not by engineers
Then says, for the page as a whole, whether they would apply and what would make them.

### The brand guardian

Checks the copy against the house rules:
- **zatsit** is tech-first: passionate dev / ops / architects who like systems done right. Eco-design and frugal AI are consequences of engineering rigour, never the headline and never a moral posture.
- "Dev augmenté" is a credo (spec-driven, scoped contexts, model chosen per task, measured), not a buzzword.
- French copy uses **"nous"**, never the impersonal "on", conjugated properly ("nous mesurons", not "on mesure").
- **No em dash `—` and no en dash `–`**, anywhere. Use a comma, a colon, parentheses or two sentences.
- Brand spelling: **zatsit** lowercase in text, Zatsit in titles and logo.
- Candidate-facing copy uses "tu"; client-facing copy uses "vous". Flag any mix on the same page.
- No manifesto clichés ("le grand soir", "non négociables", "nous croyons que").
- Grounded, technical, lucid tone. Short sentences beat clever ones.

### The fact checker

Checks every factual claim (figures, practices, technologies, benefits, commitments) against the ground truth collected in step 1. Each claim is **sourced** (`file:line`), **unsourced** (plausible but appears nowhere: the user must confirm it) or **contradicted**. Pay special attention to commitments the company would have to honour ("nous lisons toutes les candidatures", "en quelques semaines", "100 %"). Never accept a claim because it sounds right.

## 3. Report

Merge the three lists, deduplicate findings on the same line, and rank them: contradicted facts first, then brand-rule violations, then clichés, then the rest. Present to the user in French, concisely:

1. The candidate's verdict on the page, in two sentences.
2. A table: location, current text, problem, proposed rewrite (the best of the alternatives).
3. The unsourced claims the user must confirm or remove.

**Do not edit any file.** The user picks which rewrites to apply; apply only those, afterwards, when asked.
