// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js for page header
    if (document.querySelector('.page-header-particles')) {
        // Check if particlesJS is defined before using it
        if (typeof particlesJS !== 'undefined') {
            particlesJS('page-header-particles', {
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
                        value: 0.5,
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
        } else {
            console.error('particlesJS is not defined. Make sure the particles.js library is included.');
        }
    }

    // Video Modal
    const videoModal = document.getElementById('video-modal');
    const videoBtn = document.getElementById('overview-video-btn');
    const closeModal = document.querySelector('.close-modal');
    const videoIframe = document.querySelector('.video-container iframe');
    
    if (videoBtn && videoModal) {
        videoBtn.addEventListener('click', function() {
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

    // Pricing Tabs
    const pricingTabButtons = document.querySelectorAll('.pricing-tab-button');
    const monthlyPrices = document.querySelectorAll('.price.monthly');
    const yearlyPrices = document.querySelectorAll('.price.yearly');
    
    pricingTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            pricingTabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show/hide prices based on selected plan
            if (this.getAttribute('data-plan') === 'monthly') {
                monthlyPrices.forEach(price => price.style.display = 'inline');
                yearlyPrices.forEach(price => price.style.display = 'none');
            } else {
                monthlyPrices.forEach(price => price.style.display = 'none');
                yearlyPrices.forEach(price => price.style.display = 'inline');
            }
        });
    });

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
    const contactForm = document.getElementById('accountingContactForm');
    
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

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        // Animate floating elements
        gsap.to('.floating-element', {
            y: -20,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            stagger: 0.5
        });
        
        // Animate service cards on hover
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                gsap.to(this.querySelector('.service-icon'), {
                    y: -10,
                    scale: 1.1,
                    duration: 0.3
                });
            });
            
            card.addEventListener('mouseleave', function() {
                gsap.to(this.querySelector('.service-icon'), {
                    y: 0,
                    scale: 1,
                    duration: 0.3
                });
            });
        });
        
        // Animate timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
            
            if (index % 2 === 0) {
                tl.from(item, {
                    x: -100,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            } else {
                tl.from(item, {
                    x: 100,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            }
            
            tl.from(item.querySelector('.timeline-number'), {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(1.7)'
            }, '-=0.4');
        });
        
        // Animate team cards
        gsap.from('.team-card', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.team-grid',
                start: 'top 80%'
            }
        });
        
        // Animate pricing plans
        gsap.from('.pricing-plan', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.pricing-plans',
                start: 'top 80%'
            }
        });
        
        // Animate FAQ items
        gsap.from('.faq-item', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.faq-container',
                start: 'top 80%'
            }
        });
    } else {
        console.error('GSAP is not defined. Make sure the GSAP library is included.');
    }
});