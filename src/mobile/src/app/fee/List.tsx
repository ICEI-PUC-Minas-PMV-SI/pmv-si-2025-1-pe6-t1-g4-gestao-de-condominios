import { Fee } from '@/types/Fee';
import AppList from '../List';
import { FeeProvider } from '@/provider/Fee';

export default function FeeList() {
  return (
    <AppList<Fee>
      stackName="FeeStack"
      createName="FeeCreate"
      viewName="FeeView"
      getItemText={(fee) => fee.name}
      provider={FeeProvider}
      headers={[
        {
          name: 'fee',
          label: 'Taxa',
        },
      ]}
    />
  );
}
