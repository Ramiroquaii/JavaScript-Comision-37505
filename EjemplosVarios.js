// Este codigo es de consulta y no pretende dar ningun
// tipo de funcionalidad al proyecto. Son solo ejemplos
// y referencias a metodos y funciones para tener a
// metodosde consulta.

//FUNCION ANONIMA
let suma = function(num1,num2){return num1+num2}

//FUNCION FLECHA - return implicito
//solo 1 instruccion ***************************
let suma2 = (num1,num2) => num1 + num2

//mas de una instruccion ***********************
let suma3 = (num1,num2) => {
    let aux = num1 + num2
    return aux / 2
}

//TIPO DE DATO OBJETO ********************** OBJETOS
let persona = {
    'nombre': 'Ramiro',
    'apellido': 'Vechiola',
    'edad': 26,
}

// Agregando o redefiniendo propiedades
persona.esDeRiver = true //agrego parametro
persona.nombre = 'Juan' //cambio el valor de una propiedad

// Acceso a los valores de sus parametros
console.log(persona['nombre'])
console.log(persona.nombre)

// CONSTRUCTOR DE OBJETO SUELTO
function Persona(nom,ape,age){
    this.nombre = nom
    this.apellido = ape
    this.edad = age

    this.saludar = function(){console.log('Hola ' + this.nombre)}
}

let persona1 = new Persona('Ana','Gonzales',30)
persona1.saludar()
let persona2 = new Persona('Pedro','Enriquez',52)
persona2.saludar()


// CLASES
class Personas {
    constructor(nom,ape,age){
        this.nombre = nom
        this.apellido = ape
        this.edad = age
    }
    saludar(){
        console.log('Hola ' + this.nombre)
    }
    decirAdios(){
        console.log('Adios ' + this.apellido)
    }
}

let persona3 = new Personas('Maca','Armijo',28)
console.log(persona3)
persona3.decirAdios()

for(propiedad in persona3){
    console.log(propiedad + ': ' + persona3[propiedad])
}
for(propiedad in persona3){
    console.log(persona3[propiedad])
}