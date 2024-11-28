let numeroAAdivinar = [];
let intentos = 0;
let A, B, C, D; // Declaración explícita de las variables A, B, C, D

const contador = document.getElementById('contador');
const intentoInput = document.getElementById('intento');
const reiniciarButton = document.querySelector('.botonv1'); // Botón "Reiniciar"
const intentarButton = document.querySelector('.botonv2'); // Botón "Intentar"
const tablero = document.querySelector('.tablero1');

// Generar el número a adivinar
function generarNumeroAAdivinar() {
    const numeros = [];
    while (numeros.length < 4) {
        let num = Math.floor(Math.random() * 10);
        if (!numeros.includes(num)) {
            numeros.push(num);
        }
    }
    [A, B, C, D] = numeros; // Asignación de valores a A, B, C, D
    numeroAAdivinar = [A, B, C, D]; // Guardamos el número a adivinar
    console.log("Número a adivinar:", numeroAAdivinar); // Ayuda para depuración
}

// Verificar el intento del jugador
function verificarIntento(intento) {
    let resultado = [];
    let intentosNumeros = intento.split('').map(Number); // Convertir la entrada en un array de números

    // Comparar cada número del intento con el número a adivinar
    for (let i = 0; i < 4; i++) {
        if (intentosNumeros[i] === numeroAAdivinar[i]) {
            resultado.push('true'); // Correcto y en la posición correcta
        } else if (numeroAAdivinar.includes(intentosNumeros[i])) {
            resultado.push('false'); // Correcto pero en la posición incorrecta
        } else {
            resultado.push('null'); // No está en el número a adivinar
        }
    }

    // Actualizar los cuadros en el tablero
    for (let i = 0; i < 4; i++) {
        const div = document.getElementById(1 + i + intentos * 4); // Ajustar el ID basado en el intento
        div.textContent = intentosNumeros[i]; // Mostrar el número ingresado
        div.dataset.state = resultado[i]; // Actualizar el atributo "data-state"

        // Cambiar el color de fondo según el estado
        if (resultado[i] === 'true') {
            div.style.backgroundColor = 'springgreen';
        } else if (resultado[i] === 'false') {
            div.style.backgroundColor = '#F7FF3C';
        } else {
            div.style.backgroundColor = '';
        }
    }
}

// Procesar el intento del jugador
function intentar() {
    const intento = intentoInput.value;

    // Validar entrada
    if (intento.length !== 4 || isNaN(intento)) {
        alert('Por favor, ingresa 4 dígitos únicos.');
        return;
    }

    intentos++;
    contador.textContent = intentos; // Actualizar el contador de intentos

    verificarIntento(intento); // Verificar el intento

    // Limpiar el campo de entrada
    intentoInput.value = '';
}

// Acción al hacer clic en "Intentar"
intentarButton.addEventListener('click', intentar);

// Permitir presionar "Enter" para intentar
intentoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        intentar();
        event.preventDefault(); // Evitar el salto de línea
    }
});

// Acción al hacer clic en "Reiniciar"
reiniciarButton.addEventListener('click', () => {
    location.reload(); // Recargar la página para reiniciar el juego
});

// Generar el número a adivinar si es el primer intento
if (contador.textContent === '0') {
    generarNumeroAAdivinar();
}
