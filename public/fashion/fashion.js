// Store cart data in an array
let cart = [];

// Store all products data
const allProducts = [
    {
        id: 1,
        name: "Cool Drip Hoodie",
        price: 45.00,
        category: "Clothing",
        element: document.querySelector('[data-id="1"]')
    },
    {
        id: 2,
        name: "Drip Sneakers",
        price: 85.00,
        category: "Shoes",
        element: document.querySelector('[data-id="2"]')
    },
    {
        id: 3,
        name: "Street Drip T-shirt",
        price: 25.00,
        category: "Clothing",
        element: document.querySelector('[data-id="3"]')
    },
    // Add other products here...
];

// Function to apply the filters
function applyFilters() {
    const category = document.getElementById('category').value;
    const priceRange = document.getElementById('price').value;

    // Loop through all products and hide/show based on filters
    allProducts.forEach(product => {
        const isCategoryMatch = category ? product.category === category : true;
        const isPriceMatch = (priceRange === 'low' && product.price < 50) ||
                             (priceRange === 'mid' && product.price >= 50 && product.price <= 100) ||
                             (priceRange === 'high' && product.price > 100) ||
                             (priceRange === '') ? true : false;

        // If product matches both filters, show it; otherwise, hide it
        if (isCategoryMatch && isPriceMatch) {
            product.element.style.display = 'block';
        } else {
            product.element.style.display = 'none';
        }
    });
}

// Function to add item to the cart
function addToCart(button) {
    const productCard = button.closest('.product-card');
    const productId = productCard.getAttribute('data-id');
    const productName = productCard.getAttribute('data-name');
    const productPrice = parseFloat(productCard.getAttribute('data-price'));

    const product = {
        id: productId,
        name: productName,
        price: productPrice
    };

    cart.push(product);
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<li>No items in your cart.</li>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItems.appendChild(cartItem);
        });
    }

    cartCount.textContent = cart.length;
}

// Function to toggle the cart modal visibility
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = (cartModal.style.display === 'block') ? 'none' : 'block';
}

// Function to close the zoomed image container
function closeZoom() {
    document.getElementById('zoom-container').style.display = 'none';
}

// Function to zoom an image
function zoomImage(image) {
    const zoomContainer = document.getElementById('zoom-container');
    const zoomedImg = document.getElementById('zoomed-img');
    zoomedImg.src = image.src;
    zoomContainer.style.display = 'block';
}
