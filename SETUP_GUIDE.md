# 🚀 Setup & Testing Guide
## Loom & Lane E-Commerce Website

---

## 📋 Quick Start (For Instructors/Evaluators)

### Immediate Testing (No Setup Required)
1. **Extract the ZIP file** to any folder on your computer
2. **Open `index.html`** directly in any modern web browser
3. **That's it!** The website is fully functional

**No server, no installation, no configuration needed.**

---

## 🖥️ Recommended Setup Methods

### Method 1: Direct File Opening (Easiest)
**Best for:** Quick evaluation and testing

1. Navigate to the project folder
2. Double-click `index.html`
3. Website opens in your default browser

**✅ Pros:**
- Instant access
- No setup required
- Works on any OS

**⚠️ Note:** Some browsers may show CORS warnings for local JSON files, but the site will still work.

---

### Method 2: Local Web Server (Recommended)
**Best for:** Full testing, avoiding CORS issues

#### Using Python (Usually pre-installed on Mac/Linux)
```bash
# Navigate to project folder
cd path/to/loomlane

# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```
Then open: `http://localhost:8000`

#### Using Node.js
```bash
# Install http-server globally (one-time)
npm install -g http-server

# Navigate to project folder
cd path/to/loomlane

# Start server
http-server -p 8000
```
Then open: `http://localhost:8000`

#### Using VS Code Live Server Extension
1. Open project folder in VS Code
2. Install "Live Server" extension
3. Right-click `index.html`
4. Select "Open with Live Server"

#### Using PHP (If installed)
```bash
cd path/to/loomlane
php -S localhost:8000
```
Then open: `http://localhost:8000`

---

## 🧪 Testing Checklist

### 1. Homepage Testing
- [ ] Page loads without errors
- [ ] Hero video plays (or shows fallback)
- [ ] Featured products display correctly
- [ ] "Shop Now" button works
- [ ] Newsletter signup form works
- [ ] Navigation menu is functional

### 2. Products Page Testing
- [ ] All products load from JSON
- [ ] Category filter works
- [ ] Price range filter works
- [ ] Rating filter works
- [ ] In stock filter works
- [ ] Search functionality works
- [ ] Sort by dropdown works
- [ ] Product cards are clickable
- [ ] "Add to Cart" buttons work
- [ ] Quick view functionality works

### 3. Product Details Page Testing
- [ ] Click any product card
- [ ] Product details display correctly
- [ ] Image gallery works
- [ ] Color selection works (if available)
- [ ] Size selection works (if available)
- [ ] Quantity adjustment works
- [ ] "Add to Cart" works
- [ ] Related products display
- [ ] Reviews and ratings show
- [ ] Product tabs work (Details, Specs, Care)

### 4. Shopping Cart Testing
- [ ] Cart icon shows item count
- [ ] Click cart icon to open cart page
- [ ] Cart items display correctly
- [ ] Quantity increase/decrease works
- [ ] Remove item works
- [ ] Subtotal calculates correctly
- [ ] Shipping is added
- [ ] Total is correct
- [ ] "Proceed to Checkout" works
- [ ] Cart persists on page refresh

### 5. Checkout Testing
- [ ] Order summary displays
- [ ] All form fields are present
- [ ] Form validation works
- [ ] Email validation works
- [ ] Phone validation works
- [ ] Required field validation works
- [ ] City dropdown works
- [ ] Payment method selection works
- [ ] Terms checkbox works
- [ ] "Place Order" button works
- [ ] Order confirmation shows
- [ ] Cart is cleared after order

### 6. Contact Form Testing
- [ ] All form fields present
- [ ] First name validation
- [ ] Last name validation
- [ ] Email format validation
- [ ] Subject dropdown works
- [ ] Message textarea works
- [ ] Submit button works
- [ ] Success message appears
- [ ] Form resets after submission

### 7. Feedback Form Testing
- [ ] Name field validates
- [ ] Email validates
- [ ] Feedback type dropdown works
- [ ] Star rating selection works
- [ ] Feedback textarea validates
- [ ] Submit works
- [ ] Success notification appears

### 8. Theme Toggle Testing
- [ ] Theme toggle button visible
- [ ] Click toggles between light/dark
- [ ] Colors change appropriately
- [ ] Logo changes (light/dark versions)
- [ ] Icons update
- [ ] Preference persists on refresh
- [ ] Works on all pages

### 9. Search Functionality Testing
- [ ] Search icon in navigation
- [ ] Click opens search modal
- [ ] Type to search products
- [ ] Results update in real-time
- [ ] Click result goes to product
- [ ] ESC key closes search
- [ ] Click outside closes search
- [ ] "X" button closes search

