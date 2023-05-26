const productsModel = require('../models/productsModels');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const productById = await productsModel.getById(id);
  if (!productById) {
    return false;
  }
  return productById;
};

module.exports = {
  getAll,
  getById,
};