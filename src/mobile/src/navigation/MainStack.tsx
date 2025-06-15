import Dashboard from '@/app/Dashboard';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserList from '@/app/user/List';
import ApartmentList from '@/app/apartment/List';
import FeeList from '@/app/fee/List';
import PaymentList from '@/app/payment/List';

const Drawer = createDrawerNavigator();

export default function MainStack() {
  return (
    <>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="User" options={{ title: 'Usuários' }} component={UserList} />
        <Drawer.Screen name="Apartment" options={{ title: 'Apartamentos' }} component={ApartmentList} />
        <Drawer.Screen name="Fee" options={{ title: 'Taxas' }} component={FeeList} />
        <Drawer.Screen name="Payment" options={{ title: 'Pagamento' }} component={PaymentList} />
      </Drawer.Navigator>
    </>
  );
}
