import { createBoard } from "./boardContent.js";
const defaultCell = {
    isMined: false,
    isRevealed: false,
    isTagged: "",
    numOfAdjacentMines: 0
}

let rows = 8;
let columns = 8;
let minesCount = 10
let arrayCellInfo;
let flagEnabled = false
let gameOver = false

window.onload = function () {
    startGame();
    addClickEvent();
}

function startGame() {
    let mockdata = getURLParams('mockdata');
    if (mockdata !== null) {
        rows = mockdata.length;
        columns = mockdata[0].length;
    }
    arrayInfo();
    setMines(mockdata);
    displayMinesLeft();
    adjacentMines();
    createBoard(rows, columns);
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
        cells[i].addEventListener("contextmenu", function (event) {
            event.preventDefault();
            let id = this.getAttribute("id")
            let splittedID = id.split("-");
            if (!arrayCellInfo[splittedID[0]][splittedID[1]].isRevealed) {
                tagCell(splittedID)
                displayTagCell(id, splittedID)
            }
        });
    }
}

function arrayInfo() {
    arrayCellInfo = [];
    for (let i = 0; i < rows; i++) {
        arrayCellInfo.push([])
        for (let j = 0; j < columns; j++) {
            arrayCellInfo[i].push({ ...defaultCell, })
        }
    }
    console.log(arrayCellInfo)
}

function unrevealCell(cellID) {
    let cell = document.getElementById(cellID);
    let splittedID = cellID.split("-")
    if (!arrayCellInfo[splittedID[0]][splittedID[1]].isRevealed && !arrayCellInfo[splittedID[0]][splittedID[1]].isTagged) {
        arrayCellInfo[splittedID[0]][splittedID[1]].isRevealed = true
        if (arrayCellInfo[splittedID[0]][splittedID[1]].isMined) {
            revealMine(cell);
            revealMinesWhenGameOver(cell);
        }else{
            revealCell(cell, splittedID);
        }
    }
}

function revealCell(cell, splittedID){
    cell.classList.add("revealed");
    if (arrayCellInfo[splittedID[0]][splittedID[1]].numOfAdjacentMines != 0) {
        cell.innerText = arrayCellInfo[splittedID[0]][splittedID[1]].numOfAdjacentMines
        cell.classList.add("x" + arrayCellInfo[splittedID[0]][splittedID[1]].numOfAdjacentMines)
    }else{
        revealEmptyCell(splittedID);
    }
    
}

function revealMine(cell) {
    cell.classList.add("revealed");
    cell.classList.add("mined");
    cell.innerText = "💣";
}

function generateMines() {
    let minesAmount = minesCount
    while (minesAmount > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString()

        if (!arrayCellInfo[r][c].isMined){
            arrayCellInfo[r][c].isMined = true
            minesAmount --;
        }
    }
}

function setMines(mockdata) {
    if (mockdata !== null) {
        setMinesMockdata(mockdata);
    } else {
        generateMines();
    }
}

function setMinesMockdata(mockdata) {
    minesCount = 0
    for (let i = 0; i < mockdata.length; i++) {
        for (let j = 0; j < mockdata[i].length; j++) {
            if (mockdata[i].charAt(j) == "X") {
                arrayCellInfo[i][j].isMined = true;
                minesCount++
            }
        }
    }
}

function displayMinesLeft() {
    return document.getElementById("minesCounter").innerText = minesCount;
}

function revealMinesWhenGameOver() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (arrayCellInfo[r][c].isMined ) {
                let cell = r + "-" + c
                cell = document.getElementById(cell);
                cell.classList.add("revealed");
                cell.classList.add("mined");
                cell.innerText = "💣";
            }
        }
    }
}

function displayTagCell(cellID, splittedID) {
    let cellTag = document.getElementById(cellID);
    if (arrayCellInfo[splittedID[0]][splittedID[1]].isTagged == "flag"){
        cellTag.innerText = "🚩"
        minesCount--;
    } else if (arrayCellInfo[splittedID[0]][splittedID[1]].isTagged == ""){
        cellTag.innerText = ""
    }else{
        cellTag.innerText = "❓"
        minesCount++;
    }
    displayMinesLeft()
}

