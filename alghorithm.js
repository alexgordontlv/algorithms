class Node {
	constructor(data) {
		this.data = data;
		this.visited = false;
		this.dist = Number.MAX_SAFE_INTEGER;
		this.nextElement = null;
	}
}
class LinkedList {
	constructor() {
		this.head = null;
	}

	//Insertion At Head
	insertAtHead(newData) {
		let tempNode = new Node(newData);
		tempNode.nextElement = this.head;
		this.head = tempNode;
		return this; //returning the updated list
	}

	isEmpty() {
		return this.head == null;
	}

	//function to print the linked list
	printList() {
		if (this.isEmpty()) {
			console.log('Empty List');
			return false;
		} else {
			let temp = this.head;
			while (temp != null) {
				process.stdout.write(String(temp.data));
				process.stdout.write(' -> ');
				temp = temp.nextElement;
			}
			console.log('null');
			return true;
		}
	}

	getHead() {
		return this.head;
	}
	setHead(newHead) {
		this.head = newHead;
		return this;
	}
	getListStr() {
		if (this.isEmpty()) {
			console.log('Empty List');
			return 'null';
		} else {
			let st = '';
			let temp = this.head;
			while (temp != null) {
				st += String(temp.data);
				st += ' -> ';
				temp = temp.nextElement;
			}
			st += 'null';
			return st;
		}
	}
	insertAtTail(newData) {
		//Creating a new Node with data as newData
		let node = new Node(newData);

		//check for case when list is empty
		if (this.isEmpty()) {
			//Needs to Insert the new node at Head
			this.head = node;
			return this;
		}

		//Start from head
		let currentNode = this.head;

		//Iterate to the last element
		while (currentNode.nextElement != null) {
			currentNode = currentNode.nextElement;
		}

		//Make new node the nextElement of last node of list
		currentNode.nextElement = node;
		return this;
	}
	search(value) {
		//Start from the first element
		let currentNode = this.head;

		//Traverse the list until you find the value or reach the end
		while (currentNode != null) {
			if (currentNode.data == value) {
				return true; //value found
			}
			currentNode = currentNode.nextElement;
		}
		return false; //value not found
	}
	deleteAtHead() {
		//if list is empty, do nothing
		if (this.isEmpty()) {
			return this;
		}
		//Get the head and first element of the list
		let firstElement = this.head;

		//If list is not empty, link head to the nextElement of firstElement
		this.head = firstElement.nextElement;

		return this;
	}
	deleteVal(value) {
		let deleted = null; //True or False
		//Write code here

		//if list is empty return false
		if (this.isEmpty()) {
			return false;
		}

		//else get pointer to head
		let currentNode = this.head;
		// if first node's is the node to be deleted, delete it and return true
		if (currentNode.data == value) {
			this.head = currentNode.nextElement;
			return true;
		}

		// else traverse the list
		while (currentNode.nextElement != null) {
			// if a node whose next node has the value as data, is found, delete it from the list and return true
			if (currentNode.nextElement.data == value) {
				currentNode.nextElement = currentNode.nextElement.nextElement;
				return true;
			}
			currentNode = currentNode.nextElement;
		}
		//else node was not found, return false
		deleted = false;
		return deleted;
	}
	deleteAtTail() {
		// check for the case when linked list is empty
		if (this.isEmpty()) {
			return this;
		}
		//if linked list is not empty, get the pointer to first node
		let firstNode = this.head;
		//check for the corner case when linked list has only one element
		if (firstNode.nextElement == null) {
			this.deleteAtHead();
			return this;
		}
		//otherwise traverse to reach second last node
		while (firstNode.nextElement.nextElement != null) {
			firstNode = firstNode.nextElement;
		}
		//since you have reached second last node, just update its nextElement pointer to point at null, skipping the last node
		firstNode.nextElement = null;
		return this;
	}
}

class Graph {
	constructor(vertices) {
		//Total number of vertices in the graph
		this.vertices = vertices;
		//Array that holds linked lists equal to the number of vertices in the graph
		this.list = [];
		//Creating a new linked list for each vertice of the graph
		var it;
		for (it = 0; it < vertices; it++) {
			let temp = new LinkedList();
			temp.insertAtHead(it);
			this.list.push(temp);
		}
	}

