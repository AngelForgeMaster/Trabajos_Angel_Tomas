#include <iostream>
#include <string>

using namespace std;

int main() {

    int codigo;
    string nombre;
    int edad;
    float altura;

    cout << "Ingrese el codigo del usuario: ";
    cin >> codigo;

    cout << "Ingrese el nombre del usuario: ";
    cin >> nombre;

    cout << "Ingrese la edad del usuario: ";
    cin >> edad;

    cout << "Ingrese la altura del usuario: ";
    cin >> altura;

    
    cout << "Codigo: " << codigo << endl;
    cout << "Nombre: " << nombre << endl;
    cout << "Edad: " << edad << endl;
    cout << "Altura: " << altura << endl;

    return 0;
}