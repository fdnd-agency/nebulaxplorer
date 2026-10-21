# Project Conventions

## General

- Group files by responsibility:
  - `src/app/` contains viewer state and application-level state definitions.
  - `src/ui/` contains DOM bindings and UI behavior, including selection, language, and status updates.
  - `src/scene/` contains Three.js setup, rendering, controls, lighting, camera behavior, and scene objects.
  - `src/assets/` contains application assets. Organize models under `src/assets/models/` by role: `cad/`, `satellite/`, `instrument/`, or `source/`.
  - `scripts/` contains development and asset-processing scripts, not model binaries.
- Keep `src/main.js` as the application entry point and orchestration layer. Put reusable behavior in the module that owns that responsibility.
- Keep application state separate from DOM bindings and UI updates.
- Load optional view code and model assets on demand when they are only needed after a view is selected.
- Preserve existing behavior when moving or reorganizing files, and update all imports and asset paths affected by the move.
- Before completing JavaScript or model-path changes, run the production build and relevant verification scripts. The full project checks are:

  ```sh
  npm run build
  node verify-models.mjs
  node verify-optics.mjs
  node verify-performance.mjs
  ```

## JavaScript

### Formatting

Follow `.prettierrc.json`:

- Use single quotes.
- Omit optional statement-ending semicolons.
- Indent with tabs; the configured tab width is 4.
- Give statements room; do not place multiple instructions on one line.

Check formatting with:

```sh
npx prettier --check "src/**/*.{js,mjs}" "scripts/**/*.{js,mjs}" "verify-*.mjs"
```

### Structure and naming

- Use descriptive, domain-specific names such as `viewerState`, `createViewerState`, `createDomBindings`, and `setViewerMode`.
- Use `camelCase` for variables and functions.
- Name functions for their action or result, following established verbs such as `create`, `load`, `show`, `update`, `set`, `get`, and `bind`.
- Keep functions focused on one responsibility; avoid adding unrelated work to the main orchestration module.
- Use `viewer` terminology for implementation identifiers and selectors. Reserve “experience” for ordinary user-facing prose.
- Keep JavaScript free of explanatory inline comments for now. JSDoc will be added in a later documentation pass.

### Assets and loading

- Store GLB files under `src/assets/models/`, categorized by their role; do not put model binaries in `scripts/`.
- Resolve bundled model assets relative to the importing module with `new URL(path, import.meta.url)`.
- Use dynamic imports and asynchronous model loaders for optional modules and assets that are only needed after a view is selected.
