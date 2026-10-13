import * as Calendar from 'expo-calendar';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useExpenses } from '../src/context/ExpenseContext'; // Ajusta la ruta relativa para salir a src

async function getDefaultCalendarId() {
  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );
  if (calendars.length > 0) {
    return calendars[0].id;
  }
  throw new Error('No hay calendarios disponibles en este dispositivo.');
}

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams();
  const { expenses } = useExpenses();
  
  // Buscamos el gasto correspondiente en el contexto global
  const expense = expenses.find((item) => item.id === id);
  const [statusMessage, setStatusMessage] = useState('');

  const createPaymentReminder = async () => {
    try {
      if (!expense) return;

      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== 'granted') {
        setStatusMessage('Permiso del calendario no concedido.');
        return;
      }

      const defaultCalendarId = await getDefaultCalendarId();

      const expenseDate = new Date(expense.date);
      expenseDate.setHours(9, 0, 0, 0); 
      const endDate = new Date(expenseDate.getTime() + 60 * 60 * 1000);

      const eventId = await Calendar.createEventAsync(defaultCalendarId, {
        title: `Pagar: ${expense.name} - $${expense.amount}`,
        startDate: expenseDate,
        endDate,
        timeZone: 'America/Bogota',
        notes: `Categoría: ${expense.category}. Creado desde Expense Tracker.`,
      });

      setStatusMessage(`¡Recordatorio establecido! ID: ${eventId}`);
      Alert.alert('Recordatorio establecido', 'Recordatorio de pago agregado a tu calendario.');
    } catch (error) {
      console.error('Error al crear el evento del calendario:', error);
      setStatusMessage('No se pudo establecer el recordatorio.');
    }
  };

  if (!expense) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Detalle de la transacción</Text>
        <Text style={styles.errorText}>No se encontró la transacción.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalle de la transacción</Text>

      <View style={styles.detailCard}>
        <DetailRow label="Nombre" value={expense.name} />
        <DetailRow label="Tipo" value={expense.type} />
        <DetailRow label="Monto" value={`$${expense.amount}`} />
        <DetailRow label="Categoría" value={expense.category} />
        <DetailRow label="Fecha" value={expense.date} />
      </View>

      {expense.receiptUri && (
        <View style={styles.receiptSection}>
          <Text style={styles.sectionLabel}>Recibo</Text>
          <Image
            source={{ uri: expense.receiptUri }}
            style={styles.receiptImage}
            resizeMode="contain"
          />
        </View>
      )}

      <TouchableOpacity style={styles.reminderBtn} onPress={createPaymentReminder}>
        <Text style={styles.reminderBtnText}>Establecer recordatorio de pago</Text>
      </TouchableOpacity>

      {statusMessage ? (
        <Text style={styles.status}>{statusMessage}</Text>
      ) : null}
    </ScrollView>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  errorText: { textAlign: 'center', marginTop: 40, color: '#888', fontSize: 16 },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  detailLabel: { fontSize: 14, color: '#888' },
  detailValue: { fontSize: 14, fontWeight: '500', color: '#222' },
  receiptSection: { marginBottom: 20 },
  sectionLabel: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  receiptImage: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  reminderBtn: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  reminderBtnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  status: {
    marginTop: 12,
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});