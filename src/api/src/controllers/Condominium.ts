import { Prisma } from '@prisma/client';
import { CondominiumService } from '@services';
import { RequestPayload } from '@types';

class CondominiumController {
  async create(payload: Prisma.CondominiumCreateInput) {
    return CondominiumService.create(payload);
  }

  async find(payload: RequestPayload) {
    return CondominiumService.find(payload);
  }

  async update(payload: Prisma.CondominiumUpdateInput) {
    return CondominiumService.update(payload);
  }

  async delete(payload: RequestPayload) {
    return CondominiumService.delete(payload);
  }

  async listAll() {
    return CondominiumService.listAll();
  }
}

const instance = new CondominiumController();
export { instance as CondominiumController };
