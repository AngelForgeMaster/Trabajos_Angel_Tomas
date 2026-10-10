#include <iostream>

using namespace std;

int main() {
    int matriz[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};

    cout << "Diagonal principal:\n";
    for (int i = 0; i < 3; i++) {
        cout << matriz[i][i] << " ";
    }
    cout << "\n";

    return 0;
}