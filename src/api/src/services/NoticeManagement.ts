import { PrismaDB } from '@db';
import { RequestPayload } from '@types';
import { Noticemanagement, Prisma,  } from '@prisma/client';

class NoticeManagementService {
  async create(data: Prisma.NoticemanagementCreateInput) {
    return PrismaDB.noticemanagement.create({
      data,
      select: {
        id: true,
      },
    });
  }

  async find(noticeManagement: Partial<Noticemanagement>) {
    const where: Prisma.NoticemanagementWhereInput = {};

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

const instance = new NoticeManagementService();
export { instance as NoticeManagementService };
