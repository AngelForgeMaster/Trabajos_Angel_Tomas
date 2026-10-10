#include <iostream>

using namespace std;

int main() {
    int filas, columnas;

    cout << "Ingrese filas: "; cin >> filas;
    cout << "Ingrese columnas: "; cin >> columnas;

    int matriz[filas][columnas];

    for (int i = 0; i < filas; i++) {
        for (int j = 0; j < columnas; j++) {
            cout << "Matriz[" << i << "][" << j << "]: ";
            cin >> matriz[i][j];
        }
    }

    cout << "\n--- Resultados por Fila ---\n";
    for (int i = 0; i < filas; i++) {
        float sumaFila = 0;
        for (int j = 0; j < columnas; j++) {
            sumaFila += matriz[i][j];
        }
        cout << "Fila " << i << " -> Suma: " << sumaFila << " | Promedio: " << sumaFila / columnas << endl;
    }

    cout << "\n--- Resultados por Columna ---\n";
    for (int j = 0; j < columnas; j++) {
        float sumaCol = 0;
        for (int i = 0; i < filas; i++) {
            sumaCol += matriz[i][j];
        }
        cout << "Columna " << j << " -> Suma: " << sumaCol << " | Promedio: " << sumaCol / filas << endl;
    }

    return 0;
}