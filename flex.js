const Get_summary = (array, options) => {
	const newOption = Object.keys(options);
	const newhash = array.reduce((myHash, user) => {
		const newUser = {};
		for (option of newOption) {
			newUser[option] = user[option];
		}
		const stringNewUser = JSON.stringify(Object.values(newUser));
		if (myHash[stringNewUser]) {
			myHash[stringNewUser].Bytes += user.Bytes;
		} else {
			myHash[stringNewUser] = user;
		}
	}, {});

	return newhash;
};

arr = [
	{
		User: 'John',
		System: 'android',
		Location: 'Paris',
		Bytes: 200,
	},
	{
		User: 'Anna',
		System: 'android',
		Location: 'Paris',
		Bytes: 100,
	},
	{
		User: 'Nir',
		System: 'windows',
		Location: 'Tel-Aviv',
		Bytes: 200,
	},
	{
		User: 'John',
		System: 'windows',
		Location: 'Paris',
		Bytes: 300,
	},
];

console.log(Get_summary(arr, { System: true, Location: true }));
