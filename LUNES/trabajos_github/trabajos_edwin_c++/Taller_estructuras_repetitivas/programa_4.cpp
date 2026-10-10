#include <iostream>

using namespace std;

int main() {
    int numero;

    do {
        cout << "Ingrese un numero del 1 al 10: ";
        cin >> numero;
    } while (numero < 1 || numero > 10);

    cout << "Tabla de multiplicar del " << numero ;
    for (int i = 1; i <= 10; i++) {
        cout << numero << " x " << i << " = " << numero * i ;
    }

    return 0;
}