const express = require('express');

const router = express.Router();

const productControler = require('../controllers/productsControler');

router.get('/', productControler.getAll);

module.exports = router;