#include <iostream>

using namespace std;

int main() {
    int suma = 0;

    for (int i = 1; i <= 10; i++) {
        suma += (i * i);
    }

    cout << "La suma de los cuadrados es: " << suma ;

    return 0;
}