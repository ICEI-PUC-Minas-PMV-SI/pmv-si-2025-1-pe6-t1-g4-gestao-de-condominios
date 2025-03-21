import { PrismaDB } from '@db';
import { PasswordHelper } from '@helpers';
import { Prisma, User } from '@prisma/client';
import { RequestPayload } from '@types';

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
  async find(user: Partial<User>, valuesToReturn: Prisma.UserSelect = {}) {
    if (!user.id && !user.email) {
      throw new Error('INVALID_USER_IDENTIFICATION');
    }
    const where = user.id ? { id: user.id } : { email: user.email };
    const select = Object.assign(
      {
        name: true,
        email: true,
        profile: true,
        birthDate: true,
        contactPhone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      valuesToReturn
    );
    return PrismaDB.user.findUniqueOrThrow({ select, where });
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
  async listAll() {
    return PrismaDB.user.findMany({
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
}

const instance = new UserService();

export { instance as UserService };
