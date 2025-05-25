import { StyleSheet, TextInput, View } from 'react-native';
import Text from '../Text';

export type ReadOnlyFieldType = {
  value?: string | null;
  label: string;
  name: string;
};

type ComponentProps = {
  field: ReadOnlyFieldType;
};

export default function ReadOnlyField({ field }: ComponentProps) {
  return (
    <View key={field.label}>
      <Text style={styles.label}>{field.label}</Text>
      <View className="flex flex-col gap-1.5">
        <TextInput
          value={field.value || '-'}
          className="border border-gray-300 border-input py-2.5 px-4 rounded-lg text-gray-400"
          placeholderTextColor={'#ccc'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
});
