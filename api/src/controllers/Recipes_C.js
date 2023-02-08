const axios = require('axios');

require('dotenv').config();
const {
	API_KEY,
	API_KEY1,
	API_KEY2,
	API_KEY3,
	API_KEY4,
	API_KEY5,
	API_KEY6,
	API_KEY7,
	API_KEY8,
	API_KEY9,
	API_KEY10,
	API_KEY11,
	API_KEY12,
	API_KEY13,
	API_KEY14,
	API_KEY15
} = process.env;

const { Recipe, Diet } = require('../db');

const apiData = async () => {
	const apiFoods = await axios.get(
		`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY6}&addRecipeInformation=true&number=100`
	);
	if (apiFoods) {
		const mapApi = apiFoods.data.results.map((food) => {
			return {
				id: food.id,
				name: food.title,
				image: food.image,
				healthScore: food.healthScore,
				diets: food.diets.length
					? food.diets.join(', ')
					: 'does not belong to a diet :('
			};
		});
		return mapApi;
	} else {
		return { message: 'API/all required error' };
	}
};

const dbData = async () => {
	const dbFoods = await Recipe.findAll({
		include: {
			model: Diet,
			attributes: ['name'],
			through: {
				attributes: []
			}
		}
	});
	if (dbFoods.length) {
		const mapDb = dbFoods.map((food) => {
			return {
				id: food.id,
				name: food.name,
				image: food.image,
				healthScore: food.healthScore,
				diets: food.diets
					? food.diets.map((e) => e.name).join(', ')
					: 'does not belong to a diet :('
			};
		});
		return mapDb;
	}
};

const allData = async () => {
	let all;
	let db = await dbData();
	let api = await apiData();
	if (db) {
		all = db.concat(api);
		return all;
	} else {
		return api;
	}
};

module.exports = {
	apiData,
	allData,
	dbData
};
