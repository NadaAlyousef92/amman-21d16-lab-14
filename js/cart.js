/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;
let tbodyElm;

function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {

    loadCart();
    clearCart();
    showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
    tbodyElm= table.getElementsByTagName('tbody')[0];
    tbodyElm.innerHTML='';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {


    // TODO: Find the table body
    tbodyElm = table.getElementsByTagName('tbody')[0];
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    // let tbody = document.getElementsByTagName('tbody');
    // TODO: Iterate over the items in the cart

    for (let i = 0; i < cart.items.length; i++) {
        let product = crat.items[i].product;
        let quantity = cart.item[i].quantity;

        new CartItem (product, quantity);

        // TODO: Create a TR
        
        let tr = document.createElement('tr');

        // TODO: Create a TD for the delete link, quantity,  and the item

        let removeTd = document.createElement('td');
        
        removeTd.id=`${i}`;
        removeTd.textContent = 'x';
        
        let quantityTd = document.createElement('td');
       
        quantityTd.textContent = `${cart.items[i].quantity}`;

        let itemTd = document.createElement('td');

        itemTd.textContent = `${cart.items[i].product}`;

        tbodyElm.appendChild(tr);
        tr.appendChild(removeTd);
        tr.appendChild(quantityTd);
        tr.appendChild(itemTd);
    }
}

function removeItemFromCart(event) {

    // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item


    if (event.target.textContent === 'x') {
        cart.removeItem(event.target.id);
    }



    // TODO: Save the cart back to local storage
    localStorage.setItem(cart, JSON.stringify(cart.items));

    // TODO: Re-draw the cart table
    renderCart();

}

// This will initialize the page and draw the cart on screen
renderCart();