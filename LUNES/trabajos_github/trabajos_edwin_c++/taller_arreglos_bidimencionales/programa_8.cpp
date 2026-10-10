#include <iostream>

using namespace std;

int main() {
    int identidad[4][4];

    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            if (i == j) {
                identidad[i][j] = 1;
            } else {
                identidad[i][j] = 0;
            }
        }
    }

    cout << "Matriz Identidad 4x4:\n";
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            cout << identidad[i][j] << " ";
        }
        cout << "\n";
    }

    return 0;
}