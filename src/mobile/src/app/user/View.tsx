import { User } from '@/types/User';
import { useRoute } from '@react-navigation/native';
import { UserFields } from './Fields';
import AppView from '../View';
import { UserProvider } from '@/provider/User';

export default function UserView() {
  const route = useRoute();
  const user = route.params as User;
  return (
    <AppView<User>
      editName="UserEdit"
      viewFieldsFn={UserFields.getViewFields}
      id={user.id}
      provider={UserProvider}
      stackName="UserStack"
      getDescriptionItemToRemove={(userData) => userData.name}
    />
  );
}
