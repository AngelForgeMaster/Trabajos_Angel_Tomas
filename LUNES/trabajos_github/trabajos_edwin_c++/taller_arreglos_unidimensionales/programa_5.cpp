#include <iostream>

using namespace std;

int main() {
    int n;

    cout << "Ingrese la cantidad de elementos: ";
    cin >> n;

    int numeros[n];

    for (int i = 0; i < n; i++) {
        cout << "Ingrese el numero [" << i << "]: ";
        cin >> numeros[i];
    }

    int mayor = numeros[0];

    for (int i = 1; i < n; i++) {
        if (numeros[i] > mayor) {
            mayor = numeros[i];
        }
    }

    cout << "El elemento mayor es: " << mayor << endl;

    return 0;
}