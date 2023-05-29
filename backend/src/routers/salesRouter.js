const express = require('express');

const router = express.Router();
const salesControler = require('../controllers/salesControllers');
const { validateSaleData } = require('../middlewares/validateSaleData');

router.get('/', salesControler.getAll);
router.get('/:id', salesControler.getById);
router.post('/', validateSaleData, salesControler.createdSale);

module.exports = router;
