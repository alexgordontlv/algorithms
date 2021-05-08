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
		for (let i = 0; i < currentNode.edges.length; i++) {
			let shoretsDistance = Math.min(currentNode.edges[i].weight + currentNode.dist, graph.nodes[currentNode.edges[i].dest].dist);
			graph.nodes[currentNode.edges[i].dest].dist = shoretsDistance;
			if (!visited.has(graph.nodes[currentNode.edges[i].dest])) Queue.push(graph.nodes[currentNode.edges[i].dest]);
		}
	}
};

const myGraph = new Graph(5);
myGraph.addEdge('A', 'B', 6);
myGraph.addEdge('A', 'D', 1);
myGraph.addEdge('D', 'B', 2);
myGraph.addEdge('B', 'C', 5);
myGraph.addEdge('D', 'E', 1);
myGraph.addEdge('B', 'E', 2);
myGraph.addEdge('E', 'C', 5);

//myGraph.printGraph();
dijkstra(myGraph, 'A');
myGraph.printGraph();