	addEdge(source, destination) {
		if (source === destination) return null;
		if (this.list[source].search(destination)) return null;
		if (source < this.vertices && destination < this.vertices) {
			//insert for both vertex in the graph
			this.list[source].insertAtTail(destination);
			this.list[destination].insertAtTail(source);
		}
	}

	printGraph() {
		console.log('>>Adjacency List of UnDirected Graph<<');
		var i;
		for (i = 0; i < this.list.length; i++) {
			process.stdout.write('|' + String(i) + '| -> ');
			let temp = this.list[i].getHead();
			while (temp != null) {
				process.stdout.write('[' + String(temp.data) + '] -> ');
				temp = temp.nextElement;
			}
			console.log('null ');
		}
	}

	printHeads() {
		for (let i = 0; i < this.list.length; i++) {
			console.log(this.list[i].getHead());
		}
		return console.log(0);
	}

	haveNeighbours() {
		for (let i = 0; i < this.list.length; i++) {
			if (!this.list[i].getHead().nextElement) return console.log(1);
		}
		return console.log(0);
	}

	connectedGraph() {
		this.BreadthFirstSearch();
		for (let i = 0; i < this.list.length; i++) {
			if (!this.list[i].getHead().visited) return console.log('connected: ', 0);
		}
		return console.log('connected: ', 1);
	}

	graphDiameter() {
		this.BreadthFirstSearch();
		let maxDistNode = { node: null, dist: 0 };
		for (let i = 0; i < this.list.length; i++) {
			if (this.list[i].getHead().dist > maxDistNode.dist) {
				maxDistNode.node = i;
				maxDistNode.dist = this.list[i].getHead().dist;
			}
		}
		if (maxDistNode.dist === Number.MAX_SAFE_INTEGER) return console.log('Max distance is:', maxDistNode);
		this.printHeads();
		this.BreadthFirstSearch(maxDistNode.node);
		maxDistNode.node = null;
		maxDistNode.dist = 0;
		for (let i = 0; i < this.list.length; i++) {
			if (this.list[i].getHead().dist > maxDistNode.dist) {
				maxDistNode.node = i;
				maxDistNode.dist = this.list[i].getHead().dist;
			}
		}
		console.log('Max distance is:', maxDistNode);
	}

	BreadthFirstSearch(nodeNumber = 0) {
		const graph = this;
		for (let i = 0; i < graph.list.length; i++) {
			const currentNode = graph.list[i].getHead();
			currentNode.dist = Number.MAX_SAFE_INTEGER;
			currentNode.visited = false;
		}
		let queue = [];
		let firstNode = graph.list[nodeNumber].getHead();
		firstNode.dist = 0;
		let visited = new Set();
		queue.push(firstNode);
		while (queue.length > 0) {
			let currentNode = queue.shift();
			let temp = currentNode;
			while (temp) {
				temp.visited = true;
				let originalNode = graph.list[temp.data].getHead();
				originalNode.dist = Math.min(currentNode.dist + 1, originalNode.dist);
				!visited.has(temp.data) && queue.push(graph.list[temp.data].getHead());
				visited.add(temp.data);
				temp = temp.nextElement;
			}
		}
	}
}

function checkProbability(P, V, returning) {
	const computedPropability = Math.random();
	if (P >= computedPropability || returning) return Math.floor(Math.random() * V);
	return null;
}

const createGraph = (P, V) => {
	const res = checkProbability(P, V);
	if (!res) return console.log('not enoght luck, try again');
	const graph = new Graph(V);
	for (let i = 1; i < V + 1; i++) {
		const source = checkProbability(P, V, true);
		const destination = checkProbability(P, V, true);
		graph.addEdge(source, destination);
	}
	return graph;
};

// const graph = createGraph(0.4, 5);
// if (graph) {
// 	console.log(graph);
// 	BreadthFirstSearch(graph);
// 	// newGraph.printGraph();
// }

const testGraph = new Graph(5);
testGraph.addEdge(0, 1);
testGraph.addEdge(0, 2);
testGraph.addEdge(3, 1);
testGraph.addEdge(3, 4);
//testGraph.BreadthFirstSearch();
testGraph.connectedGraph();
testGraph.graphDiameter();
//testGraph.haveNeighbours();
