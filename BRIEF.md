# TypeToDeploy — Pépite Presentation Website — BRIEF

> This file is the single source of truth for **why** things are the way they are.
> `website_design/` is the single source of truth for **what the pages look like**.
> Claude Code must read this file at the start of every session.

---

## 0.0 Where everything lives

Claude Code is started from a parent directory containing two sibling repositories:

```
<parent>/
├── CLAUDE.md                  ← boundary rules, read first
├── taras-and-lisa/            ← PRODUCT repo. READ-ONLY. The Telegram bot writes here.
└── typetodeploy-site/         ← THIS project. All work happens here.
    ├── BRIEF.md               ← this file
    └── website_design/        ← finished design, produced in Claude Design
        ├── *.html             ← 10 design files (see §2.4)
        └── images/            ← every screenshot, the QR code, the video
```

**Absolute rule:** never create, edit, move, or delete anything inside `taras-and-lisa/`. It is production and a live bot commits to it. Read it only when a phase explicitly asks.

**`website_design/` is committed and must never be deleted.** It is the design record. Astro only builds `src/` and `public/`, so it is automatically excluded from the site output — leave it where it is.

---

## 0. Context

**Goal:** a small, fast, credible website that lets a French jury (PeeL / PEPITE Université de Lorraine) understand the project TypeToDeploy in 30–60 seconds, and verify that it is real.

**Audience:** French academic + entrepreneurial jury. Pedagogical mission, not a VC. They evaluate the founder, the coherence of the project, the quality of the validation reasoning — not vanity metrics.

**Team (real, do not embellish):**
- **Lisa** — porteuse de projet. Coach and instructor (couples coaching, mountain guiding, snowboard, trail running, teen mentoring). She owns and runs the business whose website triggered the whole project. She is the primary French speaker and will present to the jury.
- **Taras** — associé technique. Four years of experience in software development and machine learning. Builds and operates the system.

**The origin story is the strongest asset and it is true:** Lisa had a professional website she could not update herself. Every change required Taras. TypeToDeploy was built to remove that dependency, and Lisa is its first and current user, on a real production site.

**Oral-defence constraint (drives the copy):** Lisa must be able to explain every sentence on this website out loud, in French, without a developer next to her. If a section cannot be defended by a non-developer, it is written wrong. Prefer plain French over technical vocabulary everywhere, including in the technical section.

**Hard rules:**
- French is the primary language. English is a secondary mirror.
- Never invent metrics, users, revenue, partnerships, traction, or capabilities.
- Every claim on the site must be either verifiable (link) or explicitly labelled as a hypothesis.
- The website is NOT the product. Do not build web-app features.

**Non-goals:** CMS, database, auth, backend, analytics dashboard, blog, newsletter, animations, dark mode toggle, cookie banner (no cookies = no banner needed).

---

## 1. Technical decisions (already made — do not re-litigate)

| Decision | Value | Reason |
|---|---|---|
| Design source | `website_design/*.html` (10 files) | Approved design already exists. Implementation is a port, not a redesign. See §2.4. |
| Component budget | ~8 files total: `Layout`, `Header`, `Footer`, `HomeBody`, `DemoBody`, `Badge`, `ScreenshotRow`, `StatusRow` | Every section appears exactly once per page. Splitting twelve sections into twelve components buys nothing and multiplies drift from the design. |
| Language handling | One markup body per page type, two dictionaries | FR and EN are the same layout. Two dictionaries, not two templates. |
| Repository | **New, separate public repo:** `taras-svystun/typetodeploy-site` | The bot commits to `taras-svystun/taras-and-lisa`. Isolation prevents the presentation site from being broken by the product. Public, because verifiability is the point. |
| Domain | `typetodeploy.taras-and-lisa.com` (subdomain of the existing Cloudflare zone) | Free, contains the product name, HTTPS handled automatically. |
| Existing Workers (do not touch) | `typetodeploy-bot`, `taras-and-lisa` | These are production. The new site is a third, independent Worker. |
| Framework | Astro 5, `output: 'static'` | Already known stack, zero client JS by default, fastest path. |
| Styling | Plain CSS with custom properties in one `global.css` | 2 pages. No UI framework needed. Fewer deps = fewer failure modes. |
| Client JS | None, except `<video>` native attributes | Language switch is a plain `<a>` link. |
| i18n | Astro built-in i18n routing, `defaultLocale: 'fr'`, `prefixDefaultLocale: false` | `/` = FR, `/en/` = EN. No middleware, no library. |
| Images | `astro:assets` `<Image />` for local images in `src/assets/` | Built in, auto WebP, auto width/height, no extra deps. |
| Video | `public/media/demo.mp4` + `public/media/demo-poster.jpg` | Not processed by the build. Served as-is. |
| Hosting | **Cloudflare Workers with static assets** | Cloudflare's current recommendation for new projects; Pages still works but new features land on Workers first. |
| CI/CD | Cloudflare Workers Builds (Git-connected) | Push to `main` → automatic build + deploy. |
| Fonts | Self-hosted via `@fontsource-variable/*` | Google Fonts CDN is a GDPR risk in the EU. Self-hosting is correct and is itself a competence signal. |

---

## 2. Design system

### 2.1 Direction

Sober French professional tech. Reference points: Qonto, Alan, Doctolib, Swile.
**Explicitly NOT:** the French State Design System (DSFR). Its use outside `.gouv.fr` is formally forbidden. Do not use `#000091`, the Marianne font, the tricolour block, or any state-identity element.

Borrow from institutional design only the *habits*: strong information hierarchy, factual tone, status tables, high contrast, visible focus states, real footer information.

### 2.2 Tokens

```css
:root {
  /* Colour */
  --ink:            #12161F;   /* primary text */
  --ink-muted:      #545C6B;   /* secondary text */
  --ink-faint:      #808896;   /* declared but NOT used in the built design:
                                  every caption/label was raised to --ink-muted
                                  to clear 4.5:1 on --surface-alt */
  --surface:        #FFFFFF;
  --surface-alt:    #F6F7F9;   /* alternating section background */
  --border:         #E1E5EA;
  --border-strong:  #C6CDD6;

  --accent:         #17406B;   /* deep ink blue — primary actions, links */
  --accent-hover:   #0F2E4E;
  --accent-soft:    #EAF0F7;   /* accent background wash */

  --status-done:    #15803D;   /* Fonctionnel / Testé */
  --status-doing:   #B45309;   /* En cours */
  --status-planned: #545C6B;   /* Phase 2 */
  --status-hypo:    #7C3AED;   /* Hypothèse à valider */

  /* Type */
  --font-display: "Source Serif 4 Variable", Georgia, serif;
  --font-body:    "Inter Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono:    ui-monospace, "SF Mono", Menlo, monospace;

  /* Scale (rem) */
  --step--2: 0.8125rem; /* 13px — found in the built design (row micro-labels), not in the original scale */
  --step--1: 0.875rem;
  --step--0-5: 0.9375rem; /* 15px — found in the built design (evidence-strip labels, screenshot captions); the single most-used size after --step-0 and --step--1 */
  --step-0:  1rem;
  --step-0-5: 1.0625rem; /* 17px — found in the built design (card sub-headings, e.g. team member names) */
  --step-1:  1.1875rem;
  --step-2:  1.5rem;
  --step-3:  2rem;
  --step-3-5: 2.125rem; /* 34px — found in the built design, mobile H1 only */
  --step-4:  2.75rem;   /* declared, but not used anywhere in the built design */
  --step-5:  3.5rem;   /* H1 desktop */

  /* Space (4px base) */
  --s-1: 0.25rem; --s-2: 0.5rem;  --s-3: 0.75rem; --s-4: 1rem;
  --s-6: 1.5rem;  --s-8: 2rem;    --s-12: 3rem;   --s-16: 4rem;
  --s-18: 4.5rem; /* 72px — found in the built design: the section-6–12 desktop padding described in §2.3, missing from the original scale */
  --s-24: 6rem;   --s-32: 8rem;

  /* Layout */
  --width-page: 1120px;
  --width-text: 68ch;
  --radius: 6px;
  --radius-sm: 4px; /* found in the built design: nested screenshot images inside a 6px-radius frame */
}
```

