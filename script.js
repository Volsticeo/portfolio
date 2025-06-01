// Portfolio JavaScript - Interactive Functionality

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initializeOnLoad();
    initializeContactForm();
    initializeTypewriterEffect();
    initializeMouseTrail();
    initializeSectionSnapping();
    setTimeout(addContinuousAnimations, 2000);

});

function removeForcedHiding() {
    // Remove the existing style that's hiding everything
    const existingStyle = document.querySelector('style');
    if (existingStyle && existingStyle.textContent.includes('opacity: 0 !important')) {
        existingStyle.remove();
    }

    // Add a new, less restrictive style
    const newStyle = document.createElement('style');
    newStyle.textContent = `
        /* Only hide sections initially, not individual elements */
        .section:not(#home) {
            opacity: 0;
            visibility: hidden;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease, visibility 0.6s ease;
        }
        
        .section.visible {
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(newStyle);
}

// Navigation System
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const nav = document.getElementById('navbar');

    // Updated navbar styling - floating effect
    nav.style.position = 'fixed';
    nav.style.top = '20px';
    nav.style.left = '50%';
    nav.style.transform = 'translateX(-50%)';
    nav.style.width = 'auto';
    nav.style.zIndex = '1000';
    nav.style.display = 'flex';
    nav.style.justifyContent = 'center';
    nav.style.alignItems = 'center';
    nav.style.background = 'rgba(15, 23, 42, 0.95)';
    nav.style.backdropFilter = 'blur(25px)';
    nav.style.border = '1px solid rgba(59, 130, 246, 0.2)';
    nav.style.borderRadius = '50px';
    nav.style.padding = '10px 20px';
    nav.style.transition = 'transform 0.3s ease, background 0.3s ease';
    nav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            // Check if this is first load or navigation
            const targetSection = document.getElementById(targetId);
            const isFirstLoad = targetSection.getAttribute('data-first-load') === 'true';

            showSection(targetId);
            updateActiveNav(this);

            // Only animate on first load, not on navigation clicks
            if (isFirstLoad) {
                setTimeout(() => {
                    triggerSectionAnimations(targetId);
                    targetSection.setAttribute('data-first-load', 'false');
                }, 100);
            } else {
                // Just ensure section is visible without animation
                makeElementsVisible(targetId);
            }
        });
    });

    // Show initial section and trigger its animations (first load)
    showSection('home');
    setTimeout(() => {
        triggerSectionAnimations('home');
        document.getElementById('home').setAttribute('data-first-load', 'false');
    }, 100);
}

function makeElementsVisible(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Make section visible instantly
    section.style.transition = 'none';
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';
    section.style.visibility = 'visible';

    // Make all elements visible instantly
    const allElements = section.querySelectorAll(`
        .hero-title span, .hero-description, .hero-buttons, .code-window,
        .profile-picture, .glass-card p, .glass-card h2, .skill-tag,
        .timeline-item, .timeline-line, .timeline-dot, .timeline-content,
        .project-card, .project-icon, .research-item, .research-tags span,
        .form-group, .contact-method, button[type="submit"], h2, h3
    `);

    allElements.forEach(el => {
        el.style.transition = 'none';
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
    });

    // Re-enable transitions after a brief moment
    setTimeout(() => {
        section.style.transition = '';
        allElements.forEach(el => {
            el.style.transition = '';
        });
    }, 50);
}

function updateActiveNavigation(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    const activeNav = document.querySelector(`[href="#${sectionId}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId)?.classList.add('active');
}

function initializeScrollBasedAnimations() {
    console.log('Setting up scroll observers...');
    const sections = document.querySelectorAll('.section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            console.log(`Section ${sectionId}: intersecting = ${entry.isIntersecting}, ratio = ${entry.intersectionRatio}`);

            if (entry.isIntersecting) {
                const hasBeenAnimated = entry.target.getAttribute('data-animated') === 'true';
                console.log(`Section ${sectionId} is visible. Already animated: ${hasBeenAnimated}`);

                // Make section visible immediately
                entry.target.classList.add('visible');

                if (!hasBeenAnimated) {
                    // Mark as animated and trigger animations
                    entry.target.setAttribute('data-animated', 'true');
                    console.log(`Triggering animations for ${sectionId}`);

                    setTimeout(() => {
                        triggerSectionAnimations(sectionId);
                    }, 200);
                }

                // Update navigation
                updateActiveNavigation(sectionId);
            }
        });
    }, {
        threshold: 0.1, // Lower threshold for earlier trigger
        rootMargin: '0px 0px -20% 0px' // Only hide when mostly out of view
    });

    // Observe all sections
    sections.forEach(section => {
        console.log(`Observing section: ${section.id}`);
        sectionObserver.observe(section);
    });
}
function initializeSectionStates() {
    console.log('Initializing section states...');
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        console.log(`Processing section: ${section.id}`);
        if (section.id === 'home') {
            // Home section starts visible
            section.classList.add('visible');
            section.setAttribute('data-animated', 'true');
        } else {
            // Other sections start hidden but ready to be revealed
            section.classList.remove('visible');
            section.setAttribute('data-animated', 'false');
        }
    });
}

function showSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    // Simple smooth scroll to section
    targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function initializeSectionSnapping() {
    // Add touch events for mobile
    let touchStartY = 0;
    let touchStartTime = 0;

    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        if (isSnapping) return;

        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        const deltaTime = Date.now() - touchStartTime;

        // Check for swipe gesture (minimum distance and speed)
        if (Math.abs(deltaY) < 100 || deltaTime > 500) return;

        const activeSection = document.querySelector('.section.active');
        if (!activeSection) return;

        const currentIndex = sections.indexOf(activeSection.id);
        let targetIndex;

        if (deltaY > 0 && currentIndex < sections.length - 1) {
            // Swipe up (scroll down)
            targetIndex = currentIndex + 1;
        } else if (deltaY < 0 && currentIndex > 0) {
            // Swipe down (scroll up)
            targetIndex = currentIndex - 1;
        } else {
            return;
        }

        isSnapping = true;
        scrollToSection(sections[targetIndex]);

        setTimeout(() => {
            isSnapping = false;
        }, 1000);
    }, { passive: true });
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

    // Initialize scroll-based section animations
    initializeScrollBasedAnimations();
}

function triggerSectionAnimations(sectionId) {
     const section = document.getElementById(sectionId);
    if (!section) return;

    console.log(`Animating section: ${sectionId}`);

    // Ensure section is visible
    section.classList.add('visible');

    // Make all child elements visible
    const elements = section.querySelectorAll('*');
    elements.forEach(el => {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
    });

    // Trigger specific animations based on section
    switch (sectionId) {
        case 'about':
            if (window.animateSkillTags) animateSkillTags();
            break;
        case 'experience':
            if (window.animateTimeline) animateTimeline();
            break;
        case 'projects':
            if (window.animateProjects) animateProjects();
            break;
        case 'research':
            if (window.animateResearchItems) animateResearchItems();
            break;
        case 'contact':
            if (window.animateContactForm) animateContactForm();
            break;
    }
}

// Add this function to your initialization sequence
function initializeOnLoad() {
    console.log('Starting initialization...');

    // Remove problematic CSS first
    removeForcedHiding();

    // Initialize section states
    setTimeout(() => {
        initializeSectionStates();
    }, 100);

    // Initialize scroll animations
    setTimeout(() => {
        initializeScrollBasedAnimations();
    }, 200);

    // Initialize other components
    setTimeout(() => {
        if (window.initializeNavigation) initializeNavigation();
        if (window.initializeScrollEffects) initializeScrollEffects();
        if (window.initializeParticleBackground) initializeParticleBackground();
    }, 300);

    // // Add debug function to window for testing
    // window.showAllSections = showAllSections;

    console.log('Initialization complete. You can call showAllSections() in console to test.');
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

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    anime({
        targets: scrollProgress,
        width: scrollPercent + '%',
        duration: 100,
        easing: 'linear'
    });
}

window.addEventListener('scroll', updateScrollProgress);

document.addEventListener('DOMContentLoaded', function() {
    const profilePicture = document.querySelector('.profile-picture');

    if (profilePicture) {
        profilePicture.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Project icons interaction
    const projectIcons = document.querySelectorAll('.project-icon');

    projectIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'running';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'paused';
        });
    });
});

