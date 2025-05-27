import { User } from '@/types/User';
import AppList from '../List';
import { UserProvider } from '@/provider/User';

export default function UserList() {
  return (
    <AppList<User>
      stackName="UserStack"
      createName="UserCreate"
      viewName="UserView"
      getItemText={(user) => user.name}
      provider={UserProvider}
    />
  );
}
