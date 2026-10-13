import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';
import { brandConfig } from '../config/brand';

const About = () => {
  return (
    <div className="ryva-about-page py-4 py-lg-5">
      <div className="container">
        
        {/* Editorial Header */}
        <div className="text-center mb-5 pb-3">
          <span className="ryva-subheading">THE ATELIER MANIFESTO</span>
          <h1 className="display-4 ryva-serif mb-3">MORE THAN WHAT YOU WEAR</h1>
          <div className="ryva-divider-gold"></div>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '640px' }}>
            RYVA COLLECTION is born from a desire for quiet power, sculptural elegance, and intentional personal expression.
          </p>
        </div>

        {/* Feature Hero Split: Large Photography & Core Narrative */}
        <div className="row g-4 g-lg-5 align-items-center mb-5 pb-lg-4">
          <div className="col-12 col-lg-6">
            <div className="position-relative overflow-hidden shadow" style={{ aspectRatio: '4/5', backgroundColor: '#e8e4dc' }}>
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"
                alt="RYVA Collection Editorial Lookbook"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="col-12 col-lg-6 ps-lg-5">
            <span className="ryva-subheading">OUR PERSPECTIVE</span>
            <h2 className="ryva-serif mb-4">CONFIDENCE AS AN ART FORM</h2>

            <p className="text-muted mb-4">
              Fashion has never been merely about textiles and seams. It is an ambient language—an unspoken dialogue between personal identity and the world around us. At RYVA COLLECTION, we build silhouettes that don't overwhelm the wearer, but rather elevate and articulate their innate presence.
            </p>

            <p className="text-muted mb-4">
              Our edits are curated for the contemporary connoisseur who values understated authority over fleeting micro-trends. From sharp architectural shoulders in tailored suiting to the relaxed nonchalance of fluid draping silks and Goodyear-inspired leather footwear, every piece is designed to endure beyond seasonal rotations.
            </p>

            <div className="d-flex align-items-center gap-3 pt-2">
              <Link to="/shop" className="btn-ryva-dark">
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Three Pillars Section: Form, Materiality, Longevity */}
        <section className="py-5 my-4 bg-white border p-4 p-md-5">
          <div className="text-center mb-5">
            <span className="ryva-subheading">THE PILLARS</span>
            <h2 className="ryva-serif">WHAT DEFINES RYVA</h2>
            <div className="ryva-divider-gold"></div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="p-3 text-center text-md-start">
                <span className="display-6 fw-bold text-dark d-block mb-2 ryva-serif">01</span>
                <h4 className="ryva-serif mb-3">Architectural Form</h4>
                <p className="small text-muted mb-0">
                  We look at garments through a sculptural lens. Clean lapels, high-rise pleating, and drop-shoulder silhouettes establish clean geometric lines that command natural respect.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3 text-center text-md-start border-md-start border-md-end">
                <span className="display-6 fw-bold text-dark d-block mb-2 ryva-serif">02</span>
                <h4 className="ryva-serif mb-3">Tactile Materiality</h4>
                <p className="small text-muted mb-0">
                  Lustrous mulberry silks, heavy merino wools, full-grain Italian calfskins, and airy linen-cotton blends. We choose textiles that feel as sublime on the skin as they appear in motion.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3 text-center text-md-start">
                <span className="display-6 fw-bold text-dark d-block mb-2 ryva-serif">03</span>
                <h4 className="ryva-serif mb-3">Versatile Longevity</h4>
                <p className="small text-muted mb-0">
                  We reject the disposable tempo of fast fashion. Our pieces are crafted as foundational investment capsules that integrate seamlessly into a sophisticated modular wardrobe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Large Editorial Quote & Monogram Banner */}
        <div
          className="text-center p-5 text-white my-5 position-relative overflow-hidden"
          style={{
            backgroundColor: '#151515',
            backgroundImage: `linear-gradient(rgba(21,21,21,0.85), rgba(21,21,21,0.92)), url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <img
            src={brandConfig.logos.monogram}
            alt="RYVA Monogram Crest"
            style={{ width: '56px', height: '56px', filter: 'brightness(0) invert(1)' }}
            className="mb-4 opacity-75"
          />
          <blockquote className="fs-3 ryva-serif mx-auto mb-4" style={{ maxWidth: '780px', lineHeight: 1.4 }}>
            "True luxury is found in intentional restraint—pieces crafted with conviction, worn with unshakeable poise."
          </blockquote>
          <span className="ryva-subheading text-warning m-0">RYVA COLLECTION • ATELIER ESSENCE</span>
        </div>

        {/* Community & Instagram Dispatch */}
        <div className="row g-4 align-items-center bg-white border p-4 p-md-5">
          <div className="col-12 col-md-8">
            <span className="ryva-subheading mb-1 d-block">THE DIGITAL SALON</span>
            <h3 className="ryva-serif mb-2">ENGAGE WITH THE RYVA WORLD</h3>
            <p className="text-muted small mb-0">
              Our journey is documented in real time across Instagram. Discover how our community styles their RYVA pieces, view previews of unreleased samples, and participate in limited drop releases at <strong>{brandConfig.instagram.handle}</strong>.
            </p>
          </div>
          <div className="col-12 col-md-4 text-md-end">
            <a
              href={brandConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ryva-dark"
            >
              <InstagramIcon size={16} />
              <span>FOLLOW ON INSTAGRAM</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
