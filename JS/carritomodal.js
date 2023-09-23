
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

    localStorage.setItem("carritolista", JSON.stringify(productosEnCarrito));

    actualizarCarritoEnModal();
    actualizarbotoncarrito();
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
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;


        // Crear botón para eliminar el producto 
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.setAttribute("Id", `eliminar_${producto.Id}`);
        botonEliminar.classList.add("producto-eliminar");


        li.textContent = `${producto.nombre} x${producto.cantidad}- $${subtotal.toFixed(2)}`;
        li.appendChild(botonEliminar);
        carritoLista.appendChild(li);
    });

    totalPagarElement.textContent = `Total a pagar: $${total.toFixed(2)}`;

    actualizarBotonesEliminar();
    actualizarBotonesAgregar();

}

//FUNCIÓN PARA ACTUALIZAR CUANDO SE ELIMINAN PRODUCTOS DEL CARRITO
function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", function () {
            const idProducto = boton.getAttribute("Id").split("_")[1];

            const productoAEliminar = productosEnCarrito.find(producto => producto.Id === idProducto);

            if (productoAEliminar) {
                if (productoAEliminar.cantidad > 1) {
                    productoAEliminar.cantidad--;
                } else {
                    const index = productosEnCarrito.indexOf(productoAEliminar);
                    productosEnCarrito.splice(index, 1);
                }

                actualizarCarritoEnModal();
                actualizarbotoncarrito();

                localStorage.setItem("carritolista", JSON.stringify(productosEnCarrito));
            }
        });
    });
}


//FUNCIÓN PARA VER LA CANTIDAD DE PRODUCTOS EN EL BOTÓN DEL CARRITO
function actualizarbotoncarrito() {
    const contador = productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);

    cartBtn.textContent = `Ver Carrito (${contador})`;

    cartBtn.addEventListener("click", () => {
        if (productosEnCarrito.length === 0) {
            Swal.fire({
                title: 'Carrito de compras vacío',
                text: 'Tu carrito de compras está vacío. Agrega productos antes de continuar.',
                icon: 'info',
                confirmButtonText: 'Continuar'
            });
        }
    });
}

actualizarbotoncarrito();

//FUNCIÓN PARA FINALIZAR LA COMPRA
finalizarcompraBtn.addEventListener("click", () => {
    if (productosEnCarrito.length === 0) {
        Swal.fire({
            title: 'Carrito de compras vacío',
            text: 'Tu carrito de compras está vacío. Agrega productos antes de continuar.',
            icon: 'info',
            confirmButtonText: 'Continuar'
        });
    } else {
        localStorage.removeItem("carritolista");
        productosEnCarrito = [];
        actualizarCarritoEnModal();
        actualizarbotoncarrito();

        Swal.fire({
            title: '¡Compra exitosa!',
            text: 'Tu compra se ha realizado con éxito. Muchas gracias.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        cartBtn.textContent = `Ver Carrito (0)`;
    }
});