> **Confirmed 2026-08-22 — scale corrected to match the built design.** Phase 0 inventory found the
> ten design files consistently using several sizes absent from the original scale above
> (`0.8125rem`, `0.9375rem`, `1.0625rem`, `2.125rem`, a `72px` section-padding step, and a `4px`
> radius variant). Per §2.4 rule 1, the design wins — the scale above now includes them under
> `--step--2` / `--step--0-5` / `--step-0-5` / `--step-3-5` / `--s-18` / `--radius-sm`. `--step-4`
> (2.75rem) remains declared per the original spec but, like `--ink-faint`, is confirmed unused in
> the built design.

### 2.3 Rules

- **Serif for H1/H2 only.** Everything else is Inter. This is what makes it read "institutional but modern" instead of "SaaS template".
- **No shadows.** Cards = 1px `--border` + `--radius`. Flat.
- **Radius 6px.** Not pills, not 16px. Low radius reads serious.
- **One accent colour.** No gradients, no glassmorphism, no 3D, no blobs, no floating shapes.
- **Section rhythm:** alternate `--surface` / `--surface-alt`, with a 1px `--border` top rule on every section. Vertical padding, as built: **96px** for sections 1–5 (the "first 60 seconds" block), **72px** for sections 6–12, **64px** on mobile. The rhythm change at section 6 is deliberate: it tightens the depth material without shrinking the opening.
- **Line length:** body text capped at `--width-text`. Never full-bleed paragraphs.
- **Two widths only.** Every text element — paragraphs, leads, callout/inset blocks, closing notes — is capped at `--width-text` (68ch). Only grids and tables use the full `--width-page` (1120px). Do not introduce a third intermediate width (an inset at 760px was tried and removed: it produced a ragged right edge with no reason behind it).
- **Focus:** `outline: 2px solid var(--accent); outline-offset: 2px;` on every interactive element. Never `outline: none`.
- **Animation:** none, except `transition: background-color .15s` on buttons/links. Respect `prefers-reduced-motion`.
- **Icons:** avoid entirely, or use inline SVG numerals (1/2/3/4) for the "how it works" steps. No icon library.

### 2.4 The design files are the specification

`website_design/` contains the finished, approved design as static HTML: **four pages × two viewports (1440px and 375px), plus the one-pager.** Ten files in total. Every layout, spacing value, colour, type size, and every word of copy in both languages already exists there.

**Precedence, when two sources disagree:**

1. **`website_design/*.html`** — wins on anything visual or textual: layout, spacing, colours, type, wording, section order, labels.
2. **This BRIEF** — wins on anything structural or behavioural: routing, i18n strategy, accessibility rules, SEO, hosting, honesty constraints, what must not be invented.
3. If a genuine conflict exists that neither rule settles, **stop and ask**. Do not pick one silently.

**What this means for implementation:** the job is a **port**, not a design exercise. Claude Code reproduces what is in the design files inside Astro. It does not redesign, does not "improve", does not add sections, does not reorder, and does not rewrite copy. The BRIEF's copy sections (§5, §6) exist to explain intent and to catch drift — the authoritative wording is whatever is in the HTML.

**Desktop file + mobile file = one responsive page.** The two viewport files are not two sites. The desktop file gives the base styles; the mobile file gives the overrides. They must be merged into a single responsive stylesheet with media queries. Never ship two page templates for one page.

**Things in the design files that must be changed during the port** (design tools emit them; production must not keep them):

| In the design file | Replace with |
|---|---|
| Google Fonts `<link>` or `@import` | `@fontsource-variable/inter` and `@fontsource-variable/source-serif-4`, imported in the layout |
| Any CDN script or stylesheet | nothing — remove it |
| Hard-coded absolute widths on the page wrapper | `max-width: var(--width-page)` + fluid padding |
| Duplicated CSS across the ten files | one shared `src/styles/global.css` + Astro scoped `<style>` per page |
| Image paths pointing into `website_design/images/` | imports from `src/assets/` (screenshots) or `/media/` (video, poster, favicon, OG) |
| Literal text in the markup | a key in `src/i18n/fr.ts` / `en.ts` |

---

## 3. Sitemap

```
/                    → Homepage (FR)
/demonstration       → Demo page (FR)
/en/                 → Homepage (EN)
/en/demo             → Demo page (EN)
```

Four pages. Nothing else. No blog, no legal page (add `/mentions-legales` only if a real address is required).

**Header:** project name (left) + `Démonstration` link + `EN` / `FR` switch (right). Sticky is optional; static is fine.
**Footer:** contact email, GitHub link, link to the live site edited by the agent, `© 2026 TypeToDeploy`, language switch repeated.

**Design deliverables (the reference the implementation must match).** Eight HTML design files, four pages × two viewports: `Homepage FR`, `Homepage EN`, `Demo page FR`, `Demo page EN` at **1440px**, and the same four at **375px** (`… - Mobile`). Plus `One-pager FR` (section 13). The mobile files are the specification for the small breakpoint — full-width buttons with ~48px tap zones, tables as stacked labelled blocks, 64px section padding, 20px gutters — not a separate site.

---

## 4. Homepage structure (top → bottom)

| # | Section | Purpose for the jury | Answers |
|---|---|---|---|
| 1 | Hero | Understand in 5 s what this is | Q1, Q2 |
| 2 | Le problème | Why this matters | Q1 |
| 3 | La solution — 4 étapes | How it works | Q2 |
| 4 | Aperçu de la démonstration | Proof it's real | Q3 |
| 5 | État d'avancement (table) | What is actually built | Q3, Q4 |
| 6 | Le point technique central | Technical credibility | Q5 |
| 7 | Ce qui reste à valider | Founder maturity — **the section that wins** | Q4 |
| 8 | Phase 2 — feuille de route | Where it goes | Q6 |
| 9 | Impact visé | Why it's useful | Q5 |
| 10 | L'équipe | Who is behind it, and why them specifically | — |
| 11 | Ce que l'accompagnement apporterait | Direct answer to the jury | Q7 |
| 12 | Contact / liens | What to do next | Q8 |

Sections 1–5 must fit the "first 60 seconds" test. Everything after is depth for whoever wants it.

