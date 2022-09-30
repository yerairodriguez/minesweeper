var rows = 8;
var columns = 8;

var minesCount = 10;
var minesLocation = []

var cellsClicked = 0;
var flagEnabled = false

var gameOver = false

window.onload = function () {
    startGame();
}

function startGame() {
    displayMines();
    createBoard();
    console.log(boardList);
    
}

function createBoard() {
    const board = document.getElementById('board');

    for (let r = 1; r <= rows; r++) {
        let row = document.createElement("div")
        row.setAttribute("class", "row");
        row.setAttribute("data-testid", r);
        for (let c = 1; c <= columns; c++) {
            //get cell position [1-2]
            let cell = document.createElement("div")
            cell.setAttribute("class", "cell")
            //cell.addEventListener("click, clickCell()")
            cell.setAttribute("data-testid", r.toString() + "-" + c.toString())
            row.append(cell)
        }
        board.append(row)
    }
}


function displayMines(){
    return document.getElementById("minesCounter").innerText = "💣 " + minesCount;
}

//function clickCell() {