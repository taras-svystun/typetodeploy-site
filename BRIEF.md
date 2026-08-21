# TypeToDeploy — PeeL Presentation Website — BRIEF

> This file is the single source of truth for the project.
> Drop it at the root of the **new** repository. Claude Code must read it at the start of every session.

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
  --ink-faint:      #808896;   /* captions, labels */
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
  --step--1: 0.875rem;
  --step-0:  1rem;
  --step-1:  1.1875rem;
  --step-2:  1.5rem;
  --step-3:  2rem;
  --step-4:  2.75rem;
  --step-5:  3.5rem;   /* H1 desktop */

  /* Space (4px base) */
  --s-1: 0.25rem; --s-2: 0.5rem;  --s-3: 0.75rem; --s-4: 1rem;
  --s-6: 1.5rem;  --s-8: 2rem;    --s-12: 3rem;   --s-16: 4rem;
  --s-24: 6rem;   --s-32: 8rem;

  /* Layout */
  --width-page: 1120px;
  --width-text: 68ch;
  --radius: 6px;
}
```

### 2.3 Rules

- **Serif for H1/H2 only.** Everything else is Inter. This is what makes it read "institutional but modern" instead of "SaaS template".
- **No shadows.** Cards = 1px `--border` + `--radius`. Flat.
- **Radius 6px.** Not pills, not 16px. Low radius reads serious.
- **One accent colour.** No gradients, no glassmorphism, no 3D, no blobs, no floating shapes.
- **Section rhythm:** alternate `--surface` / `--surface-alt`. Vertical padding `--s-24` desktop, `--s-16` mobile.
- **Line length:** body text capped at `--width-text`. Never full-bleed paragraphs.
- **Focus:** `outline: 2px solid var(--accent); outline-offset: 2px;` on every interactive element. Never `outline: none`.
- **Animation:** none, except `transition: background-color .15s` on buttons/links. Respect `prefers-reduced-motion`.
- **Icons:** avoid entirely, or use inline SVG numerals (1/2/3/4) for the "how it works" steps. No icon library.

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

- **Badge:** `Projet en développement — prototype fonctionnel en production`
- **H1:** `Mettre à jour son site web en envoyant un message.`
- **Lead:** `TypeToDeploy permet à une personne sans compétence technique de modifier le contenu d'un site web professionnel depuis une simple conversation Telegram. La modification est vérifiée automatiquement, enregistrée dans le code source, puis mise en ligne.`
- **CTA primaire:** `Voir la démonstration` → `/demonstration`
- **CTA secondaire:** `Voir le site piloté par l'agent` → external, live site
- **Sous-CTA (petit, gris):** `Chaque modification produit un commit vérifiable sur GitHub.`

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

Badge styles: `Fonctionnel` → `--status-done`; `Testé` → `--status-done`; `En cours` → `--status-doing`; `Phase 2` → `--status-planned`; `À valider` → `--status-hypo`. Small caps, 12px, 1px border, tinted background at 8% opacity.

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
**Lead:** `Le prototype fonctionne. La demande, elle, n'est pas encore démontrée. Voici les hypothèses que je cherche à vérifier et la méthode prévue.`

| Hypothèse | Méthode prévue | Critère de réussite |
|---|---|---|
| `Une personne non technique met effectivement son site à jour plus souvent lorsque la barrière disparaît.` | `Suivi de la fréquence de mise à jour sur 8 semaines, auprès d'un premier groupe d'utilisateurs pilotes.` | `Une augmentation nette et mesurable par rapport à la période précédente.` |
| `Le premier client est le propriétaire du site : indépendant, petite structure ou association.` | `Entretiens qualitatifs auprès de propriétaires de sites professionnels.` | `Une majorité déclare renoncer régulièrement à une mise à jour à cause de la démarche à engager.` |
| `Ou bien le premier client est l'agence ou le développeur indépendant qui maintient ces sites.` | `Entretiens qualitatifs auprès d'agences web et de développeurs indépendants.` | `Une majorité identifie les petites modifications client comme une charge fréquente et peu rentable.` |
**Note rendered under the table, in `--ink-muted`:**
`Les deux hypothèses de segment sont présentées ensemble volontairement. Nous ne savons pas encore laquelle est la bonne, et les entretiens servent précisément à trancher.`

> Admitting an open question in writing is a deliberate credibility choice for this jury. Do not soften it.
| `Le contrôle de périmètre est suffisant pour permettre une utilisation sans supervision technique.` | `Campagne de tests adverses : demandes ambiguës, contradictoires ou hors périmètre.` | `Aucune modification hors périmètre enregistrée.` |
| `Il existe un prix acceptable pour ce service.` | `Test de prix auprès des personnes interrogées.` | `À définir à l'issue des entretiens.` |

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