---

## 5. Copy — FRENCH (primary)

> Tone rules: concrete verbs, no superlatives, no "révolutionner", no "solution innovante", no "grâce à l'IA de pointe", no exclamation marks. Short sentences. If a sentence could appear in any startup deck, rewrite it.

### 5.1 Hero

- **Eyebrow (not a badge):** `Projet en développement — prototype fonctionnel en production`. Rendered as a 13px `--ink-muted` line preceded by a 24px `--accent` rule. A filled pill was tried and rejected: it reads as a startup badge and it competes with the H1.
- **H1:** `Mettre à jour son site web en envoyant un message.`
- **Lead:** `TypeToDeploy permet à une personne sans compétence technique de modifier le contenu d'un site web professionnel depuis une simple conversation Telegram. La modification est vérifiée automatiquement, enregistrée dans le code source, puis mise en ligne.`
- **CTA primaire:** `Voir la démonstration` → `/demonstration`
- **CTA secondaire:** `Voir le site piloté par l'agent` → external, live site
- **Evidence strip (replaces the grey sub-CTA line).** Three columns under the CTAs, each a 1px `--border-strong` top rule + a 15px label + a 14px `--ink-muted` line. This puts the proof above the fold instead of hiding it in a caption:
  - `Une utilisatrice` / `non technique, sur son propre site professionnel`
  - `Un site en production` / `en ligne, modifié par l’agent`
  - `Chaque modification` / `produit un commit vérifiable sur GitHub`

### 5.2 Le problème

**H2:** `Le problème`

```
Un site web moderne est rapide, bien référencé et peu coûteux à héberger, parce
qu'il est construit comme du code plutôt que dans un outil d'édition.

La contrepartie est directe : son propriétaire ne peut pas le modifier lui-même.
Changer un tarif, une date, un horaire ou une photo suppose de repasser par un
développeur.

Dans les faits, ces sites ne sont plus mis à jour. L'information devient fausse,
et le site cesse de remplir sa fonction.
```

Three short stat-free blocks. Do **not** add invented percentages.

**Immediately after, a bordered inset block (`--accent-soft` background), H3:**
`Ce projet vient d'un problème que nous avions`

```
Lisa est coach et formatrice. Son site présente son activité, ses prestations et
ses tarifs. Elle ne pouvait pas le modifier elle-même : chaque changement passait
par Taras.

Nous avons construit l'outil qui manquait. Lisa est aujourd'hui la première
utilisatrice de TypeToDeploy, sur un site réellement en ligne.
```

This block is the emotional and evidential anchor of the page. Keep it short. Do not dramatise it.

### 5.3 La solution

**H2:** `La solution`
**Lead:** `Aucune interface à apprendre, aucun compte à créer, aucun tableau de bord. L'outil se place dans un canal que la personne utilise déjà.`

| # | Titre | Texte |
|---|---|---|
| 1 | `Vous écrivez` | `Un message en langage courant : « change le tarif du cours collectif à 45 € ».` |
| 2 | `L'agent prépare la modification` | `Le modèle identifie le champ concerné dans le contenu du site et prépare la modification exacte à appliquer.` |
| 3 | `La modification est vérifiée` | `Un contrôle automatique compare le périmètre annoncé et la modification réellement produite. Toute modification hors périmètre est refusée avant tout enregistrement.` |
| 4 | `Le site est mis à jour` | `La modification est enregistrée dans le dépôt de code, le site est reconstruit et publié. Une confirmation est renvoyée dans la conversation.` |

Render as a simple 4-column grid (desktop) / stacked (mobile). Numerals in `--accent`, thin `--border` separators. **No arrows, no animated diagram.**

### 5.4 Aperçu de la démonstration

**H2:** `Voir le système fonctionner`
**Texte:** `Une démonstration complète : un message envoyé, la modification vérifiée, le site mis à jour.`
**CTA:** `Voir la démonstration complète` → `/demonstration`

Embed the poster image (not the video) here, as a clickable link to the demo page. Keeps the homepage light.

### 5.5 État d'avancement

**H2:** `Ce qui est construit aujourd'hui`
**Lead:** `Chaque élément ci-dessous est indiqué avec son état réel. Rien n'est présenté comme terminé s'il ne l'est pas.`

| Élément | État |
|---|---|
| Réception et interprétation des messages en langage naturel | `Fonctionnel` |
| Modification du contenu du site (champs structurés) | `Fonctionnel` |
| Contrôle automatique du périmètre de modification | `Fonctionnel` |
| Enregistrement dans le dépôt de code et mise en ligne automatique | `Fonctionnel` |
| Notification de confirmation et annulation d'une modification | `Fonctionnel` |
| Traçabilité complète des appels au modèle | `Fonctionnel` |
| Utilisation par une personne non technique sur un site en production | `Testé` |
| Utilisation par plusieurs personnes hors du projet | `À valider` |
| Modification de la structure et de la mise en page du site | `Phase 2` |
| Modèle économique | `À valider` |

> **Rule for Claude Code:** these values come from the founder. Do not add rows, do not upgrade any status. If a row's truth is uncertain, ask before rendering it.

Badge styles: `Fonctionnel` → `--status-done`; `Testé` → `--status-done`; `En cours` → `--status-doing`; `Phase 2` → `--status-planned`; `À valider` → `--status-hypo`. Small caps, 12px, 1px border, tinted background at 8% opacity. The border and the word carry the meaning, never the fill alone — the table has to survive a black-and-white print.

A one-line legend under the table (`Fonctionnel — en service aujourd’hui`, `Testé — vérifié en conditions réelles`, `Phase 2 — non commencé`, `À valider — hypothèse`) exists as an option, off by default: the badge wording is already plain French.

### 5.6 Le point technique central

**H2:** `Le point technique central : empêcher l'agent de modifier ce qu'on ne lui a pas demandé`

```
Un modèle de langage qui écrit directement dans le code source d'un site en
production représente un risque concret.

Lors des premiers essais, les consignes écrites dans le prompt n'ont pas suffi :
le modèle a modifié des champs situés en dehors de la demande, tout en
justifiant sa décision dans sa réponse.

La réponse à ce problème n'est pas une meilleure consigne, mais un contrôle
déterministe. Avant tout enregistrement, le système compare la liste des champs
réellement modifiés et le périmètre déclaré par l'agent. Si les deux ne
correspondent pas, la modification est refusée et rien n'est écrit.

C'est ce contrôle qui rend l'outil utilisable sur un site réel plutôt que sur
une démonstration.
```

Optional visual: a small monospace block showing a rejected diff. Two lines max. Keep it readable, not a screenshot of a terminal.

### 5.7 Ce qui reste à valider

**H2:** `Ce qui reste à valider`
**Lead:** `Le prototype fonctionne. La demande, elle, n'est pas encore démontrée. Voici les hypothèses que nous cherchons à vérifier et la méthode prévue.`

