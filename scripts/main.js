const rows = 8;
const columns = 8;
const minesLocation = []
const cellsClicked = 0;

let flagEnabled = false
let gameOver = false

window.onload = function () {
    startGame();
    addClickEvent();
}

function startGame() {
    let mockdata = getURLParams('mockdata');
    if (mockdata !== null) {
        let rows = mockdata.length;
        let columns = mockdata[0].length;
        createBoard(rows, columns);
    } else {
        displayMines(5);
        createBoard(rows, columns);
    }
}

function getURLParams(mockdataParam) {
    const parameters = new URLSearchParams(window.location.search);
    if (parameters.has('mockdata')) {
        mockDataValue = parameters.get(mockdataParam).split("-");
    } else {
        mockDataValue = null;
    }
    return mockDataValue;
}

function createBoard(rows, columns) {
    const board = document.getElementById('board');

    for (let r = 1; r <= rows; r++) {
        let row = document.createElement("div")
        row.setAttribute("class", "row");
        row.setAttribute("data-testid", "row");
        for (let c = 1; c <= columns; c++) {
            let cell = document.createElement("div")
            //cell.addEventListener("click", clickCell())
            cell.id = r.toString() + "-" + c.toString()
            cell.classList.add("cell", "unrevealed")
            cell.setAttribute("data-testid", "cell")
            row.append(cell)
        }
        board.append(row)
    }
}

function addClickEvent() {
    let cells = document.getElementsByClassName("cell");

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function () {
            unrevealCell(this.getAttribute("id"));
        });
    }
}

function unrevealCell(cellID) {
    let cell = document.getElementById(cellID);
    cell.classList.remove("unrevealed");
    cell.classList.add("revealed"); 
}

function displayMines(mine) {
    return document.getElementById("minesCounter").innerText = "💣 " + mine;
}


//if mines had class bomb 
//step count class in board and should pass through
