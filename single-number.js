const nums = [2, 2, 1];

const nums2 = [4, 1, 2, 1, 2];

// o(n) time + space
const singleNumberCached = (array) => {
	const myMap = new Map();
	let ans = null;
	array.forEach((num) => {
		if (!myMap.has(num)) myMap.set(num, 1);
		else myMap.set(num, myMap.get(num) + 1);
	});
	myMap.forEach((val, key) => {
		if (val == 1) ans = key;
	});
	return ans;
};

//o(n) time
const singleNumberLinearSpace = () => {};

console.log(singleNumberCached(nums));
