#include <iostream>

using namespace std;

int main() {
    float n1, n2, n3;
    int ganaron_todos = 0;
    int ganaron_al_menos_uno = 0;
    int ganaron_ultimo = 0;

    for (int i = 1; i <= 5; i++) {
        cout << " Alumno " << i ;
        cout << "Nota examen 1: "; cin >> n1;
        cout << "Nota examen 2: "; cin >> n2;
        cout << "Nota examen 3: "; cin >> n3;

        if (n1 >= 3.0 && n2 >= 3.0 && n3 >= 3.0) {
            ganaron_todos++;
        }

        if (n1 >= 3.0 || n2 >= 3.0 || n3 >= 3.0) {
            ganaron_al_menos_uno++;
        }

        if (n3 >= 3.0) {
            ganaron_ultimo++;
        }
    }

    
    cout << "Ganaron los tres examenes: " << ganaron_todos ;
    cout << "Ganaron al menos un examen: " << ganaron_al_menos_uno ;
    cout << "Ganaron el ultimo examen: " << ganaron_ultimo ;

    return 0;
}