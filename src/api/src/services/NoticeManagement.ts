import { PrismaDB } from '@db';
import { RequestPayload } from '@types';
import { NoticeManagement, Prisma,  } from '@prisma/client';

class NoticeManagementService {
  async create(data: Prisma.NoticeManagementCreateInput) {
    return PrismaDB.noticeManagement.create({
      data,
      select: {
        id: true,
      },
    });
  }

  async find(noticeManagement: Partial<NoticeManagement>) {
    const where: Prisma.NoticeManagementWhereInput = {};

    if (noticeManagement.id) {
      where.id = noticeManagement.id;
    }
    if (noticeManagement.title) {
      where.title = noticeManagement.title;
    }
    if (noticeManagement.condominiumId) {
      where.condominiumId = noticeManagement.condominiumId;
    }

    if (Object.keys(where).length === 0) {
      throw new Error('INVALID_NOTICE_IDENTIFICATION');
    }

    return PrismaDB.noticeManagement.findFirstOrThrow({
      where,
    });
  }

  async update(data: Prisma.NoticeManagementUpdateInput) {
    const { id, ...updateData } = data;
    return PrismaDB.noticeManagement.update({
      where: { id: String(id) },
      data: updateData,
    });
  }

  async delete(payload: RequestPayload) {
    return PrismaDB.noticeManagement.delete({
      where: {
        id: payload.id,
      },
    });
  }

  async listAll() {
    return PrismaDB.noticeManagement.findMany();
  }
}

const instance = new NoticeManagementService();
export { instance as NoticeManagementService };
