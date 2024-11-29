function checkUserValidity(user) {
    var regex = /^[a-z0-9!@#$%^&*(),.?":{}|<>_-]{4,18}$/;
    return regex.test(user);
}

function checkPasswordValidity(user) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_-]).{8,}$/;
    return regex.test(user);
}

function show() {
    var users = JSON.parse(localStorage.getItem("users"));
    if (users === null) {
        return;
    }

    document.getElementById("userHeader").style.display = "";

    var userList = document.getElementById("registeredUsers");
    userList.style.display = "";
    
    var lis = [];
    users.forEach(element => {
        var li = document.createElement("li");
        li.textContent = element[0];
        lis.push(li);
    });

    userList.replaceChildren(...lis);
}

document.getElementById("enviar").addEventListener("click", () => {
    var user = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var errorMessage = document.getElementById("errorMessage");

    if (!checkUserValidity(user)) {
        errorMessage.textContent = "El usuario debe estar en minúscula y contener entre 4 y 18 caracteres";
        errorMessage.style.display = "";
        return;
    }

    if (!checkPasswordValidity(password)) {
        errorMessage.textContent = "La contraseña debe contener, por lo menos, 1 minúscula, 1 mayúscula, 1 número y caracteres especiales, y debe ser de, por lo menos, 8 caracteres de longitud.";
        errorMessage.style.display = "";
        return;
    }

    errorMessage.style.display = "none";

    var users = JSON.parse(localStorage.getItem("users"));
    if (users === null) {
        users = [];
    }

    var user = [user, password];

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    show();
});

show();