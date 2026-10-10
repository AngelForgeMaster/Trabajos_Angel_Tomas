#include <iostream>

using namespace std;

int main() {
    int n, x = 0, y = 1, z = 0;

    cout << "Ingrese la cantidad de elementos para la serie: ";
    cin >> n;

    cout << "Serie Fibonacci: ";
    for (int i = 1; i <= n; i++) {
        if (i == 1) {
            cout << x << " ";
            continue;
        }
        if (i == 2) {
            cout << y << " ";
            continue;
        }
        z = x + y;
        x = y;
        y = z;
        cout << z << " ";
    }
    

    return 0;
}