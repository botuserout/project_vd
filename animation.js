

// Create and inject animation container
function createAnimationContainer() {
    const container = document.createElement('div');
    container.className = 'animation-container';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
        overflow: hidden;
    `;
    document.body.appendChild(container);
    return container;
}

// Create animation elements
function createAnimationElement(type) {
    const element = document.createElement('div');
    element.className = type;
    
    // Random starting position
    const startX = Math.random() * window.innerWidth;
    element.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: -20px;
        font-size: ${20 + Math.random() * 10}px;
        color: ${type === 'heart' ? '#ff69b4' : '#ffd700'};
        animation: fall ${3 + Math.random() * 2}s linear forwards;
        user-select: none;
        pointer-events: none;
    `;
    
    element.innerHTML = type === 'heart' ? '❤' : '⭐';
    return element;
}

// Add animation styles
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(-20px) translateX(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) translateX(100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize animations
function initializeAnimations() {
    const container = createAnimationContainer();
    addAnimationStyles();
    
    // Create elements periodically
    setInterval(() => {
        const heart = createAnimationElement('heart');
        const star = createAnimationElement('star');
        
        container.appendChild(heart);
        container.appendChild(star);
        
        // Clean up elements after animation
        setTimeout(() => {
            heart.remove();
            star.remove();
        }, 6000);
    }, 300);
}

// Start animations when page loads
document.addEventListener('DOMContentLoaded', initializeAnimations);