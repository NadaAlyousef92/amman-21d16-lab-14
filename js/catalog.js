/* global Product, Cart */

'use strict';

let mainEl = document.getElementsByTagName('main')[0];
let sectionEl = document.createElement('section');
mainEl.appendChild(sectionEl);

// Set up an empty cart for use on this page.
const cart = new Cart([]);
// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    let optionEl = document.createElement('option');
    selectElement.appendChild(optionEl);
    optionEl.textContent = Product.allProducts[i].name;
    optionEl.value = Product.allProducts[i].name;
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
  confirmMsg();
}

function confirmMsg() {
  sectionEl.id = 'message';
  sectionEl.textContent = 'Added to Cart!';
}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  let selectElementItem = document.getElementById('items');
  let selectIndexItem = selectElementItem.selectedIndex;
  let product = selectElementItem.options[selectIndexItem].value;
  // TODO: get the quantity
  let quantity = document.getElementById('quantity').value;
  // TODO: using those, add one item to the Cart
  cart.addItem(product, quantity);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  let updateEl = document.getElementById('itemCount');
  updateEl.textContent = cart.items.length;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
  let divEl = document.getElementById('cartContents');
  let articleEl = document.createElement('article');
  divEl.appendChild(articleEl);
  articleEl.textContent = `The Product: ${cart.items[[cart.items.length - 1]].product}, The Quantity: ${cart.items[[cart.items.length - 1]].quantity}`;
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
