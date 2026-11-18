# Satellite explorer (handover)

The Technology page (`/technology`) shows an interactive 3D model of the NEBULA Xplorer satellite with a list of its components (epic #542). This document is for whoever works on it next: where everything is, how it works together, and how to change texts, components and the 3D model.

## Quick start

```sh
npm install
npm run dev            # http://localhost:5173/technology
npm run build          # needed before the explorer check and before preview
npm run preview        # the built site, http://localhost:4173/technology
npm run verify:satellite
```

`npm run verify:satellite` runs the checks in `scripts/verify/`: viewer assets, CAD models and component mapping, optics, performance, motion detail, CAD transforms, the explorer list (read from the built page, so run `npm run build` first) and the camera orbit. Run it after every change to the explorer, the content or the models.

## Where it is loaded

- `src/routes/technology/+page.server.js` loads the content (`src/lib/server/explorerContent.js`) and prerenders the page, so it also works without JavaScript.
- `src/routes/technology/+page.svelte` only passes that data to the `SatelliteExplorer` organism.
- The page uses the site's layout (`src/routes/+layout.svelte`): header and navigation (the **Technology** link), hero, locations and footer, and the shared stylesheet `src/lib/styles/stylesheet.css`.
- `src/lib/components/organisms/SatelliteExplorer.svelte` is the whole explorer: it imports `src/lib/styles/satellite-explorer.css`, creates the explorer state and renders the 3D viewer, the component list, the language switch and the notices inside one section, `<div class="satellite-page">`.

### Team components the explorer uses

| Team component | Where in the explorer |
| --- | --- |
| `Heading` (atoms) | The title with its kicker ("Spacecraft"), the "Components" and "About the mission" labels |
| `Paragraph` (atoms) | Every text: introduction, descriptions, notes, mission text |
| `Button` (atoms) | "Explore 7 components" (no JavaScript), the viewer buttons (pause rotation, outer panels, X-rays, reset view, full screen), NL/EN, the phone sheet arrow, hide in full screen, "Load 3D model" |
| `Link` (atoms) | "All components" / "All parts" (no JavaScript) |
| `HamburgerButton` (atoms) | Brings the hidden explorer back in full screen. It got two optional props, `onclick` and `label`: without `onclick` it still opens the site menu as before |
| `ArrowIcon`, `ChevronIcon`, `CloseIcon` (`src/lib/assets/icons`) | Call-to-action arrow, sheet arrow, hide button |
| `PauseIcon`, `PlayIcon`, `LayersIcon`, `ResetIcon`, `FullscreenIcon` | Added to `src/lib/assets/icons` in the same style, for the viewer buttons |
| Colour, font, spacing and type tokens (`stylesheet.css`) | All of `satellite-explorer.css`; the only colours of its own are the 3D scene background (`--scene`), the studio backdrop of the rendered close-ups (`--studio`) and the blue of a selected part (`--select`) |

What stays specific to the explorer, and why:

- `ViewerControl` and `ViewerControls` (molecule, organism): the team `Button` with an icon, a pause/play state and an icon-only form, placed over the 3D view. On a narrow 3D view only the icons show; the label stays for screen readers.
- The component list (`Explorer`, `ExplorerNode`, `ExplorerBreadcrumb`): a nested, numbered list where every row is a link to `#id` that expands in place. None of the team components does this (`ContentAccordion` has a fixed label and no link per row).
- `ComponentImage`: the explorer's images are files in `static/media/`, while the team `Image` needs an imported image (`?enhanced`).
- The 3D viewer itself (`Viewer` and everything in `src/lib/scene/`).

### Styling rules

- Every rule in `satellite-explorer.css` starts from `.satellite-page` or one of the explorer's own classes, so nothing changes on other pages, also after visiting Technology.
- The explorer's state is set on its section, not on `<html>`: `js` (JavaScript runs), `js-pending` (the 3D view is starting), `js-enhanced` (the 3D view runs) and `data-layout` (`panel`, `sheet` or a dual-screen layout). Styles for the page without JavaScript use `.satellite-page:not(.js-enhanced)`.
- When you leave the page, the section is removed, the explorer stops listening to keyboard, history and full screen events (`connect()` in `src/lib/state/explorer.svelte.js`) and the 3D renderer is disposed (`src/lib/scene/viewerController.js`).

## How the list, links, selection and 3D view work together

There is one piece of state: the selected item (`state.selectedId` in `src/lib/state/explorer.svelte.js`). Everything follows from it: which rows are expanded, the breadcrumb, the URL hash, the camera, the highlight, the cutaway, which model is shown, the numbered markers and the viewer buttons.

1. Every item in the list is a link to its id, for example `/technology#sun-sensor`. Without JavaScript the browser opens it on the page (CSS `:target`).
2. With JavaScript, `Explorer.svelte` catches the click and calls `explorer.navigate(id)`. That updates the hash (`history.pushState`), so Back and Forward move through earlier selections (`handlePopstate`).
3. `Viewer.svelte` passes the selection to `src/lib/scene/viewerController.js`, which asks `src/lib/scene/explorerScene.js` what to show for that item (satellite, instrument, optics schematic or CAD part). It then flies the camera there (`src/lib/scene/updateCamera.js`) and highlights the component (`src/lib/scene/objects/SelectionHighlight.js`).
4. Clicking the 3D model or a numbered marker does the same in reverse: `src/lib/scene/objects/Satellite.js` finds which component a mesh belongs to (`getComponentFromObject`), and the explorer selects it.

The links of the main components:

| Component | Link |
| --- | --- |
| X-Ray Instrument | `/technology#x-ray-instrument` |
| Star Tracker Module | `/technology#star-tracker` |
| Dawn 4U CubeDrive | `/technology#dawn-4u-cubedrive` |
| S-Band Antenna | `/technology#s-band-antenna` |
| Sun Sensor | `/technology#sun-sensor` |
| Magnetorquers | `/technology#magnetorquers` |
| Solar Panel | `/technology#solar-panel` |

The older ids `#xray-instrument` and `#star-tracker-module` still work (`aliases` in `explorerContent.js`).

### Layout and controls

- **Desktop (720 px and wider):** the list is a panel on the right, always open; the site's own menu stays on the left. The 3D view is one screen high below the site header, and the page scrolls past it.
- **Phone:** the list is a sheet at the bottom. It folds between its peek row (the selected item) and expanded, with the orange arrow or by dragging; it never closes.
- **Mouse:** the wheel scrolls the page; Ctrl/⌘ + wheel or a trackpad pinch zooms (`src/lib/scene/controls.js`).
- **Touch:** a vertical swipe scrolls the page, a sideways swipe rotates, pinching zooms.
- **Full screen** (button bottom right, not on iPhone, where Safari only allows video full screen): the 3D view and the list fill the screen. Only there can the list be hidden (×); the team's menu button brings it back, and Esc returns to the page.
- **Keyboard:** Tab reaches the viewer buttons and every list row; Escape moves up one level, and on a phone it folds the expanded sheet.
- **Reduced motion** turns off camera flights, the slow automatic turn, expand animations and the X-ray animation.

## Changing a text or a component

All texts are in `src/lib/server/explorerContent.js`, English and Dutch side by side (`{ en, nl }`).

- **Change a text:** edit it there. Texts that tell visitors to select or rotate something have a `withoutScript` version for the page without JavaScript.
- **Add an item:** copy a sibling in the `children` of its parent, and give it a unique `id` (kebab-case, it becomes the link), a `scene`, a `title` and `blocks` (`lead`, `note` or `about`). Numbers, counts and heading levels follow from the position in the list.
- **Scenes:** `satellite`, `satellite-component`, `instrument`, `instrument-component`, `optics`, `optical-path`, `optical-component`, `cad-parts` and `cad-part` (see `src/lib/scene/explorerScene.js`).
- **A new satellite component** also needs its CAD names in `componentMeshNames` in `src/lib/scene/objects/Satellite.js`. Parts of the X-ray instrument are mapped in `src/lib/scene/objects/InstrumentComponents.js`.
- **The interface texts** (buttons, labels, NL/EN) are in `src/lib/state/language.svelte.js`.
- **Afterwards:** run `npm run build` and `npm run verify:satellite`. The explorer check reports problems in nesting, numbers, counts, heading levels or scene mapping.

Only confirmed texts from SRON are used; an item without a confirmed description has no description, and there are no placeholder texts.

## A new STEP file

The viewer loads `src/lib/assets/models/satellite/Satellite.viewer.glb` (and `instrument/Instrument.viewer.glb` for the detailed instrument). It is made from a STEP export in two steps.

1. **STEP to GLB with the CAD colours.** This needs Python 3.12 with OpenCascade (`pip install cadquery-ocp`):

   ```sh
   python scripts/convert-step.py path/to/assembly.stp src/lib/assets/models/source/Satellite.source-colors.glb
   ```

   It keeps the colours and node names from the STEP file. A large assembly takes a few minutes.

2. **Reduce it for the web.** The gltf-transform packages are not dependencies of the site, so install them without saving:

   ```sh
   npm install --no-save @gltf-transform/core @gltf-transform/extensions @gltf-transform/functions
   node scripts/optimize-model.mjs src/lib/assets/models/source/Satellite.source-colors.glb src/lib/assets/models/satellite/Satellite.viewer.glb 0.3 0.002
   ```

   The numbers are the share of triangles kept (`0.3`) and the allowed error (`0.002`).

**Then check the CAD names.**
- The explorer finds components by the names of CAD nodes (`componentMeshNames` and `satelliteInteriorHideNames` in `Satellite.js`; names are lowercased, and spaces, colons, dots and dashes become `_`).
- Run `npm run verify:satellite`. `scripts/verify/models.mjs` checks that every component still has its parts and that the cutaway hides the outer panels. When a name changed in the new export, it fails with the component's name; update the name in `Satellite.js` and in that check.
- Then click every component in the 3D view and use **Outer panels** to check the cutaway.

When the model changes, also render the images for the page without JavaScript again (next section).

## Images and animations for the page without JavaScript

All images are rendered from the same scene code as the 3D view, so they use the same models, colours and component mapping. `scripts/render-stills/jobs.js` lists what each image shows and from which side. The renderer starts its own local server on port 5296 and a Chrome window:

```sh
node scripts/render-stills.mjs stills      # close-ups → static/media/components/
node scripts/render-stills.mjs locations   # "On the spacecraft" → static/media/locations/, label positions → src/lib/server/componentViews.js
node scripts/render-stills.mjs hero        # opening stills → static/media/hero/, animation frames → .svelte-kit/render-frames/
```

Turn the animation frames into the looping AVIFs with ffmpeg:

```sh
ffmpeg -framerate 24 -i .svelte-kit/render-frames/satellite/frame-%04d.jpg -c:v libaom-av1 -crf 34 -b:v 0 -cpu-used 6 -row-mt 1 -pix_fmt yuv420p -loop 0 static/media/hero/satellite-turn.avif
ffmpeg -framerate 24 -i .svelte-kit/render-frames/satellite-tall/frame-%04d.jpg -c:v libaom-av1 -crf 34 -b:v 0 -cpu-used 6 -row-mt 1 -pix_fmt yuv420p -loop 0 static/media/hero/satellite-tall-turn.avif
```

The data-saver poster (`static/media/satellite-overview-*.webp`) is rendered with `node scripts/render-poster.mjs` while `npm run preview -- --port 5294` runs.

Without JavaScript the page shows:
- the opening, with an animated satellite (still image with reduced motion);
- the seven components as rows that open with CSS `:target`;
- per component, a view on the spacecraft and a close-up (side by side, or a switch on phones);
- the X-ray instrument's parts as `<details>`.

No 3D model is downloaded. More in [`responsive-design.md`](responsive-design.md).

## Where things are

| What | Where |
| --- | --- |
| Texts and the list of components | `src/lib/server/explorerContent.js` |
| Label positions of the pictures without JavaScript | `src/lib/server/componentViews.js` (generated) |
| Explorer state, selection, URL, full screen | `src/lib/state/explorer.svelte.js` |
| Interface texts and NL/EN | `src/lib/state/language.svelte.js` |
| CAD names → components, cutaway, camera focus | `src/lib/scene/objects/Satellite.js` |
| Instrument parts | `src/lib/scene/objects/InstrumentComponents.js` |
| What is shown per item, camera framing, slow turn | `src/lib/scene/explorerScene.js` |
| Camera flights | `src/lib/scene/updateCamera.js`, `src/lib/scene/camera.js` |
| Highlight of the selection | `src/lib/scene/objects/SelectionHighlight.js` |
| Performance (draw calls, simplified meshes, quality steps) | `src/lib/scene/objects/CadInstances.js`, `objects/MotionDetail.js`, `renderQuality.js` |
| The link between page and 3D scene | `src/lib/scene/viewerController.js` |
| Components | `src/lib/components/{atoms,molecules,organisms}/`, exported from each folder's `index.js` |
| Styling | `src/lib/styles/satellite-explorer.css` |
| Models | `src/lib/assets/models/` (`satellite/`, `instrument/` and `cad/` are loaded; `source/` is the input for the conversion) |
| Images | `static/media/` |

## Known problems and open tasks

- **Footer images:** `Footer.svelte` (footer, #493 / PR #692) links its images as `src/lib/assets/...`, which gives a 404 after a build. While prerendering Technology those five 404s are warnings (`vite.config.js`, `footerImages`); remove that exception once the footer imports its images.
- **Small text:** some explorer labels are 11–13 px, below the 16 px minimum in the FDND conventions. Changing that changes the design of the list, so it needs a decision.
- **No issue number in the branch name:** the branch `feature/integrate-satellite-viewer` has no issue number; the workflow in `CONTRIBUTING.md` asks for one.
- **Satellite navigation (#605):** the branch for #605 also works on navigation for the satellite on Technology; align before merging both.
- **Testing:**
  - no test on real phones yet, only browser emulation;
  - `prefers-reduced-data` is not supported by browsers yet, so the data-saver poster could not be tested in practice.
- **In other team code** (not part of the explorer), on every page:
  - `<html lang="nl">` on an English site;
  - the Locations section jumps from `h1` to `h4`;
  - the search field has no label.
