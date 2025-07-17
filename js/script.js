// Birthday date: July 18th, 2025
const birthdayDate = new Date('2025-07-18T00:00:00').getTime();

// Countdown messages that change as time gets closer
const countdownMessages = [
    "Every second brings us closer to celebrating another year of your beautiful existence...",
    "The anticipation grows as your special day approaches, my love...",
    "Soon we'll celebrate the amazing woman who lights up my world...",
    "Your birthday is almost here, and my heart is full of excitement...",
    "Just a little more time until we celebrate YOU, my darling...",
    "The countdown continues to the most special day - YOUR day!",
    "Almost time to shower you with all the love you deserve...",
    "Your special moment is approaching, beautiful..."
];

// Wishes for the wish jar
const wishes = [
    "I wish for your dreams to come true, one by one, just like you make mine come true every day.",
    "May your heart always be filled with the same joy you bring to mine.",
    "I wish for endless adventures together, creating memories that will last forever.",
    "May you always know how deeply loved and cherished you are.",
    "I wish for your laughter to echo through our home for years to come.",
    "May every sunrise bring you new reasons to smile.",
    "I wish for your strength to inspire others, just as it inspires me daily.",
    "May our love continue to grow stronger with each passing year.",
    "I wish for all your worries to be small and all your joys to be great.",
    "May you always feel as beautiful as you look to me every single day."
];

let currentWishIndex = 0;
let currentSection = 0;
const sections = ['countdown-section', 'celebration-section', 'memory-section', 'wish-section', 'final-section'];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    setupEventListeners();
    createConfetti();
});

// Countdown timer function
function startCountdown() {
    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = birthdayDate - now;

        if (distance < 0) {
            // Birthday has arrived!
            clearInterval(countdownInterval);
            showBirthdaySection();
            return;
        }

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update countdown display
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        // Update message based on time remaining
        updateCountdownMessage(days);
    }, 1000);
}

function updateCountdownMessage(days) {
    const messageElement = document.getElementById('countdown-message');
    let messageIndex;
    
    if (days > 30) messageIndex = 0;
    else if (days > 14) messageIndex = 1;
    else if (days > 7) messageIndex = 2;
    else if (days > 3) messageIndex = 3;
    else if (days > 1) messageIndex = 4;
    else if (days === 1) messageIndex = 5;
    else if (days === 0) messageIndex = 6;
    else messageIndex = 7;
    
    messageElement.textContent = countdownMessages[messageIndex];
}

function showBirthdaySection() {
    switchToSection(1); // Switch to celebration section
    triggerConfetti();
    
    // Play celebration sound (if available)
    const music = document.getElementById('birthday-music');
    if (music) {
        music.play().catch(e => console.log('Audio play failed:', e));
    }
}

function setupEventListeners() {
    // Bypass countdown button
    document.getElementById('bypass-countdown').addEventListener('click', function() {
        showBirthdaySection();
    });

    // Start surprises button
    document.getElementById('start-surprises').addEventListener('click', function() {
        switchToSection(2); // Memory section
        animateMemoryCards();
    });

    // Next surprise button
    document.getElementById('next-surprise').addEventListener('click', function() {
        switchToSection(3); // Wish section
    });

    // Wish jar click
    document.getElementById('wish-jar').addEventListener('click', function() {
        showNextWish();
        animateJar();
    });

    // Final surprise button
    document.getElementById('final-surprise').addEventListener('click', function() {
        switchToSection(4); // Final section
    });

    // Restart journey button
    document.getElementById('restart-journey').addEventListener('click', function() {
        currentSection = 0;
        currentWishIndex = 0;
        switchToSection(0);
        document.getElementById('wish-text').textContent = "Click the jar to see my wishes for you...";
    });

    // Play music button
    document.getElementById('play-music').addEventListener('click', function() {
        const music = document.getElementById('birthday-music');
        if (music.paused) {
            music.play().catch(e => console.log('Audio play failed:', e));
            this.innerHTML = '<span class="btn-icon">⏸️</span>Pause Music';
        } else {
            music.pause();
            this.innerHTML = '<span class="btn-icon">🎵</span>Play Our Song';
        }
    });

    // Send love button
    document.getElementById('send-love').addEventListener('click', function() {
        createLoveExplosion();
        showLoveMessage();
    });

    // Memory card interactions
    document.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    });

    // Surprise items interactions
    document.querySelectorAll('.surprise-item').forEach(item => {
        item.addEventListener('click', function() {
            const id = this.id;
            triggerSurpriseAction(id);
        });
    });

    // Promise cards interactions
    document.querySelectorAll('.promise-card').forEach(card => {
        card.addEventListener('click', function() {
            const promiseNum = this.dataset.promise;
            showPromiseMessage(promiseNum);
        });
    });
}

function triggerCelebrationAnimations() {
    // Animate surprise items with staggered delays
    const surpriseItems = document.querySelectorAll('.surprise-item');
    surpriseItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }, index * 200);
    });

    // Start rotating quotes
    startRotatingQuotes();
}

