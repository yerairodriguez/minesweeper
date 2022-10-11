export const boardArray = [];


export function createBoard(numOfRows, numOfColumns) {
    let board = document.getElementById('board');
    for (let r = 1; r <= numOfRows; r++) {
        let row = createRow(r, numOfColumns);
        board.appendChild(row);
    }
    console.log(boardArray);
}

function createRow(rowID, numOfColumns) {
    let row = document.createElement("div")
    let rowArray = [];
    row.classList.add("row");
    row.setAttribute("data-testid", "row");
    for (let c = 1; c <= numOfColumns; c++) {
        let cell = createCell(rowID, c);
        row.appendChild(cell);
        rowArray.push(cell);
    }
    boardArray.push(rowArray);
    return row;
}

function createCell(rowID, columnID) {
    let cell = document.createElement("div");
    cell.id = rowID.toString() + "-" + columnID.toString();
    cell.classList.add("cell");
    cell.setAttribute("data-testid", "cell");
    return cell;
}