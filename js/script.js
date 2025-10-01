// TechPro Solutions - Professional Electrician & Plumbing Services Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Navigation Link
    function updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    updateActiveNavLink();

    // Service Category Navigation
    const categoryBtns = document.querySelectorAll('.category-btn');
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll to section
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Projects Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterBtns.length > 0 && projectItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Counter Animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    }

    // Initialize counters when in viewport
    function initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    if (!isNaN(target)) {
                        animateCounter(counter, target);
                        observer.unobserve(counter);
                    }
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    initCounters();

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const name = formData.get('name') || document.getElementById('name').value;
            const phone = formData.get('phone') || document.getElementById('phone').value;
            const service = formData.get('service') || document.getElementById('service').value;
            
            // Validate form
            if (!name || !phone || !service) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification(`Thank you ${name}! Your ${service} request has been received. We will contact you at ${phone} shortly.`, 'success');
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send the data to your server here
            // fetch('/submit-form', {
            //     method: 'POST',
            //     body: formData
            // }).then(response => {
            //     if (response.ok) {
            //         showNotification('Message sent successfully!', 'success');
            //         contactForm.reset();
            //     } else {
            //         showNotification('Failed to send message. Please try again.', 'error');
            //     }
            // }).catch(error => {
            //     showNotification('Network error. Please try again.', 'error');
            // });
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${icons[type] || 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add styles based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type] || '#3b82f6'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            max-width: 400px;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            hideNotification(notification);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                hideNotification(notification);
            }
        }, 5000);
    }
    
    function hideNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .feature-card, .project-item, .value-card, .team-member, .testimonial-card');
    animateElements.forEach(el => observer.observe(el));

    // Add animation classes
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .feature-card, .project-item, .value-card, .team-member, .testimonial-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .service-card.animate-in, 
        .feature-card.animate-in, 
        .project-item.animate-in, 
        .value-card.animate-in, 
        .team-member.animate-in, 
        .testimonial-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card:nth-child(1) { transition-delay: 0.1s; }
        .service-card:nth-child(2) { transition-delay: 0.2s; }
        .service-card:nth-child(3) { transition-delay: 0.3s; }
        
        .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .feature-card:nth-child(4) { transition-delay: 0.4s; }
        
        .project-item:nth-child(1) { transition-delay: 0.1s; }
        .project-item:nth-child(2) { transition-delay: 0.2s; }
        .project-item:nth-child(3) { transition-delay: 0.3s; }
        .project-item:nth-child(4) { transition-delay: 0.4s; }
        .project-item:nth-child(5) { transition-delay: 0.5s; }
        .project-item:nth-child(6) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });

    // Dynamic Year in Footer Copyright
    const yearElement = document.querySelector('.footer-copyright p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }

    // Service Cards Hover Effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('animate-in')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // WhatsApp Integration
    function initWhatsApp() {
        const whatsappBtn = document.querySelector('a[href*="whatsapp"]');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function(e) {
                // You can add tracking or additional functionality here
                console.log('WhatsApp button clicked');
            });
        }
    }

    initWhatsApp();

    // Phone Number Formatting
    function formatPhoneNumber(phone) {
        // Remove all non-numeric characters
        const cleaned = phone.replace(/\D/g, '');
        
        // Check if the number has a country code
        if (cleaned.length === 9 && !cleaned.startsWith('0')) {
            return `+966 ${cleaned}`;
        } else if (cleaned.length === 10 && cleaned.startsWith('0')) {
            return `+966 ${cleaned.substring(1)}`;
        }
        
        return phone;
    }

    // Initialize phone number formatting
    const phoneElements = document.querySelectorAll('[href^="tel:"]');
    phoneElements.forEach(element => {
        const phone = element.getAttribute('href').replace('tel:', '');
        const formatted = formatPhoneNumber(phone);
        element.setAttribute('href', `tel:${formatted}`);
        if (element.textContent.includes(phone)) {
            element.textContent = element.textContent.replace(phone, formatted);
        }
    });

    console.log('TechPro Solutions Website initialized successfully!');
});

// Additional utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { debounce };
}