import { createBoard } from "./boardContent.js";

const defaultCell = {
    x: 0,
    y: 0,
    isMined: false,
    isRevealed: false,
    isTagged: "",
    numOfAdjacentMines: 0
}

let arrayCellInfo;
let rows = 8;
let columns = 8;
let minesCount = 10;
let gameOver = false;
let totalSeconds = 0;
let interval = null;
let timer = document.getElementById("timer");
let result = document.getElementById("gameResult");
let board = document.getElementById("board");

window.onload = function () {
    startGame();
    addClickEvents();
}

function startGame() {
    let mockdata = getURLParams('mockdata');
    if (mockdata !== null) {
        rows = mockdata.length;
        columns = mockdata[0].length;
    }
    createInfoArray();
    setMines(mockdata);
    displaySuspectedMinesLeft();
    setNumOfAdjacentMines();
    createBoard(rows, columns);
}

function createInfoArray() {
    arrayCellInfo = [];
    for (let i = 0; i < rows; i++) {
        arrayCellInfo.push([])
        for (let j = 0; j < columns; j++) {
            arrayCellInfo[i].push({
                ...defaultCell,
                x: i,
                y: j
            })
        }
    }
    console.log(arrayCellInfo)
}

/* Event listeners functions */

function addClickEvents() {
    let resetButton = document.getElementById("resetButton");
    let cells = document.getElementsByClassName("cell");
    if (!gameOver) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener("click", function () {
                let splittedID = this.getAttribute("id").split("-")
                let cellData = arrayCellInfo[splittedID[0]][splittedID[1]]
                unrevealCellContent(cellData);
            });
            cells[i].addEventListener("contextmenu", function (event) {
                let splittedID = this.getAttribute("id").split("-")
                let cellData = arrayCellInfo[splittedID[0]][splittedID[1]]
                event.preventDefault();
                if (!cellData.isRevealed) {
                    tagCell(cellData)
                    displayTagCell(cellData)
                }
            });
        }
    }
    resetButton.addEventListener('click', function (e) {
        resetBoard();
    });
}

function removeClickProhibition() {
    board.removeEventListener("click", stopProp, { capture: true });
    board.removeEventListener("contextmenu", stopProp, { capture: true });
}

function stopClickWhenGameEnded() {
    board.addEventListener("click", stopProp, { capture: true });
    board.addEventListener("contextmenu", stopProp, { capture: true });
}

function stopProp(e) {
    e.stopImmediatePropagation();
}

/* Mockdata functions */

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

/* Mines functions */

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

function generateMines() {
    let minesAmount = minesCount
    while (minesAmount > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (!arrayCellInfo[r][c].isMined) {
            arrayCellInfo[r][c].isMined = true
            minesAmount--;
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

function unrevealCellContent(cellData) {
    startTimer();
    let cell = document.getElementById(cellData.x + "-" + cellData.y);
    if (!cellData.isRevealed && !cellData.isTagged) {
        cellData.isRevealed = true
        if (cellData.isMined) {
            revealMine(cell);
            revealMinesWhenGameOver(cell);
            stopClickWhenGameEnded();
            stopTimer();
            gameOver = true;
        } else if (!gameOver) {
            showNumOfAdjacentMines(cell, cellData);
        }
    }
    displayGameResult();
}

function showNumOfAdjacentMines(cell, cellData) {
    cell.classList.add("revealed");
    if (cellData.numOfAdjacentMines != 0) {
        cell.innerText = cellData.numOfAdjacentMines
        cell.classList.add("x" + cellData.numOfAdjacentMines)
    } else {
        revealEmptyCell(cellData.x, cellData.y);
    }
}

function setNumOfAdjacentMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (!arrayCellInfo[r][c].isMined) {
                if (r - 1 >= 0 && arrayCellInfo[r - 1][c].isMined) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
                if (r + 1 < arrayCellInfo.length && arrayCellInfo[r + 1][c].isMined) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
                if (c - 1 >= 0 && arrayCellInfo[r][c - 1].isMined) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
                if (c + 1 < arrayCellInfo.length && arrayCellInfo[r][c + 1].isMined) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
                if (r - 1 >= 0 && c - 1 >= 0 && arrayCellInfo[r - 1][c - 1].isMined) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
                if (r + 1 < arrayCellInfo.length && c + 1 < arrayCellInfo.length && arrayCellInfo[r + 1][c + 1].isMined) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
                if (r - 1 >= 0 && c + 1 < arrayCellInfo.length && arrayCellInfo[r - 1][c + 1].isMined) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
                if (r + 1 < arrayCellInfo.length && c - 1 >= 0 && arrayCellInfo[r + 1][c - 1].isMined) {
                    arrayCellInfo[r][c].numOfAdjacentMines++
                }
            }
        }
    }
}

