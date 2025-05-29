import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
  async set(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error('Erro ao salvar no storage', e);
    }
  },

  async getString(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error('Erro ao ler do storage', e);
      return null;
    }
  },

  async clearAll() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Erro ao limpar storage', e);
    }
  },
};

export default Storage;
