import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const orderRouter = Router();

orderRouter.get('/', OrderController.listOrders);

export default orderRouter;