// DOM Elements
const DOM = {
    menuBtn: document.querySelector('#menu-btn'),
    navbar: document.querySelector('.navbar'),
    header: document.querySelector('.header'),
    slides: document.querySelectorAll('.slide-container .slide'),
    nextBtn: document.querySelector('#next-slide'),
    prevBtn: document.querySelector('#prev-slide'),
    slideContainer: document.querySelector('.slide-container'),
    lightbox: document.querySelector('.lightbox'),
    lightboxImg: document.querySelector('.lightbox-img'),
    closeLightbox: document.querySelector('.lightbox .close-btn'),
    reservationModal: document.querySelector('.reservation-modal'),
    closeModal: document.querySelector('.close-modal'),
    modalOverlay: document.querySelector('.modal-overlay'),
    reservationBtns: document.querySelectorAll('.reservation-btn, .btn-outline'),
    contactForm: document.querySelector('.contact-form'),
    reservationForm: document.querySelector('.reservation-form'),
    newsletterForm: document.querySelector('.footer form'),
    currentYear: document.querySelector('#current-year')
};

// Track overlay state
let overlayCount = 0;

// Initialize the website
function init() {
    setupNavbar();
    setupSlider();
    setupLightbox();
    setupModals();
    setupForms();
    setupScroll();
    setupCurrentYear();
    setupIntersectionObserver();
}

// Setup navbar toggle functionality
function setupNavbar() {
    DOM.menuBtn.addEventListener('click', () => {
        const isExpanded = DOM.menuBtn.getAttribute('aria-expanded') === 'true';
        DOM.menuBtn.setAttribute('aria-expanded', !isExpanded);
        DOM.navbar.classList.toggle('active');
        toggleBodyOverflow();
    });

    // Close navbar when clicking on links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            DOM.menuBtn.setAttribute('aria-expanded', 'false');
            DOM.navbar.classList.remove('active');
            toggleBodyOverflow();
        });
    });

    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        DOM.header.classList.toggle('sticky', window.scrollY > 100);
    });
}

// Setup hero slider functionality
function setupSlider() {
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        DOM.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % DOM.slides.length;
        showSlide(currentSlide);
        resetSlideTimer();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + DOM.slides.length) % DOM.slides.length;
        showSlide(currentSlide);
        resetSlideTimer();
    }

    function startSlideTimer() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetSlideTimer() {
        clearInterval(slideInterval);
        startSlideTimer();
    }

    DOM.nextBtn.addEventListener('click', nextSlide);
    DOM.prevBtn.addEventListener('click', prevSlide);

    // Pause on hover/touch
    DOM.slideContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    DOM.slideContainer.addEventListener('mouseleave', startSlideTimer);
    DOM.slideContainer.addEventListener('touchstart', () => clearInterval(slideInterval));
    DOM.slideContainer.addEventListener('touchend', startSlideTimer);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Initialize slider
    showSlide(0);
    startSlideTimer();
}

// Setup gallery lightbox functionality
function setupLightbox() {
    document.querySelectorAll('.gallery .box').forEach(box => {
        box.addEventListener('click', () => {
            const imgSrc = box.querySelector('img').src;
            DOM.lightboxImg.src = imgSrc;
            openOverlay(DOM.lightbox);
        });
    });

    DOM.closeLightbox.addEventListener('click', () => {
        closeOverlay(DOM.lightbox);
    });

    DOM.lightbox.addEventListener('click', (e) => {
        if (e.target === DOM.lightbox) {
            closeOverlay(DOM.lightbox);
        }
    });
}

// Setup modal functionality
function setupModals() {
    function openModal() {
        openOverlay(DOM.reservationModal);
    }

    function closeModal() {
        closeOverlay(DOM.reservationModal);
    }

    DOM.reservationBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    DOM.closeModal.addEventListener('click', closeModal);
    DOM.modalOverlay.addEventListener('click', closeModal);

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && DOM.reservationModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Setup form handling
function setupForms() {
    function handleFormSubmit(form, successMessage) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            // Show success message
            const successElement = document.createElement('div');
            successElement.className = 'success-message';
            successElement.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>${successMessage}</p>
            `;
            
            // Remove any existing messages
            const existingMsg = form.querySelector('.success-message');
            if (existingMsg) existingMsg.remove();
            
            form.appendChild(successElement);
            form.reset();
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successElement.remove();
            }, 3000);
        });
    }

    // Contact form
    handleFormSubmit(
        DOM.contactForm, 
        'Message sent successfully! We will contact you soon.'
    );

    // Reservation form
    handleFormSubmit(
        DOM.reservationForm,
        'Reservation booked successfully! We\'ll see you soon.'
    );
    DOM.reservationForm.addEventListener('submit', () => {
        setTimeout(() => {
            closeOverlay(DOM.reservationModal);
        }, 1500);
    });

    // Newsletter form
    handleFormSubmit(
        DOM.newsletterForm, 
        'Thank you for subscribing to our newsletter!'
    );
}

// Setup smooth scrolling
function setupScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = DOM.header.offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup current year in footer
function setupCurrentYear() {
    if (DOM.currentYear) {
        DOM.currentYear.textContent = new Date().getFullYear();
    }
}

// Setup Intersection Observer for animations
function setupIntersectionObserver() {
    const animateElements = document.querySelectorAll('.box, .heading, .content, .chefs .box, .testimonials .box');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Overlay management functions
function openOverlay(element) {
    element.classList.add('active');
    element.setAttribute('aria-hidden', 'false');
    overlayCount++;
    toggleBodyOverflow();
}

function closeOverlay(element) {
    element.classList.remove('active');
    element.setAttribute('aria-hidden', 'true');
    overlayCount--;
    toggleBodyOverflow();
}

function toggleBodyOverflow() {
    document.body.style.overflow = overlayCount > 0 ? 'hidden' : 'auto';
}

// Initialize the website when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}