document.addEventListener("DOMContentLoaded", () => {

    // Auto copyright year
    const yearEl = document.getElementById("year");
    yearEl.textContent = new Date().getFullYear();

    // Typing animation
    const messages = [
        "Our website stepped out for a quick Christmas snack 🍪",
        "Probably arguing with Santa about cookies 🎅",
        "Or fixing bugs before they reach the North Pole 🐞"
    ];

    let msgIndex = 0;
    let charIndex = 0;
    const typingEl = document.getElementById("typing");

    function type() {
        if (charIndex < messages[msgIndex].length) {
            typingEl.textContent += messages[msgIndex][charIndex++];
            setTimeout(type, 60);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingEl.textContent = messages[msgIndex].substring(0, --charIndex);
            setTimeout(erase, 40);
        } else {
            msgIndex = (msgIndex + 1) % messages.length;
            setTimeout(type, 400);
        }
    }

    type();
});
