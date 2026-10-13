# RYVA COLLECTION — Premium Fashion & Footwear Storefront

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3.svg)](https://getbootstrap.com/)
[![Instagram](https://img.shields.io/badge/Instagram-%40ryvacollection01-E4405F.svg)](https://instagram.com/ryvacollection01/)

An editorial, high-aesthetic e-commerce boutique developed for **RYVA COLLECTION**, a clothing and artisanal footwear label promoted through Instagram ([@ryvacollection01](https://instagram.com/ryvacollection01/)).

Designed with an art-directed luxury aesthetic inspired by high-fashion storefronts, featuring bespoke typography, generous whitespace, smooth transitions, mobile responsiveness, persistent shopping cart/wishlist, and interactive checkout simulation.

---

## 1. Brand Identity & Design System

### Luxury Color Palette
| Color | Hex | Role |
| :--- | :--- | :--- |
| **Obsidian Black** | `#151515` | Primary background, typography, luxury buttons |
| **Ivory** | `#F5F0E8` | Editorial soft backgrounds, accents, card backdrops |
| **Champagne Gold** | `#B59A70` | Monograms, divider lines, hover accents, badges |
| **Stone Grey** | `#77736E` | Secondary captions, subheadings, borders |
| **Pure White** | `#FFFFFF` | Product card surfaces, modals |

### Typography
- **Headings & Monograms:** `Cinzel` & `Cormorant Garamond` (Google Fonts luxury serifs)
- **Body & Navigation:** `Montserrat` (Clean, geometric, high-legibility sans-serif)

### Original Logo Assets
- `public/images/ryva-logo.svg` — Primary vector horizontal wordmark with interlocking R-V monogram crest.
- `public/images/ryva-logo-dark.svg` — Obsidian Black & Champagne Gold logo for light surfaces.
- `public/images/ryva-logo-light.svg` — Ivory & Champagne Gold logo for dark headers and footer.
- `public/images/ryva-monogram.svg` — Geometric interlocking R-V monogram crest.
- `public/favicon.svg` — High-definition favicon with R-V monogram.

---

## 2. Technology Stack

- **Core Framework:** React 19 + Vite 8
- **Language:** JavaScript (ES6+ Modules)
- **Styling & Responsive Grid:** Bootstrap 5.3 + Vanilla Custom CSS (`src/styles/global.css`, `src/styles/components.css`)
- **Navigation:** React Router DOM v7 (Full client-side SPA routing with instant ScrollToTop)
- **State Management:** React Context API (`CartContext.jsx`, `WishlistContext.jsx`)
- **Persistence:** LocalStorage persistence for both Shopping Bag and Wishlist
- **Celebration Effects:** Canvas Confetti for checkout completion
- **Icons:** SVG vector icons & Lucide React

---

## 3. Project Structure

```
RYVA/
├── public/
│   ├── favicon.svg             # Interlocking R-V favicon
│   ├── robots.txt              # Production crawler instructions
│   ├── sitemap.xml             # Search engine sitemap
│   └── images/
│       ├── ryva-logo.svg       # Default luxury logo
│       ├── ryva-logo-dark.svg  # Dark logo for light surfaces
│       ├── ryva-logo-light.svg # Light logo for dark footers
│       └── ryva-monogram.svg   # Interlocking R-V monogram crest
├── src/
│   ├── config/
│   │   └── brand.js            # Central brand info, links, placeholders, & shipping rules
│   ├── data/
│   │   ├── categories.js       # Curated boutique categories
│   │   └── products.js         # Curated demonstration product catalogue
│   ├── context/
│   │   ├── CartContext.jsx     # Bag state, quantities, subtotals, free shipping progress
│   │   └── WishlistContext.jsx # Wishlist persistence & toggle helpers
│   ├── components/
│   │   ├── AnnouncementBar.jsx # Rotating promotional ticker
│   │   ├── Navbar.jsx          # Sticky header, badges, mobile drawer navigation
│   │   ├── HeroSection.jsx     # Full-width editorial hero with CTA buttons
│   │   ├── CategoryCard.jsx    # Editorial category card with hover zoom
│   │   ├── CategorySection.jsx # Category grid showcase
│   │   ├── ProductCard.jsx     # 3:4 aspect ratio luxury product cards
│   │   ├── QuickViewModal.jsx  # Interactive quick view & size selector
│   │   ├── CartDrawer.jsx      # Slide-out interactive shopping bag drawer
│   │   ├── SearchBarModal.jsx  # Live search overlay with trending tags
│   │   ├── SizeGuideModal.jsx  # Clothing & footwear conversion tables
│   │   ├── FeaturedBanner.jsx  # Seasonal editorial capsule banner
│   │   ├── BrandStorySection.jsx # "MORE THAN WHAT YOU WEAR" manifesto
│   │   ├── InstagramSection.jsx  # Curated 6-grid showcase linking to @ryvacollection01
│   │   ├── Newsletter.jsx      # Validated subscription form with demo notice
│   │   ├── Footer.jsx          # Brand links, showroom contact, policies, copyright
│   │   ├── WhatsAppButton.jsx  # Floating concierge & order message encoder
│   │   ├── InstagramIcon.jsx   # Standalone clean SVG Instagram icon
│   │   └── ToastNotification.jsx # Feedback toasts for bag actions
│   ├── pages/
│   │   ├── Home.jsx            # Full editorial homepage
│   │   ├── Shop.jsx            # Product catalogue with search, filter, and sorting
│   │   ├── ProductDetails.jsx  # Product page with gallery, size validation, & WhatsApp enquiry
│   │   ├── Cart.jsx            # Full cart page with promo code & WhatsApp order flow
│   │   ├── Wishlist.jsx        # Saved pieces with move-to-bag capability
│   │   ├── Checkout.jsx        # Validated checkout with demo order confirmation & confetti
│   │   ├── About.jsx           # Editorial brand manifesto & design pillars
│   │   ├── Contact.jsx         # Concierge form, studio contact, & FAQs
│   │   ├── Policies.jsx        # Tabbed shipping, return, privacy, & terms policies
│   │   └── NotFound.jsx        # Luxury 404 page
│   ├── styles/
│   │   ├── global.css          # Color tokens, buttons, typography, scrollbar
│   │   └── components.css      # Component layout styles
│   ├── App.jsx                 # Route definitions & layout wrappers
│   ├── index.css               # Main styling pipeline
│   └── main.jsx                # React root mount
├── .env.example                # Environment variables template
├── .gitignore                  # Git exclusions
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation
```

---

## 4. Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm (v9.x or higher)

### Installation
Clone or navigate to the repository directory and run:

```bash
npm install
```

### Development Server
Start the local development server:

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
To create an optimized production build:

```bash
npm run build
```
The output will be generated inside the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 5. Centralized Configuration Guide

All brand-specific information and product data are centralized to allow seamless updates:

### Updating Brand Details & Contact Info
Open `src/config/brand.js`:
- **Brand Name & Tagline:** `brandConfig.name`, `brandConfig.tagline`
- **Instagram Link & Handle:** `brandConfig.instagram.url`, `brandConfig.instagram.handle`
- **WhatsApp Concierge Number:** Update `brandConfig.whatsapp.phoneNumber` with your international format number (e.g., `"919876543210"`) and set `isPlaceholder: false`.
- **Showroom Address & Hours:** `brandConfig.contact.address`, `brandConfig.contact.businessHours`
- **Shipping Thresholds:** `brandConfig.shipping.freeShippingThreshold` (defaults to ₹2,999)

### Updating Inventory & Catalog
Open `src/data/products.js`:
- Each product item contains:
  - `id`, `slug`, `name`, `category`, `categoryName`, `subcategory`, `gender`
  - `price`, `originalPrice` (for strike-through demo discounts)
  - `images` (array of high-resolution product photography URLs)
  - `colors` (array of objects with `name` and `hex`)
  - `sizes` (e.g. `['S', 'M', 'L', 'XL']` or `['UK 7', 'UK 8', 'UK 9']`)
  - `inStock`, `stockCount`
  - `badge` (`'NEW'`, `'BESTSELLER'`, `'LIMITED'`, `'EXCLUSIVE'`)
  - `description`, `details` (composition, care notes)

---

## 6. Demonstration Features & Production Requirements

This project is delivered as a **production-ready frontend experience** with honest demonstration handling for services requiring server-side backends.

### List of Demo-Only Features:
1. **Demo Checkout (`/checkout`):**
   - Validates client details, addresses, and PIN codes.
   - Generates a simulated order confirmation ID (e.g. `RYVA-84920`) with confetti animation.
   - *Production integration required:* A payment gateway like Razorpay or Stripe, and an order creation API endpoint.
2. **Demo Promo Code:**
   - Entering `RYVA10` grants 10% demo discount; `RYVAVIP` grants 15%.
   - *Production integration required:* Promotion/coupon validation microservice.
3. **Contact & Newsletter Forms:**
   - Both forms perform full client-side validation and display honest submission notices.
   - *Production integration required:* Email transactional service (SendGrid, Resend, or AWS SES) and CRM integration.
4. **WhatsApp Integration:**
   - Generates pre-formatted click-to-chat messages with order items, sizes, quantities, and subtotal.
   - *Production integration required:* Provide a verified WhatsApp Business API number in `src/config/brand.js`.

---

## 7. Official Instagram Channel
Connect with the brand directly on Instagram:  
**[@ryvacollection01](https://instagram.com/ryvacollection01/)**

---

© 2026 RYVA COLLECTION. All rights reserved.
