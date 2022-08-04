const { Router } = require('express');
const router = Router();
const { apiData, allData, dbData } = require('../controllers/Recipes_C.js');

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
		if (id.length == 36) {
			const dbDetail = await Recipe.findAll({
				where: {
					id: id
				},
				include: {
					model: Diet,
					attributes: ['name'],
					through: {
						attributes: []
					}
				}
			});
			if (dbDetail.length) {
				const mapDbDetail = dbDetail.map((food) => {
					return {
						id: food.id,
						name: food.name,
						image: food.image,
						summary: food.summary,
						healthScore: food.healthScore,
						steps: food.steps,
						diets: food.diets.length
							? food.diets.map((e) => e.name).join(', ')
							: 'does not belong to a diet :('
					};
				});
				console.log(typeof mapDbDetail[0].id);
				return res.json(mapDbDetail[0]);
			} else {
				return res.send({ message: 'ID not found' });
			}
		} else {
			let apiDetail = await axios.get(
				`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY12}&addRecipeInformation=true`
			);
			// .catch((error) => next(error));
			if (apiDetail.data) {
				let array = [];
				array.push(apiDetail.data);
				const mapApiRecipe = array.map((food) => {
					return {
						id: food.id,
						name: food.title,
						image: food.image,
						diets: food.diets.length
							? food.diets.join(', ')
							: 'does not belong to a diet :(',
						summary: food.summary.replace(/<[^>]*>?/gm, ''),
						healthScore: food.healthScore,
						steps: food.instructions
							? food.instructions.replace(/<[^>]*>?/gm, '')
							: 'has no instructions'
					};
				});
				console.log(typeof mapApiRecipe[0].id);
				return res.json(mapApiRecipe[0]);
			} else {
				return res.send({ message: 'ID not found' });
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
		res.send({ message: 'new recipe created successfully!', data: datos });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
