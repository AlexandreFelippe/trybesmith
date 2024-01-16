import { Product } from "../../src/types/Product";

const validProduct: Product = {
  id: 7,
  name: 'Product 1',
  price: '100',
  orderId: 6,
};

const invalidProduct: Product = {
  id: 8,
  name: 'Product 2',
  price: '',
  orderId: 7,
};

export default {
  validProduct,
  invalidProduct,
};