> Voice fix: the rest of the site speaks as `nous`. This lead used to say `je`. Keep `nous` everywhere.
>
> **Fixed 2026-08-22:** the design files (`Homepage FR.dc.html` line 221 and `Homepage FR -
> Mobile.dc.html` line 209) read *"Voici les hypothèses que **je cherche** à vérifier..."* —
> confirmed as a design-file error under §2.4 rule 3. The founder gave explicit one-time
> permission to correct it directly in `website_design/` (an exception to the normal "never edit"
> rule), and both files now read **"Voici les hypothèses que nous cherchons à vérifier et la
> méthode prévue."** Phase 3 can extract this lead verbatim — no further correction needed.
>
> **Fixed 2026-08-22 (EN):** the same voice bug existed in the English mirror (`Homepage
> EN.dc.html` line 221 and `Homepage EN - Mobile.dc.html` line 209): *"These are the hypotheses
> **I want** to test, and how."* Same §2.4 rule 3 case, same one-time founder permission, minimal
> pronoun-only edit (no other wording touched) — both files now read **"These are the hypotheses
> we want to test, and how."** Phase 3 can extract this lead verbatim.

| Hypothèse | Méthode prévue | Critère de réussite |
|---|---|---|
| `Une personne non technique met effectivement son site à jour plus souvent lorsque la barrière disparaît.` | `Suivi de la fréquence de mise à jour sur 8 semaines, auprès d'un premier groupe d'utilisateurs pilotes.` | `Une augmentation nette et mesurable par rapport à la période précédente.` |
| `Le premier client est le propriétaire du site : indépendant, petite structure ou association.` | `Entretiens qualitatifs auprès de propriétaires de sites professionnels.` | `Une majorité déclare renoncer régulièrement à une mise à jour à cause de la démarche à engager.` |
| `Ou bien le premier client est l'agence ou le développeur indépendant qui maintient ces sites.` | `Entretiens qualitatifs auprès d'agences web et de développeurs indépendants.` | `Une majorité identifie les petites modifications client comme une charge fréquente et peu rentable.` |
| `Le contrôle de périmètre est suffisant pour permettre une utilisation sans supervision technique.` | `Campagne de tests adverses : demandes ambiguës, contradictoires ou hors périmètre.` | `Aucune modification hors périmètre enregistrée.` |
| `Il existe un prix acceptable pour ce service.` | `Test de prix auprès des personnes interrogées.` | `À définir à l'issue des entretiens.` |

**Note rendered under the table, in `--ink-muted`:**
`Les deux hypothèses de segment sont présentées ensemble volontairement. Nous ne savons pas encore laquelle est la bonne, et les entretiens servent précisément à trancher.`

> Admitting an open question in writing is a deliberate credibility choice for this jury. Do not soften it.

> Adjust wording to match the founder's real intent, but **never** convert a hypothesis into a result.

### 5.8 Phase 2

**H2:** `Phase 2 — de l'édition de contenu à l'édition du site`
**Lead:** `Aujourd'hui l'agent modifie du contenu structuré. L'étape suivante consiste à lui permettre de modifier le site lui-même.`

| Étape | Contenu |
|---|---|
| `Étape 1` | `Étendre le contrôle de périmètre au code source, et non plus seulement aux champs de contenu.` |
| `Étape 2` | `Permettre l'ajout et la modification de sections, de pages et de mise en page, avec prévisualisation avant publication.` |
| `Étape 3` | `Permettre le raccordement de l'outil à un site existant qui n'a pas été conçu pour lui.` |

**Closing line:** `Chaque étape dépend de la précédente. La priorité reste la fiabilité avant l'étendue des fonctions.`

### 5.9 Impact visé

**H2:** `À qui cela s'adresse`

```
Les indépendants, les petites structures et les associations qui disposent d'un
site et qui n'ont pas les moyens de mobiliser un développeur pour une
modification de dix minutes.

Et, en amont, les agences et développeurs indépendants qui maintiennent ces
sites : les petites demandes de leurs clients sont fréquentes, peu rentables et
difficiles à planifier.

L'objectif n'est pas de remplacer un outil de gestion de contenu, mais de rendre
modifiable un site qui, aujourd'hui, ne l'est pas.
```

### 5.10 L'équipe

**H2:** `L'équipe`
**Lead:** `Deux personnes, deux rôles distincts, et un projet né d'un besoin que nous avions nous-mêmes.`

Two cards side by side (stacked on mobile). 1px border, no photo required; if photos are used, one small square each, no filter, same crop.

**Carte 1 — Lisa**
- Rôle : `Porteuse du projet`
- Texte :
```
Coach et formatrice. Elle conçoit et anime des accompagnements en communication,
en encadrement de groupes et en pratiques de plein air.

C'est son site professionnel qui est à l'origine du projet, et c'est elle qui
utilise l'outil au quotidien. Elle porte la relation utilisateur, les entretiens
de validation et le développement de l'activité.
```

**Carte 2 — Taras**
- Rôle : `Associé technique`
- Texte :
```
Quatre ans d'expérience en développement logiciel et en apprentissage automatique.

Il a conçu et développé l'ensemble du système : l'agent, le contrôle de périmètre,
l'intégration au dépôt de code et la mise en production.
```

**Closing line under the two cards, `--ink-muted`:**
`L'utilisatrice de l'outil et sa conceptrice sont dans la même équipe. Chaque limite rencontrée à l'usage revient directement dans le développement.`

> That last line is the point of the section. It is a real structural advantage and it costs nothing to claim, because it is verifiable.

### 5.11 Ce que l'accompagnement apporterait

**H2:** `Ce que l’accompagnement de Pépite apporterait`

**Lead:** `Le prototype est construit et fonctionne. Ce qui nous manque n'est pas technique.`

- `Un accès à des utilisateurs test — indépendants, petites structures, associations — pour vérifier nos hypothèses dans des conditions réelles plutôt qu'en interne.`
- `Un regard extérieur pour trancher entre nos deux hypothèses de segment, et pour construire un modèle économique. C'est aujourd'hui notre principale zone d'incertitude.`
- `Un cadre de travail et un rythme de suivi régulier, en parallèle de nos activités.`
- `Un financement couvrant l'hébergement, les coûts d'appel au modèle et le temps consacré à la phase pilote.`

> Do not mention any employer, apprenticeship, or company name anywhere on the site. None is confirmed.

### 5.12 Contact

**H2:** `Contact`
Email (mailto link), GitHub repository link, live site link, LinkedIn. Plain list. No contact form (a form = a backend = a thing that can break).

---

## 6. Copy — ENGLISH (mirror)

Same structure. Keep it slightly shorter than the French. Key strings:

- **H1:** `Update your website by sending a message.`
- **Lead:** `TypeToDeploy lets a non-technical person edit the content of a professional website from a Telegram conversation. Each change is automatically checked, committed to the source code, and published.`
- **Problem H2:** `The problem` — `A modern website is fast, well-indexed and cheap to host because it is built as code rather than in an editing tool. The trade-off is direct: its owner cannot change it. Updating a price, a date or a photo means going back to a developer. In practice these sites stop being updated, the information becomes wrong, and the site stops doing its job.`
- **Solution steps:** `You write` / `The agent prepares the change` / `The change is verified` / `The site is updated`
- **Status H2:** `What is built today`
- **Technical H2:** `The core technical point: stopping the agent from changing what it was not asked to change`
- **Validation H2:** `What still needs to be validated`
- **Phase 2 H2:** `Phase 2 — from content editing to site editing`
- **Impact H2:** `Who this is for`
- **Team H2:** `The team` — Lisa, project lead and first user; Taras, technical co-founder, four years in software development and machine learning.
- **Origin block H3:** `This project came from a problem we had`
- **Support H2:** `What the Pépite programme would bring`

