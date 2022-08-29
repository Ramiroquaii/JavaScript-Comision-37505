const listaProvincias = [];

let listaProv = document.getElementById("provinciaSelect");
let listaDept = document.getElementById("departamentoSelect");
let listaMunc = document.getElementById("municipioSelect");
let listaLoca = document.getElementById("localidadSelect");
let listaCall = document.getElementById("calleSelect");
let calleNum  = document.getElementById("calleNumero");
let codPostal = document.getElementById("codigoPostal");


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
    listaMunc.innerHTML = `<option value="nada">N / A</option>`;
    listaLoca.innerHTML = `<option value="nada">N / A</option>`;
    listaCall.innerHTML = `<option value="nada">N / A</option>`;
    calleNum.value  = "";
    codPostal.value = "";

    for(let i=0; i < listaProvincias.length; i++){
        listaProv.innerHTML +=
        `<option value="${listaProvincias[i].id}">${listaProvincias[i].nombre}</option>`
    }
});


listaProv.addEventListener('change', (event) => {actualizarDepartamento(event)});
listaDept.addEventListener('change', (event) => {actualizarMunicipio()});
listaMunc.addEventListener('change', (event) => {actualizarLocalidad()});
listaLoca.addEventListener('change', (event) => {actualizarCalle()});

function actualizarDepartamento(event){
    listaDept.innerHTML = `<option value="nada">N / A</option>`;
    listaMunc.innerHTML = `<option value="nada">N / A</option>`;
    listaLoca.innerHTML = `<option value="nada">N / A</option>`;
    listaCall.innerHTML = `<option value="nada">N / A</option>`;
    calleNum.innerHTML = "";
    codPostal.innerHTML = "";
    fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${event.target.value}&campos=id,nombre&max=200`)
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
}

function actualizarMunicipio(){
    listaLoca.innerHTML = `<option value="nada">N / A</option>`;
    fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${listaProv.value}&campos=id,nombre&max=450`)
    .then((resultado) => {
        return resultado.json();
    })
    .then((json) => {
        listaMunc.innerHTML = "";
        listaMunc.innerHTML += `<option value="nada">N / A</option>`;
        for(let i=0; i < json.municipios.length; i++){
            listaMunc.innerHTML +=
            `<option value="${json.municipios[i].id}">${json.municipios[i].nombre}</option>`;
        }
    })
    if(listaProv.value == 02){
        actualizarCalle(event);
    }
}

function actualizarLocalidad(){
    fetch(`https://apis.datos.gob.ar/georef/api/localidades?departamento=${listaDept.value}&municipio=${listaMunc.value}&campos=id,nombre&max=200`)
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










