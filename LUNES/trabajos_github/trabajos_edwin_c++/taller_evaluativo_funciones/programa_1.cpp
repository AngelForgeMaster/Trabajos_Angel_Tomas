#include <iostream>
#include <string>

using namespace std;


struct DatosPersonales {
    string documento;
    string nombre;
    string direccion;
    string telefono;
    string correo;
};

struct DatosLaborales {
    string cargo;
    string departamento;
    double salario_basico;
};

struct DatosNomina {
    double hod;   
    double hed;   
    double hen;   
    double rn;    
    double hodd;  
    double hondf; 
};


DatosPersonales empleado_personal;
DatosLaborales empleado_laboral;
DatosNomina empleado_nomina;


bool flag_paso1 = false;
bool flag_paso2 = false;
bool flag_paso3 = false;


const double SMLV = 1423500.00;
const double AUX_TRANSPORTE = 200000.00;


void mostrarMenu();
void ingresarDatosPersonales();
void ingresarDatosLaborales();
void ingresarDatosNomina();
void liquidarNomina();
void mostrarCreditos();
double validarLecturaHora(string tipo_hora);

int main() {
    int opcion = 0;

    do {
        mostrarMenu();
        cin >> opcion;
        cin.ignore(); 

        switch (opcion) {
            case 1:
                ingresarDatosPersonales();
                break;
            case 2:
                ingresarDatosLaborales();
                break;
            case 3:
                ingresarDatosNomina();
                break;
            case 4:
                liquidarNomina();
                break;
            case 5:
                mostrarCreditos();
                break;
            case 6:
                
                cout << " Ha salido con exito del sistema de nomina.   " << endl;
                
                break;
            default:
                cout << " Opcion invalida. Intente de nuevo." << endl;
        }

    } while (opcion != 6);

    return 0;
}




void mostrarMenu() {

    cout << "1. Ingreso de Datos Personales" << endl;
    cout << "2. Ingreso de Datos Laborales" << endl;
    cout << "3. Ingreso de Datos de Nomina" << endl;
    cout << "4. Liquidacion de Nomina" << endl;
    cout << "5. Creditos" << endl;
    cout << "6. Salir" << endl;
    
    cout << "Seleccione una opcion: ";
}


void ingresarDatosPersonales() {
    cout << "\n--- 1. INGRESO DE DATOS PERSONALES ---" << endl;
    cout << "Documento de identidad: ";
    getline(cin, empleado_personal.documento);
    cout << "Nombre completo: ";
    getline(cin, empleado_personal.nombre);
    cout << "Direccion de residencia: ";
    getline(cin, empleado_personal.direccion);
    cout << "Telefono de contacto: ";
    getline(cin, empleado_personal.telefono);
    cout << "Correo electronico: ";
    getline(cin, empleado_personal.correo);

    flag_paso1 = true;
    cout << ">> Datos personales registrados exitosamente.\n" << endl;
}


void ingresarDatosLaborales() {
    
    if (!flag_paso1) {
        cout << "\n ERROR: Debe registrar primero los Datos Personales (Opcion 1).\n" << endl;
        return;
    }

    cout << "--- 2. INGRESO DE DATOS LABORALES ---" << endl;
    cout << "Cargo: ";
    getline(cin, empleado_laboral.cargo);
    cout << "Departamento: ";
    getline(cin, empleado_laboral.departamento);
    
    do {
        cout << "Salario Basico: $";
        cin >> empleado_laboral.salario_basico;
        if (empleado_laboral.salario_basico <= 0) {
            cout << "El salario debe ser mayor a cero. Intente de nuevo." << endl;
        }
    } while (empleado_laboral.salario_basico <= 0);

    flag_paso2 = true;
    cout << ">> Datos laborales registrados exitosamente.\n" << endl;
}


double validarLecturaHora(string tipo_hora) {
    double valor = 0;
    do {
        cout << tipo_hora << ": ";
        cin >> valor;
        if (valor < 0) {
            cout << "[!] No se permiten valores negativos. Reingrese el valor." << endl;
        }
    } while (valor < 0);
    return valor;
}


