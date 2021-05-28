class SuperClass {
	constructor(data = {}) {
		Object.keys(data).forEach((key) => {
			this[key] = data[key];
		});
	}
}

class InheritingClass extends SuperClass {
	constructor(data) {
		super(data);
	}
}

class NonInheritingClass {
	// same as above in SuperClass
	constructor(data = {}) {
		Object.keys(this).forEach((key) => {
			this[key] = data[key];
		});
	}

	foo;
}

const parameters = { foo: 'bar' };
const nonWorkingInstance = new InheritingClass(parameters);
const workingInstance = new NonInheritingClass(parameters);

console.log(nonWorkingInstance.foo);
// undefined
console.log(workingInstance.foo);
// "bar"
