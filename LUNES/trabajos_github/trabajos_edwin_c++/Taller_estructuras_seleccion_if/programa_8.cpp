#include <iostream>

using namespace std;

int main() {
    char letra;

    cout << "Ingrese un caracter: ";
    cin >> letra;

    switch (letra) {
        case 'a': case 'e': case 'i': case 'o': case 'u':
            cout << "Es una vocal minuscula" << endl;
            break;
        case 'A': case 'E': case 'I': case 'O': case 'U':
            cout << "Es una vocal mayuscula" << endl;
            break;
        default:
            cout << "No es una vocal" << endl;
            break;
    }

    return 0;
}