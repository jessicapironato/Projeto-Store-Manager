const { validateProductId,
   validateQuantity, validatePositiveQuantity } = require('./salesValidations');

const validateSaleData = async (req, res, next) => {
  const newSale = req.body;

  try {
    newSale.forEach((item) => {
      validateProductId(item);
      validatePositiveQuantity(item);
      validateQuantity(item);
    });

    next();
  } catch (error) {
    res.status(error.cause).json({ message: error.message });
  }
};

module.exports = {
  validateSaleData,
};
