import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { brandConfig } from '../config/brand';

const InstagramSection = () => {
  // Curated demo editorial imagery representing the RYVA World aesthetic
  const instaPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
      caption: "Tailoring in motion. The Obsidian Atelier Blazer.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      caption: "Couture contours. Sculpted Monochrome Corset cut.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
      caption: "Artisanal cordwaining. Blake-stitched leather soles.",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
      caption: "Champagne satin bias drapery for midnight soirées.",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
      caption: "Fluid silk silhouettes. Relaxed architectural luxury.",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80",
      caption: "Commanding profiles. Monolithic Chelsea lug boot drop.",
    },
  ];

  return (
    <section className="ryva-section" id="instagram-section">
      <div className="container">
        
        {/* Header */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 mb-2">
            <InstagramIcon size={18} className="text-dark" />
            <span className="ryva-subheading m-0">{brandConfig.instagram.handle}</span>
          </div>
          <h2 className="mb-2">FOLLOW THE RYVA WORLD</h2>
          <div className="ryva-divider-gold"></div>
          <p className="text-muted mx-auto" style={{ maxWidth: '580px' }}>
            Daily styling edits, behind-the-scenes ateliers, and limited drop announcements. Join our community on Instagram.
          </p>
        </div>

        {/* Responsive Image Grid */}
        <div className="row g-2 g-md-3 mb-5">
          {instaPosts.map((post) => (
            <div key={post.id} className="col-6 col-md-4 col-lg-2">
              <a
                href={brandConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ryva-insta-card"
                aria-label={`View on Instagram: ${post.caption}`}
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="ryva-insta-img"
                  loading="lazy"
                />
                <div className="ryva-insta-overlay p-3 text-center">
                  <InstagramIcon size={22} />
                  <span className="small text-uppercase fw-bold" style={{ fontSize: '0.68rem', letterSpacing: '0.1em' }}>
                    View Post
                  </span>
                  <span className="d-none d-lg-block text-white-50" style={{ fontSize: '0.65rem' }}>
                    {post.caption}
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* CTA Button and Honest Label */}
        <div className="text-center">
          <a
            href={brandConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ryva-dark px-4 py-3"
            id="instagram-follow-cta"
          >
            <InstagramIcon size={17} />
            <span>FOLLOW US ON INSTAGRAM</span>
            <ArrowUpRight size={17} />
          </a>
          
          <p className="text-muted small mt-3 mx-auto" style={{ fontSize: '0.75rem', maxWidth: '500px' }}>
            *Editorial gallery showcase. Connect with our official handle <strong>{brandConfig.instagram.handle}</strong> on Instagram to explore real-time community stories and direct drops.
          </p>
        </div>

      </div>
    </section>
  );
};

export default InstagramSection;
