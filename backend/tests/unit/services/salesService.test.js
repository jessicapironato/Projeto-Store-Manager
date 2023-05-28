const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../src/services/salesService');
const salesModels = require('../../../src/models/salesModels');
const { mockAllSales } = require('../mocks/salesModelsMock');

describe('Testa Camada Service de Sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testa getAll', async function () {
    sinon.stub(salesModels, 'getAll').resolves(mockAllSales);

    const result = await salesService.getAll();
 
    expect(result).to.be.deep.equal(mockAllSales);
  });

  it('Testa getById existente', async function () {
    sinon.stub(salesModels, 'getById').resolves(mockAllSales[0]);
    const result = await salesService.getById(1);

    expect(result).to.be.deep.equal(mockAllSales[0]);
  });

  it('Testa getById inexistente', async function () {
    sinon.stub(salesModels, 'getById').resolves([]);

    const result = await salesService.getById(30000);

    return expect(result).to.be.an('array').that.is.empty;
  });
});
