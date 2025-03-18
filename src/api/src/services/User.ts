import { PrismaDB } from '@db';
import { PasswordHelper } from '@helpers';
import { Prisma, User } from '@prisma/client';
import { RequestPayload } from '@types';
import { JWT } from '@utilities';

class UserService {
  async create(data: Prisma.UserCreateInput) {
    const password = await PasswordHelper.encrypt(data.password);
    const user = await PrismaDB.user.create({
      data: { ...data, password },
      select: {
        id: true,
      },
    });
    return user;
  }
  async find(user: Partial<User>) {
    if (user.id) {
      return PrismaDB.user.findFirst({
        where: {
          id: user.id,
        },
        select: {
          name: true,
          email: true,
          profile: true,
          birthDate: true,
          contactPhone: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }
    return null;
  }
  async update(data: Prisma.UserCreateInput) {
    const { id, password, ...userData } = data;
    const encryptedPassword = await PasswordHelper.encrypt(password);
    const user = await PrismaDB.user.update({
      data: { ...userData, password: encryptedPassword },
      where: {
        id,
      },
    });
    return user;
  }
  async delete(payload: RequestPayload) {
    const deletedUser = await PrismaDB.user.delete({
      where: {
        id: payload.id,
      },
    });
    return deletedUser;
  }
}

const instance = new UserService();

export { instance as UserService };
