# Loom & Lane - Animations & Transitions Guide

## Overview
A comprehensive animation and transition system has been implemented across the entire website to enhance user experience. All animations are lightweight, responsive, and accessibility-friendly.

---

## 🎨 Features Implemented

### 1. **Smooth Page Transitions**
- **Page Load Animation**: Fade-in effect when pages load (0.5s)
- **Smooth Scrolling**: Native smooth scroll behavior for anchor links
- **Navigation Transitions**: Seamless transitions between sections

### 2. **Scroll-Based Animations**
Powered by **Intersection Observer API** for performance:

#### Animation Classes:
- `.fade-in` - Simple fade-in effect
- `.fade-in-up` - Fade and slide up from bottom
- `.fade-in-down` - Fade and slide down from top
- `.fade-in-left` - Fade and slide in from left
- `.fade-in-right` - Fade and slide in from right
- `.zoom-in` - Fade with zoom effect
- `.slide-in-up` - Slide up from bottom

#### Auto-Animated Elements:
- Product cards
- Feature cards
- Category cards
- Testimonial cards
- Branch cards
- Any element with `.animate-on-scroll` class

#### Stagger Effect:
Cards animate sequentially with 0.1s delays for a cascading effect.

### 3. **Button Animations**

#### Hover Effects:
- **Lift Effect**: Buttons move up 2px with enhanced shadow
- **Ripple Effect**: Water ripple animation on click
- **Color Transition**: Smooth background color changes
- **Scale Effect**: Slight scale down on active press

#### Button Types:
- `.btn-primary` - Primary action buttons
- `.btn-accent` - Accent/secondary buttons
- `.btn-outline` - Outlined buttons

### 4. **Link Animations**

#### Underline Effect:
- Links grow an animated underline on hover
- Smooth color transition to accent color
- 0.4s cubic-bezier animation

### 5. **Card Hover Effects**

#### 3D Tilt Effect:
- Subtle 3D perspective tilt following mouse movement
- 8px lift on hover
- Enhanced shadow on elevation
- Image zoom inside cards (scale 1.1)

#### Affected Cards:
- Product cards
- Feature cards
- Category cards
- Branch cards

### 6. **Icon Animations**

#### Standard Icons:
- Scale 1.2x and rotate 5° on hover
- Smooth 0.2s transition

#### Social Media Icons:
- Scale 1.3x with 360° rotation
- Bounce easing for playful effect

### 7. **Theme Toggle Animation**

#### Dark/Light Mode:
- **Toggle Button**: 180° rotation with scale on click
- **Content Transition**: 0.5s smooth fade between themes
- **All Elements**: Background, text, and border colors smoothly transition

### 8. **Navbar Scroll Effect**
- Adds shadow when scrolling past 50px
- Smooth background transition
- Maintains sticky positioning

### 9. **Form Input Animations**

#### Focus Effects:
- Accent color border on focus
- 3px soft glow shadow
- 2px lift animation
- Smooth 0.2s transition

#### Label Float:
- Labels move up and scale down when input is focused
- Returns to position when empty

### 10. **Badge Animations**
- Continuous pulse animation (2s infinite)
- Used for "NEW", "SALE", "HOT" badges

### 11. **Cart Badge Animation**
- Pulse animation when items are added
- Mutation Observer tracks changes
- 0.5s bounce effect

### 12. **Modal Animations**
- Zoom-in effect on open (0.3s)
- Fade-out on close (0.3s)
- Smooth backdrop transition

### 13. **Loading Skeleton**
- Shimmer effect for loading states
- Left-to-right gradient animation
- 2s infinite loop

### 14. **Mobile Menu**
- Smooth collapse/expand animation
- Height transition with smooth easing
- 0.5s duration

### 15. **Number Counter Animation**
- Counts up to target numbers
- Used for statistics
- Add `data-count="100"` attribute to any element

---

## 🎯 CSS Variables

### Transition Timings:
```css
--transition-fast: 0.2s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.5s ease;
--transition-smooth: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
--transition-bounce: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

## 📁 File Structure

### CSS Animations:
**File**: `css/style.css` (bottom section)
- Keyframe animations (@keyframes)
- Scroll animation classes
- Enhanced hover effects
- Theme transition styles
- Accessibility preferences

### JavaScript Animations:
**File**: `js/animations.js`
- Intersection Observer for scroll animations
- Navbar scroll effects
- Page transitions
- Ripple effects
- Card tilt effects
- Form animations
- Cart badge animations
- Number counters

---

## 🚀 Usage

### Add Scroll Animation to Elements:
```html
<div class="animate-on-scroll fade-in-up">
    Content here
