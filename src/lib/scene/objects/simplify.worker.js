import { MeshoptSimplifier } from 'meshoptimizer'
self.onmessage = async ({ data }) => {
	const { id, indices, positions, normals } = data
	try {
		await MeshoptSimplifier.ready
		const [result] = MeshoptSimplifier.simplifyWithAttributes(
			indices,
			positions,
			3,
			normals,
			3,
			[0.1, 0.1, 0.1],
			null,
			Math.floor((indices.length * 0.3) / 3) * 3,
			0.003,
			['LockBorder'],
		)
		self.postMessage({ id, indices: result }, [result.buffer])
	} catch {
		self.postMessage({ id })
	}
}
