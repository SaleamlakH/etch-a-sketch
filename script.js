function makeGrid(size) {
    let sketchArea = document.querySelector('.sketch-area');
    sketchArea.replaceChildren();
    
    let rowNumber = size;
    while (rowNumber > 0) {
        let row = document.createElement('div');
        row.classList.add('row');    
        
        let columnNumber = size;
        while (columnNumber > 0) {
            const column = document.createElement('div');
            
            column.classList.add('column');
            row.appendChild(column);
            columnNumber--;
        }
        row = roundGridCorners(row, rowNumber, size);
        sketchArea.appendChild(row);
        rowNumber--;
    }

    sketchArea.addEventListener('dblclick', setupEventListener);
}

function setupEventListener(event) {
    let sketchArea = event.currentTarget;
    let dblClicked = sketchArea.getAttribute('dblClicked');

    if (dblClicked === 'true') {
        sketchArea.setAttribute('dblClicked', 'false');
        sketchArea.removeEventListener('mouseover', sketch);
        return;
    }

    sketchArea.setAttribute('dblClicked','true');
    sketchArea.addEventListener('mouseover', sketch);
    sketch(event);   // change the color for the target/starting square div
}

function sketch(event) {
    const target = event.target;
    const sketchColor = getSelectedColor();

    target.style.backgroundColor = sketchColor;
}

function roundGridCorners(row, rowNumber, size) {
    if (rowNumber === size) {
        row.firstChild.classList.add('round-top-left');
        row.lastChild.classList.add('round-top-right');
    } else if (rowNumber === 1) {
        row.firstChild.classList.add('round-bottom-left');
        row.lastChild.classList.add('round-bottom-right');
    }

    return row;
}

makeGrid(16); //draw default grid width default size

const gridSizeBtn = document.querySelector('.grid-size');
gridSizeBtn.addEventListener('click', changeGridSize);

function changeGridSize() {
    let span = document.querySelector('.size-control > span')
    let gridSize = parseInt(gridSizeBtn.textContent);

    gridSize = parseInt(prompt('Set Grid Size: max 100', gridSize));
    if (gridSize == null || Number.isNaN(gridSize)) return; //canceled or invalid input 
    if (gridSize < 0 || gridSize > 100) return;  //negative number or beyond max limit - 100

    gridSizeBtn.textContent = gridSize;
    span.textContent = `size\n${gridSize}x${gridSize}`;
    makeGrid(gridSize);
}

function setSelectedColor() {
    const selectedColorDisplay = document.querySelector('.selected-color');
    const selectedColor = getSelectedColor()

    selectedColorDisplay.style.backgroundColor = selectedColor;
}

function getSelectedColor() {
    const addedColors = Array.from(document.querySelectorAll('.added-colors > button'));
    
    let classes = [];
    const selectedColor = addedColors.find(color => {
       classes = Array.from(color.classList);
       return  classes.includes('selected'); 
    });

    hexColor = classes.find(value => value.startsWith('#'));
    return hexColor;
}

setSelectedColor();