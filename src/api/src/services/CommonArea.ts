import { PrismaDB } from '@db';
import { RequestPayload } from '@types';
import { Prisma, CommonArea } from '@prisma/client';

class CommonAreaService {
  async create(data: Prisma.CommonAreaCreateInput) {
    return PrismaDB.commonArea.create({
      data,
      select: {
        id: true,
      },
    });
  }

  async find(commonArea: Partial<CommonArea>) {
    const where: Prisma.CommonAreaWhereInput = {};

    if (commonArea.id) {
      where.id = commonArea.id;
    }
    if (commonArea.type) {
      where.type = commonArea.type;
    }
    if (commonArea.quantity) {
      where.quantity = commonArea.quantity;
    }
    if (commonArea.condominiumId) {
      where.condominiumId = commonArea.condominiumId;
    }

    if (Object.keys(where).length === 0) {
      throw new Error('INVALID_COMMON_AREA_IDENTIFICATION');
    }

    return PrismaDB.commonArea.findFirstOrThrow({
      where,
    });
  }

  async update(data: Prisma.CommonAreaUpdateInput) {
    const { id, ...updateData } = data;
    return PrismaDB.commonArea.update({
      where: { id: String(id) },
      data: updateData,
    });
  }

  async delete(payload: RequestPayload) {
    return PrismaDB.commonArea.delete({
      where: {
        id: payload.id,
      },
    });
  }

  async listAll() {
    return PrismaDB.commonArea.findMany();
  }
}

const instance = new CommonAreaService();
export { instance as CommonAreaService };
