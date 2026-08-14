const cart = require("../data/cart");
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        const removed = cart.splice(index, 1);
        console.log(`Removed "${removed[0].name}" from cart.`);
    } else {
        console.log(`Item with ID ${productId} not in cart.`);
    }
}
module.exports = removeFromCart;
