import { Prisma } from '@prisma/client';
import { PaymentService } from '@services';
import { RequestPayload } from '@types';

class PaymentController {
  async create(payload: Prisma.PaymentCreateInput) {
    return PaymentService.create(payload);
  }

  async find(payload: RequestPayload) {
    return PaymentService.find(payload);
  }

  async update(payload: Prisma.PaymentUpdateInput) {
    return PaymentService.update(payload);
  }

  async delete(payload: RequestPayload) {
    return PaymentService.delete(payload);
  }

  async listAll() {
    return PaymentService.listAll();
  }
}

const instance = new PaymentController();
export { instance as PaymentController };
