import Button from '@/components/Button';
import StorageHandler from '@/helper/StorageHandler';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
  const navigation = useNavigation();
  return (
    <>
      <Button
        className="m-2 bg-primary p-6"
        labelClasses="text-white text-xl"
        text="Logout"
        onPress={() => {
          StorageHandler.clear().then(() => {
            navigation.navigate('Home');
          });
        }}
      />
    </>
  );
}
