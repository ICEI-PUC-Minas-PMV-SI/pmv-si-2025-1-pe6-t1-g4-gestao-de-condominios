import { PrismaDB } from '@db';
import { RequestPayload } from '@types';
import { Prisma, Noticemanagement } from '@prisma/client';

class NoticemanagementService {
  async create(data: Prisma.NoticemanagementCreateInput) {
    return PrismaDB.noticemanagement.create({
      data,
      select: {
        id: true,
      },
    });
  }

  async find(noticemanagement: Partial<Noticemanagement>) {
    const where: Prisma.NoticemanagementWhereInput = {};

    if (noticemanagement.id) {
      where.id = noticemanagement.id;
    }
    if (noticemanagement.title) {
      where.title = noticemanagement.title;
    }
    if (noticemanagement.condominiumId) {
      where.condominiumId = noticemanagement.condominiumId;
    }

    if (Object.keys(where).length === 0) {
      throw new Error('INVALID_NOTICE_IDENTIFICATION');
    }

    return PrismaDB.noticemanagement.findFirstOrThrow({
      where,
    });
  }

  async update(data: Prisma.NoticemanagementUpdateInput) {
    const { id, ...updateData } = data;
    return PrismaDB.noticemanagement.update({
      where: { id: String(id) },
      data: updateData,
    });
  }

  async delete(payload: RequestPayload) {
    return PrismaDB.noticemanagement.delete({
      where: {
        id: payload.id,
      },
    });
  }

  async listAll() {
    return PrismaDB.noticemanagement.findMany();
  }
}

const instance = new NoticemanagementService();
export { instance as NoticemanagementService };
