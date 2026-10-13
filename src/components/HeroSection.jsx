import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { brandConfig } from '../config/brand';

const HeroSection = () => {
  return (
    <section className="ryva-hero">
      {/* Background Editorial Image */}
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
        alt="RYVA Collection Editorial SS25"
        className="ryva-hero-bg"
        loading="eager"
      />
      <div className="ryva-hero-overlay"></div>

      {/* Hero Content */}
      <div className="container ryva-hero-content">
        <div className="row align-items-center">
          <div className="col-12 col-lg-8 col-xl-7">
            
            {/* Editorial Badge */}
            <div className="ryva-hero-badge">
              <Compass size={14} />
              <span>SS25 ATELIER EDIT • READY-TO-WEAR</span>
            </div>

            {/* Headline */}
            <h1 className="display-3">
              DEFINE YOUR STYLE.
            </h1>

            {/* Supporting Text */}
            <p className="lead">
              {brandConfig.heroSubheadline}
            </p>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap align-items-center gap-3 pt-2">
              <Link to="/shop" className="btn-ryva-dark" id="hero-cta-explore">
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={15} />
              </Link>
              
              <Link to="/about" className="btn-ryva-outline-gold" id="hero-cta-discover">
                <span>DISCOVER RYVA</span>
              </Link>
            </div>

            {/* Bottom mini-editorial highlights */}
            <div className="row g-3 pt-5 mt-3 border-top border-secondary border-opacity-25 d-none d-md-flex">
              <div className="col-4">
                <span className="d-block text-white-50 text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>
                  CRAFT
                </span>
                <span className="text-white small fw-semibold">
                  Hand-Finished Details
                </span>
              </div>
              <div className="col-4">
                <span className="d-block text-white-50 text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>
                  AESTHETIC
                </span>
                <span className="text-white small fw-semibold">
                  Modern Minimalist
                </span>
              </div>
              <div className="col-4">
                <span className="d-block text-white-50 text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>
                  CURATION
                </span>
                <span className="text-white small fw-semibold">
                  Limited Editions
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
