class Node {
	constructor() {
		this.distance = Number.MAX_SAFE_INTEGER;
		this.edges = [];
	}
}
const infinity = Number.MAX_SAFE_INTEGER;
class Graph {
	constructor() {
		this.nodes = {};
	}

	addEdge(src, dest, weight) {
		if (src == dest) return;
		if (!this.nodes[src]) {
			this.nodes[src] = { dist: infinity, edges: [{ dest: dest, weight }] };
			if (!this.nodes[dest]) {
				this.nodes[dest] = { dist: infinity, edges: [{ dest: src, weight }] };
			} else {
				this.nodes[dest].edges = [...this.nodes[dest].edges, { dest: src, weight }];
			}
		} else if (!this.nodes[dest]) {
			this.nodes[dest] = { dist: infinity, edges: [{ dest: src, weight }] };
			this.nodes[src].edges = [...this.nodes[src].edges, { dest: dest, weight }];
		} else {
			this.nodes[src].edges = [...this.nodes[src].edges, { dest: dest, weight }];
			this.nodes[dest].edges = [...this.nodes[dest].edges, { dest: src, weight }];
		}
	}

	printGraph() {
		for (let node in this.nodes) {
			console.log(node, '=>', this.nodes[node]);
		}
	}
}

const dijkstra = (graph, startNode, finishNode) => {
	if (!(startNode in graph.nodes)) return 'no such node';
	graph.nodes[startNode].dist = 0;
	const Queue = [graph.nodes[startNode]];
	const visited = new Set();
	while (Queue.length > 0) {
		let currentNode = Queue.shift();
		visited.add(currentNode);
		for (let node of currentNode.edges) {
			let shoretsDistance = Math.min(node.weight + currentNode.dist, graph.nodes[node.dest].dist);
			graph.nodes[node.dest].dist = shoretsDistance;
			if (!visited.has(graph.nodes[node.dest])) Queue.push(graph.nodes[node.dest]);
		}
	}
	return { 'shortest distance to finish': graph.nodes[finishNode].dist };
};

const myGraph = new Graph(5);
myGraph.addEdge('START', 'A', 16);
myGraph.addEdge('START', 'B', 13);
myGraph.addEdge('A', 'C', 12);
myGraph.addEdge('A', 'B', 10);
myGraph.addEdge('B', 'A', 4);
myGraph.addEdge('B', 'D', 14);
myGraph.addEdge('C', 'B', 9);
myGraph.addEdge('D', 'C', 7);
myGraph.addEdge('C', 'FINISH', 20);
myGraph.addEdge('D', 'FINISH', 4);

const res = dijkstra(myGraph, 'START', 'FINISH');
console.log(res);
//myGraph.printGraph();
