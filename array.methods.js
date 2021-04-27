//Array.prototype.filter
Array.prototype.newFilter = function (callback) {
	if (!callback) return console.log('provide a callback function');
	if (typeof callback !== 'function') return console.log('provided callback is not a function');

	const newArr = [];
	for (let i = 0; i < this.length; i++) {
		if (callback(this[i], i, this)) newArr.push(this[i]);
	}
	return newArr;
};

const myArr = [1, 2, 3, 4, 5, 6, 7];

const newArr = myArr.newFilter((num, i) => num % 2 == 0);
console.log(newArr); //[2,4,6]
