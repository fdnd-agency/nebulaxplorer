import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

// A plain Vite page outside SvelteKit that loads the viewer's own scene modules
export default defineConfig({
	root: fileURLToPath(new URL('.', import.meta.url)),
	publicDir: fileURLToPath(new URL('../../static', import.meta.url)),
	server: {
		port: 5296,
		strictPort: true,
		fs: { allow: [fileURLToPath(new URL('../..', import.meta.url))] },
	},
})
