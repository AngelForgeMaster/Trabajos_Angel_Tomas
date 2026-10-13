import { Stack } from 'expo-router';
import AppLayout from '../components/AppLayout';
import { ExpenseProvider } from '../context/ExpenseContext';

export default function RootLayout() {
  return (
    <ExpenseProvider>
      <AppLayout>
        <Stack 
          screenOptions={{ 
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' }
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AppLayout>
    </ExpenseProvider>
  );
}