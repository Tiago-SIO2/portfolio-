// ==========================================
// THEME SWITCHER (Dark/Light Mode)
// ==========================================
const themeSwitch = document.getElementById('theme-switch');
const icon = themeSwitch.querySelector('i');

// Check for saved theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    }
} else {
    // FORCE Dark theme as default for maximum impact
    document.documentElement.setAttribute('data-theme', 'dark');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeSwitch.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
});

// ==========================================
// NAVIGATION BAR SCROLL EFFECT
// ==========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// MOBILE MENU (Hamburger)
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}
document.querySelectorAll('.nav-links li a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
}));

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Trigger once on load

// ==========================================
// RSS FEED LOGIC (VEILLE TECHNOLOGIQUE)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const rssContainer = document.getElementById("rss-feed-container");
    if (!rssContainer) return;

    // Simulate an API call with predefined French articles to ensure language and theme consistency
    const articles = [
        {
            title: "GitHub fait marche arrière sur la publicité déguisée et l'entraînement des modèles dans Copilot",
            url: "https://www.itdaily.fr/",
            description: "GitHub a récemment modifié le comportement de Copilot après des critiques concernant l'injection de suggestions de promotion dans les pull requests et l'utilisation des conversations pour entraîner les modèles.",
            published_at: "2026-03-28T10:00:00Z",
            source: "IT Daily"
        },
        {
            title: "GitHub Copilot face à la concurrence : Évolution vers une plateforme IA complète",
            url: "https://www.nxcode.io/",
            description: "Face à l'essor d'outils comme Cursor ou Claude Code, GitHub Copilot maintient sa position en offrant le support multi-modèle (GPT, Claude, Gemini) et un nouveau mode Agent autonome.",
            published_at: "2026-03-20T14:30:00Z",
            source: "NX Code"
        },
        {
            title: "Mises à jour majeures pour Copilot Spaces et fluidification de l'intégration",
            url: "https://github.blog/",
            description: "Des mises à jour majeures ont été déployées pour Copilot Spaces, permettant la création d'espaces publics, le partage individuel et une intégration plus fluide avec le visualiseur de code en ligne.",
            published_at: "2026-02-15T09:15:00Z",
            source: "GitHub Blog"
        }
    ];

    // Simuler un léger délai de chargement pour l'animation
    setTimeout(() => {
        rssContainer.innerHTML = ''; // Clear loading spinner

        articles.forEach(article => {
            // Format Date
            const pubDate = new Date(article.published_at).toLocaleDateString("fr-FR", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Build HTML Card (Using Soft Minimalist glass-card style)
            const cardHTML = `
                <div class="rss-card glass-card reveal">
                    <div>
                        <span class="rss-date"><i class="far fa-calendar-alt"></i> ${pubDate}</span>
                        <h3 class="rss-title"><a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a></h3>
                        <p class="rss-desc" style="margin-bottom: 20px;">${article.description}</p>
                    </div>
                    <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
                        <span style="font-size: 0.9rem; font-weight: 500; color: var(--accent-color);"><i class="fas fa-bookmark" style="margin-right: 5px;"></i> Source : ${article.source}</span>
                        <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="rss-link">
                            Lire l'article <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;
            rssContainer.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Force reveal on newly added elements
        setTimeout(reveal, 100);
    }, 800);
});
