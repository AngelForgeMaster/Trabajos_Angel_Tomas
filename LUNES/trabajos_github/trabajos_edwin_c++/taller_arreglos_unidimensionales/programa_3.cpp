#include <iostream>

using namespace std;

int main() {
    int n;

    cout << "Ingrese la cantidad de elementos del vector: ";
    cin >> n;

    int numeros[n];

    for (int i = 0; i < n; i++) {
        cout << "Ingrese el elemento para la posicion [" << i << "]: ";
        cin >> numeros[i];
    }

    cout << "\nElementos y sus indices:\n";
    for (int i = 0; i < n; i++) {
        cout << "Indice " << i << " -> Valor: " << numeros[i] << endl;
    }

    return 0;
}