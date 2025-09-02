class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.successMessage = document.getElementById('successMessage');
        this.fields = {
            fullName: document.getElementById('fullName'),
            email: document.getElementById('email'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message')
        };
        
        this.init();
    }

    init() {
        this.addEventListeners();
        this.setupMessageCounter();
    }

    addEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            field.addEventListener('blur', () => this.validateField(fieldName));
            field.addEventListener('input', () => {
                this.clearFieldError(fieldName);
                if (fieldName === 'message') {
                    this.updateMessageCounter();
                }
            });
        });
    }

    setupMessageCounter() {
        const messageField = this.fields.message;
        const counter = document.getElementById('messageCount');
        const maxLength = 500;

        this.updateMessageCounter = () => {
            const length = messageField.value.length;
            counter.textContent = `${length}/${maxLength} characters`;
            
            if (length > maxLength) {
                counter.style.color = '#e74c3c';
                messageField.value = messageField.value.substring(0, maxLength);
                counter.textContent = `${maxLength}/${maxLength} characters`;
            } else if (length > maxLength * 0.9) {
                counter.style.color = '#f39c12';
            } else {
                counter.style.color = '#6c757d';
            }
        };
    }

    validateField(fieldName) {
        const field = this.fields[fieldName];
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'fullName':
                if (!value) {
                    errorMessage = 'Full name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Full name must be at least 2 characters';
                    isValid = false;
                } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                    errorMessage = 'Full name can only contain letters, spaces, hyphens, and apostrophes';
                    isValid = false;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email address is required';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'subject':
                if (!value) {
                    errorMessage = 'Subject is required';
                    isValid = false;
                } else if (value.length < 3) {
                    errorMessage = 'Subject must be at least 3 characters';
                    isValid = false;
                }
                break;

            case 'message':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                }
                break;
        }

        if (isValid) {
            this.showFieldSuccess(fieldName);
        } else {
            this.showFieldError(fieldName, errorMessage);
        }

        return isValid;
    }

    showFieldError(fieldName, message) {
        const formGroup = this.fields[fieldName].closest('.form-group');
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    showFieldSuccess(fieldName) {
        const formGroup = this.fields[fieldName].closest('.form-group');
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
    }

    clearFieldError(fieldName) {
        const formGroup = this.fields[fieldName].closest('.form-group');
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        formGroup.classList.remove('error');
        errorElement.style.display = 'none';
    }

    validateForm() {
        let isFormValid = true;
        
        Object.keys(this.fields).forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        // Show loading state
        this.submitBtn.disabled = true;
        this.submitBtn.classList.add('loading');
        this.submitBtn.textContent = '';

        try {
            // Simulate form submission
            await this.simulateSubmission();
            this.showSuccess();
        } catch (error) {
            this.showError('Something went wrong. Please try again.');
        } finally {
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('loading');
            this.submitBtn.textContent = 'Send Message';
        }
    }

    simulateSubmission() {
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        });
    }

    showSuccess() {
        this.successMessage.style.display = 'block';
        this.form.reset();
        this.updateMessageCounter();
        
        // Clear all validation states
        Object.keys(this.fields).forEach(fieldName => {
            const formGroup = this.fields[fieldName].closest('.form-group');
            formGroup.classList.remove('error', 'success');
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
            this.successMessage.style.display = 'none';
        }, 5000);
    }

    showError(message) {
        alert(message); // In a real app, you'd want a better error display
    }
}

// Initialize the form when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});