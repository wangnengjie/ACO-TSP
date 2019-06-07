module.exports = function initialize(matrix, m) {
	const firstNode = Number.parseInt(Math.random() * matrix.length);
	const reachedNode = new Set();
	let distance = 0;
	let nextNode = firstNode;
	reachedNode.add(firstNode);
	for (let i = 0; i < matrix.length - 1; i++) {
		const dis = Math.min(
			...matrix[nextNode].filter((dis, index) => !reachedNode.has(index))
		);
		distance += dis;
		nextNode = matrix[nextNode].indexOf(dis);
		reachedNode.add(nextNode);
	}
	distance += matrix[nextNode][firstNode];
	let pheromone = new Array(matrix.length)
		.fill(0)
		.map(() => new Array(matrix.length).fill((m * 100) / distance));
	for (let i = 0; i < matrix.length; i++) pheromone[i][i] = 0;
	return { pheromone, minDistance: distance, trace: reachedNode };
};