void ingresarDatosNomina() {
    
    if (!flag_paso1 || !flag_paso2) {
        cout << "\n[!] ERROR: Debe registrar los Datos Personales (1) y Laborales (2) previamente.\n" << endl;
        return;
    }

    cout << "\n--- 3. INGRESO DE DATOS DE NOMINA (HO) ---" << endl;
    empleado_nomina.hod   = validarLecturaHora("Horas Ordinarias Diurnas (HOD)");
    empleado_nomina.hed   = validarLecturaHora("Horas Extras Diurnas (HED)");
    empleado_nomina.hen   = validarLecturaHora("Horas Extras Nocturnas (HEN)");
    empleado_nomina.rn    = validarLecturaHora("Recargos Nocturnos (RN)");
    empleado_nomina.hodd  = validarLecturaHora("Horas Ord. Diurnas Dom. y Festivo (HODD)");
    empleado_nomina.hondf = validarLecturaHora("Horas Ord. Nocturnas Dom. y Festivo (HONDF)");

    flag_paso3 = true;
    cout << ">> Datos de nomina ingresados correctamente.\n" << endl;
}


void liquidarNomina() {
   
    if (!flag_paso1 || !flag_paso2 || !flag_paso3) {
        cout << "\n[!] ERROR: Para liquidar la nomina debe completar las opciones 1, 2 y 3.\n" << endl;
        return;
    }

    
    double valor_hora_ordinaria = empleado_laboral.salario_basico / 240.0;

    
    double val_hod   = empleado_nomina.hod   * (valor_hora_ordinaria * 1.00);
    double val_hed   = empleado_nomina.hed   * (valor_hora_ordinaria * 1.25);
    double val_hen   = empleado_nomina.hen   * (valor_hora_ordinaria * 1.75);
    double val_rn    = empleado_nomina.rn    * (valor_hora_ordinaria * 0.35);
    double val_hodd  = empleado_nomina.hodd  * (valor_hora_ordinaria * 1.75);
    double val_hondf = empleado_nomina.hondf * (valor_hora_ordinaria * 2.10);

    double total_novedades_horas = val_hod + val_hed + val_hen + val_rn + val_hodd + val_hondf;

    
    double auxilio_aplicado = 0.0;
    if (empleado_laboral.salario_basico <= (2 * SMLV)) {
        auxilio_aplicado = AUX_TRANSPORTE;
    }

    
    double deduccion_salud   = empleado_laboral.salario_basico * 0.08;
    double deduccion_pension = empleado_laboral.salario_basico * 0.08;
    double total_deducciones = deduccion_salud + deduccion_pension;

    // Neto a pagar
    double devengado_total = empleado_laboral.salario_basico + total_novedades_horas + auxilio_aplicado;
    double neto_a_pagar    = devengado_total - total_deducciones;

    
    
    cout << "DOCUMENTO: " << empleado_personal.documento << " | NOMBRE: " << empleado_personal.nombre << endl;
    cout << "CARGO: " << empleado_laboral.cargo << " | DPTO: " << empleado_laboral.departamento << endl;
    
    cout << "Salario Basico:                   " << empleado_laboral.salario_basico << endl;
    cout << "Total Novedades de Horas:         " << total_novedades_horas << endl;
    cout << "Auxilio de Transporte:            " << auxilio_aplicado << endl;
     
    cout << "TOTAL DEVENGADO:                  " << devengado_total << endl;
    
    cout << "Deduccion Salud (8%):            " << deduccion_salud << endl;
    cout << "Deduccion Pension (8%):          " << deduccion_pension << endl;
    cout << "TOTAL DEDUCCIONES:               " << total_deducciones << endl;
    
    cout << "NETO A PAGAR AL TRABAJADOR:       $" << neto_a_pagar << endl;
    
}


void mostrarCreditos() {
    
    cout << "              CREDITOS DEL APRENDIZ           " << endl;
    
    cout << "Programa: Analisis y Desarrollo de Software (ADSO)" << endl;
    cout << "Centro: Centro de Diseno y Manufactura del Cuero" << endl;
    cout << "Instructor: Edwin Bustamante Marin" << endl;
    cout << "----------------------------------------------" << endl;
    cout << "Documento: [Ingresa tu documento]" << endl;
    cout << "Nombres y Apellidos: [Ingresa tus nombres y apellidos]" << endl;
    cout << "Correo Electronico: [Ingresa tu correo institucional/SENA]" << endl;
    cout << "Ficha: [Ingresa el numero de tu ficha]" << endl;
   
}