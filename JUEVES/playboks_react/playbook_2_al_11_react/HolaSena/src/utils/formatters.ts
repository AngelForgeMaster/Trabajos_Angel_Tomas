// src/utils/formatters.ts

/**
 * Formatea un monto (string o number) como moneda colombiana simple.
 * Ej: formatCurrency('85400') -> "$85.400"
 */
export function formatCurrency(amount: string | number): string {
  const num = typeof amount === 'string' ? Number(amount) : amount;
  const safeNum = Number.isNaN(num) ? 0 : num;

  const formatted = safeNum.toLocaleString('es-CO', {
    maximumFractionDigits: 0,
  });

  return `$${formatted}`;
}