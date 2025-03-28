// Declare particlesJS and gsap as global variables (assuming they are loaded externally)
var particlesJS;
var gsap;
var AOS; // Declare AOS

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Video Modal
    const videoModal = document.getElementById('video-modal');
    const playButton = document.getElementById('play-video');
    const closeModal = document.querySelector('.close-modal');
    const videoIframe = document.querySelector('.video-frame iframe');
    
    if (playButton && videoModal) {
        playButton.addEventListener('click', function() {
            videoModal.classList.add('active');
            // Set the video URL (replace with your actual video URL)
            videoIframe.setAttribute('src', 'https://www.youtube.com/embed/VIDEO_ID?autoplay=1');
        });
        
        closeModal.addEventListener('click', function() {
            videoModal.classList.remove('active');
            // Stop the video when closing the modal
            videoIframe.setAttribute('src', '');
        });
        
        // Close modal when clicking outside the content
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                videoIframe.setAttribute('src', '');
            }
        });
    }

    // Services Tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Team Slider
    const teamSlider = document.querySelector('.team-slider-container');
    const teamMembers = document.querySelectorAll('.team-member');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    const sliderDots = document.querySelector('.slider-dots');
    
    if (teamSlider && teamMembers.length > 0) {
        let currentSlide = 0;
        let slideWidth = 0;
        let slidesToShow = 3;
        let slideInterval;
        
        // Responsive slidesToShow
        function updateSlidesToShow() {
            if (window.innerWidth < 768) {
                slidesToShow = 1;
            } else if (window.innerWidth < 992) {
                slidesToShow = 2;
            } else {
                slidesToShow = 3;
            }
            
            slideWidth = teamSlider.clientWidth / slidesToShow;
            teamMembers.forEach(member => {
                member.style.minWidth = `${slideWidth}px`;
            });
            
            goToSlide(currentSlide);
        }
        
        // Initialize slider
        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        
        // Create dots
        const totalSlides = Math.ceil(teamMembers.length / slidesToShow);
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            sliderDots.appendChild(dot);
        }
        
        const dots = document.querySelectorAll('.slider-dot');
        
        // Go to slide
        function goToSlide(index) {
            currentSlide = index;
            const maxSlide = teamMembers.length - slidesToShow;
            const slidePosition = index > maxSlide ? maxSlide : index;
            teamSlider.style.transform = `translateX(-${slidePosition * slideWidth}px)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        // Previous slide
        sliderPrev.addEventListener('click', function() {
            currentSlide = (currentSlide === 0) ? Math.ceil(teamMembers.length / slidesToShow) - 1 : currentSlide - 1;
            goToSlide(currentSlide);
            resetInterval();
        });
        
        // Next slide
        sliderNext.addEventListener('click', function() {
            currentSlide = (currentSlide === Math.ceil(teamMembers.length / slidesToShow) - 1) ? 0 : currentSlide + 1;
            goToSlide(currentSlide);
            resetInterval();
        });
        
        // Auto slide
        function startInterval() {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide === Math.ceil(teamMembers.length / slidesToShow) - 1) ? 0 : currentSlide + 1;
                goToSlide(currentSlide);
            }, 5000);
        }
        
        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }
        
        startInterval();
        
        // Pause on hover
        teamSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        teamSlider.addEventListener('mouseleave', () => {
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
    const contactForm = document.getElementById('legalContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to your server
            // For demonstration, we'll just log it to console
            console.log('Form submitted:', { name, email, phone, service, message });
            
            // Show success message (you can replace this with your own implementation)
            alert('Thank you for your message! We will contact you shortly.');
            
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
        const statsContainer = document.querySelector('.stats-container');
        
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
        
        // Floating Badges Animation
        gsap.from('.floating-badge', {
            opacity: 0,
            scale: 0,
            duration: 0.8,
            stagger: 0.2,
            delay: 1.1,
            ease: 'back.out(1.7)'
        });
        
        // Feature Cards Animation
        gsap.from('.feature-card', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 80%'
            }
        });
        
        // About Section Animations
        gsap.from('.play-button', {
            opacity: 0,
            scale: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.video-container',
                start: 'top 80%'
            }
        });
        
        // Process Steps Animation
        gsap.from('.process-step', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.process-steps',
                start: 'top 80%'
            }
        });
        
        // Testimonials Animation
        gsap.from('.testimonial-card', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.testimonials-container',
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
        
        gsap.from('.contact-info', {
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