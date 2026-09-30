# Ali Alqassab — The Developer System

A custom personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Lucide, and locally hosted variable fonts. The developer is the core; skills, experience, projects, and education are the connected modules.

## Run locally

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview of the exported files:

```sh
npm run build
npm start
```

`npm run build` creates `out/`. `npm start` serves those static files and prints the preview URL, including any configured repository path. No Next.js server is needed in production.

Webpack is selected explicitly because Turbopack's worker ports were blocked in the development environment. Both are supported Next.js compilers. You can use `npx next dev --turbopack` or `npx next build --turbopack` in an unrestricted environment.

## Structure

```text
app/                    App Router, global styles, SEO, icons, social preview, 404
.github/workflows/      Build, browser checks, and GitHub Pages deployment
components/
  layout/               Navigation and footer
  sections/             One component per portfolio section
  ui/                   Reusable controls, disclosures, tags, and motion preferences
  visual/               Interactive system graph and custom project illustrations
data/portfolio.ts       Personal details, experience, skills, projects, education
types/portfolio.ts      Typed content models
lib/                    Deployment URL, base path, and safe CV file detection
public/                 Static assets and optional CV
scripts/                Local static preview and visual review
tests/                  Browser, accessibility, responsive, and interaction checks
```

## Update your content

Edit `data/portfolio.ts`. Personal details, social URLs, experience, grouped technologies, selected projects, additional builds, working principles, education, and graph descriptions are centralized there.

For a GitHub profile, set `personal.socials.github` to your actual URL. For a project, populate its `links` object:

```ts
links: {
  github: "https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY",
  live: "https://YOUR_REAL_PROJECT_DOMAIN",
}
```

These are documentation placeholders only; no placeholder links appear on the website. Omit any unavailable URL. Project cards render source and live links only when supplied.

### CV

Place your actual PDF at **`public/Ali-Alqassab-CV.pdf`**. The hero automatically includes a download link when that file exists at build time. Rebuild after adding the file. To use another filename, change `personal.resumePath` in the content file. A missing PDF never produces a broken download link.

## Deploy to GitHub Pages

The configured Git remote is **`https://github.com/alii-alqassab/potfolio-.git`**. With the default Pages domain, the portfolio will be at **`https://alii-alqassab.github.io/potfolio-/`**. That address is an expected deployment destination, not a claim that the site is already published.

The workflow in `.github/workflows/deploy-pages.yml` installs dependencies, checks formatting and lint, builds the static export (including TypeScript validation), runs desktop/mobile browser tests against the exported files, and deploys `out/` only after all checks pass. Pushes to `main` trigger it; you can also run it from the Actions tab.

### First deployment

