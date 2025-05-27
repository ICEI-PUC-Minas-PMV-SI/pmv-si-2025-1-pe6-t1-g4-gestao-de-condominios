import ApartmentCreate from '@/app/apartment/Create';
import ApartmentEdit from '@/app/apartment/Edit';
import ApartmentView from '@/app/apartment/View';
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

export default function ApartmentStack() {
  const navigation = useNavigation();
  const onBack = () => navigation.goBack();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="ApartmentCreate"
          options={getHeaderOptions({ title: 'Cadastro de apartamento', onBack })}
          component={ApartmentCreate}
        />
        <Stack.Screen
          name="ApartmentEdit"
          options={getHeaderOptions({ title: 'Editar apartamento', onBack })}
          component={ApartmentEdit}
        />
        <Stack.Screen
          name="ApartmentView"
          options={getHeaderOptions({ title: 'Detalhes do apartamento', onBack })}
          component={ApartmentView}
        />
      </Stack.Navigator>
    </>
  );
}
