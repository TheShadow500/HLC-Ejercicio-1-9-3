let saldo = 5000;                                                               // Saldo Inicial
let opcion;                                                                     // Opción Escogida
let creditoHip = 0;                                                             // Tipo de Crédito Hipotecario
let creditosHip = ["Sin Préstamos", "hasta 120.000€", "hasta 200.000€"];        // Descripción del crédito Hipotecario
let creditoHip_solicitado;                                                      // Crédito Hipotecario Solicitado
let creditoHipMin = 70000;                                                      // Crédito Hipotecario Mínimo
let creditoHipMax = [120000, 200000];                                           // Crédito Hipotecario Máximo
let creditoPerDisponible = [
    ["BBVA", 20000, 8, 6.50],
    ["Younited Credit", 50000, 7, 7.55],
    ["Bank Norwegian", 50000, 10, 8.99],
    ["Oney", 35000, 7, 6.95]
];                                                                              // Crédito Personal
let creditoPerMotivo = ["Reformas", "Coche", "Eficiencia Energética", "Otros"]; // Motivo del Crédito Personal
let creditoPer = 0;                                                             // Tipo de Credito Personal
let creditosPer = ["Sin Préstamos", "Préstamo Concedido"];                      // Descripción del Crédito Personal
let historial = [];                                                             // Historial de Movimientos
let euribor = 4.16;                                                             // Euribor Actual
let interes_fijo = 2.5;                                                         // Tasa de Interés Fijo (Modificable)
let interes_variable = 1.5;                                                     // Tasa de Interés Variable (Modificable)
let cuota_anual, cuota_mensual, total_pagado, total_intereses;                  // Datos del Crédito

do{
    // Mostramos el menú al usuario
    opcion = parseInt(prompt("Escoja una opción de las disponibles:\n\n1. Reintegro\n2. Ingreso\n3. Consulta de Saldo\n4. Solicitar Préstamo Hipotecario\n5. (NOVEDAD) Solicitar Prestamo Personal\n6. Historial de Movimientos\n7. Salir del Programa\n"));
    while(isNaN(opcion) || opcion < 0 || opcion > 7){
        opcion = parseInt(prompt("Opción Incorrecta\nEscoja una opción de las disponibles:\n\n1. Reintegro\n2. Ingreso\n3. Consulta de Saldo\n4. Solicitar Préstamo Hipotecario\n5. (NOVEDAD) Solicitar Prestamo Personal\n6. Historial de Movimientos\n7. Salir del Programa\n"));
    }
    
    // Comprobamos la opcion seleccionada
    switch(opcion){
        case 1:     // Retirada de dinero
            operacionRetirada();
            break;
        case 2:     // Ingreso de dinero
            operacionIngreso();
            break;
        case 3:     // Saldo disponible e información de si hay crédito activo
            alert("\nPréstamo Hipotecario: " + creditosHip[creditoHip] + "\nPréstamo Personal: " + creditosPer[creditoPer] + "\nSaldo Disponible: " + saldo + "€");
            break;
        case 4:     // Préstamo hipotecario
            if(creditoHip != 0){                       // Se comprueba si ya tiene un crédito asignado
                alert("Ya dispone de un Crédito Hipotecario Activo");
            }
            else if(saldo < 10000){                    // Se comprueba el salario para ver si tiene opción a crédito y de qué tipo
                alert("No dispone de fondos suficientes para poder solicitar a un crédito hipotecario");
            }
            else if(saldo >= 10000 && saldo < 30000){  // Crédito de 120.000€
                operacionCreditoHip(1, 5000);
            }
            else{                                      // Crédito de 200.000€
                operacionCreditoHip(2, 10000);
            }
            break;
        case 5:
            if(creditoPer != 0){                        // Se comprueba si ya tiene un credito asignado
                alert("Ya dispone de un Crédito Personal Activo");
            }
            else if(saldo < 1000){
                alert("No dispone de fondos suficientes para poder solicitar un crédito personal");
            }
            else{
                operacionCreditoPer();
            }
            break;
        case 6:     // Historial de Movimientos
            let cadena = "Historial de Movimientos: \n";
            for(let i = 0; i < historial.length; i++){
                cadena += historial[i] + "\n";
            }
            cadena += "\nSaldo: " + saldo + "€";
            alert(cadena);
            break;
        case 7:     // Salir del programa
            document.write("Muchas Gracias por su Visita");
            break;
        default:
    }
}while(opcion != 7);


