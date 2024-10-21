function createCheckBoxes() {    
    for (let i = 0; i < 100; i++) {
        let body = document.getElementsByTagName("body")[0];
        body.appendChild(document.createElement("br"));

        let value = Math.floor(Math.random() * 500);

        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.value = value;
        checkBox.id = i + 2;
        body.appendChild(checkBox);

        let label = document.createElement("label");
        label.for = i + 2;
        label.textContent = value;
        body.appendChild(label);
    }
}

function changeCheck(checked) {
    var inputs = document.getElementsByTagName("input");
    var inputsArray = Array.from(inputs);
    inputsArray.forEach(element => {
        if (element.type === "checkbox") {
            element.checked = checked;
        }
    });
}


document.addEventListener("DOMContentLoaded", function() {
    createCheckBoxes();
});