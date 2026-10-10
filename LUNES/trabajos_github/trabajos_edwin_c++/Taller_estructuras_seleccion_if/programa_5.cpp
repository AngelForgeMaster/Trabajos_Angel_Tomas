#include <iostream>

using namespace std;

int main() {
    int edad;

    cout << "Ingrese su edad: ";
    cin >> edad;

    if (edad >= 18 && edad <= 25) {
        cout << "La edad se encuentra en el rango de 18 a 25 años" << endl;
    } else {
        cout << "La edad NO se encuentra en el rango de 18 a 25 años" << endl;
    }

    return 0;
}