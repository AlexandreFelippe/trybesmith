import { Request, Response } from 'express';
import loginService from '../services/login.service';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const serviceResponse = await loginService.verifyLogin({ username, password });
  
  res.status(200).json(serviceResponse.data);
};

export default { login };