**H2:** `Ce que l'accompagnement du PeeL apporterait`

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
- **Support H2:** `What the PeeL programme would bring`

---

## 7. Demo page structure

`/demonstration` (FR) and `/en/demo` (EN).

**Order top → bottom:**

1. **H1** `Démonstration` + one-line lead + a `Retour à l'accueil` link.
2. **Video block.**
   `<video src="/media/demo.mp4" poster="/media/demo-poster.jpg" muted loop playsinline autoplay preload="metadata" controls>`
   Max width 960px, `--border`, `--radius`, `aspect-ratio` set explicitly to prevent layout shift.
   Under it, one line: `Enregistrement réel, sans montage du résultat. Durée : XX secondes.`
   `prefers-reduced-motion: reduce` → remove `autoplay`, show poster + controls.
3. **Verification block** — a bordered box, `--accent-soft` background:
   `Cette modification a produit un commit réel dans le dépôt du site.`
   → link to the actual commit URL on GitHub
   → link to the live site
   This is the single highest-value element on the page. Place it high.
4. **Step-by-step screenshots.** For each of the ~6 screenshots, a two-column row (image left, text right; stacked on mobile) with four labelled micro-sections:
   - `Demande` — what the user typed (verbatim, in a monospace block)
   - `Action de l'agent` — what the agent did
   - `Résultat` — what changed on the site
   - `Pourquoi c'est important` — one sentence, no marketing
   Alternate image side per row for rhythm. Number each row `01`, `02`, …
5. **Limits block** — honest, and it *increases* credibility:
   **H2** `Limites actuelles de la démonstration`
   Bullet list of what the system cannot do yet. Written by the founder. Do not invent.
6. **CTA back to home.**

---

## 8. Assets the founder must supply

Place in these exact locations before Phase 4:

```
public/media/demo.mp4              # 40–60 s, ≤ 8 MB, H.264, 1080p or 720p
public/media/demo-poster.jpg       # first meaningful frame, ≤ 200 KB
src/assets/demo/01-*.png           # ~6 screenshots, original resolution
public/og-image.png                # 1200 × 630, social preview
public/favicon.svg
```

Screenshot naming: `01-commande-tarif.png`, `02-site-avant.png`, `03-site-apres.png`, etc. Order = display order.

### 8.1 Confirmed URLs (use these, do not invent alternatives)

| Purpose | URL |
|---|---|
| Live site edited by the agent | `https://taras-and-lisa.com` |
| Product repository (public) | `https://github.com/taras-svystun/taras-and-lisa` |
| Presentation site repository (public) | `https://github.com/taras-svystun/typetodeploy-site` |
| Production domain of this site | `https://typetodeploy.taras-and-lisa.com` |
| Example bot commit | founder will supply — must be a commit made **after** the scope guardrail was deployed |

> The commit `70cd1ba…` is a *pre-guardrail* commit that demonstrates the scope-violation bug. It may be used deliberately in the "limits / what we learned" context, but **never** as the headline proof-of-work commit.

---

## 13. PDF one-pager (jury handout)

Juries print things and pass them around. One A4 page, produced from the same design.

**Structure (single page, French only):**

1. Header strip: `TypeToDeploy` + one line: `Mettre à jour son site web en envoyant un message.` + the site URL.
2. Left column (60%):
   - `Le problème` — 3 lines
   - `La solution` — the 4 steps, one line each
   - `Ce qui est construit` — 5 bullets, with status
3. Right column (40%):
   - One screenshot of the Telegram conversation
   - `Ce qui reste à valider` — 3 lines
   - `Phase 2` — 3 lines
4. Footer strip: the two names and roles, contact email, QR code pointing to `https://typetodeploy.taras-and-lisa.com`.

**Production:** build it in Claude Design from the same tokens, then `Export → PDF`. Do not build a PDF pipeline in code.
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

---

### PHASE 0 — Inspect. Change nothing.

```
Read BRIEF.md at the repo root in full before doing anything.

You are in READ-ONLY mode for this phase. Do not create, edit, or delete any file.

Task: inspect the existing production repository `taras-svystun/taras-and-lisa`
(clone it into a temporary directory OUTSIDE this repo, or read it from the local
path I give you). Report the following:

1. Astro version, Node version, package manager (npm/pnpm/yarn).
2. Whether Tailwind or any CSS framework is used, and how it is configured.
3. Whether TypeScript is used, and the tsconfig strictness.
4. The exact structure of src/ (pages, layouts, components, content collections).
5. Any existing i18n setup.
6. How the site is currently deployed to Cloudflare (Pages or Workers, adapter,
   wrangler config file, build command, output directory).
7. Any reusable component I could copy into the new site (button, layout, section
   wrapper). List them by file path with a one-line description.
8. Any file that must NOT be touched because the Telegram bot writes to it.

Output a single markdown report. Do not propose an implementation yet.
Do not modify the inspected repository in any way.

STOP after the report and wait for my approval.
```

