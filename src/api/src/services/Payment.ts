import { PrismaDB } from '@db';
import { Prisma, Payment } from '@prisma/client';
import { RequestPayload } from '@types';
import { PaginationHelper } from '@helpers';

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
      where.id = payment.id;
    }
    if (payment.amount) {
      where.amount = payment.amount;
    }
    if (payment.paymentDate) {
      where.paymentDate = payment.paymentDate;
    }
    if (payment.feeId) {
      where.feeId = payment.feeId;
    }
    if (payment.userId) {
      where.userId = payment.userId;
    }
    if (payment.apartmentId) {
      where.apartmentId = payment.apartmentId;
    }
    if (payment.condominiumId) {
      where.condominiumId = payment.condominiumId;
    }

    return PrismaDB.payment.findFirstOrThrow({
      where,
      include: {
        apartment: true,
        condominium: true,
      }
    });
  }

  async update(data: RequestPayload) {
    const { id, session, ...rest } = data;
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

  async listAll(params: RequestPayload) {
    const {session} = params;
    const where: Prisma.PaymentWhereInput = {};
    const pagination = params.pagination ? PaginationHelper.getOffsetPagination(params.pagination) : {};
    if (session.condominiumId) {
      where.condominiumId = session.condominiumId;
    }
    const [payments, total] = await Promise.all([
      PrismaDB.payment.findMany({...pagination, where }),
      PrismaDB.payment.count({ where }),
    ]);
    return { data: payments, 
      pagination: {
        ...pagination,
        total,
      }, 
    }
  }
}

const instance = new PaymentService();
export { instance as PaymentService };
