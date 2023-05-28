const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModels');
const connection = require('../../../src/models/connection');
const { mockGetAll } = require('../mocks/productsModelMock');

describe('Testa a camada Model de Products', function () {
  afterEach(sinon.restore);
  
  it('Testando getAll', async function () {
    sinon.stub(connection, 'execute').resolves([mockGetAll]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.equal(mockGetAll);
  });

  it('Testando getById', async function () {
    sinon.stub(connection, 'execute').resolves([[mockGetAll[0]]]);

    const result = await productsModel.getById(1);

    expect(result).to.be.deep.equal(mockGetAll[0]);
  });
});