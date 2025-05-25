import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Controller, Control, FieldValues, RegisterOptions, Path } from 'react-hook-form';
import Text from '../Text';
type FormFieldWrapperProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: Omit<RegisterOptions<T, Path<T>>, 'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'>;
  defaultValue?: any;
  label?: string;
  children: (value: any, onChange: (value: any) => void, onBlur: () => void) => React.ReactNode;
};

function FormFieldWrapper<T extends FieldValues>({
  name,
  control,
  rules = {},
  defaultValue = '',
  label,
  children,
}: FormFieldWrapperProps<T>) {
  const handledRules = rules;
  if (handledRules.required === true) {
    handledRules.required = `* Campo obrigatório`;
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={handledRules}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <View className="flex-row">
            {label && <Text style={styles.label}>{label}</Text>}
            {handledRules.required && <Text className="text-red-500 ps-1">*</Text>}
          </View>
          {children(value, onChange, onBlur)}

          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginStart: 4,
  },
});

export default FormFieldWrapper;
