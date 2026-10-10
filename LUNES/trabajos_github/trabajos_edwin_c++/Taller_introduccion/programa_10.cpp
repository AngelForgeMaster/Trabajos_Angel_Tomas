#include <iostream>
#include <string>

using namespace std;

int main() {
    int codigo;
    string nombre;
    float nota_teorica, nota_practica, nota_participacion, nota_final;

    cout << "Ingrese el codigo del alumno: ";
    cin >> codigo;

    cout << "Ingrese el primer nombre del alumno: ";
    cin >> nombre;

    cout << "Ingrese la nota teorica (30%): ";
    cin >> nota_teorica;

    cout << "Ingrese la nota practica (50%): ";
    cin >> nota_practica;

    cout << "Ingrese la nota de participacion (20%): ";
    cin >> nota_participacion;

    nota_final = (nota_teorica * 0.30) + (nota_practica * 0.50) + (nota_participacion * 0.20);

    
    cout << "Codigo: " << codigo << "\n";
    cout << "Alumno: " << nombre << "\n";
    
    cout << "Nota Teorica (30%):       " << nota_teorica << "\n";
    cout << "Nota Practica (50%):      " << nota_practica << "\n";
    cout << "Nota Participacion (20%): " << nota_participacion << "\n";
    
    cout << "NOTA FINAL:               " << nota_final << "\n";
    

    return 0;
}