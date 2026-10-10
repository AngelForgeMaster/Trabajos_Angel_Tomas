#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int main() {
    srand(time(0));
    int filas, columnas;

    cout << "Ingrese filas: "; cin >> filas;
    cout << "Ingrese columnas: "; cin >> columnas;

    int matriz[filas][columnas];

    for (int i = 0; i < filas; i++) {
        for (int j = 0; j < columnas; j++) {
            matriz[i][j] = rand() % 100;
        }
    }

    cout << "\nMatriz generada con aleatorios:\n";
    for (int i = 0; i < filas; i++) {
        for (int j = 0; j < columnas; j++) {
            cout << matriz[i][j] << "\t";
        }
        cout << "\n";
    }

    return 0;
}