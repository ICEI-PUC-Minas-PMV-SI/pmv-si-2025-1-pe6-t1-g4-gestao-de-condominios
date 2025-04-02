import { Prisma } from '@prisma/client';
import { NoticeManagementService } from '@services';
import { RequestPayload } from '@types';

class NoticeManagementController {
  async create(payload: Prisma.NoticeManagementCreateInput) {
    return NoticeManagementService.create(payload);
  }

  async find(payload: RequestPayload) {
    return NoticeManagementService.find(payload);
  }

  async update(payload: Prisma.NoticeManagementUpdateInput) {
    return NoticeManagementService.update(payload);
  }

  async delete(payload: RequestPayload) {
    return NoticeManagementService.delete(payload);
  }

  async listAll() {
    return NoticeManagementService.listAll();
  }
}

const instance = new NoticeManagementController();
export { instance as NoticeManagementController };
