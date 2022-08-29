//Genracion de tipo dato productos (Objeto a traves de Clase).
class Producto {
    constructor(nom,pre){
        this.nombre = nom;
        this.precio = pre;
    }
    listar(){
        console.log(this.nombre + ' $ ' + this.precio);
    }
    remarcarPrecio(nuevoPrecio){
        this.precio = nuevoPrecio;
    }
}

// Item representa la linea del ticket (Contiene al producto) totaliza cantidad y precio total.
class Item {
    constructor(producto){
        this.item = producto;
        this.cantidad = 1;
        this.total = producto.precio;
    }
    agregarItem(){
        this.cantidad = this.cantidad + 1;
        this.total = this.item.precio * this.cantidad;
    }
    quitarItem(){
        if(this.cantidad >= 2){
            this.cantidad = this.cantidad - 1;
            this.total = this.item.precio * this.cantidad;
        }else{
            if(this.cantidad == 1){
                return -1;
            }
        }
    }
}

//Instanciando productos disponibles para la simulación.
const producto1 = new Producto('Producto1', 125.5);
const producto2 = new Producto('Producto2', 237.82);
const producto3 = new Producto('Producto3', 374.7);
const producto4 = new Producto('Producto4', 97.33);

const arrayProductos = []; //Declarando conjunto de productos.

//Cargando el array con los productos.
arrayProductos.push(producto1);
arrayProductos.push(producto2);
arrayProductos.push(producto3);
arrayProductos.push(producto4);

let arrayTicket = [];// Declarando un nuevo ticket o listado de productos seleccionados.

let usuarioLogueado; //Objeto que contiene al usuario logueado.
let loginOk = 0; //Si el login fue Ok 1 sino 0 - FLAG
let prodEnCarrito = 0;

//Array de usaurios habilitados a ingresar
const usuarios = [
    { nombre: "marmijo", },
    { nombre: "rvechiola", },
    { nombre: "fandres", }
];


(document.getElementsByClassName("btnLogin"))[0].addEventListener("click", function(){login()});
(document.getElementsByClassName("btnShowTkt"))[0].addEventListener("click", function(){verTicket()});
(document.getElementsByClassName("btnReset"))[0].addEventListener("click", function(){reset()});
(document.getElementsByClassName("btnLogoff"))[0].addEventListener("click", function(){logoff()});

document.querySelector(".lineaEnvioBtn input:nth-child(1)").addEventListener("click", (event) => {confirmarEnvio(event)});
document.querySelector(".lineaEnvioBtn input:nth-child(2)").addEventListener("click", function(){solicitarEnvio()});


//Validación de ingreso, se solicita nombre de usuario y de existir da acceso.
function login(){
    window.localStorage.clear();
    let nomIngresado = document.getElementById("nombre").value;

    usuarioLogueado =
    usuarios.find((usuario)=>{
        return usuario.nombre === nomIngresado.toLowerCase();
    })

    if(!usuarioLogueado){
        document.getElementById("nombre").value = '';
        document.getElementById("nombre").placeholder = 'Usuario Incorrecto';
        document.getElementById("nombre").style.borderColor = 'red';
    }else{
        let bienvenido = document.getElementsByClassName("bienvenida");
        bienvenido[0].innerHTML = `<p>Bienvenido: ${usuarioLogueado.nombre}</p><div class="contenedorCarrito"><div class="contador"><p>0</p></div><img class="carrito" src="../img/carrito.png" alt="Carrito"><div class="btntkt"><p>VER</p></div></div>`;

        (document.getElementsByClassName("btntkt"))[0].addEventListener("click", function(){mostrarOcultarCarrito()});
        document.getElementById("nombre").value = '';
        document.getElementById("nombre").placeholder = '';
        document.getElementById("nombre").style.borderColor = 'black';

        (document.getElementsByClassName("login"))[0].style.display = 'none';
        (document.getElementsByClassName("productos"))[0].style.display = 'flex';
        (document.getElementsByClassName("botonera"))[0].style.display = 'flex';

        let event = document.getElementsByClassName("btnProd");
        for(let i=0; i < event.length; i++){
            event[i].addEventListener("click", function(){agregarProducto(`Producto${i+1}`)});
        }
    }
}


