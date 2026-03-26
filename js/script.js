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

    // We use the Dev.to API for reliable tech news, filtering specifically for the user's tech watch topic
    const apiUrl = `https://dev.to/api/articles?tag=githubcopilot&per_page=3`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des articles");
            }
            return response.json();
        })
        .then(articles => {
            if (articles && articles.length > 0) {
                rssContainer.innerHTML = ''; // Clear loading spinner

                articles.forEach(article => {
                    // Extract a clean description
                    let cleanDesc = article.description || "Découvrez cet article intéressant sur l'écosystème GitHub et l'IA.";
                    if (cleanDesc.length > 150) cleanDesc = cleanDesc.substring(0, 150) + '...';

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
                                <p class="rss-desc">${cleanDesc}</p>
                            </div>
                            <div style="margin-top: 15px;">
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
            } else {
                throw new Error("Aucun article trouvé");
            }
        })
        .catch(error => {
            console.error(error);
            rssContainer.innerHTML = `
                <div style="text-align: center; width: 100%; grid-column: 1 / -1; padding: 30px;" class="glass-card">
                    <i class="fas fa-satellite-dish" style="font-size: 2.5rem; color: var(--text-secondary); margin-bottom: 15px;"></i>
                    <h3 style="margin-bottom: 10px; color: var(--text-primary);">Oups... Le radar est brouillé.</h3>
                    <p style="color: var(--text-secondary);">Impossible de charger les actualités en direct pour le moment. Veuillez réessayer plus tard.</p>
                </div>
            `;
        });
});
