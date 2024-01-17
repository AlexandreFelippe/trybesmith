import bcrypt from 'bcryptjs';
import jwtUtil from '../utils/jwt.util';
import { ServiceResponse } from '../types/ServiceResponse';
import UserModel from '../database/models/user.model';
import { Token } from '../types/Token';
import { Login } from '../types/Login';

async function verifyLogin(login: Login): Promise<ServiceResponse<Token>> {
  if (!login.username || !login.password) {
    throw new Error('BAD_REQUEST|"username" and "password" are required');
  }
  const foundUser = await UserModel.findOne({ where: { username: login.username } });
  if (!foundUser) {
    throw new Error('UNAUTHENTICATED|Username or password invalid');
  }
  const ValidPassword = await bcrypt.compare(login.password, foundUser.dataValues.password);
  if (!ValidPassword) {
    throw new Error('UNAUTHENTICATED|Username or password invalid');
  }
  const { id, username } = foundUser.dataValues;
  const token = jwtUtil.sign({ id, username });
  return { status: 'SUCCESSFUL', data: { token } };
}

export default { verifyLogin };
