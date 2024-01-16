import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'sequelize';
import ProductModel from '../../../src/database/models/product.model';
import ProductService from '../../../src/services/product.service';
import productsMock from '../../mocks/products.mock';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  it('Criando um produto com sucesso', async function () {
    const mockCreate = ProductModel.build(productsMock.validProduct);
    sinon.stub(ProductModel, 'create').resolves(mockCreate);
    const product = await ProductService.createProduct(productsMock.validProduct);
    expect(product).to.be.an('object');
    expect(product.status).to.be.equal('SUCCESSFUL');
    expect(product.data).to.be.deep.equal(productsMock.validProduct);
  });
  // it('Criando um produto com erro', async function () {
  //   const mockNoCreate = ProductModel.build(productsMock.invalidProduct);
  //   sinon.stub(ProductModel, 'create').resolves(mockNoCreate);
  //   const product = await ProductService.createProduct(productsMock.invalidProduct);
  //   expect(product).to.be.an('object');
  //   expect(product.status).to.be.equal('ERROR');
  // });
});