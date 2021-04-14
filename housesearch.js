const blocks = [
	{
		gym: false,
		school: true,
		store: false,
	},
	{
		gym: true,
		school: false,
		store: false,
	},
	{
		gym: true,
		school: true,
		store: false,
	},
	{
		gym: false,
		school: true,
		store: false,
	},
	{
		gym: false,
		school: true,
		store: true,
	},
];

const reqs = ['gym', 'school', 'store'];

const newBlocks = blocks.map((block, index) => {
	for (let i = 0; i < reqs.length; i++) if (block[reqs[i]]) return { reqs[i]: index};
});

console.log(newBlocks);