> The programme is named **Pépite**, not PeeL, in the page copy. PeeL is the Lorraine pole inside the national Pépite network; naming the network keeps the site usable if the application is not filed in Lorraine.

---

## 7. Demo page structure

`/demonstration` (FR) and `/en/demo` (EN).

**Order top → bottom:**

1. **H1** `Démonstration` + one-line lead + a `Retour à l'accueil` link.
2. **Video block.**
   `<video src="/media/demo.mp4" poster="/media/demo-poster.jpg" muted loop playsinline autoplay preload="metadata" controls>`
   Max width 960px, `--border`, `--radius`, `aspect-ratio` set explicitly to prevent layout shift.
   Under it, one line: `Enregistrement réel, sans montage du résultat : la conversation à gauche, le site à droite. La vidéo est accélérée : en conditions réelles, la mise à jour est publiée en une minute environ.`
   The speed-up must be stated. An unlabelled fast video reads as a fake.
   `prefers-reduced-motion: reduce` → remove `autoplay`, show poster + controls.

   **Confirmed 2026-08-22:** the video must behave like a GIF — silent, autoplaying, looping —
   exactly as the `muted loop playsinline autoplay` attributes above specify. Phase 0 inventory
   found the design files' `<video>` tags missing all four of those attributes (`controls` and
   `preload="metadata"` only). Since `website_design/` is not edited for behavioural attributes
   like this, Phase 4 must add `muted loop playsinline autoplay` to the video tag itself — this
   BRIEF wins on behaviour per §2.4 rule 2, the design file's omission was an error, not a decision.
3. **Verification block** — a bordered box, `--accent-soft` background:
   `Cette modification a produit un commit réel dans le dépôt du site.`
   → link to the actual commit URL on GitHub
   → link to the live site
   This is the single highest-value element on the page. Place it high.
   Width: capped at 960px, the same as the video, so the video, this box and their captions share one left and one right edge. Do not widen it to `--width-page`.
   Commit shown: `5fec45d` (`taras-svystun/taras-and-lisa`) — the commit the video and the screenshots both produced.
4. **Step-by-step screenshots.** Seven rows, one per screenshot. Two-column row, **image left, text right, both vertically centred on each other** (the shorter column centres against the taller one); stacked on mobile. Labelled micro-sections, chosen per step rather than fixed — a `/status` check has no “Demande” and a site capture has no “Réponse du bot”:
   - `Commande` / `Demande` — what the user typed (verbatim, in a monospace block)
   - `Action de l'agent` — what the agent did
   - `Réponse du bot` / `Action de l’agent` — what the system did
   - `Écran` — what the screenshot shows (site captures)
   - `À observer` — the one thing to look at
   - `Trace` — the commit, in monospace
   Image side does **not** alternate — it stays left on every row. Alternating was tried and removed: with seven rows it reads as instability, not rhythm. Number each row `01` … `07`.

   **The screenshots and the video are the same session.** Same commits, same modified fields, same messages. Any wording about “a different session”, “an earlier session”, or “commits that differ from the video” is obsolete and must not reappear.

   **Two screenshot sets, one per viewport.** Desktop rows use the wide captures (`bot_*_v2`, `site_*_v2`). Mobile rows use phone captures (`bot_*_phone`) plus site captures cropped to the hero text column (`site_*_mobile_v2`) — a full-page capture scaled to 335px is unreadable, and horizontal scrolling inside a screenshot card was tried and rejected.
5. **Limits block** — honest, and it *increases* credibility:
   **H2** `Limites actuelles de la démonstration`
   Three items, written by the founder. Do not invent, do not add a placeholder row:
   - `L’agent modifie du contenu structuré. Il ne modifie pas la structure ni la mise en page du site.`
   - `L’outil fonctionne sur un site conçu pour lui. Le raccordement à un site existant n’est pas encore possible.`
   - `Une seule personne utilise l’outil aujourd’hui, sur un seul site en production.`
6. **CTA back to home.**

---

## 8. Assets the founder must supply

Place in these exact locations before Phase 4:

```
public/media/demo.mp4              # 40–60 s, ≤ 8 MB, H.264, 1080p or 720p
public/media/demo-poster.jpg       # first meaningful frame, ≤ 200 KB
public/og-image.png                # 1200 × 630, social preview
public/favicon.svg
```

Screenshots, as used in the design files (same session as the video):

| File | Used on | Content |
|---|---|---|
| `bot_1_v2` … `bot_4_v2` | desktop demo | `/start`, `/status`, the emoji request + commit, `/undo` |
| `bot_1_phone` … `bot_4_phone` | mobile demo | the same four steps, captured on a phone |
| `site_before_v2`, `site_after_v2` | desktop demo | the live page before / after the change |
| `site_before_mobile_v2`, `site_after_mobile_v2` | mobile demo | the same two, cropped to the hero text column |
| `bot_3_onepager` | one-pager | `bot_3_phone` cropped to the request + commit |
| `qr-typetodeploy` | one-pager (FR) | QR to the production domain |
| `qr-typetodeploy-en` | one-pager (EN) | Same QR, for the EN one-pager — found in `website_design/images/` during Phase 0 inventory but not previously listed here |

Order = display order. The phone captures are not a nicety: they are the only legible option at 375px.

### 8.1 Confirmed URLs (use these, do not invent alternatives)

| Purpose | URL |
|---|---|
| Live site edited by the agent | `https://taras-and-lisa.com` |
| Product repository (public) | `https://github.com/taras-svystun/taras-and-lisa` |
| Presentation site repository (public) | `https://github.com/taras-svystun/typetodeploy-site` |
| Production domain of this site | `https://typetodeploy.taras-and-lisa.com` |
| Example bot commit (headline) | `https://github.com/taras-svystun/taras-and-lisa/commit/5fec45d` — post-guardrail, the commit shown in both the video and the screenshots as the proof-of-work |
| Example bot commit (undo) | `https://github.com/taras-svystun/taras-and-lisa/commit/6d81bdd` — the `/undo` action's commit, shown in demo step 06 |

> **Confirmed 2026-08-22:** `70cd1ba…` was a mistake and does not exist as a real reference commit —
> removed. There are exactly **two** confirmed commits for this site: `5fec45d` (headline
> proof-of-work) and `6d81bdd` (the `/undo` action). Do not introduce a third.

---

## 9. SEO / metadata requirements

Per page:
- `<title>` — FR home: `TypeToDeploy — mettre à jour son site web en envoyant un message`
- `<meta name="description">` — 150–160 characters, distinct per page and per language
- `<html lang="fr">` / `<html lang="en">`
- `<link rel="alternate" hreflang="fr" href="…">`, `hreflang="en"`, `hreflang="x-default"` → FR
- `<link rel="canonical">`
- Open Graph: `og:title`, `og:description`, `og:image` (absolute URL), `og:url`, `og:type=website`, `og:locale` (`fr_FR` / `en_US`)
- Twitter: `twitter:card=summary_large_image`
- `@astrojs/sitemap` with i18n config
- `robots.txt` allowing everything