---

### PHASE 1 — Scaffold + design system

```
Read BRIEF.md again.

Create a new Astro project in THIS repository (currently empty).

Requirements:
- `npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git`
  then install dependencies with npm.
- Astro 5.x, `output: 'static'`. Do NOT install any Cloudflare adapter — this is a
  fully static site with no server routes.
- Install: `@astrojs/sitemap`, `@fontsource-variable/inter`,
  `@fontsource-variable/source-serif-4`. Nothing else.
- No Tailwind, no UI framework, no icon library, no animation library.

Configure `astro.config.mjs`:
- `site: 'https://typetodeploy.taras-and-lisa.com'` (I will confirm the final domain
  in Phase 8 — use this value for now and make it a single easily-changed constant)
- `i18n: { defaultLocale: 'fr', locales: ['fr', 'en'], routing: { prefixDefaultLocale: false } }`
- sitemap integration with matching i18n config

Create `src/styles/global.css` containing EXACTLY the token block from BRIEF.md
section 2.2, plus:
- a modern CSS reset
- base element styles (body, headings, p, a, ul, table) using the tokens
- utility classes: `.page` (max-width + horizontal padding), `.prose` (max-width
  --width-text), `.section` (vertical rhythm), `.section--alt` (alt background)
- `.badge` with modifier classes for the five status values
- visible `:focus-visible` styles globally
- `@media (prefers-reduced-motion: reduce)` block disabling transitions

Create `src/i18n/fr.ts` and `src/i18n/en.ts` as typed objects, and
`src/i18n/utils.ts` exporting:
- `useTranslations(lang)` returning the dictionary
- `getLangFromUrl(url)` returning 'fr' | 'en'
- `getAlternateUrl(url, lang)` returning the equivalent page in the other language

Leave the dictionaries with placeholder keys only for now — I will supply copy in
Phase 3.

Deliverable: `npm run build` succeeds and produces an empty-but-valid site.
Run it and show me the output.

Do NOT create any page content yet.

STOP and wait for my approval.
```

---

### PHASE 2 — Layout, header, footer, language switch

```
Read BRIEF.md sections 3 and 10.

Create:
- `src/layouts/BaseLayout.astro` — takes props: `lang`, `title`, `description`,
  `alternateUrl`. Renders <html lang>, all metadata from BRIEF.md section 9,
  skip-to-content link, <Header/>, <slot/>, <Footer/>.
- `src/components/Header.astro` — project name (links to home in current lang),
  a "Démonstration"/"Demo" link, and a language switch that is a plain <a> to
  `alternateUrl` with `hreflang` and `lang` attributes. No JavaScript.
- `src/components/Footer.astro` — contact email, GitHub link, live site link,
  copyright, language switch repeated. Links open external URLs in a new tab with
  `rel="noopener"`.
- `src/components/Section.astro` — wrapper accepting `alt` (boolean) and `id`.
- `src/components/Badge.astro` — accepts `status` prop, one of:
  'fonctionnel' | 'teste' | 'en-cours' | 'phase-2' | 'a-valider'.

Create four empty pages that render the layout with placeholder <h1>:
`src/pages/index.astro`, `src/pages/demonstration.astro`,
`src/pages/en/index.astro`, `src/pages/en/demo.astro`.

Verify with `npm run build` and `npm run preview`:
- `/` renders French, `/en/` renders English
- The language switch on `/demonstration` goes to `/en/demo` and back correctly
- Keyboard Tab order works and every focused element shows a visible ring

Show me a screenshot of the header and footer at 1440px and at 375px width.

STOP and wait for my approval.
```

---

### PHASE 3 — Homepage sections + French copy

```
Read BRIEF.md sections 4 and 5 in full.

Fill `src/i18n/fr.ts` with the exact French copy from BRIEF.md section 5.
Do not paraphrase it. Do not "improve" it. Do not add sentences.
If a value is missing or marked TBD, use a clearly visible placeholder like
`[[À FOURNIR : …]]` and list every placeholder in your final report.

Build the twelve homepage sections listed in BRIEF.md section 4, as separate
components under `src/components/sections/`. One file per section.

Hard constraints:
- Zero client-side JavaScript.
- No animation on scroll, no fade-in, no counters.
- The 4-step solution block is a CSS grid, 4 columns ≥ 900px, 1 column below.
- The status table and the hypotheses table are real <table> elements with
  <caption>, <thead>, <th scope="col">. On mobile they become stacked definition
  blocks — do NOT allow horizontal scrolling.
- Every external link is verified to exist before being added. If I have not given
  you a URL, leave `[[URL À FOURNIR]]` rather than inventing one.

Explicitly forbidden: adding any number, percentage, user count, revenue figure,
company name, testimonial, or partner logo that is not written in BRIEF.md.

Deliverable: `/` renders fully in French. Report every placeholder still present.

STOP and wait for my approval.
```

