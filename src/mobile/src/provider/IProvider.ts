import { ApiDataObj, ApiDataType } from '@/types/Data';

export interface IProvider<DataType> {
  resource: ApiDataType | null;
  create: (data: ApiDataObj) => Promise<void>;
  read: ({ id, filter }: { id: string; filter?: ApiDataObj }) => Promise<DataType>;
  list: ({ filter }: { filter?: ApiDataObj }) => Promise<{
    data: DataType[];
    pagination: {
      skip: number;
      total: number;
    };
  }>;
  update: (id: string, data: ApiDataObj) => Promise<void>;
  delete: (id: string) => void;
}
