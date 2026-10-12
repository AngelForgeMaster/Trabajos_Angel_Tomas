import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionScreen = () => (
  <View style={styles.container}>
    <Text>Transacciones</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionScreen;