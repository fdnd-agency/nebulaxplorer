import { explorerContent } from '$lib/server/explorerContent.js'

// The explorer works without JavaScript, so the page is rendered to static HTML
export const prerender = true

export function load() {
	return { explorerContent }
}
