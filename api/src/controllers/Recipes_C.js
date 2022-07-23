const axios = require('axios');

require('dotenv').config();
const { API_KEY, API_KEY1 } = process.env;

const { Recipe, Diet } = require('../db');

const apiData = async () => {
	const apiFoods = await axios.get(
		`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY1}&addRecipeInformation=true&number=100`
	);
	if (apiFoods) {
		const mapFoods = apiFoods.data.results.map((food) => {
			return {
				id: food.id,
				name: food.title,
				image: food.image,
				diets: food.diets ? food.diets.join(', ') : 'no pertenece a una dieta'
			};
		});
		return mapFoods;
	} else {
		return { message: 'API/all required error' };
	}
};

const dbData = async () => {
	const dbFoods = await Recipe.findAll({
		include: {
			model: Diet,
			attibutes: ['name'],
			through: {
				attibutes: []
			}
		}
	});
	if (dbFoods.length) {
		return dbFoods;
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
