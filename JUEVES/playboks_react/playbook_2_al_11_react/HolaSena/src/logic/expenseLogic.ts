// src/logic/expenseLogic.ts
import { Expense } from '../context/ExpenseContext';

/**
 * Agrega un nuevo gasto/ingreso a la lista existente, generando su id.
 * No muta el arreglo original.
 */
export const addExpense = (
  expenses: Expense[],
  newExpenseData: Omit<Expense, 'id'>
): Expense[] => {
  const newExpense: Expense = {
    ...newExpenseData,
    id: Date.now().toString(),
  };
  return [...expenses, newExpense];
};

/**
 * Calcula el total neto: suma los Ingresos y resta los Gastos.
 * Si `amount` no es un número válido, se trata como 0 (no explota).
 */
export const calculateTotal = (expenses: Expense[]): number => {
  return expenses.reduce((total, item) => {
    const amount = Number(item.amount);
    const safeAmount = Number.isNaN(amount) ? 0 : amount;
    return item.type === 'Ingreso' ? total + safeAmount : total - safeAmount;
  }, 0);
};