const Get_summary = (array, options) => {
	const myHash = {};
	const newOption = Object.keys(options);
	array.forEach((user) => {
		const newUser = {};
		for (option of newOption) {
			newUser[option] = user[option];
		}
		const stringNewUser = JSON.stringify(Object.values(newUser));
		if (stringNewUser in myHash) {
			myHash[stringNewUser].Bytes += user.Bytes;
		} else {
			myHash[stringNewUser] = user;
		}
	});

	return Object.values(myHash);
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
