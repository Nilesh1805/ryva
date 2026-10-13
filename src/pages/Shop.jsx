import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search, RotateCcw, ArrowUpDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import SizeGuideModal from '../components/SizeGuideModal';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { brandConfig } from '../config/brand';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query parameters
  const initialCategory = searchParams.get('category') || 'all';
  const initialFilter = searchParams.get('filter') || 'all';
  const initialSearch = searchParams.get('search') || '';

  // Local state
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTag, setSelectedTag] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState(10000); // Max price slider
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Sync state if URL search parameters change
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const tag = searchParams.get('filter') || 'all';
    const search = searchParams.get('search') || '';

    setSelectedCategory(cat);
    setSelectedTag(tag);
    setSearchQuery(search);
  }, [searchParams]);

  // Handle category change
  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    const newParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', slug);
    }
    setSearchParams(newParams);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedTag('all');
    setSearchQuery('');
    setPriceRange(10000);
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'clothing') {
          if (!['mens-clothing', 'womens-clothing'].includes(product.category)) return false;
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Tag filter
      if (selectedTag === 'new' && !product.isNewArrival) return false;
      if (selectedTag === 'bestseller' && !product.isBestSeller) return false;
      if (selectedTag === 'featured' && !product.isFeatured) return false;

      // Price filter
      if (product.price > priceRange) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.categoryName.toLowerCase().includes(q);
        const matchesSub = product.subcategory.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesSub && !matchesDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') {
        if (a.isNewArrival && !b.isNewArrival) return -1;
        if (!a.isNewArrival && b.isNewArrival) return 1;
        return 0;
      }
      // 'featured' default
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [selectedCategory, selectedTag, searchQuery, priceRange, sortBy]);

  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) +
    (selectedTag !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    (priceRange < 10000 ? 1 : 0);

  return (
    <div className="ryva-shop-page py-4 py-lg-5">
      <div className="container">
        
        {/* Page Title & Breadcrumb */}
        <div className="text-center mb-5">
          <span className="ryva-subheading">READY-TO-WEAR &amp; FOOTWEAR</span>
          <h1 className="ryva-serif">THE RYVA CATALOGUE</h1>
          <div className="ryva-divider-gold"></div>
          <p className="text-muted mx-auto" style={{ maxWidth: '540px' }}>
            Explore tailored suiting, liquid drapery, architectural outerwear, and artisanal handcrafted footwear.
          </p>
        </div>

        {/* Top Control Bar: Search Input, Product Count, Sort & Mobile Filter Toggle */}
        <div className="bg-white p-3 p-md-4 border mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          
          {/* Search bar inside shop */}
          <div className="position-relative flex-grow-1" style={{ maxWidth: '360px' }}>
            <input
              type="text"
              className="ryva-input py-2 ps-5 pe-3"
              style={{ fontSize: '0.85rem' }}
              placeholder="Search by title, style or cut..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="position-absolute top-50 translate-middle-y text-muted" style={{ left: '14px' }} />
            {searchQuery && (
              <button
                type="button"
                className="btn btn-link p-0 position-absolute top-50 translate-middle-y text-muted"
                style={{ right: '12px' }}
                onClick={() => setSearchQuery('')}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Right Actions: Counter, Sort, Mobile Filter Button */}
          <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-3 flex-wrap">
            <span className="small text-muted fw-semibold">
              Showing <strong>{filteredProducts.length}</strong> of {products.length} pieces
            </span>

            {/* Mobile Filter Toggle */}
            <button
              type="button"
              className="btn btn-outline-dark rounded-0 d-flex align-items-center gap-2 d-lg-none py-2 px-3 small"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <SlidersHorizontal size={15} />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="shop-sort" className="small text-muted d-none d-sm-inline">Sort:</label>
              <select
                id="shop-sort"
                className="form-select form-select-sm rounded-0 border-secondary border-opacity-50 py-2"
                style={{ width: 'auto', minWidth: '160px', fontSize: '0.82rem' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured Atelier</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Active Filter Badges */}
        {activeFiltersCount > 0 && (
          <div className="d-flex align-items-center flex-wrap gap-2 mb-4">
            <span className="small text-muted me-1">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="badge bg-dark rounded-0 py-2 px-3 d-flex align-items-center gap-1">
                Category: {selectedCategory}
                <X size={12} className="cursor-pointer" onClick={() => handleCategoryChange('all')} />
              </span>
            )}
            {selectedTag !== 'all' && (
              <span className="badge bg-dark rounded-0 py-2 px-3 d-flex align-items-center gap-1">
                Collection: {selectedTag}
                <X size={12} className="cursor-pointer" onClick={() => setSelectedTag('all')} />
              </span>
            )}
            {searchQuery && (
              <span className="badge bg-dark rounded-0 py-2 px-3 d-flex align-items-center gap-1">
                "{searchQuery}"
                <X size={12} className="cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}
            {priceRange < 10000 && (
              <span className="badge bg-dark rounded-0 py-2 px-3 d-flex align-items-center gap-1">
                Up to ₹{priceRange.toLocaleString('en-IN')}
                <X size={12} className="cursor-pointer" onClick={() => setPriceRange(10000)} />
              </span>
            )}
            <button
              type="button"
              className="btn btn-link btn-sm text-muted p-0 ms-2 small d-flex align-items-center gap-1 text-decoration-underline"
              onClick={handleClearFilters}
            >
              <RotateCcw size={12} />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* Main Content Layout (Sidebar + Product Grid) */}
        <div className="row g-4">
          
          {/* Desktop Filter Sidebar */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="bg-white p-4 border position-sticky" style={{ top: '90px' }}>
              <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                <span className="fw-bold small text-uppercase" style={{ letterSpacing: '0.15em' }}>
                  Filter Atelier
                </span>
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    className="btn btn-link p-0 text-muted small"
                    onClick={handleClearFilters}
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <span className="ryva-subheading mb-2 d-block">Categories</span>
                <div className="d-flex flex-column gap-1">
                  <button
                    type="button"
                    className={`btn text-start p-1 small rounded-0 ${selectedCategory === 'all' ? 'fw-bold text-dark' : 'text-muted'}`}
                    onClick={() => handleCategoryChange('all')}
                  >
                    All Categories ({products.length})
                  </button>
                  {categories.map((cat) => {
                    const count = cat.slug === 'new-arrivals' 
                      ? products.filter(p => p.isNewArrival).length
                      : products.filter(p => p.category === cat.slug).length;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        className={`btn text-start p-1 small rounded-0 ${selectedCategory === cat.slug ? 'fw-bold text-dark' : 'text-muted'}`}
                        onClick={() => handleCategoryChange(cat.slug)}
                      >
                        {cat.name} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Curated Tags */}
              <div className="mb-4">
                <span className="ryva-subheading mb-2 d-block">Curated Edits</span>
                <div className="d-flex flex-column gap-1">
                  <button
                    type="button"
                    className={`btn text-start p-1 small rounded-0 ${selectedTag === 'new' ? 'fw-bold text-dark' : 'text-muted'}`}
                    onClick={() => setSelectedTag(selectedTag === 'new' ? 'all' : 'new')}
                  >
                    New Arrivals
                  </button>
                  <button
                    type="button"
                    className={`btn text-start p-1 small rounded-0 ${selectedTag === 'bestseller' ? 'fw-bold text-dark' : 'text-muted'}`}
                    onClick={() => setSelectedTag(selectedTag === 'bestseller' ? 'all' : 'bestseller')}
                  >
                    Best Sellers
                  </button>
                  <button
                    type="button"
                    className={`btn text-start p-1 small rounded-0 ${selectedTag === 'featured' ? 'fw-bold text-dark' : 'text-muted'}`}
                    onClick={() => setSelectedTag(selectedTag === 'featured' ? 'all' : 'featured')}
                  >
                    Featured Editorial
                  </button>
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="ryva-subheading m-0">Max Price</span>
                  <span className="small fw-bold text-dark">
                    ₹{priceRange.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="2000"
                  max="10000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
                <div className="d-flex justify-content-between text-muted small" style={{ fontSize: '0.72rem' }}>
                  <span>₹2,000</span>
                  <span>₹10,000</span>
                </div>
              </div>

            </div>
          </div>

          {/* Product Grid Area */}
          <div className="col-12 col-lg-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-5 border text-center my-4">
                <h4 className="ryva-serif mb-2">No Matching Pieces Found</h4>
                <p className="text-muted small mb-4">
                  We couldn't find any items matching your active criteria. Try broadening your filter selection or clear filters.
                </p>
                <button
                  type="button"
                  className="btn-ryva-dark"
                  onClick={handleClearFilters}
                >
                  <span>CLEAR ALL FILTERS</span>
                  <RotateCcw size={14} />
                </button>
              </div>
            ) : (
              <div className="row g-3 g-md-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="col-6 col-md-4">
                    <ProductCard
                      product={product}
                      onQuickView={(p) => setQuickViewProduct(p)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Collapsible Filter Drawer */}
      <div className={`ryva-drawer-backdrop ${isMobileFilterOpen ? 'open' : ''}`} onClick={() => setIsMobileFilterOpen(false)}>
        <div
          className="bg-white p-4 h-100 position-fixed top-0 start-0"
          style={{ width: '320px', zIndex: 1070, overflowY: 'auto' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-4">
            <h5 className="m-0 fw-bold small text-uppercase" style={{ letterSpacing: '0.15em' }}>Filter Atelier</h5>
            <button
              type="button"
              className="btn btn-link text-dark p-0"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <span className="ryva-subheading mb-2 d-block">Categories</span>
            <div className="d-flex flex-column gap-2">
              <button
                type="button"
                className={`btn text-start p-1 small rounded-0 ${selectedCategory === 'all' ? 'fw-bold text-dark' : 'text-muted'}`}
                onClick={() => {
                  handleCategoryChange('all');
                  setIsMobileFilterOpen(false);
                }}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`btn text-start p-1 small rounded-0 ${selectedCategory === cat.slug ? 'fw-bold text-dark' : 'text-muted'}`}
                  onClick={() => {
                    handleCategoryChange(cat.slug);
                    setIsMobileFilterOpen(false);
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Curated Tags */}
          <div className="mb-4">
            <span className="ryva-subheading mb-2 d-block">Curated Edits</span>
            <div className="d-flex flex-column gap-2">
              <button
                type="button"
                className={`btn text-start p-1 small rounded-0 ${selectedTag === 'new' ? 'fw-bold text-dark' : 'text-muted'}`}
                onClick={() => {
                  setSelectedTag(selectedTag === 'new' ? 'all' : 'new');
                  setIsMobileFilterOpen(false);
                }}
              >
                New Arrivals
              </button>
              <button
                type="button"
                className={`btn text-start p-1 small rounded-0 ${selectedTag === 'bestseller' ? 'fw-bold text-dark' : 'text-muted'}`}
                onClick={() => {
                  setSelectedTag(selectedTag === 'bestseller' ? 'all' : 'bestseller');
                  setIsMobileFilterOpen(false);
                }}
              >
                Best Sellers
              </button>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="ryva-subheading m-0">Max Price</span>
              <span className="small fw-bold text-dark">₹{priceRange.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              className="form-range"
              min="2000"
              max="10000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
            />
          </div>

          <button
            type="button"
            className="btn-ryva-dark w-100 py-3 mb-2"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            <span>APPLY FILTERS ({filteredProducts.length})</span>
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary w-100 rounded-0 py-2 small"
            onClick={() => {
              handleClearFilters();
              setIsMobileFilterOpen(false);
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Modals */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={() => {
          setQuickViewProduct(null);
          setSizeGuideOpen(true);
        }}
      />

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  );
};

export default Shop;
