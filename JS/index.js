//ARRAY DE PRODUCTOS 
class Productos {
    constructor(Id, Nombre, Imagen, Tipo, Precio) {
        this.Id = Id;
        this.Nombre = Nombre;
        this.Imagen = Imagen;
        this.Tipo = Tipo;
        this.Precio = parseFloat(Precio);
    }
}

const productos = [];
productos.push(new Productos("01", "Torta", "../img/img tienda/torta-principal.jpg", "Tortas", "5760"));
productos.push(new Productos("02", "Tarta frutal", "../img/img tienda/tarta-frutal.jpg", "Tartas", "3000"));
productos.push(new Productos("03", "Rosca de pascua", "../img/img tienda/rosca-pascua.jpg", "Variedades", "1800"));
productos.push(new Productos("04", "Torta Marquise", "../img/img tienda/torta-marquise.jpg", "Tortas", "3250"));
productos.push(new Productos("05", "Cheesecake", "../img/img tienda/cheesecake.jpg", "Postres", "3500"));
productos.push(new Productos("06", "Lemon pie", "../img/img tienda/lemon-pie.jpg", "Tartas", "2000"));
productos.push(new Productos("07", "Pan dulce", "../img/img tienda/pan-dulce.jpg", "Variedades", "1500"));
productos.push(new Productos("08", "Muffins", "../img/img tienda/muffins-decorados.jpg", "Variedades", "4500"));
productos.push(new Productos("09", "Budin marmolado", "../img/img tienda/budin.jpg", "Variedades", "1250"));
productos.push(new Productos("010", "Cookies", "../img/img tienda/galletitas.jpg", "Variedades", "3500"));


//CONVIERTO EL ARRAY DE OBJETOS A JSON
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

guardarLocal("listaProductos", JSON.stringify(productos));


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");


// FUNCIÓN PARA CARGAR LOS PRODUCTOS Y MOSTRARLOS EN HTML
function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `

            <div class="producto-card" style="width: 18rem;">
               <img class="producto-imagen" src="${producto.Imagen}" alt="${producto.Nombre}">
                 <div class="card-body">
                      <h5 class="card-title">${producto.Nombre}</h5>
                      <p class="card-text">$${producto.Precio.toFixed(2)}</p>
                      <button class="producto-agregar" id="${producto.Id}">Agregar</button> 
            </div>              
        `;

        contenedorProductos.append(div);

    })
    actualizarBotonesAgregar();
}

cargarProductos(productos);

//FUNCIÓN PARA FILTRAR CATEGORIAS POR TIPO EN EL MENU
function filtrarProductosPorTipo(tipo) {
    const productosFiltrados = productos.filter(producto => producto.Tipo === tipo);
    cargarProductos(productosFiltrados);
}

// FUNCIÓN PARA LOS EVENTOS DE CLICK EN LOS BOTONES DE CATEGORIAS
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id !== "Todos") {
            const tipoSeleccionado = e.currentTarget.id;
            tituloPrincipal.innerText = `Productos de ${tipoSeleccionado}`;
            filtrarProductosPorTipo(tipoSeleccionado);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    });
});


//FUNCIÓN PARA ACTUALIZAR LOS BOTONES "AGREGAR"
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

//FUNCIÓN PARA AGREGAR PRODUCTOS AL CARRITO
let productosEnCarrito = [];

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.Id === idBoton);

    if (productosEnCarrito.some(producto => producto.Id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.Id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    //llamo a la funcion actualizar cada vez que se agregue un producto...
    actualizarCarritoEnModal();

    localStorage.setItem("carritolista", JSON.stringify(productosEnCarrito));
}


//FUNCIÓN PARA MOSTRAR EL CARRITO ACTUALIZADO EN EL MODAL
function actualizarCarritoEnModal() {
    const carritoLista = document.querySelector("#carritoLista");
    const totalPagarElement = document.querySelector("#totalPagar");

    carritoLista.innerHTML = "";

    //función para sumar los productos agregados y mostrarlos en el modal
    let total = 0;
    productosEnCarrito.forEach(producto => {
        const li = document.createElement("li");
        const subtotal = producto.Precio * producto.cantidad;
        total += subtotal;


        // Crear un botón para eliminar el producto 
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.setAttribute("Id", `eliminar_${producto.Id}`);
        botonEliminar.classList.add("producto-eliminar");


        li.textContent = `${producto.Nombre} x${producto.cantidad}- $${subtotal.toFixed(2)}`;
        li.appendChild(botonEliminar);
        carritoLista.appendChild(li);
    });

    totalPagarElement.textContent = `Total a pagar: $${total.toFixed(2)}`;

    actualizarBotonesEliminar();

}

//FUNCIÓN PARA ACTUALIZAR CUANDO SE ELIMINAN PRODUCTOS DEL CARRITO
function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", function () {
            // Obtener el ID del producto desde el atributo "Id" del botón
            const idProducto = boton.getAttribute("Id").split("_")[1];

            // Buscar el producto en el carrito y eliminarlo
            const productoAEliminar = productosEnCarrito.find(producto => producto.Id === idProducto);


            //Si el producto tiene mas de una unidad, resta la cantidad; si tiene una sola, lo elimina del carrito
            if (productoAEliminar) {
                if (productoAEliminar.cantidad > 1) {
                    productoAEliminar.cantidad--;
                } else {
                    const index = productosEnCarrito.indexOf(productoAEliminar);
                    productosEnCarrito.splice(index, 1);
                }

                //llamo a la funcion actualizar cada vez que se elimine un producto...
                actualizarCarritoEnModal();

                localStorage.setItem("carritolista", JSON.stringify(productosEnCarrito));
            }
        });
    });
}