---

## 10. Accessibility requirements (non-negotiable)

- Contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text. Verify `--ink-muted` on `--surface-alt`.
- One `<h1>` per page. No heading level skipped.
- All images have meaningful `alt` in the page language. Decorative images `alt=""`.
- Video: `controls` present; a text summary of the video exists on the page (the screenshot section serves this).
- Every link and button reachable by keyboard, with a visible focus ring.
- Skip-to-content link as the first focusable element.
- Language switch link has an explicit accessible label (`hreflang` + `lang` attributes).
- `prefers-reduced-motion` respected.

---

## 11. Claude Code — phased implementation plan

> Copy each phase as a separate message. **Do not** paste more than one phase at a time.
> Every phase ends with a mandatory STOP. Do not let Claude Code chain phases.
>
> **Where to run each phase:**
> - **Phase 0** — from the parent directory (it needs to read both repos).
> - **Phases 1–7** — quit Claude Code and restart it *inside* `typetodeploy-site/`. From then on the product repo is physically outside the working directory and cannot be touched by accident.
>
> **Session opener** (paste before the first phase of every session):
> `Read BRIEF.md in full, then list: the ten files in website_design/, the precedence rule from §2.4, and the component budget from §1. Then wait — I will give you one phase at a time.`

---

### PHASE 0 — Inventory. Change nothing.

```
Read BRIEF.md at typetodeploy-site/BRIEF.md in full before doing anything.

You are in READ-ONLY mode for this entire phase. Do not create, edit, move, or
delete any file, in any directory, for any reason.

Produce one markdown report answering all of the following. Be specific: file
paths, exact values, actual counts. No guessing — if something is absent, say
"absent" rather than assuming.

PART A — the design files (typetodeploy-site/website_design/)

A1. List every .html file with its byte size, and state which page and which
    viewport each one is (Homepage / Demo / One-pager, FR / EN, 1440 / 375).
A2. For ONE desktop file, describe how it is built:
    - Is the CSS in a <style> block, inline style attributes, or an external file?
    - Is the markup semantic (header/main/section/table) or generic divs?
    - Are there absolute positions or fixed pixel widths on the page wrapper?
    - Are fonts loaded from a CDN? Give the exact URL if so.
    - Any <script> tags? Quote them.
A3. Diff the desktop and mobile file for the SAME page. Report only what actually
    differs: which CSS values change, which elements are reordered, which images
    are swapped. This diff is the media-query specification — I need it explicit.
A4. List every file in website_design/images/ with its size and pixel dimensions.
    Say which are screenshots, which is the QR code, which is the video, which is
    the poster frame. Flag anything over 500 KB.
A5. Extract the full set of CSS custom properties actually used in the design
    files. Put them in a table next to the token values written in BRIEF §2.2 and
    mark every row MATCH or DIFFERS. Do not change anything — just report.
A6. Count the sections in the desktop homepage file and match them against the
    twelve rows in BRIEF §4. Report any extra, missing, or reordered section.

PART B — the sibling product repo (../taras-and-lisa)

Read only. Do not clone it, do not copy from it, do not write to it.

B1. Astro version, Node version, package manager.
B2. Whether Tailwind or any CSS framework is used.
B3. TypeScript, and tsconfig strictness.
B4. How it deploys to Cloudflare: Pages or Workers, adapter or none, the wrangler
    config filename, the build command, the output directory.
B5. Anything worth reusing verbatim in the new site. If the honest answer is
    "nothing, the new site has its own design", say that.

PART C — verdict

C1. Any place where the design files and BRIEF.md contradict each other.
C2. Any file listed in BRIEF §8 that is missing from website_design/images/.
C3. The three things most likely to go wrong in this port, and how you would
    avoid each.

Output the report. Propose no implementation. Write no code.

STOP and wait for my approval.
```

---

### PHASE 1 — Scaffold + extract the real design system

```
Read BRIEF.md §1, §2 and §2.4.

Restart context: you are now working inside typetodeploy-site/. The product repo
is outside this directory and out of scope.

1. Create an Astro project in this directory, preserving BRIEF.md and
   website_design/ untouched:
     npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git
   then npm install.

2. Install exactly these and nothing more:
     @astrojs/sitemap
     @fontsource-variable/inter
     @fontsource-variable/source-serif-4

   No Tailwind. No UI framework. No icon library. No animation library. No
   Cloudflare adapter — this site is fully static with no server routes.

3. astro.config.mjs:
   - site: 'https://typetodeploy.taras-and-lisa.com'
   - output: 'static'
   - i18n: { defaultLocale: 'fr', locales: ['fr','en'], routing: { prefixDefaultLocale: false } }
   - sitemap() with the matching i18n config

4. Create src/styles/global.css. Build it FROM THE DESIGN FILES, not from memory:
   - Take the custom-property block you extracted in Phase 0 (A5). Where a design
     value differs from BRIEF §2.2, the DESIGN VALUE WINS — but list every such
     row in your report so I can see it.
   - Add a modern CSS reset.
   - Add base element styles (body, headings, p, a, ul, table) using those tokens,
     matching what the desktop design file actually renders.
   - Add the small number of utilities the design genuinely uses. Do not invent a
     utility system. If the design uses four layout patterns, write four classes.
   - Import the two fontsource packages here. Remove any Google Fonts CDN
     reference; the design files must not be the source of a network font.
   - Global :focus-visible: 2px solid var(--accent), 2px offset. Never outline:none.
   - @media (prefers-reduced-motion: reduce) disabling transitions.

5. Create src/i18n/utils.ts exporting:
   - getLangFromUrl(url): 'fr' | 'en'
   - useTranslations(lang): the dictionary for that language
   - getAlternateUrl(pathname, lang): the same page in the other language
   Create src/i18n/fr.ts and src/i18n/en.ts as empty typed objects for now, with
   fr.ts as the type source (`export type Dict = typeof fr`).

Deliverable: `npm run build` exits 0 and produces a valid empty site.
Report: the build output, and the MATCH/DIFFERS table of token values.

Create no pages, no components, no content in this phase.

STOP and wait for my approval.
```

---

### PHASE 2 — Shell: layout, header, footer, language switch

