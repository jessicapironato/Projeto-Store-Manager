const express = require('express');

const router = express.Router();

const productControler = require('../controllers/productsControler');
const nameIsValid = require('../middlewares/validateProducts');

router.get('/', productControler.getAll);
router.get('/:id', productControler.getById);
router.post('/', nameIsValid, productControler.create);
router.put('/:id', nameIsValid, productControler.updateProducts);

module.exports = router;