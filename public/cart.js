document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');

    // Retrieve cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Display cart items with Remove buttons
    storedCartItems.forEach((item, index) => {
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
    });

    // Display total
    const storedTotal = localStorage.getItem('cartTotal');
    if (storedTotal) {
        totalElement.textContent = storedTotal;
    }
});

function removeFromCart(index) {
    // Retrieve cart items from localStorage
    let storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (index >= 0 && index < storedCartItems.length) {
        // Remove the item from the storedCartItems array
        const removedItem = storedCartItems.splice(index, 1)[0];

        // Update localStorage with the modified storedCartItems
        localStorage.setItem('cartItems', JSON.stringify(storedCartItems));

        // Refresh the cart display
        updateCartDisplay(storedCartItems);

        // Update the total by subtracting the removed item's price
        let total = parseFloat(localStorage.getItem('cartTotal')) || 0;
        total -= removedItem.price;
        localStorage.setItem('cartTotal', total.toFixed(2));

        // Update the total element in the UI
        const totalElement = document.getElementById('cart-total');
        totalElement.textContent = total.toFixed(2);
    }
}

function updateCartDisplay(cartItems) {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    // Display cart items with Remove buttons
    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name } - $${ item.price }`;

        // Create a "Remove" button for each item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFromCart(index));


        removeButton.classList.add('remove-button');

        // Append the button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the cart list
        cartList.appendChild(listItem);
    });
}

