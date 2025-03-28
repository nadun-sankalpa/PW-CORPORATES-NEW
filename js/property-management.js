// Declare particlesJS and gsap as global variables (assuming they are loaded externally)
var particlesJS;
var gsap;
var AOS; // Declare AOS

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    const sliderDots = document.querySelector('.slider-dots');
    
    if (heroSlides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        
        // Create dots
        heroSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.slider-dot');
        
        // Go to slide
        function goToSlide(index) {
            // Hide current slide
            heroSlides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            // Show new slide
            currentSlide = index;
            heroSlides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        // Previous slide
        sliderPrev.addEventListener('click', function() {
            currentSlide = (currentSlide === 0) ? heroSlides.length - 1 : currentSlide - 1;
            goToSlide(currentSlide);
            resetInterval();
        });
        
        // Next slide
        sliderNext.addEventListener('click', function() {
            currentSlide = (currentSlide === heroSlides.length - 1) ? 0 : currentSlide + 1;
            goToSlide(currentSlide);
            resetInterval();
        });
        
        // Auto slide
        function startInterval() {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide === heroSlides.length - 1) ? 0 : currentSlide + 1;
                goToSlide(currentSlide);
            }, 6000);
        }
        
        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }
        
        startInterval();
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('propertyContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const propertyType = document.getElementById('property-type').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to your server
            // For demonstration, we'll just log it to console
            console.log('Form submitted:', { name, email, phone, propertyType, message });
            
            // Show success message (you can replace this with your own implementation)
            alert('Thank you for your message! We will contact you shortly.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        // About Section Animations
        gsap.from('.about-image .grid-item', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.about-image',
                start: 'top 80%'
            }
        });
        
        gsap.from('.experience-badge', {
            opacity: 0,
            scale: 0,
            duration: 0.8,
            delay: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.about-image',
                start: 'top 80%'
            }
        });
        
        // Property Types Animations
        gsap.from('.property-type', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.property-types-grid',
                start: 'top 80%'
            }
        });
        
        // Timeline Animations
        gsap.from('.timeline-item', {
            opacity: 0,
            x: function(i) {
                return i % 2 === 0 ? -100 : 100;
            },
            duration: 0.8,
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.process-timeline',
                start: 'top 80%'
            }
        });
        
        gsap.from('.timeline-dot', {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            stagger: 0.3,
            delay: 0.3,
            scrollTrigger: {
                trigger: '.process-timeline',
                start: 'top 80%'
            }
        });
        
        // Testimonials Animations
        gsap.from('.testimonial-box', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.testimonials-container',
                start: 'top 80%'
            }
        });
        
        // FAQ Animations
        gsap.from('.faq-item', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.faq-container',
                start: 'top 80%'
            }
        });
        
        // Contact Animations
        gsap.from('.contact-form-container', {
            opacity: 0,
            x: -50,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact-container',
                start: 'top 80%'
            }
        });
        
        gsap.from('.contact-info-container', {
            opacity: 0,
            x: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact-container',
                start: 'top 80%'
            }
        });
    }
});