const { Router } = require('express');
const router = Router();
const { Diet } = require('../db.js');

router.get('/', async (req, res, next) => {
	try {
		const allDiets = await Diet.findAll();
		if (allDiets.length) {
			return res.json(allDiets);
		} else {
			res.status(404).json({ message: 'error route /diets' });
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
