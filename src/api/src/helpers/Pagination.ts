import { PaginationArgs, OffsetPagination } from '@types';

class PaginationHelper {
  getOffsetPagination({ page = 1, per_page = 10 }: PaginationArgs): OffsetPagination {
    const take = per_page;
    const skip = (page - 1) * per_page;
    return { take, skip };
  }
}

const instance = new PaginationHelper();
export { instance as PaginationHelper };