### 10. Chatbot Testing
- [ ] Chatbot icon visible (bottom right)
- [ ] Click opens chat window
- [ ] Welcome message appears
- [ ] Quick action buttons work
- [ ] Type message and send
- [ ] Bot responds appropriately
- [ ] Try common queries:
  - "shipping" - Shipping info
  - "branches" - Branch locations
  - "products" - Product categories
  - "contact" - Contact information
  - "help" - Help options
- [ ] Close button works

### 11. Responsive Design Testing
**Mobile View (< 576px)**
- [ ] Navigation collapses to hamburger
- [ ] Products show 1 per row
- [ ] Text is readable
- [ ] Buttons are clickable
- [ ] Forms are usable
- [ ] Cart UI is functional

**Tablet View (768px)**
- [ ] Products show 2 per row
- [ ] Navigation partially collapsed
- [ ] Good spacing
- [ ] Touch-friendly

**Desktop View (992px+)**
- [ ] Products show 3-4 per row
- [ ] Full navigation visible
- [ ] Optimal layout
- [ ] Hover effects work

### 12. Navigation Testing
Test all links on all pages:
- [ ] Logo → Home
- [ ] Home link → index.html
- [ ] Products link → products.html
- [ ] About link → about.html
- [ ] Contact link → contact.html
- [ ] Cart icon → cart.html
- [ ] Footer links work
- [ ] Policy pages accessible

### 13. Accessibility Testing
- [ ] Tab through navigation works
- [ ] Enter key activates buttons
- [ ] Focus states are visible
- [ ] Screen reader labels present (check with screen reader if available)
- [ ] Images have alt text
- [ ] Forms have labels
- [ ] Color contrast is sufficient

### 14. Performance Testing
- [ ] Pages load quickly
- [ ] No console errors (Open DevTools → Console)
- [ ] No 404 errors (check Network tab)
- [ ] Images load properly
- [ ] Animations are smooth
- [ ] No memory leaks (check long usage)

---

## 🌐 Browser Testing

### Test in Multiple Browsers
- [ ] **Chrome** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Edge** (latest)

### How to Test
1. Open `index.html` in each browser
2. Navigate through all pages
3. Test key features (cart, forms, search)
4. Check console for errors
5. Verify responsive design

---

## 🔍 Console Testing

### Check for Errors
1. **Open Developer Tools:**
   - Chrome/Edge: Press `F12` or `Ctrl+Shift+I`
   - Firefox: Press `F12` or `Ctrl+Shift+K`
   - Safari: `Cmd+Option+I` (enable in Preferences first)

2. **Go to Console tab**
   
3. **Look for:**
   - ❌ Red errors (should be NONE)
   - ⚠️ Yellow warnings (minimal if any)
   - ✅ Blue info messages (expected)

4. **Common Expected Messages:**
   - Theme loaded
   - Products loaded
   - Cart initialized
   - Chatbot ready

---

## 📱 Mobile Device Testing

### Using Browser DevTools
1. Open DevTools (`F12`)
2. Click device toolbar icon (or `Ctrl+Shift+M`)
3. Select device:
   - iPhone 12 Pro
   - iPad
   - Samsung Galaxy S20
   - Custom dimensions

4. Test all features in mobile view

### Using Real Devices (Optional)
1. Start local server (see Method 2 above)
2. Find your computer's local IP:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
3. On mobile browser, navigate to: `http://[YOUR-IP]:8000`

---

## 🐛 Troubleshooting

### Issue: Products Not Loading
**Solution:** 
- Check `data/products.json` exists
- Verify JSON is valid (no syntax errors)
- Use local server instead of file:// protocol

### Issue: Cart Not Persisting
**Solution:**
- Ensure localStorage is enabled in browser
- Check browser privacy settings
- Clear browser cache and try again

### Issue: Dark Mode Not Working
**Solution:**
- Clear localStorage: `localStorage.clear()`
- Refresh page
- Try toggling theme again

### Issue: Images Not Loading
**Solution:**
- Check `assets/images/` folder exists
- Verify image paths in products.json
- Ensure image files are present

### Issue: Chatbot Not Responding
**Solution:**
- Check console for JavaScript errors
- Verify `js/chatbot.js` is loaded
- Clear cache and reload

### Issue: Forms Not Submitting
**Solution:**
- Check console for validation errors
- Ensure all required fields are filled
- Verify email/phone formats are correct

---

## 📊 Feature Testing Guide

