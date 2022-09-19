var board = [];
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
    //document.getElementById("mines-count").innerText = minesCount

    //createBoard
    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            //get cell position [1-2]
            let cell = document.createElement("div")
            cell.id = r.toString() + "-" + c.toString()
            //cell.addEventListener("click, clickCell()")
            document.getElementById("board").append(cell)
            row.push(cell)
        }
        board.push(row)
    }
    console.log(board);
}

