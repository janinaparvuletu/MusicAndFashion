function applyFilters() {
    const category = document.getElementById('category').value;
    const priceRange = document.getElementById('price').value;
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productCategory = card.getAttribute('data-category');
        const productPrice = parseFloat(card.getAttribute('data-price'));
        const isCategoryMatch = category ? productCategory === category : true;
        const isPriceMatch =
            (priceRange === 'low' && productPrice < 50) ||
            (priceRange === 'mid' && productPrice >= 50 && productPrice <= 100) ||
            (priceRange === 'high' && productPrice > 100) ||
            priceRange === '';

        card.style.display = (isCategoryMatch && isPriceMatch) ? 'block' : 'none';
    });
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = (cartModal.style.display === 'block') ? 'none' : 'block';
}

function addToCart(button) {
    const card = button.closest('.product-card');
    const product = {
        id: card.getAttribute('data-id'),
        name: card.getAttribute('data-name'),
        price: parseFloat(card.getAttribute('data-price')),
    };
    addToCartGood(product);
}

function zoomImage(img) {
    const zoomContainer = document.getElementById('zoom-container');
    const zoomedImage = document.getElementById('zoomed-img');
    zoomedImage.src = img.src;
    zoomContainer.style.display = 'flex';
}

function closeZoom() {
    const zoomContainer = document.getElementById('zoom-container');
    zoomContainer.style.display = 'none';
}