function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    const profilePicture = document.querySelector('.profile-picture');
    const aboutTexts = document.querySelectorAll('.glass-card p, .glass-card h2');

    // First row: Profile picture
    if (profilePicture) {
        profilePicture.style.opacity = '0';
        profilePicture.style.transform = 'scale(0.7) translateY(50px)';
        setTimeout(() => {
            profilePicture.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            profilePicture.style.opacity = '1';
            profilePicture.style.transform = 'scale(1) translateY(0)';
        }, 300);
    }

    // Second row: About text elements
    aboutTexts.forEach((text, index) => {
        text.style.opacity = '0';
        text.style.transform = 'translateX(-40px)';
        setTimeout(() => {
            text.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            text.style.opacity = '1';
            text.style.transform = 'translateX(0)';
        }, 800 + (index * 300));
    });

    // Third row: Skill tags with enhanced bouncy animation
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.5) translateY(60px) rotate(-15deg)';

        setTimeout(() => {
            tag.style.transition = 'all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1) translateY(0) rotate(0deg)';
        }, 1400 + (index * 100));
    });
}

function animateTimeline() {
    const timelineItems = document.querySelectorAll('#experience .timeline-item, .timeline-item');
    const timelineLine = document.querySelector('.timeline-line, #experience .timeline-line');

    console.log('Timeline items found:', timelineItems.length);

    // First: Animate timeline line
    if (timelineLine) {
        timelineLine.style.height = '0';
        timelineLine.style.transition = 'height 2s ease-out';
        setTimeout(() => {
            timelineLine.style.height = '100%';
        }, 300);
    }

    // Then animate each timeline item row by row
    timelineItems.forEach((item, index) => {
        const dot = item.querySelector('.timeline-dot') || item.querySelector('[class*="dot"]');
        const content = item.querySelector('.timeline-content') ||
                       item.querySelector('.glass-card') ||
                       item.querySelector('[class*="content"]');

        // Reset styles
        item.style.opacity = '0';
        item.style.transform = 'translateY(80px) scale(0.9)';

        if (dot) {
            dot.style.transform = 'scale(0)';
            dot.style.opacity = '0';
        }
        if (content) {
            content.style.transform = 'translateX(-120px)';
            content.style.opacity = '0';
        }

        setTimeout(() => {
            // Animate item container first
            item.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';

            // Animate dot after container
            if (dot) {
                setTimeout(() => {
                    dot.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    dot.style.transform = 'scale(1)';
                    dot.style.opacity = '1';
                }, 200);
            }

            // Then animate content
            if (content) {
                setTimeout(() => {
                    content.style.transition = 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)';
                    content.style.opacity = '1';
                    content.style.transform = 'translateX(0)';
                }, 400);
            }
        }, 800 + (index * 500)); // Increased delay between items
    });
}

function animateProjects() {
    const projectCards = document.querySelectorAll('#projects .project-card, .project-card');
    const sectionTitle = document.querySelector('#projects h2');

    console.log('Project cards found:', projectCards.length);

    // First row: Section title
    if (sectionTitle) {
        sectionTitle.style.opacity = '0';
        sectionTitle.style.transform = 'translateY(-40px)';
        setTimeout(() => {
            sectionTitle.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            sectionTitle.style.opacity = '1';
            sectionTitle.style.transform = 'translateY(0)';
        }, 200);
    }

    // Then animate project cards row by row (assuming 2-3 cards per row)
    projectCards.forEach((card, index) => {
        const projectIcon = card.querySelector('.project-icon') ||
                           card.querySelector('[class*="icon"]') ||
                           card.querySelector('i');
        const projectTitle = card.querySelector('h3') || card.querySelector('[class*="title"]');
        const projectDesc = card.querySelector('p') || card.querySelector('[class*="desc"]');
        const projectTech = card.querySelector('.project-tech') ||
                           card.querySelector('[class*="tech"]');
        const projectLinks = card.querySelector('.project-links') ||
                            card.querySelector('[class*="link"]');

        // Reset card with more dramatic initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(100px) scale(0.8) rotateX(20deg)';
        card.style.filter = 'blur(8px)';

        setTimeout(() => {
            card.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            card.style.filter = 'blur(0px)';

            // Animate internal elements with proper stagger
            const elements = [projectIcon, projectTitle, projectDesc, projectTech, projectLinks]
                .filter(el => el);

            elements.forEach((el, elIndex) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    el.style.transition = 'all 0.6s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 400 + (elIndex * 150));
            });
        }, 600 + (index * 400)); // Increased delay between cards
    });
}

