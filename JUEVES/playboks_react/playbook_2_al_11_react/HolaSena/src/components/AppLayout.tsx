import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';

const { height, width } = Dimensions.get('window');

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  // Usamos el color turquesa de nuestro tema como base del degradado
  const baseColor = '#1ABC9C';

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[baseColor, 'transparent']}
        style={styles.gradient}
      />
      <StatusBar barStyle="dark-content" backgroundColor={baseColor} />
      <View style={styles.container}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  gradient: {
    height: height / 1.2,
    width: width,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});