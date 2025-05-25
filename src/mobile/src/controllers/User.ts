import { User, UserCreatePayload, UserUpdatePayload } from '@/types/User';
import Request from '@/utilities/Request';

class UserController {
  async find() {
    return Request.get<User[]>('/users');
  }
  async update(params: UserUpdatePayload) {
    return Request.put(`/users/${params.id}`, params);
  }
  async create(params: UserCreatePayload) {
    return Request.post('/users', params);
  }
  async delete(userId: string) {
    return Request.delete(`/users/${userId}`);
  }
}

const instance = new UserController();
export { instance as UserController };
