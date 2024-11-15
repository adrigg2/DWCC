class Person {
    constructor(name, surname, city, id) {
        this.name = name;
        this.surname = surname;
        this.city = city;
        this.id = id;
    }
}

function validateFields(person) {
    if (person.name.trim() === "") {
        return false;
    }

    if (person.surname.trim() === "") {
        return false;
    }

    if (person.city.trim() === "") {
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
    document.getElementById("table").style.display = "";

    var tr = document.createElement("tr");
    var id = document.createElement("td");
    var name = document.createElement("td");
    var surname = document.createElement("td");
    var city = document.createElement("td");
    id.textContent = person.id + 1;
    name.textContent = person.name;
    surname.textContent = person.surname;
    city.textContent = person.city;
    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(surname);
    tr.appendChild(city);
    document.getElementById("tbody").appendChild(tr);
}

var button = document.getElementById("button");
var persons = [];
button.addEventListener("click", () => {
    let person = new Person(document.getElementById("name").value, document.getElementById("surname").value, document.getElementById("city").value, persons.length)
    if (!validateFields(person)) {
        alert("Debes rellenar todos los campos");
        return;
    }
    alert("Datos guardados correctamente");
    persons.push(person);
    show(person);
    clearForm();
    console.log(persons);
});
