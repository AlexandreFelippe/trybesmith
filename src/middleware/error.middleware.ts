import { ErrorRequestHandler } from 'express';

const errorMap: Record<string, number> = {
  UNAUTHENTICATED: 401,
  BAD_REQUEST: 400,
};

const errorMiddleware: ErrorRequestHandler = (err, req, res, _next) => {
  console.error(err.name, err.message);
  const [code, message] = err.message.split('|');
  const status = errorMap[code] ?? 500;
  res.status(status).json({ message });
};

export default errorMiddleware;