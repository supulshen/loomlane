# Loom & Lane - E-Commerce Website
## Web Application Development - IT-1308
**Assignment Submission**

---

## 📋 Project Overview

**Loom & Lane** is a fully functional, production-ready e-commerce website for a Sri Lankan lifestyle brand specializing in handcrafted traditional products. The website showcases artisan products including wooden crafts, porcelain items, flower arrangements, and home décor, providing customers with an elegant and seamless shopping experience.

### Student Information
- **Course:** IT-1308 Web Application Development
- **Student Name:** R.A.S.D.Ranasinghe
- **Student ID:** CL/BSCITCS/01/04
- **Submission Date:** January 2026

---

## 🎯 Project Objectives

1. Create a responsive, user-friendly e-commerce platform
2. Implement dynamic product catalog with filtering and search
3. Develop shopping cart functionality with localStorage persistence
4. Integrate form validation for checkout and contact forms
5. Build an intelligent chatbot for customer support
6. Ensure accessibility and cross-browser compatibility
7. Apply modern web design principles and animations

---

## ✨ Key Features

### 🛍️ E-Commerce Functionality
- **Product Catalog:** Dynamic product loading from JSON with 20+ products
- **Product Filtering:** Filter by category, price range, rating, and availability
- **Search Functionality:** Real-time search across products and categories
- **Product Details:** Comprehensive product pages with images, descriptions, ratings
- **Shopping Cart:** Add/remove items, adjust quantities, persistent storage
- **Checkout Process:** Multi-step checkout with form validation
- **Order Summary:** Real-time calculation of subtotal, shipping, and totals

### 🎨 Design & User Experience
- **Dark/Light Mode:** Theme toggle with localStorage persistence
- **Responsive Design:** Mobile-first approach, works on all devices
- **Smooth Animations:** Page transitions, hover effects, scroll animations
- **Glassmorphism UI:** Modern design with frosted glass effects
- **Toast Notifications:** User feedback for actions (add to cart, etc.)
- **Loading States:** Skeleton loaders for better UX

### 🤖 Intelligent Chatbot
- **Rule-Based AI:** Context-aware responses to customer queries
- **Quick Actions:** Shipping info, branch locations, product links
- **Conversation History:** Maintains chat context
- **Animated UI:** Smooth chat window transitions

### 📱 Pages Implemented

1. **index.html** - Landing page with hero section and featured products
2. **products.html** - Complete product catalog with filters and sorting
3. **product-details.html** - Detailed product view with related products
4. **cart.html** - Shopping cart management
5. **checkout.html** - Multi-step checkout with order confirmation
6. **about.html** - Company story and mission
7. **contact.html** - Contact form with validation and branch locations
8. **feedback.html** - Customer feedback submission form
9. **privacy.html** - Privacy policy
10. **shipping.html** - Shipping information and policies
11. **returns.html** - Return and refund policies

### 🔐 Form Validation
- **HTML5 Validation:** Native browser validation for all inputs
- **JavaScript Validation:** Custom validation logic for complex rules
- **Real-time Feedback:** Immediate error messages and success states
- **Email Validation:** Proper email format checking
- **Phone Validation:** Sri Lankan phone number format
- **Required Fields:** Clear indication of mandatory fields

---

## 🛠️ Technologies Used

### Frontend Technologies
- **HTML5** - Semantic markup and modern elements
- **CSS3** - Custom properties, flexbox, grid, animations
- **JavaScript (ES6+)** - Modern syntax, modules, async/await
- **Bootstrap 5.3.2** - Responsive grid and components
- **Font Awesome 6.5.1** - Icon library

### Data & Storage
- **JSON** - Product data structure
- **localStorage API** - Cart persistence, theme preference
- **Fetch API** - Dynamic data loading

### Design Patterns
- **Mobile-First Design** - Progressive enhancement approach
- **Component-Based Structure** - Reusable UI components
- **MVC Pattern** - Separation of concerns in JavaScript
- **Progressive Enhancement** - Works without JavaScript

---

## 📂 Project Structure