function triggerFinalAnimations() {
    // Animate promise cards
    const promiseCards = document.querySelectorAll('.promise-card');
    promiseCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'slideInRight 0.6s ease-out forwards';
        }, index * 150);
    });
}

function triggerSurpriseAction(itemId) {
    const messages = {
        'cake-surprise': '🎂 Make a wish and blow out the candles! Your dreams will come true! ✨',
        'gift-surprise': '🎁 This gift contains all my love, wrapped with care just for you! 💝',
        'flower-surprise': '🌹 These flowers represent the beauty you bring to my life every day! 🌸',
        'heart-surprise': '💖 My heart beats only for you, today and always! 💕'
    };
    
    showTemporaryMessage(messages[itemId]);
    
    // Add special effect
    const item = document.getElementById(itemId);
    item.style.transform = 'scale(1.2) rotate(360deg)';
    setTimeout(() => {
        item.style.transform = 'scale(1) rotate(0deg)';
    }, 600);
}

function showPromiseMessage(promiseNum) {
    const promises = {
        '1': 'I promise to find new ways to make you smile every single day! 😊',
        '2': 'I promise to treasure every laugh, every tear, every moment we share! 💕',
        '3': 'I promise to love you through all seasons of life, unconditionally! ❤️',
        '4': 'I promise to be your adventure buddy in all of life\'s journeys! 🌟'
    };
    
    showTemporaryMessage(promises[promiseNum]);
}

function showTemporaryMessage(message) {
    // Create temporary message overlay
    const overlay = document.createElement('div');
    overlay.className = 'temp-message-overlay';
    overlay.innerHTML = `
        <div class="temp-message">
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (overlay.parentElement) {
            overlay.remove();
        }
    }, 4000);
}

function startRotatingQuotes() {
    const quotes = [
        '"My sunshine, my only biwijan"',
        '"In your eyes, I found my home..."',
        '"Every day with you is a beautiful adventure..."',
        '"You make my heart skip a beat..."',
        '"Together we are unstoppable..."',
        '"You are my greatest blessing..."'
    ];
    
    let quoteIndex = 0;
    const quoteElement = document.getElementById('rotating-quote');
    
    setInterval(() => {
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            quoteElement.textContent = quotes[quoteIndex];
            quoteElement.style.opacity = '1';
        }, 300);
    }, 3000);
}

function createLoveExplosion() {
    const container = document.createElement('div');
    container.className = 'love-explosion';
    container.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 1000;
    `;
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.cssText = `
            position: absolute;
            font-size: 2rem;
            animation: explodeHeart 2s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        
        const angle = (i / 20) * 360;
        const distance = 100 + Math.random() * 100;
        heart.style.setProperty('--angle', angle + 'deg');
        heart.style.setProperty('--distance', distance + 'px');
        
        container.appendChild(heart);
    }
    
    document.body.appendChild(container);
    
    setTimeout(() => {
        container.remove();
    }, 3000);
}

function showLoveMessage() {
    showTemporaryMessage('💌 My love for you grows stronger every day! You are my everything! 💖');
}

function switchToSection(sectionIndex) {
    // Add fade-out class to current section
    const currentSection = document.querySelector('.section.active');
    if (currentSection) {
        currentSection.classList.add('fade-out');
    }

    // Show new section after transition
    setTimeout(() => {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active', 'fade-out');
        });
        
        document.getElementById(sections[sectionIndex]).classList.add('active');
        currentSection = sectionIndex;
        
        // Trigger specific animations for each section
        if (sectionIndex === 1) {
            triggerCelebrationAnimations();
        } else if (sectionIndex === 4) {
            triggerFinalAnimations();
        }
    }, 800);
}

function animateMemoryCards() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'slideInUp 0.6s ease-out forwards';
        }, index * 200);
    });
}

function showNextWish() {
    const wishText = document.getElementById('wish-text');
    wishText.style.opacity = '0';
    
    setTimeout(() => {
        wishText.textContent = wishes[currentWishIndex];
        wishText.style.opacity = '1';
        currentWishIndex = (currentWishIndex + 1) % wishes.length;
    }, 300);
}

function animateJar() {
    const jar = document.getElementById('wish-jar');
    jar.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        jar.style.animation = '';
    }, 500);
}

function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            animation: confetti-fall ${Math.random() * 3 + 2}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
            transform: rotate(${Math.random() * 360}deg);
        `;
        confettiContainer.appendChild(confetti);
    }
}

function triggerConfetti() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confetti-fall {
            0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes slideInUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

// Add some extra interactive effects
document.addEventListener('mousemove', function(e) {
    if (currentSection === 0) { // Only on countdown section
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach(heart => {
            const rect = heart.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(e.clientX - (rect.left + rect.width/2), 2) + 
                Math.pow(e.clientY - (rect.top + rect.height/2), 2)
            );
            
            if (distance < 100) {
                heart.style.transform = `scale(1.5) rotate(45deg)`;
                heart.style.opacity = '1';
            } else {
                heart.style.transform = `scale(1) rotate(45deg)`;
                heart.style.opacity = '0.7';
            }
        });
    }
});

// Add click effects to buttons
document.querySelectorAll('.surprise-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

