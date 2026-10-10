#include <iostream>

using namespace std;

int main() {
    float temperatura, mayor, menor, suma = 0;

    cout << "Ingrese la temperatura de la hora 4: ";
    cin >> temperatura;
    
    mayor = temperatura;
    menor = temperatura;
    suma += temperatura;

    for (int i = 8; i <= 24; i += 4) {
        cout << "Ingrese la temperatura de la hora " << i << ": ";
        cin >> temperatura;

        suma += temperatura;

        if (temperatura > mayor) {
            mayor = temperatura;
        }
        if (temperatura < menor) {
            menor = temperatura;
        }
    }

    cout << "\nTemperatura mayor: " << mayor ;
    cout << "Temperatura menor: " << menor ;
    cout << "Temperatura promedio: " << suma / 6 ;

    return 0;
}