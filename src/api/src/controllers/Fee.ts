import { Prisma } from '@prisma/client';
import { FeeService } from '@services';
import { RequestPayload } from '@types';

class FeeController {
  async create(payload: Prisma.FeeCreateInput) {
    return FeeService.create(payload);
  }

  async find(payload: RequestPayload) {
    return FeeService.find(payload);
  }

  async update(payload: Prisma.FeeUpdateInput) {
    return FeeService.update(payload);
  }

  async delete(payload: RequestPayload) {
    return FeeService.delete(payload);
  }

  async listAll() {
    return FeeService.listAll();
  }
}

const instance = new FeeController();
export { instance as FeeController };
