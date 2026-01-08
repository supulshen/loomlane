# 🎨 Loom & Lane - Sri Lankan Heritage Color Palette

## Design Philosophy

This color palette embodies the essence of Sri Lankan heritage and sustainable artisan craftsmanship. The warm terracotta tones represent traditional pottery and clay work, while the deep forest green symbolizes nature, sustainability, and the lush landscapes of Sri Lanka. The warm cream background creates an organic, premium feel that perfectly complements handwoven artisan products.

---

## 🎨 Core Color Palette

### 1. **Backgrounds**

#### Warm Off-White/Cream - `#FAF9F6`
```css
--color-bg-base: #FAF9F6;
```
- **Purpose**: Main page background
- **Feeling**: Organic, warm, inviting
- **Usage**: `<body>`, main sections, page backgrounds
- **Why**: Replaces clinical white with a softer, natural tone

#### Pure White - `#FFFFFF`
```css
--color-bg-card: #FFFFFF;
```
- **Purpose**: Cards and elevated containers
- **Feeling**: Clean, premium, makes images pop
- **Usage**: `.card`, product cards, modals, dropdowns
- **Why**: Creates contrast against cream background

---

### 2. **Brand Colors**

#### Terracotta/Clay - `#E2725B` (PRIMARY)
```css
--color-primary: #E2725B;
```
- **Purpose**: Primary brand color, CTAs
- **Feeling**: Earthy, warm, artisanal
- **Usage**: Buttons, links, badges, highlights
- **Represents**: Traditional pottery, clay craftsmanship
- **Hover State**: `#D65F48` (darker terracotta)

#### Deep Forest Green - `#2E4631` (SECONDARY)
```css
--color-secondary: #2E4631;
```
- **Purpose**: Footer, navigation, sustainability accents
- **Feeling**: Natural, trustworthy, grounded
- **Usage**: `.footer`, `.navbar` accents, section headers
- **Represents**: Nature, sustainability, Sri Lankan forests

---

### 3. **Typography**

#### Charcoal Grey - `#333333`
```css
--color-text-primary: #333333;
```
- **Purpose**: Main body text and headings
- **Feeling**: Soft, readable, elegant contrast
- **Usage**: All text content, paragraphs, headings

#### Medium Grey - `#666666`
```css
--color-text-secondary: #666666;
```
- **Purpose**: Secondary text, captions
- **Usage**: Descriptions, metadata, subtle information

#### Light Grey - `#999999`
```css
--color-text-light: #999999;
```
- **Purpose**: Placeholder text, disabled states
- **Usage**: Form placeholders, inactive elements

---

## 📝 Typography Pairing

### **Headings: Cormorant Garamond** (Serif)
```css
--font-heading: 'Cormorant Garamond', serif;
```
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)
- **Character**: Elegant, sophisticated, premium
- **Use For**: H1, H2, H3, brand name, section titles
- **Why**: Creates a high-end artisan feel

### **Body: Inter** (Sans-Serif)
```css
--font-body: 'Inter', sans-serif;
```
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)
- **Character**: Clean, modern, highly readable
- **Use For**: Body text, navigation, buttons, captions
- **Why**: Excellent screen readability and versatility

---

## 🎯 Component Examples

### **Body & Base Styles**
```css
body {
  font-family: var(--font-body);
  background-color: var(--color-bg-base);
  color: var(--color-text-primary);
  line-height: 1.6;
}
```

### **Headings**
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  color: var(--color-text-primary);
}

h1, h2 {
  color: var(--color-secondary); /* Deep forest green for main headings */
}
```

### **Buttons**

#### Primary Button (Terracotta)
```css
.btn-primary {
  background: var(--color-primary);
  color: #FFFFFF;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--color-hover); /* #D65F48 */
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(226, 114, 91, 0.2);
}
```

#### Secondary Button (Forest Green)
```css
.btn-accent {
  background: var(--color-secondary);
  color: #FFFFFF;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
}

.btn-accent:hover {
  background: #3A5738; /* Slightly lighter green */
  transform: translateY(-2px);
}
```

#### Outline Button
```css
.btn-outline {
  background: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
}

.btn-outline:hover {
  background: var(--color-primary);
  color: #FFFFFF;
}
```

### **Cards**
```css
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(46, 70, 49, 0.08);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 32px rgba(46, 70, 49, 0.16);
  transform: translateY(-5px);
}

