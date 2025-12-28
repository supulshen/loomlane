/* ===================================
   LOOM & LANE - ANIMATIONS & TRANSITIONS
   Enhanced User Experience
   =================================== */

// ========== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      // Optional: Stop observing after animation
      // animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with animation classes
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(`
    .animate-on-scroll,
    .product-card,
    .feature-card,
    .category-card,
    .testimonial-card,
    .branch-card
  `);
  
  animatedElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    animateOnScroll.observe(el);
  });
}

// ========== NAVBAR SCROLL EFFECT ==========
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ========== SMOOTH PAGE TRANSITIONS ==========
function initPageTransitions() {
  // Add fade-in effect on page load
  document.body.style.opacity = '0';
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    }, 100);
  });
  
  // Smooth transitions on page navigation
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href !== '#' && href !== '#!') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ========== ENHANCED THEME TOGGLE ANIMATION ==========
function enhanceThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Add rotation animation
      themeToggle.style.transform = 'rotate(360deg)';
      
      // Reset after animation
      setTimeout(() => {
        themeToggle.style.transform = '';
      }, 600);
      
      // Smooth theme transition effect
      document.body.style.transition = 'all 0.5s ease';
    });
  }
}

// ========== BUTTON RIPPLE EFFECT ==========
function createRipple(event) {
  const button = event.currentTarget;
  
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add('ripple');
  
  const ripple = button.getElementsByClassName('ripple')[0];
  
  if (ripple) {
    ripple.remove();
  }
  
  button.appendChild(circle);
}

function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });
}

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// ========== CARD TILT EFFECT (SUBTLE 3D) ==========
function initCardTilt() {
  const cards = document.querySelectorAll('.product-card, .feature-card, .category-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ========== STAGGER ANIMATION FOR PRODUCT GRID ==========
function staggerProductCards() {
  const products = document.querySelectorAll('.product-card');
  
  products.forEach((product, index) => {
    product.style.animationDelay = `${index * 0.1}s`;
  });
}

// ========== PARALLAX EFFECT FOR HERO SECTION ==========
function initParallax() {
  const hero = document.querySelector('.hero-section');
  
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      
      hero.style.transform = `translateY(${parallax}px)`;
    });
  }
}

// ========== IMAGE LAZY LOADING WITH FADE-IN ==========
function initLazyLoadImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
  });
}

// ========== CART BADGE BOUNCE ANIMATION ==========
function animateCartBadge() {
  const cartBadge = document.getElementById('cartItemCount');
  
  if (cartBadge) {
    const observer = new MutationObserver(() => {
      cartBadge.style.animation = 'none';
      setTimeout(() => {
        cartBadge.style.animation = 'pulse 0.5s ease';
      }, 10);
    });
    
    observer.observe(cartBadge, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }
}

// ========== MODAL ANIMATIONS ==========
function enhanceModalAnimations() {
  const modals = document.querySelectorAll('.modal');
  
  modals.forEach(modal => {
    modal.addEventListener('show.bs.modal', () => {
      const modalDialog = modal.querySelector('.modal-dialog');
      if (modalDialog) {
        modalDialog.style.animation = 'zoomIn 0.3s ease';
      }
    });
    
    modal.addEventListener('hide.bs.modal', () => {
      const modalDialog = modal.querySelector('.modal-dialog');
      if (modalDialog) {
        modalDialog.style.animation = 'fadeOut 0.3s ease';
      }
    });
  });
}

// ========== NUMBER COUNTER ANIMATION ==========
function animateNumbers() {
  const counters = document.querySelectorAll('[data-count]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    // Start animation when element is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(counter);
  });
}

// ========== FORM INPUT ANIMATIONS ==========
function initFormAnimations() {
  const inputs = document.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    // Label float animation
    const label = input.previousElementSibling;
    
    if (label && label.tagName === 'LABEL') {
      input.addEventListener('focus', () => {
        label.style.transform = 'translateY(-25px) scale(0.85)';
        label.style.color = 'var(--color-accent)';
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          label.style.transform = '';
          label.style.color = '';
        }
      });
    }
    
    // Input focus animation
    input.addEventListener('focus', () => {
      input.style.borderColor = 'var(--color-accent)';
      input.style.boxShadow = '0 0 0 3px rgba(200, 155, 60, 0.2)';
    });
    
    input.addEventListener('blur', () => {
      input.style.borderColor = '';
      input.style.boxShadow = '';
    });
  });
}

// ========== INITIALIZE ALL ANIMATIONS ==========
function initAllAnimations() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      runAnimations();
    });
  } else {
    runAnimations();
  }
}

function runAnimations() {
  initScrollAnimations();
  initNavbarScroll();
  initPageTransitions();
  enhanceThemeToggle();
  initRippleEffect();
  initCardTilt();
  staggerProductCards();
  initParallax();
  initLazyLoadImages();
  animateCartBadge();
  enhanceModalAnimations();
  animateNumbers();
  initFormAnimations();
  
  console.log('✨ Animations initialized successfully!');
}

// Start animations
initAllAnimations();