function animateResearchItems() {
    const researchItems = document.querySelectorAll('.research-item');
    const sectionTitle = document.querySelector('#research h2');

    // First row: Section title
    if (sectionTitle) {
        sectionTitle.style.opacity = '0';
        sectionTitle.style.transform = 'translateY(-40px)';
        setTimeout(() => {
            sectionTitle.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            sectionTitle.style.opacity = '1';
            sectionTitle.style.transform = 'translateY(0)';
        }, 200);
    }

    // Then animate research items row by row
    researchItems.forEach((item, index) => {
        const researchTitle = item.querySelector('h3');
        const researchDesc = item.querySelector('p');
        const researchTags = item.querySelectorAll('.research-tags span');
        const researchLink = item.querySelector('.research-link');

        // Reset item
        item.style.opacity = '0';
        item.style.transform = 'translateY(80px) scale(0.9)';

        setTimeout(() => {
            item.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';

            // Animate internal elements
            [researchTitle, researchDesc, researchLink].forEach((el, elIndex) => {
                if (el) {
                    el.style.opacity = '0';
                    el.style.transform = 'translateX(-30px)';
                    setTimeout(() => {
                        el.style.transition = 'all 0.6s ease';
                        el.style.opacity = '1';
                        el.style.transform = 'translateX(0)';
                    }, 300 + (elIndex * 200));
                }
            });

            // Animate tags with SAME style as skill tags (bouncy animation)
            researchTags.forEach((tag, tagIndex) => {
                tag.style.opacity = '0';
                tag.style.transform = 'scale(0.5) translateY(60px) rotate(-15deg)';
                setTimeout(() => {
                    tag.style.transition = 'all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; // Same as skill tags
                    tag.style.opacity = '1';
                    tag.style.transform = 'scale(1) translateY(0) rotate(0deg)';
                }, 700 + (tagIndex * 100));
            });
        }, 600 + (index * 500)); // Increased delay between items
    });
}

function animateContactForm() {
    const formGroups = document.querySelectorAll('.form-group');
    const contactMethods = document.querySelectorAll('.contact-method');
    const sectionTitle = document.querySelector('#contact h2');
    const submitButton = document.querySelector('button[type="submit"]');

    // First row: Section title
    if (sectionTitle) {
        sectionTitle.style.opacity = '0';
        sectionTitle.style.transform = 'translateY(-40px)';
        setTimeout(() => {
            sectionTitle.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            sectionTitle.style.opacity = '1';
            sectionTitle.style.transform = 'translateY(0)';
        }, 200);
    }

    // Second row: Contact methods
    contactMethods.forEach((method, index) => {
        const icon = method.querySelector('i, svg');
        const text = method.querySelector('span, p');

        method.style.opacity = '0';
        method.style.transform = 'translateX(-80px) scale(0.8)';

        setTimeout(() => {
            method.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            method.style.opacity = '1';
            method.style.transform = 'translateX(0) scale(1)';

            // Special icon animation
            if (icon) {
                setTimeout(() => {
                    icon.style.transform = 'rotate(360deg) scale(1.2)';
                    icon.style.transition = 'transform 0.6s ease';
                    setTimeout(() => {
                        icon.style.transform = 'rotate(0deg) scale(1)';
                    }, 600);
                }, 200);
            }
        }, 600 + (index * 200));
    });

    // Third row onwards: Form groups
    formGroups.forEach((group, index) => {
        const input = group.querySelector('input, textarea');

        group.style.opacity = '0';
        group.style.transform = 'translateX(80px) rotateY(15deg)';

        setTimeout(() => {
            group.style.transition = 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)';
            group.style.opacity = '1';
            group.style.transform = 'translateX(0) rotateY(0deg)';

            // Add focus effect animation
            if (input) {
                setTimeout(() => {
                    input.style.transform = 'scale(0.95)';
                    input.style.transition = 'transform 0.4s ease';
                    setTimeout(() => {
                        input.style.transform = 'scale(1)';
                    }, 200);
                }, 200);
            }
        }, 1200 + (index * 300)); // Increased delay between form groups
    });

    // Final row: Submit button
    if (submitButton) {
        submitButton.style.opacity = '0';
        submitButton.style.transform = 'translateY(50px) scale(0.8)';
        setTimeout(() => {
            submitButton.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            submitButton.style.opacity = '1';
            submitButton.style.transform = 'translateY(0) scale(1)';
        }, 2000); // Final element with longer delay
    }
}

