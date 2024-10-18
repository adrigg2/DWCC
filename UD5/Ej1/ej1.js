function generateNumber() {
    var list = document.getElementById("list");
    var node = document.createElement("li");
    node.innerText = Math.floor(Math.random() * 1000);
    list.appendChild(node);
}
