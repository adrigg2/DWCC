function buttonSelected(id) {
    id = parseInt(id);
    let turnText = document.getElementById("turn");
    let currentRow = 0;
    let previousRow = 0;
    let turn = turnText.innerText === "Yellow";
    for (let i = 0; i < 6 && id + currentRow * 7 < 42; i++) {
        let targetButton = document.getElementById(id + currentRow * 7);
        console.log(`Not red ${targetButton.style.backgroundColor !== "red"}, ${targetButton.style.backgroundColor}, ${targetButton.id}, ${previousRow}`);
        console.log(`Not yellow ${targetButton.style.backgroundColor !== "yellow"}, ${targetButton.style.backgroundColor}, ${targetButton.id}, ${previousRow}`)
        if (targetButton.style.backgroundColor !== "yellow" && targetButton.style.backgroundColor !== "red") {
            console.log("A" + i);
            previousRow = currentRow;
            currentRow++;
        }
    }
    console.log(id + previousRow * 7);
    let button = document.getElementById(id + previousRow * 7);

    button.style.backgroundColor = turn ? "yellow" : "red";
    button.disabled = true;
    turnText.innerText = turn ? "Red" : "Yellow";
    checkWinner();
}

function checkWinner() {
    let board = [];
    let currentRow = -1;
    let emptyCell = false;
    for (let i = 0; i < 42; i++) {
        if (i % 7 === 0) {
            board.push([]);
            currentRow++;
        }
        let cellValue = document.getElementById(i).style.backgroundColor;
        if (cellValue === "") {
            emptyCell = true;
        }
        board[currentRow].push(cellValue);
    }

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            let row = "";
            let broke = false;
            for (let k = j; k < j + 4; k++) {
                if (board[i][k] === "") {
                    broke = true;
                    break;
                }
                else if (board[i][k] !== row && row !== "") {
                    broke = true;
                    break;
                }
                else {
                    row = board[i][k];
                }
            }
            if (!broke) {
                alert(`${row} wins`);
                console.log("row");
                disableButtons()
                return;
            }
        }
    }
    console.log("Row not");

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 3; j++) {
            let column = "";
            let broke = false;
            for (let k = j; k < j + 4; k++) {
                if (board[k][i] === "") {
                    broke = true;
                    break;
                }
                else if (board[k][i] !== column && column != "") {
                    broke = true;
                    break;
                }
                else {
                    column = board[k][i];
                }
            }
            if (!broke) {
                alert(`${column} wins`);
                console.log("column");
                disableButtons()
                return;
            }
        }
    }
    console.log("Column not");

    let won = false;
    let winner = "";
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (checkLeftToRightDiagonal(i, j, board) || checkRightToLeftDiagonal(i, j, board)) {
                won = true;
                winner = board[i][j];
            }
        }
    }
    if (won) {
        alert(`${winner} wins`);
        console.log("diagonal");
        disableButtons()
        return;
    }

    if (!emptyCell) {
        alert("Tie");
        disableButtons();
        return;
    }
}

function disableButtons() {
    for (let i = 0; i < 42; i++) {
        document.getElementById(i).disabled = true;
    }
}

function restart() {
    for (let i = 0; i < 42; i++) {
        document.getElementById(i).disabled = false;
        document.getElementById(i).style.backgroundColor = "";
    }
    document.getElementById("turn").innerHTML = "Red";
}

function checkLeftToRightDiagonal(i, j, board) {
    let initialValue = board[i][j];
    if (initialValue === "") {
        return false;
    }
    if (i + 4 > board.length || j + 4 > board[0].length) {
        return false;
    }

    for (k = i, l = j; k < i + 4 && l < j + 4; k++, l++) {
        if (board[k][l] !== initialValue) {
            return false;
        }
    }
    return true;
}

function checkRightToLeftDiagonal(i, j, board) {
    let initialValue = board[i][j];
    if (initialValue === "") {
        return false;
    }
    if (i + 4 > board.length || j - 4 < board[0].length) {
        return false;
    }

    for (k = i, l = j; k < i + 4 && l > j - 4; k++, l--) {
        if (board[k][l] !== initialValue) {
            return false;
        }
    }
    return true;
}
