const products = require("../data/products");
const cart = require("../data/cart");
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        console.log(`Added "${product.name}" to cart.`);
    } else {
        console.log(`Product with ID ${productId} not found.`);
    }
}
module.exports = addToCart;
