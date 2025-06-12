import { Prisma } from '@prisma/client';
import { SMTPProvider } from '@providers';
import { UserService } from '@services';
import { OTPTemplate } from '@templates';
import { RequestPayload, SessionData } from '@types';
import { ResetPasswordPayload } from '@types';
import { OTPUtil } from '@utilities';
import ms from 'ms';

class UserController {
  async create(payload: Prisma.UserCreateInput) {
    return UserService.create(payload);
  }
  async find(payload: RequestPayload) {
    return UserService.find(payload);
  }
  async update(payload: Prisma.UserUpdateInput & { id: string; session: SessionData }) {
    return UserService.update(payload);
  }
  async delete(payload: RequestPayload) {
    return UserService.delete(payload);
  }
  async listAll(payload: RequestPayload) {
    return UserService.listAll(payload);
  }
  async forgotPassword(payload: RequestPayload) {
    const user = await UserService.find({ email: payload.email }, { id: true });
    const secret = OTPUtil.generateSecret();

    await UserService.updateOTPSecret(user.id, secret);
    const otp = OTPUtil.generate(secret, ms('5m'));
    const { template, attachments } = OTPTemplate.build({ otp });
    await SMTPProvider.sendMail({
      body: template,
      subject: 'Recuperação de Senha',
      to: user.email,
      attachments,
    });
    return { message: 'recovery code sent by email' };
  }
  async validateOTP({ email, otp }: { email: string; otp: string }) {
    const user = await UserService.find({ email }, { otpSecret: true });
    if (!user.otpSecret) return false;

    return OTPUtil.verify(otp, user.otpSecret, ms('5m'));
  }
  async resetPassword({ newPassword, session }: ResetPasswordPayload) {
    const { email } = session;
    await UserService.resetPassword(email, newPassword);
  }
}

const instance = new UserController();

export { instance as UserController };
