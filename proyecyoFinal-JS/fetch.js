// API del Servicio de Normalización de Datos Geográficos de Argentina.
// https://datosgobar.github.io/georef-ar-api/

const listaProvincias = []; //Vector de provincias, primer campo siempre se carga al inicio.

//Seleccion de los campos del formulario de direccion para completarlos automaticamente.
let listaProv = document.getElementById("provinciaSelect");
let listaDept = document.getElementById("departamentoSelect");
let listaLoca = document.getElementById("localidadSelect");
let listaCall = document.getElementById("calleSelect");
let calleNum  = document.getElementById("calleNumero");
let codPostal = document.getElementById("codigoPostal");

//Carga de vector provincias delsde el API al inicio.
fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre")
.then((resultado) => {
    return resultado.json();
})
.then((json) => {
    
    for(let i=0; i < json.provincias.length; i++){
        listaProvincias.push(json.provincias[i]);
    }

    listaProv.innerHTML = `<option value="nada">N / A</option>`;
    listaDept.innerHTML = `<option value="nada">N / A</option>`;
    listaLoca.innerHTML = `<option value="nada">N / A</option>`;
    listaCall.innerHTML = `<option value="nada">N / A</option>`;
    calleNum.value  = "";
    codPostal.value = "";

    for(let i=0; i < listaProvincias.length; i++){
        listaProv.innerHTML +=
        `<option value="${listaProvincias[i].id}">${listaProvincias[i].nombre}</option>`;
    }
});

//Eventos de cambio al secelcionar los campos respectivos.
listaProv.addEventListener('change', (e) => {actualizarDepartamento(e)});
listaDept.addEventListener('change', () => {actualizarLocalidad()});
listaLoca.addEventListener('change', () => {actualizarCalle()});

// Query String al API para buscar departamento al seleccionar provincia.
function actualizarDepartamento(e){
    listaDept.innerHTML = `<option value="nada">N / A</option>`;
    listaLoca.innerHTML = `<option value="nada">N / A</option>`;
    listaCall.innerHTML = `<option value="nada">N / A</option>`;
    calleNum.innerHTML = "";
    codPostal.innerHTML = "";
    fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${e.target.value}&campos=id,nombre&max=200`)
    .then((resultado) => {
        return resultado.json();
    })
    .then((json) => {
        listaDept.innerHTML = "";
        listaDept.innerHTML += `<option value="nada">N / A</option>`;
        for(let i=0; i < json.departamentos.length; i++){
            listaDept.innerHTML +=
            `<option value="${json.departamentos[i].id}">${json.departamentos[i].nombre}</option>`;
        }
    })
    .catch((e) => {
        console.log(e);
    })
}

// Query String al API para buscar localidad al seleccionar departamento.
function actualizarLocalidad(){
    fetch(`https://apis.datos.gob.ar/georef/api/localidades?departamento=${listaDept.value}&campos=id,nombre&max=200`)
    .then((resultado) => {
        return resultado.json();
    })
    .then((json) => {
        listaLoca.innerHTML = "";
        listaLoca.innerHTML += `<option value="nada">N / A</option>`;
        for(let i=0; i < json.localidades.length; i++){
            listaLoca.innerHTML +=
            `<option value="${json.localidades[i].id}">${json.localidades[i].nombre}</option>`;
        }
    })
}

// Query String al API para buscar calles al seleccionar localidad.
function actualizarCalle(){
    fetch(`https://apis.datos.gob.ar/georef/api/calles?departamento=${listaDept.value}&provincia=${listaProv.value}&max=2000`)
    .then((resultado) => {
        return resultado.json();
    })
    .then((json) => {
        listaCall.innerHTML = "";
        listaCall.innerHTML += `<option value="nada">N / A</option>`;
        for(let i=0; i < json.calles.length; i++){
            listaCall.innerHTML +=
            `<option value="${json.calles[i].id}">${json.calles[i].nombre}</option>`;
        }
    })
}
