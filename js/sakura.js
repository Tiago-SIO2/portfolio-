// ==========================================
// SAKURA FALLING PETALS ANIMATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // Create a container for the sakura petals that covers the whole screen
    const sakuraContainer = document.createElement('div');
    sakuraContainer.className = 'sakura-container';
    sakuraContainer.style.position = 'fixed';
    sakuraContainer.style.top = '0';
    sakuraContainer.style.left = '0';
    sakuraContainer.style.width = '100vw';
    sakuraContainer.style.height = '100vh';
    sakuraContainer.style.overflow = 'hidden';
    sakuraContainer.style.pointerEvents = 'none'; // So you can click through
    sakuraContainer.style.zIndex = '9999'; // ensure it's visible over all content

    // Append to body so it displays everywhere
    document.body.appendChild(sakuraContainer);

    // Number of petals
    const petalCount = 12; // Modifié pour avoir beaucoup moins de pétales

    for (let i = 0; i < petalCount; i++) {
        createPetal(sakuraContainer);
    }
});

function createPetal(container) {
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';

    // Randomize starting properties
    const startLeft = Math.random() * 100; // 0 to 100vw
    const durationFall = Math.random() * 10 + 15; // 15 to 25 seconds (beaucoup plus lent)
    const durationSway = Math.random() * 4 + 4; // 4 to 8 seconds (balancement plus doux)
    const startScale = Math.random() * 0.5 + 0.3; // 0.3 to 0.8 (légèrement plus petits)
    // Negative delay makes petals immediately visible across the screen instead of slowly dropping from the top
    const delay = -(Math.random() * 20); // offset start time negatively

    // Styling the petal
    petal.style.position = 'absolute';
    petal.style.top = '-5%'; // Start above the screen
    petal.style.left = `${startLeft}%`;
    petal.style.width = '15px';
    petal.style.height = '15px';
    petal.style.background = 'radial-gradient(circle at 30% 30%, #ffc0cb, #ffb3c6)';
    petal.style.borderRadius = '15px 0px 15px 0px'; // Petal shape
    petal.style.transform = `scale(${startScale}) rotate(0deg)`;
    petal.style.opacity = Math.random() * 0.3 + 0.1; // 0.1 to 0.4 (plus transparents pour moins gêner la vue)
    petal.style.boxShadow = '0 0 10px rgba(255, 179, 198, 0.2)';

    // Animations applied inline for ease (requires keyframes in CSS)
    petal.style.animation = `
        fall ${durationFall}s linear ${delay}s infinite,
        sway ${durationSway}s ease-in-out ${delay}s infinite alternate
    `;

    container.appendChild(petal);
}
