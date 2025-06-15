import PaymentCreate from '@/app/payment/Create';
import PaymentEdit from '@/app/payment/Edit';
import PaymentView from '@/app/payment/View';
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

export default function PaymentStack() {
  const navigation = useNavigation();
  const onBack = () => navigation.goBack();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="PaymentCreate"
          options={getHeaderOptions({ title: 'Cadastro de Pagamento', onBack })}
          component={PaymentCreate}
        />
        <Stack.Screen
          name="PaymentEdit"
          options={getHeaderOptions({ title: 'Editar Pagamento', onBack })}
          component={PaymentEdit}
        />
        <Stack.Screen
          name="PaymentView"
          options={getHeaderOptions({ title: 'Detalhes do Pagamento', onBack })}
          component={PaymentView}
        />
      </Stack.Navigator>
    </>
  );
}
