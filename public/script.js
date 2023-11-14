let cartItems = [];

function addToCart(productId, productName, productPrice) {
    const item = { id: productId, name: productName, price: productPrice };
    cartItems.push(item);
    updateCart();

    // Store cartItems in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

document.addEventListener('DOMContentLoaded', () => {
    // Fetch products and populate the product list
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<span>${product.name} - $${product.price}</span> <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>`;
                productList.appendChild(listItem);
            });
        });

    // Fetch cart items and update the cart
    fetch('/api/cart')
        .then(response => response.json())
        .then(cartItems => {
            cartItems.forEach(item => {
                addToCart(item.productId, item.name, item.price);
            });
            updateCart(); // Call updateCart to display the cart items
        });
    // Retrieve the total from localStorage and update the totalElement
    const totalElement = document.getElementById('cart-total');
    const storedTotal = localStorage.getItem('cartTotal');
    if (storedTotal) {
        totalElement.textContent = storedTotal;
    }
});

function removeFromCart(index) {
    if (index >= 0 && index < cartItems.length) {
        // Remove the item from the cartItems array
        cartItems.splice(index, 1);

        // Update the cart display
        updateCart();

        // Update localStorage with the modified cartItems
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
}


function updateCart() {
    const cartList = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    let total = 0;

    // Clear the existing cart items
    cartList.innerHTML = '';

    // Populate the cart with items
    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price}`;

        // Create a "Remove" button for each item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFromCart(index));

        // Append the button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the cart list
        cartList.appendChild(listItem);

        total += item.price;
    });

    // Update the total price
    totalElement.textContent = total;

    // Store the total in localStorage
    localStorage.setItem('cartTotal', total);
}
