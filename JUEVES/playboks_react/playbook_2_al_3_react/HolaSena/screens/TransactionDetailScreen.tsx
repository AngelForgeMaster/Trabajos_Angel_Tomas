import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const TransactionDetailScreen = () => {
  // Expo Router lee los parámetros de la URL/navegación así:
  const params = useLocalSearchParams();
  const id = params.id || 'Desconocido';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalle de la transacción para {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TransactionDetailScreen;