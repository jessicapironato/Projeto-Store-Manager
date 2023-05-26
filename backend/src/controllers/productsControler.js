const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  
  const result = await productsService.getById(id);
  console.log(result);
if (!result) return res.status(404).json({ message: 'Product not found' }); 
  res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
};