import React from 'react';
import { KeyboardAvoidingView, KeyboardTypeOptions, ScrollView, StyleSheet, View } from 'react-native';
import { FieldValues, Path, RegisterOptions, useForm } from 'react-hook-form';
import FormFieldWrapper from '@/components/form/FieldWrapper';
import { Input } from '@/components/Input';
import Button from '@/components/Button';
import { Select } from '@/components/Select';
import DatePickerField from '@/components/form/DatePickerWrapper';
import SelectWrapper from '@/components/form/SelectWrapper';
import { TextContentType } from '@/types/Components';

export type FormFieldEdit<T extends FieldValues, RowItem> = {
  type: 'password' | 'text' | 'date' | 'email' | 'phone' | 'select' | 'select-wrapper';
  label: string;
  uniqueKey?: keyof RowItem;
  defaultValueKey?: keyof T;
  defaultValue?: any;
  name: Path<T>;
  placeholder?: string;
  rules?: Omit<RegisterOptions<T, Path<T>>, 'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'>;
  maximumDate?: any;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (value: string) => void;
  textContentType?: TextContentType;
  secureTextEntry?: boolean;
  mode?: 'time' | 'date' | 'datetime';
  valueFormat?: (value: string) => string;
  onlyDigits?: boolean;
  selectOptions?: any[];
  selectLabelKey?: string;
  selectValueKey?: string;
  dataSource?: {
    resource: string;
    uniqueKey: keyof RowItem;
  };
  editable?: boolean;
  getItemText?: (item: RowItem) => string;
  keyExtractor?: (item: RowItem) => string;
};

type ComponentProps<FormData extends FieldValues, RowItem> = {
  fields: FormFieldEdit<FormData, RowItem>[];
  onSubmit: (data: FormData) => void;
  data?: Partial<FormData>;
  submitBtnText?: string;
};

export default function FormEdit<FormData extends FieldValues, RowItem>({
  fields,
  onSubmit,
  submitBtnText = 'Cadastrar',
  data = {},
}: ComponentProps<FormData, RowItem>) {
  console.log('FormEdit', data, fields);
  const { control, handleSubmit } = useForm<FormData>();
  return (
    <KeyboardAvoidingView behavior={'height'} className="bg-white px-3 w-full" style={{ flex: 1 }}>
      <ScrollView className="px-5 mt-6">
        <View className="gap-5">
          {fields.map((field) => {
            if (field.type === 'date') {
              return (
                <DatePickerField
                  key={field.name}
                  control={control}
                  name={field.name}
                  mode={field.mode}
                  label={field.label}
                  defaultValue={data[field.name]}
                  maximumDate={field.maximumDate}
                />
              );
            }
            if (field.type === 'select-wrapper') {
              if (!field.dataSource) return <></>;
              return (
                <SelectWrapper<FormData, RowItem>
                  dataSource={field.dataSource}
                  key={field.name}
                  control={control}
                  name={field.name}
                  rules={{ required: true }}
                  getItemText={field.getItemText || (() => '')}
                  keyExtractor={field.keyExtractor || ((item: any) => item.id)}
                  label={field.label}
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValueKey ? data[field.defaultValueKey] : data[field.name]}
                />
              );
            }
            return (
              <FormFieldWrapper<FormData>
                key={field.name}
                name={field.name}
                label={field.label}
                control={control}
                rules={field.rules}
                defaultValue={data[field.name] || field.defaultValue}
              >
                {(value, onChange, onBlur) => {
                  if (['text', 'email', 'phone', 'password'].includes(field.type)) {
                    return (
                      <Input
                        editable={'editable' in field ? field.editable : true}
                        inputClasses={field.editable === false ? 'bg-gray-100' : ''}
                        style={styles.input}
                        placeholder={field.placeholder}
                        value={field.valueFormat ? field.valueFormat(value) : value}
                        secureTextEntry={field.secureTextEntry}
                        onChangeText={field.onlyDigits ? (text) => onChange((text || '').replace(/\D/g, '')) : onChange}
                        keyboardType={field.keyboardType}
                        textContentType={field.textContentType}
                        onBlur={onBlur}
                        defaultValue={data[field.name]}
                      />
                    );
                  }
                  if (field.type === 'select') {
                    return (
                      <Select
                        selectClasses="border-1"
                        options={field.selectOptions || []}
                        labelKey={field.selectLabelKey || ''}
                        valueKey={field.selectValueKey || ''}
                        placeholder={field.placeholder}
                        selectedValue={value}
                        onSelect={onChange}
                        defaultValue={data[field.name]}
                      />
                    );
                  }
                }}
              </FormFieldWrapper>
            );
          })}
        </View>
        <Button
          className="bg-primary p-4 justify-center mt-6 mb-16"
          labelClasses="text-center text-white"
          text={submitBtnText}
          withLoader
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 10,
    borderRadius: 5,
  },
});