function initializeSectionVisibility() {
    // Hide all sections except home initially
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        if (section.id !== 'home') {
            section.style.opacity = '0';
            section.style.visibility = 'hidden';
            section.style.transform = 'translateY(50px)';
        }

        // Hide all animatable elements initially within each section
        const animatableElements = section.querySelectorAll(`
            .hero-title span, .hero-description, .hero-buttons, .code-window,
            .glass-card p, .glass-card h2, .skill-tag,
            .timeline-item, .timeline-line, .timeline-dot, .timeline-content,
            .project-card, .project-icon, .research-item, .research-tags span,
            .form-group, .contact-method, button[type="submit"], h2, h3
        `);

        animatableElements.forEach(el => {
            el.style.opacity = '0';
            el.style.visibility = 'hidden';
        });

        // Add animation tracking
        section.setAttribute('data-animated', 'false');
        section.setAttribute('data-first-load', 'true');
    });

    // Mark home section as ready but not animated yet
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.setAttribute('data-animated', 'false');
        homeSection.setAttribute('data-first-load', 'true');
    }
}

function addContinuousAnimations() {
    // Add floating animation to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animation = `float ${3 + (index % 3)}s ease-in-out infinite`;
        tag.style.animationDelay = `${index * 0.2}s`;
    });

    // Add pulse animation to timeline dots
    const timelineDots = document.querySelectorAll('.timeline-dot');
    timelineDots.forEach((dot, index) => {
        dot.style.animation = `pulse ${2 + (index % 2)}s ease-in-out infinite`;
        dot.style.animationDelay = `${index * 0.5}s`;
    });

    // Add glow animation to project icons
    const projectIcons = document.querySelectorAll('.project-icon');
    projectIcons.forEach((icon, index) => {
        icon.style.animation = `glow ${4 + (index % 2)}s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 0.3}s`;
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

let lastScrollY = window.pageYOffset;
let scrollDirection = 'up';
let navHidden = false;

window.addEventListener('scroll', function() {
    const currentScrollY = window.pageYOffset;
    scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

    // Check if mobile or desktop
    if (window.innerWidth <= 768) {
        // Mobile: handled by initializeMobileNavigation scroll handler
        return;
    } else {
        // Desktop: use your existing function
        handleNavbarAnimation();
    }

    lastScrollY = currentScrollY;
});


function initializeMobileNavigation() {
    const hamburger = document.querySelector('.hamburger'); // Your hamburger button
    const mobileNav = document.querySelector('.mobile-nav'); // Your mobile nav container
    let lastScrollY = window.pageYOffset;
    let navHidden = false;

    // Initial mobile nav styling
    hamburger.style.position = 'fixed';
    hamburger.style.top = '20px';
    hamburger.style.left = '20px'; // Position on left
    hamburger.style.zIndex = '1001';
    hamburger.style.transition = 'transform 0.3s ease';

    // Scroll handler for hamburger animation
    function handleMobileNavScroll() {
        const currentScrollY = window.pageYOffset;
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

        if (scrollDirection === 'down' && currentScrollY > 100 && !navHidden) {
            navHidden = true;
            hamburger.style.transform = 'translateX(-100px)'; // Hide to the left
        } else if (scrollDirection === 'up' && navHidden) {
            navHidden = false;
            hamburger.style.transform = 'translateX(0)'; // Show from left
        }

        lastScrollY = currentScrollY;
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleMobileNavScroll);

    // Your existing hamburger click functionality here
    hamburger.addEventListener('click', function() {
        // Toggle mobile menu open/close
        mobileNav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Scroll Effects
function initializeScrollEffects() {
    let ticking = false;
    let lastScrollY = window.pageYOffset;
    let scrollDirection = 'down';

    // Navbar hide/show logic
    const nav = document.getElementById('navbar');
    let navHidden = false;

    function updateScrollDirection() {
        const currentScrollY = window.pageYOffset;
        scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;
    }

    function handleNavbarAnimation() {
        const nav = document.getElementById('navbar');
    const currentScrollY = window.pageYOffset;

    if (scrollDirection === 'down' && currentScrollY > 100 && !navHidden) {
        navHidden = true;
        nav.style.transform = 'translateX(-50%) translateY(-80px)'; // Adjusted for floating position
    } else if (scrollDirection === 'up' && navHidden) {
        navHidden = false;
        nav.style.transform = 'translateX(-50%) translateY(0)';
    }

    // Keep consistent background
    nav.style.background = 'rgba(15, 23, 42, 0.95)';
    nav.style.backdropFilter = 'blur(25px)';
    nav.style.border = '1px solid rgba(59, 130, 246, 0.2)';
    }

    function handleMildParallax() {
        const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('.section');

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            const parallaxOffset = scrolled * 0.05; // Reduced multiplier for subtler effect

            switch(section.id) {
                case 'home':
                    section.style.transform = `translateY(${parallaxOffset * 0.1}px)`;
                    break;
                case 'about':
                    // Reset any previous transforms first
                    section.style.transform = `translateY(${parallaxOffset * 0.08}px)`;
                    const skillTags = section.querySelectorAll('.skill-tag');
                    skillTags.forEach((tag, i) => {
                        // Much more subtle movement for skill tags
                        const offset = Math.sin(parallaxOffset * 0.01 + i) * 2;
                        tag.style.transform = `translateY(${offset}px)`;
                    });
                    break;
                case 'experience':
                    section.style.transform = `translateY(${parallaxOffset * 0.06}px)`;
                    break;
                case 'projects':
                    section.style.transform = `translateY(${parallaxOffset * 0.07}px)`;
                    const projectCards = section.querySelectorAll('.project-card');
                    projectCards.forEach((card, i) => {
                        const offset = Math.sin(parallaxOffset * 0.01 + i * 0.5) * 3;
                        card.style.transform = `translateY(${offset}px)`;
                    });
                    break;
                case 'research':
                    section.style.transform = `translateY(${parallaxOffset * 0.05}px)`;
                    break;
                case 'contact':
                    section.style.transform = `translateY(${parallaxOffset * 0.04}px)`;
                    break;
            }
        }
    });
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollDirection();
                handleNavbarAnimation();
                handleMildParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Main scroll event listener
    window.addEventListener('scroll', requestTick, { passive: true });
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

    const container = document.getElementById('floatingParticles');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = `floating-particle particle-type-${Math.floor(Math.random() * 3) + 1}`;

        // Random size between 4px and 12px
        const size = Math.random() * 8 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        container.appendChild(particle);

        // Animate particle
        animateParticle(particle);
    }
}


function animateParticle(particle) {
    const duration = Math.random() * 20000 + 15000; // 15-35 seconds
    const translateX = (Math.random() - 0.5) * 200;
    const translateY = (Math.random() - 0.5) * 200;

    anime({
        targets: particle,
        opacity: [0, 0.7, 0],
        translateX: translateX,
        translateY: translateY,
        rotate: 360,
        scale: [0.5, 1, 0.5],
        duration: duration,
        easing: 'easeInOutSine',
        complete: function() {
            // Reset position and animate again
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            animateParticle(particle);
        }
    });
}

// Interactive particles on mouse move
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Create multiple temporary interactive particles
    if (Math.random() < 0.2) { // 30% chance (increased from 10%)
        const particleCount = Math.floor(Math.random() * 4) + 1; // 2-5 particles

        for (let i = 0; i < particleCount; i++) {
            // Add small random offset so particles don't spawn exactly on top of each other
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;

            // Small delay between particle creation for staggered effect
            setTimeout(() => {
                createInteractiveParticle(mouseX + offsetX, mouseY + offsetY);
            }, i * 50);
        }
    }
});

