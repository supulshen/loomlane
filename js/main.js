/**
 * LOOM & LANE - MAIN JAVASCRIPT
 * Handles product loading, search, filtering, and dynamic content
 */

// ========== GLOBAL VARIABLES ==========
let allProducts = [];
let allCategories = [];

// ========== UTILITY FUNCTIONS ==========

/**
 * Format price in Sri Lankan Rupees
 */
function formatPrice(price) {
  return `LKR ${price.toLocaleString('en-US')}`;
}

/**
 * Show toast notification
 */
function showToast(title, message, type = 'success') {
  const toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) return;

  const toastId = 'toast-' + Date.now();
  const toastHTML = `
    <div id="${toastId}" class="toast ${type}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
      <div class="toast-header">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2 text-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'warning'}"></i>
        <strong class="me-auto">${title}</strong>
        <small>Just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    </div>
  `;

  toastContainer.insertAdjacentHTML('beforeend', toastHTML);
  const toastElement = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastElement);
  toast.show();

  // Remove toast from DOM after it's hidden
  toastElement.addEventListener('hidden.bs.toast', function() {
    this.remove();
  });
}

/**
 * Create product card HTML
 */
function createProductCard(product) {
  const badgeHTML = product.badge 
    ? `<span class="badge badge-${product.badge}">${product.badge.toUpperCase()}</span>` 
    : '';
  
  const oldPriceHTML = product.originalPrice 
    ? `<span class="product-price-old">${formatPrice(product.originalPrice)}</span>` 
    : '';

  return `
    <div class="col-lg-3 col-md-4 col-sm-6">
      <div class="card product-card h-100">
        ${badgeHTML}
        <div style="overflow: hidden; height: 280px;">
          <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text small text-muted mb-2">
            <i class="fas fa-tag"></i> ${product.category}
          </p>
          <div class="mb-2">
            <span class="text-warning">
              ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
              ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
            </span>
            <small class="text-muted ms-1">(${product.reviews})</small>
          </div>
          <div class="mb-3">
            <span class="product-price">${formatPrice(product.price)}</span>
            ${oldPriceHTML}
          </div>
          <div class="mt-auto d-flex gap-2">
            <a href="product-details.html?id=${product.id}" class="btn btn-outline btn-sm flex-grow-1">
              <i class="fas fa-eye"></i> View
            </a>
            <button class="btn btn-primary btn-sm flex-grow-1" onclick="addToCart(${product.id})">
              <i class="fas fa-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Create category card HTML
 */
function createCategoryCard(category) {
  return `
    <div class="category-scroll-item">
      <a href="products.html?category=${encodeURIComponent(category.name)}" class="text-decoration-none" aria-label="View ${category.name} products">
        <div class="card">
          <div style="position: relative; overflow: hidden;">
            <img src="${category.image}" class="card-img-top" alt="${category.name}" loading="lazy">
            <div class="category-overlay"></div>
            <div class="category-content">
              <h4>${category.name}</h4>
              <p>${category.description}</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  `;
}

// ========== DATA LOADING ==========

/**
 * Load products from JSON file
 * 
 * IMPORTANT: fetch() requires a local server (e.g., Live Server extension) 
 * due to browser CORS security policies. Opening HTML files directly via 
 * file:// protocol will cause fetch() to fail.
 * 
 * Recommended: Install "Live Server" VS Code extension and use "Go Live" button.
 */
async function loadProducts() {
  try {
    // Fetch products from relative path (requires local server)
    const response = await fetch('data/products.json');
    
    // Check if response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse JSON data
    const data = await response.json();
    
    // Validate data structure
    if (!data.products || !Array.isArray(data.products)) {
      throw new Error('Invalid data structure: products array not found');
    }
    
    // Store data globally
    allProducts = data.products;
    allCategories = data.categories || [];
    
    console.log(`✓ Successfully loaded ${allProducts.length} products and ${allCategories.length} categories`);
    
    return data;
    
  } catch (error) {
    // Log detailed error for developers
    console.error('❌ Error loading products:', error);
    console.error('Make sure you are running this site with a local server (e.g., Live Server)');
    
    // Only show user-facing error if fetch truly failed
    showToast('Error', 'Failed to load products. Please ensure you are using a local server.', 'error');
    
    return { products: [], categories: [] };
  }
}

/**
 * Display featured products on homepage
 */
async function displayFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  const loadingSpinner = document.getElementById('productsLoading');
  
  if (!container) return;

  try {
    // Show loading spinner
    if (loadingSpinner) {
      loadingSpinner.style.display = 'flex';
    }
    
    // Simulate realistic loading delay (300ms)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Load products if not already loaded
    if (allProducts.length === 0) {
      const data = await loadProducts();
      // If loading failed, data will be empty
      if (!data.products || data.products.length === 0) {
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        container.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Failed to load products. Please use a local server.</p></div>';
        return;
      }
    }
    
    // Filter featured products
    const featuredProducts = allProducts.filter(p => p.featured);
    
    // Hide loading spinner
    if (loadingSpinner) {
      loadingSpinner.style.display = 'none';
    }
    
    // Display products
    if (featuredProducts.length === 0) {
      container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No featured products available.</p></div>';
      return;
    }
    
    // Wrap each card in a fixed-width container for carousel
    container.innerHTML = featuredProducts.map(product => `
      <div class="carousel-item-wrapper">
        ${createProductCard(product)}
      </div>
    `).join('');
    
    // Initialize carousel with auto-scroll
    initCarouselAutoScroll('featuredProducts', 'carouselLeft', 'carouselRight', 320);
    
  } catch (error) {
    console.error('❌ Error displaying featured products:', error);
    if (loadingSpinner) loadingSpinner.style.display = 'none';
    container.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Error loading products.</p></div>';
  }
}

/**
 * Universal carousel auto-scroll with arrow controls
 */
function initCarouselAutoScroll(containerId, leftArrowId, rightArrowId, cardWidth) {
  const container = document.getElementById(containerId);
  const leftArrow = document.getElementById(leftArrowId);
  const rightArrow = document.getElementById(rightArrowId);
  
  if (!container) return;
  
  let scrollDirection = 1;
  let scrollSpeed = 0.5;
  let isHovering = false;
  let isPaused = false;
  let animationFrameId = null;
  let lastScrollLeft = 0;
  let userIsScrolling = false;
  let scrollTimeout = null;
  
  const gap = 24;
  const scrollAmount = cardWidth + gap;
  
  function autoScroll() {
    if (!isHovering && !isPaused && !userIsScrolling) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (maxScroll > 0) {
        container.scrollLeft += scrollDirection * scrollSpeed;
        
        if (container.scrollLeft >= maxScroll) {
          scrollDirection = -1;
        } else if (container.scrollLeft <= 0) {
          scrollDirection = 1;
        }
      }
    }
    
    animationFrameId = requestAnimationFrame(autoScroll);
  }
  
  function updateArrowStates() {
    if (!leftArrow || !rightArrow) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;
    
    if (scrollLeft <= 0) {
      leftArrow.style.opacity = '0.3';
      leftArrow.style.pointerEvents = 'none';
    } else {
      leftArrow.style.opacity = '1';
      leftArrow.style.pointerEvents = 'auto';
    }
    
    if (scrollLeft >= maxScroll - 1) {
      rightArrow.style.opacity = '0.3';
      rightArrow.style.pointerEvents = 'none';
    } else {
      rightArrow.style.opacity = '1';
      rightArrow.style.pointerEvents = 'auto';
    }
  }
  
  function pauseAutoScroll(duration = 3000) {
    isPaused = true;
    userIsScrolling = true;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      userIsScrolling = false;
      isPaused = false;
    }, duration);
  }
  
  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
      pauseAutoScroll();
    });
    
    leftArrow.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        leftArrow.click();
      }
    });
  }
  
  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      pauseAutoScroll();
    });
    
    rightArrow.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        rightArrow.click();
      }
    });
  }
  
  container.addEventListener('mouseenter', () => {
    isHovering = true;
  });
  
  container.addEventListener('mouseleave', () => {
    isHovering = false;
  });
  
  container.addEventListener('scroll', () => {
    if (Math.abs(container.scrollLeft - lastScrollLeft) > 5) {
      pauseAutoScroll(2000);
    }
    
    lastScrollLeft = container.scrollLeft;
    updateArrowStates();
  });
  
  container.addEventListener('touchstart', () => {
    isPaused = true;
  });
  
  container.addEventListener('touchend', () => {
    setTimeout(() => {
      isPaused = false;
    }, 2000);
  });
  
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      pauseAutoScroll(2000);
    }
  });
  
  updateArrowStates();
  animationFrameId = requestAnimationFrame(autoScroll);
  
  window.addEventListener('beforeunload', () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
}

/**
 * Display categories
 */
async function displayCategories() {
  const container = document.getElementById('categoriesGrid');
  if (!container) return;

  try {
    // Load categories if not already loaded
    if (allCategories.length === 0 && allProducts.length === 0) {
      const data = await loadProducts();
      if (!data.categories || data.categories.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No categories available.</p></div>';
        return;
      }
    }
    
    if (allCategories.length === 0) {
      container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No categories available.</p></div>';
      return;
    }
    
    container.innerHTML = allCategories.map(category => createCategoryCard(category)).join('');
    
    initCarouselAutoScroll('categoriesGrid', 'categoryArrowLeft', 'categoryArrowRight', 320);
    
  } catch (error) {
    console.error('❌ Error displaying categories:', error);
    container.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Error loading categories.</p></div>';
  }
}

// ========== SEARCH FUNCTIONALITY ==========

/**
 * Search products by query
 */
function searchProducts(query) {
  if (!query || query.trim().length === 0) {
    return [];
  }
  
  const searchTerm = query.toLowerCase().trim();
  
  return allProducts.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  });
}

/**
 * Display search results
 */
/**
 * Display search results in modern overlay
 */
function displayGlobalSearchResults(results) {
  const resultsContainer = document.getElementById('globalSearchResults');
  if (!resultsContainer) return;
  
  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="search-no-results">
        <i class="fas fa-search"></i>
        <p>No products found</p>
      </div>
    `;
    return;
  }
  
  const resultsHTML = results.slice(0, 8).map(product => `
    <a href="product-details.html?id=${product.id}" class="search-result-item">
      <img src="${product.image}" alt="${product.name}" class="search-result-image">
      <div class="search-result-content">
        <div class="search-result-title">${product.name}</div>
        <div class="search-result-category">${product.category}</div>
      </div>
      <div class="search-result-price">${formatPrice(product.price)}</div>
    </a>
  `).join('');
  
  let finalHTML = resultsHTML;
  
  if (results.length > 8) {
    const searchQuery = document.getElementById('globalSearch')?.value || '';
    finalHTML += `
      <a href="products.html?search=${encodeURIComponent(searchQuery)}" class="search-view-all">
        <strong>View all ${results.length} results</strong>
        <i class="fas fa-arrow-right ms-2"></i>
      </a>
    `;
  }
  
  resultsContainer.innerHTML = finalHTML;
}

