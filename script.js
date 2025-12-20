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
        
        sketchArea.appendChild(row);
        rowNumber--;
    }
}

makeGrid(16);