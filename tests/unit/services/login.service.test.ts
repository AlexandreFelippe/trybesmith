import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import { afterEach } from 'mocha';
import jwt from 'jsonwebtoken';
import UserModel from '../../../src/database/models/user.model';
import LoginService from '../../../src/services/login.service';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  it('Deve lançar erro Unauthorized com e-mail não encontrado', async function () {
    // arrange
    const login = { username: 'not-found-email', password: 'any-password' };
    sinon.stub(UserModel, 'findOne').resolves(null);
    // act
    let error: unknown;

    try {
      await LoginService.verifyLogin(login);
    } catch (err) {
      error = err;
    }

    expect(error).not.to.be.equal(undefined);
    expect((error as Error).message).to.be.equal('UNAUTHENTICATED|Username or password invalid');
  });
});