/**
 * Setup modern global search
 */
function setupGlobalSearch() {
  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('globalSearch');
  const resultsContainer = document.getElementById('globalSearchResults');
  
  if (!searchToggle || !searchOverlay || !searchInput) return;
  
  // Open search overlay
  searchToggle.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    setTimeout(() => searchInput.focus(), 100);
  });
  
  // Close search overlay
  function closeSearch() {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    if (resultsContainer) resultsContainer.innerHTML = '';
  }
  
  if (searchClose) {
    searchClose.addEventListener('click', closeSearch);
  }
  
  // Close on overlay click
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      closeSearch();
    }
  });
  
  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  });
  
  // Live search functionality
  let searchTimeout;
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    
    const query = this.value.trim();
    
    if (query.length < 2) {
      if (resultsContainer) resultsContainer.innerHTML = '';
      return;
    }
    
    searchTimeout = setTimeout(() => {
      const results = searchProducts(query);
      displayGlobalSearchResults(results);
    }, 300);
  });
  
  // Search on Enter key
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const query = this.value.trim();
      if (query.length >= 2) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      }
    }
  });
}

/**
 * Display search results (legacy - kept for compatibility)
 */
function displaySearchResults(results) {
  const resultsContainer = document.getElementById('searchResults');
  if (!resultsContainer) return;
  
  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="list-group-item text-center py-4">
        <i class="fas fa-search fa-2x mb-2 text-muted"></i>
        <p class="mb-0 text-muted">No products found</p>
      </div>
    `;
    resultsContainer.style.display = 'block';
    return;
  }
  
  const resultsHTML = results.slice(0, 5).map(product => `
    <a href="product-details.html?id=${product.id}" class="list-group-item list-group-item-action">
      <div class="d-flex align-items-center">
        <img src="${product.image}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius-md);" class="me-3">
        <div class="flex-grow-1">
          <h6 class="mb-1">${product.name}</h6>
          <small class="text-muted">${product.category}</small>
        </div>
        <div class="text-end">
          <strong class="text-primary">${formatPrice(product.price)}</strong>
        </div>
      </div>
    </a>
  `).join('');
  
  resultsContainer.innerHTML = resultsHTML;
  
  if (results.length > 5) {
    resultsContainer.insertAdjacentHTML('beforeend', `
      <a href="products.html?search=${encodeURIComponent(document.getElementById('heroSearch')?.value || '')}" class="list-group-item list-group-item-action text-center text-primary">
        <strong>View all ${results.length} results</strong>
      </a>
    `);
  }
  
  resultsContainer.style.display = 'block';
}

/**
 * Hide search results
 */
function hideSearchResults() {
  const resultsContainer = document.getElementById('searchResults');
  if (resultsContainer) {
    setTimeout(() => {
      resultsContainer.style.display = 'none';
    }, 200);
  }
}

/**
 * Setup search functionality (legacy)
 */
function setupSearch() {
  const searchInput = document.getElementById('heroSearch');
  const searchBtn = document.getElementById('heroSearchBtn');
  const resultsContainer = document.getElementById('searchResults');
  
  if (!searchInput) return;
  
  // Search on input
  let searchTimeout;
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    
    const query = this.value.trim();
    
    if (query.length < 2) {
      if (resultsContainer) resultsContainer.style.display = 'none';
      return;
    }
    
    searchTimeout = setTimeout(() => {
      const results = searchProducts(query);
      displaySearchResults(results);
    }, 300);
  });
  
  // Search on button click
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      const query = searchInput.value.trim();
      if (query.length >= 2) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      }
    });
  }
  
  // Search on Enter key
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const query = this.value.trim();
      if (query.length >= 2) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      }
    }
  });
  
  // Hide results when clicking outside
  document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && resultsContainer && !resultsContainer.contains(e.target)) {
      hideSearchResults();
    }
  });
  
  // Show results when focusing on search input
  searchInput.addEventListener('focus', function() {
    if (this.value.trim().length >= 2) {
      const results = searchProducts(this.value);
      displaySearchResults(results);
    }
  });
}

// ========== PAGE INITIALIZATION ==========

/**
 * Initialize homepage
 */
async function initHomePage() {
  // Load products first
  await loadProducts();
  
  // Display featured products
  await displayFeaturedProducts();
  
  // Display categories
  await displayCategories();
  
  // Setup global search
  setupGlobalSearch();
  
  // Setup legacy search (if exists)
  setupSearch();
}

// ========== EVENT LISTENERS ==========

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomePage);
} else {
  initHomePage();
}

// Update active nav link
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

/* ===================================
   BACK TO TOP BUTTON
   =================================== */
// Get the button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  // Show button when user scrolls down 300px from the top
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  
  // Scroll to top when button is clicked
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
