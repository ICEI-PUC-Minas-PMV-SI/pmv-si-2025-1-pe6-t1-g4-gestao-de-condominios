import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Modal, TextInput } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import FormFieldWrapper from '@/components/form/FieldWrapper';
import Button from '@/components/Button';
import Text from '@/components/Text';
import Request from '@/utilities/Request';

type SelectWrapperProps<T, K> = {
  name: string;
  control: any;
  rules?: any;
  defaultValue?: T | null;
  label?: string;
  dataSource: {
    resource: string;
    uniqueKey: keyof K;
  };
  keyExtractor: (item: K, index?: number) => string;
  getItemText: (item: K) => string;
  placeholder?: string;
  placeholderSearch?: string;
  modalTitle?: string;
  onCancel?: () => void;
};

export default function SelectWrapper<T, K>({
  name,
  control,
  rules,
  defaultValue = null,
  label,
  keyExtractor,
  getItemText,
  placeholder = 'Selecione...',
  placeholderSearch = 'Pesquisar...',
  modalTitle,
  onCancel,
  dataSource,
}: SelectWrapperProps<T, K>) {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<K[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Request.get('/' + dataSource.resource);
      setData(result);
    };
    fetchData();
  }, []);

  const handleOpen = () => setVisible(true);
  const handleClose = () => {
    setVisible(false);
    onCancel?.();
  };

  const selectedRow = data.find((row) => row[dataSource.uniqueKey] === defaultValue);
  const initialValue = selectedRow ? getItemText(selectedRow) : '';

  return (
    <FormFieldWrapper name={name as any} control={control} rules={rules} defaultValue={defaultValue} label={label}>
      {(value: K | null, onChange: (val: K) => void) => (
        <>
          <TouchableOpacity className="border border-gray-300 rounded-md p-3" onPress={handleOpen}>
            <Text className={`${value || initialValue ? 'text-black' : 'text-gray-300'}`}>
              {value && typeof value === 'object' ? getItemText(value) : initialValue || placeholder}
            </Text>
          </TouchableOpacity>

          <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={handleClose}>
            <View className=" flex-1 bg-white p-4">
              {modalTitle && <Text className="text-lg font-bold mb-4">{modalTitle}</Text>}
              <TextInput
                className="border border-gray-300 rounded-md p-2 mb-4"
                placeholder={placeholderSearch}
                value={search}
                onChangeText={setSearch}
              />
              <FlashList
                estimatedItemSize={50}
                removeClippedSubviews
                data={
                  search.trim().length
                    ? data.filter((item) =>
                        getItemText(item)
                          .normalize('NFD')
                          .replace(/[̀-\u036f]/g, '')
                          .toLowerCase()
                          .includes(
                            search
                              .normalize('NFD')
                              .replace(/[̀-\u036f]/g, '')
                              .toLowerCase(),
                          ),
                      )
                    : data
                }
                keyExtractor={keyExtractor}
                renderItem={({ item }) => (
                  <Button
                    text={getItemText(item)}
                    className="p-6 border-b"
                    labelClasses="text-base text-black"
                    onPress={() => {
                      onChange(item);
                      setVisible(false);
                    }}
                  />
                )}
                ItemSeparatorComponent={() => <View className="h-px bg-gray-200" />}
              />
              <View className="flex-row justify-center mt-4 w-full">
                <Button
                  text="Cancelar"
                  className="w-full justify-center py-5 rounded-md border-primary border bg-white"
                  labelClasses="text-primary text-lg"
                  onPress={handleClose}
                />
              </View>
            </View>
          </Modal>
        </>
      )}
    </FormFieldWrapper>
  );
}
