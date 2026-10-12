import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddAssetsScreen = () => (
  <View style={styles.container}>
    <Text>Agregar activos</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddAssetsScreen;