# YT Experience (YTXP)

A browser extension for Chromium-based browsers (Brave, Chrome) that lets you toggle YouTube
customizations on and off, plus the public landing page for it at
[glhrmbg.github.io/yt-experience](https://glhrmbg.github.io/yt-experience/).

## Features

**Hide Shorts** — independently toggle Shorts off in:
- the sidebar (mini and expanded)
- search results & home feed grids
- channel page tabs
- the "Shorts" filter chip

**Hide recommendations sidebar** — hides the up-next carousel and related videos list next to
the player. On by default. On live streams, chat stays visible and follows YouTube's own
open/close chat button instead of disappearing with the rest of the sidebar.

## Install

1. Download the latest `YTXP-vX.Y.Z.zip` from the [Releases page](https://github.com/glhrmbg/yt-experience/releases) and unzip it.
2. Open `brave://extensions` (or `chrome://extensions`) and enable **Developer mode**.
3. Click **Load unpacked** and select the unzipped folder.
4. Open the extension's popup on any tab to toggle features on or off.

## Repository layout

This is an npm workspaces monorepo:

```
extension/   MV3 extension (TypeScript, Vite, CRXJS)
site/        Public landing page (Astro), deployed to GitHub Pages
```

## Development

```
npm install

npm run dev:extension     # extension dev build (watch mode)
npm run typecheck         # extension typecheck
npm run build:extension   # extension production build -> extension/dist

npm run dev:site          # site dev server
npm run build:site        # site production build -> site/dist
```

To load a local build of the extension: `npm run build:extension`, then load `extension/dist`
as an unpacked extension (see Install above).

## Adding a feature

Features live in `extension/src/shared/features/<id>/`, each exporting a `Feature` object
(`id`, `group`, `name`, `description`, `defaultEnabled`, `apply()`, `undo()`) registered in
`extension/src/shared/features/registry.ts`. `content/main.ts` and the popup iterate the
registry generically, so adding a feature is one new module plus one registry entry.

## Workflow & releases

- `main` is protected; changes go through `feature/*` branches and a pull request.
- Pushing a `feature/*` branch runs typecheck/build and auto-opens (or updates) a PR to `main`.
- `extension/package.json`'s `version` is the single source of truth for the extension's
  version - PRs touching `extension/**` are blocked unless it's bumped.
- Merging to `main` deploys the site (if `site/**` changed) and, on any extension change,
  publishes a GitHub Release (`ytxp@X.Y.Z`) with a downloadable `YTXP-vX.Y.Z.zip`.

## License

MIT - see [LICENSE](LICENSE).
