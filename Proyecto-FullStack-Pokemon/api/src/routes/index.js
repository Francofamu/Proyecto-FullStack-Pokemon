const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRoutes = require('./pokemons.js');
const typesRoutes = require('./types.js');
const evolutionsRoutes = require('./evolutions.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokemonsRoutes);
router.use("/types", typesRoutes);
router.use("/evolutions", evolutionsRoutes);

module.exports = router;
