function countSurroundingMines(minefield, i, j) {
    let mineCount = 0;
    let minefieldILength = minefield.length;
    let minefieldJLength = minefield[i].length;

    for (let k = -1; k < 2; k += 2) {
        if (i + k >= 0 && i + k < minefieldILength) {
            if (minefield[i + k][j] === -1) {
                mineCount++;
            }
        }

        if (j + k >= 0 && j + k < minefieldJLength) {
            if (minefield[i][j + k] === -1) {
                mineCount++;
            }
        }

        if (i + k >= 0 && j + k >= 0 && i + k < minefieldILength && j + k < minefieldJLength) {
            if (minefield[i + k][j + k] === -1) {
                mineCount++;
            }
        }

        if (i + k >= 0 && j - k >= 0 && i + k < minefieldILength && j - k < minefieldJLength) {
            if (minefield[i + k][j - k] === -1) {
                mineCount++;
            }
        }
    }
    
    return mineCount;
}

function countMines(minefield) {
    for (let i = 0; i < minefield.length; i++) {
        for (let j = 0; j < minefield[i].length; j++) {
            if (minefield[i][j] === 0) {
                console.log("Free cell found")
                minefield[i][j] = countSurroundingMines(minefield, i, j);
            }
        }
    }

    return minefield;
}

let minefield = [
    [ 0,  0, -1,  0,  0, -1,  0, -1,  0, -1,  0, -1],
    [-1,  0, -1,  0,  0, -1, -1,  0, -1,  0,  0,  0],
    [ 0, -1,  0, -1,  0, -1,  0,  0,  0,  0, -1,  0],
    [ 0, -1, -1,  0,  0,  0,  0, -1,  0, -1,  0,  0],
    [-1, -1,  0,  0,  0,  0, -1,  0,  0, -1,  0, -1],
    [ 0, -1,  0,  0, -1,  0,  0,  0, -1,  0,  0, -1],
    [ 0,  0, -1,  0, -1,  0, -1, -1, -1,  0,  0,  0],
    [ 0,  0, -1,  0,  0,  0,  0,  0,  0,  0, -1,  0],
    [ 0,  0,  0,  0, -1,  0, -1,  0,  0, -1,  0,  0]
];

console.log(countMines(minefield));
