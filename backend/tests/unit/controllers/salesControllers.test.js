const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesControllers');
const { mockAllSales, mockIdSales, newSale } = require('../mocks/salesModelsMock');

describe('Testes Camada Controller de Sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testando getAll', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getAll').resolves(mockAllSales);

    await salesController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWithExactly(mockAllSales);
  });

  it('Testando getById existente', async function () {
    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getById').resolves(mockIdSales);

    await salesController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWithExactly(mockIdSales);
  });

  it('Testando getById não existente', async function () {
    const req = { params: { id: 5000 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getById').resolves([]);

    await salesController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWithExactly({ message: 'Sale not found' });
  });

  it('Testando createdSale', async function () {
    const req = { body: newSale };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'createdSale').resolves({ message: '123' });

    await salesController.createdSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWithExactly({
      id: '123',
      itemsSold: newSale,
    });
  });
});
