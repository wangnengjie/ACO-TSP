const fs = require("fs");
const readline = require("readline");
const os = require("os");

const tspFile = fs.createReadStream("./att48.tsp");
const tspReadline = readline.createInterface({
	input: tspFile
});

const resultFile = fs.createWriteStream("./matrix.txt");

const node = [];
const nodeMap = new Array(48).fill(0).map(() => new Array(48));

tspReadline.on("line", line => {
	const arr = line.split(" ");
	node.push([Number.parseInt(arr[1]), Number.parseInt(arr[2])]);
});
tspReadline.on("close", () => {
	for (let i = 0; i < node.length; i++)
		for (let j = 0; j < node.length; j++)
			nodeMap[i][j] = Math.ceil(
				Math.sqrt(
					(node[i][0] - node[j][0]) ** 2 + (node[i][1] - node[j][1]) ** 2
				)
			);

	for (let i = 0; i < nodeMap.length; i++) {
		resultFile.write(nodeMap[i].join(" ") + os.EOL);
	}
});
