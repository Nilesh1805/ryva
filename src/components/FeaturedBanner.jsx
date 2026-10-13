import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const FeaturedBanner = () => {
  return (
    <section className="ryva-section py-0 my-5">
      <div className="container">
        <div
          className="position-relative overflow-hidden text-white p-4 p-md-5"
          style={{
            minHeight: '440px',
            backgroundColor: '#151515',
            backgroundImage: `linear-gradient(90deg, rgba(21, 21, 21, 0.95) 0%, rgba(21, 21, 21, 0.55) 60%, rgba(21, 21, 21, 0.2) 100%), url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        >
          <div className="row align-items-center h-100 py-md-4">
            <div className="col-12 col-md-8 col-lg-6">
              
              <div className="d-inline-flex align-items-center gap-2 mb-3">
                <Sparkles size={14} className="text-warning" />
                <span className="ryva-subheading m-0" style={{ color: 'var(--ryva-gold-light)' }}>
                  CURATED ATELIER EDIT
                </span>
              </div>

              <h2 className="display-5 text-white mb-3 ryva-serif">
                THE ARCHITECTURAL SILHOUETTE
              </h2>

              <p className="text-white-50 mb-4" style={{ maxWidth: '480px', fontSize: '0.95rem' }}>
                Sculptural cuts, raw luxury textures, and unyielding attention to proportion. Discover the seasonal capsule crafted for effortless presence.
              </p>

              <div className="d-flex flex-wrap align-items-center gap-3">
                <Link to="/shop?filter=featured" className="btn-ryva-dark bg-white text-dark border-white">
                  <span>SHOP THE COLLECTION</span>
                  <ArrowRight size={15} />
                </Link>

                <Link to="/about" className="btn-ryva-link text-white">
                  <span>View Brand Editorial</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBanner;
