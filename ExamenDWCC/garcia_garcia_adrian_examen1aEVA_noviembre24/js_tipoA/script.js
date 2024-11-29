//MODELO --------------
//----------------------

// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Patata',
        precio: 1,
        imagen: './img_tipoA/patata.jpg'
    },
    {
        id: 2,
        nombre: 'Cebolla',
        precio: 1.5,
        imagen: './img_tipoA/cebolla.jpg'
    },
    {
        id: 3,
        nombre: 'Calabacin',
        precio: 2.15,
        imagen: './img_tipoA/calabacin.jpg'
    },
    {
        id: 4,
        nombre: 'Fresas',
        precio: 0.9,
        imagen: './img_tipoA/fresas.jpg'
    }
    ,
    {
        id: 5,
        nombre: 'Tomate',
        precio: 1.9,
        imagen: './img_tipoA/tomate.jpg'
    }
    ,
    {
        id: 6,
        nombre: 'Repollo',
        precio: 2.9,
        imagen: './img_tipoA/repollo.jpg'
    }
    ,
    {
        id: 7,
        nombre: 'Pasta Fresca',
        precio: 3.5,
        imagen: './img_tipoA/pastaFresca.jpg'
    }
    ,
    {
        id: 8,
        nombre: 'Pimientos',
        precio: 1.95,
        imagen: './img_tipoA/pimientos.jpg'
    }
    ,
    {
        id: 9,
        nombre: 'Aceite',
        precio: 6.9,
        imagen: './img_tipoA/aceite.jpg'
    }


];

//Array de elementos que se van metiendo en el carrito
let carrito = [];
//Precio total del carrito. Inicialmente es 0
let total = 0;
let DOMitems = ''; //Productos(items) de la tienda
let DOMcarrito = ''; //Lista de elementos que están en el carrito
let DOMtotal = ''; //total del carrito. Es un <span>
let DOMbotonVaciar = ''; //Botón que vacía el contenido del carrito
//ALMACENAMIENTO CARRITO
const miLocalStorage = window.localStorage;

function leer_DOM()
{
    DOMitems = document.querySelector('#items'); //Productos(items) de la tienda
    DOMcarrito = document.querySelector('#carrito'); //Lista de elementos que están en el carrito
    DOMtotal = document.querySelector('#total'); //total del carrito. Es un <span>
    DOMbotonVaciar = document.querySelector('#boton-vaciar'); //Botón que vacía el contenido del carrito
}
// Funciones

//VISTA
/**
 * TO-DO.Función1
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
    //HACER*******************************
    //CREA LA ESTRUCTURA EN DOMitems. Por cada producto muestra: imagen, nombre,precio, botón para añadirlo al carrito.
    //Ayuda: Ver imagen de la página final y ver Contenido HTM del nodo DOMitems para realizarlo
    let baseCard = document.getElementById("baseCard");

    // Copia la tarjeta base y la cubre con los datos de cada item
    baseDeDatos.forEach(item => {
        let card = baseCard.cloneNode(true);
        card.style.display = "";
        card.id = "";
        let cardBody = card.childNodes[1];
        console.log(cardBody.childNodes);
        cardBody.childNodes.forEach(child => {
            switch (child.nodeName) {
                case "IMG":
                    child.src = item.imagen;
                    break;
                case "H5":
                    child.textContent = item.nombre;
                    break;
                case "P":
                    child.textContent = item.precio + "€";
                    break;
                case "BUTTON":
                    child.id = item.id;
                    break;
            }
        });
        DOMitems.appendChild(card);
    });
}

/**
 * TO-DO.Función2
 * Evento para añadir un producto al carrito de la compra
 */
function anhadirProductoAlCarrito(idProduct) {
    
    //HACER*******************************
    //Añadir los id del producto al array carrito

    // Busca al item con el id dado y lo añade al carrito
    carrito.push(idProduct);

    // Calculo el total
    calcularTotal();
    // Guardamos el nuevo carrito en localStorage
    guardarCarritoEnLocalStorage();
    // Actualizamos el carrito en pantalla
    renderizarCarrito();
    
}

/**
 * TO-DO.Función3
 * Dibuja todos los productos guardados en el carrito en el ul con id='carrito'
 */
