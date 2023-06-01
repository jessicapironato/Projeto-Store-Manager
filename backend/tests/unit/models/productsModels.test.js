const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModels');
const connection = require('../../../src/models/connection');
const { mockGetAll, newProduct } = require('../mocks/productsModelMock');

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

  it('Testando create', async function () {
    sinon.stub(connection, 'execute').resolves([[newProduct]]);

    const result = await productsModel.create({ name: 'ProdutoX' });

    expect(result).to.be.deep.equal(newProduct);
  });

it('Testando updateProducts', async function () {
  const existingProduct = [{ id: 1, name: 'Existing Product' }];
  const updateResult = [{ affectedRows: 1 }];
  const executeStub = sinon.stub(connection, 'execute');

  executeStub.onFirstCall().resolves(existingProduct);
  executeStub.onSecondCall().resolves(updateResult);

  const result = await productsModel.updateProducts('Updated Product', 1);

  expect(executeStub.callCount).to.equal(2);

  expect(executeStub.firstCall.args[0]).to          
    .equal('SELECT * FROM StoreManager.products WHERE id = ?');

  expect(executeStub.firstCall.args[1]).to.deep.equal([1]);

  expect(executeStub.secondCall.args[0]).to
    .equal('UPDATE StoreManager.products SET name = ? WHERE id = ?');

  expect(executeStub.secondCall.args[1]).to.deep.equal(['Updated Product', 1]);

  expect(result).to.equal(1);
});

it('Testando deleteProducts', async function () {
  const executeStub = sinon.stub(connection, 'execute');

  executeStub.resolves();

  await productsModel.deleteProducts(1);

  expect(executeStub.callCount).to.equal(1);

  expect(executeStub.firstCall.args[0]).to
    .equal('DELETE FROM StoreManager.products WHERE id = ?');

  expect(executeStub.firstCall.args[1]).to.deep.equal([1]);
});
});