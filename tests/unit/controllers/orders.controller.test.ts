import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import orderController from '../../../src/controllers/order.controller';
import orderService from '../../../src/services/order.service';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  describe('listOrders', function () {
    it('should return 200 with orders', async function () {
      const orders = [{ id: 1, userId: 1, productIds: [1, 2] }];
      const listOrders = sinon.stub().resolves({ status: 'SUCCESSFUL', data: orders });
      sinon.replace(orderService, 'listOrders', listOrders);

      await orderController.listOrders(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(orders);
    });
    it('should return 500 when an error occurs', async function () {
      const error = new Error('Internal Server Error');
      const listOrders = sinon.stub().rejects(error);
      sinon.replace(orderService, 'listOrders', listOrders);

      await orderController.listOrders(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: 'Internal Server Error' });
    });
  }
  );
});
