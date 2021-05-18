const myArray = [59, 65, 60, 33, 22, 3];

const swap = (array, a, b) => {
	const tmp = array[a];
	array[a] = array[b];
	array[b] = tmp;
};

const kthSmallest = (array) => {
	const pivot = array[0];
	swap(array, 0, array.length - 1);
	for (let i = (j = 0); j < array.length; ) {
		if (array[j] > pivot) {
			j++;
		} else {
			swap(array, i, j);
			i++;
			j++;
		}
	}
	console.log(array);
};

partition(myArray);
const kthsmallest = (array, k) => {};
