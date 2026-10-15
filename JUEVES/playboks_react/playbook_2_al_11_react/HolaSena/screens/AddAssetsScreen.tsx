import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Contacts from 'expo-contacts';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useExpenses } from '../src/context/ExpenseContext';
import { formatCurrency } from '../src/utils/formatters';

export default function AddAssets() {
  const { expenses, addExpense, deleteExpense, isLoaded } = useExpenses();
  const [type, setType] = useState('Gasto');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  // Cámara y Permisos
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [receiptUri, setReceiptUri] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);
  // Contactos y Permisos
  const [contactsPermission, setContactsPermission] = useState<boolean | null>(null);
  const [showContactPicker, setShowContactPicker] = useState<boolean>(false);
  const [contactList, setContactList] = useState<any[]>([]);

  const handleAttachReceipt = async () => {
    // ... (todo esto queda igual, sin tocar)
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        alert('Se requiere permiso de la cámara para adjuntar recibos.');
        return;
      }
    }
    setShowCamera(true);
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
      });
      setReceiptUri(photo.uri);
      setShowCamera(false);
    }
  };

  const handleAddExpense = () => {
    if (!name || !amount || !category || !date) return;

    addExpense({
      type,
      name,
      amount,
      category,
      date,
      receiptUri: receiptUri || undefined,
    });

    // Resetear formulario
    setName('');
    setAmount('');
    setCategory('');
    setDate('');
    setReceiptUri(null);
  };

  const handlePickContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setContactsPermission(status === 'granted');

    if (status !== 'granted') {
      alert('Se requiere permiso para acceder a los contactos y seleccionar un beneficiario.');
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      pageSize: 50,
      pageOffset: 0,
    });

    setContactList(data);
    setShowContactPicker(true);
  };

    // ... después de handlePickContact, antes de "if (showContactPicker)"

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1ABC9C" />
        <Text style={{ marginTop: 12, color: '#888' }}>Cargando tus gastos...</Text>
      </View>
    );
  }

 
 

  // Si el selector de contactos está activo, mostramos la lista flotante
  if (showContactPicker) {
    return (
      <View style={styles.contactPickerOverlay}>
        <Text style={styles.contactPickerTitle}>Seleccionar un beneficiario</Text>
        <FlatList
          data={contactList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.contactRow}
              onPress={() => {
                setName(item.name);    // completar el campo Nombre
                setShowContactPicker(false);
              }}
            >
              <Text style={styles.contactName}>{item.name}</Text>
              {item.phoneNumbers && item.phoneNumbers.length > 0 && (
                <Text style={styles.contactPhone}>
                  {item.phoneNumbers[0].number}
                </Text>
              )}
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text>No se encontraron contactos.</Text>}
        />
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => setShowContactPicker(false)}
        >
          <Text style={styles.cancelBtnText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Si la cámara está activa, mostramos la vista previa del visor nativo
  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.cameraView} ref={cameraRef} />
        <View style={styles.cameraControls}>
          <TouchableOpacity
            style={styles.captureBtn}
            onPress={handleCapture}
          >
            <Text style={styles.captureBtnText}>📸 Capturar recibo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setShowCamera(false)}
          >
            <Text style={styles.cancelBtnText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeBtn, type === 'Gasto' && styles.typeBtnActive]}
          onPress={() => setType('Gasto')}
        >
          <Text style={[styles.typeBtnText, type === 'Gasto' && styles.typeBtnTextActive]}>Gasto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeBtn, type === 'Ingreso' && styles.typeBtnActive]}
          onPress={() => setType('Ingreso')}
        >
          <Text style={[styles.typeBtnText, type === 'Ingreso' && styles.typeBtnTextActive]}>Ingreso</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Agregar {type}</Text>

      <View style={styles.box}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Monto"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <View style={styles.categoryRow}>
          {['Viajes', 'Combustible', 'Comida', 'Servicios públicos', 'Otros'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryBtn, category === cat && styles.categoryBtnActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.categoryBtnText, category === cat && styles.categoryBtnTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Fecha (AAAA-MM-DD)"
          value={date}
          onChangeText={setDate}
        />

        {/* Botón para tomar la foto del recibo */}
        <TouchableOpacity style={styles.receiptBtn} onPress={handleAttachReceipt}>
          <Text style={styles.receiptBtnText}>
            {receiptUri ? 'Recibo adjuntado' : 'Adjuntar recibo'}
          </Text>
        </TouchableOpacity>

        {receiptUri && (
          <Image
            source={{ uri: receiptUri }}
            style={styles.receiptThumbnail}
            resizeMode="cover"
          />
        )}

        <Button title="Agregar gasto" onPress={handleAddExpense} color="#1ABC9C" />
      </View>

      <Text style={styles.title}>Gastos</Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <View style={styles.expenseInfo}>
              <Text>{item.type} | {item.name} | {formatCurrency(item.amount)} | {item.category}</Text>
            </View>
            {item.receiptUri && (
              <Image
                source={{ uri: item.receiptUri }}
                style={styles.listThumbnail}
                resizeMode="cover"
              />
            )}
            <TouchableOpacity onPress={() => deleteExpense(item.id)}>
              <Text style={styles.deleteBtn}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>Aún no hay gastos.</Text>}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  expenseText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categorySubText: {
    fontSize: 12,
    color: '#666',
  },
  deleteBtn: {
    color: 'red',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  typeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f6f6f6',
    marginHorizontal: 4,
  },
  typeBtnActive: {
    backgroundColor: '#964B00',
    borderColor: '#964B00',
  },
  typeBtnText: {
    color: '#222',
    fontWeight: '500',
  },
  typeBtnTextActive: {
    color: '#fff',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 6,
  },
  categoryBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f6f6f6',
    marginBottom: 6,
  },
  categoryBtnActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryBtnText: {
    color: '#222',
    fontSize: 13,
  },
  categoryBtnTextActive: {
    color: '#fff',
  },
  receiptBtn: {
    backgroundColor: '#e2e8f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  receiptBtnText: {
    color: '#334155',
    fontWeight: '600',
  },
  receiptThumbnail: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  listImage: {
    width: 45,
    height: 45,
    borderRadius: 6,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraView: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  captureBtn: {
    backgroundColor: '#1ABC9C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  captureBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelBtn: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  expenseInfo: {
    flex: 1,
  },
  listThumbnail: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginLeft: 8,
  },
  contactPickerOverlay: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  contactPickerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  contactRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});