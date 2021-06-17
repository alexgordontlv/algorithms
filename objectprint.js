const printStr = (counter) => {
	let str = '';
	for (let i = 0; i < counter; i++) {
		str += ' - ';
	}
	process.stdout.write(str);
};
let stringCounter = 0;
const printObject = (obj, counter) => {
	for (let [key, value] of Object.entries(obj)) {
		if (typeof value === 'object') {
			console.log(printStr(stringCounter), key);
			stringCounter++;
			printObject(value);
			stringCounter--;
		} else {
			console.log(printStr(stringCounter), key);
		}
	}
};

const myObj = {
	name: 'alex',
	address: {
		street: 'lola',
		number: '12',
		onemore: {
			hahalol: 'lol',
		},
		age: {
			hahalol1: 12,
			hahalol2: {
				hahalol3: 11,
			},
		},
	},
};

printObject(myObj);
