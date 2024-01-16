import { Request, Response } from 'express';
import productService from '../services/product.service';

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const createdProduct = await productService.createProduct(req.body);
    res.status(201).json(createdProduct.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { createProduct };