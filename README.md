# Product Search Demo (Angular)

A standalone Angular implementation of the "Search Products by Category" user
story: keyword + category search, autocomplete suggestions, spelling
correction, ranked & paginated results, and a simulated backend-error/retry
flow.

This is a plain Angular project with no third-party branding. You run and
host it yourself.

## Requirements
- Node.js 18+ (Node 22 recommended)
- npm 9+

## Setup

```bash
npm install
```

## Run locally (dev server)

```bash
npm start
```

Then open http://localhost:4200 in your browser.

## Build for production

```bash
npm run build
```

Output goes to `dist/product-search-demo/browser`. This folder is a static
site — deploy it to any static host (Netlify, Vercel, GitHub Pages, S3,
nginx, etc.) by pointing the host at that folder.

## What's in here

- `src/app/products.data.ts` — mock product catalog (35 sample products,
  6 categories)
- `src/app/search.service.ts` — search, ranking, and spelling-correction logic
- `src/app/app.component.ts` — UI state (input, suggestions, pagination,
  error/retry simulation)
- `src/app/app.component.html` / `.css` — template and styles, matching the
  approved search-bar mockup (gray card, white input/dropdown, blue button)

## Deploy to GitHub Pages (automatic)

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`)
that builds and deploys automatically on every push to `main`.

1. Push this project to a GitHub repo named
   `product-search-demo-Tisa-Tran-UserStoryAX` (or update the `--base-href`
   value in `deploy.yml` if you use a different name).
2. In the repo on GitHub: **Settings → Pages → Source → "GitHub Actions"**.
3. Push to `main` (or re-run the workflow from the **Actions** tab).
4. Once the workflow finishes, the site is live at:
   `https://YOUR-USERNAME.github.io/product-search-demo-Tisa-Tran-UserStoryAX/`

## Demo notes

- A "Simulate failure" checkbox above the results lets you trigger the
  error/retry state on demand instead of waiting for a real backend outage.
- Try misspelling a product name (e.g. "Macbok" or "Lapotp") to see the
  spelling-correction suggestion.
- Each result shows a small badge indicating why it matched (exact name,
  partial name, exact description, partial description, or closest spelling
  match), reflecting the ranking rules in the user story.
