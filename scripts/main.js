var rows = 8;
var columns = 8;
var minesLocation = []
var cellsClicked = 0;
var flagEnabled = false
var gameOver = false

window.onload = function () {
    startGame();
}

function startGame() {
    let mockdata = getURLParams('mockdata');
    if (mockdata !== null) {
        let rows = mockdata.length;
        let columns = mockdata[0].length;
        createBoard(rows, columns);
    } else {
        displayMines(10);
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
            cell.setAttribute("class", "cell")
            cell.setAttribute("data-testid", "cell")
            row.append(cell)
        }
        board.append(row)
    }
}

function displayMines(mine) {
    return document.getElementById("minesCounter").innerText = "💣 " + mine;
}

function clickCell() {}