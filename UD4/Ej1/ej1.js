const coords = document.getElementById("mousePosition");
window.addEventListener("mousemove", (something) => {
    const coordX = something.clientX;
    const coordY = something.clientY;

    coords.textContent = `${coordX}, ${coordY}`;
});
