class Person {
    constructor(dni, name, surname, city) {
        this.dni = dni;
        this.name = name;
        this.surname = surname;
        this.city = city;
    }
}

function validateFields(person) {
    if (person.dni.trim() === "") {
        return false;
    }

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
    document.getElementById("dni").value = "";
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("city").value = "";
}

function show(persons) {
    document.getElementById("table").style.display = "";
    var trs = []

    var idValue = 1;
    persons.forEach(person => {
        var tr = document.createElement("tr");
        var id = document.createElement("td");
        var dni = document.createElement("td");
        var name = document.createElement("td");
        var surname = document.createElement("td");
        var city = document.createElement("td");
        var borrar = document.createElement("button");
        var modificar = document.createElement("button");
        id.textContent = idValue++;
        dni.textContent = person.dni;
        name.textContent = person.name;
        surname.textContent = person.surname;
        city.textContent = person.city;
        borrar.textContent = "Borrar";
        modificar.textContent = "Modificar";

        borrar.addEventListener("click", () => {
            persons.splice(persons.indexOf(person), 1);
            show(persons);
        });

        modificar.addEventListener("click", () => {
            document.getElementById("dni").value = person.dni;
            document.getElementById("name").value = person.name;
            document.getElementById("surname").value = person.surname;
            document.getElementById("city").value = person.city;
        });

        tr.appendChild(id);
        tr.appendChild(dni);
        tr.appendChild(name);
        tr.appendChild(surname);
        tr.appendChild(city);
        tr.appendChild(document.createElement("td").appendChild(modificar));
        tr.appendChild(document.createElement("td").appendChild(borrar));
        trs.push(tr);
    });

    document.getElementById("tbody").replaceChildren(...trs);
}

async function getAlumnos() {
    try {
        const result = await fetch("personas_Nov24.json");
        if (!result.ok) {
            throw new Error("There has been an error when accessing json data " + result.statusText);
        }
        const alumnos = await result.json();
        const personas = [];
        alumnos.forEach(element => {
            personas.push(new Person(element.dni, element.name, element.surname, element.city));
        });
        return personas;
    } catch (error) {
        alert("Error al leer el JSON: " + error.message);
        return [];
    }
}

async function initialize() {
    let persons = await getAlumnos();
    show(persons);
    console.log(persons);
    return persons;
}

var button = document.getElementById("button");
var persons = [];
initialize().then(result => {
    result.forEach(element => {
        persons.push(element);
    })
});
button.addEventListener("click", () => {
    let person = new Person(document.getElementById("dni").value, document.getElementById("name").value, document.getElementById("surname").value, document.getElementById("city").value)
    if (!validateFields(person)) {
        alert("Debes rellenar todos los campos");
        return;
    }

    let modified = false;
    persons.forEach(element => {
        if (person.dni === element.dni) {
            persons[persons.indexOf(element)] = person;
            modified = true;
        }
    });

    alert("Datos guardados correctamente");
    console.log(persons);

    if (!modified) {
        persons.push(person);
    }

    show(persons);
    clearForm();
    console.log(persons);
});

document.getElementById("dniTable").addEventListener("click", () => {
    persons.sort((p1, p2) => {
        return p1.dni.localeCompare(p2.dni);
    });
    show(persons);
});

document.getElementById("nameTable").addEventListener("click", () => {
    persons.sort((p1, p2) => {
        return p1.name.localeCompare(p2.name);
    });
    show(persons);
});

document.getElementById("surnameTable").addEventListener("click", () => {
    persons.sort((p1, p2) => {
        return p1.surname.localeCompare(p2.surname);
    });
    show(persons);
});

document.getElementById("cityTable").addEventListener("click", () => {
    persons.sort((p1, p2) => {
        return p1.city.localeCompare(p2.city);
    });
    show(persons);
});
