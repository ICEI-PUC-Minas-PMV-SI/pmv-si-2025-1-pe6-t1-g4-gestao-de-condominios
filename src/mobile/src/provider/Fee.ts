import { Fee } from '@/types/Fee';
import { IProvider } from './IProvider';
import { AbstractProvider } from './AbstractProvider';
import { ApiDataType } from '@/types/Data';

class FeeProvider extends AbstractProvider<Fee> implements IProvider<Fee> {
  resource = 'fees' as ApiDataType;
}

const instance = new FeeProvider();
export { instance as FeeProvider };
