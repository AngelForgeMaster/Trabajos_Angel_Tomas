#include <iostream>

using namespace std;

int main() {
    int n, suma_total = 0;
    bool existe = false;

    cout << "Ingrese la cantidad de elementos: ";
    cin >> n;

    int numeros[n];

    for (int i = 0; i < n; i++) {
        cout << "Ingrese el numero [" << i << "]: ";
        cin >> numeros[i];
        suma_total += numeros[i];
    }

    for (int i = 0; i < n; i++) {
        if (numeros[i] == (suma_total - numeros[i])) {
            cout << "El numero " << numeros[i] << " es igual a la suma del resto de elementos." << endl;
            existe = true;
            break;
        }
    }

    if (!existe) {
        cout << "Ningun numero es igual a la suma del resto de los elementos." << endl;
    }

    return 0;
}