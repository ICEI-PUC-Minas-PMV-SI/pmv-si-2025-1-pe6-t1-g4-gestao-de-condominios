import { PrismaDB } from '@db';
import { PasswordHelper } from '@helpers';
import { Prisma, user } from '@prisma/client';
import { RequestPayload } from '@types';

class UserService {
  async create(data: Prisma.userCreateInput) {
    const password = await PasswordHelper.encrypt(data.password);
    const user = await PrismaDB.user.create({
      data: { ...data, password },
      select: {
        id: true,
      },
    });
    return user;
  }

  async find(user: Partial<user>, valuesToReturn: Prisma.userSelect = {}) {
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
        fcmToken: true,
      },
      valuesToReturn,
    );
    return PrismaDB.user.findUniqueOrThrow({ select, where });
  }

  async update(data: Prisma.userUpdateInput & { id: string }) {
    const { id, password, ...userData } = data;
    const finalData: Prisma.userUpdateInput = {
      ...userData,
    };

    if (password) {
      finalData.password = await PasswordHelper.encrypt(password as string);
    }

    const user = await PrismaDB.user.update({
      data: finalData,
      where: {
        id,
      },
    });
    return user;
  }

  async delete(payload: RequestPayload) {
    return PrismaDB.user.delete({
      where: {
        id: payload.id,
      },
    });
  }

  async listAll() {
    const users = await PrismaDB.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profile: true,
        birthDate: true,
        contactPhone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        apartment: {
          select: {
            id: true,
          },
        },
      },
    });

    return users.map(user => ({
      ...user,
      apartmentId: user.apartment?.id ?? null,
    }));
  }

  async resetPassword(email: string, password: string) {
    const encryptedPassword = await PasswordHelper.encrypt(password);
    return PrismaDB.user.update({
      data: {
        password: encryptedPassword,
      },
      where: {
        email,
      },
    });
  }

  async updateNotificationToken(userId: string, token: string) {
    return PrismaDB.user.update({
      where: { id: userId },
      data: { fcmToken: token },
    });
  }
  
}

const instance = new UserService();
export { instance as UserService };
