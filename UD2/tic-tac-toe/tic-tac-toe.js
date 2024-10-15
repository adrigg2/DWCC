function buttonSelected(id) {
    let turnText = document.getElementById("turn");
    let button = document.getElementById(id);
    let turn = turnText.innerText === "O";

    button.value = turn ? "O" : "X";
    button.disabled = true;
    turnText.innerText = turn ? "X" : "O";
    checkWinner();
}

function checkWinner() {
    let board = [];
    let currentRow = -1;
    let emptyCell = false;
    for (let i = 0; i < 9; i++) {
        if (i % 3 === 0) {
            board.push([]);
            currentRow++;
        }
        let cellValue = document.getElementById(i).value;
        if (cellValue === "") {
            emptyCell = true;
        }
        board[currentRow].push(cellValue);
    }

    for (let i = 0; i < 3; i++) {
        let row = "";
        let broke = false;
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                broke = true;
                break;
            }
            else if (board[i][j] !== row && row != "") {
                broke = true;
                break;
            }
            else {
                row = board[i][j];
            }
        }
        if (!broke) {
            alert(`${row} wins`);
            disableButtons()
            return;
        }
    }
    console.log("Row not");

    for (let i = 0; i < 3; i++) {
        let column = "";
        let broke = false;
        for (let j = 0; j < 3; j++) {
            if (board[j][i] === "") {
                broke = true;
                break;
            }
            else if (board[j][i] !== column && column != "") {
                broke = true;
                break;
            }
            else {
                column = board[j][i];
            }
        }
        if (!broke) {
            alert(`${column} wins`);
            disableButtons()
            return;
        }
    }
    console.log("Column not");

    let broke = false;
    let diagonal = "";
    for (let i = 0; i < 3; i++) {
        if (board[i][i] === "") {
            broke = true;
            break;
        }
        else if (board[i][i] !== diagonal && diagonal != "") {
            broke = true;
            break;
        }
        else {
            diagonal = board[i][i];
        }        
    }
    if (!broke) {
        alert(`${diagonal} wins`);
        disableButtons()
        return;
    }
    console.log("diagonal1 not");

    broke = false;
    diagonal = "";
    for (let i = 0, j = 2; i < 3, j > -1; i++, j--) {
        if (board[i][j] === "") {
            broke = true;
            break;
        }
        else if (board[i][j] !== diagonal && diagonal != "") {
            broke = true;
            break;
        }
        else {
            diagonal = board[i][j];
        }
    }
    if (!broke) {
        alert(`${diagonal} wins`);
        disableButtons()
        return;
    }
    console.log("Diagonal2 not");

    if (!emptyCell) {
        alert("Tie");
        disableButtons();
        return;
    }
}

function disableButtons() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).disabled = true;
    }
}

function restart() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).disabled = false;
        document.getElementById(i).value = "";
    }
    document.getElementById("turn").innerHTML = "X";
}
