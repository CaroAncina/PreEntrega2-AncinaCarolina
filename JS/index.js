
let productos = [];

//CARGA ARRAY DE PRODUCTOS DESDE ARCHIVO JSON
const cargarProductos = async () => {
    try {
        const res = await fetch('../Json/productos.json');
        const data = await res.json();

        productos = data;
        mostrarProductos(productos);

    } catch (error) {
        console.log(error);
    }
}

// FUNCIÓN PARA CARGAR LOS PRODUCTOS Y MOSTRARLOS EN HTML
const mostrarProductos = (productosElegidos) => {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `

            <div class="producto-card" style="width: 18rem;">
               <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
                 <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>
                      <p class="card-text">$${producto.precio.toFixed(2)}</p>
                       <button class="producto-agregar" id="${producto.Id}">Agregar</button> 
            </div>              
        `;
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

    cargarProductos();

//FUNCIÓN PARA FILTRAR CATEGORIAS POR TIPO EN EL MENU
function filtrarProductosPorTipo(tipo) {
    const productosFiltrados = productos.filter(producto => producto.tipo === tipo);
    mostrarProductos(productosFiltrados);
}

// FUNCIÓN PARA LOS EVENTOS DE CLICK EN LOS BOTONES DE CATEGORIAS
document.addEventListener("DOMContentLoaded", () => {
    const botonesCategorias = document.querySelectorAll(".boton-categoria");

    botonesCategorias.forEach(boton => {
        boton.addEventListener("click", (e) => {
            botonesCategorias.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");

            const tipoSeleccionado = e.currentTarget.id;
            if (tipoSeleccionado !== "Todos") {
                tituloPrincipal.innerText = `Productos de ${tipoSeleccionado}`;
                filtrarProductosPorTipo(tipoSeleccionado);
            } else {
                tituloPrincipal.innerText = "Todos los productos";
                mostrarProductos(productos);
            }
        });
    });
});

//FUNCIÓN PARA ACTUALIZAR LOS BOTONES "AGREGAR"
function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        if (!boton.hasEventListener) {
            boton.hasEventListener = true;
            boton.addEventListener("click", (e) => {
                agregarAlCarrito(e);
                Swal.fire({
                    title: 'Genial!',
                    text: 'Haz agregado el producto al carrito!',
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                });
            });
        }
    });
}

