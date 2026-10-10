#include <iostream>

using namespace std;

int main() {

    int a, b, auxiliar;

   
    
    cout << "Ingrese el valor para la variable 'a': ";
    cin >> a;
    cout << "Ingrese el valor para la variable 'b': ";
    cin >> b;

    
    
    cout << "a = " << a << ", b = " << b ;
    

    
    auxiliar = a;  
    a = b;         
    b = auxiliar;  

    
    cout << "Valores intercambiados correctamente:";
    cout << "a = " << a << ", b = " << b;

    return 0;
}