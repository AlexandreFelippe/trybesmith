import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number;
  username: string;
};

function sign(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return token;
}

function verify(token: string): void { 
  jwt.verify(token, secret) as TokenPayload;
}
export default {
  sign,
  verify,
};