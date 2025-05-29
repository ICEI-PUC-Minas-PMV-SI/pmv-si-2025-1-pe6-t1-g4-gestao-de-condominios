import { Header, HeaderBackButton } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

type CustomHeaderProps = {
  className?: string;
  onPress?: () => void;
  title: string;
};

export default function PageHeader({ className, onPress, title }: CustomHeaderProps) {
  return (
    <View className={`flex-row w-full bg-white gap-0 ${className}`} style={styles.headerContainer}>
      <HeaderBackButton
        style={styles.backButton}
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}
      />
      <Header title={title} headerStyle={styles.header} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    elevation: 8,
  },
  backButton: { marginHorizontal: 8 },
  header: {
    shadowColor: 'transparent',
    height: '100%',
  },
});
