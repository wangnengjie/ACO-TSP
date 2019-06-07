module.exports = async function findTrace(matrix, pheromone, alpha, beta) {
	const firstNode = Number.parseInt(Math.random() * matrix.length);
	const reachedNode = new Set();
	const nodeList = new Array(matrix.length).fill(0).map((v, i) => i);
	let distance = 0;
	let nextNode = firstNode;
	reachedNode.add(firstNode);

	for (let i = 0; i < matrix.length - 1; i++) {
		// 计算分母
		let b = 0;
		for (const v of nodeList.filter(v => !reachedNode.has(v)))
			b += pheromone[nextNode][v] ** alpha * (1 / matrix[nextNode][v]) ** beta;
		// 计算概率
		const pArray = nodeList.map(async v => {
			if (reachedNode.has(v)) return 0;
			return (
				(pheromone[nextNode][v] ** alpha * (1 / matrix[nextNode][v]) ** beta) /
				b
			);
		});
		// 轮盘赌法
		for (let i = 0, value = 0, random = Math.random(); i < pArray.length; i++) {
			value += await pArray[i];
			if (value > random) {
				nextNode = i;
				reachedNode.add(i);
				break;
			}
		}
	}
	// 计算距离
	[...reachedNode].reduce((a, b) => {
		distance += matrix[a][b];
		return b;
	});
	distance += matrix[nextNode][firstNode];

	return { distance, reachedNode: [...reachedNode] };
};
