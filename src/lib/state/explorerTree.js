export function formatItemNumber(index) {
	return String(index + 1).padStart(2, '0')
}

export function createExplorerTree(items) {
	const itemsById = new Map(
		items.map((item) => [item.id, { ...item, parentId: null }]),
	)
	for (const item of itemsById.values()) {
		item.childIds = item.childIds.filter((childId) =>
			itemsById.has(childId),
		)
		for (const childId of item.childIds) {
			const child = itemsById.get(childId)
			child.parentId ??= item.id
		}
	}
	const rootId = items[0]?.id ?? null

	function get(id) {
		return itemsById.get(id) ?? null
	}

	function getParent(id) {
		return get(get(id)?.parentId)
	}

	function getChildren(id) {
		return (get(id)?.childIds ?? []).map(get)
	}

	function getSiblings(id) {
		const parent = getParent(id)
		return parent ? getChildren(parent.id) : []
	}

	function getIndex(id) {
		return getSiblings(id).findIndex((item) => item.id === id)
	}

	function getPath(id) {
		const path = []
		for (let item = get(id); item; item = getParent(item.id))
			path.unshift(item)
		return path
	}

	return {
		rootId,
		get,
		getChildren,
		getIndex,
		getParent,
		getPath,
		getSiblings,
		has: (id) => itemsById.has(id),
		getDepth: (id) => getPath(id).length - 1,
		getNumber(id) {
			const index = getIndex(id)
			return index < 0 ? null : formatItemNumber(index)
		},
		find(scene, component) {
			for (const item of itemsById.values())
				if (item.scene === scene && item.component === component)
					return item
			return null
		},
	}
}
