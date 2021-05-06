class Edge {
	constructor(weight) {
		this.weight = weight;
	}
}
const infinity = Number.MAX_SAFE_INTEGER;
class Graph {
	constructor() {
		this.nodes = {};
	}

	addEdge(src, dest, weight) {
		if (!this.nodes[src]) {
			this.nodes[src] = [{ dest: dest, weight }];
			this.nodes[dest] = [{ dest: src, weight }];
		} else if (!this.nodes[dest]) {
			this.nodes[dest] = [{ dest: src, weight }];
			this.nodes[src] = [...this.nodes[src], { dest: dest, weight }];
		} else {
			this.nodes[src] = [...this.nodes[src], { dest: dest, weight }];
			this.nodes[dest] = [...this.nodes[dest], { dest: src, weight }];
		}
	}

	printGraph() {
		console.log(this.nodes);
	}
}

const dijkstra = (graph, startNode) => {
	if (!(startNode in graph.nodes)) return 'no such node';
	const Queue = [startNode];
	while (Queue.length > 0) {
		let currentNode = Queue.shift();
		for (let i = 0; i < currentNode.length; i++) {
			//	if()
		}
	}
};

const myGraph = new Graph(5);
myGraph.addEdge('A', 'B', 2);
myGraph.addEdge('A', 'C', 3);
myGraph.addEdge('B', 'C', 4);

myGraph.printGraph();
// console.log(dijkstra(myGraph, 'c'));
