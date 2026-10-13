// src/app/context/ExpenseContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Definimos la estructura del gasto exactamente como la pide Walver
export interface Expense {
  id: string;
  type: string;
  name: string;
  amount: string;
  category: string;
  date: string;
  receiptUri?: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  isLoaded: boolean;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

const STORAGE_KEY = '@holasena:expenses';

// Datos de ejemplo: solo se usan si AsyncStorage está vacío (primera vez que corre la app)
const SEED_EXPENSES: Expense[] = [
  {
    id: '1',
    type: 'Ingreso',
    name: 'Salario Pizzería',
    amount: '1200000',
    category: 'Otros',
    date: '2026-09-01',
  },
  {
    id: '2',
    type: 'Gasto',
    name: 'Gasolina Discover 125',
    amount: '25000',
    category: 'Combustible',
    date: '2026-09-02',
  },
];

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // —— Hidratación: cargar los gastos guardados en el primer montaje
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
          setExpenses(JSON.parse(stored));
        } else {
          // Primera vez que corre la app: sembramos los datos de ejemplo
          setExpenses(SEED_EXPENSES);
        }
      } catch (error) {
        console.error('Error al cargar los gastos desde el almacenamiento', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadExpenses();
  }, []);

  // —— Persistencia: guardar los gastos cada vez que cambien
  useEffect(() => {
    if (!isLoaded) return; // no sobrescribir el almacenamiento durante la hidratación inicial
    const saveExpenses = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.error('Error al guardar los gastos en el almacenamiento:', error);
      }
    };
    saveExpenses();
  }, [expenses, isLoaded]);

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, isLoaded }}>
      {children}
    </ExpenseContext.Provider>
  );
}

// Hook personalizado para consumir el contexto fácilmente
export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses debe ser usado dentro de un ExpenseProvider');
  }
  return context;
}