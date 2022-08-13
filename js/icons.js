// SHOW MENU
const menu = document.getElementById('menu');
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');

if(menuToggle){
    menuToggle.addEventListener('click', () => {
        menu.classList.add('show-menu');
    })
}

if(menuClose){
    menuClose.addEventListener('click', () => {
        menu.classList.remove('show-menu');
    })
}

// CLICK LINK 
const navLink = document.querySelectorAll('.menu-link');

function linkAction(){
    const menu = document.getElementById('menu');
    menu.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));


// SHOW CART 

// const cartSection = document.getElementById('carrito');
// const cartOpen = document.getElementById('cart-open');
// const cartClose = document.getElementById('cart-close');

// if(cartOpen){
//     cartOpen.addEventListener('click', () => {
//         cartSection.classList.add('carrito-active');
//     })
// }

// if(cartClose){
//     cartClose.addEventListener('click', () => {
//         cartSection.classList.remove('carrito-active');
//     })
// }

// DARKMODE 

let darkmode = document.querySelector("#darkmode");

darkmode.addEventListener('click', () => {
    if(darkmode.classList.contains('bx-moon')){
        darkmode.classList.replace('bx-moon', 'bx-sun');
        document.body.classList.add("dark");
    } else {
        darkmode.classList.replace('bx-sun', 'bx-moon');
        document.body.classList.remove('dark');
    }
})