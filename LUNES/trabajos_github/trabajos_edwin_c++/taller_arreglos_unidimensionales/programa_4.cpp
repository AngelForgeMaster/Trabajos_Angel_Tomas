#include <iostream>

using namespace std;

int main() {
    int numeros[] = {1, 2, 3, 4, 5};

    cout << "Vector en orden inverso:\n";
    for (int i = 4; i >= 0; i--) {
        cout << numeros[i] << " ";
    }
    cout << endl;

    return 0;
}