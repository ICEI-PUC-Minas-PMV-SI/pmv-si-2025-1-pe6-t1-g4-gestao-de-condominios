import { View } from 'react-native';
import ModalPageHeader from '../modal/Header';
import ReadOnlyField, { ReadOnlyFieldType } from './ReadOnlyField';
import Button from '../Button';
import Icon from '../Icon';
import Text from '../Text';

type ComponentProps = {
  title: string;
  fields: ReadOnlyFieldType[];
  removeBtnLabel: string;
  onBack: () => void;
  onRemove: () => void;
};

export default function FormView({ title, fields, onBack, onRemove }: ComponentProps) {
  return (
    <View className="flex-column h-full w-full bg-white">
      <ModalPageHeader title={title || 'Detalhes do Usuário'} onBack={onBack} />
      <View className="justify-between" style={{ flex: 1 }}>
        <View className="m-6 gap-2">
          {fields.map((field) => (
            <ReadOnlyField key={field.name} field={field} />
          ))}
        </View>
        <View className="items-center m-6">
          <Button className="p-4 border border-red-400" onPress={onRemove}>
            <Icon name="delete-outline" color="#f87171" />
            <Text className="text-red-400">Remover Usuário</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