</div>
```

### Add Number Counter:
```html
<span data-count="1000">0</span>
```

### Automatic Animations:
Most animations are applied automatically to existing elements:
- All cards (.product-card, .feature-card, etc.)
- All buttons (.btn, .btn-primary, etc.)
- All links (a tags)
- All form inputs
- Navbar on scroll
- Theme toggle

---

## ♿ Accessibility

### Reduced Motion Support:
Users with `prefers-reduced-motion` enabled will experience:
- Near-instant animations (0.01ms)
- No repeating animations
- Disabled smooth scrolling
- Instant transitions

This respects user preferences for reduced motion due to vestibular disorders.

---

## ⚡ Performance

### Optimizations:
1. **CSS Animations**: Hardware-accelerated transforms and opacity
2. **Intersection Observer**: Only animates visible elements
3. **Will-change**: Hints for GPU acceleration on cards
4. **Debouncing**: Scroll events are optimized
5. **Lazy Loading**: Images fade in only when loaded

### Performance Impact:
- **Minimal CPU/GPU usage**: CSS transforms are optimized
- **No layout thrashing**: Animations use transform/opacity
- **Smooth 60fps**: Tested on various devices
- **Lightweight**: ~500 lines of JavaScript, well-commented

---

## 🎨 Customization

### Modify Animation Speed:
Edit CSS variables in `:root`:
```css
:root {
  --transition-fast: 0.2s ease; /* Change timing here */
}
```

### Disable Specific Animations:
Comment out sections in `js/animations.js`:
```javascript
// initCardTilt(); // Disable card tilt effect
```

### Add Custom Animations:
1. Add keyframe in `css/style.css`:
```css
@keyframes myAnimation {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

2. Create class:
```css
.my-animation {
  animation: myAnimation 1s ease;
}
```

---

## 🐛 Troubleshooting

### Animations Not Working?
1. Ensure `animations.js` is loaded after other scripts
2. Check browser console for errors
3. Verify CSS file is properly linked
4. Clear browser cache

### Performance Issues?
1. Reduce animation duration in CSS variables
2. Disable 3D tilt effects for older devices
3. Remove parallax scrolling on mobile

### Conflicts with Other Scripts?
- animations.js waits for DOM to load
- No global variable pollution
- Uses modern JavaScript (ES6+)

---

## 📊 Browser Support

### Fully Supported:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Graceful Degradation:
- Older browsers: Animations simply don't run
- Functionality remains intact
- No errors thrown

---

## 📝 Implementation Notes

### Files Modified:
1. **css/style.css**: Added ~400 lines of animation styles
2. **js/animations.js**: Created new file (~500 lines)
3. **All HTML files**: Added `<script src="js/animations.js"></script>`

### No Changes To:
- Existing functionality
- Content or layouts
- Theme system
- Cart functionality
- Data structures

### Benefits:
✅ Enhanced user experience
✅ Modern, professional feel
✅ Smooth interactions
✅ Accessible and performant
✅ Easy to customize
✅ Production-ready

---

## 🎬 Animation Showcase

Visit any page to see:
1. **Homepage**: Hero parallax, staggered product cards
2. **Products Page**: Grid animation, card hover effects
3. **Product Details**: Smooth transitions, image zoom
4. **Cart/Checkout**: Form animations, button ripples
5. **About/Contact**: Scroll animations, content reveals
6. **Theme Toggle**: Smooth dark/light mode transition

---

## 💡 Tips

1. **Subtlety is Key**: Animations enhance, not distract
2. **Test Performance**: Always test on mobile devices
3. **Respect Preferences**: Honor reduced-motion settings
4. **Progressive Enhancement**: Site works without animations
5. **Monitor Impact**: Use browser DevTools to check performance

---

## 📞 Support

For questions or issues related to animations:
- Review browser console for errors
- Check `prefers-reduced-motion` settings
- Verify all script files are loading
- Test in different browsers

---

**Last Updated**: December 22, 2025
**Version**: 1.0.0
**Status**: Production Ready ✨
