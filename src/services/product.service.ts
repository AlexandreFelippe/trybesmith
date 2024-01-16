import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { Product } from '../types/Product';

const createProduct = async (product: ProductInputtableTypes):
Promise<ServiceResponse<Product>> => {
  const createdProduct = await ProductModel.create(product);
  const serviceResponse = {
    status: 'SUCCESSFUL',
    data: createdProduct.toJSON() as Product,
  };
  
  return serviceResponse;
};

export default { createProduct };