// Touch events for mobile devices
let touchParticles = [];

// Touch start - create particles on touch
document.addEventListener('touchstart', handleTouch, { passive: true });
document.addEventListener('touchmove', handleTouch, { passive: true });

function handleTouch(e) {
    e.preventDefault();

    // Handle multiple touch points
    for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        const touchX = touch.clientX;
        const touchY = touch.clientY;

        // Create particles for each touch point
        if (Math.random() < 0.3) { // 40% chance (higher than mouse for better mobile experience)
            const particleCount = Math.floor(Math.random() * 3) + 2; // 2-4 particles

            for (let j = 0; j < particleCount; j++) {
                const offsetX = (Math.random() - 0.5) * 30; // Slightly larger offset for touch
                const offsetY = (Math.random() - 0.5) * 30;

                setTimeout(() => {
                    createTouchParticle(touchX + offsetX, touchY + offsetY);
                }, j * 40);
            }
        }
    }
}

// Touch end - create burst effect
document.addEventListener('touchend', handleTouchEnd, { passive: true });

function handleTouchEnd(e) {
    // Create a burst of particles when touch ends
    for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        const touchX = touch.clientX;
        const touchY = touch.clientY;

        // Create burst of particles
        createTouchBurst(touchX, touchY);
    }
}

function createTouchBurst(x, y) {
    const burstCount = Math.floor(Math.random() * 4) + 2; // 3-6 particles for burst

    for (let i = 0; i < burstCount; i++) {
        const angle = (360 / burstCount) * i;
        const radius = Math.random() * 40 + 20;
        const offsetX = Math.cos(angle * Math.PI / 180) * radius;
        const offsetY = Math.sin(angle * Math.PI / 180) * radius;

        setTimeout(() => {
            createTouchParticle(x, y, true, { x: offsetX, y: offsetY });
        }, i * 30);
    }
}

