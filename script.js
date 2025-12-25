const DEFAULT_COLOR_BLACK = '#000';
let  isRandomState = false;

const gridSizeBtn = document.querySelector('.grid-size');
const addColorBtn = document.querySelector('.add-color');
const randomColorBtn = document.querySelector('.random-color');
const colorsContainer = document.querySelector('.added-colors');

gridSizeBtn.addEventListener('click', changeGridSize);
addColorBtn.addEventListener('click', addNewColor);
randomColorBtn.addEventListener('click', setRandomState);
colorsContainer.addEventListener('click', setSelectedColor);

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

    if (isFilled(target)) {
        target.style.backgroundColor = darkenColor(target.style.backgroundColor);
        return;
    } 
    
    const sketchColor = isRandomState ? setRandomColor() : getSelectedColor();  
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

function addNewColor() {
    const colorInput = document.querySelector('#color-input');
    
    colorInput.click();
    colorInput.addEventListener('change', addColoredBtn);
}

function addColoredBtn(event) {
    const button = document.createElement('button');
    const colorsContainer = document.querySelector('.added-colors');
    let color = event.target.value

    button.style.backgroundColor = color;
    colorsContainer.appendChild(button);
    selectAddedColor(color);
}

function selectAddedColor(color) {
    console.log(color);
    const selectedColor = document.querySelector('.selected-color');
    selectedColor.style.backgroundColor = color;
}

function setSelectedColor(event) {
    const targetElement = event.target;
    if (targetElement.nodeName != 'BUTTON') return;
    
    const selectedColor = document.querySelector('.selected-color');
    const color = targetElement.style.backgroundColor;
    selectedColor.style.backgroundColor = color ? color : '#000';
}

function setRandomState() {
    if (isRandomState) {
        setDefaultSketchColor();
        isRandomState = false;
        return;
    }
    
    isRandomState = true;
    setRandomColor();
}

function setRandomColor() {
    const selectedColor = document.querySelector('.selected-color');
    const randomColor = `rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()})`;
    
    selectedColor.style.backgroundColor = randomColor;
    return randomColor;
}

function getRandomNum() {
    return Math.floor(Math.random()*255 + 1);
}

function isFilled(target) {
    if (target.style.backgroundColor) return true;
    return false;
}

function darkenColor(rgbColor) {
    let [red, green, blue] = rgbColor.slice(rgbColor.indexOf('(') + 1, -1).split(', ');
    let [hue, saturation, lightness] = rgbToHsl(red, green, blue);

    lightness -= 5;
    return `hsl(${hue} ${saturation} ${lightness})`;
}


// RGB to HSL convertor
// Credit https://gist.github.com/vahidk/05184faf3d92a0aa1b46aeaa93b07786
function rgbToHsl(red, green, blue) {
    red /= 255; green /= 255; blue /= 255;

    let max = Math.max(red, green, blue);
    let min = Math.min(red, green, blue);
    let diff = max - min;
    let hue;

    if (diff === 0) hue = 0;
    else if (max === red) hue = (green - blue) / diff % 6;
    else if (max === green) hue = (blue - red) / diff + 2;
    else if (max === blue) hue = (red - green) / diff + 4;
    
    let lightness = (min + max) / 2;
    let saturation = (diff === 0)
        ? 0 
        : diff / (1 - Math.abs(2 * lightness - 1));
    
    hue = Math.round(hue * 60);
    saturation = Math.round(saturation * 100);
    lightness = Math.round(lightness * 100);
    
    return [hue, saturation, lightness];
}