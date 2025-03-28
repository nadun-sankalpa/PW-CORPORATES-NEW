// Declare AOS and gsap as global variables (assuming they are loaded externally)
var AOS;
var gsap;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Destinations Carousel
    const carouselContainer = document.querySelector('.carousel-container');
    const destinationCards = document.querySelectorAll('.destination-card');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const carouselDots = document.querySelector('.carousel-dots');
    
    if (carouselContainer && destinationCards.length > 0) {
        let currentIndex = 0;
        let cardWidth = 0;
        let cardsToShow = 3;
        
        // Responsive cardsToShow
        function updateCardsToShow() {
            if (window.innerWidth < 768) {
                cardsToShow = 1;
            } else if (window.innerWidth < 992) {
                cardsToShow = 2;
            } else {
                cardsToShow = 3;
            }
            
            cardWidth = carouselContainer.clientWidth / cardsToShow;
            destinationCards.forEach(card => {
                card.style.minWidth = `${cardWidth}px`;
            });
            
            scrollToCard(currentIndex);
        }
        
        // Initialize carousel
        updateCardsToShow();
        window.addEventListener('resize', updateCardsToShow);
        
        // Create dots
        const totalDots = Math.ceil(destinationCards.length / cardsToShow);
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => scrollToCard(i * cardsToShow));
            carouselDots.appendChild(dot);
        }
        
        const dots = document.querySelectorAll('.carousel-dot');
        
        // Scroll to card
        function scrollToCard(index) {
            currentIndex = index;
            const maxIndex = destinationCards.length - cardsToShow;
            const scrollPosition = index > maxIndex ? maxIndex : index;
            carouselContainer.scrollTo({
                left: scrollPosition * cardWidth,
                behavior: 'smooth'
            });
            
            // Update dots
            const activeDotIndex = Math.floor(currentIndex / cardsToShow);
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === activeDotIndex);
            });
        }
        
        // Previous slide
        carouselPrev.addEventListener('click', function() {
            currentIndex = Math.max(0, currentIndex - cardsToShow);
            scrollToCard(currentIndex);
        });
        
        // Next slide
        carouselNext.addEventListener('click', function() {
            currentIndex = Math.min(destinationCards.length - 1, currentIndex + cardsToShow);
            scrollToCard(currentIndex);
        });
        
        // Handle scroll events to update dots
        carouselContainer.addEventListener('scroll', function() {
            const scrollPosition = carouselContainer.scrollLeft;
            const activeIndex = Math.round(scrollPosition / cardWidth);
            const activeDotIndex = Math.floor(activeIndex / cardsToShow);
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === activeDotIndex);
            });
        });
    }

    // Testimonials Slider
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    const testimonials = document.querySelectorAll('.testimonial');
    const sliderPrev = document.querySelector('.testimonials-section .slider-prev');
    const sliderNext = document.querySelector('.testimonials-section .slider-next');
    const sliderDots = document.querySelector('.testimonials-section .slider-dots');
    
    if (testimonialsWrapper && testimonials.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        
        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.testimonials-section .slider-dot');
        
        // Go to slide
        function goToSlide(index) {
            currentSlide = index;
            testimonialsWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        // Previous slide
        sliderPrev.addEventListener('click', function() {
            currentSlide = (currentSlide === 0) ? testimonials.length - 1 : currentSlide - 1;
            goToSlide(currentSlide);
            resetInterval();
        });
        
        // Next slide
        sliderNext.addEventListener('click', function() {
            currentSlide = (currentSlide === testimonials.length - 1) ? 0 : currentSlide + 1;
            goToSlide(currentSlide);
            resetInterval();
        });
        
        // Auto slide
        function startInterval() {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide === testimonials.length - 1) ? 0 : currentSlide + 1;
                goToSlide(currentSlide);
            }, 5000);
        }
        
        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }
        
        startInterval();
        
        // Pause on hover
        testimonialsWrapper.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialsWrapper.addEventListener('mouseleave', () => {
            startInterval();
        });
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
    const contactForm = document.getElementById('tourismContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const travelDate = document.getElementById('travel-date').value;
            const duration = document.getElementById('duration').value;
            const travelers = document.getElementById('travelers').value;
            const interests = document.getElementById('interests').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to your server
            // For demonstration, we'll just log it to console
            console.log('Form submitted:', { 
                name, 
                email, 
                phone, 
                travelDate, 
                duration, 
                travelers, 
                interests, 
                message 
            });
            
            // Show success message (you can replace this with your own implementation)
            alert('Thank you for your message! We will contact you shortly to discuss your travel plans.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');

    function startCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 16ms per frame (approx 60fps)
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.round(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Intersection Observer for counter animation
    if (counters.length > 0) {
        const statsContainer = document.querySelector('.about-stats');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsContainer);
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
        
        gsap.from('.hero-buttons', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.9
        });
        
        gsap.from('.hero-features .feature', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.2,
            delay: 1.1
        });
        
        // About Section Animations
        gsap.from('.gallery-item', {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.image-gallery',
                start: 'top 80%'
            }
        });
        
        // Services Animation
        gsap.from('.service-card', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%'
            }
        });
        
        // Package Cards Animation
        gsap.from('.package-card', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.packages-grid',
                start: 'top 80%'
            }
        });
        
        // FAQ Animation
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
        
        // Contact Animation
        gsap.from('.contact-form', {
            opacity: 0,
            x: -50,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact-container',
                start: 'top 80%'
            }
        });
    }
});