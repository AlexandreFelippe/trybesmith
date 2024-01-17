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

const listProducts = async (): Promise<ServiceResponse<Product[]>> => {
  try {
    const products = await ProductModel.findAll();
    const serviceResponse = {
      status: 'SUCCESSFUL',
      data: products.map((product) => product.toJSON() as Product),
    };

    return serviceResponse;
  } catch (error) {
    console.error('Error listing products:', error);
    throw new Error('Error listing products');
  }
};

export default { createProduct, listProducts };