function renderizarCarrito() {
    //HACER*******************************
    //CREA LA ESTRUCTURA EN DOMcarrito. 
    //Muestra el NÚMERO DE ELEMENTOS DE CADA PRODUCTO x NOMBRE PRODUCTO - PRECIO
    //de cada producto que hay en el carrito.
    //Ayuda: Ver imagen del carrito con productos y ver Contenido HTM del nodo DOMcarrito para realizarlo
    

    // Recorre todo el carrito, crea los nodos HTML correspondientes y los añade a la lista newChildNodes.
    let newChildNodes = [];
    baseDeDatos.forEach(item => {
        if (carrito.filter(product => product == item.id).length > 0) {
            let quantity = carrito.filter(product => product == item.id).length;
            let li = document.createElement("li");
            let deleteButton = document.createElement("button");
        
            li.className = "list-group-item text-right mx-2";
            li.textContent = quantity + " x " + item.nombre + " - " + item.precio + "€";

            deleteButton.textContent = "X";
            deleteButton.addEventListener('click', () => {
                borrarItemCarrito(item.id);
            })
            deleteButton.className = "btn btn-danger mx-5";
            li.appendChild(deleteButton);
            newChildNodes.push(li);
        }
    });
    // Remplaza todos los nodos hijos del carrito con los nuevos actualizados
    DOMcarrito.replaceChildren(...newChildNodes);
}

/**
 * TO-DO.Función4
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(idProduct) {

      //HACER*******************************   
      // Borramos el producto indicado del carrito y mostramos los que quedan
    
    // Guarda todos los pruductos del carrito cuya id no sea la del producto a eliminar y elimina el resto
    carrito = carrito.filter(item => item != idProduct);


    // Guardamos el nuevo carrito en localStorage
    guardarCarritoEnLocalStorage();
    // volvemos a renderizar
    renderizarCarrito();
    // Calculamos de nuevo el precio
    calcularTotal();
}

/**
 * TO-DO.Función5
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Limpiamos precio anterior

    // Sumamos a total el precio de cada uno de los productos en el carrito
    let total = 0;
    baseDeDatos.forEach(item => {
        let quantity = carrito.filter(product => product == item.id).length;
        total += item.precio * quantity;
    });
    DOMtotal.textContent = total;

     //HACER*******************************
     //Calculamos el precio total de los productos que están en el carrito.
     //Imprimimos el precio en DOMtotal con dos decimales máximo


}

/**
 * TO-DO.Función6
 * Vacia el carrito y el miLocalStorage y vuelve a dibujarlo
 */
function vaciarCarrito() {
     //HACER*******************************
    // Limpiamos los productos guardados en el carrito
    // Limpiamos el objeto Storage miLocalStorage
    
    // Se vacía el carrito
    carrito = [];


    // Guardamos el nuevo carrito en localStorage
    guardarCarritoEnLocalStorage();
    // Finalmente Renderizamos los cambios
    renderizarCarrito();
    calcularTotal();
}


/**
 * TO-DO.Función7 
 * GUARDA EL CARRITO EN localStorage y lo recupera al inicial la página */
function guardarCarritoEnLocalStorage () {

     //HACER*******************************
     //Guarda el carrito en miLocalStorage. Debe ser en JSON pues carrito es un array.
    
    // Guarda el carrito en formato JSON en el localStorage
    miLocalStorage.setItem("carrito", JSON.stringify(carrito));
}

//TO-DO.Función8
function cargarCarritoDeLocalStorage () {
    //HACER*******************************
    // Lo que hace es cargar el array carrito. Es decir,
    //Recupera el carrito almacenado en miLocalStorage y asígnaselo al array carrito.
    //comprueba previamente si hay un carrito guardado en la variable miLocalStorage

    // Sacamos el carrito del localStorage en formato JSON y lo convertimos a array. Si el localStorage no tiene carrito, lo inicializa a array vacía.
    carrito = JSON.parse(miLocalStorage.getItem("carrito")) ?? [];
    // Calculamos el total de precio del carrito
    calcularTotal();
}

// CONTROLADOR
// Parte que controla la aplicación.
document.addEventListener('DOMContentLoaded',
    () => {
        // Crea el usuario en localStorage si no existe
        if (miLocalStorage.getItem("user") === null) {
            miLocalStorage.setItem("user", JSON.stringify(["usuario", "contraseña"]));
        }

        // Al hacer click en login, comprueba que el usuario y la contraseña coincidan con los guardados en localStorage y, de ser así, muestra la tienda
        document.getElementById("loginButton").addEventListener('click', () => {
            let userName = document.getElementById("user").value;
            let userPassword = document.getElementById("password").value;
            let user = JSON.parse(miLocalStorage.getItem("user"));

            if (userName === user[0] && userPassword === user[1]) {
                document.getElementById("login").style.display = "none";
                document.getElementById("tienda").style.display = "";
            } else {
                document.getElementById("errorText").style.display = "";
            }
        })
        
        leer_DOM();
        cargarCarritoDeLocalStorage();
        renderizarCarrito();
        renderizarProductos();
        DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    }
)

