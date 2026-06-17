const productos = [
    { id: 1, nombre: "Manzanas", precio: 2.50 },
    { id: 2, nombre: "Leche", precio: 3.20 },
    { id: 3, nombre: "Pan", precio: 1.80 },
    { id: 4, nombre: "Queso", precio: 5.00 },
    { id: 5, nombre: "Tomates", precio: 2.00 },
    { id: 6, nombre: "Huevos", precio: 4.50 },
    { id: 7, nombre: "Arroz", precio: 3.00 },
    { id: 8, nombre: "Aceite", precio: 6.00 }
];

let carrito = [];

function mostrarProductos() {
    const lista = document.querySelector("#productosLista");
    lista.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        let p = productos[i];
        lista.innerHTML += `
            <div class="producto-card">
                <h3>${p.nombre}</h3>
                <p class="producto-precio">$${p.precio.toFixed(2)}</p>
                <button onclick="agregarAlCarrito(${p.id})">Agregar</button>
            </div>
        `;
    }
}

function agregarAlCarrito(idProducto) {
    let productoEncontrado = null;
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === idProducto) {
            productoEncontrado = productos[i];
        }
    }

    let existeEnCarrito = null;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            existeEnCarrito = carrito[i];
        }
    }

    if (existeEnCarrito) {
        existeEnCarrito.cantidad++;
    } else {
        carrito.push({
            id: productoEncontrado.id,
            nombre: productoEncontrado.nombre,
            precio: productoEncontrado.precio,
            cantidad: 1
        });
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.querySelector("#carritoLista");
    const txtTotalPrecio = document.querySelector("#totalPrecio");
    const txtTotalCantidad = document.querySelector("#totalCantidad");

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>El carrito está vacío</p>";
        txtTotalPrecio.textContent = "0.00";
        txtTotalCantidad.textContent = "0";
        return;
    }

    listaCarrito.innerHTML = "";
    let cuentaPrecio = 0;
    let cuentaCantidad = 0;

    for (let i = 0; i < carrito.length; i++) {
        let item = carrito[i];
        listaCarrito.innerHTML += `
            <div class="carrito-item">
                <div class="carrito-item-info">
                    <h4>${item.nombre}</h4>
                    <p>$${item.precio.toFixed(2)} x ${item.cantidad}</p>
                </div>
                <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
            </div>
        `;
        cuentaPrecio += item.precio * item.cantidad;
        cuentaCantidad += item.cantidad;
    }

    txtTotalPrecio.textContent = cuentaPrecio.toFixed(2);
    txtTotalCantidad.textContent = cuentaCantidad;
}

function eliminarDelCarrito(idProducto) {
    let nuevoCarrito = [];
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id !== idProducto) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    carrito = nuevoCarrito;
    actualizarCarrito();
}

function limpiarCarrito() {
    carrito = [];
    actualizarCarrito();
}

document.addEventListener('DOMContentLoaded', function() {
    mostrarProductos();
    actualizarCarrito();
    document.querySelector("#limpiarCarrito").addEventListener("click", limpiarCarrito);
});