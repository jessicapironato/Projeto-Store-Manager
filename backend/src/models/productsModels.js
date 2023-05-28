const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',

  );
  return products;
};

const getById = async (id) => {
  const [[products]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  
  return products;
};

const create = async (name) => {
  await connection.execute('INSERT INTO StoreManager.products (name) VALUE (?)', [name]);

  const [product] = await connection
  .execute('SELECT * FROM StoreManager.products WHERE name = ?', [name]);
  console.log(product);

  return product[0];
};

module.exports = {
  getAll,
  getById,
  create,
};