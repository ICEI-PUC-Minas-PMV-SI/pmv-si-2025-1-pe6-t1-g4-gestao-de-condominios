import React, { useState } from 'react';
import { View, Text, Pressable, Platform, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  mode?: 'date' | 'time' | 'datetime';
  defaultValue?: any;
  minimumDate?: any;
  maximumDate?: any;
  rules?: object;
};

function DatePickerField<T extends FieldValues>({
  control,
  name,
  label,
  mode = 'date',
  defaultValue,
  minimumDate,
  maximumDate,
  rules = {},
}: Props<T>) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          {label && <Text style={styles.label}>{label}</Text>}

          <Pressable onPress={() => setShowPicker(true)} style={styles.button}>
            <Text style={value ? { color: '#000000' } : { color: '#d1d5db' }}>
              {value ? value.toLocaleDateString() : 'Selecionar data'}
            </Text>
          </Pressable>

          {showPicker && (
            <DateTimePicker
              value={value || new Date()}
              mode={mode}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                setShowPicker(Platform.OS === 'ios');
                if (event.type === 'set' && selectedDate) {
                  onChange(selectedDate);
                }
              }}
            />
          )}

          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  button: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
  },
  dateText: {
    color: '#d1d5db',
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: 'red',
  },
});

export default DatePickerField;
