const connection = require('./connection');

// Requisito 1 listagem de produtos

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',

  );
  return products;
};

module.exports = {
  getAll,
};