#include <iostream>

using namespace std;

int main() {
    float n1, n2;

    cout << "Ingrese el primer numero: "; cin >> n1;
    cout << "Ingrese el segundo numero: "; cin >> n2;

    if (n1 > n2) {
        cout << "El numero mayor es: " << n1 << endl;
    } else if (n2 > n1) {
        cout << "El numero mayor es: " << n2 << endl;
    } else {
        cout << "Ambos numeros son iguales" << endl;
    }

    return 0;
}