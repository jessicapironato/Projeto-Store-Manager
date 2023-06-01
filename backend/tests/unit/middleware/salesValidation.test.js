const sinon = require('sinon');
const { validateSaleData } = require('../../../src/middlewares/validateSaleData');

describe('Testes do Middleware validate', function () {
  it('Deve chamar next() se os dados da venda forem válidos', function () {
    const req = {
      body: [
        { productId: 1, quantity: 5 },
        { productId: 2, quantity: 10 },
      ],
    };
    const res = {};
    const next = sinon.spy();

    validateSaleData(req, res, next);

    sinon.assert.calledOnce(next);
  });

  it('Deve retornar status de erro se os dados da venda forem inválidos', function () {
    const req = {
      body: [
        { productId: 1, quantity: -5 }, // Quantidade inválida (negativa)
        { productId: 2, quantity: 10 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.spy();

    validateSaleData(req, res, next);

    sinon.assert.calledWith(res.status, 422);
    sinon.assert.calledWith(res.json, { message: '"quantity" must be greater than or equal to 1' });
    sinon.assert.notCalled(next);
  });
});
