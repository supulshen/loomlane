/**
 * LOOM & LANE - DATA UTILITIES
 * Helper functions for data manipulation
 */

/**
 * Format currency
 */
function formatCurrency(amount) {
  return `LKR ${amount.toLocaleString('en-US')}`;
}

/**
 * Generate star rating HTML
 */
function generateStarRating(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      html += '<i class="fas fa-star"></i>';
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      html += '<i class="fas fa-star-half-alt"></i>';
    } else {
      html += '<i class="far fa-star"></i>';
    }
  }
  return html;
}

/**
 * Validate email format
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate phone number
 */
function validatePhone(phone) {
  const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return re.test(phone);
}

/**
 * Get URL parameter
 */
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

/**
 * Debounce function
 */
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

/**
 * Calculate discount percentage
 */
function calculateDiscount(originalPrice, currentPrice) {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

// Export functions if module system is available
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatCurrency,
    generateStarRating,
    validateEmail,
    validatePhone,
    getUrlParameter,
    debounce,
    calculateDiscount
  };
}
