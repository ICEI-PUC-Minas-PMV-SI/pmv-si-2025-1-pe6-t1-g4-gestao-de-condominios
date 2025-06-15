import Button from '@/components/Button';
import FormFieldWrapper from '@/components/form/FieldWrapper';
import { Input } from '@/components/Input';
import { AuthController } from '@/controllers/Auth';
import { Alert } from '@/utilities/Alert';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';

type FormData = {
  email: string;
  password: string;
};

export default function ForgotPassword() {
  const { control, handleSubmit } = useForm<FormData>();
  const navigation = useNavigation();
  const sendOTP = async (data: FormData) => {
    try {
      await AuthController.sendOTP(data.email);
      navigation.navigate('VerifyOTP', {email: data.email});
    } catch (err) {
      Alert.showError({ message: 'AUTH_FAIL' });
    }
  };

  return (
    <KeyboardAvoidingView behavior={'height'} className="bg-white px-3" style={{ flex: 1 }}>
      <ScrollView className="px-5 mt-6">
        <View className="gap-5">
          <FormFieldWrapper<FormData>
            name="email"
            label="E-mail"
            control={control}
            rules={{ required: true }}
            defaultValue=""
          >
            {(value, onChange, onBlur) => (
              <Input
                style={styles.input}
                placeholder="example@example.com"
                value={value}
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          </FormFieldWrapper>
        </View>
        <Button
          className="bg-primary p-4 justify-center mt-6"
          labelClasses="text-center text-white"
          text="Enviar"
          withLoader
          onPress={handleSubmit(sendOTP)}
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
