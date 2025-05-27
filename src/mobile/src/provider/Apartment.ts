import { IProvider } from './IProvider';
import { AbstractProvider } from './AbstractProvider';
import { Apartment, ApiDataType } from '@/types/Data';

class ApartmentProvider extends AbstractProvider<Apartment> implements IProvider<Apartment> {
  resource = 'apartments' as ApiDataType;
}

const instance = new ApartmentProvider();
export { instance as ApartmentProvider };
