import Request from '@/utilities/Request';

class AuthController {
  authenticate(email: string, password: string) {
    return Request.post('/auth', { email, password });
  }
}

const instance = new AuthController();
export { instance as AuthController };
