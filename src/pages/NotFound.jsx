import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';
import { brandConfig } from '../config/brand';

const NotFound = () => {
  return (
    <div className="ryva-notfound-page py-5 my-5 text-center">
      <div className="container">
        <div className="bg-white border p-5 mx-auto" style={{ maxWidth: '580px' }}>
          <span className="display-1 fw-bold ryva-serif d-block text-muted opacity-25">404</span>
          <span className="ryva-subheading mb-2 d-block">PIECE NOT FOUND</span>
          <h2 className="ryva-serif mb-3">OUT OF ATELIER CIRCULATION</h2>
          <div className="ryva-divider-gold"></div>
          <p className="text-muted small mb-4">
            The page or collection silhouette you are seeking is unavailable or has moved to our archive.
          </p>
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <Link to="/" className="btn-ryva-dark">
              <span>RETURN TO ATELIER</span>
              <ArrowRight size={15} />
            </Link>
            <Link to="/shop" className="btn-ryva-outline">
              <span>BROWSE CATALOGUE</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
