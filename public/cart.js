cart1 = JSON.parse(localStorage.getItem("sharedCart")) || [];

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
      cart1.splice(index, 1); // remove the whole item
    }
  
    saveCart();
    updateCartDisplay(); // must be called AFTER cart1 is updated
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
    cartTotal.textContent = `$0.00`; // ✅ force reset total when empty
    cartCount.textContent = `0`;
    return; // ✅ stop further processing
  }

  cart1.forEach((item, index) => {
    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <span class="cart-name">${item.name}</span>
      <div class="cart-controls">
        <button onclick="removeOneFromCart(${index})" class="cart-btn-small">−</button>
        <span class="cart-quantity">${item.quantity}</span>
        <button onclick="addOneToCart(${index})" class="cart-btn-small">+</button>
      </div>
      <span class="cart-price">$${(item.price * item.quantity).toFixed(2)}</span>
    `;

    cartItems.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
  cartCount.textContent = cart1.reduce((sum, item) => sum + item.quantity, 0);
}



window.addEventListener("load", () => {
    updateCartDisplay();
});
