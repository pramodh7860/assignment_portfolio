// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll indicator click
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-category')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 500);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('section, .project-card, .skill-category, .info-card, .blockchain-feature').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Parallax effect for background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Move depth layers
    document.querySelectorAll('.depth-layer').forEach((layer, index) => {
        const speed = 0.2 + (index * 0.1);
        layer.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Move ambient orbs
    document.querySelectorAll('.ambient-orb').forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translateY(${scrolled * speed}px) scale(${1 + scrolled * 0.0001})`;
    });
});

// Dynamic navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 20, 25, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(15, 20, 25, 0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
        }, 1000);
    }
});

// Particle cursor effect
let particles = [];

document.addEventListener('mousemove', (e) => {
    // Create particle
    const particle = {
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        life: 1,
        decay: Math.random() * 0.02 + 0.01
    };
    
    particles.push(particle);
    
    // Limit particles
    if (particles.length > 50) {
        particles.shift();
    }
});

// Animate particles
function animateParticles() {
    const canvas = document.getElementById('particleCanvas') || createCanvas();
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life -= particle.decay;
        
        if (particle.life <= 0) {
            particles.splice(index, 1);
            return;
        }
        
        ctx.save();
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = '#8B9DC3';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
    
    requestAnimationFrame(animateParticles);
}

function createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    return canvas;
}

// Start particle animation
animateParticles();

// Add floating animation to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.style.animation = 'cardFloat 6s ease-in-out infinite';
});

// Add CSS for floating animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes cardFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }
`;
document.head.appendChild(floatStyle);

// Code window typing animation
function animateCodeWindow() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.5s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, (index + 1) * 300);
    });
}

// Start code animation after page load
window.addEventListener('load', () => {
    setTimeout(animateCodeWindow, 2000);
});

// Add glitch effect to hero title on hover
document.querySelector('.hero-title')?.addEventListener('mouseenter', function() {
    this.style.animation = 'glitch 0.3s ease-in-out';
});

// Add glitch animation CSS
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-1px, 1px); }
        40% { transform: translate(-1px, -1px); }
        60% { transform: translate(1px, 1px); }
        80% { transform: translate(1px, -1px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(glitchStyle);

// Reset animation after it completes
document.querySelector('.hero-title')?.addEventListener('animationend', function() {
    this.style.animation = '';
});

// Add interactive hover effects
document.querySelectorAll('.project-card, .skill-category, .info-card').forEach(element => {
    element.classList.add('interactive-hover');
});

// Smooth reveal animation for sections
const revealElements = document.querySelectorAll('.section-header, .hero-content, .hero-visual');
revealElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        element.style.transition = 'all 0.8s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, index * 200);
});

// Add loading screen
function createLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">PK</div>
            <div class="loader-text">Loading Portfolio...</div>
            <div class="loader-bar">
                <div class="loader-progress"></div>
            </div>
        </div>
    `;
    
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        #loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
        }
        
        .loader-logo {
            font-size: 3rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--primary-soft), var(--secondary-soft));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
            animation: pulse 2s ease-in-out infinite;
        }
        
        .loader-text {
            color: var(--text-muted);
            margin-bottom: 2rem;
        }
        
        .loader-bar {
            width: 200px;
            height: 4px;
            background: rgba(248, 249, 250, 0.1);
            border-radius: 2px;
            overflow: hidden;
        }
        
        .loader-progress {
            height: 100%;
            background: linear-gradient(135deg, var(--primary-soft), var(--secondary-soft));
            width: 0;
            animation: loadProgress 3s ease-out forwards;
        }
        
        @keyframes loadProgress {
            to { width: 100%; }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    
    document.head.appendChild(loaderStyle);
    document.body.appendChild(loader);
    
    // Remove loader after animation
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
            loaderStyle.remove();
        }, 500);
    }, 3000);
}

// Initialize loading screen
document.addEventListener('DOMContentLoaded', createLoadingScreen);

function typingEffectText(element, text, speed = 130, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

document.addEventListener("DOMContentLoaded", () => {
    const nameElement = document.getElementById("typingName");
    if (nameElement) {
        nameElement.innerHTML = "";
        typingEffectText(nameElement, "Pramodh Kumar Jana", 130, () => {
            nameElement.classList.add("shiny-text");
        });
    }
    // Fade-up animation for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});