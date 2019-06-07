const fs = require("fs");
const readline = require("readline");
const entry = require("./entry");
const nodeMap = [];
const tspFile = fs.createReadStream("./matrix.txt");
const tspReadline = readline.createInterface({
	input: tspFile
});

tspReadline.on("line", line => {
	nodeMap.push(line.split(" ").map(num => Number.parseInt(num)));
});

tspReadline.on("close", async () => {
	const [distance, trace, traceArray] = await entry(nodeMap);
	const resultFile = fs.createWriteStream("./result.txt");
	resultFile.write(distance.toString()+"\n");
	resultFile.write(trace.toString()+"\n");
	resultFile.write(traceArray.toString());
	// const best = [
	// 	1,
	// 	8,
	// 	38,
	// 	31,
	// 	44,
	// 	18,
	// 	7,
	// 	28,
	// 	6,
	// 	37,
	// 	19,
	// 	27,
	// 	17,
	// 	43,
	// 	30,
	// 	36,
	// 	46,
	// 	33,
	// 	20,
	// 	47,
	// 	21,
	// 	32,
	// 	39,
	// 	48,
	// 	5,
	// 	42,
	// 	24,
	// 	10,
	// 	45,
	// 	35,
	// 	4,
	// 	26,
	// 	2,
	// 	29,
	// 	34,
	// 	41,
	// 	16,
	// 	22,
	// 	3,
	// 	23,
	// 	14,
	// 	25,
	// 	13,
	// 	11,
	// 	12,
	// 	15,
	// 	40,
	// 	9
	// ];
	// let bestResult = 0;
	// best.reduce((a, b) => {
	// 	bestResult += nodeMap[a - 1][b - 1];
	// 	return b;
	// });
});
