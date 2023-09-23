
//FUNCIÓN PARA ENVIAR EL FORMULARIO
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apellido = document.getElementById("apellido").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const consulta = document.getElementById("consulta").value.trim();

    const formularioValido = validarFormulario(apellido, nombre, email, telefono, consulta);

    //GUARDA LOS DOS DATOS DEL FORMULARIO EN EL LOCALSTORAGE
    const formData = {
        apellido,
        nombre,
        email,
        telefono,
        consulta
    };

    localStorage.setItem("formData", JSON.stringify(formData));

    if (formularioValido) {
        Swal.fire({
            title: 'Éxito',
            text: 'El formulario se envió correctamente.',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'contacto.html';
            }
        });
    }
});


//FUNCION PARA LIMPIAR EL FORMULARIO
limpiarBtn.addEventListener("click", () => {
    form.reset();
    localStorage.removeItem("formData");
});


// FUNCIÓN PARA RESTAURAR LOS DATOS AL ABRIR LA PÁGINA
window.addEventListener("load", () => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
        const formData = JSON.parse(storedData);
        document.getElementById("apellido").value = formData.apellido;
        document.getElementById("nombre").value = formData.nombre;
        document.getElementById("email").value = formData.email;
        document.getElementById("telefono").value = formData.telefono;
        document.getElementById("consulta").value = formData.consulta;
    }
});


//FUNCIÓN PARA VALIDAR LOS CAMPOS DEL FORMULARIO
function validarFormulario(apellido, nombre, email, telefono, consulta) {

    const apellidoInput = document.getElementById("apellido");
    const nombreInput = document.getElementById("nombre");

    const apellidoValido = validarApellido(apellido);
    const nombreValido = validarNombre(nombre);

    if (!apellidoValido) {
        mostrarMensajeDeError("El apellido debe tener al menos 4 caracteres.");
        apellidoInput.value = "";
        apellidoInput.focus();
        return false;
    }

    if (!nombreValido) {
        mostrarMensajeDeError("El nombre debe tener al menos 3 caracteres.");
        nombreInput.value = "";
        nombreInput.focus();
        return false;
    }

    if (email === "") {
        mostrarMensajeDeError("Por favor, ingrese su email.");
        document.getElementById("email").focus();
        return false;
    } else if (!validarEmail(email)) {
        mostrarMensajeDeError("Por favor, ingrese un email válido.");
        document.getElementById("email").focus();
        return false;
    }

    if (telefono === "") {
        mostrarMensajeDeError("Por favor, ingrese su número de teléfono.");
        document.getElementById("telefono").focus();
        return false;
    } else if (!validarTelefono(telefono)) {
        mostrarMensajeDeError("Por favor, ingrese un número de teléfono válido.");
        document.getElementById("telefono").focus();
        return false;
    }

    const consultaError = validarComentario(consulta, 10, 500);
    if (consultaError !== "") {
        mostrarMensajeDeError(consultaError);
        document.getElementById("consulta").focus();
        return false;
    }

    return true;
}


//FUNCIONES PARA VALIDAR NOMBRE Y APELLIDO
const validarApellido = (valor)  => {
    valor = valor.trim();
    if (valor.length < 4) {
        return false;
    }
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/;
    return regex.test(valor);
}

const validarNombre = (valor) => {
    valor = valor.trim();
    if (valor.length < 3) {
        return false;
    }
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/;
    return regex.test(valor);
}


//FUNCIÓN PARA VALIDAR EL EMAIL
const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


// FUNCIÓN PARA VALIDAR EL TELÉFONO
const validarTelefono = (telefono) => {
    const telefonoRegex = /^\d{10}$/;

    if (telefonoRegex.test(telefono)) {
        return true;
    } else {
        return false;
    }
}


//FUNCIÓN PARA VALIDAR EL COMENTARIO
const validarComentario = (comentario, minLength, maxLength) => {
    const valor = comentario.trim();

    if (valor.length < minLength) {
        return `El comentario debe tener al menos ${minLength} caracteres.`;
    }
    if (valor.length > maxLength) {
        return `El comentario no debe tener más de ${maxLength} caracteres.`;
    }

    return "";
}


//FUNCIÓN PARA MOSTRAR MENSAJES DE ERROR
const mostrarMensajeDeError = (mensaje) => {
    Swal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error',
    });
}