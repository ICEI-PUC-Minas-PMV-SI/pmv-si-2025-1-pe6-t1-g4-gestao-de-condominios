import { ApiDataObj, ApiDataType } from '@/types/Data';
import { IProvider } from './IProvider';
import Request from '@/utilities/Request';
import { PageEvent } from '@/events/Page';

export abstract class AbstractProvider<T> implements IProvider<T> {
  resource: ApiDataType | null = null;

  async create(data: ApiDataObj) {
    if (!this.resource) {
      throw new Error('Invalid value for resource');
    }
    await Request.post(this.resource, data);
    PageEvent.reload(this.resource, 'list');
  }
  async read({ id, filter = {} }: { id: string; filter?: ApiDataObj }) {
    return Request.get<T>(`/${this.resource}/${id}`, filter);
  }
  async list({ filter = {} }: { filter?: ApiDataObj }) {
    return Request.get<{
      data: T[];
      pagination: {
        skip: number;
        total: number;
      };
    }>(`/${this.resource}`, filter);
  }
  async update(id: string, data: ApiDataObj) {
    if (!this.resource) {
      throw new Error('Invalid value for resource');
    }
    await Request.put(`/${this.resource}/${id}`, data);
    PageEvent.reload(this.resource, ['list', 'view']);
  }
  async delete(id: string) {
    if (!this.resource) {
      throw new Error('Invalid value for resource');
    }
    PageEvent.reload(this.resource, 'list');
    return Request.delete(`/${this.resource}/${id}`);
  }
}