---

### PHASE 4 — Demo page + media

```
Read BRIEF.md section 7 and 8.

Assume the following files now exist (fail loudly with a clear error if any is
missing — do NOT substitute a placeholder image from the internet):
  public/media/demo.mp4
  public/media/demo-poster.jpg
  src/assets/demo/*.png

Build `/demonstration` per BRIEF.md section 7.

Requirements:
- The <video> element uses the exact attribute set from BRIEF.md. Set explicit
  width/height or aspect-ratio to prevent cumulative layout shift.
- Under `@media (prefers-reduced-motion: reduce)`, remove autoplay behaviour.
- The verification block is placed directly under the video, before the
  screenshots. Style it with `--accent-soft` background and a 1px `--accent` border.
- Screenshots use `<Image />` from `astro:assets`, `format="webp"`, `quality={82}`,
  `loading="lazy"` for all but the first, with explicit `alt` in French describing
  what the screenshot shows.
- Each screenshot row has the four labelled blocks: Demande / Action de l'agent /
  Résultat / Pourquoi c'est important.

Report: the total page weight, the number of network requests, and the size of
the largest asset.

STOP and wait for my approval.
```

---

### PHASE 5 — English mirror

```
Read BRIEF.md section 6.

Fill `src/i18n/en.ts` and build `/en/` and `/en/demo` reusing the exact same
components. No new components. No divergent layout.

The English is a mirror, not a new site. Every section present in French must be
present in English.

Verify:
- No French string leaks into the English pages, and vice versa. Grep both built
  HTML files for the other language's distinctive words and report the result.
- hreflang tags are correct and reciprocal on all four pages.
- `<html lang>` is correct on all four pages.

STOP and wait for my approval.
```

---

### PHASE 6 — Responsive, accessibility, performance

```
Test and fix at these widths: 320, 375, 768, 1024, 1440, 1920.

Checklist — report PASS/FAIL for each item, with the fix applied:
1. No horizontal scrollbar at any width.
2. No text smaller than 14px anywhere.
3. Tap targets ≥ 44×44px on mobile.
4. Tables reflow to stacked blocks below 700px.
5. The video block never overflows its container.
6. Contrast ratios: run an automated check on every text/background pair used and
   report actual ratios. Fix anything below 4.5:1 (body) or 3:1 (large text).
7. Exactly one <h1> per page; no heading level skipped.
8. Every <img> has an alt attribute.
9. Skip-to-content link works.
10. Full keyboard traversal of both pages with a visible focus ring at every stop.
11. `prefers-reduced-motion` honoured.

Then:
- Confirm `dist/` contains zero JavaScript bundles, or list and justify any that exist.
- Report the total size of `dist/`.
- Generate `public/og-image.png` requirements as a spec for me (do not generate the
  image yourself) if I have not supplied one.

STOP and wait for my approval.
```

---

### PHASE 7 — Final QA before deployment

```
Run the full checklist and report a table of PASS/FAIL:

1. `npm run build` exits 0 with no warnings.
2. Every internal link resolves to a real page (crawl `dist/` and verify).
3. Every external link returns HTTP 200 (fetch each one and report status codes).
4. No `[[À FOURNIR]]`, `TODO`, `lorem`, or placeholder text remains anywhere in `dist/`.
5. Every page has a unique <title> and <meta description>.
6. sitemap.xml exists and lists all four pages with correct alternates.
7. robots.txt exists.
8. favicon and og-image resolve.
9. No console errors on any page in `npm run preview`.
10. Grep `dist/` for any invented number or metric — list every numeral found in
    the built HTML and let me confirm each one is real.

Item 10 is mandatory. Do not skip it.

STOP and wait for my approval.
```

---

### PHASE 8 — Deployment configuration

```
Create `wrangler.jsonc` at the repo root:

{
  "name": "typetodeploy-site",
  "compatibility_date": "2026-08-01",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}

Do NOT install the Cloudflare adapter. This is a static asset deployment; no
Worker script is needed.

Create `src/pages/404.astro` (French) with a link back to the homepage.

Add to package.json scripts:
  "deploy": "astro build && wrangler deploy"

Add `.gitignore` entries for `dist/`, `.astro/`, `node_modules/`, `.wrangler/`.

Create a README.md documenting: how to run locally, how to build, how to deploy,
where the media assets live, and how to edit the copy (pointing at src/i18n/).

Verify `npx wrangler deploy --dry-run` succeeds.

Do NOT run an actual deploy. I will connect the repository through the Cloudflare
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
