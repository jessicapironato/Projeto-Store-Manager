const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsControler');
const { mockGetAll, mockById } = require('../mocks/productsModelMock');

describe('Testes Camada Controller', function () {
  afterEach(sinon.restore);

  const req = { params: { id: '1' } };
  const res = {};
  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    });

  it('Testando getAll', async function () {
    sinon.stub(productsService, 'getAll').resolves(mockGetAll);
    await productsController.getAll(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockGetAll);
  });

  it('Testando getById existente', async function () {
    sinon.stub(productsService, 'getById').resolves(mockById);
    await productsController.getById(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockById);
  });
});