function createTouchParticle(x, y, isBurst = false, burstDirection = null) {
    const container = document.getElementById('floatingParticles');
    const particle = document.createElement('div');

    // Random shapes
    const shapes = ['circle', 'square', 'triangle', 'diamond', 'star'];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

    // Enhanced colors for touch (more vibrant)
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

    particle.className = `floating-particle interactive-particle shape-${randomShape}`;

    // Slightly larger particles for touch (easier to see)
    const size = Math.random() * 6 + 2; // 4-10px
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.background = randomColor;
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    // Add glow effect for touch particles
    particle.style.boxShadow = `0 0 ${size * 2}px ${randomColor.match(/#[a-fA-F0-9]{6}/)?.[0] || 'rgba(255,255,255,0.5)'}`;

    container.appendChild(particle);

    let translateX, translateY;

    if (isBurst && burstDirection) {
        // Burst pattern
        translateX = burstDirection.x;
        translateY = burstDirection.y;
    } else {
        // Random movement
        translateX = (Math.random() - 0.5) * 100;
        translateY = (Math.random() - 0.5) * 100;
    }

    const duration = Math.random() * 800 + 1200; // 1.2-2 seconds

    anime({
        targets: particle,
        opacity: [0, 0.9, 0],
        scale: [0, Math.random() * 1.5 + 1, 0], // 1-2.5 scale
        translateX: translateX,
        translateY: translateY,
        rotate: Math.random() * 720, // More rotation for dramatic effect
        duration: duration,
        easing: 'easeOutExpo',
        complete: function() {
            particle.remove();
        }
    });
}

// Long press effect for mobile
let longPressTimer;
let isLongPress = false;

document.addEventListener('touchstart', function(e) {
    isLongPress = false;
    longPressTimer = setTimeout(() => {
        isLongPress = true;
        // Create continuous particles during long press
        createLongPressEffect(e.touches[0].clientX, e.touches[0].clientY);
    }, 500); // 500ms for long press
}, { passive: true });

document.addEventListener('touchend', function() {
    clearTimeout(longPressTimer);
}, { passive: true });

document.addEventListener('touchmove', function() {
    clearTimeout(longPressTimer);
}, { passive: true });

function createLongPressEffect(x, y) {
    if (!isLongPress) return;

    // Create a special long-press particle
    const particle = document.createElement('div');
    particle.className = 'floating-particle interactive-particle shape-circle';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.background = 'linear-gradient(45deg, #ff6b6b, #feca57)';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.8)';

    document.getElementById('floatingParticles').appendChild(particle);

    anime({
        targets: particle,
        opacity: [0, 1, 0],
        scale: [0, 2, 0],
        rotate: 360,
        duration: 1500,
        easing: 'easeOutElastic(1, .6)',
        complete: function() {
            particle.remove();
        }
    });
}

