import { PrismaDB } from '@db';
import { Fee, Prisma } from '@prisma/client';
import { RequestPayload } from '@types';
import { PaginationHelper } from '@helpers';

class FeeService {
  async create(data: Prisma.FeeCreateInput) {
    return PrismaDB.fee.create({
      data,
      select: {
        id: true,
      },
    });
  }

  async find(user: Partial<Fee>, valuesToReturn: Prisma.UserSelect = {}) {
    if (!user.id) {
      throw new Error('INVALID_FEE_IDENTIFICATION');
    }
    const where = { id: user.id };
    const select = Object.assign(
      {
        name: true,
        due: true,
        isRecurrent: true,
        type: true,
        condominiumId: true,
        createdAt: true,
        updatedAt: true,        
        condominium: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      valuesToReturn,
    );
    return PrismaDB.fee.findUniqueOrThrow({ select, where });
  }

  async update(data: RequestPayload) {
    const { id, session, condominiumId, ...updateData } = data;
    const condoId = condominiumId || session.condominiumId;

    const prismaUpdateData: any = {
      ...updateData,
    };

    if (condoId) {
      prismaUpdateData.condominium = {
        connect: { id: condoId },
      };
    }

    return PrismaDB.fee.update({
      data: prismaUpdateData,
      where: { id },
    });
  }

  async delete(payload: RequestPayload) {
    return PrismaDB.fee.delete({
      where: { id: payload.id },
    });
  }

  async listAll(params: RequestPayload) {
    const {session} = params;
    const where: Prisma.FeeWhereInput = {};
    const pagination = params.pagination ? PaginationHelper.getOffsetPagination(params.pagination) : {};
    if (session.condominiumId) {
      where.condominiumId = session.condominiumId;
    }

    const [fees, total] = await Promise.all([
      PrismaDB.fee.findMany({...pagination, where }),
      PrismaDB.fee.count({ where }),
    ]);
    return { data: fees, 
      pagination: {
        ...pagination,
        total,
      }, 
    };
  }
}

const instance = new FeeService();
export { instance as FeeService };
