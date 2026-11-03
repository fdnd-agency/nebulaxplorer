import fs from 'node:fs/promises'
import assert from 'node:assert/strict'
import { createExplorerTree } from '../../src/lib/state/explorerTree.js'
import { explorerScenes } from '../../src/lib/scene/explorerScene.js'
import { opticalComponents } from '../../src/lib/scene/objects/OpticalComponents.js'
import { satelliteComponents } from '../../src/lib/scene/objects/Satellite.js'

const instrumentComponents = [
	'detectors',
	'baffles',
	'electronics',
	'calibration',
	'structure',
	'mounts',
	'support',
]
const voidElements = new Set(['img', 'meta', 'link', 'br', 'input', 'path'])
const page = await fs
	.readFile(
		new URL(
			'../../.svelte-kit/output/prerendered/pages/technology.html',
			import.meta.url,
		),
		'utf8',
	)
	.catch(() => {
		throw new Error('Run npm run build before verifying the explorer')
	})
const html = page.slice(page.indexOf('<main'), page.indexOf('</main>') + 7)
const attribute = (attributes, name) =>
	attributes.match(new RegExp(`(?:^|\\s)${name}(?:="([^"]*)")?(?=\\s|$)`))
		? (attributes.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`))?.[1] ??
			'')
		: null

const items = []
const itemStack = []
const elementStack = []
let capture = null
for (const match of html.matchAll(
	/<(\/?)([a-z0-9]+)([^>]*?)(\/?)>|([^<]+)/gi,
)) {
	const [, closing, tagName, rawAttributes = '', selfClosing, text] = match
	if (text !== undefined) {
		if (capture) capture.target[capture.key] += text
		continue
	}
	const tag = tagName.toLowerCase()
	const attributes = rawAttributes.trim()
	if (closing) {
		if (voidElements.has(tag)) continue
		const element = elementStack.pop()
		assert.equal(element.tag, tag, `unbalanced </${tag}>`)
		if (element.item) itemStack.pop()
		if (element.capture) capture = null
		continue
	}
	if (voidElements.has(tag) || selfClosing) continue
	const element = { tag }
	elementStack.push(element)
	const current = itemStack.at(-1)
	if (attribute(attributes, 'data-explorer-item') !== null) {
		const item = {
			id: attribute(attributes, 'id'),
			tag,
			scene: attribute(attributes, 'data-scene'),
			component: attribute(attributes, 'data-component'),
			parentId: current?.id ?? null,
			childIds: [],
			title: '',
			number: '',
			count: '',
			headingLevel: null,
			hasBody: false,
		}
		current?.childIds.push(item.id)
		items.push(item)
		itemStack.push(item)
		element.item = true
		continue
	}
	if (!current) continue
	const className = attribute(attributes, 'class') ?? ''
	if (className === 'explorer-node-heading')
		current.headingLevel ??= Number(tag.slice(1))
	if (className === 'explorer-node-body') current.hasBody = true
	const field =
		className === 'explorer-node-title' || className === 'explorer-title'
			? 'title'
			: className === 'explorer-list-number'
				? 'number'
				: className === 'explorer-list-meta'
					? 'count'
					: null
	if (field && !current[`${field}Done`]) {
		current[`${field}Done`] = true
		capture = { target: current, key: field }
		element.capture = true
	}
}
assert.equal(elementStack.length, 0, 'unclosed elements')

assert(items.length > 0, 'No explorer items found')
assert.equal(new Set(items.map((item) => item.id)).size, items.length)
const tree = createExplorerTree(items)
assert.equal(tree.rootId, 'satellite')
for (const item of items) {
	const title = item.title.trim()
	assert(title, `${item.id} has no title`)
	assert(explorerScenes.includes(item.scene), `${item.id}: unknown scene`)
	if (item.scene === 'satellite-component')
		assert(satelliteComponents.includes(item.component), item.id)
	if (item.scene === 'instrument-component')
		assert(instrumentComponents.includes(item.component), item.id)
	if (item.scene === 'optical-component')
		assert(item.component in opticalComponents, item.id)
	if (item.scene === 'cad-part')
		assert(opticalComponents[item.component]?.cadPart, item.id)
	if (item.id === tree.rootId) continue
	const depth = tree.getDepth(item.id)
	assert.equal(item.tag, 'li', `${item.id} must be a list item`)
	assert(item.hasBody, `${item.id} has no expandable body`)
	assert.equal(
		item.headingLevel,
		Math.min(depth + 2, 6),
		`${item.id} heading`,
	)
	assert.equal(
		item.number.replace(',', '').trim(),
		tree.getNumber(item.id),
		`${item.id} number`,
	)
	const children = tree.getChildren(item.id).length
	assert.equal(
		Number.parseInt(item.count, 10) || 0,
		children,
		`${item.id} child count`,
	)
}
assert.deepEqual(
	tree.getPath('instrument-detectors').map((item) => item.id),
	[
		'satellite',
		'xray-instrument',
		'instrument-components',
		'instrument-detectors',
	],
)
assert.equal(tree.getChildren('satellite').length, satelliteComponents.length)
for (const component of satelliteComponents)
	assert(tree.find('satellite-component', component), component)
for (const component of instrumentComponents)
	assert(tree.find('instrument-component', component), component)
assert(/role="status"[^>]*data-explorer-status/.test(page), 'status region')

console.log(
	JSON.stringify({
		items: items.length,
		depth: Math.max(...items.map((item) => tree.getDepth(item.id))),
		satelliteComponents: tree.getChildren('satellite').length,
		instrumentComponents: tree.getChildren('instrument-components').length,
		checks: 'balanced nested markup, unique ids, nesting defines hierarchy, scene mapping, heading levels, numbers, child counts, expandable bodies, status region',
	}),
)
