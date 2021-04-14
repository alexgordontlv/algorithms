const createMatrix = (rows, cols) => {
	let rowsArray = new Array(rows);
	for (let i = 0; i < rows; i++) {
		rowsArray[i] = new Array(cols).fill('1');
	}
	return rowsArray;
};

const maze = createMatrix(5, 5);

maze[1][1] = 's';
maze[2][1] = '0';
maze[3][1] = '0';
maze[3][2] = '0';
maze[3][3] = '0';

maze[1][2] = '1';
maze[1][0] = '0';
maze[0][0] = '0';
maze[1][3] = '0';
maze[1][4] = '0';
maze[2][4] = '0';
maze[2][3] = '0';
maze[2][4] = 'e';

const getValidPath = (theMaze, thePoint) => {
	const { row, col } = thePoint;
	const lastRowIdx = theMaze.length - 1;
	const lastColIdx = theMaze[0].length - 1;
	let ans = null;
	if (row > 0 && col > 0 && row < lastRowIdx && col < lastColIdx) {
		if (theMaze[row - 1][col] !== '1') ans = { row: row - 1, col };
		if (theMaze[row + 1][col] !== '1') ans = { row: row + 1, col };
		if (theMaze[row][col - 1] !== '1') ans = { row, col: col - 1 };
		if (theMaze[row][col + 1] !== '1') ans = { row, col: col + 1 };
	}
	if (row == 0 && col == 0) {
		if (theMaze[row][col + 1] !== '1') ans = { row, col: col + 1 };
		if (theMaze[row + 1][col] !== '1') ans = { row: row + 1, col };
	}
	if (row == 0 && col != 0 && col != lastColIdx) {
		if (theMaze[row][col + 1] !== '1') ans = { row, col: col + 1 };
		if (theMaze[row][col - 1] !== '1') ans = { row, col: col - 1 };
		if (theMaze[row + 1][col] !== '1') ans = { row: row + 1, col };
	}
	if (row == 0 && col == lastColIdx) {
		if (theMaze[row][col - 1] !== '1') ans = { row, col: col - 1 };
		if (theMaze[row + 1][col] !== '1') ans = { row: row + 1, col };
	}
	if (row != 0 && col == 0 && col != lastRowIdx) {
		if (theMaze[row][col + 1] !== '1') ans = { row, col: col + 1 };
		if (theMaze[row - 1][col] !== '1') ans = { row: row - 1, col };
		if (theMaze[row + 1][col] !== '1') ans = { row: row + 1, col };
	}
	if (col == 0 && row == lastColIdx) {
		if (theMaze[row][col + 1] !== '1') ans = { row, col: col + 1 };
		if (theMaze[row - 1][col] !== '1') ans = { row: row - 1, col };
	}
	if (col == lastColIdx && row != 0) {
		if (theMaze[row][col - 1] !== '1') ans = { row, col: col - 1 };
		if (theMaze[row + 1][col] !== '1') ans = { row: row + 1, col };
		if (theMaze[row - 1][col] !== '1') ans = { row: row - 1, col };
	}
	if (col == lastColIdx && row == lastRowIdx) {
		if (theMaze[row][col - 1] !== '1') ans = { row, col: col - 1 };
		if (theMaze[row - 1][col] !== '1') ans = { row: row - 1, col };
	}
	if (col == 0 && row == lastRowIdx) {
		if (theMaze[row][col + 1] !== '1') ans = { row, col: col + 1 };
		if (theMaze[row - 1][col] !== '1') ans = { row: row - 1, col };
	}
	if (col != 0 && row == lastRowIdx && col != lastColIdx) {
		if (theMaze[row][col + 1] !== '1') ans = { row, col: col + 1 };
		if (theMaze[row][col - 1] !== '1') ans = { row, col: col - 1 };
		if (theMaze[row - 1][col] !== '1') ans = { row: row - 1, col };
	}
	return ans;
};
let found = false;
const mazeRecursive = (theMaze, currentPoint) => {
	console.log(currentPoint, theMaze[currentPoint.row][currentPoint.col]);
	if (theMaze[currentPoint.row][currentPoint.col] === 'e') {
		found = true;
		return true;
	}
	if (!getValidPath(theMaze, currentPoint)) {
		found = false;
		return false;
	}

	let { row, col } = getValidPath(theMaze, currentPoint);
	theMaze[currentPoint.row][currentPoint.col] = '1';
	mazeRecursive(theMaze, { row, col });
	let anotherPoint = getValidPath(theMaze, currentPoint);
	if (anotherPoint) {
		mazeRecursive(theMaze, anotherPoint);
	}
};

const mazeIterative = (theMaze, startPoint) => {
	const queue = [];
	queue.push(startPoint);
	while (queue.length > 0) {
		//		console.log(queue);
		const currentPoint = queue.shift();
		console.log(currentPoint, theMaze[currentPoint.row][currentPoint.col]);
		if (theMaze[currentPoint.row][currentPoint.col] == 'e') return true;
		theMaze[currentPoint.row][currentPoint.col] = '1';
		const getPoint = getValidPath(theMaze, currentPoint);
		getPoint && queue.push(getPoint);
	}
	return false;
};

console.log(maze);
const answer = mazeIterative(maze, { row: 1, col: 1 });
console.log('answer', answer);
