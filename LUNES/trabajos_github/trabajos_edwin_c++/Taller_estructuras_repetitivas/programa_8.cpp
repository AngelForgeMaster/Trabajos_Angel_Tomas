#include <iostream>

using namespace std;

int main() {
    int x, y;
    long resultado = 1;

    cout << "Ingrese la base (x): ";
    cin >> x;
    cout << "Ingrese el exponente (y): ";
    cin >> y;

    for (int i = 1; i <= y; i++) {
        resultado *= x;
    }

    cout << "El resultado de " << x << "^" << y << " es: " << resultado ;

    return 0;
}