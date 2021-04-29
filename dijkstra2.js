class Edge {
	constructor(weight) {
		this.weight = weight;
	}
}

class Graph {
	constructor(numOfNodes) {
		this.nodes = {};
	}

	addEdge(src, dest, weight) {
		const edge = new Edge(weight);
		if (!this.nodes[src]) {
			this.nodes[src] = [{ dest: dest, weight }];
			this.nodes[dest] = [{ dest: src, weight }];
			console.log('1', this.nodes);
		} else if (!this.nodes[dest]) {
			this.nodes[dest] = [{ dest: src, weight }];
			this.nodes[src] = [...this.nodes[src], { dest: dest, weight }];
		} else {
			this.nodes[src] = [...this.nodes[src], { dest: dest, weight }];
			this.nodes[dest] = [...this.nodes[dest], { dest: src, weight }];
			console.log('2', this.nodes);
		}
	}

	printGraph() {
		console.log(this.nodes);
	}
}

const myGraph = new Graph(5);
myGraph.addEdge('A', 'B', 2);
myGraph.addEdge('A', 'C', 3);
myGraph.addEdge('B', 'C', 4);

myGraph.printGraph();
