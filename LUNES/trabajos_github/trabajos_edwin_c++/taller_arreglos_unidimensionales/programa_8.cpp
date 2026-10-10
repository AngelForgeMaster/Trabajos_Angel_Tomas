#include <iostream>

using namespace std;

int main() {
    char vec1[] = {'a', 'b', 'c', 'd', 'e'};
    char vec2[] = {'f', 'g', 'h', 'i', 'j'};
    char vec3[10];

    for (int i = 0; i < 5; i++) {
        vec3[i] = vec1[i];
    }

    for (int i = 0; i < 5; i++) {
        vec3[i + 5] = vec2[i];
    }

    cout << "Contenido del nuevo vector:\n";
    for (int i = 0; i < 10; i++) {
        cout << vec3[i] << " ";
    }
    cout << endl;

    return 0;
}