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


/*VINYL  */

let currentOpenId = null;
let originalPositions = null;

function movevinyl(id) {
    const albums = document.querySelectorAll('.album');
    const clicked = document.querySelector(`.album[onclick="movevinyl(${id})"]`);
    const vinyl = clicked.querySelector('.vinyl');

    // Salvăm pozițiile originale o singură dată
    if (!originalPositions) {
        originalPositions = {};
        albums.forEach((album, index) => {
            const albumId = album.querySelector('.vinyl').id;
            originalPositions[albumId] = index;
        });
    }

    // Dacă deja este deschis, îl închidem
    if (currentOpenId === id) {
        albums.forEach(album => {
            album.style.display = 'block';
            const albumId = album.querySelector('.vinyl').id;
            album.style.order = originalPositions[albumId];
            album.classList.remove('active-vinyl'); //  revine la dimensiunea inițială
        });
    
        albums.forEach(album => {
            const innerVinyl = album.querySelector('.vinyl');
            innerVinyl.style.left = '0'; // readuce discul în poziția de start
        });
                vinyl.classList.remove('spin');
        currentOpenId = null;
        return;
    }
    

    // Reset toate albumele
    albums.forEach(album => {
        album.style.display = 'block';
        const vinyl = album.querySelector('.vinyl');
        vinyl.style.left = '0';
        vinyl.classList.remove('spin');
        album.classList.remove('active-vinyl');  // ✨ eliminăm transformările vechi

    });
    // Pune discul în centru și pornește animația
    clicked.style.order = '-1';
    vinyl.style.left = '50%';
    vinyl.classList.add('spin');
    clicked.classList.add('active-vinyl'); 

    // Afișează doar discul activ și ascunde restul DUPĂ ce s-a centrat
   
        albums.forEach(album => {
            if (album !== clicked) {
                album.style.display = 'none';
            }
        });

    currentOpenId = id;

    // Oprește animația după 10 secunde
    setTimeout(() => {
        vinyl.classList.remove('spin');
    }, 10000);

    OpenContiner(id);

}
 /*END VINYL */

/*melodii  */

function OpenContiner(id) {
    const infoContainer = document.getElementById('vinyl-info-container');
    const infoText = document.getElementById('vinyl-info-text');

    infoContainer.classList.remove('hidden');
    setTimeout(() => {
        infoContainer.classList.add('show');
    }, 200);

    infoText.textContent = `Acesta este discul #${id}. Poți adăuga aici informații personalizate.`;
}




/*final melodii */
    
    /* horia cod*/
// Get the button and body elements
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Check if the user has previously selected a theme (stored in localStorage)
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    themeToggleButton.textContent = 'Switch to Light Mode';  // Change button text
}

// Toggle the theme when the button is clicked
themeToggleButton.addEventListener('click', function() {
    body.classList.toggle('dark');

    // Change button text based on current theme
    if (body.classList.contains('dark')) {
        themeToggleButton.textContent = 'Switch to Light Mode';
        localStorage.setItem('theme', 'dark');  // Save theme in localStorage
    } else {
        themeToggleButton.textContent = 'Switch to Dark Mode';
        localStorage.setItem('theme', 'light'); // Save theme in localStorage
    }
});

/*horia sfarsit cod*/


function profilepopup() {
    const popup = document.getElementById('profile-popup');
    popup.classList.toggle('show');
}
function closePopup() {
    const popup = document.getElementById('profile-popup');
    popup.classList.remove('show');
}
function goToMusic()
{
    window.location.href="main.html";
}
function goToFashion()
{
    window.location.href="fashion.html";
}







/*cartmodel*/
let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productElement = e.target.closest('.product');
        const productName = productElement.querySelector('h3').textContent;
        const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));

        cart.push({ name: productName, price: productPrice });
        updateCart();
    });
});

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    cartTotalContainer.textContent = total.toFixed(2);
}

document.querySelector('#cart').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'flex';
});

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}
