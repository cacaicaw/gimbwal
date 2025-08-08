const bgMusic = document.getElementById('bgMusic');

// Auto-play music when page loads with lower volume
window.addEventListener('load', () => {
    bgMusic.volume = 0.3;  // Set volume to 30%
    bgMusic.play().catch(console.log);
});

const messages = [
    {
        text: "plss mau dong",
        image: "https://i.pinimg.com/1200x/3e/34/ba/3e34ba5c295f57a5e89ebd298ed1e154.jpg"
    },
    {
        text: "pls klik yg kiri",
        image: "https://i.pinimg.com/736x/3e/b8/76/3eb87645197471f817a152fb27580ad2.jpg"
    },
    {
        text: "terakhir, kalo \"no\" yauda deh",
        image: "https://i.pinimg.com/736x/ca/cd/60/cacd60b298e8dadd3b39930f60dcb007.jpg"
    }
];

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

setInterval(() => createHeart(), 300);

const title = document.querySelector('.title');
const noBtn = document.querySelector('.no-btn');
const yesBtn = document.querySelector('.yes-btn');
let noCount = 0;

function runAway(e) {
    const noButton = e.target;
    const container = document.querySelector('.container');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    const isMobile = window.innerWidth <= 768;

    // Ensure button is in document body, not in container
    if (noButton.parentElement !== document.body) {
        document.body.appendChild(noButton);
    }

    // Get container boundaries
    const containerRect = container.getBoundingClientRect();
    const safeDistance = isMobile ? 80 : 120; // Minimum distance from container

    // Get current position or use initial position
    const currentX = parseInt(noButton.style.left) || containerRect.right + safeDistance;
    const currentY = parseInt(noButton.style.top) || containerRect.top;

    // Calculate new position
    let newX, newY;

    // If button is near container, move it far away
    if (isNearContainer(currentX, currentY, containerRect, safeDistance)) {
        const farPosition = getFarPosition(containerRect, windowWidth, windowHeight, buttonWidth, buttonHeight, safeDistance);
        newX = farPosition.x;
        newY = farPosition.y;
    } else {
        // Normal evasion movement
        newX = currentX + (Math.random() - 0.5) * (isMobile ? 150 : 300);
        newY = currentY + (Math.random() - 0.5) * (isMobile ? 150 : 300);
    }

    // Keep in viewport bounds
    const padding = isMobile ? 20 : 40;
    newX = Math.max(padding, Math.min(windowWidth - buttonWidth - padding, newX));
    newY = Math.max(padding, Math.min(windowHeight - buttonHeight - padding, newY));

    // Apply position with smooth animation
    noButton.style.position = 'fixed';
    noButton.style.transition = `all ${isMobile ? '0.8s' : '0.6s'} cubic-bezier(0.34, 1.56, 0.64, 1)`;
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
    noButton.style.zIndex = '9999';
}

// Add these helper functions
function isNearContainer(x, y, containerRect, safeDistance) {
    return x >= containerRect.left - safeDistance &&
           x <= containerRect.right + safeDistance &&
           y >= containerRect.top - safeDistance &&
           y <= containerRect.bottom + safeDistance;
}

function getFarPosition(containerRect, windowWidth, windowHeight, buttonWidth, buttonHeight, safeDistance) {
    // Choose a random side away from container
    const positions = [
        { // Left side
            x: Math.max(20, containerRect.left - buttonWidth - safeDistance),
            y: Math.random() * (windowHeight - buttonHeight - 40) + 20
        },
        { // Right side
            x: Math.min(windowWidth - buttonWidth - 20, containerRect.right + safeDistance),
            y: Math.random() * (windowHeight - buttonHeight - 40) + 20
        },
        { // Top side
            x: Math.random() * (windowWidth - buttonWidth - 40) + 20,
            y: Math.max(20, containerRect.top - buttonHeight - safeDistance)
        },
        { // Bottom side
            x: Math.random() * (windowWidth - buttonWidth - 40) + 20,
            y: Math.min(windowHeight - buttonHeight - 20, containerRect.bottom + safeDistance)
        }
    ];

    // Return random position from available positions
    return positions[Math.floor(Math.random() * positions.length)];
}

yesBtn.addEventListener('click', () => {
    title.innerHTML = "Gasss Ke link ini (https://heyzine.com/flip-book/9060e0804a.html), tapi kita punya pertanyaan! "Ayam, ayam apa yang paling besar?" keep dulu yaa jawabannya";
    document.querySelector('img').src = "https://i.pinimg.com/originals/7e/24/05/7e2405798d521fd461a1dc8a36dc4a79.gif";
    noBtn.style.display = 'none';
    yesBtn.style.display = 'none';
    bgMusic.play();
});

noBtn.addEventListener('click', () => {
    if (noCount < 3) {
        noCount++;
        title.innerHTML = messages[noCount - 1].text;
        document.querySelector('img').src = "https://i.pinimg.com/originals/7e/24/05/7e2405798d521fd461a1dc8a36dc4a79.gif";
    } else {
        title.innerHTML = "TAPI BOONG HEHEHE, yakali ga mau kenalan sama kita :3. Gasss Ke link ini (https://heyzine.com/flip-book/9060e0804a.html), tapi kita punya pertanyaan! "Ayam, ayam apa yang paling besar?" keep dulu yaa jawabannya";
        if (!noBtn.classList.contains('running')) {
            noBtn.classList.add('running');
        }
        // Always run away on click after 3 clicks
        runAway({ 
            target: noBtn, 
            type: 'click',
            clientX: event.clientX || event.touches?.[0]?.clientX,
            clientY: event.clientY || event.touches?.[0]?.clientY
        });
    }
});

// Make button run away on hover/touch
const handleButtonDodge = (e) => {
    if (noCount >= 3) {
        e.preventDefault();
        e.stopPropagation();
        runAway(e);
    }
};

noBtn.addEventListener('mouseover', handleButtonDodge);
noBtn.addEventListener('touchstart', handleButtonDodge, { passive: false });
noBtn.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });


