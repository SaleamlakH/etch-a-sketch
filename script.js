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

makeGrid(16);