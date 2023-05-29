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
  const { message } = await salesServices.createdSale(newSale);
  if (!message) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  
  return res.status(201).json({
    id: message,
    itemsSold: newSale,
  });
};

module.exports = {
 getAll,
 getById,
 createdSale,
};