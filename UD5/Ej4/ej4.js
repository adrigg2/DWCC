let timer;
const clickTime = 150;

document.addEventListener("DOMContentLoaded", function() {
    var ps = document.getElementsByTagName("p");
    var psArrays = Array.from(ps);
    psArrays.forEach(element => {
        element.addEventListener("click", () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                element.style.display = "none";
            }, clickTime);
        });

        element.addEventListener("dblclick", () => {
            clearTimeout(timer);
            element.remove();
        });
    });

    var button = document.getElementById("respawn");
    button.addEventListener("click", () => {
        var ps = document.getElementsByTagName("p");
        var psArrays = Array.from(ps);
        psArrays.forEach(element => {
            element.style.display = "";
        })
    })
});