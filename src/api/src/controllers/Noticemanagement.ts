import { Prisma } from '@prisma/client';
import { NoticemanagementService } from '@services';
import { RequestPayload } from '@types';

class NoticemanagementController {
  async create(payload: Prisma.NoticemanagementCreateInput) {
    return NoticemanagementService.create(payload);
  }

  async find(payload: RequestPayload) {
    return NoticemanagementService.find(payload);
  }

  async update(payload: Prisma.NoticemanagementUpdateInput) {
    return NoticemanagementService.update(payload);
  }

  async delete(payload: RequestPayload) {
    return NoticemanagementService.delete(payload);
  }

  async listAll() {
    return NoticemanagementService.listAll();
  }
}

const instance = new NoticemanagementController();
export { instance as NoticemanagementController };
