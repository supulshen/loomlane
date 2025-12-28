/**
 * LOOM & LANE - SHOPPING CART MANAGER
 * Handles cart operations with localStorage persistence
 */

// ========== CART MANAGER CLASS ==========

class CartManager {
  constructor() {
    this.cartKey = 'loomLaneCart';
    this.cart = this.loadCart();
  }

  /**
   * Load cart from localStorage
   */
  loadCart() {
    try {
      const cartData = localStorage.getItem(this.cartKey);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  /**
   * Save cart to localStorage
   */
  saveCart() {
    try {
      localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
      this.updateCartCount();
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  /**
   * Add item to cart
   */
  addItem(productId, quantity = 1, selectedColor = null, selectedSize = null) {
    // Check if item already exists in cart
    const existingItemIndex = this.cart.findIndex(item => 
      item.id === productId && 
      item.color === selectedColor && 
      item.size === selectedSize
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      this.cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      this.cart.push({
        id: productId,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize,
        addedAt: new Date().toISOString()
      });
    }

    this.saveCart();
    return true;
  }

  /**
   * Remove item from cart
   */
  removeItem(productId, color = null, size = null) {
    this.cart = this.cart.filter(item => 
      !(item.id === productId && item.color === color && item.size === size)
    );
    this.saveCart();
  }

  /**
   * Update item quantity
   */
  updateQuantity(productId, quantity, color = null, size = null) {
    const itemIndex = this.cart.findIndex(item => 
      item.id === productId && item.color === color && item.size === size
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        this.removeItem(productId, color, size);
      } else {
        this.cart[itemIndex].quantity = quantity;
        this.saveCart();
      }
    }
  }

  /**
   * Get cart items
   */
  getItems() {
    return this.cart;
  }

  /**
   * Get cart count
   */
  getCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Clear cart
   */
  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  /**
   * Update cart count badge in navbar
   */
  updateCartCount() {
    const cartBadge = document.getElementById('cartCount');
    if (cartBadge) {
      const count = this.getCount();
      cartBadge.textContent = count;
      cartBadge.style.display = count > 0 ? 'inline-block' : 'none';
    }
  }

  /**
   * Calculate cart total
   * 
   * IMPORTANT: fetch() requires a local server (e.g., Live Server extension) 
   * due to browser CORS security policies.
   */
  async getCartTotal() {
    try {
      // Load products to get prices (requires local server)
      const response = await fetch('data/products.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.products || !Array.isArray(data.products)) {
        throw new Error('Invalid data structure');
      }
      
      const products = data.products;

      let total = 0;
      this.cart.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        if (product) {
          total += product.price * cartItem.quantity;
        }
      });

      return total;
    } catch (error) {
      console.error('❌ Error calculating cart total:', error);
      console.error('Make sure you are running this site with a local server (e.g., Live Server)');
      return 0;
    }
  }
}

// ========== GLOBAL CART INSTANCE ==========
const cartManager = new CartManager();

// ========== HELPER FUNCTIONS ==========

/**
 * Add product to cart (called from product cards and detail page)
 * 
 * IMPORTANT: fetch() requires a local server (e.g., Live Server extension) 
 * due to browser CORS security policies.
 */
async function addToCart(productId, quantity = 1, selectedColor = null, selectedSize = null) {
  try {
    // Load product details (requires local server)
    const response = await fetch('data/products.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.products || !Array.isArray(data.products)) {
      throw new Error('Invalid data structure');
    }
    
    const product = data.products.find(p => p.id === productId);

    if (!product) {
      showToast('Error', 'Product not found', 'error');
      return false;
    }

    if (!product.inStock) {
      showToast('Out of Stock', 'This product is currently unavailable', 'error');
      return false;
    }

    // Add to cart
    cartManager.addItem(productId, quantity, selectedColor, selectedSize);

    // Show success message
    showToast(
      'Added to Cart!', 
      `${product.name} has been added to your cart`, 
      'success'
    );

    return true;
  } catch (error) {
    console.error('❌ Error adding to cart:', error);
    console.error('Make sure you are running this site with a local server (e.g., Live Server)');
    showToast('Error', 'Failed to add product to cart', 'error');
    return false;
  }
}

/**
 * Remove product from cart
 */
function removeFromCart(productId, color = null, size = null) {
  cartManager.removeItem(productId, color, size);
  showToast('Removed', 'Product removed from cart', 'success');
  
  // Reload cart page if we're on it
  if (window.location.pathname.includes('cart.html')) {
    if (typeof loadCartPage === 'function') {
      loadCartPage();
    }
  }
}

/**
 * Update cart item quantity
 */
function updateCartQuantity(productId, quantity, color = null, size = null) {
  cartManager.updateQuantity(productId, quantity, color, size);
  
  // Reload cart page if we're on it
  if (window.location.pathname.includes('cart.html')) {
    if (typeof loadCartPage === 'function') {
      loadCartPage();
    }
  }
}

/**
 * Update cart count on page load
 */
function updateCartCount() {
  cartManager.updateCartCount();
}

/**
 * Get cart items count
 */
function getCartCount() {
  return cartManager.getCount();
}

/**
 * Clear entire cart
 */
function clearCart() {
  if (confirm('Are you sure you want to clear your cart?')) {
    cartManager.clearCart();
    showToast('Cart Cleared', 'All items have been removed from your cart', 'success');
    
    // Reload cart page if we're on it
    if (window.location.pathname.includes('cart.html')) {
      if (typeof loadCartPage === 'function') {
        loadCartPage();
      }
    }
  }
}

// ========== INITIALIZATION ==========

// Update cart count when page loads
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CartManager, cartManager };
}
