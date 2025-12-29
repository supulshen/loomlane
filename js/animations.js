/* ===================================
   LOOM & LANE - ANIMATIONS & TRANSITIONS
   Enhanced User Experience
   =================================== */

// ========== SCROLL REVEAL WITH INTERSECTION OBSERVER ==========
function initScrollReveal() {
  // Observer configuration
  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  // Create intersection observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        entry.target.classList.remove('hidden');
        // Unobserve after reveal to improve performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealOptions);

  // Function to observe elements
  function observeElements() {
    // Select all elements to animate
    const elementsToReveal = document.querySelectorAll(`
      .product-card:not(.show):not(.hidden),
      .hero-section:not(.show):not(.hidden),
      .about-text:not(.show):not(.hidden),
      .feature-card:not(.show):not(.hidden),
      .category-card:not(.show):not(.hidden),
      .testimonial-card:not(.show):not(.hidden),
      .card:not(.show):not(.hidden)
    `);

    // Add hidden class and observe each element
    elementsToReveal.forEach((element, index) => {
      element.classList.add('hidden');
      
      // Add staggered delay for product cards
      if (element.classList.contains('product-card')) {
        // Calculate delay based on position in current viewport batch
        const productCards = document.querySelectorAll('.product-card.hidden');
        const cardIndex = Array.from(productCards).indexOf(element);
        const delay = (cardIndex % 12) * 0.1; // Stagger up to 12 items per batch
        element.style.transitionDelay = `${delay}s`;
      }
      
      revealObserver.observe(element);
    });
  }

  // Initial observation
  observeElements();

  // Re-observe when new content is added (for dynamically loaded products)
  const contentObserver = new MutationObserver(() => {
    observeElements();
  });

  // Observe products grid for changes
  const productsGrid = document.getElementById('productsGrid');
  if (productsGrid) {
    contentObserver.observe(productsGrid, {
      childList: true,
      subtree: true
    });
  }

  // Also observe other containers that might load content dynamically
  const mainContainers = document.querySelectorAll('main, .container, section');
  mainContainers.forEach(container => {
    contentObserver.observe(container, {
      childList: true,
      subtree: false
    });
  });
}

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

// ========== SMART NAVBAR SCROLL BEHAVIOR ==========
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  let lastScrollTop = 0;
  let scrollThreshold = 100; // Start hiding after scrolling 100px
  let isScrolling = false;
  
  window.addEventListener('scroll', () => {
    // Debounce scroll events for performance
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        handleSmartScroll();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });
  
  function handleSmartScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add 'scrolled' class for shadow effect when scrolled down
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Always show navbar at the very top
    if (currentScroll <= 0) {
      navbar.classList.remove('navbar-hidden');
      lastScrollTop = currentScroll;
      return;
    }
    
    // Smart hide/show logic
    if (currentScroll > scrollThreshold) {
      // Scrolling down - hide navbar
      if (currentScroll > lastScrollTop) {
        navbar.classList.add('navbar-hidden');
      } 
      // Scrolling up - show navbar
      else if (currentScroll < lastScrollTop) {
        navbar.classList.remove('navbar-hidden');
      }
    } else {
      // Always show navbar above threshold
      navbar.classList.remove('navbar-hidden');
    }
    
    // Update last scroll position
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
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
  const heroVideo = document.querySelector('.hero-video');
  const heroOverlay = document.querySelector('.hero-overlay');
  const hero = document.querySelector('.hero');
  
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      const heroHeight = hero.offsetHeight;
      
      // Only apply parallax when hero is in viewport
      if (scrollY < heroHeight) {
        const parallaxSpeed = 0.5;
        const translateY = scrollY * parallaxSpeed;
        
        // Apply parallax to video and overlay
        if (heroVideo) {
          heroVideo.style.transform = `translateY(${translateY}px)`;
        }
        if (heroOverlay) {
          heroOverlay.style.transform = `translateY(${translateY}px)`;
        }
      }
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
  const counters = document.querySelectorAll('.stat-number[data-target], .counter-number[data-target]');
  
  if (counters.length === 0) return;
  
  // Create intersection observer
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
        // Stop observing after animation starts
        counterObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all counters
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
  
  // Function to animate individual counter
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000; // 2 seconds
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    const increment = target / totalFrames;
    
    let currentValue = 0;
    let frame = 0;
    
    // Add counting class for pulse animation
    element.classList.add('counting');
    
    const timer = setInterval(() => {
      frame++;
      currentValue += increment;
      
      if (frame >= totalFrames) {
        currentValue = target;
        clearInterval(timer);
        element.classList.remove('counting');
      }
      
      // Update display with suffix
      element.textContent = Math.floor(currentValue) + suffix;
    }, frameRate);
  }
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

// ========== COOKIE CONSENT BANNER ==========
function initCookieConsent() {
  // Check if user has already made a choice
  const cookiesAccepted = localStorage.getItem('cookiesAccepted');
  
  if (cookiesAccepted !== null) {
    // User has already made a choice, don't show banner
    return;
  }
  
  // Create cookie consent banner HTML
  const cookieBanner = document.createElement('div');
  cookieBanner.className = 'cookie-consent';
  cookieBanner.innerHTML = `
    <div class="cookie-consent-content">
      <p class="cookie-consent-text">
        <i class="fas fa-cookie-bite"></i>
        We use cookies to ensure the best artisan experience. By continuing, you agree to our use of cookies.
      </p>
      <div class="cookie-consent-buttons">
        <button class="cookie-consent-btn accept" id="acceptCookies">
          <i class="fas fa-check"></i> Accept
        </button>
        <button class="cookie-consent-btn decline" id="declineCookies">
          <i class="fas fa-times"></i> Decline
        </button>
      </div>
    </div>
  `;
  
  // Add banner to body
  document.body.appendChild(cookieBanner);
  
  // Show banner after 2 seconds with slide-up animation
  setTimeout(() => {
    cookieBanner.classList.add('show');
  }, 2000);
  
  // Handle Accept button
  document.getElementById('acceptCookies').addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    hideCookieBanner(cookieBanner);
    
    // Optional: Show confirmation toast
    if (typeof showToast === 'function') {
      showToast('Success', 'Cookie preferences saved!', 'success');
    }
  });
  
  // Handle Decline button
  document.getElementById('declineCookies').addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'false');
    hideCookieBanner(cookieBanner);
    
    // Optional: Show info toast
    if (typeof showToast === 'function') {
      showToast('Info', 'You can change your preferences anytime.', 'info');
    }
  });
  
  // Function to hide and remove banner
  function hideCookieBanner(banner) {
    banner.classList.remove('show');
    setTimeout(() => {
      banner.remove();
    }, 500);
  }
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
  initScrollReveal();
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
  initCookieConsent();
  
  console.log('✨ Animations initialized successfully!');
}

// Start animations
initAllAnimations();
