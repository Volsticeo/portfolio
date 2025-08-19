// Complete Portfolio JavaScript - Streamlined Animations + Gallery

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality with proper timing
    initializeCore();
});

// Core initialization with proper sequencing
function initializeCore() {
    console.log('Starting streamlined initialization...');

    // Initialize immediately
    initializeNavigation();
    initializeContactForm();
    initializeScrollProgress();

    // Initialize with small delays for smooth startup
    setTimeout(() => {
        initializeScrollAnimations();
        initializeTypewriterEffect();
    }, 100);

    setTimeout(() => {
        initializeParticleBackground();
        initializeMouseTrail();
    }, 200);

    // Initialize Gallery with GSAP
    setTimeout(() => {
        loadGSAP().then(() => {
            initializeGallery();
            initializeGalleryObserver();
            optimizeGalleryPerformance();
        });
    }, 300);

    // Start main animations after everything is loaded
    setTimeout(() => {
        startHomeAnimations();
    }, 400);
}

// Simplified Navigation System
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const nav = document.getElementById('navbar');

    // Enhanced navbar styling
    nav.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: auto;
        z-index: 1000;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(25px);
        border: 1px solid rgba(59, 130, 246, 0.2);
        border-radius: 50px;
        padding: 12px 24px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    `;

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScrollToSection(targetId);
            updateActiveNav(this);
        });
    });

    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

function smoothScrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function updateActiveNav(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Make scrollToSection available globally
window.scrollToSection = function(sectionId) {
    smoothScrollToSection(sectionId);
    const targetNav = document.querySelector(`[href="#${sectionId}"]`);
    if (targetNav) {
        updateActiveNav(targetNav);
    }
};

// Smooth Scroll-Based Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateSection(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section:not(#home):not(#gallery)').forEach(section => {
        animationObserver.observe(section);
    });
}

function animateSection(section) {
    const sectionId = section.id;
    console.log(`Animating section: ${sectionId}`);

    // Add base animation class with smooth transition
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';

    // Trigger specific section animations with proper delays
    switch (sectionId) {
        case 'about':
            setTimeout(() => animateAboutSection(section), 100);
            break;
        case 'experience':
            setTimeout(() => animateExperienceSection(section), 150);
            break;
        case 'projects':
            setTimeout(() => animateProjectsSection(section), 200);
            break;
        case 'research':
            setTimeout(() => animateResearchSection(section), 150);
            break;
        case 'contact':
            setTimeout(() => animateContactSection(section), 200);
            break;
    }
}

function animateAboutSection(section) {
    const skillTags = section.querySelectorAll('.skill-tag');
    const textElements = section.querySelectorAll('.glass-card h3, .glass-card p');

    // Animate text first
    textElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';

        setTimeout(() => {
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Then animate skill tags with stagger
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8) translateY(20px)';

        setTimeout(() => {
            tag.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1) translateY(0)';
        }, 800 + (index * 80));
    });
}

function animateExperienceSection(section) {
    const timelineItems = section.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');

        // Reset styles
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';

        if (dot) {
            dot.style.transform = 'scale(0)';
            dot.style.opacity = '0';
        }

        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateX(-30px)';
        }

        setTimeout(() => {
            // Animate item container
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';

            // Animate dot
            if (dot) {
                setTimeout(() => {
                    dot.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    dot.style.transform = 'scale(1)';
                    dot.style.opacity = '1';
                }, 200);
            }

            // Animate content
            if (content) {
                setTimeout(() => {
                    content.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    content.style.opacity = '1';
                    content.style.transform = 'translateX(0)';
                }, 300);
            }
        }, index * 200);
    });
}

function animateProjectsSection(section) {
    const projectCards = section.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.95)';

        setTimeout(() => {
            card.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
    });

    // Add enhanced hover effects
    addProjectHoverEffects();
}

function animateResearchSection(section) {
    const researchItems = section.querySelectorAll('.research-item');

    researchItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';

        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';

            // Animate tags separately
            const tags = item.querySelectorAll('.research-tags span');
            tags.forEach((tag, tagIndex) => {
                tag.style.opacity = '0';
                tag.style.transform = 'scale(0.8)';

                setTimeout(() => {
                    tag.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    tag.style.opacity = '1';
                    tag.style.transform = 'scale(1)';
                }, 400 + (tagIndex * 100));
            });
        }, index * 200);
    });
}

function animateContactSection(section) {
    const contactMethods = section.querySelectorAll('.contact-method');
    const formGroups = section.querySelectorAll('.form-group');
    const submitButton = section.querySelector('button[type="submit"]');

    // Animate contact methods
    contactMethods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'translateX(-30px)';

        setTimeout(() => {
            method.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            method.style.opacity = '1';
            method.style.transform = 'translateX(0)';
        }, index * 150);
    });

    // Animate form groups
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateX(30px)';

        setTimeout(() => {
            group.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            group.style.opacity = '1';
            group.style.transform = 'translateX(0)';
        }, 600 + (index * 150));
    });

    // Animate submit button
    if (submitButton) {
        submitButton.style.opacity = '0';
        submitButton.style.transform = 'translateY(20px)';

        setTimeout(() => {
            submitButton.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            submitButton.style.opacity = '1';
            submitButton.style.transform = 'translateY(0)';
        }, 1200);
    }
}

// Smooth Home Section Animation
function startHomeAnimations() {
    const heroElements = document.querySelectorAll('.hero-title span, .hero-description, .hero-buttons');
    const codeWindow = document.querySelector('.code-window');
    const profilePicture = document.querySelector('.profile-picture');

    // Animate hero elements
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';

        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Animate profile picture
    if (profilePicture) {
        profilePicture.style.opacity = '0';
        profilePicture.style.transform = 'scale(0.8)';

        setTimeout(() => {
            profilePicture.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            profilePicture.style.opacity = '1';
            profilePicture.style.transform = 'scale(1)';
        }, 400);
    }

    // Animate code window
    if (codeWindow) {
        codeWindow.style.opacity = '0';
        codeWindow.style.transform = 'translateX(30px)';

        setTimeout(() => {
            codeWindow.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            codeWindow.style.opacity = '1';
            codeWindow.style.transform = 'translateX(0)';

            // Animate code lines after window is visible
            setTimeout(() => {
                animateCodeLines();
            }, 500);
        }, 800);
    }
}

function animateCodeLines() {
    const codeLines = document.querySelectorAll('.code-line');

    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-10px)';

        setTimeout(() => {
            line.style.transition = 'all 0.4s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 150);
    });
}

// Enhanced Project Hover Effects
function addProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.25)';

            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';

            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });

        // Make cards clickable
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('project-link')) return;

            const githubLink = card.querySelector('.project-link[href*="github"]');
            if (githubLink) {
                window.open(githubLink.href, '_blank');
            }
        });
    });
}

// Smooth Typewriter Effect
function initializeTypewriterEffect() {
    const roles = ['Software Engineer', 'Sound Engineer', 'Full Stack Developer', 'Problem Solver'];
    const roleElement = document.querySelector('.role');
    if (!roleElement) return;

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
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentRole = (currentRole + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    setTimeout(typeWriter, 2000);
}

// Smooth Contact Form Handler
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        handleFormSubmission(this);
    });

    // Enhanced form field animations
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

function handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
        showNotification('Message sent successfully!', 'success');
        form.reset();

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }, 2000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
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
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth Scroll Progress
function initializeScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);

        scrollProgress.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
}

// Optimized Particle Background
function initializeParticleBackground() {
    const container = document.getElementById('floatingParticles');
    if (!container) return;

    const particleCount = window.innerWidth > 768 ? 12 : 6; // Fewer particles on mobile

    for (let i = 0; i < particleCount; i++) {
        createFloatingParticle(container);
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';

    const size = Math.random() * 6 + 3;
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(45deg, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.6));
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0;
        pointer-events: none;
    `;

    container.appendChild(particle);

    // Animate particle
    const duration = Math.random() * 15000 + 10000;
    const translateX = (Math.random() - 0.5) * 200;
    const translateY = (Math.random() - 0.5) * 200;

    particle.animate([
        { opacity: 0, transform: 'translate(0, 0) scale(0.5)' },
        { opacity: 0.7, transform: `translate(${translateX/2}px, ${translateY/2}px) scale(1)`, offset: 0.5 },
        { opacity: 0, transform: `translate(${translateX}px, ${translateY}px) scale(0.5)` }
    ], {
        duration: duration,
        easing: 'ease-in-out',
        iterations: Infinity
    });
}

