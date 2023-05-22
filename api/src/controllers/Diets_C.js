const { Diet } = require('../db.js');
const uuid = require('uuid');

const preload = async () => {
	try {
		let diets = [
			{ name: 'gluten free' },
			{ name: 'ketogenic' },
			{ name: 'vegetarian' },
			{ name: 'dairy free' },
			{ name: 'lacto ovo vegetarian' },
			{ name: 'vegan' },
			{ name: 'pescatarian' },
			{ name: 'paleolithic' },
			{ name: 'primal' },
			{ name: 'fodmap friendly' },
			{ name: 'whole 30' }
		];
		// await Diet.bulkCreate(diets);
		diets.forEach((e) => {
			Diet.findOrCreate({
				where: {
					id: uuid.v4(),
					name: e.name
				}
			});
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = { preload };
