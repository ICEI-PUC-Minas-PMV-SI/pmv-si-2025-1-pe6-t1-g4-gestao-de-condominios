import { Prisma } from '@prisma/client';
import { SMTPProvider } from '@providers';
import { UserService } from '@services';
import { OTPTemplate } from '@templates';
import { RequestPayload } from '@types';
import { OTPUtil } from '@utilities';
import ms from 'ms';

class UserController {
  async create(payload: Prisma.UserCreateInput) {
    return UserService.create(payload);
  }
  async find(payload: RequestPayload) {
    return UserService.find(payload);
  }
  async update(payload: Prisma.UserCreateInput) {
    return UserService.update(payload);
  }
  async delete(payload: RequestPayload) {
    return UserService.delete(payload);
  }
  async listAll() {
    return UserService.listAll();
  }
  async forgotPassword(payload: RequestPayload) {
    const user = await UserService.find({ email: payload.email }, { id: true });
    const secret = OTPUtil.generateSecret(user.id + user.email);
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
    const user = await UserService.find({ email }, { id: true });
    const secret = OTPUtil.generateSecret(user.id + email);
    return OTPUtil.verify(otp, secret);
  }
}

const instance = new UserController();

export { instance as UserController };
