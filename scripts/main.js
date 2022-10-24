import { createBoard } from "./boardContent.js";

const defaultCell = {
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
let timer = document.getElementById("timer");
let result = document.getElementById("gameResult");
let board = document.getElementById("board");
let totalSeconds = 0;
let interval = null;

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
    infoArray();
    setMines(mockdata);
    displaySuspectedMinesLeft();
    adjacentMines();
    createBoard(rows, columns);
}

function infoArray() {
    arrayCellInfo = [];
    for (let i = 0; i < rows; i++) {
        arrayCellInfo.push([])
        for (let j = 0; j < columns; j++) {
            arrayCellInfo[i].push({ ...defaultCell, })
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
                startTimer();
                unrevealCellContent(this.getAttribute("id"));
                displayGameResult();
            });
            cells[i].addEventListener("contextmenu", function (event) {
                event.preventDefault();
                startTimer();
                let id = this.getAttribute("id")
                let splittedID = id.split("-");
                if (!arrayCellInfo[splittedID[0]][splittedID[1]].isRevealed) {
                    tagCell(splittedID)
                    displayTagCell(id, splittedID)
                }
            });
        }
    }
    resetButton.addEventListener('click', function (e) {
        resetBoard();
    });
}

function removeEventListener() {
    board.removeEventListener("click", stopProp, { capture: true });
    board.removeEventListener("contextmenu", stopProp, { capture: true });
}

function stopEventListener() {
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

function unrevealCellContent(cellID) {
    let board = document.getElementById("board");
    let cell = document.getElementById(cellID);
    let splittedID = cellID.split("-")
    if (!arrayCellInfo[splittedID[0]][splittedID[1]].isRevealed && !arrayCellInfo[splittedID[0]][splittedID[1]].isTagged) {
        arrayCellInfo[splittedID[0]][splittedID[1]].isRevealed = true
        if (arrayCellInfo[splittedID[0]][splittedID[1]].isMined) {
            revealMine(cell);
            revealMinesWhenGameOver(cell);
            stopEventListener();
            stopTimer();
            gameOver = true;
        } else if (!gameOver) {
            getNumOfAdjacentMines(cell, splittedID);
        }
    }
}

function getNumOfAdjacentMines(cell, splittedID) {
    cell.classList.add("revealed");
    if (arrayCellInfo[splittedID[0]][splittedID[1]].numOfAdjacentMines != 0) {
        cell.innerText = arrayCellInfo[splittedID[0]][splittedID[1]].numOfAdjacentMines
        cell.classList.add("x" + arrayCellInfo[splittedID[0]][splittedID[1]].numOfAdjacentMines)
    } else {
        revealEmptyCell(splittedID);
    }

}

function adjacentMines() {
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
            if (arrayCellInfo[r][c].isMined) {
                let cell = r + "-" + c
                cell = document.getElementById(cell);
                revealMine(cell);
            }
        }
    }
}

function revealEmptyCell(splittedID) {
    let r = parseInt(splittedID[0])
    let c = parseInt(splittedID[1])
    let cell;
    if (r + 1 < arrayCellInfo.length && !arrayCellInfo[r + 1][c].isRevealed) {
        arrayCellInfo[r + 1][c].isRevealed = true
        splittedID = (r + 1) + "-" + c
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        getNumOfAdjacentMines(cell, splittedID)
    }
    if (r - 1 >= 0 && !arrayCellInfo[r - 1][c].isRevealed) {
        arrayCellInfo[r - 1][c].isRevealed = true
        splittedID = (r - 1) + "-" + c
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        getNumOfAdjacentMines(cell, splittedID)
    }
    if (c - 1 >= 0 && !arrayCellInfo[r][c - 1].isRevealed) {
        arrayCellInfo[r][c - 1].isRevealed = true
        splittedID = r + "-" + (c - 1)
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        getNumOfAdjacentMines(cell, splittedID)
    }
    if (c + 1 < arrayCellInfo.length && !arrayCellInfo[r][c + 1].isRevealed) {
        arrayCellInfo[r][c + 1].isRevealed = true
        splittedID = r + "-" + (c + 1)
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        getNumOfAdjacentMines(cell, splittedID)
    }
    if (r - 1 >= 0 && c - 1 >= 0 && !arrayCellInfo[r - 1][c - 1].isRevealed) {
        arrayCellInfo[r - 1][c - 1].isRevealed = true
        splittedID = (r - 1) + "-" + (c - 1)
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        getNumOfAdjacentMines(cell, splittedID)
    }
    if (r + 1 < arrayCellInfo.length && c + 1 < arrayCellInfo.length && !arrayCellInfo[r + 1][c + 1].isRevealed) {
        arrayCellInfo[r + 1][c + 1].isRevealed = true
        splittedID = (r + 1) + "-" + (c + 1)
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        getNumOfAdjacentMines(cell, splittedID)
    }
    if (r - 1 >= 0 && c + 1 < arrayCellInfo.length && !arrayCellInfo[r - 1][c + 1].isRevealed) {
        arrayCellInfo[r - 1][c + 1].isRevealed = true
        splittedID = (r - 1) + "-" + (c + 1)
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        getNumOfAdjacentMines(cell, splittedID)
    }
    if (r + 1 < arrayCellInfo.length && c - 1 >= 0 && !arrayCellInfo[r + 1][c - 1].isRevealed) {
        arrayCellInfo[r + 1][c - 1].isRevealed = true
        splittedID = (r + 1) + "-" + (c - 1)
        cell = document.getElementById(splittedID)
        splittedID = splittedID.split("-")
        getNumOfAdjacentMines(cell, splittedID)
    }
}

/* Tagging functions */

function tagCell(splittedID) {
    if (arrayCellInfo[splittedID[0]][splittedID[1]].isTagged == "flag") {
        arrayCellInfo[splittedID[0]][splittedID[1]].isTagged = "questionMark";
    } else if (arrayCellInfo[splittedID[0]][splittedID[1]].isTagged == "") {
        arrayCellInfo[splittedID[0]][splittedID[1]].isTagged = "flag";
    } else if (arrayCellInfo[splittedID[0]][splittedID[1]].isTagged && !arrayCellInfo[splittedID[0]][splittedID[1]].isMined== "incorrect") {
        arrayCellInfo[splittedID[0]][splittedID[1]].isTagged = "";
    }
    else {
        arrayCellInfo[splittedID[0]][splittedID[1]].isTagged = ""
    }
}

function displayTagCell(cellID, splittedID) {
    let cellTag = document.getElementById(cellID);
    if (arrayCellInfo[splittedID[0]][splittedID[1]].isTagged == "flag") {
        cellTag.innerText = "🚩"
        minesCount--;
    } else if (arrayCellInfo[splittedID[0]][splittedID[1]].isTagged == "") {
        cellTag.innerText = ""
    } else if (arrayCellInfo[splittedID[0]][splittedID[1]].isTagged == "incorrect") {
        cellTag.innerText = "❌"
    } else {
        cellTag.innerText = "❓"
        minesCount++;
    }
    displaySuspectedMinesLeft()
}

function checkWin() {
    let board = document.getElementById("board");
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
        removeEventListener();
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
    let board = document.getElementById("board");
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
    removeEventListener();
}  