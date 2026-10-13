import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { brandConfig } from '../config/brand';

const Navbar = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, openCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <>
      <header className={`ryva-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container-fluid px-lg-5 px-3">
          <div className="d-flex align-items-center justify-content-between">
            
            {/* Left: Mobile Hamburger Toggle */}
            <div className="d-flex align-items-center d-lg-none">
              <button
                type="button"
                className="ryva-nav-icon-btn me-2"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
              >
                <Menu size={24} />
              </button>
              <button
                type="button"
                className="ryva-nav-icon-btn"
                onClick={onOpenSearch}
                aria-label="Search catalogue"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Desktop Left Navigation Links */}
            <nav className="d-none d-lg-flex align-items-center gap-1" aria-label="Main Navigation">
              <NavLink to="/" className={({ isActive }) => `ryva-nav-link ${isActive ? 'active' : ''}`} end>
                Home
              </NavLink>
              <NavLink to="/shop" className={({ isActive }) => `ryva-nav-link ${isActive ? 'active' : ''}`} end>
                Shop All
              </NavLink>
              <NavLink to="/shop?category=mens-clothing" className="ryva-nav-link">
                Men
              </NavLink>
              <NavLink to="/shop?category=womens-clothing" className="ryva-nav-link">
                Women
              </NavLink>
              <NavLink to="/shop?category=footwear" className="ryva-nav-link">
                Footwear
              </NavLink>
              <NavLink to="/shop?filter=new" className="ryva-nav-link">
                New Arrivals
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `ryva-nav-link ${isActive ? 'active' : ''}`}>
                About
              </NavLink>
            </nav>

            {/* Center: Brand Logo */}
            <Link to="/" className="d-flex align-items-center justify-content-center text-center mx-auto mx-lg-0" aria-label="RYVA Collection Home">
              <img
                src={brandConfig.logos.dark}
                alt="RYVA COLLECTION"
                className="ryva-brand-logo"
                height="42"
              />
            </Link>

            {/* Right: Actions (Search, Wishlist, Bag, Instagram) */}
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="ryva-nav-icon-btn d-none d-lg-flex"
                onClick={onOpenSearch}
                aria-label="Search"
                title="Search products"
              >
                <Search size={20} />
              </button>

              <Link
                to="/wishlist"
                className="ryva-nav-icon-btn"
                aria-label="Wishlist"
                title="View Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="ryva-badge-counter">{wishlistCount}</span>
                )}
              </Link>

              <button
                type="button"
                className="ryva-nav-icon-btn"
                onClick={openCartDrawer}
                aria-label="Shopping Bag"
                title="View Shopping Bag"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="ryva-badge-counter">{cartCount}</span>
                )}
              </button>

              <a
                href={brandConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ryva-nav-icon-btn d-none d-xl-flex text-muted"
                aria-label="RYVA on Instagram"
                title="Follow @ryvacollection01"
              >
                <InstagramIcon size={19} />
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay Menu */}
      <div className={`ryva-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
          <img
            src={brandConfig.logos.dark}
            alt="RYVA COLLECTION"
            style={{ height: '32px' }}
          />
          <button
            type="button"
            className="btn btn-link text-dark p-0"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>

        <div className="mb-4">
          <button
            type="button"
            className="w-100 btn-ryva-outline py-2 d-flex align-items-center justify-content-center gap-2 mb-3"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
          >
            <Search size={16} />
            <span>Search RYVA Collection</span>
          </button>
        </div>

        <nav className="d-flex flex-column gap-2 mb-4">
          <Link to="/" className="ryva-mobile-nav-link">Home</Link>
          <Link to="/shop" className="ryva-mobile-nav-link">Shop Catalogue</Link>
          <Link to="/shop?category=mens-clothing" className="ryva-mobile-nav-link">Men's Clothing</Link>
          <Link to="/shop?category=womens-clothing" className="ryva-mobile-nav-link">Women's Clothing</Link>
          <Link to="/shop?category=footwear" className="ryva-mobile-nav-link">Footwear & Soles</Link>
          <Link to="/shop?filter=new" className="ryva-mobile-nav-link">New Arrivals</Link>
          <Link to="/about" className="ryva-mobile-nav-link">About RYVA</Link>
          <Link to="/contact" className="ryva-mobile-nav-link">Concierge & Contact</Link>
        </nav>

        <div className="mt-auto pt-4 border-top">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="small text-muted">Instagram:</span>
            <a
              href={brandConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-1 text-dark fw-bold small"
            >
              <InstagramIcon size={16} />
              <span>{brandConfig.instagram.handle}</span>
            </a>
          </div>
          <Link
            to="/shop"
            className="btn-ryva-dark w-100 py-3 text-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Explore All Pieces</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
