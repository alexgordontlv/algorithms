class TreeNode {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class BinarySearchTree {
	constructor() {
		this.root = null;
	}
	recursiveInsert(node, val) {
		if (val > node.value && node.right) {
			this.recursiveInsert(node.right, val);
		}
		if (val <= node.value && node.left) {
			this.recursiveInsert(node.left, val);
		}
		if (val > node.value && !node.right) {
			node.right = new TreeNode(val);
		} else if (val <= node.value && !node.left) {
			node.left = new TreeNode(val);
		}
	}
	recursiveLookup(node, val) {
		if (val > node.value && node.right) {
			return this.recursiveLookup(node.right, val);
		}
		if (val < node.value && node.left) {
			return this.recursiveLookup(node.left, val);
		}
		if (val === node.value) {
			return node;
		} else {
			return null;
		}
	}
	recursiveRemove(node, val, prevnode) {
		if (val > node.value && node.right) {
			return this.recursiveRemove(node.right, val, node);
		}
		if (val < node.value && node.left) {
			return this.recursiveRemove(node.left, val, node);
		}
		if (val === node.value) {
			console.log('remove node', prevnode);
			if (!node.left && !node.right) {
				prevnode.left.value = node.value ? (prevnode.left = null) : (prevnode.right = null);
			}
			if (!node.right && node.left) {
				prevnode.left.value = node.value ? (prevnode.left = node.left) : (prevnode.right = node.left);
			}
			if (node.right) {
				let prevNode = null;
				let targetNode = node.right;
				while (targetNode.left) {
					prevNode = targetNode;
					targetNode = targetNode.left;
				}
				targetNode.left = node.left;
				targetNode.right = node.right;

				prevnode.left.value = node.value ? (prevnode.left = targetNode) : (prevnode.right = targetNode);

				prevNode.left = null;
			}
		} else {
			return null;
		}
	}
	insert(val) {
		if (!this.root) {
			this.root = new TreeNode(val);
		} else {
			this.recursiveInsert(this.root, val, 0);
		}
	}
	lookUp(val) {
		return this.recursiveLookup(this.root, val);
	}
	remove(val) {
		this.recursiveRemove(this.root, val);
	}
	inOrder(tree, queue) {
		tree.left && this.inOrder(tree.left, queue);
		queue.push(tree.value);
		console.log(tree);
		tree.right && this.inOrder(tree.right, queue);
	}

	preOrder(tree, queue) {
		queue.push(tree.value);
		tree.left && this.preOrder(tree.left, queue);
		tree.right && this.preOrder(tree.right, queue);
	}

	maxDepth(tree) {
		if (!tree) return 0;
		let leftDepth = this.maxDepth(tree.left);
		let rightDepth = this.maxDepth(tree.right);

		if (leftDepth > rightDepth) return leftDepth + 1;
		else return rightDepth + 1;
	}

	maxDepthIterative() {
		const queue = [];
		let maxDepth = 0;
		this.root.level = 1;
		queue.push(this.root);
		while (queue.length > 0) {
			const currentNode = queue.shift();
			maxDepth = Math.max(maxDepth, currentNode.level);
			if (currentNode.left) {
				currentNode.left.level = currentNode.level + 1;
				queue.push(currentNode.left);
			}

			if (currentNode.right) {
				currentNode.right.level = currentNode.level + 1;
				queue.push(currentNode.right);
			}
		}
		return maxDepth;
	}
}

//console.log(BST);

const myNewTree = new BinarySearchTree();
myNewTree.insert(20);
myNewTree.insert(8);
myNewTree.insert(22);
myNewTree.insert(4);
// myNewTree.insert(2);
// myNewTree.insert(12);
// myNewTree.insert(10);
// myNewTree.insert(14);
// myNewTree.insert(23);
// myNewTree.insert(233);
console.log(myNewTree.maxDepth(myNewTree.root));
console.log(myNewTree.maxDepthIterative());

//myNewTree.inOrder(myNewTree.root, arr);
//const ans = myNewTree.lookUp(8);
// myNewTree.remove(20);
//console.log(JSON.stringify(myNewTree));