// Enhanced Mouse Trail with Cursor Color Change and Confetti
function initializeMouseTrail() {
    if ('ontouchstart' in window) return; // Skip on touch devices

    const trail = [];
    const trailLength = 12;
    let isHovering = false;

    // Section-based color scheme
    const sectionColors = {
        'home': '#ef4444',
        'about': '#10b981',
        'experience': '#3b82f6',
        'projects': '#8b5cf6',
        'gallery': '#f59e0b',
        'research': '#06b6d4',
        'contact': '#ec4899'
    };

    function getCurrentSectionColor() {
        const sections = document.querySelectorAll('.section');
        const scrollY = window.pageYOffset + window.innerHeight / 2;

        for (let section of sections) {
            const rect = section.getBoundingClientRect();
            const sectionTop = scrollY - window.innerHeight / 2 + rect.top;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollY >= sectionTop && scrollY <= sectionBottom) {
                return sectionColors[section.id] || '#3b82f6';
            }
        }
        return '#3b82f6';
    }

    // Create main cursor with dynamic color
    const mainCursor = document.createElement('div');
    mainCursor.className = 'main-cursor';
    mainCursor.style.cssText = `
        position: fixed;
        width: 12px;
        height: 12px;
        background: ${getCurrentSectionColor()};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translate(-50%, -50%);
        box-shadow: 0 0 20px ${getCurrentSectionColor()}40;
    `;
    document.body.appendChild(mainCursor);

    // Create enhanced trail dots
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail-dot';
        const size = Math.max(2, 10 - i * 0.6);
        const opacity = Math.max(0.05, 0.9 - (i / trailLength) * 0.8);

        dot.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${getCurrentSectionColor()}${Math.floor(opacity * 255).toString(16).padStart(2, '0')};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: background-color 0.3s ease;
        `;
        document.body.appendChild(dot);
        trail.push({
            element: dot,
            x: 0,
            y: 0
        });
    }

    let mouseX = 0;
    let mouseY = 0;

    // Update colors when section changes
    function updateTrailColors() {
        const currentColor = getCurrentSectionColor();
        mainCursor.style.background = isHovering ? 'transparent' : currentColor;
        mainCursor.style.border = isHovering ? `2px solid ${currentColor}` : 'none';
        mainCursor.style.boxShadow = `0 0 20px ${currentColor}40`;

        trail.forEach((trailDot, i) => {
            const opacity = Math.max(0.05, 0.9 - (i / trailLength) * 0.8);
            const opacityHex = Math.floor(opacity * 255).toString(16).padStart(2, '0');
            trailDot.element.style.background = `${currentColor}${opacityHex}`;
        });
    }

    // Update colors periodically
    setInterval(updateTrailColors, 200);

    const interactiveSelectors = 'button, a, .nav-link, .project-card, .gallery-card, .research-item, .glass-card, .skill-tag, .timeline-item, .contact-method, [role="button"], [onclick]';

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        mainCursor.style.left = mouseX + 'px';
        mainCursor.style.top = mouseY + 'px';

        const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
        const interactiveElement = elementUnderCursor?.closest(interactiveSelectors);

        if (interactiveElement && !isHovering) {
            isHovering = true;
            mainCursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
            mainCursor.style.background = 'transparent';
            mainCursor.style.border = `2px solid ${getCurrentSectionColor()}`;
            mainCursor.style.boxShadow = `0 0 30px ${getCurrentSectionColor()}60`;
        } else if (!interactiveElement && isHovering) {
            isHovering = false;
            mainCursor.style.transform = 'translate(-50%, -50%) scale(1)';
            mainCursor.style.background = getCurrentSectionColor();
            mainCursor.style.border = 'none';
            mainCursor.style.boxShadow = `0 0 20px ${getCurrentSectionColor()}40`;
        }

        // Create confetti on mouse move (reduced frequency)
        if (Math.random() < 0.15) { // 15% chance
            const particleCount = Math.floor(Math.random() * 3) + 1; // 1-3 particles

            for (let i = 0; i < particleCount; i++) {
                const offsetX = (Math.random() - 0.5) * 30;
                const offsetY = (Math.random() - 0.5) * 30;

                setTimeout(() => {
                    createConfettiParticle(mouseX + offsetX, mouseY + offsetY);
                }, i * 50);
            }
        }
    });

    function animateTrail() {
        for (let i = 0; i < trail.length; i++) {
            const trailDot = trail[i];
            const speed = 0.2 + (i * 0.02);

            if (i === 0) {
                trailDot.x += (mouseX - trailDot.x) * speed;
                trailDot.y += (mouseY - trailDot.y) * speed;
            } else {
                const prevDot = trail[i - 1];
                trailDot.x += (prevDot.x - trailDot.x) * speed;
                trailDot.y += (prevDot.y - trailDot.y) * speed;
            }

            trailDot.element.style.left = trailDot.x + 'px';
            trailDot.element.style.top = trailDot.y + 'px';
        }

        requestAnimationFrame(animateTrail);
    }

    animateTrail();

    // Hide cursor and add custom styles
    const style = document.createElement('style');
    style.textContent = `
        * { cursor: none !important; }
        body { cursor: none !important; }
        @media (hover: none) and (pointer: coarse) {
            * { cursor: auto !important; }
            body { cursor: auto !important; }
            .main-cursor, .mouse-trail-dot { display: none !important; }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Confetti System
function createConfettiParticle(x, y) {
    const container = document.getElementById('floatingParticles') || document.body;
    const particle = document.createElement('div');

    // Random shapes for confetti
    const shapes = ['circle', 'square', 'triangle', 'diamond', 'star'];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

    // Enhanced vibrant colors
    const colors = [
        'linear-gradient(45deg, #667eea, #764ba2)',
        'linear-gradient(45deg, #f093fb, #f5576c)',
        'linear-gradient(45deg, #4facfe, #00f2fe)',
        'linear-gradient(45deg, #43e97b, #38f9d7)',
        'linear-gradient(45deg, #fa709a, #fee140)',
        'linear-gradient(45deg, #a8edea, #fed6e3)',
        'linear-gradient(45deg, #ff9a9e, #fecfef)',
        'linear-gradient(45deg, #ffecd2, #fcb69f)',
        'linear-gradient(45deg, #fbc2eb, #a6c1ee)',
        'linear-gradient(45deg, #fdbb2d, #22c1c3)'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    particle.className = `confetti-particle shape-${randomShape}`;

    const size = Math.random() * 5 + 3; // 3-8px
    particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${randomColor};
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 9997;
        transform: translate(-50%, -50%);
        border-radius: ${randomShape === 'circle' ? '50%' : '2px'};
        opacity: 0;
    `;

    // Apply shape-specific styling
    if (randomShape === 'triangle') {
        particle.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
    } else if (randomShape === 'diamond') {
        particle.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
    } else if (randomShape === 'star') {
        particle.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
    }

    container.appendChild(particle);

    // Random movement for confetti effect
    const translateX = (Math.random() - 0.5) * 120;
    const translateY = (Math.random() - 0.5) * 120;
    const rotation = Math.random() * 720; // Full rotations
    const duration = Math.random() * 1000 + 1500; // 1.5-2.5 seconds

    // Animate the confetti particle
    particle.animate([
        {
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0) rotate(0deg)'
        },
        {
            opacity: 0.9,
            transform: `translate(calc(-50% + ${translateX/2}px), calc(-50% + ${translateY/2}px)) scale(1.2) rotate(${rotation/2}deg)`,
            offset: 0.3
        },
        {
            opacity: 0,
            transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(0.5) rotate(${rotation}deg)`
        }
    ], {
        duration: duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }).onfinish = () => {
        particle.remove();
    };
}

