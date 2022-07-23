const { Router } = require('express');
const router = Router();
const { Diet } = require('../db.js');

router.get('/', async (req, res, next) => {
	try {
		res.send('funciona');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