1. Open [the repository](https://github.com/alii-alqassab/potfolio-). If the repository does not yet exist, create a GitHub repository named **`potfolio-`** under **`alii-alqassab`**, leaving it empty (do not initialize a README or license).
2. On GitHub Free, use a **public repository** for Pages. Private-repository Pages requires an eligible paid plan. See [GitHub Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
3. From this project folder, commit and push the source:

   ```sh
   git add .
   git commit -m "Prepare portfolio for GitHub Pages"
   git push -u origin main
   ```

   The remote and local `main` branch are already configured. No `git init`, remote replacement, or force push is needed. Authenticate with GitHub if prompted. If Git asks for a commit identity, configure it with your own name and email. If the remote already contains commits and rejects the push, reconcile that history before retrying; do not force-push over it.

4. Open **Settings → Pages → Build and deployment → Source**, and choose **GitHub Actions**. The workflow is already included; no generated Jekyll or starter workflow is needed. See [GitHub's publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
5. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow**, select **main**, and run it. If the initial push ran before Pages was enabled, re-run that failed workflow instead.
6. Wait for both **build** and **deploy** to succeed. The deployment's environment link and **Settings → Pages** show the live URL.

Future commits pushed to `main` publish automatically. Keep `out/`, `.next/`, and `node_modules/` untracked; the workflow generates and uploads the deployable files. You do not need a `gh-pages` branch, an npm `gh-pages` dependency, a personal access token secret, or a separate hosting server.

### Paths, SEO, and custom domains

The workflow reads the real URL and base path from GitHub Pages settings. It supplies **`SITE_URL`** and **`NEXT_PUBLIC_BASE_PATH`** to the build automatically. You do not need to add repository secrets or environment variables.

For this repository, those values will normally be:

```dotenv
SITE_URL=https://alii-alqassab.github.io/potfolio-
NEXT_PUBLIC_BASE_PATH=/potfolio-
```

Assets, fonts, social previews, CV downloads, the 404 home link, canonical URL, and sitemap all respect this path. To reproduce the Pages build locally on macOS/Linux:

```sh
SITE_URL=https://alii-alqassab.github.io/potfolio- NEXT_PUBLIC_BASE_PATH=/potfolio- npm run build
npm start
```

Open the URL printed by the preview server: `http://127.0.0.1:3000/potfolio-/`. For an ordinary local root build, run `npm run build` without these environment variables. If you use `.env.local` instead, keep it untracked and make sure the URL path matches the base path. Without `SITE_URL`, local builds disable indexing.

For a future custom domain, configure the domain and DNS in **Settings → Pages**, then run the workflow again. It picks up the new origin and empty base path. See [GitHub's custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site). Custom Actions deployments use the repository's Pages domain setting; no generated `CNAME` file is required.

The site includes a generated 1200 × 630 PNG social preview, SVG favicon, Apple PNG touch icon, Person structured data, semantic headings, `robots.txt`, and `sitemap.xml`. PNG images are emitted with real `.png` filenames so static hosting serves their correct content type. The contact section uses email, a tap-to-call phone link, and LinkedIn; it does not submit information to a backend. GitHub Pages controls HTTP response headers, so Next.js server-only header configuration has been removed. For a project site, the exported `robots.txt` sits under the repository path; domain-wide crawler rules are controlled by the host's root `robots.txt`.

## Accessibility and motion

- Native section links and project disclosures work without JavaScript.
- Keyboard focus indicators, a skip link, meaningful control labels, and an Escape-dismissible mobile menu are included.
- The system diagram works by click, tap, or keyboard. Hover is optional.
- `prefers-reduced-motion` disables animated effects and smooth scrolling. The footer's **Pause motion** control also stops decorative motion.
- Content is rendered to HTML at build time and remains visible if JavaScript is disabled. Motion only enhances it after hydration.
- Project visuals are architecture illustrations, not screenshots, performance data, or live demos.

## Verification

```sh
npm run lint
npm run format:check
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite checks content and metadata, anchor targets, secure external links, disclosures, diagram controls, clipboard success/failure, reduced motion, mobile navigation, no-JavaScript content, social assets, deployment paths, and 404 handling. It checks overflow and graph-node overlap at widths from 320px to 1920px, and runs axe WCAG A/AA checks on desktop and mobile. Browser tests serve the exported `out/` files on port 3100 and read the base path from the build manifest, so run the build first and keep that port free. Automated accessibility checks complement manual keyboard and visual review; they do not certify accessibility.

To run the interactive browser test UI, use `npm run test:e2e:ui`.

Use `npm run format` to format source files. ESLint 9 is intentionally retained because the React lint plugin bundled with the installed Next.js version is not compatible with ESLint 10.

## Design and performance

Manrope provides the editorial typography; JetBrains Mono is reserved for small technical labels. Deep navy surfaces, warm amber, thin architecture lines, and purposeful whitespace connect the sections. Original CSS/SVG illustrations keep the visual system crisp without heavy image assets or a canvas renderer.

Most components are server components. Client JavaScript is limited to the navigation, diagram selection, clipboard, motion preferences, and viewport reveals. Animations use CSS and browser-native Web Animations, without an animation library.

No GitHub account, project URL, phone number, certification, company detail, or achievement has been invented.
