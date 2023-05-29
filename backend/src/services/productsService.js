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
  console.log(updateProduct);
  if (updateProduct.type === 404) {
    return updateProduct;
  }
  return { type: null, message: { name, id: Number(id) } };
};

// const updateProducts = async (name, id) => {
//   const updateProduct = await productsModel.updateProducts(name, id);
//   if (updateProduct === 0) {
//     return { type: 404, message: 'Product not updated' };
//   }
//   return { type: 200, message: 'Product updated successfully' };
// };

module.exports = {
  getAll,
  getById,
  create,
  updateProducts,
};