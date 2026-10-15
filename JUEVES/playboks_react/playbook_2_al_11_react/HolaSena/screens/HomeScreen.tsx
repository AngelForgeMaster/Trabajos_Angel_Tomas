import { StyleSheet, Text, View } from 'react-native';
import AppLayout from '../src/components/AppLayout'; // Ajusta la ruta si es necesario

export default function HomeScreen() {
  return (
    <AppLayout>
      <View style={styles.content}>
        <Text style={styles.text}>HomeScreen</Text>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(80, 3, 136, 1)', // Morado Walver
  },
});