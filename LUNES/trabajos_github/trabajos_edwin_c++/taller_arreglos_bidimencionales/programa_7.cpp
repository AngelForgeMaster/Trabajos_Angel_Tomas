#include <iostream>

using namespace std;

int main() {
    int A[3][3] = {{1, 2, 1}, {2, 1, 1}, {2, 1, 2}};
    int B[3][3] = {{3, 2, 1}, {2, 3, 1}, {1, 1, 3}};
    int C[3][3] = {0};

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            for (int k = 0; k < 3; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    cout << "Matriz C (Resultado de A x B):\n";
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            cout << C[i][j] << "\t";
        }
        cout << "\n";
    }

    return 0;
}