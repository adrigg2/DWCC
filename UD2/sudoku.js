function esSudokuCorrecto(miArrayBi) {
    for (let i = 0; i < miArrayBi.length; i++) {
        if (!checkRow(miArrayBi[i])) {
            console.log("Row false " + i);
            return false;
        }
        // var column = [];
        // for (let j = 0; j < miArrayBi.length; j++) {
        //     console.log("Appending " + j + " " + i);
        //     column.push(miArrayBi[j][i]);
        // }
        if (!checkColumn(miArrayBi, i)) {
            console.log("Column false " + i);
            return false;
        }
    }
    
    for (let i = 0; i < miArrayBi.length; i += 3) {
        for (let j = 0; j < miArrayBi[i].length; j += 3) {
            if (!checkSquare(miArrayBi, j, i)) {
                console.log("Square false " + j + " " + i);                
                return false;
            }
        }
    }
    return true;
}

function checkRow(row) {
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < row.length; i++) {
        if (!nums.includes(row[i])) {
            return false
        }
        nums.splice(nums.indexOf(row[i]), 1);
    }
    return true;
}

function checkColumn(array, column) {
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < array.length; i++) {
        if (!nums.includes(array[i][column])) {
            console.log(i);
            console.log(column);
            console.log(nums);
            console.log(array[i]);
            console.log(array[i][column]);
            return false;
        }
        nums.splice(nums.indexOf(array[i][column]), 1);
    }
    return true;
}

function checkSquare(array, squareStartX, squareStartY) {
    console.log("Checking square " + squareStartX + " " + squareStartY);
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var x, y;
    for (let i = 0; i < 3; i++) {
        x = squareStartX;
        x += i;
        console.log("y value: " + y);
        console.log("x value: " + x);
        for (let j = 0; j < 3; j++) {
            y = squareStartY;
            y += j;
            if (!nums.includes(array[y][x])) {
                console.log(j);
                console.log(x);
                console.log(y);
                console.log(nums);
                console.log(array[y][x]);
                return false;
            }
            nums.splice(nums.indexOf(array[y][x]), 1);
        }
    }
    return true;
}

sudoku = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

console.log(esSudokuCorrecto(sudoku))