import { PrismaDB } from '@db';
import { RequestPayload } from '@types';
import { NoticeManagement, Prisma } from '@prisma/client';

class NoticeManagementService {
  async create(data: Prisma.NoticeManagementCreateInput) {
    // 1. Converte a `date` para Date
    const dateValue =
      data.date instanceof Date
        ? data.date
        : new Date(data.date as string);

    // 2. Monta o objeto final, incluindo timestamps
    const createData: Prisma.NoticeManagementCreateInput = {
      ...data,
      date: dateValue,
      createdAt: new Date(),
      updatedAt: new Date(),
      // Mantém o createdBy enviado ou define aqui um valor padrão
      createdBy: data.createdBy,
      updatedBy: data.updatedBy ?? data.createdBy,
    };

    return PrismaDB.noticeManagement.create({
      data: createData,
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
    const { id, date, updatedBy, ...rest } = data;

    // Converte date se veio como string
    const updatePayload: Prisma.NoticeManagementUpdateInput = {
      ...rest,
      ...(date !== undefined && {
        date: date instanceof Date ? date : new Date(date as string),
      }),
      // sobrescreve updatedBy e sempre atualiza o timestamp
      updatedBy,
      updatedAt: new Date(),
    };

    return PrismaDB.noticeManagement.update({
      where: { id: String(id) },
      data: updatePayload,
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
