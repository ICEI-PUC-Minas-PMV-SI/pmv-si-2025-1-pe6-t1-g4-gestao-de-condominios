import Dashboard from '@/app/Dashboard';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserList from '@/app/user/List';

const Drawer = createDrawerNavigator();

export default function MainStack() {
  return (
    <>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="User" options={{ title: 'Usuários' }} component={UserList} />
        {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
      </Drawer.Navigator>
    </>
  );
}
