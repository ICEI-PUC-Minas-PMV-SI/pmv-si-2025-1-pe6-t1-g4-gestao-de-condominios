import { PrismaDB } from '@db';
import { Prisma, Apartment } from '@prisma/client';
import { RequestPayload } from '@types';

class ApartmentService {
  async create(data: Prisma.ApartmentCreateInput) {
    return PrismaDB.apartment.create({
      data,
      select: { id: true },
    });
  }

  async find(apartment: Partial<Apartment>) {
    const where: Prisma.ApartmentWhereInput = {};

    if (apartment.id) {
      where.id = apartment.id;
    }
    if (apartment.block) {
      where.block = apartment.block;
    }
    if (apartment.number) {
      where.number = apartment.number;
    }
    if (apartment.floor) {
      where.floor = apartment.floor;
    }
    if (apartment.condominiumId) {
      where.condominiumId = apartment.condominiumId;
    }

    if (Object.keys(where).length === 0) {
      throw new Error('INVALID_APARTMENT_IDENTIFICATION');
    }

    return PrismaDB.apartment.findFirstOrThrow({
      where,
    });
  }

  async assignUser(apartmentId: string, userId: string) {
    return PrismaDB.apartment.update({
      where: { id: apartmentId },
      data: {
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async unassignUser(apartmentId: string) {
    return PrismaDB.apartment.update({
      where: { id: apartmentId },
      data: {
        user: {
          disconnect: true,
        },
      },
    });
  }

  async update(data: Prisma.ApartmentUpdateInput) {
    const { id, ...apartmentData } = data as any;
    return PrismaDB.apartment.update({
      where: { id },
      data: apartmentData,
    });
  }

  async delete(payload: RequestPayload) {
    return PrismaDB.apartment.delete({
      where: { id: payload.id },
    });
  }

  async listAll() {
    return PrismaDB.apartment.findMany();
  }
}

const instance = new ApartmentService();
export { instance as ApartmentService };
