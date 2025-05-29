import { Apartment } from '@/types/Data';
import AppList from '@/app/List';
import { ApartmentProvider } from '@/provider/Apartment';
import { ApartmentText } from '@/helper/ApartmentText';

export default function ApartmentList() {
  return (
    <AppList<Apartment>
      stackName="ApartmentStack"
      createName="ApartmentCreate"
      viewName="ApartmentView"
      getItemText={ApartmentText.format}
      provider={ApartmentProvider}
      headers={[
        {
          name: 'apartment',
          label: 'Apartamento',
        },
      ]}
    />
  );
}