// RETIRADA
function operacionRetirada(){
    // Operacion de Retirada
    // Primero se solicita la cantidad al usuario y se valida si la cantidad es correcta
    let cantidad = parseInt(prompt("Saldo Disponible: " + saldo + "\n\n¿Cuanto quiere solicitar? (0 - Volver)\n"));
    while(isNaN(cantidad) || cantidad < 0 || cantidad > saldo){
        cantidad = parseInt(prompt("Cantidad Incorrecta\n\n Saldo Disponible: " + saldo + "\n\n¿Cuanto quiere solicitar? (0 - Volver)\n"));
    }

    // Actualizamos Información en caso de que el usuario no haya optado por Volver
    if(cantidad != 0){
        // Actualizamos Saldo
        operacionRealizar(1, cantidad);
        // Actualizamos Historial
        modificarhistorial(1, cantidad);
    }
}


// INGRESO
function operacionIngreso(){
    // Operacion de Ingreso
    // Primero se solicita la cantidad al usuario y se valida si la cantidad es correcta
    let cantidad = parseInt(prompt("Saldo Disponible: " + saldo + "\n\n¿Cuanto quiere ingresar? (Máximo 2500€) (0 - Volver)\n"));
    while(isNaN(cantidad) || cantidad < 0 || cantidad > 2500){
        cantidad = parseInt(prompt("Cantidad Incorrecta\n\n Saldo Disponible: " + saldo + "\n\n¿Cuanto quiere ingresar? (Máximo 2500€) (0 - Volver)\n"));
    }

    // Actualizamos Información en caso de que el usuario no haya optado por Volver
    if(cantidad != 0){
        // Actualizamos Saldo
        operacionRealizar(2, cantidad);
        // Actualizamos Historial
        modificarhistorial(2, cantidad);
    }
}


// CRÉDITO HIPOTECARIO
function operacionCreditoHip(opcion, cantidad){
    // Se solicita la cantidad a solicitar
    creditoHip_solicitado = parseInt(prompt("Enhorabuena. Puede acceder a un préstamo hipotecario de " + creditosHip[opcion] + "\n\nIntroduce la cantidad para el préstamo (Mínimo 70000€)"));
    while(isNaN(creditoHip_solicitado) || creditoHip_solicitado < 70000 || creditoHip_solicitado > creditoHipMax[opcion-1]){
        creditoHip_solicitado = parseInt(prompt("Cantidad NO válida.\nEnhorabuena. Puede acceder a un préstamo hipotecario de hasta 120.000€\n\nIntroduce la cantidad para el préstamo (Mínimo 70000€)"));
    }

    // Solicitamos el interés deseado
    let interes = parseInt(prompt("Seleccione el tipo de interés que desea:\n\n1.- Tipo Variable (Euribor " + euribor + "% + Diferencial " + interes_variable + "%)\n2.- Tipo Fijo (" + interes_fijo + "% Interés)"));
    while(isNaN(interes) || interes < 1 || interes > 2){
        interes = parseInt(prompt("La opción escogida NO es valida\nSeleccione el tipo de interés que desea:\n\n1.- Tipo Variable (Euribor " + euribor + "% + Diferencial " + interes_variable + "%)\n2.- Tipo Fijo (" + interes_fijo + "% Interés)"));
    }

    // Se calculan los intereses
    let prestamo = creditoHip_solicitado - cantidad;
    if(interes == 1){
        cuota_anual = prestamo * (((interes_variable / 100) + ((euribor / 100)) / (1 - (( 1 + ((interes_variable / 100) + (euribor / 100))) ** (-25)))));
    }
    else{
        cuota_anual = prestamo * ((interes_fijo / 100) / (1 - (( 1 + (interes_fijo / 100)) ** (-25))));
    }
    
    // Se calculan las cuotas y totales
    cuota_mensual = cuota_anual / 12;
    total_pagado = cuota_anual * 25;
    total_intereses = total_pagado - prestamo;
    // Se muestra por pantalla la información
    alert("Cuota Anual: " + cuota_anual.toFixed(2) + "€\nCuota Mensual: " + cuota_mensual.toFixed(2) + "€\nPago Total: " + total_pagado.toFixed(2) + "€\nTotal Intereses: " + total_intereses.toFixed(2) + "€");

    creditoHip = 1;
    saldo -= cantidad;
    operacionRealizar(2, creditoHip_solicitado);
    modificarhistorial(3, cantidad);
    modificarhistorial(4, creditoHip_solicitado);
}


