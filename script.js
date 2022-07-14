//VARIABLES GLOBALES
let opcion //Almacena la opcion del menu seleccionada.

let resultado //Almacena el resultado de las operaciones seleccionadas.

//Ciclo HACER ... MIENTRAS se cumpla la condición.
do{
    opcion = parseInt(prompt('Ingrese una opción:\n 1- Realizar una suma.\n 2- Concatenar dos strings.'))
}while (opcion != 1 && opcion != 2)

//CONDICIONAL de selección de flujo.
switch (opcion){
    case 1:
        sumar()
        mostrarResultado(1)
        break
    case 2:
        concatenar()
        mostrarResultado(2)
        break
}

//FUNCIONES de soporte para las opciones del menu.
function sumar(){
    let num1 = parseInt(prompt('Ingrese primer numero a sumar:'))
    let num2 = parseInt(prompt('Ingrese segundo numero a sumar:'))

    if(Number.isInteger(num1) && Number.isInteger(num2)){
        resultado = num1 + num2
    } else {
        alert('Los datos ingresados no eran numeros.\nIngrese nuevamente los numeros.\n')
        sumar()
    }
}

function concatenar(){
    let str1 = String(prompt('Ingrese primer String:'))
    let str2 = String(prompt('Ingrese segundo String:'))

    resultado = str1 + ' ' + str2
}

function mostrarResultado(res){
    if(res == 1){
        console.log(resultado)
        alert(`La suma dio como resultado: ${resultado}`)
    }
    if(res == 2){
        console.log(resultado)
        alert(`El string unificado es: \n ${resultado}`)
    }
}