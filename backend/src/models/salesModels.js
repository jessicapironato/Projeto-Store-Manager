const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT 
      salesp.sale_id AS saleId,     
      salesp.product_id AS productId, 
      salesp.quantity,
      s.date    
    FROM sales_products AS salesp 
    INNER JOIN sales AS s 
    ON s.id = salesp.sale_id 
    ORDER BY salesp.sale_id, salesp.product_id;`,

  );
  return sales;
};
const getById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT 
      salesp.product_id AS productId, 
      salesp.quantity,
      s.date    
    FROM sales_products AS salesp 
    INNER JOIN sales AS s 
    ON s.id = salesp.sale_id 
    Where salesp.sale_id = ?
    ORDER BY salesp.sale_id, salesp.product_id;`, 
    [id],
    );
  
  return sales.length > 0 ? sales : null;
};

module.exports = {
  getAll,
  getById,
  
};
