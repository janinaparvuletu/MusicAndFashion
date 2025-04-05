const cart1 = JSON.parse(localStorage.getItem("sharedCart")) || [];

function saveCart() {
    localStorage.setItem("sharedCart", JSON.stringify(cart1));
}

function addToCartGood(product) {
    const existing = cart1.find(item => item.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart1.push({ ...product, quantity: 1 });
    }
    saveCart();
    console.log(cart1)
    updateCartDisplay();
}

function removeOneFromCart(index) {
    if (cart1[index].quantity > 1) {
        cart1[index].quantity--;
    } else {
        cart1.splice(index, 1);
    }
    saveCart();
    updateCartDisplay();
}

function addOneToCart(index) {
    cart1[index].quantity++;
    saveCart();
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    if (!cartItems || !cartCount || !cartTotal) return;

    cartItems.innerHTML = '';
    let total = 0;

    if (cart1.length === 0) {
        cartItems.innerHTML = '<li>No items in your cart.</li>';
        cartTotal.textContent = 'Total: $0.00';
    } else {
        cart1.forEach((item, index) => {
            if (!item || typeof item.price !== 'number') {
                console.warn('Invalid cart item:', item);
                return;
            }
        
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        
            const addBtn = document.createElement('button');
            addBtn.textContent = '+';
            addBtn.onclick = () => addOneToCart(index);
        
            const removeBtn = document.createElement('button');
            removeBtn.textContent = '-';
            removeBtn.onclick = () => removeOneFromCart(index);
        
            cartItem.appendChild(addBtn);
            cartItem.appendChild(removeBtn);
        
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });
        

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    cartCount.textContent = cart1.reduce((sum, item) => sum + item.quantity, 0);
}

window.addEventListener("load", () => {
    updateCartDisplay();
});
