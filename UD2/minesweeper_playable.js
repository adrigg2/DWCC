const readline = utf8readline;

function utf8readline() {
    var r = '', b = new Buffer(10), bi = 0, bl = 0;
    b.fill(0);
    while (1) {
        var br = require('fs').readSync(0, b, bi, 1, null);
        if (!br) {
            readline.eof = true;
            r += b.toString('utf-8', 0, bi);
            return r;
        }
        var byte = b[bi];
        bi += br;

        if (bl) {
            bl--;
            if ((byte & 0xC0) !== 0x80) {
                console.error('readline: invalid utf-8 code point');
            }
        }
        else {
            if ((byte & 0xC0) == 0x80) {
                console.error('readline: invalid utf-8 code point');
            }
            if ((byte & 0xE0) == 0xC0) {
                bl = 1;
            }
            if ((byte & 0xF8) == 0xE0) {
                bl = 2;
            }
            if ((byte & 0xF8) == 0xF0) {
                bl = 3;
            }
        }

        var eoln = byte == 0x0A;
        if (eoln) {
            bl = 0;
            bi--;
        }

        if (!bl) {
            r += b.toString('utf-8', 0, bi);
            bi = 0;
        }

        if (eoln || readline.eof) {
            return r;
        }
    }
}

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

function play(minefield) {
    let lost = false;
    playableMinefield = [[]];

    for (let i = 0; i < minefield.length; i++) {
        for (let j = 0; j < minefield[i].length; j++) {
            playableMinefield[i].push("x");
        }
        playableMinefield.push([]);
    }

    while (!lost) {
        let toPrint = ""
        for (let i = 0; i < playableMinefield.length; i++) {
            for (let j = 0; j < playableMinefield[i].length; j++) {
                toPrint += playableMinefield[i][j] + "\t";
            }
            toPrint += "\n";
        }
        console.log(toPrint);
        
        console.log("Select a position (max x = " + (minefield[0].length - 1) + ", max y = " + (minefield.length - 1) + ")");
        console.log("x: ");
        let x = parseInt(readline());

        console.log("y: ");
        let y = parseInt(readline());

        let cell = minefield[y][x];
        if (cell < 0) {
            lost = true;
            console.log("You lost!");
        } else {
            playableMinefield[y][x] = cell;
        }
    }
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

//console.log(countMines(minefield));
playableMinefield = countMines(minefield);
play(playableMinefield)

