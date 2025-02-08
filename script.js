// Valentine's Day Interactive Script

let musicToggleCount = 0;
let isNoButtonEvasive = false;

// DOM Elements
const backgroundMusic = document.getElementById('background-music');
const musicToggleButton = document.getElementById('music-toggle');
const noButton = document.getElementById('no-button');
const yesButton = document.getElementById('yes-button');
const container = document.getElementById('container');
const poetrySection = document.getElementById('poetry-section');
const poetryText = document.getElementById('poetry-text');
const readPoetryButton = document.getElementById('read-poetry');
const bonusMessage = document.getElementById('bonus-message');

// Poetry text
const poetry = `
I molded you a thousand times in the quiet of my hands— a vessel spun from stardust and the softest parts of dawn. Every curve, a prayer; every edge, a confession. I painted it in hues only your name could hold— cerulean for your laughter, amber for the hours you stayed, crimson for the silence where my hopes still sway.

But the kiln cracks what the heart cannot mend. You returned it each time, your fingerprints still warm where mine began. I learned to love the fractures— how the light escapes through what you could not keep, how even brokenness can be a kind of holy.

This is not a requiem, but a relic: the ghost of a boy who loved in tenses— <i>you were</i> the future, <i>I am</i> the ashes. Take it now, this final clay. Let its edges whisper what my voice could never carry: that some loves are not meant to root, but to rain— and I will grow gardens from what you let remain.
`;

// Music Control Function
function toggleMusic() {
    musicToggleCount++;
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggleButton.innerText = '🔇 Pause Music';
    } else {
        backgroundMusic.pause();
        musicToggleButton.innerText = '🎵 Play Music';
    }

    // Playful easter egg
    if (musicToggleCount > 0) {
        alert("Wow, you really love music! 😄");
    }
}

// Pinball-like No Button Behavior
function setupEvasiveNoButton() {
    if (!isNoButtonEvasive) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();

    // Random evasive movement
    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    noButton.style.position = 'absolute';
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
}

// Event Listener for No Button Evasion
function addNoButtonEvasion() {
    isNoButtonEvasive = true;
    noButton.addEventListener('mouseover', setupEvasiveNoButton);
}

// Reveal Poetry Function
function revealPoetry() {
    document.getElementById('question').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    poetryText.innerHTML = poetry;
    poetrySection.classList.remove('hidden');
}

// Button Option Selection
function selectOption(option) {
    if (option === 'yes') {
        flashRainbowColors(function() {
            revealPoetry();
        });
    } else if (option === 'no') {
        // More sophisticated "No" button behavior
        noButton.innerText = 'Are You sure?';
        ; 
        
        // Increase yes button size
        const currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size');
        const newSize = parseFloat(currentFontSize) * 1.5;
        yesButton.style.fontSize = `${newSize}px`;
        
        // Show bonus persuasion message
        bonusMessage.classList.remove('hidden');
        
        // Activate pinball-like evasion
        addNoButtonEvasion();
    }
}

// Rainbow Color Flash Animation
function flashRainbowColors(callback) {
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    let i = 0;
    const interval = setInterval(function() {
        document.body.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length;
    }, 200);
    setTimeout(function() {
        clearInterval(interval);
        document.body.style.backgroundColor = ''; 
        if (callback) callback();
    }, 2000);
}

// Confetti Animation
function confettiAnimation() {
    const confettiCount = 200;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(confetti);
    }

    // Remove confetti after animation
    setTimeout(() => {
        const confettiElements = document.querySelectorAll('.confetti');
        confettiElements.forEach(el => el.remove());
    }, 5000);
}

// Display Initial Cat Image
function displayCat() {
    const imageContainer = document.getElementById('image-container');
    const catImage = new Image();
    catImage.src = 'cat.gif';
    catImage.alt = 'Cute Cat';
    catImage.onload = function() {
        imageContainer.appendChild(catImage);
    };
}

// Display Cat Heart Image
function displayCatHeart() {
    document.getElementById('image-container').innerHTML = '';
    const imageContainer = document.getElementById('image-container');
    const catHeartImage = new Image();
    catHeartImage.src = 'cat-heart.gif';
    catHeartImage.alt = 'Cat Heart';
    catHeartImage.onload = function() {
        imageContainer.appendChild(catHeartImage);
        poetrySection.style.display = 'none';
    };
}

// Event Listeners
musicToggleButton.addEventListener('click', toggleMusic);
readPoetryButton.addEventListener('click', function() {
    displayCatHeart();
    confettiAnimation();
});

// Initialize
displayCat();