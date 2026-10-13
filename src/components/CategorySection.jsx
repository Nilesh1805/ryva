import React from 'react';
import CategoryCard from './CategoryCard';
import { categories } from '../data/categories';

const CategorySection = () => {
  return (
    <section className="ryva-section" id="categories-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="ryva-subheading">CURATED SELECTIONS</span>
          <h2 className="mb-2">EXPLORE CATEGORIES</h2>
          <div className="ryva-divider-gold"></div>
          <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Thoughtfully constructed pieces designed to balance modern sartorial elegance with relaxed contemporary silhouettes.
          </p>
        </div>

        {/* 4 Category Grid */}
        <div className="row g-4">
          {categories.map((category) => (
            <div key={category.id} className="col-12 col-sm-6 col-lg-3">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategorySection;
