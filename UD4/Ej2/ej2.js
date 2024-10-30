const buttonStart = document.getElementById("buttonStart");
const buttonStop = document.getElementById("buttonStop");

buttonStart.addEventListener("click", () => {
    window.setInterval(() => {
        alert("HOLA");
    }, 5000);
})

buttonStop.addEventListener("click", () => {
    window.clearInterval();
})
