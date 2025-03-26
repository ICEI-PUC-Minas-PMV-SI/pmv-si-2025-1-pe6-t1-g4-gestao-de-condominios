import { Prisma } from '@prisma/client';
import { CommonAreaService } from '@services';
import { RequestPayload } from '@types';

class CommonAreaController {
  async create(payload: Prisma.CommonAreaCreateInput) {
    return CommonAreaService.create(payload);
  }

  async find(payload: RequestPayload) {
    return CommonAreaService.find(payload);
  }

  async update(payload: Prisma.CommonAreaUpdateInput) {
    return CommonAreaService.update(payload);
  }

  async delete(payload: RequestPayload) {
    return CommonAreaService.delete(payload);
  }

  async listAll() {
    return CommonAreaService.listAll();
  }
}

const instance = new CommonAreaController();
export { instance as CommonAreaController };
