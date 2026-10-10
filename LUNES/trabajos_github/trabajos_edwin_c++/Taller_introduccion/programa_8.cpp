#include <iostream>

using namespace std;

int main() {
    
    float a, b, c, d, e, f;
    float resultado1, resultado2, resultado3;

    
    
    cout << "Ingrese el valor de a: "; cin >> a;
    cout << "Ingrese el valor de b: "; cin >> b;
    cout << "Ingrese el valor de c: "; cin >> c;
    cout << "Ingrese el valor de d: "; cin >> d;
    cout << "Ingrese el valor de e: "; cin >> e;
    cout << "Ingrese el valor de f: "; cin >> f;
    
    

    

    
    resultado1 = (a / b) + 1;

    
    
    resultado2 = (a + b) / (c + d);

    
    resultado3 = (a + (b / c)) / (d + (e / f));

    
    
    cout << "1. El resultado de (a/b) + 1 es: " << resultado1 << endl;
    cout << "2. El resultado de (a+b)/(c+d) es: " << resultado2 << endl;
    cout << "3. El resultado de (a+(b/c))/(d+(e/f)) es: " << resultado3 << endl;

    return 0;
}