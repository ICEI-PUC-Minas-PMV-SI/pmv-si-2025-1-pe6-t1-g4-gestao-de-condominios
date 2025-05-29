import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '@/components/Button';
import Text from '@/components/Text';
import TypeCheck from '@/utilities/TypeCheck';
import Messages from '@/utilities/Messages';
import { ModalProps, QuestionModalProps } from '@/context/Modal';
import { Colors } from '@/styles/Colors';

export default function ConfirmModal({
  children,
  title,
  text,
  onSubmit,
  leftBtnLabel = 'Não',
  rightBtnLabel = 'Sim',
  extra,
}: ModalProps<QuestionModalProps>) {
  const handleResponse = (answer: boolean) => {
    if (onSubmit) {
      return onSubmit(answer);
    } else if (extra) {
      extra.closeModal();
    }
  };

  if (text && TypeCheck.isMessageKey(text)) {
    text = Messages[text];
  }

  return (
    <View className="p-4 rounded-2xl w-11/12 gap-6 bg-white">
      {title && <Text className="text-lg font-black text-primary text-left">{title}</Text>}
      {text && <Text className="text-xl color-black text-center">{text}</Text>}
      {children}
      <View className="flex-row gap-3 justify-center w-full">
        <Button
          className="border border-primary justify-center rounded flex-1 py-4"
          style={[styles.button]}
          onPress={() => handleResponse(false)}
        >
          <Text className="text-primary text-lg">{leftBtnLabel}</Text>
        </Button>
        <Button
          className="rounded bg-primary justify-center flex-1 py-4"
          style={styles.button}
          onPress={() => handleResponse(true)}
        >
          <Text className="text-white text-lg">{rightBtnLabel}</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    // flex: 1,
    // paddingVertical: 15,
    // alignItems: 'center',
  },
});
