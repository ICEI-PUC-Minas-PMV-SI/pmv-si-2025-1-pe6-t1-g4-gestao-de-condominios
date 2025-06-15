import FeeCreate from '@/app/fee/Create';
import FeeEdit from '@/app/fee/Edit';
import FeeView from '@/app/fee/View';
import ModalPageHeader from '@/components/modal/Header';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

type HeaderOptionsProps = {
  onBack: () => void;
  title: string;
};

const getHeaderOptions = ({ onBack, title }: HeaderOptionsProps) => {
  return {
    header: () => {
      return <ModalPageHeader onBack={onBack} title={title} />;
    },
  };
};

export default function FeeStack() {
  const navigation = useNavigation();
  const onBack = () => navigation.goBack();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="FeeCreate"
          options={getHeaderOptions({ title: 'Cadastro de taxa', onBack })}
          component={FeeCreate}
        />
        <Stack.Screen
          name="FeeEdit"
          options={getHeaderOptions({ title: 'Editar taxa', onBack })}
          component={FeeEdit}
        />
        <Stack.Screen
          name="FeeView"
          options={getHeaderOptions({ title: 'Detalhes da taxa', onBack })}
          component={FeeView}
        />
      </Stack.Navigator>
    </>
  );
}