```
Read BRIEF.md §3, §9, §10, and the header/footer as built in the design files.

Build the shell, copying markup and CSS from the design files:

- src/layouts/Layout.astro
  Props: lang, title, description, path.
  Renders <html lang>, every meta tag in BRIEF §9 (title, description, canonical,
  hreflang fr / en / x-default, Open Graph, Twitter card), a skip-to-content link
  as the first focusable element, <Header>, <main id="main">, <slot/>, <Footer>.
  Imports global.css and both fontsource packages.

- src/components/Header.astro
  Exactly as in the design file. The language switch is a plain <a> to the
  alternate URL, with hreflang and lang attributes and an accessible label.
  Zero JavaScript.

- src/components/Footer.astro
  Exactly as in the design file. External links get target="_blank" rel="noopener".

- src/components/Badge.astro
  Props: status ('fonctionnel' | 'teste' | 'en-cours' | 'phase-2' | 'a-valider')
  and label. Border + text carry the meaning; the fill is decoration only, so the
  badge survives a black-and-white print.

Create four thin pages that render Layout with a placeholder <h1>:
  src/pages/index.astro          → lang 'fr'
  src/pages/demonstration.astro  → lang 'fr'
  src/pages/en/index.astro       → lang 'en'
  src/pages/en/demo.astro        → lang 'en'

Each page is only: pick lang, load dictionary, render Layout, render its body
component (added in Phase 3/4). Keep them under 15 lines each.

Verify and report:
- / is French, /en/ is English
- The switch on /demonstration lands on /en/demo, and back
- hreflang on all four pages is reciprocal and correct
- Tab order works and every stop shows a visible focus ring
- Header and footer at 1440px and at 375px match the design files

STOP and wait for my approval.
```

---

### PHASE 3 — Homepage, both languages, one template

```
Read BRIEF.md §4 and §5, and open both homepage design files (1440 and 375) plus
both language versions.

Build src/components/HomeBody.astro — ONE component, taking the dictionary `t` as
a prop. It renders all twelve sections. Both /  and /en/ use it.

How to build it:
1. Copy the section markup from the DESKTOP FR design file. Keep its structure.
2. Replace every literal string with a key. Fill src/i18n/fr.ts from the FR design
   file and src/i18n/en.ts from the EN design file. Extract the copy — do not
   retype it from BRIEF §5 and do not translate anything yourself. If a string
   exists in FR but not in EN, stop and tell me rather than inventing it.
3. Take the section CSS into a scoped <style> block inside HomeBody.astro. Shared
   values come from global.css tokens.
4. Add the mobile breakpoint from the 375px design file as media queries in that
   same <style> block. Use the Phase 0 A3 diff as the specification. One template,
   two breakpoints — never a second component.

Hard constraints:
- Zero client-side JavaScript. No scroll animation, no fade-in, no counters.
- The status table and the hypotheses table are real <table> elements with
  <caption>, <thead>, <th scope="col">. Below 700px they become stacked labelled
  blocks. Horizontal scrolling inside a table is a FAIL.
- Semantic markup: <section>, <h2>, <ul>, <table>. Not nested divs.
- Every URL comes from BRIEF §8.1. If a link is not in that table, do not add it.

Forbidden: adding, removing, reordering, or rewording any section; adding any
number, percentage, user count, price, company name, testimonial, or logo that is
not already in the design files.

Report: the twelve sections rendered, any string present in one language but not
the other, and any place the mobile design could not be expressed as a media query.

STOP and wait for my approval.
```

---

### PHASE 4 — Demo page, both languages, and the media

```
Read BRIEF.md §7 and §8, and open both demo design files plus both languages.

1. Move the assets out of website_design/images/ into the build (copy, do not
   delete the originals):
   - the video       → public/media/demo.mp4
   - the poster      → public/media/demo-poster.jpg
   - the OG image    → public/og-image.png
   - the favicon     → public/favicon.svg
   - every screenshot → src/assets/demo/, keeping the names used in BRIEF §8
   If any file in BRIEF §8 is missing, fail loudly and list what is missing. Never
   substitute a placeholder or an image from the internet.

2. Build src/components/DemoBody.astro, same one-template-two-dictionaries pattern
   as HomeBody.

3. Video block, exactly:
   <video src="/media/demo.mp4" poster="/media/demo-poster.jpg"
          muted loop playsinline autoplay preload="metadata" controls>
   Set aspect-ratio explicitly so there is no layout shift. Under
   prefers-reduced-motion: reduce, drop autoplay and show the poster with controls.
   The caption stating the video is sped up is mandatory — an unlabelled fast video
   reads as fake.

4. The verification block goes directly under the video, capped at the same 960px
   width so the video, the box, and both captions share one left and one right edge.
   Commit link: https://github.com/taras-svystun/taras-and-lisa/commit/5fec45d

5. Seven screenshot rows, image left on every row (no alternating), image and text
   vertically centred against each other, stacked on mobile.

6. Desktop and mobile use DIFFERENT screenshot files (BRIEF §8). Serve them with
   <picture>, not CSS:

     <picture>
       <source media="(max-width: 700px)" srcset={mobile.src} width={mobile.width} height={mobile.height}>
       <img src={desktop.src} width={desktop.width} height={desktop.height} alt="..." loading="lazy" decoding="async">
     </picture>

   Hiding one with display:none is a FAIL — the browser downloads both.
   Use getImage() from astro:assets to produce WebP for each source. First row is
   loading="eager", the rest lazy. Every alt is a real French sentence describing
   what the screenshot shows.

Report: total page weight, number of requests, largest single asset, and confirm
that at 375px no desktop screenshot is downloaded.

STOP and wait for my approval.
```

---

### PHASE 5 — Responsive, accessibility, performance

```
Test at 320, 375, 414, 768, 1024, 1440, 1920. Report PASS/FAIL per item, with the
fix applied where it failed.

1.  No horizontal scrollbar at any width, on either page, in either language.
2.  Rendered pages match the design files at 1440 and at 375. Report every visible
    difference; do not silently "improve" one.
3.  No text below 14px.
4.  Tap targets ≥ 44×44px on mobile.
5.  Both tables become stacked labelled blocks below 700px.
6.  The video never overflows its container.
7.  Contrast: compute the actual ratio for every text/background pair in use and
    report the numbers. Fix anything under 4.5:1 (body) or 3:1 (large text).
    Check --ink-muted on --surface-alt specifically.
8.  Exactly one <h1> per page. No heading level skipped.
9.  Every <img> has an alt attribute in the page's language.
10. Skip-to-content link works from a cold keyboard focus.
11. Full keyboard traversal of all four pages, visible focus ring at every stop.
12. prefers-reduced-motion honoured.
13. dist/ contains zero JavaScript bundles — or list and justify every byte.
14. Report the total size of dist/ and the size of the largest file in it.

STOP and wait for my approval.
```

---

### PHASE 6 — Final QA

```
Report a PASS/FAIL table:

1.  npm run build exits 0 with no warnings.
2.  Crawl dist/ — every internal link resolves to a real file.
3.  Fetch every external link and report its HTTP status code.
4.  No TODO, lorem, placeholder, or [[…]] marker anywhere in dist/.
5.  Every page has a unique <title> and <meta description>.
6.  sitemap.xml lists all four pages with correct alternates.
7.  robots.txt exists and allows everything.
8.  favicon and og-image resolve at their absolute URLs.
9.  No console errors on any page under npm run preview.
10. Grep every numeral in the built HTML and list them all in a table, with the
    file and the surrounding sentence. I will confirm each one is real.
11. Grep the built FR pages for English words and the EN pages for French words.
    Report anything found.
12. Confirm website_design/ still exists, unmodified, and is not in dist/.

Items 10 and 11 are mandatory. Do not skip them.

STOP and wait for my approval.
```

---

### PHASE 7 — Deployment configuration