```
loomlane/
├── index.html                  # Landing page
├── products.html               # Product catalog
├── product-details.html        # Product detail page
├── cart.html                   # Shopping cart
├── checkout.html               # Checkout process
├── about.html                  # About us page
├── contact.html                # Contact page
├── feedback.html               # Feedback form
├── privacy.html                # Privacy policy
├── shipping.html               # Shipping information
├── returns.html                # Returns policy
├── README.md                   # Project readme
├── DOCUMENTATION.md            # This file
├── ANIMATIONS_GUIDE.md         # Animation documentation
├── COLOR_PALETTE_GUIDE.md      # Design system guide
│
├── assets/                     # Static assets
│   ├── icons/                  # Favicon files
│   ├── images/                 # Product and UI images
│   │   ├── categories/         # Category images
│   │   └── products/           # Product images
│   ├── logo.svg                # Main logo
│   ├── logo-light.svg          # Light mode logo
│   ├── logo.png                # PNG logo
│   └── hero-video.mp4          # Hero section video
│
├── css/
│   └── style.css               # Main stylesheet (2000+ lines)
│
├── js/
│   ├── main.js                 # Core functionality
│   ├── cart.js                 # Shopping cart logic
│   ├── theme.js                # Dark/light mode toggle
│   ├── chatbot.js              # Chatbot implementation
│   ├── animations.js           # Animation controls
│   └── data.js                 # Data loading utilities
│
└── data/
    └── products.json           # Product database (20+ products)
```

---

## 🎨 Design System

### Color Palette
- **Primary:** #A67C58 (Warm brown)
- **Accent:** #C89B3C (Gold)
- **Text:** #2D2A27 (Dark brown)
- **Background:** #F8F6F3 (Cream)
- **Dark Mode Background:** #1E1C1A

### Typography
- **Headings:** 'Playfair Display', serif
- **Body:** 'Inter', sans-serif
- **Responsive:** Fluid typography using clamp()

### Spacing System
- Based on 8px grid
- Custom CSS properties for consistency
- Responsive spacing adjustments

---

## 🚀 Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required
- Works offline (after initial load)

### Installation

1. **Download/Clone the Project**
   ```bash
   git clone <repository-url>
   cd loomlane
   ```

2. **Open in Browser**
   - Simply open `index.html` in your browser
   - Or use a local server (optional):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```

3. **View the Website**
   - Navigate to `http://localhost:8000` (if using server)
   - Or open the `index.html` file directly

### No Build Process Required
- Pure HTML/CSS/JavaScript
- No npm install or package management
- Works out of the box

---

## 📱 Responsive Breakpoints

- **Mobile:** < 576px (1 column layout)
- **Tablet:** 768px (2 column layout)
- **Desktop:** 992px+ (3-4 column layout)
- **Large Desktop:** 1200px+ (Optimized spacing)

---

## ♿ Accessibility Features

- **Semantic HTML5:** Proper use of header, nav, main, article, footer
- **ARIA Labels:** Screen reader support for all interactive elements
- **Keyboard Navigation:** Full keyboard accessibility
- **Alt Text:** Descriptive alt text for all images
- **Color Contrast:** WCAG AA compliant contrast ratios
- **Focus States:** Visible focus indicators
- **Form Labels:** Explicit labels for all form inputs

---

## 🧪 Testing Checklist

### ✅ Functionality Testing
- [x] Product catalog loads correctly
- [x] Search and filter functionality works
- [x] Add to cart functionality
- [x] Cart quantity adjustments
- [x] Cart persistence across pages
- [x] Checkout form validation
- [x] Contact form validation
- [x] Feedback form validation
- [x] Dark/light mode toggle
- [x] Chatbot responses
- [x] Navigation links work
- [x] Responsive design on all devices

### ✅ Browser Compatibility
- [x] Google Chrome (latest)
- [x] Mozilla Firefox (latest)
- [x] Safari (latest)
- [x] Microsoft Edge (latest)

### ✅ Performance
- [x] Fast page load times
- [x] Optimized images
- [x] Efficient JavaScript
- [x] No console errors

---

## 💡 Key Learning Outcomes

### Technical Skills Developed
1. **HTML5 Semantic Structure** - Proper use of modern HTML elements
2. **CSS3 Advanced Techniques** - Grid, flexbox, animations, custom properties
3. **JavaScript ES6+** - Arrow functions, destructuring, template literals
4. **localStorage API** - Client-side data persistence
5. **JSON Data Handling** - Fetch API and data manipulation
6. **Form Validation** - Both HTML5 and JavaScript validation
7. **Responsive Design** - Mobile-first, flexible layouts
8. **Accessibility** - WCAG guidelines and ARIA attributes

