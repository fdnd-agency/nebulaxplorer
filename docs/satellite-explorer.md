# Satellite explorer

The 3D satellite explorer lives on the `/technology` page. It is built with Svelte 5 and Three.js and follows the folder structure in [`CONTRIBUTING.md`](../CONTRIBUTING.md).

The `/technology` page opens on a fullscreen 3D model of the satellite. **Explore satellite** opens the explorer: a panel on the left on desktop, a bottom sheet with peek and expanded states on mobile. The page itself never scrolls; only the explorer content does.

The explorer is one continuous, nested list. Selecting an item expands it in place, showing its description and its own numbered parts underneath, while its parents stay visible:

```
01 X-Ray Instrument
   01 Instrument components
      01 Detector modules … 07 Support panel
   02 Optics
      01 Mirror and X-ray path
         01 Primary mirror … 06 X-ray path
      02 Individual CAD parts
02 Star Tracker Module
…
07 Solar Panel
```

Only the path to the selected item is expanded, so the list never turns into a long accordion; the selection scrolls into a comfortable position. Selecting the selected item again collapses it. The breadcrumb at the top of the panel is orientation and a shortcut, not the main way to move around.

There is one explorer state: the selected item. It determines the expanded path, the breadcrumb, the URL hash, camera framing, highlight, cutaway, which model is shown (satellite, detailed instrument, schematic or CAD part), the numbered markers and the contextual controls. Selecting an item in the explorer, clicking a marker or clicking the model produces the same state. On mobile the sheet collapses to peek after selecting an item without parts, so the camera movement is visible.

## Progressive enhancement and accessibility

All content lives in `src/lib/server/explorerContent.js` (English and Dutch side by side). `src/routes/technology/+page.server.js` loads it and SvelteKit prerenders it into one nested semantic list: every item is an `<li data-explorer-item>` with a heading containing a real link, a body with its confirmed description, and a nested `<ol>` of its parts. Without JavaScript or WebGL the page is a normal, fully expanded scrolling document with the same hierarchy, numbering and links. Every item is deep-linkable through its id, for example `/technology#instrument-detectors`.

With JavaScript Svelte hydrates the same HTML into the explorer, and the 3D model enhances it:

- item links expose `aria-expanded` and `aria-controls`; collapsed parts are inert, so they are skipped by keyboard and screen readers
- the selected item is marked with `aria-current`, and selections are announced through a status message ("05, Sun Sensor, selected")
- the canvas is a single labelled image; the numbered markers on the model are hidden from assistive technology because the matching links carry the same action
- Escape moves up one level inside the explorer and closes it at the top level
- controls expose their state (`aria-expanded`, `aria-pressed`) and change their label where the action changes
- `prefers-reduced-motion` removes camera flights, the ambient orbit, expand animations and the X-ray animation

Only confirmed content is shown. An item without a confirmed description simply has no description paragraph; there are no placeholder texts.

## Camera behaviour

Selecting an item flies the camera to a good viewing angle for it. After the flight a slow, eased orbit continues around the selected component within a per-item range (narrower for the X-ray cutaway, none for the optics schematic). Dragging takes over immediately; the orbit resumes after a few seconds of inactivity. **Pause rotation** stops it.

## Adding or removing an item

1. Add or remove an entry in the `children` of its parent in `src/lib/server/explorerContent.js`: a unique `id`, a `scene` (plus `component` where needed), a `title` and its `blocks` (`lead`, `note` or `about` paragraphs), each text with `en` and `nl`. Copy a sibling as a template.
2. Numbers, child counts and heading levels follow from the position in the tree; there is nothing to renumber.
3. Run `npm run build` and `node scripts/verify/explorer.mjs`. The check reads the prerendered HTML and reports any mismatch in nesting, numbers, counts, heading levels or scene mapping.

Supported scenes: `satellite`, `satellite-component`, `instrument`, `instrument-component`, `optics`, `optical-path`, `optical-component`, `cad-parts`, `cad-part`. Satellite component ids are defined in `src/lib/scene/objects/Satellite.js`; instrument part ids in `src/lib/scene/objects/InstrumentComponents.js`.

## Responsive design

Layout follows the available space: a bottom sheet below 720 px, a side panel from 720 px, and a docked layout on dual-screen devices (Viewport Segments API, as progressive enhancement). Components adapt with container queries, and the explorer respects reduced motion, reduced transparency, increased contrast, forced colours and reduced data. See [`responsive-design.md`](responsive-design.md) for the tests, decisions and remaining work.

## Where the code lives

- `src/routes/technology/` – `+page.server.js` loads the explorer content and prerenders the page, `+page.svelte` composes it from components
- `src/lib/components/atoms/`, `molecules/` and `organisms/` – the explorer components, exported from `src/lib/index.js`
- `src/lib/state/` – explorer tree, navigation state (`explorer.svelte.js`), viewer state and language
- `src/lib/server/explorerContent.js` – the explorer content
- `src/lib/scene/` – renderer, camera, lighting, scene objects, markers and the viewer controller that connects the state to the 3D scene (plain JavaScript, independent of Svelte)
- `src/lib/styles/satellite-explorer.css` – the explorer styles, only active while the explorer page is open
- `src/lib/assets/models/` – `satellite/` and `instrument/` hold the runtime viewer GLBs, `cad/` the individual CAD parts and `source/` the source models used to build them
- `static/media/` – images used by the explorer

## Replacing supplied CAD models

The viewer loads `src/lib/assets/models/satellite/Satellite.viewer.glb` and `src/lib/assets/models/instrument/Instrument.viewer.glb`. They are generated from the source-colour GLBs in `src/lib/assets/models/source/` with `scripts/optimize-model.mjs`. Keep the source file names to preserve loading and interaction.

The satellite importer maps the component ids `xrayInstrument`, `starTrackerModule`, `dawn4UCubeDrive`, `sBandAntenna`, `sunSensor`, `magnetorquers` and `solarPanel` from the CAD hierarchy in `src/lib/scene/objects/Satellite.js`. Keep the corresponding group-name prefixes in the export, or update that mapping after verifying click selection.

## Checks

```sh
npm run build
npm run verify:satellite
```

`npm run verify:satellite` runs the scripts in `scripts/verify/`: viewer assets, models, optics, performance, motion detail, CAD transforms, the explorer hierarchy (read from the prerendered page, so build first) and the camera orbit.