```
1. Create wrangler.jsonc at the repo root:

{
  "name": "typetodeploy-site",
  "compatibility_date": "2026-08-01",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}

No Cloudflare adapter, no Worker script — this is a static asset deployment.

2. Create src/pages/404.astro (French, using Layout) with a link home.

3. package.json scripts:
     "deploy": "astro build && wrangler deploy"

4. .gitignore: dist/, .astro/, node_modules/, .wrangler/
   Do NOT gitignore website_design/ — it is the design record and must stay in git.

5. README.md covering: run locally, build, deploy, where media lives, how to edit
   the copy (src/i18n/), and the rule that website_design/ is the design reference
   and is not part of the build.

6. Verify: npx wrangler deploy --dry-run succeeds.

Do NOT run a real deploy. I connect the repository through the Cloudflare
dashboard myself.

STOP.
```

---

## 12. Definition of done

- [ ] French loads at `/` with no prefix; English at `/en/`
- [ ] Language switch works on both pages, both directions
- [ ] All content exists in both languages
- [ ] Every number and claim on the site is real and verifiable
- [ ] Video plays; poster shows before load; screenshots explain everything without the video
- [ ] Link to a real GitHub commit created by the bot
- [ ] Link to the live site edited by the agent
- [ ] Responsive 320 → 1920, no horizontal scroll
- [ ] Zero broken links
- [ ] Images served as WebP, `dist/` under 5 MB
- [ ] One `<h1>` per page, all images have alt, contrast passes, keyboard-navigable
- [ ] Unique title + description per page, hreflang correct, sitemap present
- [ ] OG image renders in a link preview
- [ ] `npm run build` clean
- [ ] Deployed, HTTPS active, custom domain resolving
- [ ] Tested on a real phone and a real laptop
- [ ] Someone who has never heard of the project understands it in 60 seconds
- [ ] Lisa can read every sentence on the site aloud in French and explain it unprompted
- [ ] The PDF one-pager exports cleanly and is legible printed in black and white
- [ ] Eligibility confirmed with the PeeL office

---

## 13. PDF one-pager (jury handout)

Juries print things and pass them around. One A4 page, produced from the same design.

**Built:** `One-pager FR.dc.html` — A4 portrait, single fixed page, French only, 13mm side margins. Same tokens, same type pairing as the site. Body text 9–9.5pt, labels 7.5–8pt, the tagline 17pt serif.

**Structure (single page, French only):**

1. Header strip: `TypeToDeploy` + one line: `Mettre à jour son site web en envoyant un message.` + the site URL.
2. Left column (60%):
   - `Le problème` — 3 short paragraphs
   - `La solution` — the 4 steps, one line each, numeral in `--accent`
   - `Ce qui est construit aujourd’hui` — 6 rows, label left / status badge right
     (the 5 `Fonctionnel`/`Testé` rows, plus `Utilisation par plusieurs personnes hors du projet — À valider`, so the sheet admits an open item too)
3. Right column (40%):
   - One screenshot of the Telegram conversation: the emoji request, the agent’s reply naming the modified fields, and the commit link — cropped so those three things fill the frame
   - `Ce qui reste à valider` — 3 lines, each written as an open question
   - `Phase 2` — the 3 steps, `Étape 1–3` label left / one line right
4. Footer strip (1.5pt rule above it, matching the header rule): the two names with one-line roles, then contact email · live site · GitHub on one line, and a 21mm QR code pointing to `https://typetodeploy.taras-and-lisa.com` with a one-line caption. The QR is a **local PNG** (`images/qr-typetodeploy.png`), not a CDN call — a handout must not depend on the network at print time.

**Production:** built on the paged-document shell, so `Export → PDF` prints one A4 sheet with no browser chrome and no page-break surprises. Do not build a PDF pipeline in code. Because the page box clips, any copy change must be re-checked against the sheet: the layout is sized to fill A4 exactly.
**Constraint:** must be legible printed in black and white. Do not rely on the accent colour to carry meaning; badges need a border or a label, not just a fill.

---

## 14. Oral defence preparation (not part of the website, but drives the copy)

Lisa presents. She must be able to answer these in French without a developer present. Every answer below must match what the website says, word for word where possible.

| Question the jury will ask | The answer the site must support |
|---|---|
| `Concrètement, ça fait quoi ?` | `On écrit un message, le site se met à jour tout seul quelques instants après.` |
| `En quoi c'est différent de WordPress ou Wix ?` | `Ces outils supposent qu'on ait construit le site avec eux. Nous, on se branche sur un site déjà existant, construit comme du code, et qui n'a aucune interface de modification.` |
| `Et si l'intelligence artificielle se trompe ?` | `C'est le point sur lequel on a le plus travaillé. Avant d'enregistrer quoi que ce soit, le système compare ce que l'agent a annoncé vouloir modifier et ce qu'il a réellement modifié. Si ça ne correspond pas, rien n'est enregistré. Ce n'est pas une consigne donnée au modèle, c'est un contrôle dans le code, que le modèle ne peut pas contourner.` |
| `Combien d'utilisateurs avez-vous ?` | `Une. Moi. Sur un site réellement en ligne. C'est justement pour élargir ça qu'on candidate.` |
| `Qui va payer, et combien ?` | `On ne le sait pas encore. On a deux hypothèses de segment et une méthode pour trancher. C'est écrit sur le site.` |
| `Qu'est-ce que vous avez appris jusqu'ici ?` | `Qu'on ne peut pas faire confiance à une consigne écrite pour contraindre un modèle. Il faut un contrôle dans le code. On l'a découvert en le testant, et le test qui a échoué est public.` |

> The last row is the strongest answer in the whole set. It shows an experiment, a negative result, and a correction. That is exactly what a pedagogical jury is grading.

---

## 15. Eligibility check (do before anything else)

The Statut National Étudiant-Entrepreneur and the PeeL programmes are open to students and recent graduates holding the baccalauréat or an equivalent, attached to an établissement in the network. **Verify that Lisa is eligible under her current status before investing further work.** If she is not, the applicant of record must change, and the whole "porteuse de projet" framing on the site changes with it. Contact `peel@univ-lorraine.fr` to confirm rather than assuming.

---

---

## 16. Email — `contact@taras-and-lisa.com`

Receiving is set up with Cloudflare Email Routing on the `taras-and-lisa.com` zone. It is a forwarder, not a mailbox: mail sent to `contact@taras-and-lisa.com` is delivered to an existing personal inbox. Sending *from* that address is a separate, optional step.

**For Claude Code:** the address is content, not infrastructure. Put it in `src/i18n/*.ts` as a `mailto:` link in the contact section and the footer. Do not add a contact form, do not add an email API, do not add a Worker route for mail. If the address in the design files differs from `contact@taras-and-lisa.com`, stop and ask before changing it.

The dashboard steps are in the founder's instructions, not here.

---

## 17. Definition of done — additions after the design handoff

- [ ] Rendered pages match `website_design/` at 1440px and at 375px; every deviation is listed and accepted
- [ ] `website_design/` is still present in git, unmodified, and absent from `dist/`
- [ ] No Google Fonts or other CDN request in the built HTML
- [ ] At 375px the browser downloads only the mobile screenshots
- [ ] `contact@taras-and-lisa.com` receives a real test message
