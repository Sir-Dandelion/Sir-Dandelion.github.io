// Declaración de variables globales
let numeroAAdivinar = []; // Número aleatorio a adivinar (array de 4 dígitos)
let intentos = 0; // Contador de intentos
let A, B, C, D; // Variables para almacenar los dígitos generados aleatoriamente

// Referencias a elementos del DOM
const contador = document.getElementById('contador'); // Elemento para mostrar el número de intentos
const intentoInput = document.getElementById('intento'); // Campo de entrada para el intento del usuario
const reiniciarButton = document.querySelector('.botonv1'); // Botón para reiniciar el juego
const intentarButton = document.querySelector('.botonv2'); // Botón para realizar un intento
const tablero = document.querySelector('.tablero1'); // Contenedor de las casillas del tablero

// Función para generar el número aleatorio a adivinar (4 dígitos únicos)
function generarNumeroAAdivinar() {
    const numeros = []; // Array para almacenar los números únicos generados
    while (numeros.length < 4) {
        let num = Math.floor(Math.random() * 10); // Generar un número aleatorio entre 0 y 9
        if (!numeros.includes(num)) { // Verificar que el número no se repita
            numeros.push(num); // Agregar el número al array
        }
    }
    // Desestructuración para asignar los valores a A, B, C, D
    [A, B, C, D] = numeros;
    numeroAAdivinar = [A, B, C, D]; // Asignar el número a adivinar
    console.log("Número a adivinar:", numeroAAdivinar); // Debugging: Ver el número generado
}

// Función para verificar el intento del jugador
function verificarIntento(intento) {
    const resultado = []; // Array para almacenar el resultado de cada número del intento
    const intentosNumeros = intento.split('').map(Number); // Convertir el intento a un array de números

    // Comparar cada dígito del intento con el número a adivinar
    for (let i = 0; i < 4; i++) {
        if (intentosNumeros[i] === numeroAAdivinar[i]) {
            resultado.push('true'); // Correcto y posición correcta
        } else if (numeroAAdivinar.includes(intentosNumeros[i])) {
            resultado.push('false'); // Correcto, pero posición incorrecta
        } else {
            resultado.push('null'); // Incorrecto
        }
    }

    // Actualizar el tablero con el resultado del intento
    for (let i = 0; i < 4; i++) {
        const div = document.getElementById(1 + i + intentos * 4); // ID dinámico de la casilla
        if (div) {
            div.textContent = intentosNumeros[i]; // Mostrar el número en la casilla
            div.dataset.state = resultado[i]; // Asignar el estado al dataset de la casilla

            // Cambiar el color de fondo de la casilla según el resultado
            if (resultado[i] === 'true') {
                div.style.backgroundColor = 'springgreen'; // Color verde para aciertos exactos
            } else if (resultado[i] === 'false') {
                div.style.backgroundColor = '#F7FF3C'; // Color amarillo para aciertos parciales
            } else {
                div.style.backgroundColor = ''; // Color por defecto para errores
            }
        }
    }
}

// Función que procesa un intento cuando se presiona el botón "Intentar"
function intentar() {
    const intento = intentoInput.value; // Obtener el valor del intento

    // Validar que el intento sea un número de 4 dígitos
    if (intento.length !== 4 || isNaN(intento)) {
        alert('Por favor, ingresa 4 dígitos únicos.');
        return; // Detener la ejecución si la entrada es incorrecta
    }

    intentos++; // Incrementar el contador de intentos
    contador.textContent = intentos; // Actualizar el contador de intentos en el DOM

    verificarIntento(intento); // Verificar el intento en función del número a adivinar
    intentoInput.value = ''; // Limpiar el campo de entrada para el próximo intento
}

// Función para reiniciar el juego sin recargar la página
function reiniciarJuego() {
    intentos = 0; // Reiniciar el contador de intentos
    contador.textContent = '0'; // Actualizar el contador en el DOM
    intentoInput.value = ''; // Limpiar el campo de entrada
    document.querySelectorAll('.tablero1 div').forEach(div => {
        div.textContent = ''; // Limpiar el contenido de las casillas del tablero
        div.style.backgroundColor = ''; // Restaurar el color de fondo
        delete div.dataset.state; // Eliminar el estado del dataset
    });
    generarNumeroAAdivinar(); // Generar un nuevo número a adivinar
}

// Event listeners para los botones
intentarButton.addEventListener('click', intentar); // Escuchar el click en "Intentar"
intentoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        intentar(); // Ejecutar el intento al presionar "Enter"
        event.preventDefault(); // Evitar el salto de línea
    }
});
reiniciarButton.addEventListener('click', reiniciarJuego); // Escuchar el click en "Reiniciar"

// Inicialización del juego
generarNumeroAAdivinar(); // Generar el número a adivinar al cargar la página


// Funciones para manejar el modal y el cambio de tema
function openModal() {
    document.getElementById("modal").style.display = "block"; // Mostrar el modal
}

function closeModal() {
    document.getElementById("modal").style.display = "none"; // Cerrar el modal
}

// Función para alternar el modo oscuro
function myFunction() {
    document.body.classList.toggle("dark-mode"); // Alternar la clase "dark-mode" para cambiar el tema
}