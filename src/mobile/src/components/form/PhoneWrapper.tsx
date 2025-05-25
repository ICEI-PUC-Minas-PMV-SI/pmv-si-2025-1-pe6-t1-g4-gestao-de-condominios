import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { Input } from '../Input';

function formatPhone(value: string) {
  if (!value) return '';
  const digits = (value || '').replace(/\D/g, '');

  const ddd = digits.slice(0, 2);
  const phone = digits.slice(2);

  if (digits.length <= 2) {
    return `(${ddd}`;
  }

  if (phone.length <= 4) {
    return `(${ddd}) ${phone}`;
  }

  if (phone.length <= 8) {
    // 8 dígitos: 9999-9999
    return `(${ddd}) ${phone.slice(0, 4)}-${phone.slice(4)}`;
  }

  // 9 dígitos: 99999-9999
  return `(${ddd}) ${phone.slice(0, 5)}-${phone.slice(5, 9)}`;
}

export default function PhoneWrapper({ control, rules = {} }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Telefone:</Text>

      <Controller
        control={control}
        name="phone"
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Input
              value={formatPhone(value)}
              keyboardType="phone-pad"
              placeholder="(99) 99999-9999"
              style={styles.input}
              maxLength={15}
              onChangeText={(text) => onChange((text || '').replace(/\D/g, ''))}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />

      <Text style={styles.hint}>Apenas números são salvos (sem máscara)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginTop: 4,
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 10,
  },
});
