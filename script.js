document.addEventListener('DOMContentLoaded', function() {
    // All your existing JavaScript code here

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Testimonial slider
const testimonialContainer = document.querySelector('.testimonial-container');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const testimonials = document.querySelectorAll('.testimonial');

let index = 0;

function updateSlider() {
    testimonialContainer.style.transform = `translateX(-${index * 100}%)`;
}

prevBtn.addEventListener('click', () => {
    index = (index === 0) ? testimonials.length - 1 : index - 1;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    index = (index === testimonials.length - 1) ? 0 : index + 1;
    updateSlider();
});

// Auto slide every 5 seconds
setInterval(() => {
    index = (index === testimonials.length - 1) ? 0 : index + 1;
    updateSlider();
}, 5000);

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        }
    });
});
// Get modal elements
const modal = document.getElementById('consultationModal');
const consultationBtns = document.querySelectorAll('.btn, .cta-btn');
const closeBtn = document.querySelector('.close-modal');
const consultationForm = document.getElementById('consultationForm');
const consultationType = document.getElementById('consultationType');
const otherTopicGroup = document.getElementById('otherTopicGroup');

// Open modal when consultation buttons are clicked
consultationBtns.forEach(btn => {
    if (btn.textContent.includes('Consultation') || btn.textContent.includes('Get Started')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
        });
    }
});

// Close modal when X is clicked
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside of modal content
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});

// Show "Other" field when "Other" is selected in consultation type
consultationType.addEventListener('change', function() {
    if (this.value === 'other') {
        otherTopicGroup.style.display = 'block';
    } else {
        otherTopicGroup.style.display = 'none';
    }
});

// Form validation and submission
consultationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value) {
            isValid = false;
            field.style.borderColor = 'red';
        } else {
            field.style.borderColor = '';
        }
    });
    
    if (consultationType.value === 'other' && !document.getElementById('otherTopic').value) {
        document.getElementById('otherTopic').style.borderColor = 'red';
        isValid = false;
    }
    
    // If form is valid, process submission
    if (isValid) {
        // Here you would typically send the form data to your server
        // For this example, we'll just show a success message
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <h3>Thank you for your request!</h3>
            <p>We've received your consultation request and will contact you within 24 hours using your preferred contact method.</p>
            <button id="closeSuccess" class="submit-btn">Close</button>
        `;
        
        // Replace form with success message
        consultationForm.innerHTML = '';
        consultationForm.appendChild(successMessage);
        
        // Close modal when success message button is clicked
        document.getElementById('closeSuccess').addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset form (you might want to do this after modal is closed)
            setTimeout(() => {
                consultationForm.innerHTML = ''; // Clear success message
                location.reload(); // Reload page to reset the form
                // Alternative to reload: re-inject the original form HTML
            }, 300);
        });
    }
});

// Add this style for success message
const style = document.createElement('style');
style.textContent = `
    .success-message {
        text-align: center;
        padding: 20px;
    }
    .success-message h3 {
        color: var(--secondary);
        margin-bottom: 15px;
    }
    .success-message p {
        margin-bottom: 25px;
    }
`;
document.head.appendChild(style);
});