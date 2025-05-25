import { ReactNode } from 'react';
import { Modal as ModalRN, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native';
import Text from './Text';

type ComponentProps = {
  children: ReactNode;
  onClose?: () => void;
  title?: string;
  style?: StyleProp<ViewStyle>;
};

export default function Modal({ children, title, onClose, style }: ComponentProps) {
  return (
    <SafeAreaView style={[styles.container]} className="absolute justify-center">
      <ModalRN animationType="slide" transparent onRequestClose={onClose}>
        <View
          className="m-5 justify-center bg-white rounded-md p-12 shadow-black elevation-md"
          style={[styles.content, style]}
        >
          {title && <Text className="font-bold text-base color-primary mb-4">{title}</Text>}
          {children}
        </View>
      </ModalRN>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
