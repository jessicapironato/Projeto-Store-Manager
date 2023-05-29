const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsControler');
const { mockGetAll, mockById } = require('../mocks/productsModelMock');
const validateProducts = require('../../../src/middlewares/validateProducts');

describe('Testes Camada Controller de Products', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testando getAll', async function () {
    const req = { };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAll').resolves(mockGetAll);
    await productsController.getAll(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockGetAll);
  });

  it('Testando getById existente', async function () {
    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getById').resolves(mockById);
    await productsController.getById(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockById);
  });

  it('Testando getById não existente', async function () {
    const req = { params: { id: 5000 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getById').resolves(false);
    await productsController.getById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Testando create com nome requerido', async function () {
    const req = { body: { name: '' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateProducts(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Deve retornar o status 422 se body name possuir menos de 5 caracteres', async function () {
    const res = {};
    const req = { body: { name: 'Prod' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateProducts(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json)
    .to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
});
