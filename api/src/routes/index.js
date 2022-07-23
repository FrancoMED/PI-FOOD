const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Recipes = require('./Recipes.js');
const Diets = require('./Diets.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', Recipes);
router.use('/diets', Diets);
module.exports = router;
