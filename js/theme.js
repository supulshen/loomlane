/**
 * LOOM & LANE - THEME SWITCHER
 * Handles light/dark mode toggle with localStorage persistence
 */

class ThemeManager {
  constructor() {
    this.theme = this.getStoredTheme() || 'light';
    this.init();
  }

  /**
   * Initialize theme on page load
   */
  init() {
    // Set initial theme
    this.applyTheme(this.theme);
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupToggle());
    } else {
      this.setupToggle();
    }
  }

  /**
   * Get stored theme from localStorage
   */
  getStoredTheme() {
    try {
      return localStorage.getItem('loomLaneTheme');
    } catch (error) {
      console.warn('LocalStorage not available:', error);
      return null;
    }
  }

  /**
   * Store theme preference in localStorage
   */
  storeTheme(theme) {
    try {
      localStorage.setItem('loomLaneTheme', theme);
    } catch (error) {
      console.warn('Cannot store theme:', error);
    }
  }

  /**
   * Apply theme to document
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.theme = theme;
    this.storeTheme(theme);
    this.updateToggleIcon();
  }

  /**
   * Toggle between light and dark theme
   */
  toggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    
    // Add smooth transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }

  /**
   * Setup theme toggle button
   */
  setupToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.toggleTheme();
        // Add click animation
        toggleBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
          toggleBtn.style.transform = '';
        }, 300);
      });
    }
  }

  /**
   * Update toggle button icon based on current theme
   */
  updateToggleIcon() {
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        if (this.theme === 'dark') {
          icon.className = 'fas fa-sun';
          toggleBtn.setAttribute('aria-label', 'Switch to light mode');
          toggleBtn.setAttribute('title', 'Switch to light mode');
        } else {
          icon.className = 'fas fa-moon';
          toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
          toggleBtn.setAttribute('title', 'Switch to dark mode');
        }
      }
    }
  }

  /**
   * Get current theme
   */
  getCurrentTheme() {
    return this.theme;
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}
