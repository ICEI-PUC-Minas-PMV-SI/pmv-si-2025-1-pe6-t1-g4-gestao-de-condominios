import { Prisma } from '@prisma/client';
import { TaxService } from '@services';
import { RequestPayload } from '@types';

class TaxController {
  async create(payload: Prisma.TaxCreateInput) {
    return TaxService.create(payload);
  }

  async find(payload: RequestPayload) {
    return TaxService.find(payload);
  }

  async update(payload: Prisma.TaxUpdateInput) {
    return TaxService.update(payload);
  }

  async delete(payload: RequestPayload) {
    return TaxService.delete(payload);
  }

  async listAll() {
    return TaxService.listAll();
  }
}

const instance = new TaxController();
export { instance as TaxController };
