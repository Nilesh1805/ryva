import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { products } from '../data/products';
import { brandConfig } from '../config/brand';

const SearchBarModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const quickTags = ['Blazer', 'Silk Shirt', 'Loafers', 'Boots', 'Pleated Trousers', 'Gown'];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 6));
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleTagClick = (tag) => {
    setQuery(tag);
  };

  if (!isOpen) return null;

  return (
    <div className={`ryva-modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div
        className="ryva-modal-content"
        style={{ maxWidth: '720px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="ryva-modal-close"
          onClick={onClose}
          aria-label="Close search"
        >
          <X size={20} />
        </button>

        <div className="p-4 p-md-5">
          <span className="ryva-subheading mb-2 d-block">Search the Atelier</span>
          <h3 className="ryva-serif mb-4">Find Your Signature Piece</h3>

          {/* Search Input Form */}
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="position-relative">
              <input
                ref={inputRef}
                type="text"
                className="ryva-input fs-5 py-3 ps-5 pe-5"
                placeholder="Search blazers, silk shirts, footwear..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search
                size={22}
                className="position-absolute top-50 translate-middle-y text-muted"
                style={{ left: '16px' }}
              />
              {query && (
                <button
                  type="button"
                  className="btn btn-link p-0 position-absolute top-50 translate-middle-y text-muted"
                  style={{ right: '16px' }}
                  onClick={() => setQuery('')}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </form>

          {/* Popular Tag suggestions */}
          <div className="mb-4">
            <span className="small text-muted me-2">Trending Searches:</span>
            <div className="d-inline-flex flex-wrap gap-2 mt-2 mt-md-0">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-0 py-1 px-2 small text-dark"
                  style={{ fontSize: '0.75rem' }}
                  onClick={() => handleTagClick(tag)}
                >
                  <Tag size={11} className="me-1 opacity-50" />
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results list */}
          {query.trim() && (
            <div className="border-top pt-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="small text-muted">
                  Results for "<strong>{query}</strong>" ({results.length})
                </span>
                {results.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-link p-0 small text-dark fw-bold text-decoration-underline"
                    onClick={handleSearchSubmit}
                  >
                    View All in Shop <ArrowRight size={12} />
                  </button>
                )}
              </div>

              {results.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <p className="mb-2">No matching products found for "{query}".</p>
                  <p className="small">Try searching for keywords like "blazer", "trouser", or "loafers".</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      className="d-flex align-items-center gap-3 p-2 text-decoration-none border rounded-0 text-dark bg-white hover-shadow transition-all"
                      onClick={onClose}
                    >
                      <img
                        src={product.images ? product.images[0] : product.image}
                        alt={product.name}
                        style={{ width: '45px', height: '60px', objectFit: 'cover' }}
                      />
                      <div className="flex-grow-1">
                        <span className="small text-muted d-block" style={{ fontSize: '0.7rem' }}>
                          {product.categoryName}
                        </span>
                        <span className="fw-semibold small d-block">
                          {product.name}
                        </span>
                      </div>
                      <span className="fw-bold small text-dark">
                        {brandConfig.currency.symbol}{product.price.toLocaleString('en-IN')}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SearchBarModal;
