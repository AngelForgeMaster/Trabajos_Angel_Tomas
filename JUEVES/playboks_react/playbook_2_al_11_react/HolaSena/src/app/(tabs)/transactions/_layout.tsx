import { Stack } from 'expo-router';

export default function TransactionsStack() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: 'Transacciones', headerShown: false }} 
      />
      <Stack.Screen 
        name="detail" 
        options={{ title: 'Detalle de Transacción', headerShown: true }} 
      />
    </Stack>
  );
}