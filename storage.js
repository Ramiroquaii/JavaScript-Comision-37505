
//Espacions de almacenamiento dentro del navegador.
//Formato del estilo Key: Valor
//Solo se almacena texto plano

// LOCAL STORAGE - permanente.
window.localStorage.setItem('Nombre1','Ramiro');
window.localStorage.setItem('Nombre2','Carlos');

// SESSION STORAGE - hasta que se cierre el navegador y se destruye.
window.sessionStorage.setItem('Dato','Dato en SessionStorage');


console.log(localStorage.getItem('Nombre')); //GET recive key -> retorna valor.
console.log(sessionStorage.getItem('Dato'));


alert('Luego de esto se borraran los storages');

localStorage.removeItem('Nombre2');// REMOVE Key element,
sessionStorage.removeItem('Dato');


alert('Luego de esto se destruye por completo');

localStorage.clear();
sessionStorage.clear();


const array = [{nombre: 'Ramiro'},{nombre: 'Pepe'}];

// JSON formato de texto plano para datos JavaScrip.

const formatoJSON = JSON.stringify(array); //Conversion a texto plano JSON.STRINGIFY.

console.log(formatoJSON);

console.log(JSON.parse(formatoJSON)); //Recostruir el dato JavaScript JSON.PARSE.



// LIBRERIAS SWWET ALERT (descargar o referencial el sweetalert.min.js)  
//swal("Hello world!");
//swal("Here's the title!", "...and here's the text!");

// Con imagenes predefinidas "warning", "error", "success" and "info".
//swal("Good job!", "You clicked the button!", "success");

swal({
    title: "Probando Sweet Alert",
    text: "Desea seguir probando ?",
    icon: "info",
    buttons: ["Cancelar","Avanzar"]
}).then((resultado) => {
    if(resultado){
        swal({
            title: "Avanzaste",
            icon: "success"
        })
    }else{
        swal({
            title: "Cancelaste",
            icon: "error"
        })
    }
});

// TOSTIFY
// LUXON Libreria para DateTime trabajar con fechas.
