// Modern Futuristic Portfolio JavaScript

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }, 1500);
});

// Particle Background
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particlesContainer.appendChild(particle);
  }
}

createParticles();

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Active Navigation Link on Scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLink?.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// Terminal Typing Effect
function typeTerminalText() {
  const terminalLines = [
    { text: 'whoami', output: 'Siseko Makomazi - DevOps Engineer' },
    { text: 'cat skills.txt', output: 'Kubernetes • Docker • Terraform • CI/CD • AWS • Azure' }
  ];
  
  let lineIndex = 0;
  let charIndex = 0;
  let isTyping = false;

  function typeLine() {
    if (lineIndex >= terminalLines.length) {
      setTimeout(typeLine, 3000);
      lineIndex = 0;
      return;
    }

    const currentLine = terminalLines[lineIndex];
    const terminalLine = document.querySelectorAll('.terminal-line')[lineIndex];
    const terminalOutput = document.querySelectorAll('.terminal-output')[lineIndex];
    
    if (!isTyping && terminalLine) {
      isTyping = true;
      const prompt = terminalLine.querySelector('.prompt');
      const textSpan = document.createElement('span');
      textSpan.className = 'terminal-text';
      terminalLine.appendChild(textSpan);
      
      function typeChar() {
        if (charIndex < currentLine.text.length) {
          textSpan.textContent += currentLine.text[charIndex];
          charIndex++;
          setTimeout(typeChar, 50);
        } else {
          isTyping = false;
          charIndex = 0;
          lineIndex++;
          
          if (terminalOutput) {
            setTimeout(() => {
              terminalOutput.style.opacity = '1';
            }, 500);
          }
          
          setTimeout(typeLine, 2000);
        }
      }
      
      typeChar();
    }
  }

  typeLine();
}

// Start terminal typing after page load
setTimeout(typeTerminalText, 2000);

// Hero Typing Animation
function typeHeroText() {
  const phrases = [
    'DevOps Automation',
    'Cloud Infrastructure',
    'Container Orchestration',
    'CI/CD Pipelines',
    'Full Stack Development'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextElement = document.querySelector('.typed-text');
  
  if (!typedTextElement) return;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (!isDeleting) {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    
    setTimeout(type, isDeleting ? 50 : 100);
  }

  type();
}

typeHeroText();

// Skill Progress Bars Animation
function animateSkillBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    
    setTimeout(() => {
      bar.style.width = width;
    }, 200);
  });
}

// Trigger skill animation when skills section is in view
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      formMessage.className = 'form-message success';
      formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
      formMessage.style.display = 'block';
      
      // Reset form
      contactForm.reset();
    } catch (error) {
      // Show error message
      formMessage.className = 'form-message error';
      formMessage.textContent = 'Oops! Something went wrong. Please try again.';
      formMessage.style.display = 'block';
    } finally {
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }
  });
}

// Navbar Background on Scroll
function updateNavbarBackground() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    navbar.style.boxShadow = 'none';
  }
}

window.addEventListener('scroll', updateNavbarBackground);

// Smooth Scroll for Navigation Links
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

// Project Card Hover Effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Timeline Animation on Scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 200);
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

timelineItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(50px)';
  item.style.transition = 'all 0.6s ease';
  timelineObserver.observe(item);
});

// Parallax Effect for Hero Section
function updateParallax() {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = window.pageYOffset;
    const parallaxElements = hero.querySelectorAll('.hero-text, .hero-visual');
    
    parallaxElements.forEach((element, index) => {
      const speed = index === 0 ? 0.5 : 0.3;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
}

window.addEventListener('scroll', updateParallax);

// Cursor Glow Effect (Optional - for desktop)
function createCursorGlow() {
  if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transition: transform 0.1s ease;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  }
}

// Initialize cursor glow on desktop
createCursorGlow();

// Performance Optimization - Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(updateActiveNavLink, 10));
window.addEventListener('scroll', debounce(updateNavbarBackground, 10));
window.addEventListener('scroll', debounce(updateParallax, 10));

// Add CSS for cursor glow
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
  .cursor-glow {
    mix-blend-mode: screen;
  }
`;
document.head.appendChild(cursorStyles);

console.log('🚀 Portfolio initialized successfully!');
console.log('💻 Built with modern web technologies');
console.log('🎨 Futuristic design with smooth animations');
