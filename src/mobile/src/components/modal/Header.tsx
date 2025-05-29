import { View } from 'react-native';
import Button from '../Button';
import Icon from '../Icon';
import Text from '../Text';
import { Colors } from '@/styles/Colors';

type ComponentProps = {
  onBack: () => void;
  title: string;
};

export default function ModalPageHeader({ onBack, title }: ComponentProps) {
  return (
    <View className="bg-white shadow-md shadow-black elevation-4 w-full">
      <Button className="p-4 items-center" onPress={onBack}>
        <Icon name="keyboard-arrow-left" size={28} color={Colors.black} />
        <Text className="text-xl">{title}</Text>
      </Button>
    </View>
  );
}
