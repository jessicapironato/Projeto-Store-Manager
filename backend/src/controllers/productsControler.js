const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  
  const result = await productsService.getById(id);
 
if (!result) {
  return res.status(404).json({ message: 'Product not found' }); 
} 
  return res.status(200).json(result);
};

const create = async (req, res) => {
  const { name } = req.body;
  const { message } = await productsService.create(name);
  return res.status(201).json(message);
};

module.exports = {
  getAll,
  getById,
  create, 
};