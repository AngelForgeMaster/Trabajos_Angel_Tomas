import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const moradoWalver = 'rgba(80, 3, 136, 1)';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: moradoWalver,      // Color cuando la pestaña está seleccionada
        tabBarInactiveTintColor: '#555555',     // Color secundario
        headerShown: false,                     // Oculta cabeceras duplicadas
        tabBarStyle: {
          backgroundColor: '#1ABC9C',           // Fondo turquesa de la barra de pestañas abajo
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-assets"
        options={{
          title: 'Add Assets',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transaction',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}