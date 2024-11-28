// Declaración de variables
let numeroAAdivinar = [];
let intentos = 0;
let A, B, C, D;

// Referencias a elementos del DOM
const contador = document.getElementById('contador');
const intentoInput = document.getElementById('intento');
const reiniciarButton = document.querySelector('.botonv1'); // Botón "Reiniciar"
const intentarButton = document.querySelector('.botonv2'); // Botón "Intentar"
const tablero = document.querySelector('.tablero1');

// Función para generar el número a adivinar
function generarNumeroAAdivinar() {
    const numeros = [];
    while (numeros.length < 4) {
        let num = Math.floor(Math.random() * 10);
        if (!numeros.includes(num)) {
            numeros.push(num);
        }
    }
    [A, B, C, D] = numeros;
    numeroAAdivinar = [A, B, C, D];
    console.log("Número a adivinar:", numeroAAdivinar); // Debug
}

// Función para verificar el intento
function verificarIntento(intento) {
    const resultado = [];
    const intentosNumeros = intento.split('').map(Number); // Convertir a números

    for (let i = 0; i < 4; i++) {
        if (intentosNumeros[i] === numeroAAdivinar[i]) {
            resultado.push('true'); // Correcto y posición correcta
        } else if (numeroAAdivinar.includes(intentosNumeros[i])) {
            resultado.push('false'); // Correcto, posición incorrecta
        } else {
            resultado.push('null'); // Incorrecto
        }
    }

    // Actualizar el tablero
    for (let i = 0; i < 4; i++) {
        const div = document.getElementById(1 + i + intentos * 4); // ID dinámico
        if (div) {
            div.textContent = intentosNumeros[i];
            div.dataset.state = resultado[i];

            // Cambiar color según estado
            if (resultado[i] === 'true') {
                div.style.backgroundColor = 'springgreen';
            } else if (resultado[i] === 'false') {
                div.style.backgroundColor = '#F7FF3C';
            } else {
                div.style.backgroundColor = '';
            }
        }
    }
}

// Procesar el intento
function intentar() {
    const intento = intentoInput.value;

    // Validar entrada
    if (intento.length !== 4 || isNaN(intento)) {
        alert('Por favor, ingresa 4 dígitos únicos.');
        return;
    }

    intentos++;
    contador.textContent = intentos; // Actualizar contador

    verificarIntento(intento); // Verificar intento
    intentoInput.value = ''; // Limpiar entrada
}

// Reiniciar el juego sin recargar la página
function reiniciarJuego() {
    intentos = 0;
    contador.textContent = '0';
    intentoInput.value = '';
    document.querySelectorAll('.tablero1 div').forEach(div => {
        div.textContent = '';
        div.style.backgroundColor = '';
        delete div.dataset.state;
    });
    generarNumeroAAdivinar(); // Nuevo número a adivinar
}

// Listeners
intentarButton.addEventListener('click', intentar);
intentoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        intentar();
        event.preventDefault(); // Evitar salto de línea
    }
});
reiniciarButton.addEventListener('click', reiniciarJuego);

// Inicializar juego
generarNumeroAAdivinar();
