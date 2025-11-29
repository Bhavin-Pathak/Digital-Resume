// 1. SMOOTH SCROLL ENHANCEMENT
function initializeSmoothScroll() {
    // Get all anchor links that point to sections on the page
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    // Add click event listeners to each anchor link
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Skip if it's just "#"
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Scroll to target with smooth behavior
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

function initializeKeyboardNavigation() {
    // Add keyboard support for theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
}   
// Debounce function to limit the rate of function calls    
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
// Handle window resize events
function handleResize() {
    const existingToggles = document.querySelectorAll('.job-toggle');
    if (window.innerWidth >= 768 && existingToggles.length > 0) {
        existingToggles.forEach(toggle => toggle.remove());
        const responsibilities = document.querySelectorAll('.job-responsibilities');
        responsibilities.forEach(resp => {
            resp.style.display = 'block';
        });
    }
}
// 2. INITIALIZATION 
function init() {
    // Core features
    initializeSmoothScroll();
    initializeKeyboardNavigation();
    window.addEventListener('resize', debounce(handleResize, 250));
    // Log initialization for debugging
    console.log('Digital Resume initialized successfully');
}
// 3. EVENT LISTENERS
// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM is already loaded
    init();
}
// functions for testing (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeSmoothScroll,
        initializeKeyboardNavigation
    };
}
