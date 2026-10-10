#include <iostream>

using namespace std;

int main() {
    int m1[3][3] = {{1, 0, 4}, {2, 3, 2}, {1, 4, 1}};
    int m2[3][3] = {{1, 3, 2}, {4, 1, 1}, {1, 1, 2}};
    int suma[3][3];

    cout << "Resultado de la suma de matrices:\n";
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            suma[i][j] = m1[i][j] + m2[i][j];
            cout << suma[i][j] << " ";
        }
        cout << "\n";
    }

    return 0;
}