import './styles/global.css';

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from '@/navigation/RootStack';
import { ModalProvider } from '@/components/provider/Modal';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export default function App() {
  return (
    <SafeAreaView className="" style={styles.container}>
      <ModalProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ModalProvider>
      <Toast
        config={{
          success: (props) => <BaseToast {...props} style={{ zIndex: 9999 }} />,
          error: (props) => <ErrorToast {...props} style={{ zIndex: 9999 }} />,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
