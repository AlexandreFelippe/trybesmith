import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import orderService from '../../../src/services/order.service';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('should return a successful service response when listing orders', async () => {
    const response = await orderService.listOrders();

    expect(response.status).equal('SUCCESSFUL');
  });
});
