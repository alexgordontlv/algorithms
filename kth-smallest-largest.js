const myArray = [25, 65, 60, 33, 22, 3];

const swap = (array, a, b) => {
	const tmp = array[a];
	array[a] = array[b];
	array[b] = tmp;
};

const partition = (array) => {
	const pivot = array[0];
	swap(array, 0, array.length - 1);
	for (var i = (j = 0); j < array.length; ) {
		if (array[j] > pivot) {
			j++;
		} else {
			swap(array, i, j);
			i++;
			j++;
		}
	}

	return i - 1;
};

const kthsmallest = (array, k) => {
	console.log('before', array);
	let left = 0;
	let right = array.length;

	while (left < right) {
		let target = array.length - k;
		console.log('target', target);

		let idx = partition(array);
		console.log(array);
		console.log(idx);
		if (idx === target) return array[idx];
		if (idx < target) left = idx + 1;
		else right = idx - 1;
		array = array.slice(left, right);
		console.log(array);
	}
};

const ans = kthsmallest(myArray, 5);
console.log('answer', ans);
