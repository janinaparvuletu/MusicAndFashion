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
    if (product) {
        addToCartGood({
            id: product.id,
            name: product.name,
            price: product.price
        });
    }
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
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}


//*VINYL  */

// Updated movevinyl to handle open on album click and close on cover click only

let currentOpenId = null;
let originalPositions = null;

function movevinyl(event, id) {
    const clicked = event.currentTarget;

    // Detect if user clicked the .cover
    const isCoverClick = event.target.classList.contains("cover");

    const albums = document.querySelectorAll('.album');
    const vinyl = clicked.querySelector('.vinyl');
    const buyBtn = document.getElementById(`buy-album-${id}`);

    if (!originalPositions) {
        originalPositions = {};
        albums.forEach((album, index) => {
            const albumId = album.querySelector('.vinyl').id;
            originalPositions[albumId] = index;
        });
    }

    // CLOSE if cover clicked and this album is already open
    if (isCoverClick && currentOpenId === id) {
        albums.forEach(album => {
            album.style.display = 'block';
            const albumId = album.querySelector('.vinyl').id;
            album.style.order = originalPositions[albumId];
            album.classList.remove('active-vinyl');
            document.getElementById(`buy-album-${id}`).style.display = "none";
        });

        albums.forEach(album => {
            const innerVinyl = album.querySelector('.vinyl');
            innerVinyl.style.left = '0';
        });

        vinyl.classList.remove('spin');

        const audio = document.getElementById('dynamic-player');
        audio.pause();
        audio.currentTime = 0;

        document.querySelectorAll('.vinyl.spin').forEach(v => v.classList.remove('spin'));

        const popup = document.getElementById(`popup-${id}`);
        if (popup) {
            popup.classList.remove("show");
            popup.style.display = "none";
        }

        const extraBtn = document.getElementById(`extra-btn-${id}`);
        if (extraBtn) {
            extraBtn.classList.remove("visible");
        }

        currentOpenId = null;
        return;
    }

    // OPEN if not already opened or opening different album
    albums.forEach(album => {
        album.style.display = 'block';
        const vinyl = album.querySelector('.vinyl');
        vinyl.style.left = '0';
        vinyl.classList.remove('spin');
        album.classList.remove('active-vinyl');
    });

    clicked.style.order = '-1';
    vinyl.style.left = '50%';
    clicked.classList.add('active-vinyl');

    albums.forEach(album => {
        if (album !== clicked) {
            album.style.display = 'none';
        }
    });

    if (buyBtn) {
        buyBtn.style.display = "none";
    }

    currentOpenId = id;

    setTimeout(() => {
        vinyl.classList.remove('spin');
    }, 10000);

    OpenContiner(id);
}

 /*END VINYL */

/*melodii  */



function OpenContiner(id) {
    // Ascunde toate popup-urile și butoanele extra

    document.querySelectorAll('.album-popup').forEach(popup => {
      popup.classList.remove("show");
      popup.style.display = "none";
    });
  
    document.querySelectorAll('.vinyl-extra-btn').forEach(btn => {
      btn.style.display = "none";
    });
  
    // Arată doar popup-ul și butonul extra pentru discul activ
    const popup = document.getElementById(`popup-${id}`);
    const extraBtn = document.getElementById(`extra-btn-${id}`);
    const buyBtn = document.getElementById(`buy-album-${id}`);

    if (buyBtn) {
        buyBtn.style.display = "block";
    }
    if (popup) {
      popup.style.display = "block";
      popup.classList.add("show");
    }
  
    if (extraBtn) {
      extraBtn.classList.add("visible");
    }
  }
  

function closeAlbumPopup(id) {
    const popup = document.getElementById(`popup-${id}`);
    if (popup) {
        popup.classList.remove("show");
    }
}


