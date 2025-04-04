// Sample product data
const products = [
    {
        id: 1,
        name: "Guitar",
        category: "Strings",
        price: 199.99,
        image: "https://via.placeholder.com/200x150?text=Guitar"
    },
    {
        id: 2,
        name: "Drum Kit",
        category: "Percussion",
        price: 499.99,
        image: "https://via.placeholder.com/200x150?text=Drum+Kit"
    },
    {
        id: 3,
        name: "Piano",
        category: "Keys",
        price: 799.99,
        image: "https://via.placeholder.com/200x150?text=Piano"
    },
    {
        id: 4,
        name: "Violin",
        category: "Strings",
        price: 249.99,
        image: "https://via.placeholder.com/200x150?text=Violin"
    }
];

// Function to render products dynamically


// Cart functionality
let cart = [];

// Add product to cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    cart.push(product);
    updateCartCount();
}
function rediraboutus()
{   
    window.location.href="aboutus.html";
}
function redircontact()
{
    window.location.href="contact.html";
}
// Update cart count in the header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Initialize the page
const text = "Welcome to M&F";
    const welcomeEl = document.querySelector(".welcome");
    let i = 0;

    function typeChar() {
        if (i < text.length) {
            welcomeEl.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, 100);
        }
    }

    typeChar();
    let isOut = false;

    function movevinyl(id){

    const vinyl = document.getElementById(id);
    
   
        if (!isOut) {
            vinyl.style.left = '50%';
            vinyl.classList.add('spin');
            setTimeout(() => {
                vinyl.classList.remove('spin');
            }, 10000);
            isOut = true;
        } else {
            vinyl.style.left = '0';
            isOut = false;
        }
   
}
   
    
    