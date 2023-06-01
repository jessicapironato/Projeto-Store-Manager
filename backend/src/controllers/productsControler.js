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

const updateProducts = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const { type, message } = await productsService.updateProducts(name, id);
  if (type) {
    return res.status(type).json({ message });
  }
  return res.status(200).json(message);
};

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
  const { type, message } = await productsService.deleteProducts(id);
  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(204).end();
  } catch (error) {
    console.log(error.message);
    return { message: error.message };
  }
};

module.exports = {
  getAll,
  getById,
  create, 
  updateProducts,
  deleteProducts,
};