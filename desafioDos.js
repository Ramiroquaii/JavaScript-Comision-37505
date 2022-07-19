//Acumulador de precio
let total = 0

//Funcion para sumar y acumular precios
function totalizar(precio){
    total = total + parseFloat(precio)
}

//Funcion para mostrar el total hasta el momento
function totalAcumulado(){
    if(total == 0){
        alert('Usted no a seleccionado ningun producto.')
    }else{
        alert(`Usted lleva acumulado: $ ${total.toFixed(2)}`)
    }
}

//Volver a cero el acumulador de precios
function resetear(){
    total = 0
    alert('Su total ha sido reseteado !!')
}