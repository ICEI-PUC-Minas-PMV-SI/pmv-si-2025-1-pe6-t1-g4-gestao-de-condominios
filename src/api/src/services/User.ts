import { PrismaDB } from '@db';
import { PasswordHelper } from '@helpers';
import { Prisma, User } from '@prisma/client';
import { RequestPayload, SessionData } from '@types';

class UserService {
  async create(data: Prisma.UserCreateInput & { condominiumId?: string }) {
    const { password: uncryptedPassword, condominiumId, ...dataToSave } = data;
    const password = await PasswordHelper.encrypt(uncryptedPassword);
    const condominium = condominiumId ? { connect: { id: condominiumId } } : {};
    const user = await PrismaDB.user.create({
      data: { ...dataToSave, password, condominium },
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
        id: true,
        name: true,
        email: true,
        profile: true,
        birthDate: true,
        phone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        condominium: true,
      },
      valuesToReturn,
    );
    return PrismaDB.user.findUniqueOrThrow({ select, where });
  }

  async update(data: Prisma.UserUpdateInput & { id: string; session: SessionData; condominiumId?: string }) {
    const { id, password, session, condominiumId, ...userData } = data;
    const condominium = condominiumId ? { connect: { id: condominiumId } } : {};
    const finalData: Prisma.UserUpdateInput = {
      ...userData,
      condominium,
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
        phone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        apartment: {
          select: {
            id: true,
          },
        },
        condominium: {
          select: {
            id: true,
          },
        },
      },
    });

    return users.map((user) => ({
      ...user,
      apartmentId: user.apartment?.id ?? null,
      condominiumId: user.condominium?.id ?? null,
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
}

const instance = new UserService();
export { instance as UserService };
