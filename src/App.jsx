import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Components
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchBarModal from './components/SearchBarModal';
import SizeGuideModal from './components/SizeGuideModal';
import WhatsAppButton from './components/WhatsAppButton';
import ToastNotification from './components/ToastNotification';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Policies from './pages/Policies';
import NotFound from './pages/NotFound';

// Helper component to scroll window to top on route change
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, search]);

  return null;
}

function AppContent() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />
      
      {/* 1. Rotating Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Luxury Navigation */}
      <Navbar onOpenSearch={() => setSearchModalOpen(true)} />

      {/* 3. Main Route Views */}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* 4. Luxury Footer */}
      <Footer onOpenSizeGuide={() => setSizeGuideOpen(true)} />

      {/* 5. Global Interactive Overlays */}
      <CartDrawer />

      <SearchBarModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      <WhatsAppButton />

      <ToastNotification />
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