function actualizarCarrito(){

    let ticket = window.localStorage.getItem("Ticket");
    ticket = JSON.parse(ticket);

    if(ticket.length == 0){
        console.log('Ticket VACIO');
        (document.getElementsByClassName("listaCarro"))[0].innerHTML = "";
        (document.getElementsByClassName("listaCarro"))[0].className = "listaCarro";
    }

    if(ticket && ticket.length > 0){
        (document.getElementsByClassName("listaCarro"))[0].innerHTML = "";
                
        for(let i=0; i < ticket.length; i++){
        (document.getElementsByClassName("listaCarro"))[0].innerHTML +=`
        <div class="cajaTkt">
        <div class="tktLinea1">
            <img src="../img/${ticket[i].item.nombre}.png" alt="${ticket[i].item.nombre}">
        </div>
        <div class="tktLinea2">
            <h4>${ticket[i].item.nombre}</h4>
            <p>Precio: $ ${ticket[i].item.precio}</p>
            <div class="tktLinea2-subline">
                <input type="button" class="btnAddRemove" value="+" id="add-${ticket[i].item.nombre}">
                <p>Cantidad: ${ticket[i].cantidad}</p>
                <input type="button" class="btnAddRemove" value="-" id="remove-${ticket[i].item.nombre}">
            </div>
        </div>
        </div>`;
        }

        (document.getElementsByClassName("listaCarro"))[0].innerHTML +=
        `<input type="button" class="btn" value="Envio Domicilio" id="btnEnvio">`;

        for(let i=0; i<ticket.length; i++){
            document.getElementById(`add-${ticket[i].item.nombre}`).addEventListener("click", function(){agregarProducto(`${ticket[i].item.nombre}`)});
            document.getElementById(`remove-${ticket[i].item.nombre}`).addEventListener("click", function(){quitarProducto(`${ticket[i].item.nombre}`)});
        }

        document.getElementById(`btnEnvio`).addEventListener("click", function(){solicitarEnvio()});

    }
}

function mostrarOcultarCarrito(){
    let ticket = window.localStorage.getItem("Ticket");
    ticket = JSON.parse(ticket);

    if(ticket && ticket.length > 0){
        (document.getElementsByClassName("listaCarro"))[0].classList.toggle("listaCarrito");
    }else{
        swal({
            title: "Carrito Vacio",
            text: "No ha elegido productos !!",
            icon: "info",
        });
    }
}

//Salir y reiniciar todo.
function logoff(){
    usuarioLogueado = null; 
    loginOk = 0;
    resetearTicket();
    (document.getElementsByClassName("bienvenida"))[0].innerHTML = '<p>Bienvenido !!</p>';
    (document.getElementsByClassName("login"))[0].style.display = 'flex';
    (document.getElementsByClassName("productos"))[0].style.display = 'none';
    (document.getElementsByClassName("botonera"))[0].style.display = 'none';
    (document.getElementsByClassName("ticket"))[0].style.display = 'none';
    (document.getElementsByClassName("listaCarro"))[0].style.display = 'none';
    window.location.reload();
}


// Lista la composicion del ticket.
function verTicket(){
    if(arrayTicket.length == 0){
        (document.getElementsByClassName("ticket"))[0].style.display = 'flex';
        (document.getElementsByClassName("ticket"))[0].innerHTML = '<p>-*-* El Ticket aun no se ha generado *-*-</p>';
        actualizarContadorCarrito();
        actualizarCarrito(); ////////////////////////////////////////////
    }else{
        (document.getElementsByClassName("ticket"))[0].style.display = 'flex';
        let totalGeneral = 0;
        (document.getElementsByClassName("ticket"))[0].innerHTML = '<p>-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-</p>';
        for(let i=0; i < arrayTicket.length; i++){
            (document.getElementsByClassName("ticket"))[0].innerHTML += `<div class="linea"><p>Item ${arrayTicket[i].item.nombre} $ ${arrayTicket[i].item.precio} * ${arrayTicket[i].cantidad} - - ${arrayTicket[i].total}</p><input type="button" class="btnQuitar" value="-" id="${arrayTicket[i].item.nombre}"></div>`;
            totalGeneral = totalGeneral + Number.parseFloat(`${arrayTicket[i].total}`);
        }
        (document.getElementsByClassName("ticket"))[0].innerHTML += `<p>TOTAL GENERAL ................ ${Number.parseFloat(totalGeneral).toFixed(2)}</p>`;
        (document.getElementsByClassName("ticket"))[0].innerHTML += '<p>-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-</p>';
        actualizarContadorCarrito();
        actualizarCarrito(); ////////////////////////////////////////////
    }
    let event = document.getElementsByClassName("btnQuitar");
    for(let i=0; i < event.length; i++){
        event[i].addEventListener("click", function(){quitarProducto(event[i].id)});
    }
    // actualizarContadorCarrito();
    // actualizarCarrito(); ////////////////////////////////////////////
}


// Restablece y vuelve a cero el ticket.
function resetearTicket(){
    arrayTicket = [];
    prodEnCarrito = 0;
    window.localStorage.clear();
    actualizarContadorCarrito();
    document.getElementById("listaCarro").className = "listaCarro";
    (document.getElementsByClassName("ticket"))[0].innerHTML = '';
    (document.getElementsByClassName("ticket"))[0].style.display = 'none';
}