### Design Principles Applied
1. **User-Centered Design** - Intuitive navigation and clear CTAs
2. **Visual Hierarchy** - Typography and spacing for readability
3. **Consistency** - Uniform design language across pages
4. **Feedback** - Toast notifications and loading states
5. **Progressive Enhancement** - Works without JavaScript

---

## 🔧 JavaScript Modules

### main.js (798 lines)
- Product loading and rendering
- Search and filter functionality
- Global search modal
- Star rating generation
- Toast notifications
- Utility functions

### cart.js (450+ lines)
- Add/remove items from cart
- Update quantities
- Calculate totals
- localStorage persistence
- Cart UI updates

### chatbot.js (700 lines)
- Rule-based chatbot logic
- Natural language processing
- Quick action buttons
- Conversation history
- Animated chat interface

### theme.js
- Dark/light mode toggle
- Theme persistence
- Smooth transitions
- Icon updates

### animations.js
- Scroll animations
- Intersection Observer
- Back to top button
- Page transition effects

---

## 📊 Product Data Structure

```json
{
  "id": 1,
  "name": "Product Name",
  "category": "Category",
  "price": 15800,
  "originalPrice": 18500,
  "description": "Product description",
  "image": "path/to/image.png",
  "rating": 4.9,
  "reviews": 62,
  "inStock": true,
  "featured": true,
  "badge": "sale",
  "colors": ["Natural Teak"],
  "sizes": ["Medium", "Large"],
  "material": "Material description",
  "variant": "Variant info"
}
```

---

## 🎓 Assignment Requirements Met

### ✅ Core Requirements
- [x] Minimum 5 interconnected web pages (11 pages delivered)
- [x] Responsive design for mobile, tablet, desktop
- [x] Form validation (contact, checkout, feedback forms)
- [x] Dynamic content loading with JavaScript
- [x] localStorage for data persistence
- [x] Professional UI/UX design
- [x] Cross-browser compatibility
- [x] Accessibility compliance
- [x] Clean, commented code
- [x] No errors in console

### ✅ Advanced Features
- [x] Intelligent chatbot
- [x] Dark/light mode toggle
- [x] Advanced filtering and search
- [x] Shopping cart with full CRUD operations
- [x] Smooth animations and transitions
- [x] Toast notification system
- [x] Glassmorphism design effects
- [x] Product rating system
- [x] Newsletter subscription
- [x] Branch location information

---

## 🐛 Known Limitations

1. **No Backend** - All data is client-side (no database)
2. **No Payment Integration** - Checkout is simulated
3. **No User Authentication** - No login/register functionality
4. **Static Product Images** - Images need to be present in assets folder
5. **No Email Sending** - Forms show success but don't send emails

---

## 🔮 Future Enhancements

1. Backend integration with Node.js/Express
2. Database integration (MongoDB/PostgreSQL)
3. User authentication and profiles
4. Payment gateway integration
5. Order tracking system
6. Product reviews and ratings submission
7. Wishlist functionality
8. Product comparison feature
9. Email notifications
10. Admin dashboard for product management

---

## 📝 Code Quality

### Best Practices Followed
- **Semantic HTML** - Meaningful element names
- **CSS Organization** - Logical grouping and comments
- **JavaScript Standards** - ESLint-compatible code
- **Naming Conventions** - camelCase, kebab-case appropriately
- **Code Comments** - Explanatory comments throughout
- **DRY Principle** - No code repetition
- **Modular Structure** - Separated concerns

---

## 📖 References

### Technologies
- [MDN Web Docs](https://developer.mozilla.org/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Font Awesome Icons](https://fontawesome.com/)

### Design Inspiration
- Modern e-commerce best practices
- Sri Lankan cultural elements
- Glassmorphism design trends

---

## 🙏 Acknowledgments

- **Course:** IT-1308 Web Application Development
- **Institution:** [Your Institution Name]
- **Instructor:** [Instructor Name]
- **Bootstrap Team:** For the excellent CSS framework
- **Font Awesome:** For comprehensive icon library

---

## 📄 License

This project is submitted as an academic assignment for IT-1308 Web Application Development course.

---

## 📞 Contact

For questions about this project:
- **Student:** [Your Name]
- **Email:** [Your Email]
- **Student ID:** [Your Student ID]

---

**© 2025 Loom & Lane | Academic Project for IT-1308**

*Crafted with ❤️ in Sri Lanka*
