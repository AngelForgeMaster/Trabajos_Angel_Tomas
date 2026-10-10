#include <iostream>

using namespace std;

int main() {
    int numero;
    int contador = 0;

    do {
        cout << "Ingrese un numero (0 para salir): ";
        cin >> numero;
        if (numero > 0) {
            contador++;
        }
    } while (numero != 0);

    cout << "Cantidad de numeros mayores a cero: " << contador ;

    return 0;
}