function playTrack(src, vinylId) {
    const audio = document.getElementById('dynamic-player');

    // Oprire muzică și animație anterioară
    audio.pause();
    audio.currentTime = 0;
    audio.src = src;
    audio.load();

    // Oprește orice disc care se învârte
    document.querySelectorAll('.vinyl.spin').forEach(v => v.classList.remove('spin'));

    // Obține discul curent
    const vinyl = document.getElementById(`${vinylId}`);
    if (!vinyl) {
        console.error('Vinilul nu a fost găsit!');
        return;
    }

    // Pornește redarea
    audio.play().then(() => {
        vinyl.classList.add('spin');
    }).catch(err => {
        console.error('Redarea audio a eșuat:', err);
    });

    // Când se termină piesa, oprește discul
    audio.onended = () => {
        vinyl.classList.remove('spin');
    };
}



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
    window.location.href="/";
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

    // Apply saved theme from localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark");
        checkbox.checked = true;
    }

    checkbox.addEventListener("change", () => {
        body.classList.toggle("dark");
        const mode = body.classList.contains("dark") ? "dark" : "";
        localStorage.setItem("theme", mode);
    });
});


  window.addEventListener("load", () => {
    const lastLetter = document.querySelector(".text.text19");
  
    if (lastLetter) {
      lastLetter.addEventListener("animationend", () => {
        // Optional small delay
        setTimeout(() => {
            document.getElementById("footer").style.display = "block";
            document.getElementById("main-site").style.display = "block";
          document.getElementById("main-site").scrollIntoView({ behavior: "smooth" });
        }, 1000); 
        
        setTimeout(() => {
            document.getElementById("welcome-screen").style.display = "none";
        }, 1500);
      });
      
      
    }
  });
  document.addEventListener('DOMContentLoaded', function () {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainSite = document.getElementById('main-site');

    if (sessionStorage.getItem('welcomeSeen') === 'true') {
        document.getElementById('footer').style.display = "block";
        welcomeScreen.style.display = 'none';
        mainSite.style.display = 'block';
        observeAlbums(); // 👈 adaugă aici
    } else {
        welcomeScreen.style.display = 'block';
        mainSite.style.display = 'none';

        const lastLetter = document.querySelector(".text.text19");
        if (lastLetter) {
            lastLetter.addEventListener("animationend", () => {
                setTimeout(() => {
                    mainSite.style.display = 'block';
                    mainSite.scrollIntoView({ behavior: "smooth" });
                    observeAlbums(); // 👈 adaugă aici
                }, 800);

                setTimeout(() => {
                    welcomeScreen.style.display = 'none';
                    sessionStorage.setItem('welcomeSeen', 'true');
                }, 1500);
            });
        }
    }
});

function observeAlbums() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.album').forEach(album => {
        observer.observe(album);
    });
}


let speechEnabled = false;

function toggleSpeech() {
  speechEnabled = !speechEnabled;
  alert("Accessibility " + (speechEnabled ? "enabled" : "disabled"));
}

function speak(text) {
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  synth.speak(utterance);
}
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = (cartModal.style.display === 'block') ? 'none' : 'block';
}
function describeElement(el) {
  if (!el) return;
  const tag = el.tagName.toLowerCase();
  let description = "";

  if (tag === "img") description = "Image";
  else if (tag === "button") description = "Button: " + (el.textContent.trim() || "unnamed");
  else if (tag === "a") description = "Link: " + (el.textContent.trim() || "link");
  else if (el.hasAttribute("data-accessible")) {
    description = el.getAttribute("data-accessible");
  } else if (el.hasAttribute("aria-label")) {
    description = el.getAttribute("aria-label");
  }
  
  else if (tag.startsWith("h")) description = "Heading";
  else if (tag === "input") description = "Input field";
  else if (el.getAttribute("role")) description = "Role: " + el.getAttribute("role");

  if (description) speak(description);
}

document.addEventListener("mouseover", (e) => {
  if (speechEnabled) describeElement(e.target);
});

function addAlbumToCart(id, name, price) {
    const album = {
        id: `album-${id}`, // prefix to avoid ID collision with fashion
        name,
        price: parseFloat(price),
    };
    addToCartGood(album);
}

function toggleCart() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.classList.toggle("show");
  }
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('vinyl')) {
        const audio = document.getElementById('dynamic-player');
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
            e.target.classList.remove('spin');
        }
    }
});
