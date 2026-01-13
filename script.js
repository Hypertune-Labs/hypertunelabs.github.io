document.addEventListener('DOMContentLoaded', function() {
    const contactTrigger = document.getElementById('contactTrigger');
    const emailForm = document.getElementById('emailForm');
    const emailFormElement = document.getElementById('emailFormElement');
    const emailInput = document.getElementById('emailInput');
    const messageInput = document.getElementById('messageInput');
    const submitBtn = document.querySelector('.submit-btn');
    
    let isFormVisible = false;
    let isSubmitting = false;
    
    // Toggle email form visibility
    contactTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (!isFormVisible) {
            // Show form
            emailForm.classList.add('visible');
            contactTrigger.classList.add('hidden');
            isFormVisible = true;
            
            // Focus input after animation
            setTimeout(() => {
                emailInput.focus();
            }, 300);
        }
    });
    
    // Handle form submission
    emailFormElement.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        if (email && isValidEmail(email) && message) {
            isSubmitting = true;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Send email using EmailJS
                await sendEmail(email, message);
                
                // Show success
                submitBtn.textContent = 'Sent ✓';
                submitBtn.style.background = 'rgba(76, 175, 80, 0.2)';
                submitBtn.style.borderColor = 'rgba(76, 175, 80, 0.4)';
                
                // Reset form
                emailInput.value = '';
                messageInput.value = '';
                
                // Hide form after a brief moment
                setTimeout(() => {
                    emailForm.classList.remove('visible');
                    contactTrigger.classList.remove('hidden');
                    isFormVisible = false;
                    submitBtn.textContent = 'Send';
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                }, 2000);
            } catch (error) {
                console.error('Error sending email:', error);
                submitBtn.textContent = 'Error - Try Again';
                submitBtn.style.background = 'rgba(244, 67, 54, 0.2)';
                submitBtn.style.borderColor = 'rgba(244, 67, 54, 0.4)';
                
                setTimeout(() => {
                    submitBtn.textContent = 'Send';
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                }, 2000);
            } finally {
                isSubmitting = false;
                submitBtn.disabled = false;
            }
        } else {
            // Shake animation for invalid input
            if (!email || !isValidEmail(email)) {
                emailInput.style.animation = 'shake 0.3s';
                setTimeout(() => {
                    emailInput.style.animation = '';
                }, 300);
            }
            if (!message) {
                messageInput.style.animation = 'shake 0.3s';
                setTimeout(() => {
                    messageInput.style.animation = '';
                }, 300);
            }
        }
    });
    
    // Close form on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isFormVisible && !isSubmitting) {
            emailForm.classList.remove('visible');
            contactTrigger.classList.remove('hidden');
            isFormVisible = false;
            emailInput.value = '';
            messageInput.value = '';
        }
    });
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Send email function
    async function sendEmail(email, message) {
        // Using EmailJS service
        // You'll need to set up EmailJS at https://www.emailjs.com/
        // Replace these with your EmailJS service ID, template ID, and public key
        
        const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
        const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
        const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key
        
        // If EmailJS is not configured, use mailto as fallback
        if (serviceID === 'YOUR_SERVICE_ID' || templateID === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
            // Fallback to mailto link
            const subject = encodeURIComponent('Contact from Hypertune Labs Website');
            const body = encodeURIComponent(`From: ${email}\n\nMessage:\n${message}`);
            window.location.href = `mailto:james@hypertunelabs.com?subject=${subject}&body=${body}`;
            return Promise.resolve();
        }
        
        // Load EmailJS library dynamically if not already loaded
        if (typeof emailjs === 'undefined') {
            await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js');
            emailjs.init(publicKey);
        }
        
        const templateParams = {
            to_email: 'james@hypertunelabs.com',
            from_email: email,
            message: message,
            reply_to: email
        };
        
        return emailjs.send(serviceID, templateID, templateParams);
    }
    
    // Helper to load script dynamically
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
});

// Add shake animation for invalid email
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-8px); }
        75% { transform: translateX(8px); }
    }
`;
document.head.appendChild(style);
