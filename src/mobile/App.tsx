import './styles/global.css';

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from '@/navigation/RootStack';
import { ModalProvider } from '@/components/provider/Modal';
import Toast, { BaseToast, ToastConfigParams } from 'react-native-toast-message';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ModalProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ModalProvider>
      <Toast
        config={{
          success: (props: ToastConfigParams<any>) => (
            <BaseToast
              {...props}
              style={{ flexWrap: 'wrap', borderLeftColor: '#16a34a' }}
              contentContainerStyle={{ padding: 12 }}
              text1Style={[{ flexWrap: 'wrap' }, { fontSize: 16 }]}
              text2Style={[{ flexWrap: 'wrap' }, { fontSize: 14 }]}
              text1NumberOfLines={0} // sem limite de linhas
              text2NumberOfLines={0}
            />
          ),
          error: (props: ToastConfigParams<any>) => (
            <BaseToast
              {...props}
              style={[{ flexWrap: 'wrap' }, { borderLeftColor: '#ef4444' }]}
              contentContainerStyle={{ padding: 12 }}
              text1Style={[{ flexWrap: 'wrap' }, { fontSize: 16 }]}
              text2Style={[{ flexWrap: 'wrap' }, { fontSize: 14 }]}
              text1NumberOfLines={0}
              text2NumberOfLines={0}
            />
          ),
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