// Touch events for mobile confetti
document.addEventListener('touchstart', handleTouchConfetti, { passive: true });
document.addEventListener('touchmove', handleTouchConfetti, { passive: true });

function handleTouchConfetti(e) {
    // Create confetti for touch events
    for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        const touchX = touch.clientX;
        const touchY = touch.clientY;

        if (Math.random() < 0.3) { // 30% chance for touch
            const particleCount = Math.floor(Math.random() * 2) + 1; // 1-2 particles

            for (let j = 0; j < particleCount; j++) {
                const offsetX = (Math.random() - 0.5) * 40;
                const offsetY = (Math.random() - 0.5) * 40;

                setTimeout(() => {
                    createConfettiParticle(touchX + offsetX, touchY + offsetY);
                }, j * 60);
            }
        }
    }
}

// Enhanced Navbar Scroll Effects
let lastScrollY = window.pageYOffset;
let navHidden = false;

window.addEventListener('scroll', function() {
    const currentScrollY = window.pageYOffset;
    const nav = document.getElementById('navbar');
    const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

    if (window.innerWidth > 768) {
        if (scrollDirection === 'down' && currentScrollY > 100 && !navHidden) {
            navHidden = true;
            nav.style.transform = 'translateX(-50%) translateY(-80px)';
        } else if (scrollDirection === 'up' && navHidden) {
            navHidden = false;
            nav.style.transform = 'translateX(-50%) translateY(0)';
        }
    }

    lastScrollY = currentScrollY;
}, { passive: true });

