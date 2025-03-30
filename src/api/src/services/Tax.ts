import { PrismaDB } from '@db';
import { Tax, Prisma } from '@prisma/client';
import { RequestPayload } from '@types';

class TaxService {
  async create(data: Prisma.TaxCreateInput) {
    return PrismaDB.tax.create({
      data,
      select: {
        id: true,
      },
    });
  }

  async find(user: Partial<Tax>, valuesToReturn: Prisma.UserSelect = {}) {
    if (!user.id) {
      throw new Error('INVALID_TAX_IDENTIFICATION');
    }
    const where = { id: user.id };
    const select = Object.assign(
      {
        name: true,
        due: true,
        isRecurrent: true,
        createdAt: true,
        updatedAt: true,
      },
      valuesToReturn,
    );
    return PrismaDB.tax.findUniqueOrThrow({ select, where });
  }

  async update(data: RequestPayload) {
    const { id, session, ...updateData } = data;
    return PrismaDB.tax.update({
      data: updateData,
      where: { id },
    });
  }

  async delete(payload: RequestPayload) {
    return PrismaDB.tax.delete({
      where: { id: payload.id },
    });
  }

  async listAll() {
    return PrismaDB.tax.findMany();
  }
}

const instance = new TaxService();
export { instance as TaxService };
