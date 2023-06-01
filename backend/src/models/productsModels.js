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
  
  return product[0];
};

const updateProducts = async (name, id) => {
  // Verificar se o produto existe antes da atualização
  const [existingProduct] = await connection
  .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
 
  if (existingProduct.length === 0) {
    return { type: 404, message: 'Product not found' };
  }

  const [{ affectedRows }] = await connection
  .execute('UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id]);
   
  return affectedRows;
};

const deleteProducts = async (id) => {
  await connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  updateProducts,
  deleteProducts,
};