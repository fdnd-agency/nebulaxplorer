// Renders the satellite image used without JavaScript and in data saver mode
// from the 3D viewer itself (no interface, reduced motion, so the camera stays
// at its starting angle) and saves it in several widths as WebP.
// Run `npm run build` and `npm run preview -- --port 5294` first.
import fs from 'node:fs/promises'
import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://localhost:5294/technology'
const output = new URL('../static/media/', import.meta.url)
const widths = [3200, 2400, 1600, 960]

// A visible window uses the graphics card; the flags keep it rendering while
// it is behind other windows
const browser = await chromium.launch({
	channel: 'chrome',
	headless: false,
	args: [
		'--disable-backgrounding-occluded-windows',
		'--disable-renderer-backgrounding',
		'--disable-background-timer-throttling',
	],
})
const context = await browser.newContext({
	viewport: { width: 1600, height: 900 },
	deviceScaleFactor: 2,
	reducedMotion: 'reduce',
})
const page = await context.newPage()
await page.goto(url)
await page.bringToFront()
await page.waitForFunction(
	() =>
		document
			.querySelector('.satellite-page')
			?.classList.contains('js-enhanced') &&
		!document.querySelector('.viewer')?.classList.contains('is-loading'),
	null,
	{ timeout: 60000 },
)
await page.addStyleTag({
	content:
		'body > div > header, .viewer-visible-area, .viewer-markers, .explorer { visibility: hidden !important; }',
})
await page.waitForTimeout(6000)
const png = await page.locator('#app').screenshot()

// The browser encodes the WebP files, so no image tools are needed
const files = await page.evaluate(
	async ({ data, widths }) => {
		const image = new Image()
		image.src = `data:image/png;base64,${data}`
		await image.decode()
		return widths.map((width) => {
			const canvas = document.createElement('canvas')
			canvas.width = width
			canvas.height = Math.round((image.height / image.width) * width)
			const context = canvas.getContext('2d')
			context.imageSmoothingQuality = 'high'
			context.drawImage(image, 0, 0, canvas.width, canvas.height)
			return {
				width,
				data: canvas.toDataURL('image/webp', 0.86).split(',')[1],
			}
		})
	},
	{ data: png.toString('base64'), widths },
)
for (const { width, data } of files) {
	const name = `satellite-overview-${width}.webp`
	const buffer = Buffer.from(data, 'base64')
	await fs.writeFile(new URL(name, output), buffer)
	console.log(name, `${Math.round(buffer.length / 1024)} KB`)
}
await browser.close()
