import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const productRouter = Router();

productRouter.post('/', ProductController.createProduct);
productRouter.get('/', ProductController.listProducts);

export default productRouter;