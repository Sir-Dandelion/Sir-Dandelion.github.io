// Declaración de variables globales
let numeroAAdivinar = []; // Número aleatorio a adivinar (array de 4 dígitos)
let intentos = 0; // Contador de intentos

// Selección de elementos del DOM
const contador = document.getElementById('contador'); // Elemento para mostrar el número de intentos
const intentoInput = document.getElementById('intento'); // Campo de entrada para el intento del usuario
const intentarButton = document.querySelector('.botonv2.segundo'); // Botón "Intentar"
const resetButton = document.querySelector('.botonv1.accion2'); // Botón "Reiniciar"

// Función para generar el número aleatorio a adivinar (4 dígitos únicos)
function generarNumeroAAdivinar() {
    const numeros = []; // Array para almacenar los números únicos generados
    while (numeros.length < 4) {
        let num = Math.floor(Math.random() * 10); // Generar un número aleatorio entre 0 y 9
        if (!numeros.includes(num)) { // Verificar que el número no se repita
            numeros.push(num); // Agregar el número al array
        }
    }
    numeroAAdivinar = [...numeros]; // Asignar el número a adivinar
    console.log(`Número generado: ${numeroAAdivinar}`); // Debugging: Ver el número generado
}

// Función para verificar el intento del jugador
function verificarIntento(intento) {
    let picas = 0, fijas = 0; // Variables para contar las picas y las fijas
    const intentosNumeros = intento.split('').map(Number); // Convertir el intento a un array de números

    // Determinar las casillas correspondientes para este intento
    const idsInicio = intentos * 4 + 1; // Primer ID dinámico para este intento

    // Comparar el intento con el número a adivinar
    for (let i = 0; i < 4; i++) {
        const div = document.getElementById(idsInicio + i); // Seleccionar la casilla correspondiente
        div.textContent = intentosNumeros[i]; // Mostrar el número en la casilla

        // Contar las picas y fijas
        if (intentosNumeros[i] === numeroAAdivinar[i]) {
            fijas++; // Acierto exacto en la posición
        } else if (numeroAAdivinar.includes(intentosNumeros[i])) {
            picas++; // Número correcto, pero en una posición incorrecta
        }
    }

    // Actualizar el contador de Picas y Fijas en el DOM
    document.getElementById(`p${intentos + 1}`).textContent = picas; // Mostrar picas
    document.getElementById(`f${intentos + 1}`).textContent = fijas; // Mostrar fijas

    // Verificar si el jugador ha adivinado el número
    if (fijas === 4) {
        alert('¡Felicidades! Has adivinado el número.'); // Mensaje de victoria
    }
}

// Función para manejar el intento del jugador
function intentar() {
    const intento = intentoInput.value; // Obtener el valor del intento

    // Validar la entrada: debe ser un número de 4 dígitos únicos
    const intentoSet = new Set(intento.split(''));
    if (intento.length !== 4 || isNaN(intento) || intentoSet.size !== 4) {
        alert('Por favor, ingresa 4 dígitos únicos.'); // Mensaje de error
        return; // Detener ejecución si la entrada no es válida
    }

    intentos++; // Incrementar el contador de intentos
    contador.textContent = intentos; // Actualizar el contador en el DOM
    verificarIntento(intento); // Verificar el intento
    intentoInput.value = ''; // Limpiar el campo de entrada
}

// Reiniciar el juego sin recargar la página
resetButton.addEventListener('click', () => {
    intentos = 0; // Reiniciar el contador de intentos
    contador.textContent = '0'; // Actualizar el contador en el DOM
    document.querySelectorAll('.espacio.dos').forEach(div => div.textContent = ''); // Limpiar los números ingresados
    document.querySelectorAll('.espacioP, .espacioF').forEach(div => div.textContent = ''); // Limpiar picas y fijas
    generarNumeroAAdivinar(); // Generar un nuevo número a adivinar
});

// Escuchar eventos de los botones
intentarButton.addEventListener('click', intentar); // Ejecutar intento cuando se hace clic en "Intentar"
intentoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        intentar(); // Ejecutar intento al presionar "Enter"
        event.preventDefault(); // Evitar salto de línea
    }
});

// Inicializar el juego generando un número aleatorio al cargar la página
generarNumeroAAdivinar();


// Funciones para manejar el modal y el cambio de tema
function openModal() {
    document.getElementById("modal").style.display = "block"; // Mostrar el modal
}

function closeModal() {
    document.getElementById("modal").style.display = "none"; // Cerrar el modal
}