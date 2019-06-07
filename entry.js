const initialize = require("./initialize");
const findTrace = require("./findTrace");

module.exports = async function entry(matrix) {
	const [m, alpha, beta, rho] = [25, 1.1, 1.1, 0.6577];
	const times = 200;
	let { pheromone, minDistance, trace } = initialize(matrix, m);
	const traceArray = [minDistance];
	console.log(minDistance);
	for (let i = 0; i < times; i++) {
		// 寻求路径
		const re = new Array(m).fill(0).map(async () => {
			return await findTrace(matrix, pheromone, alpha, beta);
		});
		// 信息素挥发
		pheromone = pheromone.map(v1 => v1.map(v2 => v2 * (1 - rho)));
		// 更新最优解以及信息素
		for (let i = 0; i < re.length; i++) re[i] = await re[i];
		re.sort((a, b) => a.distance - b.distance);
		if (minDistance > re[0].distance) {
			minDistance = re[0].distance;
			trace = re[0].reachedNode;
		}
		traceArray.push(re[0].distance);

		// if (
		// 	Math.abs(
		// 		traceArray[traceArray.length - 1] - traceArray[traceArray.length - 2]
		// 	) < 1
		// )
		// 	break;

		for (const r of re) {
			const { distance, reachedNode } = r;
			const concentration = 100 / distance;
			reachedNode.reduce((a, b) => {
				pheromone[a][b] += concentration;
				pheromone[b][a] += concentration;
				return b;
			});
		}
	}
	return [minDistance, trace, traceArray];
};
