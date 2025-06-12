import Request from '@/utilities/Request';

class AuthController {
  authenticate(email: string, password: string) {
    return Request.post('/auth', { email, password });
  }
  sendOTP(email: string) {
    return Request.post('/users/forgot-password', { email });
  }
  verifyOTP(email: string, otp: string) {
    return Request.post('/users/forgot-password/validate-otp', {email, otp});
  }
  changePassword(newPassword: string) {
    return Request.post('/users/reset-password', { newPassword })
  }
}

const instance = new AuthController();
export { instance as AuthController };
