/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
let table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

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

function fillForm() {
    const formArr = ['Name', 'Street', 'City', 'State', 'ZIP code', 'Phone Number'];
    let mainEl = document.getElementsByTagName('main')[0];
    
    let sectionEl = document.createElement('section');
    mainEl.appendChild(sectionEl);
    
    let formEl = document.createElement('form');
    sectionEl.appendChild(formEl);
    
    let fieldsetEl = document.createElement('fieldset');
    formEl.appendChild(fieldsetEl);
    
    let legendEl = document.createElement('legend');
    fieldsetEl.appendChild(legendEl);

    legendEl.textContent = 'Add your Info';
    
    for (let i = 0; i < formArr.length; i++) {
      let pEl = document.createElement('p');
      fieldsetEl.appendChild(pEl);
      let labelEl = document.createElement('label');
      pEl.appendChild(labelEl);
      labelEl.for = formArr[i];
      labelEl.textContent = formArr[i];
      let inputEl = document.createElement('input');
      pEl.appendChild(inputEl);
      inputEl.type = 'text';
      inputEl.id = formArr[i];
      inputEl.placeholder = formArr[i];
    }
    
    let pEl = document.createElement('p');
    fieldsetEl.appendChild(pEl);
    
    let labelEl = document.createElement('label');
    pEl.appendChild(labelEl);
    labelEl.for = 'creditCard';
    labelEl.textContent = 'Credit Card Number:';
    
    let inputEl = document.createElement('input');
    pEl.appendChild(inputEl);
    inputEl.type = 'number';
    inputEl.id = 'creditCard';
    inputEl.placeholder = 'Enter 16 digits';
    inputEl.maxLength = 16;
    
    let buttonEl = document.createElement('button');
    fieldsetEl.appendChild(buttonEl);
    buttonEl.textContent = 'Process Order';
  
  }

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
    let tbEl = document.getElementsByTagName('tbody')[0];
    tbEl.textContent ='';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
   
  // TODO: Find the table body
  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
  // TODO: Fill in the <tr>'s under the <tbody> for each item in the cart

  let tbEl = document.getElementsByTagName('tbody')[0];
  for (let i = 0; i < cart.items.length; i++) {
    let trEl = document.createElement('tr');
    tbEl.appendChild(trEl);
    
    let tdElDelete = document.createElement('td');
    let tdElItem = document.createElement('td');
    trEl.appendChild(tdElDelete);

    let tdElQuantity = document.createElement('td');
    let tdElPic = document.createElement('td');
    trEl.appendChild(tdElQuantity);

    tdElDelete.innerHTML = `<a id="remove${i}">X</a>`;
    tdElItem.textContent = cart.items[i].product;
    trEl.appendChild(tdElItem);

    tdElQuantity.textContent = cart.items[i].quantity;
    let imgEl = document.createElement('img');
    imgEl.id = 'itemImg';
    tdElPic.appendChild(imgEl);

    trEl.appendChild(tdElPic);
    for (let m = 0; m < Product.allProducts.length; m++) {
      if (cart.items[i].product === Product.allProducts[m].name) {
        imgEl.src = `${Product.allProducts[m].filePath}`;
        break;
      }
    }
  }
}

function removeItemFromCart(event) {
// TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
// TODO: Re-draw the cart table
let removeArr = document.getElementsByTagName('a');

for (let i = 0; i < removeArr.length; i++) {
  if (event.target.id === `remove${i}`) {
    cart.removeItem(cart.items[i]);
    break;
  }
}
// TODO: Save the cart back to local storage
  cart.saveToLocalStorage();
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
fillForm();
