#include <iostream>

using namespace std;

int main() {
    char original[] = {'o', 't', 'c', 'e', 'r', 'r', 'o', 'c'};
    char inverso[8];

    for (int i = 0; i < 8; i++) {
        inverso[i] = original[7 - i];
    }

    cout << "Contenido del nuevo vector (inverso):\n";
    for (int i = 0; i < 8; i++) {
        cout << inverso[i];
    }
    cout << endl;

    return 0;
}