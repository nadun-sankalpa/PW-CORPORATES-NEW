// Declare AOS and gsap as global variables (assuming they are loaded externally)
var AOS;
var gsap;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Search Form Submission
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = document.querySelector('.search-input');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // Here you would typically redirect to search results page
                // For demonstration, we'll just log it to console
                console.log('Searching for:', searchTerm);
                
                // You can redirect to a search results page like this:
                // window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
                
                // For now, just show an alert
                alert(`Searching for: ${searchTerm}`);
            }
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the email to your server
                // For demonstration, we'll just log it to console
                console.log('Newsletter subscription:', email);
                
                // Show success message
                alert('Thank you for subscribing to our newsletter!');
                
                // Reset form
                newsletterForm.reset();
            }
        });
    }

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        // Hero Section Animations
        gsap.from('.hero-title', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.5
        });
        
        gsap.from('.hero-subtitle', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.7
        });
        
        gsap.from('.search-container', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.9
        });
        
        // Blog Cards Animation
        gsap.from('.blog-card', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.blog-grid',
                start: 'top 80%'
            }
        });
        
        // Category Cards Animation
        gsap.from('.category-card', {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.categories-grid',
                start: 'top 80%'
            }
        });
        
        // Newsletter Animation
        gsap.from('.newsletter-text', {
            opacity: 0,
            x: -50,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.newsletter-section',
                start: 'top 80%'
            }
        });
        
        gsap.from('.newsletter-form', {
            opacity: 0,
            x: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.newsletter-section',
                start: 'top 80%'
            }
        });
    }
});