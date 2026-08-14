const addToCart = require("./modules/addToCart");
const removeFromCart = require("./modules/removeFromCart");
const listCart = require("./modules/listCart");
const calculateTotal = require("./modules/calculateTotal");
function runProject1() {
    console.log("=== Project 1: Simple Shopping Cart ===");
    addToCart(1); 
    addToCart(2); 
    listCart();
    calculateTotal();
    removeFromCart(2); 
    listCart();
    calculateTotal();
}
module.exports = runProject1;
