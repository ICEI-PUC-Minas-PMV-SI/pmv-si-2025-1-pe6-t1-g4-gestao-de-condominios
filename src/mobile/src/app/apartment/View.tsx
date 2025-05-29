import { useRoute } from '@react-navigation/native';
import { ApartmentFields } from './Fields';
import AppView from '../View';
import { Apartment } from '@/types/Data';
import { ApartmentProvider } from '@/provider/Apartment';
import { ApartmentText } from '@/helper/ApartmentText';

export default function ApartmentView() {
  const route = useRoute();
  const apartment = route.params as Apartment;
  return (
    <AppView<Apartment>
      editName="ApartmentEdit"
      viewFieldsFn={ApartmentFields.getViewFields}
      id={apartment.id}
      provider={ApartmentProvider}
      stackName="ApartmentStack"
      getDescriptionItemToRemove={ApartmentText.format}
    />
  );
}
