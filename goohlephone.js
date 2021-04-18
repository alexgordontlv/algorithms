//TO DO

const myPhone = {
	1: null,
	2: ['a', 'b', 'c'],
	3: ['d', 'e', 'f'],
	4: ['g', 'h', 'i'],
	5: ['j', 'k', 'l'],
	6: ['m', 'n', 'o'],
	7: ['p', 'q', 'r', 's'],
	8: ['t', 'u', 'v'],
	9: ['w', 'x', 'y', 'z'],
	0: [' '],
};

const phoneEncode = (number, words) => {
	//const phoneNumberArr = number.toString().split('');
	const output = [];
	const encodedWords = words.map((word) => {
		const letters = word.split('');
		let newWord = letters.map((letter) => {
			for (const key in myPhone) {
				if (key.includes(letter)) {
					return key;
				}
			}
		});
	});
};
