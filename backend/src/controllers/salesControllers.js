const salesServices = require('../services/salesService');

const getAll = async (req, res) => {
  const sales = await salesServices.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await salesServices.getById(id);
   if (result.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(result);
};

const createdSale = async (req, res) => {
  const newSale = req.body;
  const { type, message } = await salesServices.createdSale(newSale);
  if (type) {
    return res.status(type).json({ message });
  }
  
  return res.status(201).json(message);
};

module.exports = {
 getAll,
 getById,
 createdSale,
};