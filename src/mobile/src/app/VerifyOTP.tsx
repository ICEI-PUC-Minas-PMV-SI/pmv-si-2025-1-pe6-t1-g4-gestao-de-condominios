import Button from '@/components/Button';
import Text from '@/components/Text';
import { AuthController } from '@/controllers/Auth';
import StorageHandler from '@/helper/StorageHandler';
import { Alert } from '@/utilities/Alert';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';

export default function VerifyOTP() {
  const navigation = useNavigation();
  const route = useRoute();
  const [startTime, setStartTime] = useState(Date.now());
  const [timeToSend, setTimeToSend] = useState(0);
  const verifyOTP = async (otp: string) => {
    try {
      const result = await AuthController.verifyOTP(route.params?.email, otp);
      if (result.token) {
        await StorageHandler.setAuthToken(result.token);
      }
      navigation.navigate('ChangePassword');
    } catch (err: any) {
      Alert.showError({ message: err?.response?.data?.message || 'UNEXPECTED_ERROR' });
    }
  };

  useEffect(() => {
    const waitingTime = 30*1000;
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < waitingTime) {
        setTimeToSend(Math.ceil((waitingTime - elapsedTime)/1000));
      } else {
        setTimeToSend(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime])

  return (
    <KeyboardAvoidingView behavior={'height'} className="bg-white px-3" style={{ flex: 1 }}>
      <ScrollView className="px-5 mt-6">
        <View className="gap-5">
          <OtpInput numberOfDigits={6} onFilled={verifyOTP} />
        </View>
        <View className="items-center justify-center my-8">
          <Text className='text-lg'>Não recebeu o código?</Text>
          <View>
            {
              timeToSend === 0 && 
              <Button
                disabled={timeToSend !== 0}
                text='Re-enviar'
                labelClasses='text-lg text-bold font-bold text-primary'
                onPress={() => {
                  setTimeToSend(30);
                  setStartTime(Date.now())
                  AuthController.sendOTP(route.params?.email);
                }}
              />
            }
            {timeToSend && <Text className='text-gray-300 text-lg font-bold'>{'Aguarde ' + timeToSend.toString().padStart(2, '0')+' seg'}</Text>}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
