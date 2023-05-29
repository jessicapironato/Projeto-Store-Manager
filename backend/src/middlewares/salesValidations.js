const validateProductId = (item) => {
  if (!item.productId) {
    throw new Error('"productId" is required', { cause: 400 });
  }
};

const validateQuantity = (item) => {
  if (!item.quantity) {
    throw new Error('"quantity" is required', { cause: 400 });
  }
};

const validatePositiveQuantity = (item) => {
  if (item.quantity <= 0) {
    throw new Error('"quantity" must be greater than or equal to 1', { cause: 422 });
  }
};

module.exports = {
  validateProductId,
  validateQuantity,
  validatePositiveQuantity,
};
