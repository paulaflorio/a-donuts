$(document).ready(function(){
    productsJSON();

    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"));

        crearCarrito();
    }

    crearFooter();
});

// PRODUCTS JSON 

function productsJSON(){
    const URLJSON = "./data/products.json";

    $.getJSON(URLJSON, function(respuesta, estado){
        console.log(estado);
        if (estado === "success"){
            let productos = respuesta.productos;
            for (const producto of productos){
                $('#products').append(`
                                        <div class="box">
                                            <div class="box-img">
                                                <img src=${producto.imgsrc} alt="" class="prod-img">
                                            </div>
                                            <h2 class="prod-name">${producto.name}</h2>
                                            <h3>Tasty Food</h3>
                                            <div>
                                            <span>$</span>
                                            <span class="prod-price">${producto.price}</span>
                                            </div>
                                            <a id="btn${producto.id}" data-id="${producto.id}" class="add-btn">
                                            add to cart
                                            </a>
                                         </div>   
                `)
            }
        }
    })
}

let products = document.getElementById("products");

products.addEventListener('click', e => {
    addCarrito(e);
})

let item = document.getElementById("item");
item.addEventListener('click', e => {
    accionarBotones(e);
})

let carrito = {};

const addCarrito = e => {
    if(e.target.classList.contains("add-btn")){
        setCarrito(e.target.parentElement);

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Item added to cart',
            showConfirmButton: false,
            timer: 1500
        });
    }

    e.stopPropagation();
}

const setCarrito = objeto => {
    // console.log(objeto);

    const producto = {
        id : objeto.querySelector(".add-btn").dataset.id,
        nombre : objeto.querySelector(".prod-name").textContent,
        precio : objeto.querySelector('.prod-price').textContent,
        imgsrc : objeto.querySelector('.prod-img').getAttribute("src"),
        cantidad : 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }

    carrito[producto.id] = {...producto};

    crearCarrito();

    crearFooter();

    calcularCantItems();
}

const crearCarrito = () => {
    $('#item').empty();

    Object.values(carrito).forEach(producto => {
        let subtotal = producto.precio * producto.cantidad;

            $('#item').append(`
            <div class="prod" id="fila${producto.id}">
                <img src=${producto.imgsrc} alt="" class="prod__img">
                <div class="prod__content">
                    <span class="prod__content__title">${producto.nombre}</span>
                    <span class="prod__content__price" >$${subtotal}</span>
                </div>
                <div class="prod__quantity">
                    <i class="bx bx-chevron-up prod__quantity__btn" data-id="${producto.id}"></i>
                    <span class="prod__quantity__num">${producto.cantidad}</span>
                    <i class="bx bx-chevron-down prod__quantity__btn" data-id="${producto.id}"></i>
                </div>
                <i class="bx bx-trash prod__remove remove" data-id="${producto.id}"></i>
            </div>
            `)
    })

    crearFooter();

    localStorage.setItem("carrito", JSON.stringify(carrito));
    
}

const crearFooter = () => {
    $('#cart-footer').empty();

    if(Object.keys(carrito).length === 0){
        $('#cart-footer').append(`<h3 class="cart-text">Your cart is empty</h3>`);
        return
    }

    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0);

    calcularCantItems();

    $('#cart-footer').append(`<div class="details">
                                <span class="details__text">Total</span>
                                <span class="details__total">$${nPrecio}</span>
                            </div>
                            <div class="btn-footer">
                                <button id="btn-clear" class="btn-footer__item">Clear Shopping Cart</button>
                                <button class="btn-footer__item" id="btn-checkout">Checkout</button>
                            </div>`)

    $('#btn-clear').on("click", () => {
        carrito = {};
        crearCarrito();
        calcularCantItems();
    })

    $('#btn-checkout').on("click", () => {
        carrito = {};
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your purchase was succesful!',
            showConfirmButton: false,
            timer: 1500
        });
        crearCarrito();
        calcularCantItems();
    })
}

const calcularCantItems = () =>{
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0);
    $(".num-items").html(nCantidad);
}

const accionarBotones = e => {
    if(e.target.classList.contains('bx-chevron-up')){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1;
        carrito[e.target.dataset.id]= {...producto};

        crearCarrito();

        calcularCantItems();
    }

    if(e.target.classList.contains("bx-chevron-down")){
        const producto = carrito[e.target.dataset.id];
        // producto.cantidad = carrito[e.target.dataset.id].cantidad - 1;
        producto.cantidad--;

        if(producto.cantidad == 0){
            delete carrito[e.target.dataset.id];
        }

        crearCarrito();

        calcularCantItems();
    }

    if(e.target.classList.contains('remove')){
        const producto = carrito[e.target.dataset.id];
        delete carrito[e.target.dataset.id];

        crearCarrito();

        calcularCantItems();
    }

    e.stopPropagation();
}