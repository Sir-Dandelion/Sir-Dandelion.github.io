let numeroAAdivinar = [];
let intentos = 0;

const contador = document.getElementById('contador');
const intentoInput = document.getElementById('intento');
const flipButton = document.getElementById('flip-button');
const resetButton = document.getElementById('reset-button');

// Generar el número a adivinar
function generarNumeroAAdivinar() {
    const numeros = [];
    while (numeros.length < 4) {
        let num = Math.floor(Math.random() * 10); // Generar números del 0 al 9
        if (!numeros.includes(num)) { // Asegurarse de que no se repitan
            numeros.push(num);
        }
    }
    [A, B, C, D] = numeros; // Desestructurar en A, B, C, D
    numeroAAdivinar = [A, B, C, D];
}

// Verificar el intento del jugador
function verificarIntento(intento) {
    let picas = 0; // En la secuencia pero no en la posición correcta
    let fijas = 0; // En la secuencia y en la posición correcta

    const intentosNumeros = intento.split('').map(Number); // Convertir a números
    const idsInicio = intentos * 4 + 1; // Calcular IDs iniciales para este intento

    for (let i = 0; i < 4; i++) {
        const div = document.getElementById(idsInicio + i); // Div correspondiente
        div.textContent = intentosNumeros[i]; // Mostrar el número ingresado

        if (intentosNumeros[i] === numeroAAdivinar[i]) {
            fijas++; // Correcto y en posición
        } else if (numeroAAdivinar.includes(intentosNumeros[i])) {
            picas++; // Correcto pero en posición incorrecta
        }
    }

    // Actualizar los valores de Picas y Fijas en los espacios correspondientes
    document.getElementById(`p${intentos + 1}`).textContent = picas;
    document.getElementById(`f${intentos + 1}`).textContent = fijas;
}

// Manejar el intento del jugador
function intentar() {
    const intento = intentoInput.value;

    // Validar entrada
    if (intento.length !== 4 || isNaN(intento)) {
        alert('Por favor, ingresa 4 dígitos únicos.');
        return;
    }

    intentos++;
    contador.textContent = intentos; // Actualizar el contador
    verificarIntento(intento); // Procesar el intento

    intentoInput.value = ''; // Limpiar el área de texto
}

// Recargar la página al rendirse
resetButton.addEventListener('click', () => {
    location.reload();
});

// Escuchar el botón "Intentar"
flipButton.addEventListener('click', intentar);

// Escuchar el evento "Enter" en el campo de entrada
intentoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { 
        intentar(); // Llamar la función de intento
        event.preventDefault(); // Evitar que el Enter inserte un salto de línea
    }
});

// Generar el número a adivinar al inicio
if (contador.textContent === '0') {
    generarNumeroAAdivinar();
}
