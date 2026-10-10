#include <iostream>
#include <string>

using namespace std;

int main() {

    int numero_uno;
    int numero_dos;

    cout<<"Por favor ingrese el primer numero";
    cin>>numero_uno;
    cout<<"Ingrese por favor el segundo numero";
    cin>>numero_dos;

    cout<<"la suma de los 2 primeros numeros es: "<< numero_uno + numero_dos;
    cout<<"La resto de los 2 numeros es: "<< numero_uno - numero_dos;
    cout<<"la multiplicacion de los numeros es: "<< numero_dos * numero_uno;
    cout<<"La division de los nuemeros es: "<< numero_uno / numero_dos;

    return 0;
}