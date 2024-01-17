import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productService from '../../../src/services/product.service';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('should create a new product', async () => {
    const createProductStub = sinon.stub(productService, 'createProduct').resolves({
      status: 'SUCCESSFUL',
      data: {
        id: 1,
        name: 'Test Product',
        price: '10 gold pieces',
        orderId: 4,
      },
    });

    const response = await chai.request(app)
      .post('/products')
      .send({
        name: 'Test Product',
        price: '10 gold pieces',
        orderId: 4,
      });

    expect(response).to.have.status(201);
    expect(response.body).to.deep.equal({
      id: 1,
      name: 'Test Product',
      price: '10 gold pieces',
      orderId: 4,
    });
  });
});

