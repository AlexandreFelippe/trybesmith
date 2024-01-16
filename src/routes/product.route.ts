import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const productRouter = Router();

productRouter.post('/', ProductController.createProduct);

export default productRouter;