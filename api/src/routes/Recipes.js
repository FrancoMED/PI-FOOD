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
			const dbDetail = await dbData({
				where: {
					id: id
				}
			});
			if (dbDetail) {
				return res.json(dbDetail);
			} else {
				let apiDetail = await axios.get(
					`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY1}&addRecipeInformation=true`
				);
				if (apiDetail) {
					let array = [];
					array.push(apiDetail.data);
					const mapRecipe = array.map((food) => {
						return {
							id: food.id,
							name: food.title,
							image: food.image,
							diets: food.diets
								? food.diets.join(', ')
								: 'no pertenece a una dieta',
							summary: food.summary.replace(/<[^>]*>?/gm, ''),
							healthScore: food.healthScore,
							steps: food.instructions
								? food.instructions.replace(/<[^>]*>?/gm, '')
								: 'has no instructions'
						};
					});
					return res.json(mapRecipe[0]);
				} else {
					return res.status(404).send('API/details error');
				}
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
