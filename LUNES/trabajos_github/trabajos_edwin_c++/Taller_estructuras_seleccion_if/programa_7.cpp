#include <iostream>

using namespace std;

int main() {
    int numero;

    cout << "Ingrese un numero entero (1 - 5): ";
    cin >> numero;

    switch (numero) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            cout << "El numero " << numero << " esta dentro del rango permitido (1 - 5)" << endl;
            break;
        default:
            cout << "El numero " << numero << " NO esta en el rango permitido" << endl;
            break;
    }

    return 0;
}