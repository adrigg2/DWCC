// const readline = require("node:readline");
// const { stdin: input, stdout: output } = require("node:process");

// const rl = readline.createInterface({ input, output });

// let a, b, c;

// rl.question("Introduce un número: ", (answer) => {
//     a = answer;
// });

// rl.question("Introduce otro número: ", (answer) => {
//     b = answer;
// });

// rl.question("Introduce otro número: ", (answer) => {
//     c = answer;
//     rl.close;
// });

// if (a > 10 || b > 10 || c > 10) {
//     console.log("ALGUNO MAYOR QUE 10");
// } else {
//     console.log("NINGUNO MAYOR QUE 10")
// }

const print = console.log;
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

let a, b, c;
b = parseInt(readline());
a = parseInt(readline());
c = parseInt(readline());

if (a > 10 || b > 10 || c > 10) {
    console.log("ALGUNO MAYOR QUE 10");
} else {
    console.log("NINGUNO MAYOR QUE 10");
}