function tagCell(splittedID) {
    if (arrayCellInfo[splittedID[0]][splittedID[1]].isTagged == "flag"){
        arrayCellInfo[splittedID[0]][splittedID[1]].isTagged = "questionMark";
    }else if(arrayCellInfo[splittedID[0]][splittedID[1]].isTagged == ""){
        arrayCellInfo[splittedID[0]][splittedID[1]].isTagged = "flag";
    }else{
        arrayCellInfo[splittedID[0]][splittedID[1]].isTagged = ""
    }
}

function adjacentMines() {
    for (let r = 0; r < rows; r++) {
        for (let c= 0; c < columns; c++) {
            if (!arrayCellInfo[r][c].isMined) {
                if (r - 1 >= 0 && arrayCellInfo[r-1][c].isMined) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
                if (r + 1 < arrayCellInfo.length && arrayCellInfo[r+1][c].isMined) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
                if (c - 1 >= 0 && arrayCellInfo[r][c-1].isMined ) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
                if (c + 1 < arrayCellInfo.length && arrayCellInfo[r][c+1].isMined ) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
                if (r - 1 >= 0 && c - 1 >= 0 && arrayCellInfo[r-1][c-1].isMined) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
                if (r + 1 < arrayCellInfo.length && c + 1 < arrayCellInfo.length && arrayCellInfo[r+1][c+1].isMined) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
                if (r - 1 >= 0 && c + 1 < arrayCellInfo.length && arrayCellInfo[r-1][c+1].isMined ) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
                if (r + 1 < arrayCellInfo.length && c - 1 >= 0 && arrayCellInfo[r+1][c-1].isMined ) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
            }
        }
    }
}

function revealEmptyCell(splittedID) {
    let r = splittedID[0]
    let c = splittedID[1]
    let cell;
    console.log(arrayCellInfo[r][c])
    console.log(r)
    console.log(c)
    if (r + 1 < arrayCellInfo.length && !arrayCellInfo[r+1][c].isRevealed) {
        arrayCellInfo[r+1][c].isRevealed = true
        splittedID = (r+1) + "-"+ c
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        revealCell(cell, splittedID)
    }
    if (r - 1 >= 0 && !arrayCellInfo[r-1][c].isRevealed) {
        arrayCellInfo[r-1][c].isRevealed = true
        splittedID = (r-1) + "-"+ c
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        revealCell(cell, splittedID)
    }
    if (c - 1 >= 0 && !arrayCellInfo[r][c-1].isRevealed ) {
        arrayCellInfo[r][c-1].isRevealed = true
        splittedID = r + "-"+ (c-1)
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        revealCell(cell, splittedID)
    }
    if (c + 1 < arrayCellInfo.length && !arrayCellInfo[r][c+1].isRevealed ) {
        arrayCellInfo[r][c+1].isRevealed = true
        splittedID = r + "-"+ (c+1)
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        revealCell(cell, splittedID)
    }
    if (r - 1 >= 0 && c - 1 >= 0 && !arrayCellInfo[r-1][c-1].isRevealed) {
        arrayCellInfo[r-1][c-1].isRevealed = true
        splittedID = (r-1) + "-"+ (c-1)
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        revealCell(cell, splittedID)
    }
    if (r + 1 < arrayCellInfo.length && c + 1 < arrayCellInfo.length && !arrayCellInfo[r+1][c+1].isRevealed) {
        arrayCellInfo[r+1][c+1].isRevealed = true
        splittedID = (r+1) + "-"+ (c+1)
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        revealCell(cell, splittedID)
    }
    if (r - 1 >= 0 && c + 1 < arrayCellInfo.length && !arrayCellInfo[r-1][c+1].isRevealed) {
        arrayCellInfo[r-1][c+1].isRevealed = true
        splittedID = (r-1) + "-"+ (c+1)
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        revealCell(cell, splittedID)
    }
    if (r + 1 < arrayCellInfo.length && c - 1 >= 0 && !arrayCellInfo[r+1][c-1].isRevealed) {
        arrayCellInfo[r+1][c-1].isRevealed = true
        splittedID = (r+1) + "-"+ (c-1)
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        revealCell(cell, splittedID)
    }
}