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

const create = async (name) => {
  const createProducts = await productsModel.create(name);
  return { type: null, message: createProducts };
};

module.exports = {
  getAll,
  getById,
  create,
};