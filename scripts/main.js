import { createBoard, boardArray } from "./boardContent.js";


const rows = 8;
const columns = 8;
const minesCount = 10
const minesLocation = []
const cellsClicked = 0;

const mockdataMinesCount = 3


let flagEnabled = false
let gameOver = false

window.onload = function () {
    startGame();
    addClickEvent();
    console.log(minesLocation)
}

function startGame() {
    let mockdata = getURLParams('mockdata');
    if (mockdata !== null) {

        for (let i = 0; i < mockdata.length; i++) {

            if (mockdata[i].includes("X")) {
                alert("MINE DETECTED");
            }

        }
        let rows = mockdata.length;
        let columns = mockdata[0].length;
        displayMines(mockdataMinesCount);
        createBoard(rows, columns);
    } else {
        generateMines(minesCount);
        displayMines(minesCount);
        createBoard(rows, columns);
    }
}

function getURLParams(mockdataParam) {
    const parameters = new URLSearchParams(window.location.search);
    let mockDataValue = parameters.get(mockdataParam);
    if (parameters.has('mockdata')) {
        mockDataValue = mockDataValue.split("-");
    } else {
        mockDataValue = null;
    }
    return mockDataValue;
}

function addClickEvent() {
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function () {
            unrevealCell(this.getAttribute("id"));
            checkCell(this.getAttribute("id"));
            checkMine(this.getAttribute("id"));
            checkTile(this.getAttribute("id"));
        });
    }
}

function unrevealCell(cellID) {
    let cell = document.getElementById(cellID);
    if (gameOver === false) {
        cell.classList.add("revealed");
    }
}

function generateMines(minesAmount) {
    while (minesAmount > 0) {
        let r = Math.floor(Math.random() * rows) + 1;
        let c = Math.floor(Math.random() * columns) + 1;
        let id = r.toString() + "-" + c.toString()

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesAmount -= 1;
        }
    }
}

function displayMines() {
    return document.getElementById("minesCounter").innerText = "💣 " + minesCount;
}

function checkCell(cellID) {
    let cell = document.getElementById(cellID);

    if (minesLocation.includes(cell.id)) {
        cell.innerText = "💣"
        cell.classList.add("mined");
        revealMinesWhenGameOver()
        gameOver = true;
        return;
    }
    let coords = cell.id.split("-")
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);
}

function revealMinesWhenGameOver() {
    for (let r= 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let cell = boardArray[r][c];
            if (minesLocation.includes(cell.id)) {
                cell.classList.add("revealed");
                cell.classList.add("mined");
                cell.innerText = "💣";            
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains("revealed")) {
        return;
    }

    boardArray[r][c].classList.add("revealed");
    cellsClicked += 1;

    let minesFound = 0;

    minesFound += checkTile(r-1, c-1);      //top left
    minesFound += checkTile(r-1, c);        //top 
    minesFound += checkTile(r-1, c+1);      //top right

    minesFound += checkTile(r, c-1);        //left
    minesFound += checkTile(r, c+1);        //right

    minesFound += checkTile(r+1, c-1);      //bottom left
    minesFound += checkTile(r+1, c);        //bottom 
    minesFound += checkTile(r+1, c+1);      //bottom right

    if (minesFound > 0) {
        boardArray[r][c].innerText = minesFound;
        boardArray[r][c].classList.add("x" + minesFound.toString());
    }
    else {
        checkMine(r-1, c-1);    //top left
        checkMine(r-1, c);      //top
        checkMine(r-1, c+1);    //top right

        checkMine(r, c-1);      //left
        checkMine(r, c+1);      //right

        checkMine(r+1, c-1);    //bottom left
        checkMine(r+1, c);      //bottom
        checkMine(r+1, c+1);    //bottom right
    }

    if (cellsClicked == rows * columns - minesCount) {
        document.getElementById("minesCounter").innerText = "Cleared";
        gameOver = true;
    }

}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}
