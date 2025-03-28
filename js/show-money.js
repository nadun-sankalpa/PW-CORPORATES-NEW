// Declare particlesJS and gsap as global variables (assuming they are loaded externally)
var particlesJS;
var gsap;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js for money particles
    if (document.querySelector('.money-particles') && typeof particlesJS !== 'undefined') {
        particlesJS('money-particles', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    },
                    image: {
                        src: 'images/money-icon.png',
                        width: 100,
                        height: 100
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 5,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Initialize Particles.js for CTA section
    if (document.querySelector('.cta-particles') && typeof particlesJS !== 'undefined') {
        particlesJS('cta-particles', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.2,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
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

    // Testimonials Carousel
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const carouselDots = document.querySelector('.carousel-dots');
    
    if (testimonialsWrapper && testimonialCards.length > 0) {
        let currentIndex = 0;
        
        // Create dots
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            carouselDots.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.carousel-dot');
        
        // Go to slide
        function goToSlide(index) {
            currentIndex = index;
            testimonialsWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
        
        // Previous slide
        carouselPrev.addEventListener('click', function() {
            currentIndex = (currentIndex === 0) ? testimonialCards.length - 1 : currentIndex - 1;
            goToSlide(currentIndex);
        });
        
        // Next slide
        carouselNext.addEventListener('click', function() {
            currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
            goToSlide(currentIndex);
        });
        
        // Auto slide
        let slideInterval = setInterval(() => {
            currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
            goToSlide(currentIndex);
        }, 5000);
        
        // Pause on hover
        testimonialsWrapper.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialsWrapper.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
                goToSlide(currentIndex);
            }, 5000);
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
    const contactForm = document.getElementById('showMoneyContactForm');
    
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
        const statsSection = document.querySelector('.stats-container');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
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
        
        // Money Cards Animation
        gsap.from('.money-card', {
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
        
        // Process Steps Animation
        gsap.from('.process-step', {
            opacity: 0,
            x: -100,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.process-steps',
                start: 'top 80%'
            }
        });
        
        // Stats Animation
        gsap.from('.stat-item', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.stats-container',
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
        gsap.from('.contact-info .info-item', {
            opacity: 0,
            x: -50,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.contact-container',
                start: 'top 80%'
            }
        });
        
        gsap.from('.contact-form', {
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