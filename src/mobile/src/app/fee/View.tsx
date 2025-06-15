import { Fee } from '@/types/Fee';
import { useRoute } from '@react-navigation/native';
import { FeeFields } from './Fields';
import AppView from '../View';
import { FeeProvider } from '@/provider/Fee';

export default function FeeView() {
  const route = useRoute();
  const user = route.params as Fee;
  return (
    <AppView<Fee>
      editName="FeeEdit"
      viewFieldsFn={FeeFields.getViewFields}
      id={user.id}
      provider={FeeProvider}
      stackName="FeeStack"
      getDescriptionItemToRemove={(userData) => userData.name}
    />
  );
}
