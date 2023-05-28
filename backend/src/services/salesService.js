const salesModels = require('../models/salesModels');

const getAll = async () => {
  const sales = await salesModels.getAll();
  return sales;
};

const getById = async (id) => {
  const saleById = await salesModels.getById(id);
  
  return saleById;
};
module.exports = {
  getAll,
  getById,
};