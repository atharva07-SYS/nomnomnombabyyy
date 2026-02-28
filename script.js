document.addEventListener('DOMContentLoaded', () => {
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const container = document.getElementById('main-container');
    const bear = document.getElementById('bear');
    const bgElements = document.getElementById('bg-elements');
    const bgMusic = document.getElementById('bg-music');

    let noClickCount = 0;
    const emojis = ['💖', '🌸', '✨', '🥺', '🎀', '🧸'];

    // Start background music on first interaction
    document.body.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.volume = 0.3;
            bgMusic.play().catch(e => console.log("Audio play blocked by browser."));
        }
    }, { once: true });

    // Create floating romantic elements
    function createRomanticElement(amount) {
        for (let i = 0; i < amount; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                el.classList.add('float-el');
                el.innerText = emojis[Math.floor(Math.random() * emojis.length)];

                // Randomly assign size and position
                const size = Math.random() * 1.5 + 1; // 1rem to 2.5rem
                el.style.fontSize = `${size}rem`;
                el.style.left = `${Math.random() * 100}vw`;

                // Random duration and delay
                el.style.animationDuration = `${Math.random() * 4 + 3}s`;

                bgElements.appendChild(el);

                // Clean up
                setTimeout(() => {
                    el.remove();
                }, 7000);
            }, i * 200);
        }
    }

    // Continuously spawn background elements
    setInterval(() => createRomanticElement(2), 1500);

    // Array of dramatic bear GIFs
    const bearGifs = [
        "https://media.tenor.com/QkGvq4YqMVEAAAAi/bubu-dudu-bubu.gif",
        "https://media.tenor.com/-n8JvVIqBXkAAAAi/peach-cat-crying.gif",
        "https://media.tenor.com/gK236i4nE4oAAAAi/bubu-dudu-cry.gif",
        "https://media.tenor.com/8m1vA6PjebEAAAAi/peach-and.gif",
        "https://media.tenor.com/tYt6oR9QOFEAAAAi/bubu-dudu.gif"
    ];

    const messages = [
        "Please baby? 🥺",
        "Don't do this to me! 😭",
        "I'll buy you food! 🍔",
        "My heart is breaking! 💔",
        "Just click YES! 😤",
        "I'm literally crying! 💦"
    ];

    // Make 'No' button run away
    const moveBtnNo = () => {
        // Find safe bounds to prevent button going off-screen
        const btnWidth = btnNo.offsetWidth;
        const btnHeight = btnNo.offsetHeight;

        const maxX = window.innerWidth - btnWidth - 20;
        const maxY = window.innerHeight - btnHeight - 20;

        const x = Math.max(20, Math.random() * maxX);
        const y = Math.max(20, Math.random() * maxY);

        btnNo.style.position = 'fixed';
        btnNo.style.left = `${x}px`;
        btnNo.style.top = `${y}px`;
        btnNo.style.zIndex = '1000';

        noClickCount++;

        // Update texts and images
        if (noClickCount <= messages.length) {
            btnNo.innerText = messages[noClickCount - 1];
        } else {
            btnNo.innerText = "You can't catch me! 🏃‍♂️";
        }

        // Change bear GIF periodically
        const gifIndex = Math.min(Math.floor(noClickCount / 2), bearGifs.length - 1);
        bear.src = bearGifs[gifIndex];

        // Make the button slightly smaller each time to make it harder
        if (noClickCount < 10) {
            const currentScale = 1 - (noClickCount * 0.05);
            btnNo.style.transform = `scale(${currentScale})`;
        }

        // Spawn extra heart when they try to click No
        createRomanticElement(1);
    };

    // Listeners for running away
    btnNo.addEventListener('mouseover', moveBtnNo);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveBtnNo();
    }, { passive: false });

    // Fallback if they manage to click it
    btnNo.addEventListener('click', moveBtnNo);

    // YES Button clicked!
    btnYes.addEventListener('click', () => {
        // Change left and right characters to happy ones
        document.querySelector('.left-char').src = "https://media.tenor.com/V4E1Zl_KwtcAAAAi/bubu-dudu-kiss.gif";
        document.querySelector('.right-char').src = "https://media.tenor.com/y4ce3j2zIHEAAAAi/bubu-dudu.gif";

        container.innerHTML = `
            <div class="bear-container" style="height: 280px; transform: scale(1.1);">
                <img class="bear" src="https://media.tenor.com/I71xWkZ-XW8AAAAi/bubu-dudu.gif" alt="Happy Bear">
            </div>
            <h1 class="success-message">YAYYY! I love you! ❤️</h1>
            <p style="font-size: 1.5rem; margin-top: 1rem; font-weight: 900; color: #800f2f; line-height: 1.5;">
                Thank you for forgiving me!<br>
                You are my whole world! 🌍💖<br>
                Mwah! 😘
            </p>
        `;

        // Confetti explosion of hearts and flowers!
        let count = 0;
        const interval = setInterval(() => {
            createRomanticElement(8);
            count++;
            if (count > 20) clearInterval(interval);
        }, 100);
    });
});
