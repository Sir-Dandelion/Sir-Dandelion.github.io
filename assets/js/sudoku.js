const gridContainer = document.getElementById('grid-container');

function createGrid() {
    for (let i = 1; i <= 81; i++) {
        const cell = document.createElement('div');
        cell.classList.add('espacioS');
        cell.id = `cell-${i}`;
        cell.setAttribute('contenteditable', 'true');
        // Aquí podrías añadir un listener para validar solo números
        cell.addEventListener('input', (e) => validateInput(e));
        gridContainer.appendChild(cell);
    }
}

function validateInput(e) {
    const val = e.target.innerText;
    if (!/^[1-9]$/.test(val)) {
        e.target.innerText = ""; // Limpia si no es número del 1-9
    }
}

createGrid();