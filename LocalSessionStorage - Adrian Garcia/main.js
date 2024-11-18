class Animal {
    constructor(name, race, sex) {
        this.name = name;
        this.race = race;
        this.sex = sex;
    }
}

function save() {
    let array = JSON.parse(localStorage.getItem("array"));
    if (array == null) {
        array = [];
    }

    let name = document.getElementById("input1").value;
    let race = document.getElementById("input2").value;
    let sex = document.getElementById("formulario").querySelector('input[name=sexo]:checked').value;

    let animal = new Animal(name, race, sex);
    array.push(animal);
    localStorage.setItem("array", JSON.stringify(array));
}

function show() {
    let mainDiv = document.getElementById("mascotas");
    array = JSON.parse(localStorage.getItem("array"));

    array.forEach(element => {
        let div = document.createElement("div");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let p3 = document.createElement("p");
        let br = document.createElement("br");

        p1.textContent = `Nombre: ${element.name}`;
        p2.textContent = `Raza: ${element.race}`;
        p3.textContent = `Sexo: ${element.sex}`;

        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        mainDiv.appendChild(div);
        mainDiv.appendChild(br);
    });
}
