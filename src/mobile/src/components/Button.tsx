import { ActivityIndicator, GestureResponderEvent, Pressable, PressableProps } from 'react-native';
import Text from './Text';
import { ReactNode, useState } from 'react';
import { Colors } from '@/styles/Colors';

type ComponentProps = PressableProps & {
  withLoader?: boolean;
  text?: string;
  labelClasses?: string;
  children?: ReactNode;
};

export default function Button(props: ComponentProps) {
  const {
    withLoader = false,
    onPress = () => {},
    className = '',
    labelClasses = '',
    text,
    children,
    ...pressableProps
  } = props;
  const [showLoader, setShowLoader] = useState(false);
  const submit = async (event: GestureResponderEvent) => {
    try {
      if (onPress) {
        if (withLoader) setShowLoader(true);
        await onPress(event);
      }
    } finally {
      if (withLoader) {
        setShowLoader(false);
      }
    }
  };
  const buttonClasses = `flex-row gap-3 rounded-lg ${showLoader && withLoader ? 'opacity-65' : ''} ${className}`;

  return (
    <Pressable className={buttonClasses} {...pressableProps} onPress={submit}>
      {showLoader && withLoader && <ActivityIndicator color={Colors.white} />}
      {text && <Text className={`${labelClasses}`}>{text}</Text>}
      {children}
    </Pressable>
  );
}
