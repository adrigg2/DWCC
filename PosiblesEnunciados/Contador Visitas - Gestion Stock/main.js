function modifyQuantity(initialQuantity, modification) {
    return initialQuantity + modification;
}

function showProducts() {
    document.getElementById("productTable").style.display = "";
    let array = JSON.parse(localStorage.getItem("products"));
    let trs = [];
    array.forEach(element => {
        var tr = document.createElement("tr");
        var nameTd = document.createElement("td");
        var quantityTd = document.createElement("td");
        var priceTd = document.createElement("td");
        var eliminarTd = document.createElement("td");
        var anadirTd = document.createElement("td");
        var quitarTd = document.createElement("td");
        var eliminar = document.createElement("button");
        var anadir1 = document.createElement("button");
        var anadir5 = document.createElement("button");
        var anadir10 = document.createElement("button");
        var anadir100 = document.createElement("button");
        var quitar1 = document.createElement("button");
        var quitar5 = document.createElement("button");
        var quitar10 = document.createElement("button");
        var quitar100 = document.createElement("button");
        
        anadir1.textContent = "+1"
        anadir5.textContent = "+5"
        anadir10.textContent = "+10"
        anadir100.textContent = "+100"
        quitar1.textContent = "-1"
        quitar5.textContent = "-5"
        quitar10.textContent = "-10"
        quitar100.textContent = "-100"
        eliminar.textContent = "Eliminar";
        eliminar.addEventListener("click", () => {
            let array = JSON.parse(localStorage.getItem("products"));
            array.splice(array.indexOf(element), 1);
            localStorage.setItem("products", JSON.stringify(array));
            if (array.length === 0) {
                document.getElementById("productTable").style.display = "none";
            }
            showProducts();
        });

        anadir1.addEventListener("click", () => {
            let array = JSON.parse(localStorage.getItem("products"));
            modifying = array[array.indexOf(element)];
            modifying[1] += 1;
            localStorage.setItem("products", JSON.stringify(array));
            showProducts();
        });
        anadir5.addEventListener("click", () => {
            let array = JSON.parse(localStorage.getItem("products"));
            modifying = array[array.indexOf(element)];
            modifying[1] += 5;
            localStorage.setItem("products", JSON.stringify(array));
            showProducts();
        });
        anadir10.addEventListener("click", () => {
            let array = JSON.parse(localStorage.getItem("products"));
            modifying = array[array.indexOf(element)];
            modifying[1] += 10;
            localStorage.setItem("products", JSON.stringify(array));
            showProducts();
        });
        anadir100.addEventListener("click", () => {
            let array = JSON.parse(localStorage.getItem("products"));
            modifying = array[array.indexOf(element)];
            modifying[1] += 100;
            localStorage.setItem("products", JSON.stringify(array));
            showProducts();
        });
        quitar1.addEventListener("click", () => {
            let array = JSON.parse(localStorage.getItem("products"));
            modifying = array[array.indexOf(element)];
            modifying[1] -= 1;
            localStorage.setItem("products", JSON.stringify(array));
            showProducts();
        });
        quitar5.addEventListener("click", () => {
            let array = JSON.parse(localStorage.getItem("products"));
            modifying = array[array.indexOf(element)];
            modifying[1] -= 5;
            localStorage.setItem("products", JSON.stringify(array));
            showProducts();
        });
        quitar10.addEventListener("click", () => {
            let array = JSON.parse(localStorage.getItem("products"));
            modifying = array[array.indexOf(element)];
            modifying[1] -= 10;
            localStorage.setItem("products", JSON.stringify(array));
            showProducts();
        });
        quitar100.addEventListener("click", () => {
            let array = JSON.parse(localStorage.getItem("products"));
            modifying = array[array.indexOf(element)];
            modifying[1] -= 100;
            localStorage.setItem("products", JSON.stringify(array));
            showProducts();
        });

        nameTd.textContent = element[0];
        quantityTd.textContent = element[1];
        priceTd.textContent = element[2];

        tr.appendChild(nameTd);
        tr.appendChild(quantityTd);
        tr.appendChild(priceTd);
        anadirTd.appendChild(anadir1);
        anadirTd.appendChild(anadir5);
        anadirTd.appendChild(anadir10);
        anadirTd.appendChild(anadir100);
        quitarTd.appendChild(quitar1);
        quitarTd.appendChild(quitar5);
        quitarTd.appendChild(quitar10);
        quitarTd.appendChild(quitar100);
        eliminarTd.appendChild(eliminar);
        tr.appendChild(anadirTd);
        tr.appendChild(quitarTd);
        tr.appendChild(eliminarTd);

        trs.push(tr);
    });
    document.getElementById("tableBody").replaceChildren(...trs);
}

localStorage.setItem("user", "admin");
localStorage.setItem("password", "1234");

document.getElementById("login").addEventListener("click", () => {
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;

    if (user != localStorage.getItem("user") || password != localStorage.getItem("password")) {
        document.getElementById("errorMessage").style.display = "";
        return;
    }

    document.getElementById("loginForm").style.display = "none";
    document.getElementById("stockManagement").style.display = "";
    showProducts();
});

document.getElementById("addProduct").addEventListener("click", () => {
    let name = document.getElementById("name").value;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;

    if (!/^[0-9]+$/.test(quantity) || !/^[0-9]+.[0-9]{2}$/.test(price)) {
        document.getElementById("errorMessageProduct").style.display = "";
        return;
    }
    document.getElementById("errorMessageProduct").style.display = "none";    

    let array = JSON.parse(localStorage.getItem("products"));
    if (array === null) {
        array = [];
    }

    quantity = parseInt(quantity);

    array.push([name, quantity, price]);
    localStorage.setItem("products", JSON.stringify(array));

    showProducts();
});

let cuentaVisitas = localStorage.getItem("cuentaVisitas");
cuentaVisitas = parseInt(cuentaVisitas) + 1;
document.getElementById("cuentaVisitas").textContent = cuentaVisitas;
localStorage.setItem("cuentaVisitas", cuentaVisitas);
