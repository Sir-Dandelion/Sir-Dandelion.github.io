let numeroAAdivinar = [];
let intentos = 0;

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
        if (!numeros.includes(num)) {numeros.push(num);}}
    [A, B, C, D] = numeros;
    numeroAAdivinar = [A, B, C, D];

function verificarIntento(intento) {
    let resultado = [];
    let intentosNumeros = intento.split('').map(Number);
    
    // cpmparar
    for (let i = 0; i < 4; i++) {
        if (intentosNumeros[i] === numeroAAdivinar[i]) {
            resultado.push('true');
        } else if (numeroAAdivinar.includes(intentosNumeros[i])) {
            resultado.push('false');
        } else {
            resultado.push('null');
        }
    }

    // pal cuadro
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

// para pendejos
function intentar() {
    const intento = intentoInput.value;
    if (intento.length !== 4 || isNaN(intento)) {
        alert('Hay algo que no es un numero');
        return;
    }

    intentos++;
    contador.textContent = intentos;  // contador

    verificarIntento(intento);

    // Limpiar 
    intentoInput.value = '';
}

// 
flipButton.addEventListener('click', intentar);

// para poder tocar enter
intentoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { 
        intentar();  
        event.preventDefault();  
    }
});

// pa los pendejos parte 2
resetButton.addEventListener('click', () => {
    location.reload();  
});

if (contador.textContent === '0') {
    generarNumeroAAdivinar();
}
