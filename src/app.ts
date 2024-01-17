import express from 'express';
import productRouter from './routes/product.route';
import orderRouter from './routes/order.route';
import loginRouter from './routes/login.router';
import errorMiddleware from './middleware/error.middleware';

const app = express();

app.use(express.json());

app.use('/products', productRouter);

app.use('/orders', orderRouter);

app.use('/login', loginRouter);

app.use(errorMiddleware);

export default app;
