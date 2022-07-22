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

// CONSTRUCTOR DE OBJETO SUELTO con metodos visibles.
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


// CLASES ocultan los metodos, solo pueden ser llamados.
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

/////////////////////////////////////////////////////////////////////////////////

// ARRAYS     ARREGLOS     VECTORES

const array = ['maca', 1, true] //declaracion con cualquier tio de dato
console.log(array[0]) //mostrando la posision indicada entre []

const alumnos = ['Ramiro', 'Pedro', 'Juan']
alumnos.push('Gustavo') //agrega al final.
alumnos.unshift('Andres') //agrega al principio en posicion 0.

alumnos.pop() //elimina ultimo elemento.
alumnos.shift() //elimina primer elemento posicion 0.

//Recorrer un array elemento por elemento.
for (let i=0; i < alumnos.length; i++){
    console.log('Nombre: ' + alumnos[i])
}
for(alumno in alumnos){
    console.log(alumnos[alumno])
}

let enUnaLinea = alumnos.join('-') //une las pos del array, las separa con lo indicado y conviente a string.
console.log(enUnaLinea)

let fecha = '2022/04/30'
let arrayFecha = fecha.split('/') //convierte un texto en array separando por lo indicado.


// MATRICES    ARRAY de ARRAYs

const alumnosArray = []
const alumno1 = new Personas('Pepe', 'Martinez', 30)
const alumno2 = new Personas('Juan', 'Sanchez', 27)

alumnosArray.push(alumno1)
alumnosArray.push(alumno2)

for(let i=0; i < alumnosArray.length; i++){
    console.log(`Soy ${alumnosArray[i].nombre} y mi edad es: ${alumnosArray[i].edad}`)
}


///////////////////////////////////////////////////////////////////////////

// CALLBACK - Funciones de orden superior

function suma(num1, num2){return num1+num2}
function resta(num1, num2){return num1-num2}
function dividir(num1, num2){return num1/num2}
function multiplicar(num1, num2){return num1*num2}

function calcular(operacion, num1, num2){
    let resultado = operacion(num1, num2)
    return resultado
}

console.log(calcular(resta, 5, 3))

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

let total = 0
const numeros = [1,2,4,6,7,9,14]

function porCadaUno(array, operacion){
    for(const i of array){
        operacion(i)
    }
}

function totalizar(num){
    total += num  // igual a hacer total = total + num
    return total
}

console.log(porCadaUno(numeros, totalizar))

numeros.forEach((elemento)=> console.log(elemento))

numeros.forEach( function(elemento){
    console.log(elemento)
})

// FIND - devuelve true o false
const peliculas =[
    {'nombre': 'Elvis', 'duracion': 130},
    {'nombre': 'ET', 'duracion': 145}
]

// FIND devuelve el primer match ignora si hay mas coincidencias.
const encontrePeli = peliculas.find( (e) => e.nombre == 'Elvis')

// MAP toma un array lo recorre hace alguna operacion y devuelve
// otro array con los reusltados acorde a las posisiones del array original.
const numerosActulizados = numeros.map( (e)=> e*2 )

// FECHAS
const fechaCalendario = new Date()