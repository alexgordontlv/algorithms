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
const str = 'adsgwadsxdsgwadsgz';
const pattern = 'dsgwadsgz';

const kmp = (str, pattern) => {
	const prefixTable = prefixSufix(pattern);
	let [i, j, lastIdx] = [0, 0, 0];
	while (i < str.length) {
		if (str[i] === pattern[j]) {
			if (j === 0) lastIdx = i;
			i++;
			j++;
		} else i++;
		if (j === pattern.length) return lastIdx;
		if (str[i] !== pattern[j] && j > 0) j = prefixTable[j - 1];
	}
	return -1;
};

const ans = kmp(str, pattern);
console.log(ans);
