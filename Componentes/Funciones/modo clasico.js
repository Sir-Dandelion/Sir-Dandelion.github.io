let numeroAAdivinar = [];
let intentos = 0;

// Selección de elementos según el nuevo HTML
const contador = document.getElementById('contador');
const intentoInput = document.getElementById('intento');
const intentarButton = document.querySelector('.botonv2.segundo'); // Botón "Intentar"
const resetButton = document.querySelector('.botonv1.accion2'); // Botón "Reiniciar"

// Generar el número a adivinar
function generarNumeroAAdivinar() {
    const numeros = [];
    while (numeros.length < 4) {
        let num = Math.floor(Math.random() * 10); // Generar números del 0 al 9
        if (!numeros.includes(num)) { // Asegurarse de que no se repitan
            numeros.push(num);
        }
    }
    numeroAAdivinar = [...numeros];
    console.log(`Número generado: ${numeroAAdivinar}`); // Para depuración
}

// Verificar el intento del jugador
function verificarIntento(intento) {
    let picas = 0, fijas = 0;
    const intentosNumeros = intento.split('').map(Number);

    // Determinar las casillas correspondientes para este intento
    const idsInicio = intentos * 4 + 1; // Primer ID dinámico para este intento

    for (let i = 0; i < 4; i++) {
        const div = document.getElementById(idsInicio + i);
        div.textContent = intentosNumeros[i]; // Mostrar el número ingresado

        if (intentosNumeros[i] === numeroAAdivinar[i]) {
            fijas++;
        } else if (numeroAAdivinar.includes(intentosNumeros[i])) {
            picas++;
        }
    }

    // Actualizar Picas y Fijas
    document.getElementById(`p${intentos + 1}`).textContent = picas;
    document.getElementById(`f${intentos + 1}`).textContent = fijas;

    // Verificar victoria
    if (fijas === 4) {
        alert('¡Felicidades! Has adivinado el número.');
    }
}

// Manejar el intento del jugador
function intentar() {
    const intento = intentoInput.value;

    // Validar entrada
    const intentoSet = new Set(intento.split(''));
    if (intento.length !== 4 || isNaN(intento) || intentoSet.size !== 4) {
        alert('Por favor, ingresa 4 dígitos únicos.');
        return;
    }

    intentos++;
    contador.textContent = intentos; // Actualizar contador
    verificarIntento(intento); // Procesar intento
    intentoInput.value = ''; // Limpiar el área de texto
}

// Reiniciar el juego sin recargar la página
resetButton.addEventListener('click', () => {
    intentos = 0;
    contador.textContent = '0';
    document.querySelectorAll('.espacio.dos').forEach(div => div.textContent = '');
    document.querySelectorAll('.espacioP, .espacioF').forEach(div => div.textContent = '');
    generarNumeroAAdivinar();
});

// Escuchar eventos
intentarButton.addEventListener('click', intentar);
intentoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        intentar();
        event.preventDefault();
    }
});

// Generar el número al inicio
generarNumeroAAdivinar();
