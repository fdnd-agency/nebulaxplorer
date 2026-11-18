///<reference types="vitest/config" /> 
import adapter from '@sveltejs/adapter-auto';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
// Images Footer.svelte links from src/ (see prerender below)
const footerImages = [
  '/src/lib/assets/logos/SRON_Academy_OnSpaceBlue-1024x422.png',
  '/src/lib/assets/logos/SRON_Full_White.webp',
  '/src/lib/assets/images/Social_Icon_BlueSky.png',
  '/src/lib/assets/images/Social_Icon_Instagram.png',
  '/src/lib/assets/images/Social_Icon_LinkedIn.png'
];
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    enhancedImages(), // must come before the SvelteKit plugin
    sveltekit({
    compilerOptions: {
      // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
      runes: ({
        filename
      }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
    },
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter(),
    prerender: {
      // The Technology page is prerendered so it works without JavaScript.
      // Footer.svelte links these five images from src/, which do not exist
      // after a build. Until the footer imports them, their 404 is reported as
      // a warning; every other error still fails the build.
      handleHttpError: ({ status, path, message }) => {
        if (status === 404 && footerImages.includes(path)) {
          console.warn(message)
          return
        }
        throw new Error(message)
      }
    }
  })],
  // The satellite explorer simplifies meshes in a module worker
  worker: {
    format: 'es'
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});