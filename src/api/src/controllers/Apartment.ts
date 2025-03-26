import { Prisma } from '@prisma/client';
import { ApartmentService } from '@services';
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

  async listAll() {
    return ApartmentService.listAll();
  }

  async assignUser({ id, userId }: { id: string; userId: string }) {
    return ApartmentService.assignUser(id, userId);
  }

  async unassignUser({ id, userId }: { id: string; userId: string }) {
    return ApartmentService.unassignUser(id, userId);
  }

}

const instance = new ApartmentController();
export { instance as ApartmentController };
