const { Router } = require('express');
const router = Router();
const { apiData, allData, dbData } = require('../controllers/Recipes_C.js');

require('dotenv').config();
const { API_KEY, API_KEY1 } = process.env;

const { Recipe, Diet } = require('../db');

const axios = require('axios');

router.get('/', async (req, res, next) => {
	const { name } = req.query;
	try {
		let allRecipes = await allData();
		if (name) {
			const filterData = allRecipes.filter((e) =>
				e.name.toLowerCase().includes(name.toString().toLowerCase())
			);
			if (filterData.length) {
				return res.json(filterData);
			}
		}
		return res.json(allRecipes);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		if (id) {
			let detailRecipe = await axios.get(
				`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY1}&addRecipeInformation=true`
			);
			if (detailRecipe) {
				let array = [];
				array.push(detailRecipe.data);
				const mapRecipe = array.map((e) => {
					return {
						id: e.id,
						name: e.title,
						image: e.image,
						diets: e.diets,
						summary: e.summary.replace(/<[^>]*>?/gm, ''),
						healthScore: e.healthScore,
						steps: e.instructions
							? e.instructions.replace(/<[^>]*>?/gm, '')
							: 'has no instructions'
					};
				});
				return res.json(mapRecipe[0]);
			} else {
				res.status(404).send('API/details error');
			}
		}
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { name, image, summary, healthScore, steps, diets } = req.body;
		const newRecipe = await Recipe.create({
			name,
			image,
			summary,
			healthScore,
			steps
		});
		if (diets) {
			const dietsDb = await Diet.findAll({
				where: { name: diets }
			});
			await newRecipe.addDiet(dietsDb);
		}

		// res.send('Receta creada con exito');

		// diets.map(async (d) => {
		// 	const dbDiet = await Diet.findOrCreate({
		// 		where: {
		// 			name: d
		// 		}
		// 	});
		// 	newRecipe.addDiet(dbDiet[0]);
		// });
		const datos = await dbData();
		res.send(datos);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