### Shopping Cart Workflow
1. Go to Products page
2. Click "Add to Cart" on any product
3. Verify toast notification appears
4. Check cart icon badge increases
5. Click cart icon
6. Verify product appears in cart
7. Adjust quantity (+/-)
8. Remove an item
9. Click "Proceed to Checkout"
10. Fill checkout form
11. Place order
12. Verify order confirmation

### Search Workflow
1. Click search icon in navigation
2. Type "wooden" or any product name
3. Verify results appear instantly
4. Click a result
5. Verify redirects to product details

### Filter Workflow
1. Go to Products page
2. Select a category (e.g., "Wooden Crafts")
3. Adjust price range slider
4. Select minimum rating
5. Toggle "In Stock Only"
6. Verify products filter accordingly
7. Clear filters with "Clear Filters" button

### Theme Toggle Workflow
1. Locate theme toggle button (moon/sun icon)
2. Click to switch to dark mode
3. Verify colors change
4. Refresh page
5. Verify dark mode persists
6. Click again to return to light mode

---

## ✅ Validation Tools (Optional)

### HTML Validation
1. Go to: https://validator.w3.org/
2. Upload HTML files or paste code
3. Check for errors/warnings

### CSS Validation
1. Go to: https://jigsaw.w3.org/css-validator/
2. Upload `style.css`
3. Check for errors

### JavaScript Validation (Lint)
Use online tools like JSHint:
1. Go to: https://jshint.com/
2. Paste JavaScript code
3. Check for issues

---

## 📁 File Structure Verification

Ensure all files are present:

```
loomlane/
├── index.html ✓
├── products.html ✓
├── product-details.html ✓
├── cart.html ✓
├── checkout.html ✓
├── about.html ✓
├── contact.html ✓
├── feedback.html ✓
├── privacy.html ✓
├── shipping.html ✓
├── returns.html ✓
├── assets/
│   ├── logo.svg ✓
│   ├── logo-light.svg ✓
│   ├── logo.png ✓
│   ├── hero-video.mp4 ✓
│   ├── icons/
│   │   ├── favicon.svg ✓
│   │   └── favicon.png ✓
│   └── images/
│       ├── products/ (20+ images) ✓
│       ├── categories/ ✓
│       ├── about-section.png ✓
│       ├── our-story.png ✓
│       └── our-mission.png ✓
├── css/
│   └── style.css ✓
├── js/
│   ├── main.js ✓
│   ├── cart.js ✓
│   ├── chatbot.js ✓
│   ├── theme.js ✓
│   ├── animations.js ✓
│   └── data.js ✓
├── data/
│   └── products.json ✓
├── README.md ✓
├── DOCUMENTATION.md ✓
├── SUBMISSION_CHECKLIST.md ✓
├── ANIMATIONS_GUIDE.md ✓
├── COLOR_PALETTE_GUIDE.md ✓
└── SETUP_GUIDE.md ✓
```

---

## 🎯 Assignment Evaluation Points

### What Evaluators Will Look For
1. **Functionality** (30%)
   - All features work correctly
   - No broken links
   - Forms validate properly
   - Shopping cart functions

2. **Design** (25%)
   - Professional appearance
   - Consistent styling
   - Good color choices
   - Proper spacing

3. **Responsive Design** (20%)
   - Works on mobile
   - Works on tablet
   - Works on desktop
   - Proper breakpoints

4. **Code Quality** (15%)
   - Clean, readable code
   - Proper comments
   - Organized structure
   - No errors in console

5. **Documentation** (10%)
   - README present
   - Code comments
   - Clear structure
   - Setup instructions

---

## 💡 Tips for Demonstration

If presenting to instructor:
1. Start with homepage, explain the theme
2. Show product catalog and filters
3. Demonstrate "add to cart" functionality
4. Show cart persistence (refresh page)
5. Walk through checkout process
6. Toggle dark/light mode
7. Show chatbot interaction
8. Test search functionality
9. Show responsive design (resize browser)
10. Open DevTools to show no errors

---

## 📞 Support

If you encounter issues:
1. Check console for error messages
2. Verify all files are present
3. Try different browser
4. Clear browser cache
5. Use local server instead of file://

---

## ✨ Final Notes

- **No installation required** - Just open HTML files
- **No database needed** - Uses localStorage and JSON
- **No server needed** - Pure client-side application
- **Works offline** - After initial load
- **Cross-platform** - Windows, Mac, Linux
- **Modern browsers** - Chrome, Firefox, Safari, Edge

---

**Project is ready for evaluation!** 🎉

**For questions or issues, refer to DOCUMENTATION.md for detailed information.**

---

© 2025 Loom & Lane | IT-1308 Web Application Development