// Make research items clickable
document.addEventListener('DOMContentLoaded', function() {
    const researchCards = document.querySelectorAll('.research-item');

    researchCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('research-link')) return;

            const researchLink = card.querySelector('.research-link');
            if (researchLink) {
                window.open(researchLink.href, '_blank');
            }
        });

        card.style.cursor = 'pointer';
    });
});

// =================== GALLERY SECTION ===================

// Project data
const projectsData = {
    1: {
        title: "Studio Wood Vein",
        category: "Interior Design",
        description: "I designed and developed a comprehensive website for Studio Wood Vein, a premium interior design firm specializing in luxury residential homes, commercial spaces, clinical environments, elevation designs, and landscape architecture. The website showcases their portfolio with elegant design aesthetics that reflect their expertise in creating sophisticated interior solutions.",
        stats: [
            { number: "25+", label: "Projects" },
            { number: "5★", label: "Rating" },
            { number: "100%", label: "Satisfaction" },
            { number: "3+", label: "Years Active" }
        ],
        details: [
            { icon: "🎨", text: "Pure React Based Development" },
            { icon: "📱", text: "Fully Responsive Design" },
            { icon: "⚡", text: "Optimized Performance" },
            { icon: "🔍", text: "SEO Optimized" },
            { icon: "📊", text: "Google Analytics Integration" },
            { icon: "🎨", text: "Interactive Design" }
        ],
        technologies: ["React", "HTML5", "CSS3", "JavaScript", "MySQL", "Photoshop", "Figma"]
    },
    2: {
        title: "DoMaxReach",
        category: "Digital Marketing",
        description: "Created a dynamic website for DoMaxReach, a leading social media marketing company that specializes in comprehensive digital marketing solutions, social media management, creative design services, and advanced analytics & insights. The platform effectively communicates their expertise in driving digital growth for businesses.",
        stats: [
            { number: "300%", label: "Growth" },
            { number: "100+", label: "Clients" },
            { number: "50K+", label: "Reach" },
            { number: "24/7", label: "Support" }
        ],
        details: [
            { icon: "🚀", text: "Modern React-based Architecture" },
            { icon: "📈", text: "Analytics Dashboard" },
            { icon: "🎯", text: "Lead Generation Forms" },
            { icon: "💬", text: "Live Chat Integration" },
            { icon: "📧", text: "Email Marketing Tools" },
            { icon: "🔗", text: "Social Media Integration" }
        ],
        technologies: ["React", "Node.js", "Express", "MongoDB", "Firebase", "Chart.js", "SASS", "Figma"]
    },
    3: {
        title: "LibraIOT",
        category: "IoT WebApp",
        description: "Developed LibraIOT, an innovative smart library ecosystem that revolutionizes library management through IoT integration. Users can browse available books, manage issues and returns, reserve study tables, and access records using various sensors and cloud implementation. The project is currently undergoing the patenting process with publications in progress.",
        stats: [
            { number: "Patent", label: "Pending" },
            { number: "1000+", label: "Books" },
            { number: "24/7", label: "Access" },
            { number: "IoT", label: "Integrated" }
        ],
        details: [
            { icon: "📚", text: "Smart Book Management System" },
            { icon: "🔧", text: "IoT Sensor Integration" },
            { icon: "☁️", text: "Cloud-based Infrastructure" },
            { icon: "📊", text: "Real-time Analytics" },
            { icon: "🔐", text: "RFID Authentication" },
            { icon: "📱", text: "Mobile App Companion" }
        ],
        technologies: ["React", "HTML5", "CSS3", "Python", "Flask", "Arduino", "Raspberry Pi", "Firebase", "MySQL", "IoT Sensors", "React", "OpenCV"]
    },
    4: {
        title: "YJT EmailMax",
        category: "Email Automation",
        description: "Built YJT EmailMax, a sophisticated email automation system designed for companies to streamline their client communication processes. The system automates various types of notifications and renewal reminders with a robust backend powered by Firebase and AWS SES, leveraging AWS Lambda for efficient task processing and providing comprehensive analytics insights.",
        stats: [
            { number: "50K+", label: "Emails/Day" },
            { number: "99.9%", label: "Uptime" },
            { number: "95%", label: "Delivery Rate" },
            { number: "AWS", label: "Powered" }
        ],
        details: [
            { icon: "📧", text: "AWS SES Integration" },
            { icon: "⚡", text: "Lambda Functions" },
            { icon: "🔄", text: "Automated Workflows" },
            { icon: "📊", text: "Advanced Analytics" },
            { icon: "🔔", text: "Smart Notifications" },
            { icon: "⏰", text: "Scheduled Campaigns" }
        ],
        technologies: ["React", "HTML5", "CSS3", "Node.js", "AWS SES", "AWS Lambda", "Firebase", "Python", "AWS RDS", "Redis"]
    }
};

