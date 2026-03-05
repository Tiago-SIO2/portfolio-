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
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Check user system preference
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
// MOBILE TENDER (Hamburger)
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
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

    // Use a reliable RSS-to-JSON API or public proxy
    // We mix two feeds: GitHub Blog (Copilot) & Azure Blog (Cloud) or just a general dev feed.
    // For simplicity, we use the free rss2json api to parse the Microsoft/GitHub Engineering blog
    const rssUrl = encodeURIComponent("https://github.blog/feed/");
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&api_key=`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération du flux RSS");
            }
            return response.json();
        })
        .then(data => {
            if (data.status === "ok" && data.items.length > 0) {
                rssContainer.innerHTML = ''; // Clear loading spinner
                // Only take the first 3 items
                const articles = data.items.slice(0, 3);

                articles.forEach(article => {
                    // Extract a clean description (strip HTML tags)
                    let cleanDesc = article.description.replace(/<[^>]+>/g, '');
                    if (cleanDesc.length > 150) cleanDesc = cleanDesc.substring(0, 150) + '...';

                    // Format Date
                    const pubDate = new Date(article.pubDate).toLocaleDateString("fr-FR", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    // Build HTML Card
                    const cardHTML = `
                        <div class="rss-card reveal">
                            <div>
                                <span class="rss-date"><i class="far fa-calendar-alt"></i> ${pubDate}</span>
                                <h3 class="rss-title"><a href="${article.link}" target="_blank" rel="noopener noreferrer">${article.title}</a></h3>
                                <p class="rss-desc">${cleanDesc}</p>
                            </div>
                            <div style="margin-top: 15px;">
                                <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="rss-link">
                                    Lire l'article <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    `;
                    rssContainer.insertAdjacentHTML('beforeend', cardHTML);
                });
                // Force reveal on newly added elements if they are already visible
                setTimeout(reveal, 100);
            } else {
                throw new Error("Format de données invalide");
            }
        })
        .catch(error => {
            console.error(error);
            rssContainer.innerHTML = `
                <div style="text-align: center; width: 100%; grid-column: 1 / -1; color: #ef4444;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p>Impossible de charger le flux RSS pour le moment.<br>Veuillez réessayer plus tard.</p>
                </div>
            `;
        });
});
