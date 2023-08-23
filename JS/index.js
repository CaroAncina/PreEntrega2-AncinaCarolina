
class Productos {
    constructor(Nombre, Tipo, Descripcion, Precio) {
        this.Nombre = Nombre;
        this.Tipo = Tipo;
        this.Descripcion = Descripcion;
        this.Precio = parseFloat(Precio);
    }

    //Funcion para aumentar los precios un 10% a partir del 01/09/2023
    aumentoPorFecha() {
        const fechaReferencia = new Date('2023-09-01');
        const fechaActual = new Date();

        // Verificar si la fecha actual es posterior a la fecha de referencia
        if (fechaActual >= fechaReferencia) {
            const porcentaje = 1.1;
            this.Precio = this.Precio * porcentaje;
        }
    }
}

//Productos para la tienda dentro del array
const productos = [];
productos.push(new Productos("Torta de ricota", "Torta", "Con dulce de leche", 2000));
productos.push(new Productos("Torta de manzana", "Torta", "descripcion", 1500));
productos.push(new Productos("Tarta de manzana", "Tarta", "descripcion", 3000));
productos.push(new Productos("Chocotorta", "Postre", "descripcion", 5000));
productos.push(new Productos("Pastafrola", "Tarta", "descripcion", 1500));


//Funcion para que el usuario elija la opcion a mostrar
function Compra() {
    let opcion;
    let continuar = true;

    while (continuar) {
        opcion = parseInt(prompt("Ingrese una opción:\n" + Menu));

        switch (opcion) {
            case 1:
                mostrarProductos();
                break;
            case 2:
                alert("Total de la compra: $" + calcularPrecioTotal());
                break;
            case 3:
                alert("Nuestros productos mas baratos:" + mostrarProductosMasBaratos());
                break;
            case 4:
                alert(mostrarProductosModificados());
            case 5:
                alert("Compra finalizada. Gracias por su compra!");
                continuar = false;
                break;
            default:
                alert("Opción inválida. Por favor, vuelva a seleccionar una opción.");
                break;
        }
    }
}


// Función para mostrar los productos del array
function mostrarProductos() {
    let mensaje = "Productos disponibles:\n";

    productos.forEach((producto) => {
        mensaje += `Nombre: ${producto.Nombre}\n`;
        mensaje += `Tipo: ${producto.Tipo}\n`;
        mensaje += `Descripción: ${producto.Descripcion}\n`;
        mensaje += `Precio: $${producto.Precio}\n`;
        mensaje += "----------------------\n";
    });

    alert(mensaje);
}

//Funcion para calcular el precio total de los productos del array
function calcularPrecioTotal() {
    let precioTotal = 0;

    productos.forEach((producto) => {
        precioTotal += producto.Precio;
    });

    return precioTotal;
}

//Funcion para filtrar los productos mas baratos
function mostrarProductosMasBaratos() {
    const masbaratos = productos.filter(producto => producto.Precio < 2000)
    let mensaje = "Productos más baratos:\n";

    masbaratos.forEach((producto) => {
        mensaje += `Nombre: ${producto.Nombre}\n`;
        mensaje += `Tipo: ${producto.Tipo}\n`;
        mensaje += `Descripción: ${producto.Descripcion}\n`;
        mensaje += `Precio: $${producto.Precio}\n`;
        mensaje += "----------------------\n";
    });

    alert(mensaje);
}

//Funcion para modificar los precios del array despues del 01/09/2023
productos.forEach((producto) => {
    producto.aumentoPorFecha();
});

const mostrarProductosModificados = () => {
    let mensaje = "Productos con precios modificados:\n";

    productos.forEach((producto) => {
        producto.aumentoPorFecha(); // Aplicar aumento a los precios si corresponde
        mensaje += `Nombre: ${producto.Nombre}\n`;
        mensaje += `Precio: $${producto.Precio}\n`;
        mensaje += "----------------------\n";
    });

    alert(mensaje);
};

//Funcion para validar nombre y apellido
function validarNombreApellido(nombre, apellido) {
    const longitudMinima = 2; 

    if (nombre.length >= longitudMinima && apellido.length >= longitudMinima) {
        return true; 
    } else {
        return false; 
    }
}


let Menu = "1. Mostrar productos en el carrito\n" +
    "2. Calcular total de la compra\n" +
    "3. Buscar los productos mas baratos de la tienda\n" +
    "4. Actualizacion de precios a partir del 01/09/2023\n" +
    "5. Finalizar compra";

alert("Menu carrito de compras:\n" + Menu);

let nombre = prompt("Ingrese su nombre:");
let apellido = prompt("Ingrese su apellido:");

if (validarNombreApellido(nombre, apellido)) {
    alert("Nombre y apellido válidos.");
} else {
    alert("Nombre y/o apellido no cumplen con la longitud mínima requerida.");
}


alert("Bienvenido/a, esta por hacer un pedido a nuestra tienda");

Compra();