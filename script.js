const DEFAULT_COLOR_BLACK = '#000';
let  isRandomState = false;

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
    if (isRandomState) setRandomColor();
    const sketchColor = getSelectedColor();
    
    target.style.backgroundColor = sketchColor;
}

function getSelectedColor() {
    const selectedColor = document.querySelector('.selected-color');
    return selectedColor.style.backgroundColor;
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

function setDefaultSketchColor() {
    const selectedColor = document.querySelector('.selected-color');
    const defaultColor = document.querySelector('.default-color');
    
    defaultColor.style.backgroundColor = DEFAULT_COLOR_BLACK;
    selectedColor.style.backgroundColor = DEFAULT_COLOR_BLACK;
}

setDefaultSketchColor();

const addColorBtn = document.querySelector('.add-color');
addColorBtn.addEventListener('click', addNewColor);

function addNewColor() {
    const colorInput = document.querySelector('#color-input');
    
    colorInput.click();
    colorInput.addEventListener('change', addColoredBtn);
}

function addColoredBtn(event) {
    const button = document.createElement('button');
    const colorsContainer = document.querySelector('.added-colors');

    button.style.backgroundColor = event.target.value;
    colorsContainer.appendChild(button);
}

//click to select a color for sketching
const colorsContainer = document.querySelector('.added-colors');
colorsContainer.addEventListener('click', selectTheColor);

function selectTheColor(event) {
    const targetElement = event.target;
    if (targetElement.nodeName != 'BUTTON') return;
    
    const selectedColor = document.querySelector('.selected-color');
    const color = targetElement.style.backgroundColor;
    selectedColor.style.backgroundColor = color ? color : '#000';
}

const randomColorBtn = document.querySelector('.random-color');
randomColorBtn.addEventListener('click', setRandomColor);

function setRandomColor() {
    const selectedColor = document.querySelector('.selected-color');
    const randomColor = `rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()})`;
    
    isRandomState = true;
    selectedColor.style.backgroundColor = randomColor;
    return randomColor;
}

function getRandomNum() {
    return Math.floor(Math.random()*255 + 1);
}