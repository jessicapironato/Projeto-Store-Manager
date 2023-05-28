const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');

const salesModels = require('../../../src/models/salesModels');
const { mockAllSales } = require('../mocks/salesModelsMock');

describe('Testa a camada Model de Sales', function () {
  afterEach(sinon.restore);
  
  it('Testando getAll', async function () {
    sinon.stub(connection, 'execute').resolves([mockAllSales]);

    const result = await salesModels.getAll();
   
    expect(result).to.be.deep.equal(mockAllSales);
  });

  it('Recuperando produto por id', async function () {
     sinon.stub(connection, 'execute').resolves([mockAllSales[1]]);
    
    const result = await salesModels.getById(1);
  
    expect(result).to.be.deep.equal(mockAllSales[1]);
  });
});