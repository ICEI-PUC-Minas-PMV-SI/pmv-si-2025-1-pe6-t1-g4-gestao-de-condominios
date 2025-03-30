import { PrismaDB } from '@db';
import { Prisma, Payment } from '@prisma/client';
import { RequestPayload } from '@types';

class PaymentService {
  async create(data: Prisma.PaymentCreateInput) {
    return PrismaDB.payment.create({
      data,
      select: {
        id: true,
      },
    });
  }

  async find(payment: Partial<Payment>) {
    const where: Prisma.PaymentWhereInput = {};

    if (payment.id) {
      payment.id = payment.id;
    }
    if (payment.amount) {
      where.amount = payment.amount;
    }
    if (payment.taxId) {
      where.taxId = payment.taxId;
    }
    if (payment.userId) {
      where.userId = payment.userId;
    }
    if (payment.apartmentId) {
      where.apartmentId = payment.apartmentId;
    }

    return PrismaDB.payment.findFirstOrThrow({
      where,
    });
  }

  async update(data: RequestPayload) {
    const { id, ...rest } = data;
    return PrismaDB.payment.update({
      data: rest,
      where: { id: String(id) },
    });
  }

  async delete(payload: RequestPayload) {
    return PrismaDB.payment.delete({
      where: { id: payload.id },
    });
  }

  async listAll() {
    return PrismaDB.payment.findMany();
  }
}

const instance = new PaymentService();
export { instance as PaymentService };
