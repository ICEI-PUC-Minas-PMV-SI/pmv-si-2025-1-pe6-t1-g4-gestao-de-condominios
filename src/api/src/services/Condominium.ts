import { PrismaDB } from '@db';
import { Condominium, Prisma } from '@prisma/client';
import { RequestPayload } from '@types';

class CondominiumService {
  async create(data: Prisma.CondominiumCreateInput) {
    return PrismaDB.condominium.create({
      data,
      select: {
        id: true,
      },
    });
  }

  async find(condominium: Partial<Condominium>, valuesToReturn: Prisma.CondominiumSelect = {}) {
    const where: Prisma.CondominiumWhereInput = {};

    if (condominium.id) {
      where.id = condominium.id;
    }
    if (condominium.name) {
      where.name = condominium.name;
    }
    if (condominium.address) {
      where.address = condominium.address;
    }

    if (Object.keys(where).length === 0) {
      throw new Error('INVALID_CONDOMINIUM_IDENTIFICATION');
    }

    return PrismaDB.condominium.findFirstOrThrow({
      where,
    });

    const select = Object.assign(
      {
        name: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
      valuesToReturn,
    );
    return PrismaDB.condominium.findUniqueOrThrow({
      where: { id: condominium.id },
      select,
    });
  }

  async update(data: RequestPayload) {
    const { id, ...rest } = data;
    return PrismaDB.condominium.update({
      data: rest,
      where: { id },
    });
  }

  async delete(payload: RequestPayload) {
    return PrismaDB.condominium.delete({
      where: { id: payload.id },
    });
  }

  async listAll() {
    return PrismaDB.condominium.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}

const instance = new CondominiumService();
export { instance as CondominiumService };
