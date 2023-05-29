const salesModels = require('../models/salesModels');
const productModels = require('../models/productsModels');

const getAll = async () => {
  const sales = await salesModels.getAll();
  return sales;
};

const getById = async (id) => {
  const saleById = await salesModels.getById(id);
  
  return saleById;
};

const createdSale = async (sale) => {
  const products = await Promise.all(sale.map((item) => productModels.getById(item.productId)));
  if (products.includes(undefined)) {
    return { type: 404, message: 'Product not found' };
  }
  const newSale = await salesModels.createSale(sale);
  
  return { type: null,
  message: {
    id: newSale,
    itemsSold: sale,
  } };
};

module.exports = {
  getAll,
  getById,
  createdSale,
};