export function readExplorerItems(content) {
	const items = []
	const visit = (item) => {
		items.push({
			id: item.id,
			scene: item.scene,
			component: item.component ?? null,
			title: item.title,
			childIds: item.children.map((child) => child.id),
		})
		for (const child of item.children) visit(child)
	}
	visit(content)
	return items
}
