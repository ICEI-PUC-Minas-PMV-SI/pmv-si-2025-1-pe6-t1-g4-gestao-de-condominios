import { Prisma } from '@prisma/client';
import { ApartmentService } from '@services';
import { PaginationHelper } from '@helpers';
import { RequestPayload } from '@types';

class ApartmentController {
  async create(payload: Prisma.ApartmentCreateInput) {
    return ApartmentService.create(payload);
  }

  async find(payload: RequestPayload) {
    return ApartmentService.find(payload);
  }

  async update(payload: Prisma.ApartmentUpdateInput) {
    return ApartmentService.update(payload);
  }

  async delete(payload: RequestPayload) {
    return ApartmentService.delete(payload);
  }

  async listAll(payload: RequestPayload) {
    return ApartmentService.listAll(PaginationHelper.getOffsetPagination(payload));
  }

  async assignUser({ id, userId }: { id: string; userId: string }) {
    return ApartmentService.assignUser(id, userId);
  }

  async unassignUser({ id, userId }: { id: string; userId: string }) {
    return ApartmentService.unassignUser(id);
  }

}

const instance = new ApartmentController();
export { instance as ApartmentController };
