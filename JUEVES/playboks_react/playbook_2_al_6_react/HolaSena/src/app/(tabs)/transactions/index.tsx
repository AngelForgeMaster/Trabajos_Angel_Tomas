import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useExpenses } from '../../../context/ExpenseContext'; // ajusta la ruta según dónde quede el archivo

const TransactionScreen = () => {
  const router = useRouter();
  const { expenses } = useExpenses();

  if (expenses.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Aún no tienes transacciones</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push(`/(tabs)/transactions/detail?id=${item.id}`)}
        >
          <Text style={styles.rowName}>{item.name}</Text>
          <Text style={styles.rowAmount}>${item.amount}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 16, color: '#888' },
  list: { padding: 16 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  rowName: { fontSize: 16, fontWeight: '500' },
  rowAmount: { fontSize: 16, color: '#555' },
});

export default TransactionScreen;