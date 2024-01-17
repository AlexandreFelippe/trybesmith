import { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import chai from 'chai';
import 'mocha';
import sinon from 'sinon';
import productController from '../../../src/controllers/product.controller';
import productService from '../../../src/services/product.service';
import { Request, Response } from 'express';

chai.use(chaiHttp);
chai.use(sinonChai);

describe('Product Controller', () => {
  beforeEach(function () { sinon.restore(); });
  describe('createProduct', () => {
    it('should handle product creation and respond with 201 status', async () => {
      const req: Request = {
        body: {
          name: 'Test Product',
          price: '10 gold pieces',
          orderId: 4,
        },
      } as Request; // Garantir que o objeto tem o tipo Request

      const res: Response = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as Response; // Garantir que o objeto tem o tipo Response

      const createProductStub = sinon.stub(productService, 'createProduct').resolves({
        status: 'SUCCESSFUL',
        data: {
          id: 1,
          name: 'Test Product',
          price: '10 gold pieces',
          orderId: 4,
        },
      });

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 1,
        name: 'Test Product',
        price: '10 gold pieces',
        orderId: 4,
      });

      expect(createProductStub).to.have.been.calledOnce;
      createProductStub.restore();
    });

    it('should handle errors and respond with 500 status', async () => {
      const req: Request = {
        body: {
          name: 'Test Product',
          price: '10 gold pieces',
          orderId: 4,
        },
      } as Request;

      const res: Response = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as Response;

      const createProductStub = sinon.stub(productService, 'createProduct').rejects('Some error');

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(createProductStub).to.have.been.calledOnce;
      createProductStub.restore();
    });
    it('should list all products successfully', async () => {
      const req: Request = {} as Request;
      const res: Response = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as Response;

      const listProductsStub = sinon.stub(productService, 'listProducts').resolves({
        status: 'SUCCESSFUL',
        data: [
          {
            id: 1,
            name: 'Excalibur',
            price: '10 peças de ouro',
            orderId: 1,
          },
          {
            id: 2,
            name: 'Espada Justiceira',
            price: '20 peças de ouro',
            orderId: 1,
          },
        ],
      });

      await productController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([
        {
          id: 1,
          name: 'Excalibur',
          price: '10 peças de ouro',
          orderId: 1,
        },
        {
          id: 2,
          name: 'Espada Justiceira',
          price: '20 peças de ouro',
          orderId: 1,
        },
      ]);

      expect(listProductsStub).to.have.been.calledOnce;
    });
  });
});