function reset(){

    if(arrayTicket && arrayTicket.length == 0){
        swal({
            title: "Nada para resetear.",
            icon: "info"
        });
    } else {

        swal({
            title: "Resetear Ticket",
            text: "Esta seguro de borrar ?",
            icon: "warning",
            buttons: ["Cancelar","Resetear"]
        }).then((resultado) => {
            if(resultado){
                resetearTicket();
            }
        });
    }
}


// Busca y debuelve la existencia de un producto dentro del array de productos disponibles.
function buscarProducto(prod, array){
    let producto;
    for(let i=0; i<array.length; i++){
        if(array[i].nombre.toString() == prod.toString()){
            producto = array[i];
            break;
        }
    }
    return producto;
}


// Busca si ya existe en el ticket un renglon o item con el producto elegido.
function buscarTicket(prod, array){
    let item;
    for(let i=0; i<array.length; i++){
        if(array[i].item.nombre.toString() == prod.toString()){
            item = i;
            break;
        }
    }
    return item;
}


// Agrgar un producto al ticket, si ya fue selecionado anteriormente actualiza cantidad y precio.
function agregarProducto(prod){
    let producto = buscarProducto(prod, arrayProductos);

    if(producto){
        let tkt = buscarTicket(producto.nombre, arrayTicket);
        if(tkt>=0){
            arrayTicket[tkt].agregarItem();
            prodEnCarrito += 1;
            actualizarStorage(tkt);
        }else{
            let item = new Item(producto);
            arrayTicket.push(item);
            prodEnCarrito += 1;
            window.localStorage.setItem(String(producto.nombre), JSON.stringify(item));
        }
    }else{
        console.log("PRODUCTO FALTANTE");
    }
    window.localStorage.setItem("Ticket", JSON.stringify(arrayTicket));
    verTicket();
}

function actualizarStorage(indice){
    let itemListado = arrayTicket[indice];
    window.localStorage.removeItem(String(itemListado.item.nombre));
    window.localStorage.setItem(String(itemListado.item.nombre), JSON.stringify(itemListado));
}

function quitarProducto(producto){

    let indice = buscarTicket(producto, arrayTicket);

    let lineaTicket = arrayTicket[indice];
    
    let eliminar = lineaTicket.quitarItem();

    if(eliminar == -1){
        arrayTicket.splice(indice, 1);
        window.localStorage.removeItem(String(lineaTicket.item.nombre));
    } else {
        window.localStorage.setItem(String(lineaTicket.item.nombre), JSON.stringify(lineaTicket));
    }

    prodEnCarrito -= 1;

    window.localStorage.setItem("Ticket", JSON.stringify(arrayTicket));
    
    verTicket();
}

function actualizarContadorCarrito(){
    (document.getElementsByClassName("contador"))[0].innerHTML = `<p>${prodEnCarrito}</p>`;
}


function solicitarEnvio(){
    document.getElementById(`panelEnvio`).classList.toggle(`visualizarEnvio`);
}

function confirmarEnvio(){
    
    let prov = listaProv.options[listaProv.selectedIndex].text;
    let dept = listaDept.options[listaDept.selectedIndex].text;
    let muni = listaMunc.options[listaMunc.selectedIndex].text;
    let loca = listaLoca.options[listaLoca.selectedIndex].text;
    let call = listaCall.options[listaCall.selectedIndex].text;
    let nume = calleNum.value;
    let cpos = codPostal.value;


    swal({
        title: "Confirmar Envio",
        text: `Son correctos los datos de envio:
        ${prov}, ${dept}, ${muni}, ${loca}
        Calle: ${call} ${nume} CP: ${cpos}`,
        icon: "warning",
        buttons: ["Cancelar","Confirmar"]
    }).then((resultado) => {
        if(resultado){
            let dire = {
                "Provincia": `${prov}`,
                "Departamento": `${dept}`,
                "Municipio": `${muni}`,
                "Localidad": `${loca}`,
                "Calle": `${call}`,
                "Numero": `${nume}`,
                "CP": `${cpos}`,
            }
            window.localStorage.setItem("dirEnvio", JSON.stringify(dire));
            listaDept.options[listaDept.selectedIndex].text = "N / A";
            listaMunc.options[listaMunc.selectedIndex].text = "N / A";
            listaLoca.options[listaLoca.selectedIndex].text = "N / A";
            listaCall.options[listaCall.selectedIndex].text = "N / A";
            calleNum.value = "";
            codPostal.value = "";
        }
        solicitarEnvio();
    });
}