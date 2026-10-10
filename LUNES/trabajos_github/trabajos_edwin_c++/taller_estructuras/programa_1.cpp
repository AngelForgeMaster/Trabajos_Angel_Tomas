#include <iostream>
#include <string>
#include <conio.h> 

using namespace std;

int main(){

    int cantidad_estudiantes = 0;
    int total_registrados = 0;
    char confirmacion;
    double promedio_total = 0.0;
    double suma_promedios = 0.0;

    struct info_academica{

        int num_ficha;
        char nom_curso[20];
        double nota1;
        double nota2;
        double nota3;
        double nota4;
        double promedio_alumno;

    };

    struct info_alumno{

        char doc_alumno[20];
        char nom_alumno[20];
        char ape_alumno[20];
        int eda_alumno;
        struct info_academica aca_alum;        

    }aca_alum_1[20];

    cout<<"Bienvenido al programa"<<endl;
    cout<<"Por favor ingrese el numero de estudiantes a evaluar"<<endl;
    
    do{

        cout<<"Maximo 20 estudiantes"<<endl;
        cin>>cantidad_estudiantes;

        if(cantidad_estudiantes > 20){

            cout<<"La cantidad que ingreso es invalida ingrese una valida"<<endl;

        }else{

            cout<<"La cantidad que ingreso es valida puede continuar"<<endl;

        };

    }while(cantidad_estudiantes > 20 || cantidad_estudiantes < 1);

    

        for(int i = 0; i < cantidad_estudiantes; i++){

            cout<<"Por favor diga el nombre del curso del estudiante numero: "<< i + 1<<endl;
            cin>>aca_alum_1[i].aca_alum.nom_curso;
            cout<<"Por favor ingrese el numero de la ficha del estudiante: "<<endl;
            cin>>aca_alum_1[i].aca_alum.num_ficha;
            cout<<"Ingrese el nombre del Alumno: "<<endl;
            cin>>aca_alum_1[i].nom_alumno;
            cout<<"Ingrese por favor el documento del alumno: "<<endl;
            cin>>aca_alum_1[i].doc_alumno;
            cout<<"ingrese el apellido del alumno: "<<endl;
            cin>>aca_alum_1[i].ape_alumno;
            cout<<"ingrese la edad del alumno: "<<endl;
            cin>>aca_alum_1[i].eda_alumno;
            cout<<"Ingrese la nota numero 1: "<<endl;
            cin>>aca_alum_1[i].aca_alum.nota1;
            cout<<"Ingrese la nota numero 2: "<<endl;
            cin>>aca_alum_1[i].aca_alum.nota2;
            cout<<"Ingrese la nota numero 3: "<<endl;
            cin>>aca_alum_1[i].aca_alum.nota3;
            cout<<"Ingrese la nota numero 4: "<<endl;
            cin>>aca_alum_1[i].aca_alum.nota4;
            aca_alum_1[i].aca_alum.promedio_alumno = (aca_alum_1[i].aca_alum.nota1 +
                                                        aca_alum_1[i].aca_alum.nota2 +
                                                        aca_alum_1[i].aca_alum.nota3 +
                                                        aca_alum_1[i].aca_alum.nota4) / 4;

            suma_promedios += aca_alum_1[i].aca_alum.promedio_alumno;
                                                        
            total_registrados++;
            

            if(i < cantidad_estudiantes - 1){

                cout<<"¿Desea seguir registrando estudiantes?"<<endl;
                cout<<"Use S para si o N para No"<<endl;
                cin>> confirmacion;

                if(confirmacion == 'S' || confirmacion == 's' ){

                    cout<<"Usted eligio continuar";

                };

                    if(confirmacion == 'N' || confirmacion == 'n'){

                        cout<<"Usted eligio salir";

                        break;

                    }

                        if(confirmacion != 'S' && confirmacion != 's' && confirmacion != 'N' && confirmacion != 'n'){

                            cout<<"Usted ingreso un parametro invalido el programa continuara: ";

                        }

            };
        
        };

        promedio_total = suma_promedios / total_registrados;

        cout<<"El promedio total del grupo fue de: "<< promedio_total <<endl;

    

    return 0;
}