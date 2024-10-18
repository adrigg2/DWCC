function createTable() {
    var table = document.getElementById("table");
    console.log(table);
    for (let i = 0; i < 100; i++) {
        var tr = document.createElement("tr");
        for (let j = 0; j < 100; j++) {
            var td = document.createElement("td");
            td.innerText = (i * 100) + (j + 1);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function highlightAlmostPrimes() {
    var tds = document.getElementsByTagName("td");
    console.log(tds);
    var tdsArr = Array.from(tds);
    console.log(tdsArr);
    tdsArr.forEach(element => {
        if (isAlmostPrime(element.innerText)) {
            element.style.backgroundColor = "yellow";
        }
    });
}

function isAlmostPrime(number) {
    // if (!Number.isInteger(number)) {
    //     console.log("not integer");
    //     return false;
    // }

    var num = parseInt(number);
    if (num < 4) {
        console.log("less than 4");
        return false;
    }

    var divisible = false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0 && divisible === false) {
            console.log("Casi primo?");
            divisible = true;
        }
        else if (num % i === 0) {
            console.log("No casi primo");
            return false;
        }
    }
    return divisible;
}

document.addEventListener("DOMContentLoaded", function() {
    createTable();
    highlightAlmostPrimes();
});