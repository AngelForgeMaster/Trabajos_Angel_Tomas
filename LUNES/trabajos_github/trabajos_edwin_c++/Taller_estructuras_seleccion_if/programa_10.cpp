#include <iostream>

using namespace std;

int main() {
    int opcion;
    double saldo = 100000, monto;

    cout << "=== CAJERO AUTOMATICO ===\n";
    cout << "1. Consignar dinero\n";
    cout << "2. Retirar dinero\n";
    cout << "Elija una opcion: ";
    cin >> opcion;

    switch (opcion) {
        case 1:
            cout << "Ingrese el monto a consignar: ";
            cin >> monto;
            saldo += monto;
            cout << "Consignacion exitosa. Saldo final: $" << saldo << endl;
            break;
        case 2:
            cout << "Ingrese el monto a retirar: ";
            cin >> monto;
            if (monto > saldo) {
                cout << "Error: El monto a retirar es mayor al saldo disponible ($" << saldo << ")" << endl;
            } else {
                saldo -= monto;
                cout << "Retiro exitoso. Saldo final: $" << saldo << endl;
            }
            break;
        default:
            cout << "Opcion invalida" << endl;
            break;
    }

    return 0;
}