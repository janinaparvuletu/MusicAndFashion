// Function to apply filters
function applyFilters() {
    const category = document.getElementById('category').value;
    const priceRange = document.getElementById('price').value;

    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productCategory = card.getAttribute('data-category');
        const productPrice = parseFloat(card.getAttribute('data-price'));

        const isCategoryMatch = category ? productCategory === category : true;
        const isPriceMatch = 
            (priceRange === 'low' && productPrice < 50) ||
            (priceRange === 'mid' && productPrice >= 50 && productPrice <= 100) ||
            (priceRange === 'high' && productPrice > 100) ||
            priceRange === ''; // Allow showing all products if no price range is selected

        // Show or hide product card based on filter criteria
        if (isCategoryMatch && isPriceMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Function to toggle the cart modal visibility
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = (cartModal.style.display === 'block') ? 'none' : 'block';
}

// Function to add item to the cart
const cart = [];
function addToCart(button) {
    const productCard = button.closest('.product-card');
    const productId = productCard.getAttribute('data-id');
    const productName = productCard.getAttribute('data-name');
    const productPrice = parseFloat(productCard.getAttribute('data-price'));

    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1 // Default quantity when adding for the first time
    };

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex === -1) {
        // If the product is not in the cart, add it
        cart.push(product);
    } else {
        // If the product already exists, increase the quantity
        cart[existingProductIndex].quantity++;
    }

    updateCartDisplay();
}

// Function to remove one unit from the cart
function removeOneFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1); // If quantity is 1, remove the item from the cart
    }
    updateCartDisplay();
}

// Function to add one more item to the cart
function addOneToCart(index) {
    cart[index].quantity++;
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total'); // Assuming you added this for total

    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<li>No items in your cart.</li>';
        cartTotal.textContent = '$0.00';  // If cart is empty, show $0.00
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;

            // Create '+' and '-' buttons for quantity adjustments
            const addButton = document.createElement('button');
            addButton.textContent = '+';
            addButton.classList.add('quantity-btn');
            addButton.onclick = function() {
                addOneToCart(index);
            };

            const removeButton = document.createElement('button');
            removeButton.textContent = '-';
            removeButton.classList.add('quantity-btn');
            removeButton.onclick = function() {
                removeOneFromCart(index);
            };

            // Append buttons to the cart item
            cartItem.appendChild(addButton);
            cartItem.appendChild(removeButton);
            cartItems.appendChild(cartItem);

            total += item.price * item.quantity; // Update the total price
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;  // Display the total price
    }

    cartCount.textContent = cart.length;  // Update the number of items in the cart
}

// Function to zoom the image
function zoomImage(img) {
    const zoomContainer = document.getElementById('zoom-container');
    const zoomedImage = document.getElementById('zoomed-img');
    zoomedImage.src = img.src;
    zoomContainer.style.display = 'flex';
}

// Function to close the zoomed image container
function closeZoom() {
    const zoomContainer = document.getElementById('zoom-container');
    zoomContainer.style.display = 'none';
}
