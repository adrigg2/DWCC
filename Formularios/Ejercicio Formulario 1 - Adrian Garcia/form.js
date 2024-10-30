class Person {
    constructor(name, surname, city) {
        this.name = name;
        this.surname = surname;
        this.city = city;
    }
}

function validateFields(person) {
    if (person.name === "") {
        return false;
    }

    if (person.surname === "") {
        return false;
    }

    if (person.city === "") {
        return false;
    }

    return true;
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("city").value = "";
}

function show(person) {
    if(document.getElementById("actualTable") === null) {
        console.log("creating table");
        var table = document.createElement("table");
        var firstRow = document.createElement("tr");
        var thName = document.createElement("th");
        var thSurname = document.createElement("th");
        var thCity = document.createElement("th");
        thName.textContent = "Nombre";
        thSurname.textContent = "Apellidos";
        thCity.textContent = "Ciudad";
        firstRow.appendChild(thName);
        firstRow.appendChild(thSurname);
        firstRow.appendChild(thCity);
        table.appendChild(firstRow);
        table.id = "actualTable";
        table.style.border = "solid";
        document.getElementById("table").append(table);
    }

    var tr = document.createElement("tr");
    var name = document.createElement("td");
    var surname = document.createElement("td");
    var city = document.createElement("td");
    name.textContent = person.name;
    surname.textContent = person.surname;
    city.textContent = person.city;
    tr.appendChild(name);
    tr.appendChild(surname);
    tr.appendChild(city);
    document.getElementById("actualTable").appendChild(tr);
}

var button = document.getElementById("button");
button.addEventListener("click", () => {
    let person = new Person(document.getElementById("name").value, document.getElementById("surname").value, document.getElementById("city").value)
    if (!validateFields(person)) {
        alert("Debes rellenar todos los campos");
        return;
    }
    alert("Datos guardados correctamente");
    show(person);
});
