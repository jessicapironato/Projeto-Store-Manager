const express = require('express');

const router = express.Router();

const salesControler = require('../controllers/salesControllers');

router.get('/', salesControler.getAll);
router.get('/:id', salesControler.getById);
router.post('/', salesControler.createdSale);

module.exports = router;