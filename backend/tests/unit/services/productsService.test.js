const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../src/services/productsService');
const productsModel = require('../../../src/models/productsModels');
const { mockGetAll, newProduct } = require('../mocks/productsModelMock');

describe('Testa Camada Service de Products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testa getAll', async function () {
    sinon.stub(productsModel, 'getAll').resolves(mockGetAll);

    const result = await productsService.getAll();
 
    expect(result).to.be.deep.equal(mockGetAll);
  });

  it('Testa getById existente', async function () {
    sinon.stub(productsModel, 'getById').resolves(mockGetAll[0]);
    const result = await productsService.getById(1);

    expect(result).to.be.deep.equal(mockGetAll[0]);
  });

  it('Testa getById inexistente', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const result = await productsService.getById(30000);

    expect(result).to.be.deep.equal(false);
  });

  it('Testa create', async function () {
    sinon.stub(productsModel, 'create').resolves(newProduct);

    const result = await productsService.create({ name: 'ProdutoX' });

    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(newProduct);
  });
});
