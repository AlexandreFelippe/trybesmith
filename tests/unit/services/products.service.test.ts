import { expect } from 'chai';
import sinon from 'sinon';
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
  it('should handle errors during product listing', async () => {
    const findAllStub = sinon.stub(ProductModel, 'findAll').rejects(new Error('Some error'));

    try {
      await ProductService.listProducts();
    } catch (error: any) {
      expect(error.message).to.equal('Error listing products');
    }

    findAllStub.restore();
    expect(findAllStub).to.have.been.calledOnce;
  });
});