// ==========================================
// ZELDA RUPEE CLICKER GAME LOGIC
// ==========================================

// Game State
let gameState = {
    score: 0,
    clickValue: 1,
    autoValue: 0,
    costs: {
        click: 50,
        auto: 150
    },
    levels: {
        click: 0,
        auto: 0
    }
};

// DOM Elements
const elScore = document.getElementById('rupee-score');
const elPerSec = document.getElementById('rupees-per-sec');
const btnMain = document.getElementById('main-rupee');
const btnReset = document.getElementById('reset-game');

// Upgrade Elements
const upgClick = document.getElementById('upg-click');
const costClick = document.getElementById('cost-click');
const lvlClick = document.getElementById('lvl-click');

const upgAuto = document.getElementById('upg-auto');
const costAuto = document.getElementById('cost-auto');
const lvlAuto = document.getElementById('lvl-auto');

// Initialization
function initGame() {
    // Load from LocalStorage if exists
    const savedState = localStorage.getItem('zeldaClickerSave');
    if (savedState) {
        // Parse and merge to handle potential updates to initial state structure
        const parsed = JSON.parse(savedState);
        gameState = { ...gameState, ...parsed };
    }
    updateUI();
    startGameLoop();
}

// Update UI to reflect Game State
function updateUI() {
    elScore.innerText = Math.floor(gameState.score);
    elPerSec.innerText = `${gameState.autoValue} rubis / sec`;

    costClick.innerText = gameState.costs.click;
    lvlClick.innerText = gameState.levels.click;

    costAuto.innerText = gameState.costs.auto;
    lvlAuto.innerText = gameState.levels.auto;

    // Visual feedback for affordable upgrades
    updateUpgradeVisuals(upgClick, gameState.costs.click);
    updateUpgradeVisuals(upgAuto, gameState.costs.auto);
}

function updateUpgradeVisuals(element, cost) {
    if (gameState.score >= cost) {
        element.style.opacity = '1';
        element.style.borderColor = 'var(--rupee-green)';
    } else {
        element.style.opacity = '0.7';
        element.style.borderColor = 'var(--border-color)';
    }
}

// Save to LocalStorage
function saveGame() {
    localStorage.setItem('zeldaClickerSave', JSON.stringify(gameState));
}

// Floating Text Animation for Clicks
function createFloatingText(x, y, amount) {
    const floatEl = document.createElement('div');
    floatEl.innerText = `+${amount}`;
    floatEl.style.position = 'absolute';
    floatEl.style.left = `${x}px`;
    floatEl.style.top = `${y}px`;
    floatEl.style.color = '#2ecc71';
    floatEl.style.fontWeight = 'bold';
    floatEl.style.fontSize = '1.2rem';
    floatEl.style.pointerEvents = 'none';
    floatEl.style.textShadow = '0 0 5px rgba(0,0,0,0.5)';
    floatEl.style.zIndex = '100';
    floatEl.style.transition = 'all 0.8s ease-out';

    document.body.appendChild(floatEl);

    // Trigger animation
    requestAnimationFrame(() => {
        floatEl.style.transform = `translateY(-50px)`;
        floatEl.style.opacity = '0';
    });

    // Cleanup
    setTimeout(() => {
        floatEl.remove();
    }, 800);
}

// Main Click Event
btnMain.addEventListener('click', (e) => {
    // Add score
    gameState.score += gameState.clickValue;

    // Animation effect on rupee
    btnMain.style.transform = 'scale(0.9)';
    setTimeout(() => {
        btnMain.style.transform = 'scale(1)';
    }, 100);

    // Floating text at cursor position
    createFloatingText(e.clientX, e.clientY, gameState.clickValue);

    updateUI();
    saveGame();
});

// Upgrade: Bourse Bleue (Click Value)
upgClick.addEventListener('click', () => {
    if (gameState.score >= gameState.costs.click) {
        gameState.score -= gameState.costs.click;
        gameState.clickValue += 1;
        gameState.levels.click += 1;

        // Increase cost by 50% for next level
        gameState.costs.click = Math.floor(gameState.costs.click * 1.5);

        updateUI();
        saveGame();
    }
});

// Upgrade: Master Sword (Auto Value)
upgAuto.addEventListener('click', () => {
    if (gameState.score >= gameState.costs.auto) {
        gameState.score -= gameState.costs.auto;
        gameState.autoValue += 2;
        gameState.levels.auto += 1;

        // Increase cost by 50% for next level
        gameState.costs.auto = Math.floor(gameState.costs.auto * 1.5);

        updateUI();
        saveGame();
    }
});

// Main Game Loop for Auto Clicker (Runs 10x a second for smoothness)
function startGameLoop() {
    setInterval(() => {
        if (gameState.autoValue > 0) {
            // Add 1/10th of the per-second value, 10 times a second
            gameState.score += (gameState.autoValue / 10);
            updateUI();

            // Save less frequently to avoid performance issues (e.g., every update cycle = roughly 1x per sec)
            if (Math.random() < 0.1) {
                saveGame();
            }
        }
    }, 100);
}

// Hard Reset Game
btnReset.addEventListener('click', () => {
    if (confirm('Voulez-vous vraiment réinitialiser votre partie ? Tous vos rubis seront perdus !')) {
        localStorage.removeItem('zeldaClickerSave');
        gameState = {
            score: 0,
            clickValue: 1,
            autoValue: 0,
            costs: { click: 50, auto: 150 },
            levels: { click: 0, auto: 0 }
        };
        updateUI();
    }
});

// Start the game logic
initGame();
