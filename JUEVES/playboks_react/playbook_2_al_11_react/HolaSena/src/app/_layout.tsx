import { ApolloProvider } from '@apollo/client/react';
import { Stack } from 'expo-router';
import AppLayout from '../components/AppLayout';
import { ExpenseProvider } from '../context/ExpenseContext';
import { client } from '../lib/apolloClient';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}