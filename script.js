// Portfolio JavaScript - Interactive Functionality

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeScrollEffects();
    initializeParticleBackground();
    initializeTypewriterEffect();
});

// Navigation System
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            updateActiveNav(this);
        });
    });

    // Show initial section
    showSection('home');
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const targetSection = document.getElementById(sectionId);

    // Hide all sections with fade out
    sections.forEach(section => {
        if (section.classList.contains('active')) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';

            setTimeout(() => {
                section.classList.remove('active');
                section.style.display = 'none';
            }, 300);
        }
    });

    // Show target section with fade in
    setTimeout(() => {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');

        setTimeout(() => {
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';

            // Trigger section-specific animations
            triggerSectionAnimations(sectionId);
        }, 50);
    }, 300);
}

function updateActiveNav(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Scroll to section function for buttons
function scrollToSection(sectionId) {
    showSection(sectionId);
    const targetNav = document.querySelector(`[href="#${sectionId}"]`);
    if (targetNav) {
        updateActiveNav(targetNav);
    }
}

// Make scrollToSection available globally
window.scrollToSection = scrollToSection;

// Animation Controllers
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all glass cards and timeline items
    document.querySelectorAll('.glass-card, .timeline-item, .project-card').forEach(el => {
        observer.observe(el);
    });

    // Add hover effects to project cards
    addProjectHoverEffects();
}

function triggerSectionAnimations(sectionId) {
    const section = document.getElementById(sectionId);

    switch (sectionId) {
        case 'home':
            animateHomeSection();
            break;
        case 'about':
            animateSkillTags();
            break;
        case 'experience':
            animateTimeline();
            break;
        case 'projects':
            animateProjects();
            break;
        case 'research':
            animateResearchItems();
            break;
        case 'contact':
            animateContactForm();
            break;
    }
}

function animateHomeSection() {
    const heroElements = document.querySelectorAll('.hero-title span, .hero-description, .hero-buttons');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Animate code window
    setTimeout(() => {
        const codeWindow = document.querySelector('.code-window');
        if (codeWindow) {
            codeWindow.style.opacity = '0';
            codeWindow.style.transform = 'translateX(50px)';
            codeWindow.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';

            setTimeout(() => {
                codeWindow.style.opacity = '1';
                codeWindow.style.transform = 'translateX(0)';
            }, 100);
        }
    }, 800);
}

function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8) translateY(20px)';

        setTimeout(() => {
            tag.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1) translateY(0)';
        }, index * 100);
    });
}

function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';

        setTimeout(() => {
            item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 300);
    });
}

function animateProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';

        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 200);
    });
}

function animateResearchItems() {
    const researchItems = document.querySelectorAll('.research-item');
    researchItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';

        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function animateContactForm() {
    const formElements = document.querySelectorAll('.form-group, .contact-method');
    formElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(30px)';

        setTimeout(() => {
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateX(0)';
        }, index * 150);
    });
}

// Project Card Hover Effects
function addProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Add glow effect
            this.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.25), 0 0 30px rgba(59, 130, 246, 0.1)';

            // Animate project icon
            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function () {
            this.style.boxShadow = '';

            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Contact Form Handler
function initializeContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            handleFormSubmission(this);
        });

        // Add form field animations
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function () {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function () {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

function handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully!', 'success');

        // Reset form
        form.reset();

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }, 2000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(59, 130, 246, 0.9)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        border: 1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)'};
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('#home');

        if (hero && hero.classList.contains('active')) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Navigation background on scroll
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(15, 23, 42, 0.8)';
            nav.style.backdropFilter = 'blur(25px)';
        } else {
            nav.style.background = 'rgba(15, 23, 42, 0.3)';
            nav.style.backdropFilter = 'blur(20px)';
        }
    });
}

// Particle Background Effect
function initializeParticleBackground() {
    createFloatingParticles();
}

function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;

    document.body.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 20 + 10;
    const opacity = Math.random() * 0.5 + 0.1;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(45deg, rgba(59, 130, 246, ${opacity}), rgba(147, 51, 234, ${opacity}));
        border-radius: 50%;
        left: ${left}%;
        top: 100%;
        animation: floatUp ${animationDuration}s linear infinite;
        box-shadow: 0 0 ${size * 2}px rgba(59, 130, 246, 0.3);
    `;

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
        // Create a new particle to maintain count
        createParticle(container);
    }, animationDuration * 1000);
}

// Typewriter Effect for Hero Section
function initializeTypewriterEffect() {
    const roles = ['Software Engineer', 'Sound Engineer', 'Full Stack Web Developer', 'Problem Solver', 'Tech Enthusiast', 'Creative Coder'];
    const roleElement = document.querySelector('.role');
    let currentRole = 0;
    let currentChar = 0;
    let isDeleting = false;

    function typeWriter() {
        const role = roles[currentRole];

        if (isDeleting) {
            roleElement.textContent = role.substring(0, currentChar - 1);
            currentChar--;
        } else {
            roleElement.textContent = role.substring(0, currentChar + 1);
            currentChar++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && currentChar === role.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentRole = (currentRole + 1) % roles.length;
            typeSpeed = 500; // Pause before starting new word
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typewriter effect after initial animation
    setTimeout(typeWriter, 2000);
}

// Hamburger Menu Functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on nav links (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside (mobile)
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Advanced Scroll Animations
function initializeAdvancedScrollAnimations() {
    // Smooth reveal animations for sections
    const revealElements = document.querySelectorAll('.glass-card, .timeline-item, .project-card, .research-item');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Add stagger effect for multiple elements
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 100}ms`;
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

