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

const updateProducts = async (name, id) => {
  const updateProduct = await productsModel.updateProducts(name, Number(id));
  if (updateProduct.type === 404) {
    return updateProduct;
  }
  return { type: null, message: { name, id: Number(id) } };
};

module.exports = {
  getAll,
  getById,
  create,
  updateProducts,
};