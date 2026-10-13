import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import { brandConfig } from '../config/brand';

const BrandStorySection = () => {
  return (
    <section className="ryva-section bg-white border-top border-bottom border-light">
      <div className="container">
        <div className="row align-items-center g-5">
          
          {/* Editorial Image Composition */}
          <div className="col-12 col-lg-5">
            <div className="position-relative">
              <div
                className="overflow-hidden shadow"
                style={{ aspectRatio: '4/5', backgroundColor: '#e9e4dc' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
                  alt="RYVA Collection Editorial Philosophy"
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>

              {/* Floating Monogram Card */}
              <div
                className="position-absolute bottom-0 start-0 bg-dark text-white p-3 p-md-4 shadow d-none d-sm-block"
                style={{ transform: 'translate(-15%, 20%)', maxWidth: '240px', border: '1px solid rgba(181, 154, 112, 0.4)' }}
              >
                <img
                  src={brandConfig.logos.light}
                  alt="RYVA Monogram"
                  style={{ height: '24px', opacity: 0.9 }}
                  className="mb-2"
                />
                <span className="small text-white-50 d-block" style={{ fontSize: '0.72rem', letterSpacing: '0.1em' }}>
                  LUXURY READY-TO-WEAR &amp; FOOTWEAR
                </span>
              </div>
            </div>
          </div>

          {/* Typography & Copy */}
          <div className="col-12 col-lg-7 ps-lg-5">
            <span className="ryva-subheading">THE PHILOSOPHY</span>
            <h2 className="display-6 mb-3">
              MORE THAN WHAT YOU WEAR.
            </h2>
            <div className="ryva-divider-gold start mb-4"></div>

            <blockquote className="fs-5 text-dark fst-italic mb-4" style={{ fontFamily: 'var(--ryva-font-serif)', lineHeight: 1.5 }}>
              "{brandConfig.brandStory.quote}"
            </blockquote>

            <p className="text-muted mb-4">
              {brandConfig.brandStory.description}
            </p>

            <p className="text-muted mb-4">
              We design for individuals who recognize that authentic luxury is not loud logos—it is the subtle drape of fine cloth, the clean line of a bespoke shoulder, and the quiet assurance of pieces crafted with distinct intentionality.
            </p>

            <div className="d-flex flex-wrap align-items-center gap-3 pt-2">
              <Link to="/about" className="btn-ryva-dark">
                <span>OUR STORY &amp; ETHOS</span>
                <ArrowRight size={15} />
              </Link>

              <a
                href={brandConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ryva-link"
              >
                <span>Follow {brandConfig.instagram.handle}</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandStorySection;
