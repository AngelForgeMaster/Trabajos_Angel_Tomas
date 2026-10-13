import { useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useExpenses } from '../src/context/ExpenseContext'; // Ajusta según tu ruta relativa

export default function TransactionScreen() {
  const router = useRouter();
  const { expenses } = useExpenses();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transacciones</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.transactionItem}
            onPress={() => router.push({
              pathname: '/TransactionDetail' as any,
              params: { id: item.id }
            })}
          >
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionName}>{item.name}</Text>
              <Text style={styles.transactionMeta}>
                {item.category} • {item.date}
              </Text>
            </View>

            <Text style={[
              styles.transactionAmount,
              { color: item.type === 'Gasto' ? '#FF3B30' : '#34C759' }
            ]}>
              {item.type === 'Gasto' ? '-' : '+'}${item.amount}
            </Text>

            {item.receiptUri && (
              <Image
                source={{ uri: item.receiptUri }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aún no hay transacciones registradas.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  transactionInfo: { flex: 1 },
  transactionName: { fontSize: 16, fontWeight: '500' },
  transactionMeta: { fontSize: 13, color: '#888', marginTop: 2 },
  transactionAmount: { fontSize: 16, fontWeight: '600', marginRight: 8 },
  thumbnail: { width: 40, height: 40, borderRadius: 6 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#aaa' },
});