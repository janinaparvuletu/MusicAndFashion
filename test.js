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