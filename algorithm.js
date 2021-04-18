const objectstocsv = require('objects-to-csv');

const fs = require('fs');

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
		//get the head of the list
		return this.head;
	}
	setHead(newHead) {
		//setting new head to the list
		this.head = newHead;
		return this;
	}

	insertAtTail(newData) {
		// insert in lists tail
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
		//first node is index -> next are linked listed seperated by: ==>
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
		//printing the heads of each linked list int the grapgh(print all verticles)
		for (let i = 0; i < this.list.length; i++) {
			console.log(this.list[i].getHead());
		}
		return console.log(0);
	}

	isIsolated() {
		//checking if there is a head withoud followers
		for (let i = 0; i < this.list.length; i++) {
			if (!this.list[i].getHead().nextElement) return true;
		}
		return false;
	}

	connectedGraph() {
		//after BFS if someone have not get a visit : not connected
		this.BreadthFirstSearch();
		for (let i = 0; i < this.list.length; i++) {
			if (!this.list[i].getHead().visited) return false;
		}
		return true;
	}

	graphDiameter() {
		//BFS from
		this.BreadthFirstSearch();
		let maxDistNode = { node: null, dist: 0 };
		for (let i = 0; i < this.list.length; i++) {
			if (this.list[i].getHead().dist > maxDistNode.dist) {
				maxDistNode.node = i;
				maxDistNode.dist = this.list[i].getHead().dist;
			}
		}
		if (maxDistNode.dist === Number.MAX_SAFE_INTEGER) return maxDistNode.dist;
		this.BreadthFirstSearch(maxDistNode.node);
		maxDistNode.node = null;
		maxDistNode.dist = 0;
		for (let i = 0; i < this.list.length; i++) {
			if (this.list[i].getHead().dist > maxDistNode.dist) {
				maxDistNode.node = i;
				maxDistNode.dist = this.list[i].getHead().dist;
			}
		}
		return maxDistNode.dist;
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

function checkProbability(n) {
	return !!n && Math.random() <= n;
}

const createGraph = (P, V) => {
	//foreach 2 possible vertex check possibility for an edge
	const graph = new Graph(V);
	for (let i = 0; i < V + 1; i++) {
		for (let j = i + 1; j < V; j++) {
			const res = checkProbability(P);
			//console.log('computing probability for: ', i, ' ', j, ' =>', res);
			res && graph.addEdge(i, j);
		}
	}
	return graph;
};

const threshold1 = Math.log(1000) / 1000;
const threshold2 = Math.sqrt((2 * Math.log(1000)) / 1000);

const getTreshHoldAray = (threshold) => {
	const thresholdArray = new Array(10);
	for (let i = 0; i < thresholdArray.length; i++) {
		thresholdArray[i] = ((i + 1) * 2 * threshold) / 10.1;
	}
	return thresholdArray;
};

const createTable1 = (thresholdArray) => {
	const table = [];
	const graphNumber = 500;
	for (let i = 0; i < thresholdArray.length; i++) {
		let isConnectedCounter = 0;
		let isIsolatedCounter = 0;
		let diamCounter = 0;
		for (j = 0; j < graphNumber; j++) {
			const myGraph = createGraph(thresholdArray[i], 1000);
			myGraph.connectedGraph() && isConnectedCounter++;
			myGraph.isIsolated() && isIsolatedCounter++;
		}
		table.push({ probability: thresholdArray[i], connected: isConnectedCounter / graphNumber, isolated: isIsolatedCounter / graphNumber });
	}
	return table;
};

const createTable2 = (thresholdArray) => {
	const table = [];
	const graphNumber = 500;
	for (let i = 0; i < thresholdArray.length; i++) {
		let diamCounter = 0;
		for (j = 0; j < graphNumber; j++) {
			const myGraph = createGraph(thresholdArray[i], 1000);
			myGraph.graphDiameter() <= 2 && diamCounter++;
		}
		table.push({ probability: thresholdArray[i], diam: diamCounter / graphNumber });
	}
	return table;
};

const thresholdArray1 = getTreshHoldAray(threshold1);
const answer = createTable1(thresholdArray1);
console.table(answer);
let csv = new objectstocsv(answer);
csv.toDisk('./result1.csv');

const thresholdArray2 = getTreshHoldAray(threshold2);
const answer2 = createTable2(thresholdArray2);
let csv2 = new objectstocsv(answer2);
csv2.toDisk('./result2.csv');
console.table(answer2);
