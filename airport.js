class Node {
	constructor(name) {
		this.name = name;
		this.routes = [];
	}
}

const airports = ['BGI', 'CDG', 'DEL', 'DOH', 'DSM', 'EWR', 'EYW', 'HND', 'ICN', 'JFK', 'LGA', 'ORD', 'SAN', 'SFO', 'SIN', 'TLV', 'BUD', 'LHR'];
const myMap = {};
airports.forEach((airport) => (myMap[airport] = new Array()));
const routs = [
	['DSM', 'ORD'],
	['ORD', 'BGI'],
	['BGI', 'LGA'],
	['SIN', 'CDG'],
	['CDG', 'SIN'],
	['CDG', 'BUD'],
	['DEL', 'DOH'],
	['DEL', 'CDG'],
	['TLV', 'DEL'],
	['EWR', 'HND'],
	['HND', 'ICN'],
	['HND', 'JFK'],
	['ICN', 'JFK'],
	['JFK', 'LGA'],
	['EYW', 'LHR'],
	['LHR', 'SFO'],
	['SFO', 'SAN'],
	['SFO', 'DSM'],
	['SAN', 'EYW'],
];
routs.forEach((element) => {
	console.log(myMap[element[0]]);
	myMap[element[0]].push(element[1]);
});
console.table(myMap);
