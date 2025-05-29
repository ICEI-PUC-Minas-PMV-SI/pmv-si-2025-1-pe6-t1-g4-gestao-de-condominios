import { View } from 'react-native';
import ReadOnlyField, { ReadOnlyFieldType } from './ReadOnlyField';
import Button from '../Button';
import Icon from '../Icon';
import Text from '../Text';
import { Colors } from '@/styles/Colors';

type ComponentProps = {
  fields: ReadOnlyFieldType[];
  removeBtnLabel?: string;
  editBtnLabel?: string;
  onRemove: () => void;
  onEdit: () => void;
};

export default function FormView({
  fields,
  onRemove,
  onEdit,
  removeBtnLabel = 'Remover',
  editBtnLabel = 'Editar',
}: ComponentProps) {
  return (
    <View className="flex-column flex-1 w-full bg-white">
      <View className="justify-between" style={{ flex: 1 }}>
        <View className="m-6 gap-2">
          {fields.map((field) => (
            <ReadOnlyField key={field.name} field={field} />
          ))}
        </View>
        <View className="items-center flex-row justify-center">
          <Button className="p-4 bg-primary flex-1 mx-4" onPress={onEdit}>
            <Icon name="edit" color={Colors.white} />
            <Text className="text-white">{editBtnLabel}</Text>
          </Button>
          <Button className="p-4 border border-red-400 flex-1 mx-4" onPress={onRemove}>
            <Icon name="delete-outline" color="#f87171" />
            <Text className="text-red-400">{removeBtnLabel}</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
