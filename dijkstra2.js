class Node {
	constructor() {
		this.distance = Number.MAX_SAFE_INTEGER;
		this.edges = [];
	}
}
const indinity = Number.MAX_SAFE_INTEGER;
class Graph {
	constructor() {
		this.nodes = {};
	}

	addEdge(src, dest, weight) {
		if (src == dest) return;
		if (!this.nodes[src]) {
			this.nodes[src] = { dist: indinity, edges: [{ dest: dest, weight }] };
			if (!this.nodes[dest]) {
				this.nodes[dest] = { dist: indinity, edges: [{ dest: src, weight }] };
			} else {
				this.nodes[dest].edges = [...this.nodes[dest].edges, { dest: src, weight }];
			}
		} else if (!this.nodes[dest]) {
			this.nodes[dest] = { dist: indinity, edges: [{ dest: src, weight }] };
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

const dijkstra = (graph, startNode) => {
	if (!(startNode in graph.nodes)) return 'no such node';
	graph.nodes[startNode].dist = 0;
	const Queue = [graph.nodes[startNode]];
	const visited = new Set();
	while (Queue.length > 0) {
		let currentNode = Queue.shift();
		visited.add(currentNode);
		console.log(currentNode);
		for (let node of currentNode.edges) {
			let shoretsDistance = Math.min(node.weight + currentNode.dist, graph.nodes[node.dest].dist);
			graph.nodes[node.dest].dist = shoretsDistance;
			if (!visited.has(graph.nodes[node.dest])) Queue.push(graph.nodes[node.dest]);
		}
	}
};

const myGraph = new Graph(5);
myGraph.addEdge('START', 'A', 5);
myGraph.addEdge('START', 'B', 2);
myGraph.addEdge('A', 'C', 4);
myGraph.addEdge('A', 'D', 2);
myGraph.addEdge('B', 'A', 8);
myGraph.addEdge('B', 'D', 7);
myGraph.addEdge('C', 'D', 6);
myGraph.addEdge('C', 'FINISH', 3);
myGraph.addEdge('D', 'FINISH', 1);
//myGraph.printGraph();
dijkstra(myGraph, 'START');
myGraph.printGraph();
