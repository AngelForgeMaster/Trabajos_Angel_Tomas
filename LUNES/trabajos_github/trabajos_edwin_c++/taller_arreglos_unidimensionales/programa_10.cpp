#include <iostream>
#include <string>

using namespace std;

int main() {
    string estudiantes[] = {"Hugo", "Paco", "Luis"};
    float promedios[3];
    float nota, suma;

    for (int i = 0; i < 3; i++) {
        suma = 0;
        cout << "--- Ingrese notas de " << estudiantes[i] << " ---\n";
        for (int j = 1; j <= 4; j++) {
            cout << "Nota " << j << ": ";
            cin >> nota;
            suma += nota;
        }
        promedios[i] = suma / 4.0;
    }

    
    cout << "          PROMEDIOS FINALES              \n";
   
    for (int i = 0; i < 3; i++) {
        cout << "Estudiante: " << estudiantes[i] << " | Promedio: " << promedios[i] << endl;
    }

    return 0;
}