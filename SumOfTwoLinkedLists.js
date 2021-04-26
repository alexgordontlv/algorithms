class ListNode {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class TreeNode {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

const printTree = (myTree) => {
    
}


const arrayToLinkedList = (myArray) => {
	if (myArray.length === 0) return null;
	let listPointer = new ListNode(myArray[0]);
	let Head = listPointer;
	for (let i = 1; i < myArray.length; i++) {
		listPointer.next = new ListNode(myArray[i]);
		listPointer = listPointer.next;
	}
	return Head;
};
const linkedListToArray = (myList) => {
	const myArray = [];
	while (myList) {
		myArray.push(myList.value);
		myList = myList.next;
	}
	return myArray;
};

const printLinkedList = (myList) => {
	const myArray = [];
	while (myList) {
		myArray.push(myList.value);
		myList = myList.next;
	}

	const newArr = myArray.map((val) => val.toString() + ' -> ');
	console.log(newArr.join(''));
};
// const myList = arrayToLinkedList([1, 2, 3]);
// console.log(myList);
// const myArray = linkedListToArray(myList);
// console.log(myArray);

const addTwoNumbers = (list1, list2) => {
	const num1 = parseInt(linkedListToArray(list1).reverse().join(''));
	const num2 = parseInt(linkedListToArray(list2).reverse().join(''));
	let resultArray = num1 + num2;
	return arrayToLinkedList(resultArray.toString().split('').reverse());
};

const res = addTwoNumbers(arrayToLinkedList([2, 4, 3]), arrayToLinkedList([5, 6, 4]));
//printLinkedList(res);