async function detectProjectImages(projectId) {
    let imageCount = 0;
    let hasMoreImages = true;

    while (hasMoreImages) {
        try {
            const img = new Image();
            const imagePath = `project_${projectId}/${imageCount + 1}.webp`;

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = imagePath;
            });

            imageCount++;
        } catch (error) {
            hasMoreImages = false;
        }
    }

    return imageCount;
}

// Initialize Gallery functionality
function initializeGallery() {
    console.log('Initializing Gallery...');

    // Initialize GSAP animations
    initializeGSAPAnimations();

    // Setup modal functionality
    setupModalFunctionality();

    // Setup card click handlers
    setupCardClickHandlers();

    // Initialize scroll animations
    initializeGalleryScrollAnimations();

    console.log('Gallery initialized successfully');
}

// GSAP Animations (lightweight and optimized)
function initializeGSAPAnimations() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, using CSS fallback animations');
        return;
    }

    // Set initial states
    gsap.set(".gallery-card", {
        opacity: 0,
        y: 50,
        scale: 0.95
    });

    gsap.set(".coming-soon-section", {
        opacity: 0,
        y: 30
    });

    // Card hover animations
    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach((card, index) => {
        // Mouse enter animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                y: -15,
                scale: 1.03,
                rotationY: 2,
                boxShadow: "0 25px 50px rgba(59, 130, 246, 0.2)",
                ease: "power2.out"
            });

            // Animate card content
            gsap.to(card.querySelector('.card-content h3'), {
                duration: 0.3,
                x: 5,
                color: "#3b82f6",
                ease: "power2.out"
            });

            // Animate stats
            gsap.to(card.querySelectorAll('.stat'), {
                duration: 0.3,
                y: -3,
                stagger: 0.05,
                ease: "power2.out"
            });
        });

        // Mouse leave animation
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                scale: 1,
                rotationY: 0,
                boxShadow: "0 0 0 rgba(59, 130, 246, 0)",
                ease: "power2.out"
            });

            // Reset card content
            gsap.to(card.querySelector('.card-content h3'), {
                duration: 0.3,
                x: 0,
                color: "#e0e6ed",
                ease: "power2.out"
            });

            // Reset stats
            gsap.to(card.querySelectorAll('.stat'), {
                duration: 0.3,
                y: 0,
                stagger: 0.05,
                ease: "power2.out"
            });
        });
    });

    // Floating ingredients animation
    const ingredients = document.querySelectorAll('.ingredient');
    ingredients.forEach((ingredient, index) => {
        gsap.to(ingredient, {
            duration: 8 + index,
            y: -20,
            rotation: 360,
            scale: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5
        });
    });

    // Progress bar animation
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        gsap.to(progressFill, {
            duration: 3,
            width: "78%",
            ease: "power2.out",
            delay: 1
        });
    }
}

