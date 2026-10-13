import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const CategoryCard = ({ category }) => {
  const getFilterUrl = () => {
    if (category.slug === 'new-arrivals') return '/shop?filter=new';
    return `/shop?category=${category.slug}`;
  };

  return (
    <Link to={getFilterUrl()} className="ryva-category-card" aria-label={`Shop ${category.name}`}>
      <img
        src={category.image}
        alt={category.name}
        className="ryva-category-img"
        loading="lazy"
      />
      <div className="ryva-category-overlay">
        <span className="ryva-subheading mb-1" style={{ color: 'var(--ryva-gold-light)' }}>
          {category.subtitle}
        </span>
        <h3 className="ryva-category-title mb-2">
          {category.name}
        </h3>
        <p className="text-white-50 small mb-3 d-none d-md-block" style={{ maxWidth: '300px' }}>
          {category.description}
        </p>
        <div className="d-inline-flex align-items-center gap-1 text-white fw-bold small text-uppercase" style={{ letterSpacing: '0.15em' }}>
          <span>Shop Category</span>
          <ArrowUpRight size={16} />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
