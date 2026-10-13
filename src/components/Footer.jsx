import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { brandConfig } from '../config/brand';

const Footer = ({ onOpenSizeGuide }) => {
  return (
    <footer className="ryva-footer">
      <div className="container">

        {/* Main Footer Row */}
        <div className="row g-4 g-lg-5">

          {/* Column 1: Brand & Logo */}
          <div className="col-12 col-md-6 col-lg-4">
            <Link to="/" className="d-inline-block mb-3" aria-label="RYVA Collection">
              <img
                src={brandConfig.logos.light}
                alt="RYVA COLLECTION"
                style={{ height: '38px' }}
              />
            </Link>
            <p className="text-white-50 small mb-4" style={{ maxWidth: '340px', lineHeight: 1.7 }}>
              {brandConfig.tagline} Handcrafted luxury apparel, tailored silhouettes, and artisanal footwear designed with unwavering confidence.
            </p>

            <div className="d-flex align-items-center gap-3">
              <a
                href={brandConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center text-white"
                style={{ width: '38px', height: '38px', borderColor: 'rgba(255,255,255,0.2)' }}
                aria-label="Follow RYVA Collection on Instagram"
              >
                <InstagramIcon size={17} />
              </a>

              <a
                href={`mailto:${brandConfig.contact.email}`}
                className="btn btn-outline-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center text-white"
                style={{ width: '38px', height: '38px', borderColor: 'rgba(255,255,255,0.2)' }}
                aria-label="Email Concierge"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Column 2: Boutique Shop Links */}
          <div className="col-6 col-md-3 col-lg-2">
            <h5>Boutique</h5>
            <Link to="/shop" className="ryva-footer-link">All Products</Link>
            <Link to="/shop?category=mens-clothing" className="ryva-footer-link">Men's Clothing</Link>
            <Link to="/shop?category=womens-clothing" className="ryva-footer-link">Women's Clothing</Link>
            <Link to="/shop?category=footwear" className="ryva-footer-link">Footwear &amp; Soles</Link>
            <Link to="/shop?filter=new" className="ryva-footer-link">New Arrivals</Link>
            <Link to="/shop?filter=bestseller" className="ryva-footer-link">Best Sellers</Link>
          </div>

          {/* Column 3: Client Concierge */}
          <div className="col-6 col-md-3 col-lg-3">
            <h5>Concierge</h5>
            <Link to="/about" className="ryva-footer-link">The RYVA Atelier</Link>
            <Link to="/contact" className="ryva-footer-link">Contact Concierge</Link>
            {onOpenSizeGuide ? (
              <button
                type="button"
                className="btn btn-link p-0 text-start ryva-footer-link"
                onClick={onOpenSizeGuide}
              >
                Atelier Size Guide
              </button>
            ) : (
              <Link to="/policies" className="ryva-footer-link">Size Guide</Link>
            )}
            <Link to="/policies" className="ryva-footer-link">Shipping &amp; Delivery</Link>
            <Link to="/policies" className="ryva-footer-link">Returns &amp; Exchanges</Link>
            <Link to="/policies" className="ryva-footer-link">Privacy Policy</Link>
          </div>

          {/* Column 4: Showroom & Studio Contact */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5>Studio Showroom</h5>
            <div className="d-flex align-items-start gap-2 mb-2 text-white-50 small">
              <MapPin size={16} className="text-warning flex-shrink-0 mt-1" />
              <span>
                {brandConfig.contact.address.line1}, {brandConfig.contact.address.city} {brandConfig.contact.address.postalCode}
              </span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-2 text-white-50 small">
              <Phone size={16} className="text-warning flex-shrink-0" />
              <span>{brandConfig.contact.supportPhone}</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-3 text-white-50 small">
              <Mail size={16} className="text-warning flex-shrink-0" />
              <span>{brandConfig.contact.email}</span>
            </div>

            <div className="p-3 border border-secondary border-opacity-25 bg-black bg-opacity-40">
              <span className="small text-white-50 d-block mb-1" style={{ fontSize: '0.72rem' }}>
                DIRECT INSTAGRAM ORDERS:
              </span>
              <a
                href={brandConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="d-inline-flex align-items-center gap-1 text-white small fw-bold"
              >
                <span>{brandConfig.instagram.handle}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Row */}
        <div className="ryva-footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div>
            &copy; {new Date().getFullYear()} RYVA COLLECTION. All rights reserved.<br />
            Made By Nilesh
          </div>

          <div className="d-flex flex-wrap align-items-center gap-3 small">
            <Link to="/policies" className="text-secondary text-decoration-none hover-light">Privacy Policy</Link>
            <span>•</span>
            <Link to="/policies" className="text-secondary text-decoration-none hover-light">Terms of Service</Link>
            <span>•</span>
            <Link to="/policies" className="text-secondary text-decoration-none hover-light">Return Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