/* Display functions */

function displaySuspectedMinesLeft() {
    return document.getElementById("minesCounter").innerText = minesCount;
}

function displayGameResult() {
    if (gameOver) {
        result.innerText = "😭"
    } else if (checkWin()) {
        result.innerText = "😎"
    } else {
        result.innerText = "😐"
    }

}

/* Reveal functions */

function revealMine(cell) {
    cell.classList.add("revealed");
    cell.classList.add("mined");
    cell.innerText = "💣";
}

function revealMinesWhenGameOver() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (arrayCellInfo[r][c].isMined && !arrayCellInfo[r][c].isTagged) {
                let cell = r + "-" + c
                cell = document.getElementById(cell);
                revealMine(cell);
            }
        }
    }
}

function revealEmptyCell(x, y) {
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i >= 0 && i < rows && j >= 0 && j < columns) {
                if (!arrayCellInfo[i][j].isRevealed) {
                    unrevealCellContent(arrayCellInfo[i][j]);
                }
            }
        }
    }
}

/* Tagging functions */

function tagCell(cellData) {
    if (cellData.isTagged == "flag") {
        cellData.isTagged = "questionMark";
    } else if (cellData.isTagged == "") {
        cellData.isTagged = "flag";
    } else if (cellData.isTagged && !cellData.isMined == "incorrect") {
        cellData.isTagged = "";
    }
    else {
        cellData.isTagged = ""
    }
}

function displayTagCell(cellData) {
    startTimer();
    let cell = document.getElementById(cellData.x + "-" + cellData.y);
    if (cellData.isTagged == "flag") {
        cell.innerText = "🚩"
        minesCount--;
    } else if (cellData.isTagged == "") {
        cell.innerText = ""
    } else if (cellData.isTagged == "incorrect") {
        cell.innerText = "❌"
    } else {
        cell.innerText = "❓"
        minesCount++;
    }
    displaySuspectedMinesLeft()
}

/* */


function checkWin() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (arrayCellInfo[r][c].isRevealed) {
                count++;
            }
        }
    }
    if (count == (rows * columns) - minesCount) {
        stopTimer();
        stopClickWhenGameEnded();
        return true;
    }
    return false;
}

/* Timer functions */

function createTimer() {
    ++totalSeconds;

    let hour = Math.floor(totalSeconds / 3600);
    let minute = Math.floor((totalSeconds - hour * 3600) / 60);
    let seconds = totalSeconds - (hour * 3600 + minute * 60);

    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (seconds < 10) seconds = "0" + seconds;

    timer.innerHTML = minute + ":" + seconds;
}

function startTimer() {
    if (interval == null) {
        interval = setInterval(createTimer, 1000);
    } else {
        return
    }
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    stopTimer();
    totalSeconds = 0;
    timer.innerText = "00:00";
}

/* Board updates functions */

function deleteBoard() {
    board.innerHTML = ""
}

function resetBoard() {
    result.innerText = "😐"
    gameOver = false;
    minesCount = 10
    deleteBoard();
    startGame();
    addClickEvents();
    resetTimer();
    removeClickProhibition();
}  