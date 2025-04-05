document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.nav-mobile');
    
    hamburger.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileNav.contains(event.target) && !hamburger.contains(event.target) && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile nav if open
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                hamburger.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Login Modal Functionality
    const loginBtn = document.querySelector('.login-btn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close-modal');

    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    closeModal.addEventListener('click', function() {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Form Submission Handling
    const collectionForm = document.getElementById('collectionForm');
    const formSuccess = document.getElementById('formSuccess');

    if (collectionForm) {
        collectionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateCollectionForm()) {
                // Here you would typically send the form data to a server
                // For demo purposes, we'll just show the success message
                collectionForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Scroll to the success message
                window.scrollTo({
                    top: formSuccess.offsetTop - 120,
                    behavior: 'smooth'
                });
                
                // Reset form after submission (useful if user navigates back)
                collectionForm.reset();
                
                // Optional: Reset form visibility after a few seconds
                setTimeout(function() {
                    formSuccess.style.display = 'none';
                    collectionForm.style.display = 'block';
                }, 5000);
            }
        });
    }

    // Form Validation Function
    function validateCollectionForm() {
        let isValid = true;
        
        // Basic validation example - add more specific validations as needed
        const requiredFields = collectionForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });
        
        // Check if at least one waste type is selected
        const wasteTypes = collectionForm.querySelectorAll('input[name="waste-type"]');
        const hasWasteTypeSelected = Array.from(wasteTypes).some(checkbox => checkbox.checked);
        
        if (!hasWasteTypeSelected) {
            // Add error class to waste type section
            document.querySelector('.checkbox-group').classList.add('error');
            isValid = false;
        } else {
            document.querySelector('.checkbox-group').classList.remove('error');
        }
        
        return isValid;
    }

    // Counter Animation for Impact Section
    const counterSection = document.querySelector('.impact');
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const targetValue = parseInt(counter.dataset.count);
            const startValue = 0;
            const duration = 2000; // Animation duration in milliseconds
            const increment = Math.ceil((targetValue - startValue) / (duration / 10));
            
            let currentValue = startValue;
            
            const counterInterval = setInterval(() => {
                currentValue += increment;
                counter.querySelector('.counter-value').textContent = currentValue;
                
                if (currentValue >= targetValue) {
                    clearInterval(counterInterval);
                    counter.querySelector('.counter-value').textContent = targetValue; // Ensure it ends at the target value
                }
            }, 10);
        });
        
        hasAnimated = true;
    }

    if (counterSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    animateCounters();
                    observer.unobserve(counterSection); // Stop observing after animation
                }
            });
        }, {
            root: null,
            threshold: 0.1 // Trigger when 10% of the section is visible
        });
        
        observer.observe(counterSection);
    }
});