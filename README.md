# Design Tokens

Design tokens exported from Figma via Tokens Studio, built with [Style Dictionary](https://styledictionary.com).

## Structure

```
tokens/         ← Source of truth (edit these / synced from Tokens Studio)
  global.json   ← All tokens: color, typography, shadow, blur, spacing
  $metadata.json
  $themes.json

build/          ← Generated output (do not edit manually)
  css/variables.css
  js/tokens.js
  js/tokens.d.ts
  json/tokens-flat.json
```

## Token categories

| Group | Description |
|---|---|
| `color` | Full color palette — Brand, Gray, Error, Warning, Success + extended colors |
| `typography` | Composite text styles — Text xs → xl, Display xs → xl (Regular/Medium/Semibold/Bold) |
| `shadow` | Box shadows — xs, sm, md, lg, xl, 2xl, 3xl + focused ring variants |
| `blur` | Background blur — sm, md, lg, xl |
| `focusRing` | Focus ring effects for accessibility states |
| `spacing` | Spacing scale |

## Setup

```bash
npm install
npm run build
```

This generates:
- `build/css/variables.css` — CSS custom properties (`:root { --color-brand-600: ... }`)
- `build/js/tokens.js` + `tokens.d.ts` — ES module with TypeScript types
- `build/json/tokens-flat.json` — flat key/value JSON

## Tokens Studio sync

Connect this repo in Tokens Studio:
1. Open Tokens Studio plugin in Figma
2. Go to **Settings → Sync providers → GitHub**
3. Set the **branch** to `main` and **file path** to `tokens`
4. After changes in Figma, push from Tokens Studio → triggers the build workflow automatically

## CI/CD

The GitHub Actions workflow (`build-tokens.yml`) runs on every push to `main` that touches `tokens/**` and auto-commits the rebuilt `build/` output.
