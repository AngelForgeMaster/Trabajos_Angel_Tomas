#include <iostream>

using namespace std;

int main() {
    int n;

    cout << "Ingrese el numero de sucursales: ";
    cin >> n;

    double ventas[n][12];
    double totalCompania = 0;
    double ventasSucursal[n] = {0};
    double ventasMes[12] = {0};

    for (int i = 0; i < n; i++) {
        cout << "\n--- Ventas Sucursal " << i + 1 << " ---\n";
        for (int j = 0; j < 12; j++) {
            cout << "Mes " << j + 1 << ": ";
            cin >> ventas[i][j];

            totalCompania += ventas[i][j];
            ventasSucursal[i] += ventas[i][j];
            ventasMes[j] += ventas[i][j];
        }
    }

    int mayorSucursal = 0;
    for (int i = 1; i < n; i++) {
        if (ventasSucursal[i] > ventasSucursal[mayorSucursal]) {
            mayorSucursal = i;
        }
    }

    int menorMes = 0;
    for (int j = 1; j < 12; j++) {
        if (ventasMes[j] < ventasMes[menorMes]) {
            menorMes = j;
        }
    }

    cout << "\n=========================================\n";
    cout << "a. Total ventas de la compania: $" << totalCompania << endl;
    
    cout << "\nb. Total ventas por sucursal:\n";
    for (int i = 0; i < n; i++) {
        cout << "   Sucursal " << i + 1 << ": $" << ventasSucursal[i] << endl;
    }

    cout << "\nc. Sucursal que mas vendio: Sucursal " << mayorSucursal + 1 << " ($" << ventasSucursal[mayorSucursal] << ")" << endl;
    cout << "d. Mes que menos vendio: Mes " << menorMes + 1 << " ($" << ventasMes[menorMes] << ")" << endl;

    return 0;
}