// Interactive Code Window Animation
function animateCodeWindow() {
    const codeLines = document.querySelectorAll('.code-line');

    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            line.style.transition = 'all 0.5s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 300 + 1000);
    });

    // Add typing cursor effect
    const lastLine = codeLines[codeLines.length - 1];
    if (lastLine) {
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        cursor.style.cssText = `
            animation: blink 1s infinite;
            color: #3b82f6;
            font-weight: bold;
        `;
        lastLine.appendChild(cursor);
    }
}

// Skill Progress Animation
function animateSkillProgress() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach((tag, index) => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1) translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Timeline Interaction
function enhanceTimelineInteraction() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const dot = this.querySelector('.timeline-dot');
            if (dot) {
                dot.style.transform = 'scale(1.5)';
                dot.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.6)';
            }

            this.style.transform = 'translateX(10px)';
        });

        item.addEventListener('mouseleave', function () {
            const dot = this.querySelector('.timeline-dot');
            if (dot) {
                dot.style.transform = 'scale(1)';
                dot.style.boxShadow = '';
            }

            this.style.transform = 'translateX(0)';
        });
    });
}

// Project Card Advanced Interactions
function enhanceProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        // 3D tilt effect
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });

        // Animate tech tags on hover
        const techTags = card.querySelectorAll('.project-tech span');
        card.addEventListener('mouseenter', function () {
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-3px)';
                    tag.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                }, index * 50);
            });
        });

        card.addEventListener('mouseleave', function () {
            techTags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
                tag.style.boxShadow = '';
            });
        });
    });
}

// Research Items Animation
function enhanceResearchItems() {
    const researchItems = document.querySelectorAll('.research-item');

    researchItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.02)';

            const tags = this.querySelectorAll('.research-tags span');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.1)';
                    tag.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
                }, index * 100);
            });
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';

            const tags = this.querySelectorAll('.research-tags span');
            tags.forEach(tag => {
                tag.style.transform = 'scale(1)';
                tag.style.backgroundColor = '';
            });
        });
    });
}

// Loading Animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                <div class="loader-circle"></div>
                <div class="loader-text">Loading...</div>
            </div>
        </div>
    `;

    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;

    document.body.appendChild(loader);

    // Hide loader after content is ready
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
            // Initialize animations after loader is removed
            initializeAdvancedScrollAnimations();
            animateCodeWindow();
            animateSkillProgress();
            enhanceTimelineInteraction();
            enhanceProjectInteractions();
            enhanceResearchItems();
        }, 500);
    }, 1500);
}

// Mouse Trail Effect
function initializeMouseTrail() {
    const trail = [];
    const trailLength = 20;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.3s ease;
            opacity: ${1 - i / trailLength};
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        let x = mouseX;
        let y = mouseY;

        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];

            dot.style.left = x - 2 + 'px';
            dot.style.top = y - 2 + 'px';

            if (nextDot) {
                x += (parseFloat(nextDot.style.left) - x) * 0.3;
                y += (parseFloat(nextDot.style.top) - y) * 0.3;
            }
        });

        requestAnimationFrame(animateTrail);
    }

    animateTrail();
}

// Keyboard Navigation
function initializeKeyboardNavigation() {
    const sections = ['home', 'about', 'experience', 'projects', 'research', 'contact'];
    let currentSectionIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            currentSectionIndex = (currentSectionIndex + 1) % sections.length;
            navigateToSection(sections[currentSectionIndex]);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            currentSectionIndex = currentSectionIndex === 0 ? sections.length - 1 : currentSectionIndex - 1;
            navigateToSection(sections[currentSectionIndex]);
        }
    });
}

function navigateToSection(sectionId) {
    showSection(sectionId);
    const targetNav = document.querySelector(`[href="#${sectionId}"]`);
    if (targetNav) {
        updateActiveNav(targetNav);
    }
}

// Performance Optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;

    window.onscroll = function () {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 16); // ~60fps
    };
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    showLoadingAnimation();
    initializeMouseTrail();
    initializeKeyboardNavigation();
    optimizePerformance();
});

// CSS Animations (to be added to styles)
const additionalStyles = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .loader-circle {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(59, 130, 246, 0.3);
        border-top: 3px solid #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loader-text {
        color: #3b82f6;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);