import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '@/components/Button';
import Text from '@/components/Text';
import TypeCheck from '@/utilities/TypeCheck';
import Messages from '@/utilities/Messages';
import { ModalProps, MessageModalProps } from '@/context/Modal';

export default function MessageModal({ title, text, onSubmit, extra, messageType }: ModalProps<MessageModalProps>) {
  const handleResponse = (answer: boolean) => {
    if (extra) {
      extra.closeModal();
    }
    if (onSubmit) {
      return onSubmit(answer);
    }
  };
  if (text && TypeCheck.isMessageKey(text)) {
    text = Messages[text];
  }

  return (
    <View className="bg-white w-11/12 rounded-md p-4 gap-6">
      {title && <Text className="text-lg font-black text-primary">{title}</Text>}
      {!title && messageType === 'error' && <Text className="text-lg font-black text-primary">{'Atenção'}</Text>}
      {!title && messageType === 'warn' && <Text className="text-lg font-black text-primary">{'Aviso'}</Text>}
      {text && <Text className="text-lg text-center text-black">{text}</Text>}
      <View className="flex-row gap-3">
        <Button className="py-4 items-center rounded mt-2" style={styles.button} onPress={() => handleResponse(false)}>
          <Text className="text-base text-white">{'Fechar'}</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
});
