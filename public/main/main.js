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

// Add product to cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    cart.push(product);
    updateCartCount();
}
function rediraboutus()
{   
    window.location.href="/aboutus";
}
function redircontact()
{
    window.location.href="/contact";
}
// Update cart count in the header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}


//*VINYL  */

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

        //  AICI adaugi codul pentru ascunderea textului
        const popup = document.getElementById(`popup-${id}`);
        if (popup) {
            popup.classList.remove("show");
            popup.style.display = "none"; // ✨ asigură ascunderea
        }
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
    // Închide toate popup-urile
    document.querySelectorAll('.album-popup').forEach(popup => {
        popup.classList.remove("show");
        popup.style.display = "none"; // ✨ forțăm ascunderea
    });

    // Afișează doar popup-ul activ
    const popup = document.getElementById(`popup-${id}`);
    if (popup) {
        popup.style.display = "flex"; // ✨ forțăm afișarea
        popup.classList.add("show");
    }
}


function closeAlbumPopup(id) {
    const popup = document.getElementById(`popup-${id}`);
    if (popup) {
        popup.classList.remove("show");
    }
}

/*final melodii */
    







/*final melodii */
    


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
    window.location.href="/fashion";
}


// Intersection Observer to reveal albums on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // optional: stop observing after it appears
        }
    });
}, {
    threshold: 0.1
});

// Apply observer to all album elements
document.querySelectorAll('.album').forEach(album => {
    observer.observe(album);
});

document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("checkbox");
    const body = document.body;
  
    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark");
      checkbox.checked = true;
    }
  
    // Toggle theme on click
    checkbox.addEventListener("change", () => {
      body.classList.toggle("dark");
      const mode = body.classList.contains("dark") ? "dark" : "";
      localStorage.setItem("theme", mode);
    });
  });

  