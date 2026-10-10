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

    int menor = numeros[0];

    for (int i = 1; i < n; i++) {
        if (numeros[i] < menor) {
            menor = numeros[i];
        }
    }

    cout << "El elemento menor es: " << menor << endl;

    return 0;
}