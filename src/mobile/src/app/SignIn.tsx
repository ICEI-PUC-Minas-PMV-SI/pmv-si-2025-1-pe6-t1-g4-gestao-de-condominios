import Button from '@/components/Button';
import FormFieldWrapper from '@/components/form/FieldWrapper';
import { Input } from '@/components/Input';
import { AuthController } from '@/controllers/Auth';
import StorageHandler from '@/helper/StorageHandler';
import { Alert } from '@/utilities/Alert';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { control, handleSubmit } = useForm<FormData>();
  const navigation = useNavigation();
  const onSubmit = async (data: FormData) => {
    try {
      const result = await AuthController.authenticate(data.email, data.password);
      if (result.token) {
        await StorageHandler.setAuthToken(result.token);
      }
      navigation.navigate('MainStack');
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
          <FormFieldWrapper<FormData>
            name="password"
            label="Senha"
            control={control}
            rules={{ required: true }}
            defaultValue=""
          >
            {(value, onChange, onBlur) => (
              <Input
                style={styles.input}
                textContentType="newPassword"
                secureTextEntry
                placeholder="******"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          </FormFieldWrapper>
        </View>
        <Button
          className="bg-primary p-4 justify-center mt-6"
          labelClasses="text-center text-white"
          text="Entrar"
          withLoader
          onPress={handleSubmit(onSubmit)}
        />
        <Button
          className="bg-white border border-primary p-4 justify-center mt-6 mb-16"
          labelClasses="text-center text-primary"
          text="Esqueceu a senha?"
          onPress={handleSubmit(onSubmit)}
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
