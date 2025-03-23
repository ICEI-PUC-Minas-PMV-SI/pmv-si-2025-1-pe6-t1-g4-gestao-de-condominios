import { RequestPayload } from '@types';
import { PrismaDB } from '@db';
import { PasswordHelper } from '@helpers';
import { JWT } from '@utilities';

class AuthController {
  async auth(payload: RequestPayload) {
    const user = await PrismaDB.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (!user) {
      return null;
    }
    const isValidPassword = await PasswordHelper.isValid(payload.password, user.password);
    if (!isValidPassword) return null;
    return JWT.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile,
    });
  }
}

const instance = new AuthController();

export { instance as AuthController };