// CRÉDITO PERSONAL
function operacionCreditoPer(){
    // Primero creamos la cadena dinámica con los créditos disponibles
    let cadena = "Enhorabuena. Puede acceder a un préstamo personal. Seleccione el préstamo que desea\n\n";
    for(let i = 0; i < creditoPerDisponible.length; i++){
        cadena += i+1 + ". " + creditoPerDisponible[i][0] + ": Hasta " + creditoPerDisponible[i][1] + "€ en máximo " + creditoPerDisponible[i][2] + " Años. Interés: " + creditoPerDisponible[i][3] + "%\n";
    }
    // Preguntamos al usuario por el crédito deseado de los disponibles
    let opcion = parseInt(prompt(cadena));
    while(isNaN(opcion) || opcion < 0 || opcion > creditoPerDisponible.length){
        opcion = parseInt(prompt("Opción no válida. " + cadena));
    }

    // Creamos la cadena dinámica con los motivos disponibles
    cadena = "Seleccione la finalidad del préstamo";
    for(let i = 0; i < creditoPerMotivo.length; i++){
        cadena += i+1 + ". " + creditoPerMotivo[i];
    }
    // Preguntamos al usuario por el crédito deseado de los disponibles
    let motivo = parseInt(prompt("Seleccione la finalidad del préstamo.\n\n1. Reformas\n2. Coche\n3. Eficiencia Energética\n4. Otros"));
    while(isNaN(motivo) || motivo < 0 || motivo > creditoPerDisponible.length){
        motivo = parseInt(prompt("Opción no valida. Seleccione la finalidad del préstamo.\n\n1. Reformas\n2. Coche\n3. Eficiencia Energética\n4. Otros"));
    }

    // Preguntamos al usuario por la cantidad que desea solicitar dentro de los rangos
    let cantidad = parseInt(prompt("¿Cuánto desea solicitar? (Mínimo 3000€ - Máximo " + creditoPerDisponible[opcion-1][1] + ")"));
    while(isNaN(cantidad) || cantidad < 3000 || cantidad > creditoPerDisponible[opcion-1][1]){
        cantidad = parseInt(prompt("Cantidad no válida\n\n¿Cuánto desea solicitar? (Mínimo 3000€ - Máximo " + creditoPerDisponible[opcion-1][1] + ")"));
    }

    // Preguntamos al usuario por el tiempo a devolver dentro de los rangos
    let tiempo = parseInt(prompt("¿En cuánto tiempo desea devolver el crédito? (Mínimo 1 Año - Máximo " + creditoPerDisponible[opcion-1][2] + " Años)"));
    while(isNaN(tiempo) || tiempo < 1 || tiempo > creditoPerDisponible[opcion-1][2]){
        tiempo = parseInt(prompt("Cantidad no válida\n\n¿En cuánto tiempo desea devolver el crédito? (Mínimo 1 Año - Máximo " + creditoPerDisponible[opcion-1][2] + " Años)"));
    }

    // Llamamos a la funcion que realiza la operacion enviando la informacion necesaria
    creditoPersonalRealizar(creditoPerMotivo[motivo-1], creditoPerDisponible[opcion-1][0], cantidad, tiempo, creditoPerDisponible[opcion-1][3]);
}


// OPERACION CRÉDITO PERSONAL
function creditoPersonalRealizar(motivo, entidad, cantidad, tiempo, interes){
    let meses = tiempo * 12;
    let mensual = parseFloat((cantidad / meses) * ((interes / 100) + 1)).toFixed(2);
    let total = parseFloat(cantidad * ((interes / 100) + 1)).toFixed(2);

    alert("Finalidad del Crédito: " + motivo + "\nTotal a Devolver: " + total + "€\nCuota Mensual: " + mensual + "€");
    creditoPer = 1;

    // Actualizamos Saldo
    operacionRealizar(2, cantidad);
    // Actualizamos Historial
    modificarhistorial(5, cantidad);
}


// OPERACIÓN INGRESOS Y RETIRADAS
function operacionRealizar(operacion, cantidad){
    /*
        Operacion a realizar
        1 - Retirada
        2 - Ingreso
    */
    switch(operacion){
        case 1:
            saldo -= cantidad;
            break;
        case 2:
            saldo += cantidad;
            break;
        default:
    }
}


// HISTORIAL DE MOVIMIENTOS
function modificarhistorial(opcion, cantidad){
    /*
        Añadir Movimientos al historial en relacion a la opcion pasada
        1 - Dinero Retirado
        2 - Dinero Ingresado
        3 - Entrada Credito Hipotecario
        4 - Crédito Hipotecario
        5 - Crédito Personal
    */
    switch(opcion){
        case 1:
            historial.push("-" + cantidad + "€ - Dinero Retirado");
            break;
        case 2:
            historial.push("+" + cantidad + "€ - Dinero Ingresado");
            break;
        case 3:
            historial.push("-" + cantidad + "€ - Entrada Crédito");
            break;
        case 4:
            historial.push("+" + cantidad + "€ - Credito Hipotecario");
            break;
        case 5:
            historial.push("+" + cantidad + "€ - Credito Personal");
            break;
        default:
    }
}