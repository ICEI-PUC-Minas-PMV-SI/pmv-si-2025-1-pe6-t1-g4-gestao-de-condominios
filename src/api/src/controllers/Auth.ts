import { RequestPayload } from '@types';
import { JWT } from '@utilities';

class AuthController {
  auth(payload: RequestPayload) {
    const token = JWT.sign(payload);
    return token;
  }
}

const instance = new AuthController();

export { instance as AuthController };