// Scroll-triggered animations
function initializeGalleryScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('gallery-card')) {
                    animateGalleryCard(entry.target);
                } else if (entry.target.classList.contains('coming-soon-section')) {
                    animateComingSoonSection(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });

    // Observe gallery cards
    document.querySelectorAll('.gallery-card').forEach(card => {
        observer.observe(card);
    });

    // Observe coming soon section
    const comingSoonSection = document.querySelector('.coming-soon-section');
    if (comingSoonSection) {
        observer.observe(comingSoonSection);
    }
}

function animateGalleryCard(card) {
    if (card.dataset.animated) return;
    card.dataset.animated = 'true';

    const index = Array.from(card.parentNode.children).indexOf(card);

    if (typeof gsap !== 'undefined') {
        gsap.to(card, {
            duration: 0.8,
            opacity: 1,
            y: 0,
            scale: 1,
            delay: index * 0.15,
            ease: "power3.out"
        });
    } else {
        // CSS fallback
        card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
    }
}

function animateComingSoonSection(section) {
    if (section.dataset.animated) return;
    section.dataset.animated = 'true';

    if (typeof gsap !== 'undefined') {
        gsap.to(section, {
            duration: 0.8,
            opacity: 1,
            y: 0,
            ease: "power3.out"
        });

        // Animate chef hat
        gsap.to(section.querySelector('.chef-hat'), {
            duration: 1,
            rotation: 360,
            scale: 1.1,
            ease: "bounce.out",
            delay: 0.3
        });

        // Animate number
        const numberElement = section.querySelector('.highlight-number');
        if (numberElement) {
            gsap.from(numberElement, {
                duration: 1,
                scale: 0,
                rotation: 180,
                ease: "elastic.out(1, 0.3)",
                delay: 0.5
            });
        }
    } else {
        // CSS fallback
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }
}

