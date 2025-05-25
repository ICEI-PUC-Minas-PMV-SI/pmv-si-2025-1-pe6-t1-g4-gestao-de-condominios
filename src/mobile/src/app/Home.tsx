import Button from '@/components/Button';
import Image from '@/components/Image';
import Text from '@/components/Text';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

export default function Home() {
  const navigation = useNavigation();
  return (
    <View className="w-full h-full">
      <Image src={require('@/assets/cond1.jpg')} style={styles.bgImage} resizeMode="cover" />
      <View style={{ marginTop: 'auto' }}>
        <View className="bg-white rounded-t-3xl gap-8 py-5 px-6">
          <View>
            <Text className="text-black text-2xl text-center font-bold">Bem vindo(a) ao</Text>
            <Text className="text-black text-2xl text-center font-bold">Gestor de Condomínio</Text>
          </View>
          <Button
            text="Entrar"
            onPress={() => {
              navigation.navigate('SignIn');
            }}
            className="py-5 text-center justify-center bg-primary"
            labelClasses="text-xl text-center text-white"
          />
          <View className="flex-row justify-center gap-3">
            <Text className="text-black text-lg text-center font-bold">Não possui uma conta?</Text>
            <Button
              text="Criar"
              className="bg-transparent"
              labelClasses="text-lg text-primary font-bold"
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
