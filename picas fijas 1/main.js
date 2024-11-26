let numeroAAdivinar = [];
let intentos = 0;
let A, B, C, D; // Declaración explícita de las variables A, B, C, D

const contador = document.getElementById('contador');
const intentoInput = document.getElementById('intento');
const flipButton = document.getElementById('flip-button');
const resetButton = document.getElementById('reset-button');
const tablero = document.querySelector('.tablero');

// hacer el numero
function generarNumeroAAdivinar() {
    const numeros = [];
    while (numeros.length < 4) {
        let num = Math.floor(Math.random() * 10);  
        if (!numeros.includes(num)) {
            numeros.push(num);
        }
    }
    [A, B, C, D] = numeros; // Asignación de valores a A, B, C, D
    numeroAAdivinar = [A, B, C, D];  // Guardamos el número a adivinar
}

function verificarIntento(intento) {
    let resultado = [];
    let intentosNumeros = intento.split('').map(Number);
    
    // Comparar
    for (let i = 0; i < 4; i++) {
        if (intentosNumeros[i] === numeroAAdivinar[i]) {
            resultado.push('true');
        } else if (numeroAAdivinar.includes(intentosNumeros[i])) {
            resultado.push('false');
        } else {
            resultado.push('null');
        }
    }

    // Para el cuadro
    for (let i = 0; i < 4; i++) {
        const div = document.getElementById(i + 1 + intentos * 4);
        div.textContent = intentosNumeros[i];  
        div.dataset.state = resultado[i];      
        if (resultado[i] === 'true') {
            div.style.backgroundColor = 'green';
        } else if (resultado[i] === 'false') {
            div.style.backgroundColor = 'yellow';
        } else {
            div.style.backgroundColor = '';
        }
    }
}

// Para intentar adivinar
function intentar() {
    const intento = intentoInput.value;
    if (intento.length !== 4 || isNaN(intento)) {
        alert('Hay algo que no es un número');
        return;
    }

    intentos++;
    contador.textContent = intentos;  // Contador de intentos

    verificarIntento(intento);

    // Limpiar el campo de entrada
    intentoInput.value = '';
}

// Acción al hacer clic en "Intentar"
flipButton.addEventListener('click', intentar);

// Para poder tocar "Enter"
intentoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { 
        intentar();  
        event.preventDefault();  
    }
});

// Acción al hacer clic en "Rendirse"
resetButton.addEventListener('click', () => {
    location.reload();  
});

// Si es el primer intento, generar el número a adivinar
if (contador.textContent === '0') {
    generarNumeroAAdivinar();
}
