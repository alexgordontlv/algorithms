const prefixSufix = (str) => {
	const preTable = new Array(str.length).fill(0);
	let j = 1;
	for (let i = 0; i < str.length && j < str.length; ) {
		if (str[i] === str[j]) {
			preTable[j] = i + 1;
			i++;
		}
		j++;
	}
	return preTable;
};
const str = 'adsgwadsdsgwadsgzxz';
const pattern = 'dsgwadsgz';

const kmp = (str, pattern) => {
	const prefixTable = prefixSufix(pattern);
	let j = 0;
	let lastidx = 0;
	for (let i = 0; i < str.length; ) {
		if (str[i] === pattern[j] && j === 0) lastidx = i;
		if (str[i] === pattern[j]) {
			i++;
			j++;
		}

		if (j == pattern.length) {
			return { idx: lastidx, found: true };
		} else if (i < str.length && str[i] !== pattern[j]) {
			if (j > 0) {
				j = prefixTable[j - 1];
			} else {
				i++;
			}
		}
	}
	return false;
};

const ans = kmp(str, pattern);
console.log(ans);
