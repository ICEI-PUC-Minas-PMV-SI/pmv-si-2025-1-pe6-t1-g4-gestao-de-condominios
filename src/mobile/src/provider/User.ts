import { User } from '@/types/User';
import { IProvider } from './IProvider';
import { AbstractProvider } from './AbstractProvider';
import { ApiDataType } from '@/types/Data';

class UserProvider extends AbstractProvider<User> implements IProvider<User> {
  resource = 'users' as ApiDataType;
}

const instance = new UserProvider();
export { instance as UserProvider };
