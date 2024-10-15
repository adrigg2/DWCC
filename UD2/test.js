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

// let x = 3;
// let y = 4;
// [x, y] = [y, x];
// console.log(x, y);
// console.log("%cThis is a styled log message!", "color: red; font-size: 128px; font-weight: bold;")

// const add = (a, b) => a + b;
// console.log(add(1, 2));

// function throwDice(times) {
//     let timesRolled = [0, 0, 0, 0, 0, 0];

//     if (times > 1000000 || times < 1) {
//         console.log("Input out of range");
//         return;
//     }
    
//     for (let i = 0; i < times; i++) {
//         let dice = Math.floor(Math.random() * 6);
//         timesRolled[dice]++;
//     }

//     for (let i = 0; i < timesRolled.length; i++) {
//         console.log(`${i}: ${timesRolled[i]}`)
//     }
// }

// throwDice(1);
// throwDice(1000000);
// throwDice(999999999);
// throwDice(-1);
// throwDice(10)

// console.log("1000000" > 2);

// console.log({} + {});

// console.log(3 % 1);

// for (let i = 0; i < 9; i++) {
//     console.log(i % 3);
// }

a = readline();
b = "papel";
// console.log(b === a);
// console.log(a.length);
// console.log(b.length);

console.log("b");
for (let i = 0; i < b.length; i++) {
    console.log(b.charCodeAt(i));
}

console.log("a");
for (let i = 0; i < a.length; i++) {
    console.log(a.charCodeAt(i));
}

console.log(b == a.substring(0, a.length - 1));
