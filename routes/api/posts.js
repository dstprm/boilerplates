const express = require('express');
const router = express.Router();

router.get('/placeholder', (req, res) => res.json({ hola: 1 }));

module.exports = router;
