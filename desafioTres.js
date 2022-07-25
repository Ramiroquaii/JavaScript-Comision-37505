//Genracion de tipo dato productos (Objeto a traves de Clase).
class Producto {
    constructor(nom,pre){
        this.nombre = nom
        this.precio = pre
    }
    listar(){
        console.log(this.nombre + ' $ ' + this.precio)
    }
    remarcarPrecio(nuevoPrecio){
        this.precio = nuevoPrecio
    }
}

// Item representa la linea del ticket (Contiene al producto) totaliza cantidad y precio total.
class Item {
    constructor(producto){
        this.item = producto
        this.cantidad = 1
        this.total = producto.precio
    }
    agregarItem(){
        this.cantidad = this.cantidad + 1
        this.total = this.item.precio * this.cantidad
    }

}

//Instanciando productos disponibles para la simulación.
const producto1 = new Producto('Producto1', 125.5)
const producto2 = new Producto('Producto2', 237.82)
const producto3 = new Producto('Producto3', 374.7)
const producto4 = new Producto('Producto4', 97.33)

const arrayProductos = [] //Declarando conjunto de productos.

//Cargando el array con los productos.
arrayProductos.push(producto1)
arrayProductos.push(producto2)
arrayProductos.push(producto3)
arrayProductos.push(producto4)

let arrayTicket = [] // Declarando un nuevo ticket o listado de productos seleccionados.

// Busca y debuelve la existencia de un producto dentro del array de productos disponibles.
function buscarProducto(prod, array){
    let producto
    for(let i=0; i<array.length; i++){
        if(array[i].nombre.toString() == prod.toString()){
            producto = array[i]
            break
        }
    }
    return producto
}

// Busca si ya existe en el ticket un renglon o item con el producto elegido.
function buscarTicket(prod, array){
    let item
    for(let i=0; i<array.length; i++){
        if(array[i].item.nombre.toString() == prod.toString()){
            item = i
            break
        }
    }
    return item
}

// Agrgar un producto al ticket, si ya fue selecionado anteriormente actualiza cantidad y precio.
function agregarProducto(prod){
    let producto = buscarProducto(prod, arrayProductos)

    if(producto){
        let tkt = buscarTicket(producto.nombre, arrayTicket)
        if(tkt>=0){
            arrayTicket[tkt].agregarItem()
        }else{
            let item = new Item(producto)
            arrayTicket.push(item)
        }
    }else{
        console.log("PRODUCTO FALTANTE")
    }
}

// Lista la composicion del ticket
function verTicket(){
    if(arrayTicket.length == 0){
        console.log('-*-* El Ticket aun no se ha generado *-*-')
    }else{
        let totalGeneral = 0
        console.log('-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-')
        for(let i=0; i < arrayTicket.length; i++){
            console.log(`Item ${arrayTicket[i].item.nombre} $ ${arrayTicket[i].item.precio} * ${arrayTicket[i].cantidad} - - ${arrayTicket[i].total}`)
            totalGeneral = totalGeneral + Number.parseFloat(`${arrayTicket[i].total}`)
        }
        console.log("TOTAL GENERAL ................ " + Number.parseFloat(`${totalGeneral}`).toFixed(2))
    }
}

// Restablece y vuelve a cero el ticket
function resetearTicket(){
    arrayTicket = []
}
