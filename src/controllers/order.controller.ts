import { Request, Response } from 'express';
import orderService from '../services/order.service';

const listOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.listOrders();
    res.status(200).json(orders.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { listOrders };