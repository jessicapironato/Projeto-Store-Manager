const connection = require('./connection');

// Requisito 1 listagem de produtos

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',

  );
  return products;
};

const getById = async (id) => {
  const [[products]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  
  // if (!products) return null;
  
  return products;
};

module.exports = {
  getAll,
  getById,
};