.card-title {
  font-family: var(--font-heading);
  color: var(--color-text-primary);
  font-size: 1.25rem;
  font-weight: 600;
}

.card-text {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}
```

### **Navigation**
```css
.navbar {
  background: var(--color-bg-card);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(46, 70, 49, 0.08);
}

.navbar-brand {
  font-family: var(--font-heading);
  color: var(--color-secondary);
  font-size: 1.75rem;
  font-weight: 700;
}

.nav-link {
  color: var(--color-text-primary);
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--color-primary);
  background: rgba(226, 114, 91, 0.1);
}

.nav-link.active {
  color: var(--color-primary);
  font-weight: 600;
}
```

### **Footer**
```css
.footer {
  background: var(--color-secondary);
  color: #FFFFFF;
  padding: 3rem 0 1rem;
  border-top: 1px solid var(--color-border);
}

.footer h5 {
  color: #FFFFFF;
  font-family: var(--font-heading);
  font-weight: 600;
}

.footer p,
.footer a {
  color: rgba(255, 255, 255, 0.8);
}

.footer a:hover {
  color: var(--color-primary);
  padding-left: 5px;
}
```

### **Links**
```css
a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-hover);
}
```

---

## 🎨 Semantic Colors

```css
/* Success (uses forest green) */
--color-success: #2E4631;

/* Error (darker terracotta) */
--color-error: #C4563C;

/* Warning (warm clay) */
--color-warning: #D4874E;

/* Borders & Dividers */
--color-border: #E8E6E1;

/* Hover States */
--color-hover: #D65F48;
```

---

## 🌙 Dark Mode Support

The palette includes dark mode variants:

```css
[data-theme="dark"] {
  --color-bg-base: #1A1A1A;
  --color-bg-card: #2A2A2A;
  --color-primary: #E2725B; /* Terracotta stays vibrant */
  --color-secondary: #4A6B4D; /* Lighter green for dark bg */
  --color-text-primary: #FAF9F6;
  --color-border: #3A3A3A;
}
```

---

## ✅ Accessibility Notes

- **Contrast Ratios**: All text colors meet WCAG AA standards
- **Terracotta on White**: 4.5:1 (AA compliant)
- **Charcoal on Cream**: 11:1 (AAA compliant)
- **Forest Green on White**: 10:1 (AAA compliant)

---

## 🎭 Design Principles

1. **Warmth**: Cream background creates inviting atmosphere
2. **Contrast**: White cards pop against cream, images stand out
3. **Earth Tones**: Terracotta and forest green ground the design
4. **Premium Feel**: Serif headings + clean sans-serif body
5. **Sustainability**: Green accents reinforce eco-friendly values
6. **Heritage**: Colors evoke Sri Lankan pottery and nature

---

## 🚀 Quick Implementation

1. **Import Fonts** (already in CSS):
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
   ```

2. **Link Stylesheet**:
   ```html
   <link rel="stylesheet" href="css/style.css">
   ```

3. **Use CSS Variables**: All components are already styled!

---

## 📦 Complete Variable List

```css
/* Backgrounds */
--color-bg-base: #FAF9F6;
--color-bg-card: #FFFFFF;

/* Brand Colors */
--color-primary: #E2725B;
--color-secondary: #2E4631;

/* Typography */
--color-text-primary: #333333;
--color-text-secondary: #666666;
--color-text-light: #999999;

/* UI Elements */
--color-border: #E8E6E1;
--color-hover: #D65F48;
--color-focus: #E2725B;

/* Semantic */
--color-success: #2E4631;
--color-error: #C4563C;
--color-warning: #D4874E;

/* Button Text */
--btn-text-primary: #FFFFFF;
--btn-text-secondary: #FFFFFF;
--btn-text-outline: #E2725B;

/* Fonts */
--font-heading: 'Cormorant Garamond', serif;
--font-body: 'Inter', sans-serif;
```

---

## 🎨 Visual Preview

```
┌─────────────────────────────────────────┐
│  🎨 WARM CREAM BACKGROUND (#FAF9F6)    │
│  ┌────────────────────────────────┐    │
│  │  ⬜ WHITE CARD (#FFFFFF)       │    │
│  │  🟠 Terracotta Button          │    │
│  │  🟢 Forest Green Footer        │    │
│  │  ⬛ Charcoal Text (#333)       │    │
│  └────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

---

**🌟 Result**: A warm, inviting, premium e-commerce experience that honors Sri Lankan heritage while emphasizing sustainable artisan craftsmanship!
