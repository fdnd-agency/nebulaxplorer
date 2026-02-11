export const getPaginationItems = (currentPage, totalPages) => {
	// If 5 or fewer pages, show all
	if (totalPages <= 5) {
		return Array.from({ length: totalPages }, (_, i) => i + 1)
	}

	const items = []

	// Near the beginning (pages 1-3)
	if (currentPage <= 3) {
		items.push(1, 2, 3)
		items.push('-')
		items.push(totalPages)
		return items
	}

	// Near the end (last 3 pages)
	if (currentPage >= totalPages - 2) {
		items.push(1)
		items.push('-')
		items.push(totalPages - 2, totalPages - 1, totalPages)
		return items
	}

	// In the middle - show current with neighbors
	items.push(1)
	items.push('-')
	items.push(currentPage - 1, currentPage, currentPage + 1)
	items.push('-')
	items.push(totalPages)

	return items
}