function createInteractiveParticle(x, y) {
    const container = document.getElementById('floatingParticles');
    const particle = document.createElement('div');

    // Random shapes
    const shapes = ['circle', 'square', 'triangle', 'diamond', 'star'];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

    // Random colors
    const colors = [
        'linear-gradient(45deg, #667eea, #764ba2)',
        'linear-gradient(45deg, #f093fb, #f5576c)',
        'linear-gradient(45deg, #4facfe, #00f2fe)',
        'linear-gradient(45deg, #43e97b, #38f9d7)',
        'linear-gradient(45deg, #fa709a, #fee140)',
        'linear-gradient(45deg, #a8edea, #fed6e3)',
        'linear-gradient(45deg, #ff9a9e, #fecfef)',
        'linear-gradient(45deg, #ffecd2, #fcb69f)'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    particle.className = `floating-particle interactive-particle shape-${randomShape}`;

    // Random size between 3px and 8px (slightly smaller since there are more)
    const size = Math.random() * 5 + 3;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.background = randomColor;
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    container.appendChild(particle);

    // Random animation duration for variety
    const duration = Math.random() * 1000 + 1500; // 1.5-2.5 seconds

    anime({
        targets: particle,
        opacity: [0, 0.8, 0],
        scale: [0, Math.random() * 1 + 1, 0], // Random scale between 1-2
        translateX: (Math.random() - 0.5) * 120,
        translateY: (Math.random() - 0.5) * 120,
        rotate: Math.random() * 360,
        duration: duration,
        easing: 'easeOutCubic',
        complete: function() {
            particle.remove();
        }
    });
}

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', function() {
    createFloatingParticles();
});

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

// Make project cards clickable
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the GitHub link itself
            if (e.target.classList.contains('project-link')) {
                return;
            }

            const githubLink = card.querySelector('.project-link[href*="github"]');
            if (githubLink) {
                window.open(githubLink.href, '_blank');
            }
        });
    });
});

// Make research cards clickable
document.addEventListener('DOMContentLoaded', function() {
    const researchCards = document.querySelectorAll('.research-item');

    researchCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the research link itself
            if (e.target.classList.contains('research-link')) {
                return;
            }

            const researchLink = card.querySelector('.research-link');
            if (researchLink) {
                window.open(researchLink.href, '_blank');
            }
        });

        // Add cursor pointer and hover effect
        card.style.cursor = 'pointer';
    });
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
// Replace the existing mouse trail initialization with this updated version

function initializeMouseTrail() {
    const trail = [];
    const trailLength = 15;
    let isHovering = false;
    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    // Section-based color scheme
    const sectionColors = {
        'home': '#ef4444',
        'about': '#ef4444',
        'experience': '#ef4444',
        'projects': '#ef4444',
        'research': '#ef4444',
        'contact': '#ef4444'
    };

    function getCurrentSectionColor() {
        const activeSection = document.querySelector('.section.active');
        return activeSection ? sectionColors[activeSection.id] || '#3b82f6' : '#3b82f6';
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
        mainCursor.style.background = currentColor;
        mainCursor.style.boxShadow = `0 0 20px ${currentColor}40`;

        trail.forEach((trailDot, i) => {
            const opacity = Math.max(0.05, 0.9 - (i / trailLength) * 0.8);
            const opacityHex = Math.floor(opacity * 255).toString(16).padStart(2, '0');
            trailDot.element.style.background = `${currentColor}${opacityHex}`;
        });
    }

    // Update colors periodically
    setInterval(updateTrailColors, 500);

    const interactiveSelectors = 'button, a, .nav-link, .project-card, .research-item, .glass-card, .skill-tag, .timeline-item, .contact-method, [role="button"], [onclick]';

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
    });

    function animateTrail() {
        for (let i = 0; i < trail.length; i++) {
            const trailDot = trail[i];
            const speed = 0.2 + (i * 0.02); // Varying speeds for organic movement

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

    // Enhanced cursor styles
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
        * {
            cursor: none !important;
        }
        
        body {
            cursor: none !important;
        }
        
        @media (hover: none) and (pointer: coarse) {
            * {
                cursor: auto !important;
            }
            body {
                cursor: auto !important;
            }
            .main-cursor,
            .mouse-trail-dot {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(cursorStyles);
}

function updateNavOnScroll() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollY = window.pageYOffset + 100;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

// Add this to your scroll event listener
window.addEventListener('scroll', updateNavOnScroll, { passive: true });


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
