class Address {
	constructor(street, city) {
		this.street = street;
		this.city = city;
	}
}
class Name {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}
}

class Person {
	constructor(Name, Address) {
		this.fullName = `${Name.firstName ? Name.firstName : ''}${Name.lastName ? ' ' + Name.lastName : ''}`;
		this.fullAddress = `${Address.street ? Address.street : ''}${Address.city ? ' ' + Address.city : ''}`;
		this.distance = Number.MAX_SAFE_INTEGER;
		this.edges = [];
	}
}

class Graph {
	constructor() {
		this.personsEdjointList = new Map();
	}
	insertPerson(Person) {
		if (this.personsEdjointList.has(this.getPersonKey(Person))) {
			console.log('found duplicate');
			return;
		}
		this.personsEdjointList.forEach((foundPerson) => {
			const A = foundPerson.fullName.toUpperCase() === Person.fullName.toUpperCase();
			const B = foundPerson.fullAddress.toUpperCase() === Person.fullAddress.toUpperCase();
			if ((A || B) && !(A && B)) {
				foundPerson.edges.push(this.getPersonKey(Person));
				Person.edges.push(this.getPersonKey(foundPerson));
			}
		});
		this.personsEdjointList.set(this.getPersonKey(Person), Person);
	}
	init(personArray) {
		personArray.forEach((person) => {
			this.insertPerson(person);
		});
	}

	getPersonKey(Person) {
		return `${Person.fullName.split(' ').join('_')}_${Person.fullAddress.split(' ').join('_')}`.toUpperCase();
	}

	initielizeEdjointList(personA) {
		this.personsEdjointList.forEach((foundPerson) => {
			if (personA === this.getPersonKey(foundPerson)) {
				foundPerson.distance = 0;
			} else {
				foundPerson.distance = Number.MAX_SAFE_INTEGER;
			}
		});
	}

	findMinRelationLevel(personA, personB) {
		const person1 = this.getPersonKey(personA);
		const person2 = this.getPersonKey(personB);
		this.initielizeEdjointList(person1);
		const myQueue = [];
		const visitedSet = new Set();
		myQueue.push(person1);
		while (myQueue.length > 0) {
			const currentPerson = myQueue.shift();
			const referencePerson = this.personsEdjointList.get(currentPerson);
			referencePerson.edges.forEach((connectedPerson) => {
				const referenceConnectedPerson = this.personsEdjointList.get(connectedPerson);
				referenceConnectedPerson.distance = Math.min(referencePerson.distance + 1, referenceConnectedPerson.distance);
				if (!visitedSet.has(connectedPerson)) myQueue.push(connectedPerson);
				visitedSet.add(connectedPerson);
			});
		}
		const originalPerson2 = this.personsEdjointList.get(person2);
		if (originalPerson2.distance === Number.MAX_SAFE_INTEGER) return -1;
		else return originalPerson2.distance;
	}
}

const graceHoperNewYork = new Person(new Name('Grace', 'Hopper'), new Address('New York'));
const joanClarkLondon = new Person(new Name('Joan', 'Clarke'), new Address('51 street', 'London'));

const joanClarkBletchley = new Person(new Name('joan', 'Clarke'), new Address('Bletchley Park'));
const alanTuringCambridge = new Person(new Name('Alan', 'turing'), new Address('Cambridge'));
const alanTuringBletchly = new Person(new Name('Alan', 'Turing'), new Address('Bletchley Park'));

const personArray = [graceHoperNewYork, joanClarkBletchley, joanClarkLondon, alanTuringCambridge, alanTuringBletchly];

const myGraph = new Graph();
myGraph.init(personArray);
const res = myGraph.findMinRelationLevel(alanTuringCambridge, joanClarkLondon);
console.log(res);

myGraph.personsEdjointList.forEach((person) => {
	console.log(person);
});
