
export function createBoard(numOfRows, numOfColumns) {
    let board = document.getElementById('board');
    for (let r = 0; r < numOfRows; r++) {
        let row = createRow(r, numOfColumns);
        board.appendChild(row);
    }
}

function createRow(rowID, numOfColumns) {
    let row = document.createElement("div")
    let rowArray = [];
    row.classList.add("row");
    row.setAttribute("data-testid", "row");
    for (let c = 0; c < numOfColumns; c++) {
        let cell = createCell(rowID, c);
        row.appendChild(cell);

    }

    return row;
}

function createCell(rowID, columnID) {
    let cell = document.createElement("div");
    cell.id = rowID.toString() + "-" + columnID.toString();
    cell.classList.add("cell");
    cell.setAttribute("data-testid", rowID.toString() + "-" + columnID.toString());
    return cell;
}

