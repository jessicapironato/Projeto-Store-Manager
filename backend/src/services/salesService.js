const salesModels = require('../models/salesModels');

const getAll = async () => {
  const sales = await salesModels.getAll();
  return sales;
};

const getById = async (id) => {
  const saleById = await salesModels.getById(id);
  
  return saleById;
};

const createdSale = async (sale) => {
  const newSale = await salesModels.createSale(sale);
  if (!newSale) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: null, message: newSale };
};

module.exports = {
  getAll,
  getById,
  createdSale,
};