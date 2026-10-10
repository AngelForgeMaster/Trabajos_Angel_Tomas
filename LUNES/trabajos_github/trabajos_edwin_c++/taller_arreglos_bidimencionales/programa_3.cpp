#include <iostream>

using namespace std;

int main() {
    int original[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int traspuesta[3][3];

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            traspuesta[j][i] = original[i][j];
        }
    }

    cout << "Matriz traspuesta:\n";
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            cout << traspuesta[i][j] << " ";
        }
        cout << "\n";
    }

    return 0;
}