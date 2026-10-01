import { sveltekit } from '@sveltejs/kit/vite'
import { enhancedImages } from '@sveltejs/enhanced-img'
import { defineConfig } from 'vite'

// https://svelte.dev/docs/kit/images
export default defineConfig({
	plugins: [enhancedImages(), sveltekit()],
	ssr: {
		// Bundle these into the server build instead of resolving them
		// from node_modules at runtime (avoids missing-package crashes
		// in the Netlify function).
		noExternal: ['gsap', 'three'],
	},
})