import { Prisma } from '@prisma/client';
import { UserService } from '@services';
import { RequestPayload } from '@types';

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
}

const instance = new UserController();

export { instance as UserController };