// Modal functionality
function setupModalFunctionality() {
    const modal = document.getElementById('galleryModal');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = modal.querySelector('.modal-backdrop');

    let currentProject = null;
    let currentImageIndex = 0;
    let totalImages = 0;

    // Close modal handlers
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                previousImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    // Navigation buttons
    document.getElementById('prevImage').addEventListener('click', previousImage);
    document.getElementById('nextImage').addEventListener('click', nextImage);

    async function openModal(projectId) {
        currentProject = projectId;
        currentImageIndex = 0;

        // Auto-detect number of images
        totalImages = await detectProjectImages(projectId);

        if (totalImages === 0) {
            console.warn(`No images found for project ${projectId}`);
            totalImages = 1; // Fallback
        }

        populateModalContent(projectId);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animate modal opening
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(modal.querySelector('.modal-container'),
                {scale: 0.8, opacity: 0, y: 50},
                {duration: 0.4, scale: 1, opacity: 1, y: 0, ease: "power3.out"}
            );
        }
    }

    function closeModal() {
        if (typeof gsap !== 'undefined') {
            gsap.to(modal.querySelector('.modal-container'), {
                duration: 0.3,
                scale: 0.8,
                opacity: 0,
                y: 50,
                ease: "power3.in",
                onComplete: () => {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        } else {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function populateModalContent(projectId) {
        const project = projectsData[projectId];

        // Update project info
        document.getElementById('modalCategory').textContent = project.category;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;

        // Update main image
        updateMainImage(0);

        // Generate thumbnails
        generateThumbnails(projectId);

        // Update stats
        updateModalStats(project.stats);

        // Update details
        updateModalDetails(project.details);

        // Update technologies
        updateModalTechnologies(project.technologies);

        // Update image counter with auto-detected count
        document.getElementById('currentImageNumber').textContent = '1';
        document.getElementById('totalImages').textContent = totalImages.toString();
    }

    function updateMainImage(index) {
        const mainImage = document.getElementById('modalMainImage');
        const imagePath = `project_${currentProject}/${index + 1}.webp`;

        // Add loading state
        mainImage.style.opacity = '0.5';

        // Handle image loading
        const img = new Image();
        img.onload = () => {
            mainImage.src = imagePath;
            mainImage.style.opacity = '1';

            // Update image counter
            document.getElementById('currentImageNumber').textContent = (index + 1).toString();

            // Update active thumbnail
            updateActiveThumbnail(index);
        };

        img.onerror = () => {
            // Fallback for missing images
            mainImage.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="200" y="150" text-anchor="middle" font-family="Arial" font-size="16" fill="%236b7280">Image Not Found</text></svg>';
            mainImage.style.opacity = '1';
        };

        img.src = imagePath;
    }

    function generateThumbnails(projectId) {
        const thumbnailsContainer = document.getElementById('thumbnailsContainer');
        thumbnailsContainer.innerHTML = '';

        const project = projectsData[projectId];

        // Use totalImages instead of project.images
        for (let i = 0; i < totalImages; i++) {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            if (i === 0) thumbnail.classList.add('active');

            const img = document.createElement('img');
            img.src = `project_${projectId}/${i + 1}.webp`;
            img.alt = `${project.title} - Image ${i + 1}`;
            img.onerror = function () {
                this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60"><rect width="80" height="60" fill="%23e5e7eb"/></svg>';
            };

            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => {
                currentImageIndex = i;
                updateMainImage(i);
            });

            thumbnailsContainer.appendChild(thumbnail);
        }
    }

    function updateActiveThumbnail(index) {
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        // Scroll thumbnail into view
        const activeThumbnail = thumbnails[index];
        if (activeThumbnail) {
            activeThumbnail.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    function updateModalStats(stats) {
        const statsGrid = document.getElementById('modalStatsGrid');
        statsGrid.innerHTML = '';

        stats.forEach(stat => {
            const statElement = document.createElement('div');
            statElement.className = 'modal-stat';
            statElement.innerHTML = `
                <span class="modal-stat-number">${stat.number}</span>
                <span class="modal-stat-label">${stat.label}</span>
            `;
            statsGrid.appendChild(statElement);
        });
    }

    function updateModalDetails(details) {
        const detailsList = document.getElementById('modalDetailsList');
        detailsList.innerHTML = '';

        details.forEach(detail => {
            const detailElement = document.createElement('div');
            detailElement.className = 'detail-item';
            detailElement.innerHTML = `
                <span class="detail-icon">${detail.icon}</span>
                <span class="detail-text">${detail.text}</span>
            `;
            detailsList.appendChild(detailElement);
        });
    }

    function updateModalTechnologies(technologies) {
        const techStack = document.getElementById('modalTechStack');
        techStack.innerHTML = '';

        technologies.forEach(tech => {
            const techElement = document.createElement('span');
            techElement.className = 'tech-tag';
            techElement.textContent = tech;
            techStack.appendChild(techElement);
        });
    }

    function previousImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = totalImages - 1; // Loop to last image
        }
        updateMainImage(currentImageIndex);
    }

    function nextImage() {
        if (currentImageIndex < totalImages - 1) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0; // Loop to first image
        }
        updateMainImage(currentImageIndex);
    }

    // Make openModal available globally
    window.openGalleryModal = openModal;
}

// Card click handlers
function setupCardClickHandlers() {
    const galleryCards = document.querySelectorAll('.gallery-card');

    galleryCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            if (projectId && window.openGalleryModal) {
                window.openGalleryModal(projectId);
            }
        });

        // Add keyboard support
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const projectId = card.dataset.project;
                if (projectId && window.openGalleryModal) {
                    window.openGalleryModal(projectId);
                }
            }
        });

        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View gallery for ${card.querySelector('h3').textContent}`);
    });
}

// Enhanced scroll animations for gallery section
function animateGallerySection(section) {
    const cards = section.querySelectorAll('.gallery-card');
    const comingSoon = section.querySelector('.coming-soon-section');

    // Animate cards with stagger
    cards.forEach((card, index) => {
        if (!card.dataset.animated) {
            setTimeout(() => {
                animateGalleryCard(card);
            }, index * 150);
        }
    });

    // Animate coming soon section
    if (comingSoon && !comingSoon.dataset.animated) {
        setTimeout(() => {
            animateComingSoonSection(comingSoon);
        }, cards.length * 150 + 300);
    }
}

// Intersection Observer for gallery section
function initializeGalleryObserver() {
    const gallerySection = document.getElementById('gallery');
    if (!gallerySection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.galleryAnimated) {
                entry.target.dataset.galleryAnimated = 'true';
                setTimeout(() => {
                    animateGallerySection(entry.target);
                }, 200);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -5% 0px'
    });

    observer.observe(gallerySection);
}

// Load GSAP if not already loaded
function loadGSAP() {
    if (typeof gsap !== 'undefined') {
        console.log('GSAP already loaded');
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = () => {
            console.log('GSAP loaded successfully');
            resolve();
        };
        script.onerror = () => {
            console.warn('Failed to load GSAP, using CSS fallbacks');
            resolve(); // Still resolve to continue with CSS animations
        };
        document.head.appendChild(script);
    });
}

// Performance optimization
function optimizeGalleryPerformance() {
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate any size-dependent animations
            if (typeof gsap !== 'undefined') {
                gsap.refreshFast();
            }
        }, 250);
    });

    // Preload visible images
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    // Observe any lazy-loaded images
    document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
    });
}
