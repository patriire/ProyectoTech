// script.js

// Validación del formulario
const form = document.getElementById("contact-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !email || !mensaje) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Por favor, ingresa un correo válido.");
        return;
    }

    alert("Formulario enviado con éxito.");
    form.reset();
});

// Fetch API para obtener productos
// Seleccionar el contenedor de productos
const productosContainer = document.getElementById("productos-container");

// Obtener productos desde la API
fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
        // Filtrar solo productos de ropa
        const productosRopa = data.filter(
            (producto) => producto.category === "men's clothing" || producto.category === "women's clothing"
        );

        // Mostrar los productos filtrados
        mostrarProductos(productosRopa);
    })
    .catch((error) => {
        console.error("Error al obtener los productos:", error);
        productosContainer.innerHTML = "<p>Error al cargar los productos.</p>";
    });

// Mostrar productos en tarjetas
function mostrarProductos(productos) {
    productosContainer.innerHTML = ""; // Limpiar contenedor
    productos.forEach((producto) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-item");

        productCard.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p>$${producto.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${producto.id}">Añadir al Carrito</button>
        `;

        productosContainer.appendChild(productCard);
    });

    // Añadir eventos a los botones "Añadir al carrito"
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) =>
        button.addEventListener("click", agregarAlCarrito)
    );
}

// Función para manejar el carrito de compras
function agregarAlCarrito(e) {
    const productId = e.target.dataset.id;

    const productoExistente = carrito.find((item) => item.id == productId);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const productoSeleccionado = productos.find((item) => item.id == productId);
        const producto = {
            id: productoSeleccionado.id,
            titulo: productoSeleccionado.title,
            precio: productoSeleccionado.price,
            cantidad: 1,
        };
        carrito.push(producto);
    }

    actualizarCarrito();
    actualizarContadorCarrito();
}

// const productosContainer = document.getElementById("productos-container");

// fetch("https://fakestoreapi.com/products") // Reemplaza con tu API si es necesario
//     .then((response) => response.json())
//     .then((data) => {
//         mostrarProductos(data);
//     })
//     .catch((error) => {
//         console.error("Error al obtener los productos:", error);
//         productosContainer.innerHTML = "<p>Error al cargar los productos.</p>";
//     });

// function mostrarProductos(productos) {
//     productos.forEach((producto) => {
//         const productCard = document.createElement("div");
//         productCard.classList.add("product-item");

//         productCard.innerHTML = `
//             <img src="${producto.image}" alt="${producto.title}">
//             <h3>${producto.title}</h3>
//             <p>$${producto.price.toFixed(2)}</p>
//             <button class="add-to-cart" data-id="${producto.id}">Añadir al Carrito</button>
//         `;

//         productosContainer.appendChild(productCard);
//     });

//     // Añadir eventos a los botones "Añadir al carrito"
//     const addToCartButtons = document.querySelectorAll(".add-to-cart");
//     addToCartButtons.forEach((button) =>
//         button.addEventListener("click", agregarAlCarrito)
//     );
// }

// // Carrito de compras dinámico
// let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// function agregarAlCarrito(e) {
//     const productId = e.target.dataset.id;

//     const productoExistente = carrito.find((item) => item.id === productId);
//     if (productoExistente) {
//         productoExistente.cantidad++;
//     } else {
//         const producto = {
//             id: productId,
//             titulo: e.target.parentElement.querySelector("h3").textContent,
//             precio: parseFloat(
//                 e.target.parentElement.querySelector("p").textContent.slice(1)
//             ),
//             cantidad: 1,
//         };
//         carrito.push(producto);
//     }

//     actualizarCarrito();
// }

// function actualizarCarrito() {
//     const carritoContenido = document.getElementById("carrito-contenido");
//     const totalCompra = document.getElementById("total");

//     carritoContenido.innerHTML = "";
//     let total = 0;

//     carrito.forEach((producto) => {
//         const item = document.createElement("div");
//         item.classList.add("cart-item");

//         item.innerHTML = `
//             <p>${producto.titulo}</p>
//             <p>Cantidad: ${producto.cantidad}</p>
//             <p>Precio: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
//             <button class="remove-from-cart" data-id="${producto.id}">Eliminar</button>
//         `;

//         carritoContenido.appendChild(item);

//         total += producto.precio * producto.cantidad;
//     });

//     totalCompra.textContent = total.toFixed(2);

//     // Guardar carrito en localStorage
//     localStorage.setItem("carrito", JSON.stringify(carrito));

//     // Añadir eventos a los botones "Eliminar"
//     const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
//     removeFromCartButtons.forEach((button) =>
//         button.addEventListener("click", eliminarDelCarrito)
//     );
// }

// function eliminarDelCarrito(e) {
//     const productId = e.target.dataset.id;
//     carrito = carrito.filter((item) => item.id !== productId);
//     actualizarCarrito();
// }

// // Actualizar carrito al cargar la página
// actualizarCarrito();
