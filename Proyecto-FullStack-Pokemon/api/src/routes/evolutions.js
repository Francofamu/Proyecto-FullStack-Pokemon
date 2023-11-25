const { Router } = require('express');
const { getEvolution } = require('./utils');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const evolutionData = await getEvolution();
    res.json(evolutionData);
  } catch (error) {
    console.error("Error fetching evolution data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
