const express = require('express');

const router = express.Router();

const productControler = require('../controllers/productsControler');

router.get('/', productControler.getAll);
router.get('/:id', productControler.getById);
router.post('/', productControler.create);

module.exports = router;