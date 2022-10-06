import { createBoard } from "./boardContent.js";

const rows = 8;
const columns = 8;
const minesCount = 10
const minesLocation = []
const cellsClicked = 0;

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
        let rows = mockdata.length;
        let columns = mockdata[0].length;
        createBoard(rows, columns);
    } else {
        generateMines();
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
        });
        cells[i].addEventListener("click", function () {
            checkMine(this.getAttribute("id"));
        });
    }
}

function unrevealCell(cellID) {
    let cell = document.getElementById(cellID);
    cell.classList.remove("unrevealed");
    cell.classList.add("revealed"); 
}

function generateMines() {
    let minesLeft = minesCount;
    while (minesLeft > 0) {
        let r = Math.floor(Math.random() * rows) + 1;
        let c = Math.floor(Math.random() * columns)+ 1;
        let id = r.toString() + "-" + c.toString()
        
        if (!minesLocation.includes(id)){
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}

function checkMine(cellID){
    let cell = document.getElementById(cellID);
    if(minesLocation.includes(cell.id)){
    cell.innerText = "💣"
    alert("GAME OVER");
    gameOver = true;
    return;
    }
}

function displayMines(mine) {
    return document.getElementById("minesCounter").innerText = "💣 " + mine;
}