#include <iostream>

using namespace std;

int main() {
    int n1, n2, n3, n4;

    cout << "Ingrese el primer numero: "; cin >> n1;
    cout << "Ingrese el segundo numero: "; cin >> n2;
    cout << "Ingrese el tercer numero: "; cin >> n3;
    cout << "Ingrese el cuarto numero: "; cin >> n4;

    if (n4 == n1 || n4 == n2 || n4 == n3) {
        cout << "El cuarto numero coincide con al menos uno de los tres primeros" << endl;
    } else {
        cout << "El cuarto numero NO coincide con ninguno de los tres primeros" << endl;
    }

    return 0;
}