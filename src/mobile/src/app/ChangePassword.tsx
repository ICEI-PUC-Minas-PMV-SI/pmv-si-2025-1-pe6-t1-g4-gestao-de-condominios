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
  password: string;
  confirmPassword: string;
};

export default function ChangePassword() {
  const { control, handleSubmit } = useForm<FormData>();
  const navigation = useNavigation();
  const changePassword = async (data: FormData) => {
    try {
      await AuthController.changePassword(data.password);
      navigation.navigate('SignIn');
    } catch (err) {
      Alert.showError({ message: 'AUTH_FAIL' });
    }
  };

  return (
    <KeyboardAvoidingView behavior={'height'} className="bg-white px-3" style={{ flex: 1 }}>
      <ScrollView className="px-5 mt-6">
        <View className="gap-5">
          <FormFieldWrapper<FormData>
            name="password"
            label="Nova senha"
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
          <FormFieldWrapper<FormData>
            name="confirmPassword"
            label="Confirmar nova senha"
            control={control}
            rules={{ required: true, validate(confirmPassword, formData) {
                return confirmPassword !== formData.password ? 'As senhas não coincidem' : true;
            } }}
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
          text="Confirmar"
          withLoader
          onPress={handleSubmit(changePassword)}
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
