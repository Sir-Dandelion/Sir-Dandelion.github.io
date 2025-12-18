// =========================================================
// I. Declaración de Variables y Referencias al DOM
// =========================================================

// Declaración de variables
let numeroAAdivinar = [];
let intentos = 0;
let A, B, C, D;

// Referencias a elementos del DOM
const contador = document.getElementById('contador');
const intentoInput = document.getElementById('intento');
const reiniciarButton = document.querySelector('.botonv1');
const intentarButton = document.querySelector('.botonv2');
const tablero = document.querySelector('.tablero1');


// =========================================================
// II. Funciones de Lógica del Juego (Core)
// =========================================================

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
    console.log("Número a adivinar:", numeroAAdivinar);
}

// Función para verificar el intento (CORREGIDA PARA CASILLAS FIJAS 5, 6, 7, 8)
function verificarIntento(intento) {
    const resultado = [];
    const intentosNumeros = intento.split('').map(Number);

    // 1. Determinar el resultado (Lógica PICAS Y FIJAS)
    for (let i = 0; i < 4; i++) {
        if (intentosNumeros[i] === numeroAAdivinar[i]) {
            resultado.push('true'); // FIJA (Verde)
        } else if (numeroAAdivinar.includes(intentosNumeros[i])) {
            resultado.push('false'); // PICA (Amarillo)
        } else {
            resultado.push('null'); // Incorrecto (Sin color)
        }
    }

    // 2. Actualizar las 4 casillas fijas del tablero (IDs 5, 6, 7, 8)
    for (let i = 0; i < 4; i++) {
        // La casilla 1 del intento se mapea al ID 5, la casilla 2 al ID 6, etc.
        // Usamos el ID del HTML: (i + 5)
        const div = document.getElementById(5 + i); 
        
        if (div) {
            // Mostrar el número ingresado
            div.textContent = intentosNumeros[i];
            div.dataset.state = resultado[i];

            // Cambiar color según estado
            if (resultado[i] === 'true') {
                // Verde: Correcto y en posición correcta (FIJA)
                div.style.backgroundColor = 'springgreen'; 
            } else if (resultado[i] === 'false') {
                // Amarillo: Correcto pero posición incorrecta (PICA)
                div.style.backgroundColor = '#F7FF3C'; 
            } else {
                // Ninguno: Número incorrecto
                div.style.backgroundColor = ''; 
            }
        }
    }
    
    // Devolvemos el resultado para que la función intentar sepa si hubo victoria
    return resultado; 
}


// =========================================================
// III. Funciones de Control del Juego y UI
// =========================================================

// Función para actualizar el color de los corazones
function actualizarCorazones() {
    // Lee el número actual de intentos (vidas perdidas)
    const intentosPerdidos = parseInt(contador.textContent);
    
    // Itera sobre los 5 corazones
    for (let i = 1; i <= 5; i++) {
        // Selecciona dinámicamente el corazón (cor1, cor2, cor3, etc.)
        const corazon = document.querySelector(`.cor${i}`);
        
        if (corazon) {
            // Si el número de intentos perdidos es MAYOR o IGUAL al índice del corazón
            if (intentosPerdidos >= i) {
                corazon.classList.add('lost');
            } else {
                // Si aún no se ha perdido, nos aseguramos de que esté activo.
                corazon.classList.remove('lost');
            }
        }
    }
}

// NUEVA FUNCIÓN: Muestra el modal de Derrota o Victoria
function mostrarResultado(estado) {
    if (estado === 'VICTORIA') {
        const numeroAdivinadoStr = numeroAAdivinar.join('');
        // Asegúrate de que tu HTML tenga un elemento con id="numero-ganador"
        document.getElementById('numero-ganador').textContent = `Adivinaste que el número era: ${numeroAdivinadoStr}`;
        document.getElementById("modal-victoria").style.display = "block";
    } else if (estado === 'DERROTA') {
        document.getElementById("modal-derrota").style.display = "block";
    }
}

// Nueva función unificada para cerrar cualquier modal y reiniciar el juego
function reiniciarYCerrarModal() {
    document.getElementById("modal-derrota").style.display = "none";
    document.getElementById("modal-victoria").style.display = "none";
    reiniciarJuego();
}

// Procesar el intento (ACTUALIZADA)
function intentar() {
    const intento = intentoInput.value;

    // 1. Validar entrada y verificar si ya no quedan intentos
    if (intento.length !== 4 || isNaN(intento)) {
        alert('Por favor, ingresa 4 dígitos.');
        return;
    }
    
    // Si ya usó los 5 intentos, mostramos la derrota (aunque esto debería ser capturado al final)
    if (intentos >= 5) {
         mostrarResultado('DERROTA'); 
         return;
    }

    intentos++;
    contador.textContent = intentos;

    const resultado = verificarIntento(intento); // Ahora capturamos el resultado
    
    // 2. VERIFICACIÓN DE VICTORIA
    const esVictoria = resultado.every(r => r === 'true'); // ¿Son todos 'true'?
    
    if (esVictoria) {
        mostrarResultado('VICTORIA');
        intentoInput.value = ''; // Limpiar entrada
        return; // Terminar la función si ganamos
    }

    // 3. Actualizar la interfaz de corazones
    actualizarCorazones(); 

    // 4. VERIFICACIÓN DE DERROTA (Si este fue el quinto y no ganamos)
    if (intentos === 5) {
        mostrarResultado('DERROTA');
    }

    intentoInput.value = '';
}

// Reiniciar el juego sin recargar la página (MODIFICADA PARA LIMPIAR CASILLAS 5, 6, 7, 8)
function reiniciarJuego() {
    intentos = 0;
    contador.textContent = '0';
    intentoInput.value = '';
    
    // Limpiar el tablero actual (Casillas 5, 6, 7, 8)
    for(let i = 5; i <= 8; i++) {
        const div = document.getElementById(i);
        if (div) {
            div.textContent = '';
            div.style.backgroundColor = '';
            delete div.dataset.state;
        }
    }
    
    // La línea que limpiaba '.tablero1 div' se deja por si el HTML lo necesita, 
    // pero la limpieza por ID es más segura:
    // document.querySelectorAll('.tablero1 div').forEach(...);

    generarNumeroAAdivinar();
    
    // Asegurar que todos los corazones vuelvan a estar rojos
    actualizarCorazones(); 
}


// =========================================================
// IV. Funciones de Utilidad (Modal/Toogle)
// =========================================================

function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}


// =========================================================
// V. Event Listeners
// =========================================================

intentarButton.addEventListener('click', intentar);
intentoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        intentar();
        event.preventDefault();
    }
});
// Eliminamos el listener directo a reiniciarJuego, ahora usamos reiniciarYCerrarModal()
// pero mantenemos el listener del botón Reiniciar en caso de que se use directamente.
reiniciarButton.addEventListener('click', reiniciarJuego);


// =========================================================
// VI. Inicialización del Juego
// =========================================================

generarNumeroAAdivinar();
// Inicializar el estado de los corazones al cargar la página
actualizarCorazones();