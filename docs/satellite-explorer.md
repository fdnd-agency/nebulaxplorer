# Satellite explorer

The 3D satellite explorer lives on the `/technology` page. It is built with Svelte 5 and Three.js and follows the folder structure in [`CONTRIBUTING.md`](../CONTRIBUTING.md).

The `/technology` page of the site shows the 3D model of the satellite in a section one screen high, below the site's header and hero and above its footer. **Explore satellite** opens the explorer: a panel on the left on desktop, a bottom sheet with peek and expanded states on mobile. Inside the section only the explorer content scrolls; the page around it scrolls as usual. The mouse wheel scrolls the page; Ctrl or ⌘ with the wheel (or pinching on a trackpad) zooms the model. On touch screens a vertical swipe scrolls the page, a sideways swipe rotates and pinching zooms.

The page uses the site's layout: its header and navigation (the **Technology** link), hero, locations and footer, and its colours, fonts and focus style (`stylesheet.css`). The explorer's own styles in `satellite-explorer.css` start from `.satellite-page`, so they do not change the rest of the site, also after visiting the page. The NL/EN switch only changes the explorer and sets `lang` on its section. The explorer's state is kept on that section too (`js`, `js-enhanced` and `data-layout` on `.satellite-page`), not on `<html>`.

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

All content lives in `src/lib/server/explorerContent.js` (English and Dutch side by side). `src/routes/technology/+page.server.js` loads it and SvelteKit prerenders it into one nested semantic list: every item is an `<li data-explorer-item>` with a heading containing a real link, a body with its confirmed description, and a nested `<ol>` of its parts. Without JavaScript or WebGL the page is an exhibit with the same hierarchy, numbering and links (see [The page without JavaScript](#the-page-without-javascript)). Every item is deep-linkable through its id, for example `/technology#instrument-detectors`.

With JavaScript Svelte hydrates the same HTML into the explorer, and the 3D model enhances it:

- item links expose `aria-expanded` and `aria-controls`; collapsed parts are inert, so they are skipped by keyboard and screen readers
- the selected item is marked with `aria-current`, and selections are announced through a status message ("05, Sun Sensor, selected")
- the canvas is a single labelled image; the numbered markers on the model are hidden from assistive technology because the matching links carry the same action
- Escape moves up one level inside the explorer and closes it at the top level
- controls expose their state (`aria-expanded`, `aria-pressed`) and change their label where the action changes
- `prefers-reduced-motion` removes camera flights, the ambient orbit, expand animations and the X-ray animation

## Linking to a component

Every item can be opened with a normal link to its id, from this page or from any other page of the site. The main satellite components are:

| Component | Link |
| --- | --- |
| X-Ray Instrument | `/technology#x-ray-instrument` |
| Star Tracker Module | `/technology#star-tracker` |
| Dawn 4U CubeDrive | `/technology#dawn-4u-cubedrive` |
| S-Band Antenna | `/technology#s-band-antenna` |
| Sun Sensor | `/technology#sun-sensor` |
| Magnetorquers | `/technology#magnetorquers` |
| Solar Panel | `/technology#solar-panel` |

The HTML and the 3D viewer talk through the URL hash and the selected item:

- a link to `#sun-sensor` (in the explorer, in a menu on the page or on another page) selects the Sun Sensor: the list expands to it, the model highlights it, the camera flies to it and the right view (satellite, instrument, schematic or CAD part) is shown
- clicking the model or a marker selects the item the same way, updates the hash and marks the item in the list with `aria-current`
- Back and Forward move through earlier selections

Without JavaScript the same link opens the item on the page and scrolls to it. The earlier ids `#xray-instrument` and `#star-tracker-module` still work and are replaced by the current ones (`aliases` in `explorerContent.js`).

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

- `src/routes/technology/` – `+page.server.js` loads the explorer content and prerenders the page, `+page.svelte` passes it to the `SatelliteExplorer` organism
- `src/lib/components/atoms/`, `molecules/` and `organisms/` – the explorer components, exported from each folder's `index.js`
- `src/lib/state/` – explorer tree, navigation state (`explorer.svelte.js`), viewer state and language
- `src/lib/server/explorerContent.js` – the explorer content
- `src/lib/scene/` – renderer, camera, lighting, scene objects, markers and the viewer controller that connects the state to the 3D scene (plain JavaScript, independent of Svelte)
- `src/lib/styles/satellite-explorer.css` – the explorer styles, built on the site's tokens and scoped to `.satellite-page`
- `src/lib/assets/models/` – `satellite/` and `instrument/` hold the runtime viewer GLBs, `cad/` the individual CAD parts and `source/` the source models used to build them
- `static/media/` – images used by the explorer

## The page without JavaScript

Without JavaScript (or without WebGL) the same content reads as an exhibit. A first-time visitor should see what spacecraft this is, which part they are looking at and what it does:

- **Opening.** The name and one plain sentence ("NEBULA Xplorer is a student-driven satellite mission with an X-ray instrument on board"), the **Explore 7 components** button and the whole satellite: beside the name on large screens, below it on phones. The satellite sways slowly (±10°) in an animated AVIF in a `<picture>`, so it plays without JavaScript and without player controls. Phones get an upright composition with both panel tips in frame. The animation only downloads with `(scripting: none) and (prefers-reduced-motion: no-preference)`; with reduced motion, and for visitors with JavaScript, only the still is shown.
- **Components by name.** The seven main components are a list of rows with a close-up thumbnail and the name (on large screens also the sentence about what it does). Following a row's link opens it in place with CSS `:target`, so it works without JavaScript and every component keeps its deep link (`/technology#sun-sensor`). **All components** closes it again.
- **On the spacecraft and Close-up.** An opened component starts with one short sentence from its approved text, then two views with the same name above both: the whole satellite with the component outlined in cool blue, the rest dimmed and a labelled pointer (so colour is never the only clue), and an isolated close-up on a quiet studio backdrop. Internal hardware is shown in a cutaway: only the hull panels between the camera and the part are hidden. Large screens show both views side by side; small screens choose one with native radio buttons ("On the spacecraft" / "Close-up"), and browsers without `:has()` show both, one above the other.
- **The X-ray instrument.** Its branch "Instrument components" starts open with a map of how the seven groups of parts fit together (numbered labels beside the instrument, with a line to each part). Each part opens like a main component, with its place inside the opened instrument (the other parts see-through) and a close-up.
- The deeper branches (optics, mirror and X-ray path, CAD parts) are native `<details>`; a link to a part inside one opens it in browsers that support it (tested in Chrome; browsers without that support leave the branch closed).
- Texts that tell visitors to select or rotate something have a `withoutScript` version in `explorerContent.js`. The one-sentence summary is the first sentence of the approved text (the second for the Star Tracker); the X-ray instrument's combines the approved descriptions of the optics and detectors. That sentence is left out of the text below it.

All images are rendered from the viewer's own scene modules, so they use the same models, CAD colours, component mapping and lighting as the 3D view. `scripts/render-stills/jobs.js` lists what each image shows and from which side. After changing a model, render them again (this starts its own local server and a Chrome window):

```sh
node scripts/render-stills.mjs stills
node scripts/render-stills.mjs locations
node scripts/render-stills.mjs hero
```

- `stills` writes the close-ups to `static/media/components/`
- `locations` writes the "On the spacecraft" views to `static/media/locations/`, the instrument map, and the label positions to `src/lib/server/componentViews.js` (measured from the render: the largest visible area of the outlined part)
- `hero` writes the stills to `static/media/hero/` and the frames of both loops to `.svelte-kit/render-frames/satellite/` and `.svelte-kit/render-frames/satellite-tall/`. Encode them with ffmpeg:

```sh
ffmpeg -framerate 24 -i .svelte-kit/render-frames/satellite/frame-%04d.jpg -c:v libaom-av1 -crf 34 -b:v 0 -cpu-used 6 -row-mt 1 -pix_fmt yuv420p -loop 0 static/media/hero/satellite-turn.avif
ffmpeg -framerate 24 -i .svelte-kit/render-frames/satellite-tall/frame-%04d.jpg -c:v libaom-av1 -crf 34 -b:v 0 -cpu-used 6 -row-mt 1 -pix_fmt yuv420p -loop 0 static/media/hero/satellite-tall-turn.avif
```

The data saver poster (`static/media/satellite-overview-*.webp`) is rendered with `node scripts/render-poster.mjs` while `npm run preview -- --port 5294` runs.

## Replacing supplied CAD models

The viewer loads `src/lib/assets/models/satellite/Satellite.viewer.glb` and `src/lib/assets/models/instrument/Instrument.viewer.glb`. They are generated from the source-colour GLBs in `src/lib/assets/models/source/` with `scripts/optimize-model.mjs`. Keep the source file names to preserve loading and interaction.

The satellite importer maps the component ids `xrayInstrument`, `starTrackerModule`, `dawn4UCubeDrive`, `sBandAntenna`, `sunSensor`, `magnetorquers` and `solarPanel` from the CAD hierarchy in `src/lib/scene/objects/Satellite.js`. Keep the corresponding group-name prefixes in the export, or update that mapping after verifying click selection.

## Checks

```sh
npm run build
npm run verify:satellite
```

`npm run verify:satellite` runs the scripts in `scripts/verify/`: viewer assets, models, optics, performance, motion detail, CAD transforms, the explorer hierarchy (read from the prerendered page, so build first) and the camera orbit.
