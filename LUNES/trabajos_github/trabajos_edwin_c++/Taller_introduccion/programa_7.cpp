#include <iostream>

using namespace std;

int main() {

    int cantidad;
    float precio;
    float subtotal;
    float iva;
    float total;

    cout << "Ingrese la cantidad de productos: ";
    cin >> cantidad;

    cout << "Ingrese el precio del producto: ";
    cin >> precio;

    subtotal = cantidad * precio;

    iva = subtotal * 0.19;

    total = subtotal + iva;

    cout << "\nSubtotal: " << subtotal << endl;
    cout << "IVA (19%): " << iva << endl;
    cout << "Total a pagar: " << total << endl;

    return 0;
}