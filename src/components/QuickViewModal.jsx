import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { brandConfig } from '../config/brand';

const QuickViewModal = ({ product, isOpen, onClose, onOpenSizeGuide }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedSize(product.sizes && product.sizes.length === 1 ? product.sizes[0] : '');
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : null);
      setQuantity(1);
      setValidationError('');
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const isWishlisted = isInWishlist(product.id);
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.image];

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setValidationError('Please select a size to continue.');
      return;
    }
    setValidationError('');
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  return (
    <div className={`ryva-modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="ryva-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="ryva-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="p-4 p-md-5">
          <div className="row g-4 g-lg-5">
            
            {/* Left: Gallery */}
            <div className="col-12 col-md-6">
              <div className="mb-3 position-relative overflow-hidden bg-light" style={{ aspectRatio: '3/4' }}>
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="d-flex gap-2 overflow-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`btn p-0 border rounded-0 overflow-hidden ${selectedImage === idx ? 'border-dark border-2' : 'border-light'}`}
                      style={{ width: '60px', height: '80px', flexShrink: 0 }}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <img src={img} alt="" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info & Actions */}
            <div className="col-12 col-md-6 d-flex flex-column">
              <span className="ryva-subheading mb-1">{product.categoryName}</span>
              <h2 className="ryva-serif fs-3 mb-2">{product.name}</h2>

              {/* Price Row */}
              <div className="d-flex align-items-baseline gap-3 mb-3">
                <span className="fs-4 fw-bold text-dark">
                  {brandConfig.currency.symbol}{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-muted text-decoration-line-through">
                    {brandConfig.currency.symbol}{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.badge && (
                  <span className="badge bg-dark rounded-0 px-2 py-1 small">
                    {product.badge}
                  </span>
                )}
              </div>

              <p className="small text-muted mb-4">
                {product.shortDescription || product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small fw-bold text-uppercase" style={{ letterSpacing: '0.1em' }}>
                      Colour: <span className="fw-normal text-muted">{selectedColor?.name}</span>
                    </span>
                  </div>
                  <div className="d-flex gap-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`btn p-1 rounded-circle d-flex align-items-center justify-content-center ${selectedColor?.name === color.name ? 'border border-2 border-dark' : 'border border-light'}`}
                        style={{ width: '32px', height: '32px' }}
                        onClick={() => setSelectedColor(color)}
                        title={color.name}
                      >
                        <span
                          className="rounded-circle d-block w-100 h-100"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small fw-bold text-uppercase" style={{ letterSpacing: '0.1em' }}>
                      Select Size: {selectedSize && <span className="fw-normal text-muted">{selectedSize}</span>}
                    </span>
                    {onOpenSizeGuide && (
                      <button
                        type="button"
                        className="btn btn-link p-0 small text-muted text-decoration-underline"
                        style={{ fontSize: '0.78rem' }}
                        onClick={onOpenSizeGuide}
                      >
                        Size Guide
                      </button>
                    )}
                  </div>

                  <div className="d-flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`btn rounded-0 px-3 py-2 small fw-semibold transition-all ${
                          selectedSize === size
                            ? 'btn-dark'
                            : 'btn-outline-secondary'
                        }`}
                        onClick={() => {
                          setSelectedSize(size);
                          setValidationError('');
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {validationError && (
                    <div className="d-flex align-items-center gap-1 text-danger small mt-2">
                      <AlertCircle size={14} />
                      <span>{validationError}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-4">
                <span className="small fw-bold text-uppercase d-block mb-2" style={{ letterSpacing: '0.1em' }}>
                  Quantity
                </span>
                <div className="d-inline-flex align-items-center border border-secondary border-opacity-25">
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-dark px-3 py-1"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-3 fw-bold small">{quantity}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-dark px-3 py-1"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart & Wishlist Actions */}
              <div className="d-flex gap-3 mb-4 mt-auto">
                <button
                  type="button"
                  className="btn-ryva-dark flex-grow-1 py-3"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={16} />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  type="button"
                  className={`btn btn-outline-dark rounded-0 px-3 d-flex align-items-center justify-content-center ${isWishlisted ? 'text-danger border-danger' : ''}`}
                  onClick={() => toggleWishlist(product)}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                >
                  <Heart size={18} fill={isWishlisted ? "#B22222" : "none"} />
                </button>
              </div>

              {/* View Full Product Page Link */}
              <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                <span className="small text-muted">
                  {product.inStock ? `In Stock (Demo: ${product.stockCount} remaining)` : 'Out of Stock'}
                </span>
                <Link
                  to={`/product/${product.slug}`}
                  className="btn-ryva-link"
                  onClick={onClose}
                >
                  <span>Full Product Details</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
