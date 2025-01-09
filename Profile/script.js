// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Testimonials Slider
const testimonialsSlider = document.querySelector('.testimonials-slider');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.querySelector('.testimonial-dots');
let currentSlide = 0;

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    const slideWidth = testimonialCards[0].offsetWidth + 32; // Width + gap
    testimonialsSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Auto-slide
setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    updateSlider();
}, 5000);

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const buttonText = contactForm.querySelector('.button-text');
const buttonLoading = contactForm.querySelector('.button-loading');

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'flex';
        
        // Prepare the template parameters
        const templateParams = {
            from_name: this.name.value,
            from_email: this.email.value,
            message: this.message.value,
            to_email: 'prasadprem012345@gmail.com'
        };

        // Send email using EmailJS
        emailjs.send('default_service', 'template_id', templateParams) // Replace with your service and template IDs
            .then(() => {
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            })
            .catch((error) => {
                // Show error message
                alert('Oops! There was an error sending your message. Please try again later.');
                console.error('EmailJS error:', error);
            })
            .finally(() => {
                // Reset button state
                buttonText.style.display = 'block';
                buttonLoading.style.display = 'none';
            });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.backdropFilter = 'none';
    }
});

// Add animation to service cards on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});
