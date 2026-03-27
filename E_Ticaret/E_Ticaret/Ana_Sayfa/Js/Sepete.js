document.addEventListener('DOMContentLoaded', function() {
    const cartButtons = document.querySelectorAll('.cart-btn');

    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product-card');
            const productName = product.querySelector('.product-image img').alt;
            const productImage = product.querySelector('.product-image img').src;

            // Create a cart item object
            const cartItem = {
                name: productName,
                image: productImage,
                quantity: 1
            };

            // Get cart from localStorage or initialize it
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if the product is already in the cart
            const existingItemIndex = cart.findIndex(item => item.name === productName);
            if (existingItemIndex > -1) {
                // If the product is already in the cart, increase the quantity
                cart[existingItemIndex].quantity += 1;
            } else {
                // Otherwise, add the new product to the cart
                cart.push(cartItem);
            }

            // Save the updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Provide feedback to the user
            alert(`${productName} sepete eklendi!`);
        });
    });
});