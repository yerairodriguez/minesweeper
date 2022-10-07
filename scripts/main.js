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
        });
    }
}

function unrevealCell(cellID) {
    let cell = document.getElementById(cellID);
    if (gameOver === false) {
        cell.classList.remove("unrevealed");
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
        alert("GAME OVER");
        revealMinesWhenGameOver()
        gameOver = true;
        return;
    }
}

function revealMinesWhenGameOver() {
    for (let r= 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let cell = boardArray[r][c];
            if (minesLocation.includes(cell.id)) {
                cell.classList.remove("unrevealed");
                cell.classList.add("revealed");
                cell.classList.add("mined");
                cell.innerText = "💣";            
            }
        }
    }
}
